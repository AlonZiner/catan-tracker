import React from 'react';
import { Trophy, Users, Target, TrendingUp, Calendar, Award, Zap, Clock, Flame, ArrowRight, Eye, RefreshCw } from 'lucide-react';
import StatCard from './StatCard';
import { useFirebaseGames } from '../hooks/useFirebaseGames'; // Updated import
import { 
  getWinDistribution, 
  getExpansionStats, 
  getWinStreaks, 
  getGameDurationAnalysis,
  getDominanceMetrics 
} from '../utils/statsCalculator';

interface DashboardProps {
  onPageChange: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onPageChange }) => {
  // Replace mockData imports with the hook
  const { games, players, loading, error, refresh, isOnline } = useFirebaseGames();

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="text-red-400 text-xl">⚠️</div>
          <p className="text-red-400">Error: {error}</p>
          <button 
            onClick={refresh}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Use the hook data instead of mockData
  const totalGames = games.length;
  const totalPlayers = players.length;
  const winDistribution = getWinDistribution(games); // Use games instead of mockGames
  const expansionStats = getExpansionStats(games);
  const winStreaks = getWinStreaks(games);
  const durationAnalysis = getGameDurationAnalysis(games);
  const dominanceMetrics = getDominanceMetrics(games);
  const topWinner = winDistribution[0];
  const currentStreakLeader = winStreaks.find(p => p.currentStreak > 0) || winStreaks[0];
  
  const averageScore = games.reduce((total, game) => {
    const gameTotal = game.players.reduce((sum, player) => sum + player.score, 0);
    return total + (gameTotal / game.players.length);
  }, 0) / games.length;

  const recentGames = games.slice(0, 3);

  return (
    <div className="space-y-4 sm:space-y-6 pb-20 lg:pb-0">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <div className="flex items-center space-x-4">
          {!isOnline && (
            <div className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-lg text-xs">
              OFFLINE MODE
            </div>
          )}
          <button
            onClick={refresh}
            className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg text-gray-300 hover:text-white transition-all duration-200 group"
            title="Refresh data"
          >
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-sm">Refresh</span>
          </button>
          <div className="text-gray-400 text-xs sm:text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid with Navigation */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <div onClick={() => onPageChange('games')} className="cursor-pointer">
          <StatCard
            title="Total Games"
            value={totalGames}
            subtitle="All time"
            icon={Trophy}
            trend={{ value: 12, isPositive: true }}
          />
        </div>
        <div onClick={() => onPageChange('players')} className="cursor-pointer">
          <StatCard
            title="Active Players"
            value={totalPlayers}
            subtitle="In your group"
            icon={Users}
            gradient="from-blue-500 to-cyan-600"
          />
        </div>
        <div onClick={() => onPageChange('players')} className="cursor-pointer">
          <StatCard
            title="Current Champion"
            value={topWinner?.name || 'N/A'}
            subtitle={`${topWinner?.wins || 0} wins (${topWinner?.percentage.toFixed(1) || 0}%)`}
            icon={Award}
            gradient="from-yellow-500 to-orange-600"
          />
        </div>
        <div onClick={() => onPageChange('analytics')} className="cursor-pointer">
          <StatCard
            title="Average Score"
            value={averageScore.toFixed(1)}
            subtitle="Points per game"
            icon={Target}
            gradient="from-green-500 to-emerald-600"
          />
        </div>
      </div>

      {/* New Performance Metrics with Navigation */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <div onClick={() => onPageChange('analytics')} className="cursor-pointer">
          <StatCard
            title="Hot Streak"
            value={currentStreakLeader?.currentStreak || 0}
            subtitle={`${currentStreakLeader?.name || 'No one'} on fire`}
            icon={Flame}
            gradient="from-orange-500 to-red-600"
          />
        </div>
        <div onClick={() => onPageChange('analytics')} className="cursor-pointer">
          <StatCard
            title="Longest Streak"
            value={Math.max(...winStreaks.map(p => p.longestStreak))}
            subtitle={`${winStreaks[0]?.name || 'N/A'} record`}
            icon={Zap}
            gradient="from-purple-500 to-pink-600"
          />
        </div>
        <div onClick={() => onPageChange('analytics')} className="cursor-pointer">
          <StatCard
            title="Avg Game Time"
            value={durationAnalysis ? `${Math.round(durationAnalysis.averageDuration)}min` : 'N/A'}
            subtitle={durationAnalysis ? `${durationAnalysis.shortestGame}-${durationAnalysis.longestGame}min range` : 'No data'}
            icon={Clock}
            gradient="from-indigo-500 to-blue-600"
          />
        </div>
        <div onClick={() => onPageChange('analytics')} className="cursor-pointer">
          <StatCard
            title="Board Control"
            value={`${dominanceMetrics[0]?.averagePointControl.toFixed(1)}%`}
            subtitle={`${dominanceMetrics[0]?.name || 'N/A'} dominates`}
            icon={Target}
            gradient="from-emerald-500 to-teal-600"
          />
        </div>
      </div>

      {/* Recent Games & Win Distribution */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Games */}
        <div className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-pink-400" />
              <h2 className="text-lg sm:text-xl font-semibold">Recent Games</h2>
            </div>
            <button
              onClick={() => onPageChange('games')}
              className="flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-colors group"
            >
              <span className="text-sm">View All</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            {recentGames.map((game) => {
              const winningScore = Math.max(...game.players.map(p => p.score));
              const secondPlace = Math.max(...game.players.filter(p => p.score !== winningScore).map(p => p.score));
              const margin = winningScore - secondPlace;
              const isCloseGame = margin <= 2;
              
              return (
                <div 
                  key={game.id} 
                  className="bg-gray-700 rounded-lg p-3 sm:p-4 hover:bg-gray-600 transition-all duration-200 cursor-pointer transform hover:scale-[1.02]"
                  onClick={() => onPageChange('games')}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"></div>
                      <span className="font-medium text-sm sm:text-base">{game.expansion}</span>
                      {isCloseGame && (
                        <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded animate-pulse">
                          CLOSE
                        </span>
                      )}
                    </div>
                    <span className="text-gray-400 text-xs sm:text-sm">{game.date}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-pink-400 font-medium text-sm sm:text-base">Winner: {game.winner}</span>
                      <div className="text-gray-400 text-xs sm:text-sm">
                        {game.players.length} players • {game.duration}min • Margin: {margin}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs sm:text-sm text-gray-400">Winning Score</div>
                      <div className="font-bold text-base sm:text-lg">{winningScore}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Win Distribution */}
        <div className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg sm:text-xl font-semibold">Win Distribution & Streaks</h2>
            </div>
            <button
              onClick={() => onPageChange('analytics')}
              className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors group"
            >
              <span className="text-sm">Analytics</span>
              <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            {winDistribution.map((player, index) => {
              const playerStreak = winStreaks.find(p => p.name === player.name);
              return (
                <div 
                  key={player.name} 
                  className="flex items-center space-x-3 sm:space-x-4 cursor-pointer hover:bg-gray-700/50 rounded-lg p-2 transition-colors"
                  onClick={() => onPageChange('players')}
                >
                  <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-transform hover:scale-110 ${
                      index === 0 ? 'bg-gradient-to-r from-yellow-500 to-orange-600' :
                      index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600' :
                      index === 2 ? 'bg-gradient-to-r from-orange-600 to-red-600' :
                      'bg-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm sm:text-base truncate">{player.name}</span>
                        {playerStreak?.currentStreak && playerStreak.currentStreak > 0 && (
                          <span className="text-orange-400 text-xs animate-bounce">🔥{playerStreak.currentStreak}</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400">
                        Longest: {playerStreak?.longestStreak || 0} wins
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-16 sm:w-24 bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-500"
                        style={{ width: `${player.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-right min-w-[40px] sm:min-w-[60px]">
                      <div className="font-bold text-sm sm:text-base">{player.wins}</div>
                      <div className="text-xs text-gray-400">{player.percentage.toFixed(1)}%</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enhanced Expansion Popularity with Performance Metrics */}
      <div className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center space-x-3">
            <Trophy className="w-5 h-5 text-green-400" />
            <h2 className="text-lg sm:text-xl font-semibold">Expansion Analytics</h2>
          </div>
          <button
            onClick={() => onPageChange('analytics')}
            className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors group"
          >
            <span className="text-sm">Deep Dive</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {expansionStats.map((expansion, index) => {
            const expansionGames = games.filter(g => g.expansion === expansion.expansion);
            const avgScore = expansionGames.reduce((sum, game) => {
              return sum + game.players.reduce((gameSum, player) => gameSum + player.score, 0) / game.players.length;
            }, 0) / expansionGames.length;
            
            const avgDuration = durationAnalysis ? 
              expansionGames.reduce((sum, game) => sum + (game.duration || 0), 0) / expansionGames.length : 0;
            
            return (
              <div 
                key={expansion.expansion} 
                className="bg-gray-700 rounded-lg p-3 sm:p-4 hover:bg-gray-600 transition-all duration-200 cursor-pointer transform hover:scale-105"
                onClick={() => onPageChange('analytics')}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm sm:text-base truncate">{expansion.expansion}</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs sm:text-sm text-gray-400">#{index + 1}</span>
                    {index === 0 && <span className="text-yellow-400">👑</span>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="flex-1 bg-gray-600 rounded-full h-2">
                      <div 
                        className="h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500"
                        style={{ width: `${expansion.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sm sm:text-base">{expansion.count}</div>
                      <div className="text-xs text-gray-400">{expansion.percentage.toFixed(1)}%</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-center">
                      <div className="text-blue-400 font-medium">{avgScore.toFixed(1)}</div>
                      <div className="text-gray-500">Avg Score</div>
                    </div>
                    {avgDuration > 0 && (
                      <div className="text-center">
                        <div className="text-purple-400 font-medium">{Math.round(avgDuration)}min</div>
                        <div className="text-gray-500">Avg Time</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;