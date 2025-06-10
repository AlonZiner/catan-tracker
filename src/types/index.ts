export interface Player {
  playerId: string;
  name: string;
  avatar?: string;
  joinDate: string;
}

export interface GameRecord {
  id: string;
  date: string;
  expansion: string;
  winner: string;
  players: PlayerScore[];
  duration?: number | null; // in minutes
}

export interface PlayerScore {
  playerId: string;
  playerName: string;
  score: number;
  startingPosition: number | null;
  settlements: number | null;
  cities: number | null;
  longestRoad: boolean;
  largestArmy: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedBy?: string[];
}

export interface PlayerStats {
  playerId: string;
  totalGames: number;
  wins: number;
  winRate: number;
  averageScore: number;
  highestScore: number;
  averagePosition: number;
  achievements: Achievement[];
  recentForm: number[]; // last 10 game scores
}