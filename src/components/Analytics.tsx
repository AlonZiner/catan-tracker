import React, { useState } from 'react';
import { BarChart3, TrendingUp, Target, Users, Trophy, MapPin, Zap, Clock, Flame, Shield, ArrowLeft, Eye, Filter, ChevronDown, PieChart } from 'lucide-react';
import { 
  getWinDistribution, 
  getExpansionStats, 
  getAverageScoreByPosition,
  getWinRateByPosition,
  getScoreConsistency,
  getExpansionPerformance,
  getMonthlyTrends,
  getDominanceMetrics,
  getHeadToHeadMatrix,
  getWinStreaks,
  getGameDurationAnalysis,
  getClutchPerformance
} from '../utils/statsCalculator';
import { GameRecord, Player } from '../types';

interface AnalyticsProps {
  games: GameRecord[];
  players: Player[];
  onPageChange: (page: string) => void;
}

const Analytics: React.FC<AnalyticsProps> = ({  games, players, onPageChange }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateFilter, setDateFilter] = useState({ start: '', end: '' });
  const [expansionFilter, setExpansionFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Filter games based on selected filters
  const filteredGames = games.filter(game => {
    const gameDate = new Date(game.date);
    const startDate = dateFilter.start ? new Date(dateFilter.start) : null;
    const endDate = dateFilter.end ? new Date(dateFilter.end) : null;
    
    const dateMatch = (!startDate || gameDate >= startDate) && (!endDate || gameDate <= endDate);
    const expansionMatch = !expansionFilter || game.expansion === expansionFilter;
    
    return dateMatch && expansionMatch;
  });

  const winDistribution = getWinDistribution(filteredGames);
  const expansionStats = getExpansionStats(filteredGames);
  const positionStats = getAverageScoreByPosition(filteredGames);
  const positionWinRates = getWinRateByPosition(filteredGames);
  const consistencyStats = getScoreConsistency(filteredGames);
  const expansionPerformance = getExpansionPerformance(filteredGames);
  const monthlyTrends = getMonthlyTrends(filteredGames);
  const dominanceMetrics = getDominanceMetrics(filteredGames);
  const headToHeadMatrix = getHeadToHeadMatrix(filteredGames);
  const winStreaks = getWinStreaks(filteredGames);
  const durationAnalysis = getGameDurationAnalysis(filteredGames);
  const clutchPerformance = getClutchPerformance(filteredGames);

  const clearFilters = () => {
    setDateFilter({ start: '', end: '' });
    setExpansionFilter('');
  };

  const hasActiveFilters = dateFilter.start || dateFilter.end || expansionFilter;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'charts', label: 'Charts', icon: PieChart },
    { id: 'positions', label: 'Positions', icon: MapPin },
    { id: 'dominance', label: 'Dominance', icon: Trophy },
    { id: 'consistency', label: 'Consistency', icon: Target },
    { id: 'clutch', label: 'Clutch', icon: Zap },
    { id: 'streaks', label: 'Streaks', icon: Flame },
    { id: 'head2head', label: 'Head-to-Head', icon: Shield },
    { id: 'trends', label: 'Trends', icon: TrendingUp },
  ];

  const getScoreDistribution = () => {
    const scores: number[] = [];
    filteredGames.forEach(game => {
      game.players.forEach(player => {
        scores.push(player.score);
      });
    });

    const distribution: { [key: string]: number } = {};
    scores.forEach(score => {
      const range = `${Math.floor(score / 2) * 2}-${Math.floor(score / 2) * 2 + 1}`;
      distribution[range] = (distribution[range] || 0) + 1;
    });

    return Object.entries(distribution)
      .map(([range, count]) => ({ range, count, percentage: (count / scores.length) * 100 }))
      .sort((a, b) => parseInt(a.range) - parseInt(b.range));
  };

  const scoreDistribution = getScoreDistribution();

  // Pie Chart Component
  const PieChartComponent = ({ data, title }: { data: any[], title: string }) => {
    const total = data.reduce((sum, item) => sum + item.count, 0);
    let currentAngle = 0;
    
    return (
      <div className="bg-gray-700 rounded-lg p-4">
        <h4 className="text-lg font-semibold mb-4 text-center">{title}</h4>
        <div className="flex items-center justify-center">
          <div className="relative w-48 h-48">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              {data.map((item, index) => {
                const percentage = (item.count / total) * 100;
                const angle = (percentage / 100) * 360;
                const x1 = 50 + 40 * Math.cos((currentAngle * Math.PI) / 180);
                const y1 = 50 + 40 * Math.sin((currentAngle * Math.PI) / 180);
                const x2 = 50 + 40 * Math.cos(((currentAngle + angle) * Math.PI) / 180);
                const y2 = 50 + 40 * Math.sin(((currentAngle + angle) * Math.PI) / 180);
                
                const largeArcFlag = angle > 180 ? 1 : 0;
                const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
                
                const colors = [
                  'fill-pink-500', 'fill-purple-500', 'fill-blue-500', 
                  'fill-green-500', 'fill-yellow-500', 'fill-red-500'
                ];
                
                currentAngle += angle;
                
                return (
                  <path
                    key={index}
                    d={pathData}
                    className={`${colors[index % colors.length]} opacity-80 hover:opacity-100 transition-opacity`}
                    stroke="white"
                    strokeWidth="0.5"
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{total}</div>
                <div className="text-xs text-gray-400">Total</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {data.map((item, index) => {
            const colors = [
              'bg-pink-500', 'bg-purple-500', 'bg-blue-500', 
              'bg-green-500', 'bg-yellow-500', 'bg-red-500'
            ];
            return (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`}></div>
                <span className="text-white flex-1">{item.name || item.expansion}</span>
                <span className="text-gray-400">{item.count}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Radar Chart Component
  const RadarChart = ({ players }: { players: any[] }) => {
    const metrics = ['winRate', 'averageScore', 'consistency', 'clutchRatio'];
    const maxValues = {
      winRate: 100,
      averageScore: 15,
      consistency: 100,
      clutchRatio: 100
    };

    return (
      <div className="bg-gray-700 rounded-lg p-4">
        <h4 className="text-lg font-semibold mb-4 text-center">Player Comparison Radar</h4>
        <div className="flex justify-center">
          <div className="relative w-64 h-64">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Grid lines */}
              {[1, 2, 3, 4, 5].map(level => (
                <polygon
                  key={level}
                  points="100,20 173,65 173,135 100,180 27,135 27,65"
                  fill="none"
                  stroke="rgb(75, 85, 99)"
                  strokeWidth="0.5"
                  transform={`scale(${level * 0.2}) translate(${100 - level * 20}, ${100 - level * 20})`}
                />
              ))}
              
              {/* Axis lines */}
              {metrics.map((_, index) => {
                const angle = (index * 360) / metrics.length - 90;
                const x = 100 + 80 * Math.cos((angle * Math.PI) / 180);
                const y = 100 + 80 * Math.sin((angle * Math.PI) / 180);
                return (
                  <line
                    key={index}
                    x1="100"
                    y1="100"
                    x2={x}
                    y2={y}
                    stroke="rgb(75, 85, 99)"
                    strokeWidth="0.5"
                  />
                );
              })}

              {/* Player data */}
              {players.slice(0, 3).map((player, playerIndex) => {
                const points = metrics.map((metric, index) => {
                  const value = player[metric] || 0;
                  const normalizedValue = (value / maxValues[metric as keyof typeof maxValues]) * 80;
                  const angle = (index * 360) / metrics.length - 90;
                  const x = 100 + normalizedValue * Math.cos((angle * Math.PI) / 180);
                  const y = 100 + normalizedValue * Math.sin((angle * Math.PI) / 180);
                  return `${x},${y}`;
                }).join(' ');

                const colors = ['stroke-pink-500 fill-pink-500/20', 'stroke-purple-500 fill-purple-500/20', 'stroke-blue-500 fill-blue-500/20'];
                
                return (
                  <polygon
                    key={playerIndex}
                    points={points}
                    className={colors[playerIndex]}
                    strokeWidth="2"
                  />
                );
              })}

              {/* Labels */}
              {metrics.map((metric, index) => {
                const angle = (index * 360) / metrics.length - 90;
                const x = 100 + 95 * Math.cos((angle * Math.PI) / 180);
                const y = 100 + 95 * Math.sin((angle * Math.PI) / 180);
                return (
                  <text
                    key={index}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-gray-300 text-xs"
                  >
                    {metric}
                  </text>
                );
              })}
            </svg>
          </div>
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          {players.slice(0, 3).map((player, index) => {
            const colors = ['text-pink-400', 'text-purple-400', 'text-blue-400'];
            return (
              <div key={index} className={`text-sm ${colors[index]}`}>
                {player.name}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-20 lg:pb-0">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Advanced Analytics
        </h1>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onPageChange('players')}
            className="hidden sm:flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-colors"
          >
            <Users className="w-4 h-4" />
            <span className="text-sm">Players</span>
          </button>
          <button
            onClick={() => onPageChange('games')}
            className="hidden sm:flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span className="text-sm">Games</span>
          </button>
          <div className="text-gray-400 text-xs sm:text-sm">
            Data from {filteredGames.length} games
          </div>
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

      {/* Tabs */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        {/* Mobile Tab Selector */}
        <div className="lg:hidden">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border-b border-gray-700 rounded-t-xl text-white focus:outline-none"
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id}>{tab.label}</option>
            ))}
          </select>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden lg:flex border-b border-gray-700 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-4 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-pink-400 border-b-2 border-pink-500 bg-gray-700/50'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-4 sm:p-6">
          {activeTab === 'overview' && (
            <div className="space-y-4 sm:space-y-6">
              {/* Score Distribution */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center space-x-2">
                  <Target className="w-5 h-5 text-pink-400" />
                  <span>Score Distribution</span>
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                  {scoreDistribution.map((item) => (
                    <div key={item.range} className="bg-gray-700 rounded-lg p-3 sm:p-4 text-center hover:bg-gray-600 transition-colors">
                      <div className="text-base sm:text-lg font-bold text-white">{item.count}</div>
                      <div className="text-gray-400 text-xs sm:text-sm">{item.range} pts</div>
                      <div className="text-pink-400 text-xs">{item.percentage.toFixed(1)}%</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Win Rate Comparison */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg sm:text-xl font-semibold flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-purple-400" />
                    <span>Win Rate Comparison</span>
                  </h3>
                  <button
                    onClick={() => onPageChange('players')}
                    className="text-purple-400 hover:text-purple-300 transition-colors text-sm"
                  >
                    View Player Profiles →
                  </button>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  {winDistribution.map((player, index) => (
                    <div 
                      key={player.name} 
                      className="flex items-center space-x-3 sm:space-x-4 cursor-pointer hover:bg-gray-700/50 rounded-lg p-2 transition-colors"
                      onClick={() => onPageChange('players')}
                    >
                      <div className="w-16 sm:w-24 text-white font-medium text-sm sm:text-base truncate">{player.name}</div>
                      <div className="flex-1 bg-gray-700 rounded-full h-4 sm:h-6 relative">
                        <div 
                          className="h-4 sm:h-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
                          style={{ width: `${player.percentage}%` }}
                        >
                          <span className="text-white text-xs sm:text-sm font-medium">
                            {player.percentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="w-12 sm:w-16 text-right text-gray-400 text-xs sm:text-sm">
                        {player.wins}/{filteredGames.filter(g => g.players.some(p => p.playerName === player.name)).length}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monthly Activity */}
              {monthlyTrends.length > 0 && (
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                    <span>Monthly Activity</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {monthlyTrends.slice(-6).map((month) => (
                      <div key={month.month} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors">
                        <div className="text-lg font-bold text-white mb-2">
                          {new Date(month.month + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Games</span>
                            <span className="text-white font-medium">{month.games}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Avg Score</span>
                            <span className="text-blue-400 font-medium">{month.averageScore.toFixed(1)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Players</span>
                            <span className="text-purple-400 font-medium">{month.uniquePlayers}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'charts' && (
            <div className="space-y-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center space-x-2">
                <PieChart className="w-5 h-5 text-blue-400" />
                <span>Visual Analytics</span>
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PieChartComponent 
                  data={winDistribution.map(p => ({ name: p.name, count: p.wins }))} 
                  title="Win Distribution" 
                />
                <PieChartComponent 
                  data={expansionStats} 
                  title="Expansion Popularity" 
                />
              </div>
              
              <div className="mt-8">
                <RadarChart 
                  players={consistencyStats.map(p => ({
                    name: p.name,
                    winRate: winDistribution.find(w => w.name === p.name)?.percentage || 0,
                    averageScore: p.averageScore,
                    consistency: p.consistency,
                    clutchRatio: clutchPerformance.find(c => c.name === p.name)?.clutchRatio || 0
                  }))} 
                />
              </div>
            </div>
          )}

          {activeTab === 'positions' && (
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-green-400" />
                <span>Starting Position Analysis</span>
              </h3>
              
              {/* Position Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {positionStats.map((stat) => {
                  const winRate = positionWinRates.find(p => p.position === stat.position);
                  return (
                    <div key={stat.position} className="bg-gray-700 rounded-lg p-4 sm:p-6 text-center hover:bg-gray-600 transition-colors">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-sm sm:text-base">{stat.position}</span>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="text-xl sm:text-2xl font-bold text-white">
                            {stat.averageScore.toFixed(1)}
                          </div>
                          <div className="text-gray-400 text-xs sm:text-sm">Avg Score</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-green-400">
                            {winRate?.winRate.toFixed(1)}%
                          </div>
                          <div className="text-gray-400 text-xs sm:text-sm">Win Rate</div>
                        </div>
                        <div className="text-gray-500 text-xs mt-1">
                          {stat.games} games
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Position Advantage Chart */}
              <div className="bg-gray-700 rounded-lg p-4 sm:p-6">
                <h4 className="text-base sm:text-lg font-semibold mb-4">Position Advantage</h4>
                <div className="space-y-3">
                  {positionWinRates.map((stat, index) => (
                    <div key={stat.position} className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-16 sm:w-20 text-gray-400 text-sm">Position {stat.position}</div>
                      <div className="flex-1 bg-gray-600 rounded-full h-3 sm:h-4">
                        <div 
                          className="h-3 sm:h-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-1000"
                          style={{ width: `${stat.winRate}%` }}
                        ></div>
                      </div>
                      <div className="w-16 sm:w-20 text-right">
                        <div className="text-white font-medium text-sm">{stat.winRate.toFixed(1)}%</div>
                        <div className="text-gray-400 text-xs">{stat.wins}/{stat.total}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dominance' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-semibold flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span>Board Dominance Metrics</span>
                </h3>
                <button
                  onClick={() => onPageChange('players')}
                  className="text-yellow-400 hover:text-yellow-300 transition-colors text-sm"
                >
                  View Player Details →
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {dominanceMetrics.map((player, index) => (
                  <div 
                    key={player.name} 
                    className="bg-gray-700 rounded-lg p-4 sm:p-6 hover:bg-gray-600 transition-colors cursor-pointer"
                    onClick={() => onPageChange('players')}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-white text-base sm:text-lg">{player.name}</h4>
                      <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${
                        index === 0 ? 'bg-gradient-to-r from-yellow-500 to-orange-600' :
                        index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600' :
                        index === 2 ? 'bg-gradient-to-r from-orange-600 to-red-600' :
                        'bg-gray-600'
                      }`}>
                        {index + 1}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Market Share</span>
                        <span className="text-yellow-400 font-bold text-sm">{player.marketShare.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Avg Point Control</span>
                        <span className="text-white font-medium text-sm">{player.averagePointControl.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Avg Settlements</span>
                        <span className="text-blue-400 font-medium text-sm">{player.averageSettlements.toFixed(1)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Avg Cities</span>
                        <span className="text-purple-400 font-medium text-sm">{player.averageCities.toFixed(1)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Special Achievements</span>
                        <span className="text-green-400 font-medium text-sm">{player.specialAchievementRate.toFixed(1)}%</span>
                      </div>
                      
                      <div className="w-full bg-gray-600 rounded-full h-2 mt-3">
                        <div 
                          className="h-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full transition-all duration-1000"
                          style={{ width: `${player.marketShare * 2}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'consistency' && (
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center space-x-2">
                <Target className="w-5 h-5 text-blue-400" />
                <span>Performance Consistency</span>
              </h3>
              
              <div className="space-y-4">
                {consistencyStats.map((player, index) => (
                  <div 
                    key={player.name} 
                    className="bg-gray-700 rounded-lg p-4 sm:p-6 hover:bg-gray-600 transition-colors cursor-pointer"
                    onClick={() => onPageChange('players')}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-white text-base sm:text-lg">{player.name}</h4>
                      <div className="text-right">
                        <div className="text-blue-400 font-bold text-lg">{player.consistency.toFixed(1)}%</div>
                        <div className="text-gray-400 text-xs">Consistency</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-white font-bold text-base">{player.averageScore.toFixed(1)}</div>
                        <div className="text-gray-400 text-xs">Avg Score</div>
                      </div>
                      <div>
                        <div className="text-yellow-400 font-bold text-base">{player.standardDeviation.toFixed(1)}</div>
                        <div className="text-gray-400 text-xs">Std Dev</div>
                      </div>
                      <div>
                        <div className="text-purple-400 font-bold text-base">{player.range}</div>
                        <div className="text-gray-400 text-xs">Range</div>
                      </div>
                      <div>
                        <div className={`font-bold text-base ${
                          player.consistency > 80 ? 'text-green-400' :
                          player.consistency > 60 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {player.consistency > 80 ? 'Stable' :
                           player.consistency > 60 ? 'Variable' : 'Volatile'}
                        </div>
                        <div className="text-gray-400 text-xs">Rating</div>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-600 rounded-full h-2 mt-4">
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          player.consistency > 80 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                          player.consistency > 60 ? 'bg-gradient-to-r from-yellow-500 to-orange-600' :
                          'bg-gradient-to-r from-red-500 to-pink-600'
                        }`}
                        style={{ width: `${player.consistency}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'clutch' && (
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span>Clutch Performance</span>
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {clutchPerformance.map((player, index) => (
                  <div 
                    key={player.name} 
                    className="bg-gray-700 rounded-lg p-4 sm:p-6 hover:bg-gray-600 transition-colors cursor-pointer"
                    onClick={() => onPageChange('players')}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-white text-base sm:text-lg">{player.name}</h4>
                      <div className="text-right">
                        <div className="text-yellow-400 font-bold text-lg">{player.clutchRatio.toFixed(1)}%</div>
                        <div className="text-gray-400 text-xs">Clutch Rate</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-green-400 font-bold text-base">{player.closeWins}</div>
                        <div className="text-gray-400 text-xs">Close Wins</div>
                      </div>
                      <div>
                        <div className="text-red-400 font-bold text-base">{player.closeLosses}</div>
                        <div className="text-gray-400 text-xs">Close Losses</div>
                      </div>
                      <div>
                        <div className="text-blue-400 font-bold text-base">{player.blowoutWins}</div>
                        <div className="text-gray-400 text-xs">Blowout Wins</div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Clutch Performance</span>
                        <span>{player.closeWins}/{player.closeWins + player.closeLosses}</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div 
                          className="h-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full transition-all duration-1000"
                          style={{ width: `${player.clutchRatio}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'streaks' && (
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center space-x-2">
                <Flame className="w-5 h-5 text-orange-400" />
                <span>Win Streaks</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {winStreaks.map((player, index) => (
                  <div 
                    key={player.name} 
                    className="bg-gray-700 rounded-lg p-4 sm:p-6 hover:bg-gray-600 transition-colors cursor-pointer"
                    onClick={() => onPageChange('players')}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-white text-base">{player.name}</h4>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        player.currentStreak > 0 ? 'bg-gradient-to-r from-orange-500 to-red-600' : 'bg-gray-600'
                      }`}>
                        {player.currentStreak > 0 ? '🔥' : '💤'}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Current Streak</span>
                        <span className={`font-bold text-sm ${
                          player.currentStreak > 0 ? 'text-orange-400' : 'text-gray-400'
                        }`}>
                          {player.currentStreak} {player.currentStreak === 1 ? 'win' : 'wins'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Longest Streak</span>
                        <span className="text-red-400 font-bold text-sm">
                          {player.longestStreak} {player.longestStreak === 1 ? 'win' : 'wins'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Last Game</span>
                        <span className="text-white text-sm">
                          {new Date(player.lastGame).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-600 rounded-full h-2 mt-4">
                      <div 
                        className="h-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min((player.longestStreak / Math.max(...winStreaks.map(p => p.longestStreak))) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'head2head' && (
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center space-x-2">
                <Shield className="w-5 h-5 text-purple-400" />
                <span>Head-to-Head Matrix</span>
              </h3>
              
              <div className="bg-gray-700 rounded-lg p-4 sm:p-6 overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr>
                      <th className="text-left p-2 text-gray-400">Player</th>
                      {players.slice(0, 4).map(player => (
                        <th key={player.id} className="text-center p-2 text-gray-400 min-w-[80px]">{player.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {players.slice(0, 4).map(player => (
                      <tr key={player.id} className="hover:bg-gray-600/50 transition-colors">
                        <td className="p-2 font-medium text-white">{player.name}</td>
                        {players.slice(0, 4).map(opponent => (
                          <td key={opponent.id} className="text-center p-2">
                            {player.name === opponent.name ? (
                              <span className="text-gray-500">-</span>
                            ) : (
                              <div className="text-center">
                                <div className="text-white font-medium">
                                  {headToHeadMatrix[player.name]?.[opponent.name]?.wins || 0}W-
                                  {headToHeadMatrix[player.name]?.[opponent.name]?.losses || 0}L
                                </div>
                                <div className="text-gray-400 text-xs">
                                  {headToHeadMatrix[player.name]?.[opponent.name]?.avgScoreDiff > 0 ? '+' : ''}
                                  {headToHeadMatrix[player.name]?.[opponent.name]?.avgScoreDiff?.toFixed(1) || '0.0'}
                                </div>
                              </div>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'trends' && (
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span>Performance Trends</span>
              </h3>
              
              {/* Game Duration Analysis */}
              {durationAnalysis && (
                <div className="bg-gray-700 rounded-lg p-4 sm:p-6">
                  <h4 className="text-base sm:text-lg font-semibold mb-4 flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span>Game Duration Analysis</span>
                  </h4>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-blue-400">
                        {Math.round(durationAnalysis.averageDuration)}min
                      </div>
                      <div className="text-gray-400 text-xs sm:text-sm">Average</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-green-400">
                        {durationAnalysis.shortestGame}min
                      </div>
                      <div className="text-gray-400 text-xs sm:text-sm">Shortest</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-red-400">
                        {durationAnalysis.longestGame}min
                      </div>
                      <div className="text-gray-400 text-xs sm:text-sm">Longest</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-purple-400">
                        {durationAnalysis.longestGame - durationAnalysis.shortestGame}min
                      </div>
                      <div className="text-gray-400 text-xs sm:text-sm">Range</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {durationAnalysis.expansionDurations.map(expansion => (
                      <div key={expansion.expansion} className="flex items-center space-x-3 sm:space-x-4">
                        <div className="w-24 sm:w-32 text-gray-400 text-xs sm:text-sm truncate">{expansion.expansion}</div>
                        <div className="flex-1 bg-gray-600 rounded-full h-2 sm:h-3">
                          <div 
                            className="h-2 sm:h-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full transition-all duration-1000"
                            style={{ width: `${(expansion.averageDuration / durationAnalysis.longestGame) * 100}%` }}
                          ></div>
                        </div>
                        <div className="w-12 sm:w-16 text-right text-white text-xs sm:text-sm">
                          {Math.round(expansion.averageDuration)}min
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Expansion Performance */}
              <div className="bg-gray-700 rounded-lg p-4 sm:p-6">
                <h4 className="text-base sm:text-lg font-semibold mb-4">Expansion Performance by Player</h4>
                <div className="space-y-4">
                  {Object.entries(expansionPerformance).map(([expansion, players]) => (
                    <div key={expansion}>
                      <h5 className="font-medium text-white mb-2">{expansion}</h5>
                      <div className="space-y-2">
                        {players.slice(0, 3).map((player, index) => (
                          <div 
                            key={player.name} 
                            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-600/50 rounded p-2 transition-colors"
                            onClick={() => onPageChange('players')}
                          >
                            <div className={`w-4 h-4 rounded-full ${
                              index === 0 ? 'bg-yellow-500' :
                              index === 1 ? 'bg-gray-400' :
                              'bg-orange-600'
                            }`}></div>
                            <div className="w-20 text-white text-sm truncate">{player.name}</div>
                            <div className="flex-1 bg-gray-600 rounded-full h-2">
                              <div 
                                className="h-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-500"
                                style={{ width: `${player.winRate}%` }}
                              ></div>
                            </div>
                            <div className="w-16 text-right text-xs text-gray-400">
                              {player.winRate.toFixed(1)}% ({player.wins}/{player.games})
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/30 rounded-xl p-4 sm:p-6">
        <h3 className="text-lg font-semibold mb-4 text-blue-400">Analytics Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => onPageChange('players')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 p-3 rounded-lg text-white font-medium transition-all duration-200 transform hover:scale-105"
          >
            View Players
          </button>
          <button
            onClick={() => onPageChange('games')}
            className="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg text-white font-medium transition-all duration-200 transform hover:scale-105"
          >
            Game History
          </button>
          <button
            onClick={() => onPageChange('add-game')}
            className="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg text-white font-medium transition-all duration-200 transform hover:scale-105"
          >
            Add Game
          </button>
          <button
            onClick={() => onPageChange('dashboard')}
            className="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg text-white font-medium transition-all duration-200 transform hover:scale-105"
          >
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;