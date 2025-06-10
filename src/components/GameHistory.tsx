import React, { useState } from 'react';
import { Search, Filter, Calendar, Trophy, Users, Clock, ChevronDown, Eye, BarChart3, Trash2 } from 'lucide-react';
import { GameRecord, Player } from '../types';

interface GameHistoryProps {
  games: GameRecord[];
  players: Player[];
  onPageChange: (page: string) => void;
  onDeleteGame?: (id: string) => Promise<boolean>;
}

const GameHistory: React.FC<GameHistoryProps> = ({ 
  games, 
  players, 
  onPageChange, 
  onDeleteGame 
}) => {
  // Debug: Log what data GameHistory receives
  console.log('GameHistory received data:', {
    gamesCount: games.length,
    playersCount: players.length,
    firstGame: games[0] ? games[0].expansion : 'No games',
    isUsingMockData: games.length > 0 && games[0].id.startsWith('mock') // Check if using mock data
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpansion, setSelectedExpansion] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [dateFilter, setDateFilter] = useState({ start: '', end: '' });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Get unique expansions from actual games
  const expansions = Array.from(new Set(games.map(game => game.expansion)));

  const filteredGames = games
    .filter(game => {
      const gameDate = new Date(game.date);
      const startDate = dateFilter.start ? new Date(dateFilter.start) : null;
      const endDate = dateFilter.end ? new Date(dateFilter.end) : null;
      
      const matchesSearch = game.winner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           game.expansion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           game.players.some(p => p.playerName.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesExpansion = !selectedExpansion || game.expansion === selectedExpansion;
      const dateMatch = (!startDate || gameDate >= startDate) && (!endDate || gameDate <= endDate);
      
      return matchesSearch && matchesExpansion && dateMatch;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        case 'winner':
          aValue = a.winner;
          bValue = b.winner;
          break;
        case 'expansion':
          aValue = a.expansion;
          bValue = b.expansion;
          break;
        case 'duration':
          aValue = a.duration || 0;
          bValue = b.duration || 0;
          break;
        default:
          return 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleDeleteGame = async (gameId: string) => {
    if (!onDeleteGame) return;
    
    const confirmDelete = window.confirm('Are you sure you want to delete this game? This action cannot be undone.');
    if (!confirmDelete) return;
    
    setDeletingId(gameId);
    try {
      await onDeleteGame(gameId);
    } catch (error) {
      console.error('Failed to delete game:', error);
      alert('Failed to delete game. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedExpansion('');
    setDateFilter({ start: '', end: '' });
  };

  const hasActiveFilters = searchTerm || selectedExpansion || dateFilter.start || dateFilter.end;

  return (
    <div className="space-y-4 sm:space-y-6 pb-20 lg:pb-0">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Game History
        </h1>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onPageChange('analytics')}
            className="hidden sm:flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <BarChart3 className="w-4 h-4" />
            <span className="text-sm">Analytics</span>
          </button>
          <div className="text-gray-400 text-xs sm:text-sm">
            {filteredGames.length} of {games.length} games
          </div>
        </div>
      </div>

      {/* Enhanced Filters */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between px-4 py-3 text-white hover:bg-gray-700 transition-colors rounded-t-xl"
          >
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span>Filters & Sort</span>
              {hasActiveFilters && (
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
              )}
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Filter Content */}
        <div className={`${showFilters ? 'block' : 'hidden'} lg:block p-4 border-t border-gray-700 lg:border-t-0`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-gray-400"
              />
            </div>

            <div>
              <select
                value={selectedExpansion}
                onChange={(e) => setSelectedExpansion(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white"
              >
                <option value="">All Expansions</option>
                {expansions.map(expansion => (
                  <option key={expansion} value={expansion}>{expansion}</option>
                ))}
              </select>
            </div>

            <div>
              <input
                type="date"
                placeholder="Start Date"
                value={dateFilter.start}
                onChange={(e) => setDateFilter(prev => ({ ...prev, start: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white"
              />
            </div>

            <div>
              <input
                type="date"
                placeholder="End Date"
                value={dateFilter.end}
                onChange={(e) => setDateFilter(prev => ({ ...prev, end: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white"
              />
            </div>
            
            <div className="flex space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white"
              >
                <option value="date">Sort by Date</option>
                <option value="winner">Sort by Winner</option>
                <option value="expansion">Sort by Expansion</option>
                <option value="duration">Sort by Duration</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition-colors text-white"
                title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
          
          {hasActiveFilters && (
            <div className="mt-3 flex items-center justify-between">
              <div className="text-sm text-pink-400">
                Showing filtered results ({filteredGames.length} games)
              </div>
              <button
                onClick={clearFilters}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Games List */}
      <div className="space-y-3 sm:space-y-4">
        {filteredGames.map((game) => {
          const winningScore = Math.max(...game.players.map(p => p.score));
          const totalPoints = game.players.reduce((sum, p) => sum + p.score, 0);
          const secondPlace = Math.max(...game.players.filter(p => p.score !== winningScore).map(p => p.score));
          const margin = winningScore - secondPlace;
          const isCloseGame = margin <= 2;
          
          return (
            <div key={game.id} className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200 transform hover:scale-[1.01] hover:shadow-lg">
              {/* Game Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-base sm:text-lg font-semibold text-white truncate">{game.expansion}</h3>
                      {isCloseGame && (
                        <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded animate-pulse">
                          CLOSE GAME
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-gray-400 text-xs sm:text-sm">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{new Date(game.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{game.players.length} players</span>
                      </div>
                      {game.duration && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{game.duration}min</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="text-right flex-shrink-0">
                    <div className="text-pink-400 font-semibold text-xs sm:text-sm">Winner</div>
                    <div className="text-base sm:text-xl font-bold text-white">{game.winner}</div>
                    <div className="text-gray-400 text-xs sm:text-sm">Score: {winningScore} (Margin: {margin})</div>
                  </div>
                  
                  {/* Delete Button */}
                  {onDeleteGame && (
                    <div className="flex flex-col space-y-1">
                      <button
                        onClick={() => handleDeleteGame(game.id)}
                        disabled={deletingId === game.id}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors disabled:opacity-50"
                        title="Delete game"
                      >
                        {deletingId === game.id ? (
                          <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Player Scores */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {game.players
                  .sort((a, b) => b.score - a.score)
                  .map((player, index) => (
                    <div 
                      key={player.playerId || index} 
                      className={`bg-gray-700 rounded-lg p-3 sm:p-4 transition-all duration-200 hover:bg-gray-600 cursor-pointer ${
                        player.playerName === game.winner ? 'ring-2 ring-pink-500 bg-gradient-to-br from-pink-500/10 to-purple-600/10' : ''
                      }`}
                      onClick={() => onPageChange('players')}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white text-sm sm:text-base truncate">{player.playerName}</span>
                        <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0 ? 'bg-gradient-to-r from-yellow-500 to-orange-600' :
                          index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600' :
                          index === 2 ? 'bg-gradient-to-r from-orange-600 to-red-600' :
                          'bg-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-xs sm:text-sm">Score</span>
                          <span className="font-bold text-base sm:text-lg">{player.score}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-xs sm:text-sm">Position</span>
                          <span className="text-xs sm:text-sm">{player.startingPosition}</span>
                        </div>
                        {player.settlements !== undefined && player.settlements !== null && (
                          <div className="flex justify-between">
                            <span className="text-gray-400 text-xs sm:text-sm">Settlements</span>
                            <span className="text-xs sm:text-sm">{player.settlements}</span>
                          </div>
                        )}
                        {player.cities !== undefined && player.cities !== null && (
                          <div className="flex justify-between">
                            <span className="text-gray-400 text-xs sm:text-sm">Cities</span>
                            <span className="text-xs sm:text-sm">{player.cities}</span>
                          </div>
                        )}
                        
                        {/* Special Achievements */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {player.longestRoad && (
                            <div className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded">
                              🛣️ Road
                            </div>
                          )}
                          {player.largestArmy && (
                            <div className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded">
                              ⚔️ Army
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Game Stats */}
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-gray-400 text-xs sm:text-sm">Total Points</div>
                    <div className="font-bold text-sm sm:text-base">{totalPoints}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs sm:text-sm">Average Score</div>
                    <div className="font-bold text-sm sm:text-base">{(totalPoints / game.players.length).toFixed(1)}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs sm:text-sm">Game Intensity</div>
                    <div className={`font-bold text-sm sm:text-base ${
                      isCloseGame ? 'text-yellow-400' : 'text-green-400'
                    }`}>
                      {isCloseGame ? 'Intense' : 'Decisive'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg sm:text-xl font-semibold text-gray-400 mb-2">No games found</h3>
          <p className="text-gray-500 text-sm sm:text-base mb-4">
            {games.length === 0 ? 'Add some games to get started!' : 'Try adjusting your search or filter criteria'}
          </p>
          <button
            onClick={() => onPageChange('add-game')}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-6 py-3 rounded-lg text-white font-medium transition-all duration-200 transform hover:scale-105"
          >
            {games.length === 0 ? 'Add Your First Game' : 'Add New Game'}
          </button>
        </div>
      )}
    </div>
  );
};

export default GameHistory;