import React, { useState } from 'react';
import { Plus, X, Trophy, Users, Calendar, Clock, ArrowLeft, HelpCircle, Info } from 'lucide-react';
import { Player, GameRecord } from '../types';
import { expansions } from '../data/mockData';

interface AddGameProps {
  players: Player[];
  onBack: () => void;
  onAddGame: (gameData: Omit<GameRecord, 'id'>) => Promise<GameRecord>;
}

const AddGame: React.FC<AddGameProps> = ({ players, onBack, onAddGame }) => {
  const [gameData, setGameData] = useState({
    date: new Date().toISOString().split('T')[0],
    expansion: 'Base Game',
    duration: '',
    players: [
      { playerId: '', playerName: '', score: '', startingPosition: 1, settlements: '', cities: '', longestRoad: false, largestArmy: false },
      { playerId: '', playerName: '', score: '', startingPosition: 2, settlements: '', cities: '', longestRoad: false, largestArmy: false },
      { playerId: '', playerName: '', score: '', startingPosition: 3, settlements: '', cities: '', longestRoad: false, largestArmy: false },
      { playerId: '', playerName: '', score: '', startingPosition: 4, settlements: '', cities: '', longestRoad: false, largestArmy: false },
    ]
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [showHelp, setShowHelp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addPlayer = () => {
    if (gameData.players.length < 6) {
      setGameData({
        ...gameData,
        players: [
          ...gameData.players,
          { 
            playerId: '', 
            playerName: '', 
            score: '', 
            startingPosition: gameData.players.length + 1, 
            settlements: '', 
            cities: '', 
            longestRoad: false, 
            largestArmy: false 
          }
        ]
      });
    }
  };

  const removePlayer = (index: number) => {
    if (gameData.players.length > 3) {
      const newPlayers = gameData.players.filter((_, i) => i !== index);
      newPlayers.forEach((player, i) => {
        player.startingPosition = i + 1;
      });
      setGameData({ ...gameData, players: newPlayers });
    }
  };

  const updatePlayer = (index: number, field: string, value: any) => {
    const newPlayers = [...gameData.players];
    newPlayers[index] = { ...newPlayers[index], [field]: value };
    setGameData({ ...gameData, players: newPlayers });
  };

  const validateGame = () => {
    const newErrors: string[] = [];

    gameData.players.forEach((player, index) => {
      if (!player.playerName.trim()) {
        newErrors.push(`Player ${index + 1} needs a name`);
      }
      if (!player.score || parseInt(player.score) < 0) {
        newErrors.push(`Player ${index + 1} needs a valid score`);
      }
    });

    const names = gameData.players.map(p => p.playerName.trim().toLowerCase());
    const duplicates = names.filter((name, index) => names.indexOf(name) !== index);
    if (duplicates.length > 0) {
      newErrors.push('Player names must be unique');
    }

    const longestRoadCount = gameData.players.filter(p => p.longestRoad).length;
    const largestArmyCount = gameData.players.filter(p => p.largestArmy).length;
    
    if (longestRoadCount > 1) {
      newErrors.push('Only one player can have Longest Road');
    }
    if (largestArmyCount > 1) {
      newErrors.push('Only one player can have Largest Army');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateGame()) return;

    setIsSubmitting(true);
    try {
      const winner = gameData.players.reduce((prev, current) => 
        parseInt(current.score) > parseInt(prev.score) ? current : prev
      ).playerName;

      const gameRecord: Omit<GameRecord, 'id'> = {
        date: gameData.date,
        expansion: gameData.expansion,
        winner,
        duration: gameData.duration ? parseInt(gameData.duration) : undefined,
        players: gameData.players.map(p => ({
          ...p,
          score: parseInt(p.score),
          settlements: parseInt(p.settlements) || 0,
          cities: parseInt(p.cities) || 0,
        }))
      };

      await onAddGame(gameRecord);
      onBack();
    } catch (error) {
      console.error('Failed to save game:', error);
      setErrors(['Failed to save game. Please try again.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWinner = () => {
    const maxScore = Math.max(...gameData.players.map(p => parseInt(p.score) || 0));
    const winner = gameData.players.find(p => parseInt(p.score) === maxScore);
    return winner?.playerName || 'TBD';
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="text-pink-400 hover:text-pink-300 flex items-center space-x-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Add New Game
          </h1>
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="text-gray-400 hover:text-white transition-colors"
            title="Show help and tips"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
        
        <div className="text-center sm:text-right">
          <div className="text-gray-400 text-sm">Current Winner</div>
          <div className="text-xl font-bold text-pink-400">{getWinner()}</div>
        </div>
      </div>

      {/* Help Section */}
      {showHelp && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Info className="w-5 h-5 text-blue-400" />
            <h3 className="text-blue-400 font-medium">Game Entry Tips</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <h4 className="font-medium text-white mb-2">Required Information:</h4>
              <ul className="space-y-1">
                <li>• Player names and final scores</li>
                <li>• Starting positions (turn order)</li>
                <li>• Date and expansion used</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Optional Details:</h4>
              <ul className="space-y-1">
                <li>• Settlement and city counts</li>
                <li>• Longest Road and Largest Army</li>
                <li>• Game duration in minutes</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <X className="w-4 h-4 text-red-400" />
            <span className="text-red-400 font-medium">Please fix the following errors:</span>
          </div>
          <ul className="text-red-300 text-sm space-y-1">
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Game Details */}
        <div className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-pink-400" />
            <span>Game Details</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Date Played *
              </label>
              <input
                type="date"
                value={gameData.date}
                onChange={(e) => setGameData({ ...gameData, date: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                <Trophy className="w-4 h-4 inline mr-1" />
                Expansion Used *
              </label>
              <select
                value={gameData.expansion}
                onChange={(e) => setGameData({ ...gameData, expansion: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white"
                required
              >
                {expansions.map(expansion => (
                  <option key={expansion} value={expansion}>{expansion}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Duration (minutes)
              </label>
              <input
                type="number"
                value={gameData.duration}
                onChange={(e) => setGameData({ ...gameData, duration: e.target.value })}
                placeholder="90"
                min="30"
                max="300"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Players */}
        <div className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
            <h2 className="text-lg sm:text-xl font-semibold flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-400" />
              <span>Players & Scores</span>
            </h2>
            
            <button
              type="button"
              onClick={addPlayer}
              disabled={gameData.players.length >= 6}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
              <span>Add Player</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {gameData.players.map((player, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-white">Player {index + 1}</h3>
                  {gameData.players.length > 3 && (
                    <button
                      type="button"
                      onClick={() => removePlayer(index)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                      title="Remove this player"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Player Name *</label>
                    <input
                      type="text"
                      value={player.playerName}
                      onChange={(e) => updatePlayer(index, 'playerName', e.target.value)}
                      placeholder="Enter name"
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-gray-400"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Final Score *</label>
                    <input
                      type="number"
                      value={player.score}
                      onChange={(e) => updatePlayer(index, 'score', e.target.value)}
                      placeholder="10"
                      min="0"
                      max="20"
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-gray-400"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Starting Position *</label>
                    <select
                      value={player.startingPosition}
                      onChange={(e) => updatePlayer(index, 'startingPosition', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white"
                    >
                      {Array.from({ length: gameData.players.length }, (_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Settlements</label>
                    <input
                      type="number"
                      value={player.settlements}
                      onChange={(e) => updatePlayer(index, 'settlements', e.target.value)}
                      placeholder="5"
                      min="0"
                      max="5"
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-gray-400"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Cities</label>
                    <input
                      type="number"
                      value={player.cities}
                      onChange={(e) => updatePlayer(index, 'cities', e.target.value)}
                      placeholder="4"
                      min="0"
                      max="4"
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-gray-400"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={player.longestRoad}
                        onChange={(e) => updatePlayer(index, 'longestRoad', e.target.checked)}
                        className="w-4 h-4 text-pink-500 bg-gray-600 border-gray-500 rounded focus:ring-pink-500"
                      />
                      <span className="text-gray-300 text-sm">🛣️ Longest Road</span>
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={player.largestArmy}
                        onChange={(e) => updatePlayer(index, 'largestArmy', e.target.checked)}
                        className="w-4 h-4 text-pink-500 bg-gray-600 border-gray-500 rounded focus:ring-pink-500"
                      />
                      <span className="text-gray-300 text-sm">⚔️ Largest Army</span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <span>Save Game</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGame;