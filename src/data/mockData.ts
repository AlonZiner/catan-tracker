import { GameRecord, Player, Achievement } from '../types';

export const mockPlayers: Player[] = [
  { playerId: '1', name: 'Alex', avatar: '🎯', joinDate: '2024-01-15' },
  { playerId: '2', name: 'Jordan', avatar: '🏆', joinDate: '2024-01-15' },
  { playerId: '3', name: 'Sam', avatar: '⚡', joinDate: '2024-02-01' },
  { playerId: '4', name: 'Casey', avatar: '🔥', joinDate: '2024-02-15' },
  { playerId: '5', name: 'Riley', avatar: '💎', joinDate: '2024-03-01' },
];

export const expansions = [
  'Base Game',
  'Seafarers',
  'Cities & Knights',
  'Traders & Barbarians',
  'Explorers & Pirates',
  'Rise of the Inkas',
];

export const mockGames: GameRecord[] = [
  {
    id: '1',
    date: '2024-12-15',
    expansion: 'Cities & Knights',
    winner: 'Alex',
    duration: 124,
    players: [
      { playerId: '1', playerName: 'Alex', score: 13, startingPosition: 1, settlements: 3, cities: 4, longestRoad: true, largestArmy: false },
      { playerId: '2', playerName: 'Jordan', score: 11, startingPosition: 2, settlements: 4, cities: 2, longestRoad: false, largestArmy: true },
      { playerId: '3', playerName: 'Sam', score: 9, startingPosition: 3, settlements: 5, cities: 1, longestRoad: false, largestArmy: false },
      { playerId: '4', playerName: 'Casey', score: 8, startingPosition: 4, settlements: 4, cities: 2, longestRoad: false, largestArmy: false },
    ]
  },
  {
    id: '2',
    date: '2024-12-10',
    expansion: 'Base Game',
    winner: 'Jordan',
    duration: 90,
    players: [
      { playerId: '1', playerName: 'Alex', score: 9, startingPosition: 3, settlements: 4, cities: 2, longestRoad: false, largestArmy: false },
      { playerId: '2', playerName: 'Jordan', score: 10, startingPosition: 1, settlements: 3, cities: 3, longestRoad: true, largestArmy: false },
      { playerId: '3', playerName: 'Sam', score: 8, startingPosition: 2, settlements: 5, cities: 1, longestRoad: false, largestArmy: true },
      { playerId: '5', playerName: 'Riley', score: 7, startingPosition: 4, settlements: 4, cities: 1, longestRoad: false, largestArmy: false },
    ]
  },
  {
    id: '3',
    date: '2024-12-05',
    expansion: 'Seafarers',
    winner: 'Sam',
    duration: 105,
    players: [
      { playerId: '1', playerName: 'Alex', score: 8, startingPosition: 2, settlements: 4, cities: 2, longestRoad: false, largestArmy: false },
      { playerId: '2', playerName: 'Jordan', score: 9, startingPosition: 4, settlements: 3, cities: 3, longestRoad: false, largestArmy: false },
      { playerId: '3', playerName: 'Sam', score: 10, startingPosition: 1, settlements: 2, cities: 4, longestRoad: true, largestArmy: true },
      { playerId: '4', playerName: 'Casey', score: 6, startingPosition: 3, settlements: 3, cities: 1, longestRoad: false, largestArmy: false },
    ]
  },
  {
    id: '4',
    date: '2024-11-28',
    expansion: 'Base Game',
    winner: 'Casey',
    duration: 85,
    players: [
      { playerId: '1', playerName: 'Alex', score: 7, startingPosition: 4, settlements: 3, cities: 2, longestRoad: false, largestArmy: false },
      { playerId: '2', playerName: 'Jordan', score: 8, startingPosition: 3, settlements: 4, cities: 2, longestRoad: true, largestArmy: false },
      { playerId: '4', playerName: 'Casey', score: 10, startingPosition: 1, settlements: 2, cities: 4, longestRoad: false, largestArmy: true },
      { playerId: '5', playerName: 'Riley', score: 9, startingPosition: 2, settlements: 3, cities: 3, longestRoad: false, largestArmy: false },
    ]
  },
  {
    id: '5',
    date: '2024-11-20',
    expansion: 'Cities & Knights',
    winner: 'Riley',
    duration: 140,
    players: [
      { playerId: '1', playerName: 'Alex', score: 11, startingPosition: 1, settlements: 3, cities: 4, longestRoad: false, largestArmy: true },
      { playerId: '3', playerName: 'Sam', score: 9, startingPosition: 2, settlements: 4, cities: 2, longestRoad: false, largestArmy: false },
      { playerId: '4', playerName: 'Casey', score: 8, startingPosition: 3, settlements: 5, cities: 1, longestRoad: false, largestArmy: false },
      { playerId: '5', playerName: 'Riley', score: 13, startingPosition: 4, settlements: 1, cities: 6, longestRoad: true, largestArmy: false },
    ]
  },
  {
    id: '6',
    date: '2024-11-15',
    expansion: 'Seafarers',
    winner: 'Alex',
    duration: 95,
    players: [
      { playerId: '1', playerName: 'Alex', score: 15, startingPosition: 2, settlements: 2, cities: 5, longestRoad: true, largestArmy: true },
      { playerId: '2', playerName: 'Jordan', score: 7, startingPosition: 1, settlements: 4, cities: 1, longestRoad: false, largestArmy: false },
      { playerId: '3', playerName: 'Sam', score: 6, startingPosition: 3, settlements: 5, cities: 0, longestRoad: false, largestArmy: false },
      { playerId: '4', playerName: 'Casey', score: 8, startingPosition: 4, settlements: 3, cities: 2, longestRoad: false, largestArmy: false },
    ]
  },
  {
    id: '7',
    date: '2024-11-10',
    expansion: 'Base Game',
    winner: 'Jordan',
    duration: 75,
    players: [
      { playerId: '1', playerName: 'Alex', score: 8, startingPosition: 1, settlements: 4, cities: 2, longestRoad: false, largestArmy: false },
      { playerId: '2', playerName: 'Jordan', score: 12, startingPosition: 3, settlements: 2, cities: 5, longestRoad: false, largestArmy: true },
      { playerId: '4', playerName: 'Casey', score: 9, startingPosition: 2, settlements: 3, cities: 3, longestRoad: true, largestArmy: false },
      { playerId: '5', playerName: 'Riley', score: 7, startingPosition: 4, settlements: 4, cities: 1, longestRoad: false, largestArmy: false },
    ]
  },
  {
    id: '8',
    date: '2024-11-05',
    expansion: 'Cities & Knights',
    winner: 'Sam',
    duration: 130,
    players: [
      { playerId: '1', playerName: 'Alex', score: 9, startingPosition: 4, settlements: 3, cities: 3, longestRoad: false, largestArmy: false },
      { playerId: '2', playerName: 'Jordan', score: 10, startingPosition: 2, settlements: 4, cities: 2, longestRoad: true, largestArmy: false },
      { playerId: '3', playerName: 'Sam', score: 14, startingPosition: 1, settlements: 1, cities: 6, longestRoad: false, largestArmy: true },
      { playerId: '5', playerName: 'Riley', score: 8, startingPosition: 3, settlements: 5, cities: 1, longestRoad: false, largestArmy: false },
    ]
  },
];

export const achievements: Achievement[] = [
  {
    id: 'first_win',
    name: 'First Victory',
    description: 'Win your first game',
    icon: '🏆',
    rarity: 'common'
  },
  {
    id: 'perfect_score',
    name: 'Perfect Score',
    description: 'Score 15+ points in a single game',
    icon: '⭐',
    rarity: 'epic'
  },
  {
    id: 'win_streak_3',
    name: 'Hat Trick',
    description: 'Win 3 games in a row',
    icon: '🔥',
    rarity: 'rare'
  },
  {
    id: 'expansion_master',
    name: 'Expansion Master',
    description: 'Win with every expansion',
    icon: '🎯',
    rarity: 'legendary'
  },
  {
    id: 'road_warrior',
    name: 'Road Warrior',
    description: 'Win Longest Road 5 times',
    icon: '🛣️',
    rarity: 'rare'
  },
  {
    id: 'army_general',
    name: 'Army General',
    description: 'Win Largest Army 5 times',
    icon: '⚔️',
    rarity: 'rare'
  },
  {
    id: 'comeback_king',
    name: 'Comeback King',
    description: 'Win after being in last place',
    icon: '👑',
    rarity: 'epic'
  },
  {
    id: 'city_builder',
    name: 'City Builder',
    description: 'Build 5+ cities in a single game',
    icon: '🏙️',
    rarity: 'rare'
  },
  {
    id: 'settlement_spammer',
    name: 'Settlement Spammer',
    description: 'Build all 5 settlements in a game',
    icon: '🏘️',
    rarity: 'common'
  },
  {
    id: 'double_trouble',
    name: 'Double Trouble',
    description: 'Win both Longest Road and Largest Army in one game',
    icon: '⚡',
    rarity: 'epic'
  },
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Win a game in under 60 minutes',
    icon: '💨',
    rarity: 'rare'
  },
  {
    id: 'marathon_master',
    name: 'Marathon Master',
    description: 'Win a game lasting over 2 hours',
    icon: '⏰',
    rarity: 'rare'
  },
  {
    id: 'consistent_performer',
    name: 'Consistent Performer',
    description: 'Score within 2 points of your average for 5 games',
    icon: '📊',
    rarity: 'epic'
  },
  {
    id: 'clutch_player',
    name: 'Clutch Player',
    description: 'Win 5 games decided by 2 points or less',
    icon: '🎯',
    rarity: 'legendary'
  },
  {
    id: 'position_master',
    name: 'Position Master',
    description: 'Win from every starting position',
    icon: '🎲',
    rarity: 'legendary'
  }
];