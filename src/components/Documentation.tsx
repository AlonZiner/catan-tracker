import React, { useState } from 'react';
import { Book, Trophy, Target, TrendingUp, Award, Users, BarChart3, Zap, Shield, Flame, ArrowLeft, ChevronDown, Info, HelpCircle } from 'lucide-react';

interface DocumentationProps {
  onBack: () => void;
}

const Documentation: React.FC<DocumentationProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedItems, setExpandedItems] = useState<string[]>(['overview']);

  const toggleExpanded = (item: string) => {
    setExpandedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const sections = [
    { id: 'overview', label: 'Overview', icon: Book },
    { id: 'stats', label: 'Statistics Guide', icon: BarChart3 },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'analytics', label: 'Analytics Explained', icon: TrendingUp },
    { id: 'tips', label: 'Pro Tips', icon: Target },
  ];

  const statsExplanations = [
    {
      name: 'Win Rate',
      description: 'Percentage of games won out of total games played',
      calculation: '(Wins ÷ Total Games) × 100',
      goodValue: '25%+ (above average for 4-player games)',
      icon: '🏆'
    },
    {
      name: 'Average Score',
      description: 'Mean points scored across all games',
      calculation: 'Sum of all scores ÷ Number of games',
      goodValue: '8.5+ points (competitive level)',
      icon: '🎯'
    },
    {
      name: 'Consistency',
      description: 'How stable your performance is across games',
      calculation: '100 - (Standard Deviation ÷ Average Score) × 100',
      goodValue: '80%+ (very consistent player)',
      icon: '📊'
    },
    {
      name: 'Clutch Ratio',
      description: 'Win rate in close games (decided by 2 points or less)',
      calculation: 'Close Wins ÷ (Close Wins + Close Losses) × 100',
      goodValue: '50%+ (performs well under pressure)',
      icon: '⚡'
    },
    {
      name: 'Market Share',
      description: 'Percentage of total points earned across all games',
      calculation: 'Your Total Points ÷ All Points Ever Scored × 100',
      goodValue: '25%+ (dominant player in group)',
      icon: '💰'
    },
    {
      name: 'Board Control',
      description: 'Average percentage of points you control per game',
      calculation: 'Average of (Your Score ÷ Game Total) × 100',
      goodValue: '30%+ (strong board presence)',
      icon: '🏰'
    }
  ];

  const achievementCategories = [
    {
      rarity: 'Common',
      color: 'text-gray-400',
      bgColor: 'bg-gray-700/50',
      achievements: [
        { name: 'First Victory', description: 'Win your first game', icon: '🏆' },
        { name: 'Settlement Spammer', description: 'Build all 5 settlements in a game', icon: '🏘️' }
      ]
    },
    {
      rarity: 'Rare',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      achievements: [
        { name: 'Hat Trick', description: 'Win 3 games in a row', icon: '🔥' },
        { name: 'Road Warrior', description: 'Win Longest Road 5 times', icon: '🛣️' },
        { name: 'Army General', description: 'Win Largest Army 5 times', icon: '⚔️' },
        { name: 'City Builder', description: 'Build 5+ cities in a single game', icon: '🏙️' },
        { name: 'Speed Demon', description: 'Win a game in under 60 minutes', icon: '💨' },
        { name: 'Marathon Master', description: 'Win a game lasting over 2 hours', icon: '⏰' }
      ]
    },
    {
      rarity: 'Epic',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      achievements: [
        { name: 'Perfect Score', description: 'Score 15+ points in a single game', icon: '⭐' },
        { name: 'Comeback King', description: 'Win after being in last place', icon: '👑' },
        { name: 'Double Trouble', description: 'Win both Longest Road and Largest Army in one game', icon: '⚡' },
        { name: 'Consistent Performer', description: 'Score within 2 points of your average for 5 games', icon: '📊' }
      ]
    },
    {
      rarity: 'Legendary',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      achievements: [
        { name: 'Expansion Master', description: 'Win with every expansion', icon: '🎯' },
        { name: 'Clutch Player', description: 'Win 5 games decided by 2 points or less', icon: '🎯' },
        { name: 'Position Master', description: 'Win from every starting position', icon: '🎲' }
      ]
    }
  ];

  const analyticsFeatures = [
    {
      name: 'Win Distribution',
      description: 'Shows how victories are spread among players',
      useCase: 'Identify the group champion and track competitive balance',
      icon: '📊'
    },
    {
      name: 'Position Analysis',
      description: 'Analyzes starting position advantages and win rates',
      useCase: 'Determine if turn order affects game outcomes',
      icon: '🎲'
    },
    {
      name: 'Expansion Performance',
      description: 'Compares player performance across different game expansions',
      useCase: 'Find which expansions favor certain players',
      icon: '🎮'
    },
    {
      name: 'Head-to-Head Matrix',
      description: 'Direct comparison of how players perform against each other',
      useCase: 'Discover rivalries and matchup advantages',
      icon: '⚔️'
    },
    {
      name: 'Clutch Performance',
      description: 'Measures performance in close, high-pressure games',
      useCase: 'Identify who performs best when it matters most',
      icon: '⚡'
    },
    {
      name: 'Win Streaks',
      description: 'Tracks current and longest winning streaks',
      useCase: 'Monitor hot streaks and momentum shifts',
      icon: '🔥'
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="text-pink-400 hover:text-pink-300 flex items-center space-x-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Documentation & Guide
        </h1>
      </div>

      {/* Navigation */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="flex overflow-x-auto">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-4 py-4 font-medium transition-colors whitespace-nowrap ${
                  activeSection === section.id
                    ? 'text-pink-400 border-b-2 border-pink-500 bg-gray-700/50'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{section.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700">
        {activeSection === 'overview' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <Book className="w-5 h-5 text-pink-400" />
                <span>Welcome to Catan Tracker</span>
              </h2>
              <p className="text-gray-300 mb-4">
                Catan Tracker transforms your casual game nights into a comprehensive competitive experience. 
                Track every game, analyze performance trends, and discover insights that will improve your strategy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2 flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span>What We Track</span>
                </h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Game dates and expansions used</li>
                  <li>• Final scores and starting positions</li>
                  <li>• Settlement and city counts</li>
                  <li>• Longest Road and Largest Army</li>
                  <li>• Game duration and intensity</li>
                </ul>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2 flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-blue-400" />
                  <span>Key Features</span>
                </h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Advanced performance analytics</li>
                  <li>• Achievement system with 15 badges</li>
                  <li>• Head-to-head comparisons</li>
                  <li>• Expansion-specific insights</li>
                  <li>• Mobile-optimized interface</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-500/10 to-purple-600/10 border border-pink-500/30 rounded-lg p-4">
              <h3 className="font-semibold text-pink-400 mb-2">💡 Pro Tip</h3>
              <p className="text-gray-300 text-sm">
                Use the filters on Analytics and Player pages to analyze specific time periods or expansions. 
                This helps identify trends and improvement areas in your gameplay.
              </p>
            </div>
          </div>
        )}

        {activeSection === 'stats' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                <span>Statistics Explained</span>
              </h2>
              <p className="text-gray-300 mb-6">
                Understanding these metrics will help you identify strengths, weaknesses, and areas for improvement in your Catan gameplay.
              </p>
            </div>

            <div className="space-y-4">
              {statsExplanations.map((stat, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-4">
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleExpanded(`stat-${index}`)}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{stat.icon}</span>
                      <h3 className="font-semibold text-white">{stat.name}</h3>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                      expandedItems.includes(`stat-${index}`) ? 'rotate-180' : ''
                    }`} />
                  </div>
                  
                  {expandedItems.includes(`stat-${index}`) && (
                    <div className="mt-4 space-y-3 border-t border-gray-600 pt-4">
                      <p className="text-gray-300">{stat.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-400 mb-1">Calculation</h4>
                          <p className="text-sm text-blue-400 font-mono">{stat.calculation}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-400 mb-1">Good Performance</h4>
                          <p className="text-sm text-green-400">{stat.goodValue}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'achievements' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span>Achievement System</span>
              </h2>
              <p className="text-gray-300 mb-6">
                Unlock achievements by reaching specific milestones. Higher rarity achievements are more challenging and prestigious!
              </p>
            </div>

            <div className="space-y-6">
              {achievementCategories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <div 
                    className="flex items-center justify-between cursor-pointer mb-4"
                    onClick={() => toggleExpanded(`category-${categoryIndex}`)}
                  >
                    <h3 className={`text-lg font-semibold ${category.color} flex items-center space-x-2`}>
                      <span>{category.rarity} Achievements</span>
                      <span className="text-sm">({category.achievements.length})</span>
                    </h3>
                    <ChevronDown className={`w-4 h-4 transition-transform ${
                      expandedItems.includes(`category-${categoryIndex}`) ? 'rotate-180' : ''
                    }`} />
                  </div>
                  
                  {expandedItems.includes(`category-${categoryIndex}`) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {category.achievements.map((achievement, index) => (
                        <div key={index} className={`${category.bgColor} rounded-lg p-4 border border-gray-600`}>
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-2xl">{achievement.icon}</span>
                            <h4 className="font-semibold text-white">{achievement.name}</h4>
                          </div>
                          <p className="text-gray-300 text-sm">{achievement.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'analytics' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                <span>Analytics Features</span>
              </h2>
              <p className="text-gray-300 mb-6">
                Dive deep into your game data with these powerful analytical tools designed to reveal patterns and insights.
              </p>
            </div>

            <div className="space-y-4">
              {analyticsFeatures.map((feature, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-4">
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleExpanded(`analytics-${index}`)}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{feature.icon}</span>
                      <h3 className="font-semibold text-white">{feature.name}</h3>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                      expandedItems.includes(`analytics-${index}`) ? 'rotate-180' : ''
                    }`} />
                  </div>
                  
                  {expandedItems.includes(`analytics-${index}`) && (
                    <div className="mt-4 space-y-3 border-t border-gray-600 pt-4">
                      <p className="text-gray-300">{feature.description}</p>
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-1">Best Used For</h4>
                        <p className="text-sm text-purple-400">{feature.useCase}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'tips' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <Target className="w-5 h-5 text-green-400" />
                <span>Pro Tips & Best Practices</span>
              </h2>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-600/10 border border-green-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-green-400 mb-2 flex items-center space-x-2">
                  <Info className="w-4 h-4" />
                  <span>Data Collection Tips</span>
                </h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Record games immediately after playing for accuracy</li>
                  <li>• Include settlement and city counts for better analysis</li>
                  <li>• Note game duration to track pacing improvements</li>
                  <li>• Be consistent with expansion naming</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 to-cyan-600/10 border border-blue-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-blue-400 mb-2 flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>Analysis Best Practices</span>
                </h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Use date filters to analyze recent performance trends</li>
                  <li>• Compare expansion-specific performance to find strengths</li>
                  <li>• Monitor consistency scores to identify improvement areas</li>
                  <li>• Check head-to-head stats before challenging friends</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-purple-500/10 to-pink-600/10 border border-purple-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-purple-400 mb-2 flex items-center space-x-2">
                  <Trophy className="w-4 h-4" />
                  <span>Competitive Insights</span>
                </h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Focus on clutch performance to win close games</li>
                  <li>• Track position analysis to optimize seating choices</li>
                  <li>• Use achievement goals to motivate improvement</li>
                  <li>• Monitor win streaks to identify hot/cold periods</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-600/10 border border-yellow-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-400 mb-2 flex items-center space-x-2">
                  <HelpCircle className="w-4 h-4" />
                  <span>Troubleshooting</span>
                </h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• If stats seem off, check for duplicate or missing games</li>
                  <li>• Use filters to isolate specific time periods or expansions</li>
                  <li>• Refresh the page if data doesn't update immediately</li>
                  <li>• Contact support if achievements don't unlock properly</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documentation;