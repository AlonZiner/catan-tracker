import React, { useState } from 'react';
import { User, Trophy, Target, TrendingUp, Award, Calendar, ArrowLeft, Eye, BarChart3, Filter, ChevronDown, Star, Medal, Zap } from 'lucide-react';
import { mockPlayers, mockGames, achievements } from '../data/mockData';
import { calculatePlayerStats, getPlayerAchievements } from '../utils/statsCalculator';

interface PlayerProfilesProps {
  onPageChange: (page: string) => void;
}

const PlayerProfiles: React.FC<PlayerProfilesProps> = ({ onPageChange }) => {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState({ start: '', end: '' });
  const [expansionFilter, setExpansionFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Filter games based on selected filters
  const filteredGames = mockGames.filter(game => {
    const gameDate = new Date(game.date);
    const startDate = dateFilter.start ? new Date(dateFilter.start) : null;
    const endDate = dateFilter.end ? new Date(dateFilter.end) : null;
    
    const dateMatch = (!startDate || gameDate >= startDate) && (!endDate || gameDate <= endDate);
    const expansionMatch = !expansionFilter || game.expansion === expansionFilter;
    
    return dateMatch && expansionMatch;
  });

  const playersWithStats = mockPlayers.map(player => ({
    ...player,
    stats: calculatePlayerStats(player.id, filteredGames),
    achievements: getPlayerAchievements(player.id, mockGames)
  })).sort((a, b) => b.stats.winRate - a.stats.winRate);

  const selectedPlayerData = selectedPlayer 
    ? playersWithStats.find(p => p.id === selectedPlayer)
    : null;

  const getPlayerGames = (playerId: string) => {
    return filteredGames.filter(game => 
      game.players.some(p => p.playerId === playerId)
    ).map(game => ({
      ...game,
      playerScore: game.players.find(p => p.playerId === playerId)!,
      isWin: game.winner === game.players.find(p => p.playerId === playerId)?.playerName
    })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const clearFilters = () => {
    setDateFilter({ start: '', end: '' });
    setExpansionFilter('');
  };

  const hasActiveFilters = dateFilter.start || dateFilter.end || expansionFilter;

  if (selectedPlayerData) {
    const playerGames = getPlayerGames(selectedPlayerData.id);
    const recentGames = playerGames.slice(0, 5);
    
    return (
      <div className="space-y-4 sm:space-y-6 pb-20 lg:pb-0">
        {/* Back Button */}
        <button
          onClick={() => setSelectedPlayer(null)}
          className="text-pink-400 hover:text-pink-300 flex items-center space-x-2 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Players</span>
        </button>

        {/* Player Header with Achievements */}
        <div className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0 animate-pulse">
              {selectedPlayerData.avatar}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{selectedPlayerData.name}</h1>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-gray-400 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(selectedPlayerData.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4" />
                  <span>{selectedPlayerData.stats.wins} wins</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4" />
                  <span>{selectedPlayerData.stats.totalGames} games played</span>
                </div>
              </div>
              
              {/* Achievement Badges */}
              <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                {selectedPlayerData.achievements.slice(0, 3).map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                      achievement.rarity === 'legendary' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-600/20 text-yellow-400 border border-yellow-500/30' :
                      achievement.rarity === 'epic' ? 'bg-gradient-to-r from-purple-500/20 to-pink-600/20 text-purple-400 border border-purple-500/30' :
                      achievement.rarity === 'rare' ? 'bg-gradient-to-r from-blue-500/20 to-cyan-600/20 text-blue-400 border border-blue-500/30' :
                      'bg-gray-700/50 text-gray-300 border border-gray-600'
                    }`}
                    title={achievement.description}
                  >
                    <span>{achievement.icon}</span>
                    <span>{achievement.name}</span>
                  </div>
                ))}
                {selectedPlayerData.achievements.length > 3 && (
                  <div className="bg-gray-700/50 text-gray-300 border border-gray-600 px-2 py-1 rounded-full text-xs">
                    +{selectedPlayerData.achievements.length - 3} more
                  </div>
                )}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-pink-400">
                {selectedPlayerData.stats.winRate.toFixed(1)}%
              </div>
              <div className="text-gray-400 text-sm">Win Rate</div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <div className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700 hover:border-yellow-500/50 transition-colors">
            <div className="flex items-center space-x-3 mb-4">
              <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">{selectedPlayerData.stats.wins}</div>
                <div className="text-gray-400 text-xs sm:text-sm">Total Wins</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700 hover:border-blue-500/50 transition-colors">
            <div className="flex items-center space-x-3 mb-4">
              <Target className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">{selectedPlayerData.stats.averageScore.toFixed(1)}</div>
                <div className="text-gray-400 text-xs sm:text-sm">Avg Score</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700 hover:border-purple-500/50 transition-colors">
            <div className="flex items-center space-x-3 mb-4">
              <Award className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">{selectedPlayerData.stats.highestScore}</div>
                <div className="text-gray-400 text-xs sm:text-sm">Best Score</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700 hover:border-green-500/50 transition-colors">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">{selectedPlayerData.stats.averagePosition.toFixed(1)}</div>
                <div className="text-gray-400 text-xs sm:text-sm">Avg Position</div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-pink-400" />
            <span>Performance Over Time</span>
          </h3>
          
          <div className="space-y-3">
            {selectedPlayerData.stats.recentForm.slice(-10).reverse().map((score, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-8 text-gray-400 text-sm">#{selectedPlayerData.stats.recentForm.length - index}</div>
                <div className="flex-1 bg-gray-700 rounded-full h-4 relative">
                  <div 
                    className={`h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2 ${
                      score >= 12 ? 'bg-gradient-to-r from-yellow-500 to-orange-600' :
                      score >= 10 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                      score >= 8 ? 'bg-gradient-to-r from-blue-500 to-cyan-600' :
                      score >= 6 ? 'bg-gradient-to-r from-purple-500 to-pink-600' :
                      'bg-gradient-to-r from-red-500 to-pink-600'
                    }`}
                    style={{ width: `${Math.max((score / 15) * 100, 10)}%` }}
                  >
                    <span className="text-white text-xs font-medium">{score}</span>
                  </div>
                </div>
                <div className="w-16 text-right">
                  {score >= 12 && <span className="text-yellow-400">🏆</span>}
                  {score >= 10 && score < 12 && <span className="text-green-400">🎯</span>}
                  {score >= 8 && score < 10 && <span className="text-blue-400">📈</span>}
                  {score < 8 && <span className="text-gray-400">📉</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Games */}
        <div className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg sm:text-xl font-semibold flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              <span>Recent Games</span>
            </h3>
            <button
              onClick={() => onPageChange('games')}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-3">
            {recentGames.map((game) => (
              <div 
                key={game.id} 
                className={`p-3 rounded-lg transition-all duration-200 cursor-pointer hover:scale-105 ${
                  game.isWin ? 'bg-green-500/10 border border-green-500/30 hover:border-green-500/50' : 
                  'bg-gray-700 hover:bg-gray-600'
                }`}
                onClick={() => onPageChange('games')}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-white text-sm sm:text-base truncate">{game.expansion}</span>
                  <span className={`text-xs sm:text-sm font-medium ${game.isWin ? 'text-green-400' : 'text-gray-400'}`}>
                    {game.isWin ? '🏆 WIN' : '❌ LOSS'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm text-gray-400">
                  <span>{new Date(game.date).toLocaleDateString()}</span>
                  <span>Score: {game.playerScore.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onPageChange('analytics')}
            className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-6 py-3 rounded-lg text-white font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <BarChart3 className="w-4 h-4" />
            <span>View Analytics</span>
          </button>
          <button
            onClick={() => onPageChange('games')}
            className="flex-1 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg text-white font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <Trophy className="w-4 h-4" />
            <span>Game History</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 pb-20 lg:pb-0">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Player Profiles
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          {playersWithStats.length} active players
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between px-4 py-3 text-white hover:bg-gray-700 transition-colors rounded-t-xl"
          >
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span>Filters</span>
              {hasActiveFilters && (
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
              )}
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Filter Content */}
        <div className={`${showFilters ? 'block' : 'hidden'} lg:block p-4 border-t border-gray-700 lg:border-t-0`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Start Date</label>
              <input
                type="date"
                value={dateFilter.start}
                onChange={(e) => setDateFilter(prev => ({ ...prev, start: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white"
              />
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-2">End Date</label>
              <input
                type="date"
                value={dateFilter.end}
                onChange={(e) => setDateFilter(prev => ({ ...prev, end: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white"
              />
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-2">Expansion</label>
              <select
                value={expansionFilter}
                onChange={(e) => setExpansionFilter(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white"
              >
                <option value="">All Expansions</option>
                <option value="Base Game">Base Game</option>
                <option value="Seafarers">Seafarers</option>
                <option value="Cities & Knights">Cities & Knights</option>
                <option value="Traders & Barbarians">Traders & Barbarians</option>
                <option value="Explorers & Pirates">Explorers & Pirates</option>
                <option value="Rise of the Inkas">Rise of the Inkas</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                disabled={!hasActiveFilters}
                className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
          
          {hasActiveFilters && (
            <div className="mt-3 text-sm text-pink-400">
              Showing filtered results ({filteredGames.length} games)
            </div>
          )}
        </div>
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {playersWithStats.map((player, index) => (
          <div 
            key={player.id}
            onClick={() => setSelectedPlayer(player.id)}
            className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200 transform hover:scale-105 cursor-pointer group hover:shadow-xl"
          >
            {/* Player Header */}
            <div className="flex items-center space-x-3 sm:space-x-4 mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-lg sm:text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                {player.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-semibold text-white truncate group-hover:text-pink-400 transition-colors">{player.name}</h3>
                <div className="flex items-center space-x-2 text-gray-400 text-xs sm:text-sm">
                  <div className={`w-2 h-2 rounded-full ${
                    index === 0 ? 'bg-yellow-500 animate-pulse' :
                    index === 1 ? 'bg-gray-400' :
                    index === 2 ? 'bg-orange-600' :
                    'bg-gray-600'
                  }`}></div>
                  <span>#{index + 1} Overall</span>
                  {index === 0 && <span className="text-yellow-400">👑</span>}
                </div>
              </div>
            </div>

            {/* Achievement Preview */}
            <div className="flex flex-wrap gap-1 mb-3">
              {player.achievements.slice(0, 2).map((achievement) => (
                <div
                  key={achievement.id}
                  className={`text-xs px-2 py-1 rounded-full ${
                    achievement.rarity === 'legendary' ? 'bg-yellow-500/20 text-yellow-400' :
                    achievement.rarity === 'epic' ? 'bg-purple-500/20 text-purple-400' :
                    achievement.rarity === 'rare' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-gray-700/50 text-gray-300'
                  }`}
                  title={achievement.description}
                >
                  {achievement.icon}
                </div>
              ))}
              {player.achievements.length > 2 && (
                <div className="text-xs px-2 py-1 rounded-full bg-gray-700/50 text-gray-400">
                  +{player.achievements.length - 2}
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Win Rate</span>
                <span className="text-pink-400 font-bold text-base sm:text-lg">{player.stats.winRate.toFixed(1)}%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Games Played</span>
                <span className="text-white font-medium text-sm">{player.stats.totalGames}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Average Score</span>
                <span className="text-white font-medium text-sm">{player.stats.averageScore.toFixed(1)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Best Score</span>
                <span className="text-purple-400 font-medium text-sm">{player.stats.highestScore}</span>
              </div>
            </div>

            {/* Win Rate Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs sm:text-sm text-gray-400 mb-1">
                <span>Performance</span>
                <span>{player.stats.wins}/{player.stats.totalGames}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="h-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-500"
                  style={{ width: `${player.stats.winRate}%` }}
                ></div>
              </div>
            </div>

            {/* Recent Form Indicator */}
            <div className="mt-4 flex items-center space-x-1">
              <span className="text-gray-400 text-xs sm:text-sm mr-2">Recent:</span>
              {player.stats.recentForm.slice(-5).map((score, idx) => (
                <div 
                  key={idx}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                    score >= 10 ? 'bg-green-500' :
                    score >= 8 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  title={`Score: ${score}`}
                ></div>
              ))}
            </div>

            {/* Hover Action */}
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-center text-pink-400 text-sm font-medium">
                Click to view detailed stats →
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-600/10 border border-purple-500/30 rounded-xl p-4 sm:p-6">
        <h3 className="text-lg font-semibold mb-4 text-purple-400">Player Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <button
            onClick={() => onPageChange('analytics')}
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 p-3 rounded-lg text-white font-medium transition-all duration-200 transform hover:scale-105"
          >
            Compare Players
          </button>
          <button
            onClick={() => onPageChange('games')}
            className="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg text-white font-medium transition-all duration-200 transform hover:scale-105"
          >
            View Games
          </button>
          <button
            onClick={() => onPageChange('add-game')}
            className="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg text-white font-medium transition-all duration-200 transform hover:scale-105"
          >
            Add Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfiles;