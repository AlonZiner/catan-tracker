import { GameRecord, PlayerStats, Player, Achievement } from '../types';
import { achievements } from '../data/mockData';

export function calculatePlayerStats(playerId: string, games: GameRecord[]): PlayerStats {
  const playerGames = games.filter(game => 
    game.players.some(p => p.playerId === playerId)
  );

  const wins = playerGames.filter(game => game.winner === getPlayerName(playerId, games)).length;
  const totalGames = playerGames.length;
  const winRate = totalGames > 0 ? (wins / totalGames) * 100 : 0;

  const scores = playerGames.map(game => {
    const playerScore = game.players.find(p => p.playerId === playerId);
    return playerScore?.score || 0;
  });

  const averageScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
  const highestScore = scores.length > 0 ? Math.max(...scores) : 0;

  const positions = playerGames.map(game => {
    const playerScore = game.players.find(p => p.playerId === playerId);
    return playerScore?.startingPosition || 0;
  });

  const averagePosition = positions.length > 0 ? positions.reduce((a, b) => a + b, 0) / positions.length : 0;

  const recentForm = scores.slice(-10);

  return {
    playerId,
    totalGames,
    wins,
    winRate,
    averageScore,
    highestScore,
    averagePosition,
    achievements: [],
    recentForm
  };
}

export function getPlayerAchievements(playerId: string, games: GameRecord[]): Achievement[] {
  const playerName = getPlayerName(playerId, games);
  const playerGames = games.filter(game => 
    game.players.some(p => p.playerId === playerId)
  );
  
  const playerAchievements: Achievement[] = [];
  
  // First Victory
  if (playerGames.some(game => game.winner === playerName)) {
    playerAchievements.push(achievements.find(a => a.id === 'first_win')!);
  }
  
  // Perfect Score (15+ points)
  const hasHighScore = playerGames.some(game => {
    const playerScore = game.players.find(p => p.playerId === playerId);
    return playerScore && playerScore.score >= 15;
  });
  if (hasHighScore) {
    playerAchievements.push(achievements.find(a => a.id === 'perfect_score')!);
  }
  
  // Win Streak (3 in a row)
  const winStreaks = getWinStreaks(games);
  const playerStreak = winStreaks.find(p => p.name === playerName);
  if (playerStreak && playerStreak.longestStreak >= 3) {
    playerAchievements.push(achievements.find(a => a.id === 'win_streak_3')!);
  }
  
  // Road Warrior (5+ Longest Roads)
  const roadWins = playerGames.filter(game => {
    const playerScore = game.players.find(p => p.playerId === playerId);
    return playerScore && playerScore.longestRoad;
  }).length;
  if (roadWins >= 5) {
    playerAchievements.push(achievements.find(a => a.id === 'road_warrior')!);
  }
  
  // Army General (5+ Largest Armies)
  const armyWins = playerGames.filter(game => {
    const playerScore = game.players.find(p => p.playerId === playerId);
    return playerScore && playerScore.largestArmy;
  }).length;
  if (armyWins >= 5) {
    playerAchievements.push(achievements.find(a => a.id === 'army_general')!);
  }
  
  // City Builder (5+ cities in one game)
  const hasCityBuilder = playerGames.some(game => {
    const playerScore = game.players.find(p => p.playerId === playerId);
    return playerScore && playerScore.cities >= 5;
  });
  if (hasCityBuilder) {
    playerAchievements.push(achievements.find(a => a.id === 'city_builder')!);
  }
  
  // Settlement Spammer (all 5 settlements)
  const hasSettlementSpammer = playerGames.some(game => {
    const playerScore = game.players.find(p => p.playerId === playerId);
    return playerScore && playerScore.settlements >= 5;
  });
  if (hasSettlementSpammer) {
    playerAchievements.push(achievements.find(a => a.id === 'settlement_spammer')!);
  }
  
  // Double Trouble (both road and army in one game)
  const hasDoubleTrouble = playerGames.some(game => {
    const playerScore = game.players.find(p => p.playerId === playerId);
    return playerScore && playerScore.longestRoad && playerScore.largestArmy;
  });
  if (hasDoubleTrouble) {
    playerAchievements.push(achievements.find(a => a.id === 'double_trouble')!);
  }
  
  // Speed Demon (win in under 60 minutes)
  const hasSpeedWin = playerGames.some(game => {
    return game.winner === playerName && game.duration && game.duration < 60;
  });
  if (hasSpeedWin) {
    playerAchievements.push(achievements.find(a => a.id === 'speed_demon')!);
  }
  
  // Marathon Master (win over 2 hours)
  const hasMarathonWin = playerGames.some(game => {
    return game.winner === playerName && game.duration && game.duration > 120;
  });
  if (hasMarathonWin) {
    playerAchievements.push(achievements.find(a => a.id === 'marathon_master')!);
  }
  
  // Clutch Player (5+ close wins)
  const clutchPerformance = getClutchPerformance(games);
  const playerClutch = clutchPerformance.find(p => p.name === playerName);
  if (playerClutch && playerClutch.closeWins >= 5) {
    playerAchievements.push(achievements.find(a => a.id === 'clutch_player')!);
  }
  
  // Position Master (win from every position)
  const winningPositions = new Set();
  playerGames.forEach(game => {
    if (game.winner === playerName) {
      const playerScore = game.players.find(p => p.playerId === playerId);
      if (playerScore) {
        winningPositions.add(playerScore.startingPosition);
      }
    }
  });
  if (winningPositions.size >= 4) {
    playerAchievements.push(achievements.find(a => a.id === 'position_master')!);
  }
  
  // Expansion Master (win with every expansion)
  const winningExpansions = new Set();
  playerGames.forEach(game => {
    if (game.winner === playerName) {
      winningExpansions.add(game.expansion);
    }
  });
  if (winningExpansions.size >= 4) {
    playerAchievements.push(achievements.find(a => a.id === 'expansion_master')!);
  }
  
  return playerAchievements;
}

export function getPlayerName(playerId: string, games: GameRecord[]): string {
  for (const game of games) {
    const player = game.players.find(p => p.playerId === playerId);
    if (player) return player.playerName;
  }
  return 'Unknown';
}

export function getWinDistribution(games: GameRecord[]) {
  const winCounts: { [key: string]: number } = {};
  
  games.forEach(game => {
    winCounts[game.winner] = (winCounts[game.winner] || 0) + 1;
  });

  return Object.entries(winCounts).map(([name, wins]) => ({
    name,
    wins,
    percentage: (wins / games.length) * 100
  })).sort((a, b) => b.wins - a.wins);
}

export function getExpansionStats(games: GameRecord[]) {
  const expansionCounts: { [key: string]: number } = {};
  
  games.forEach(game => {
    expansionCounts[game.expansion] = (expansionCounts[game.expansion] || 0) + 1;
  });

  return Object.entries(expansionCounts).map(([expansion, count]) => ({
    expansion,
    count,
    percentage: (count / games.length) * 100
  })).sort((a, b) => b.count - a.count);
}

export function getAverageScoreByPosition(games: GameRecord[]) {
  const positionStats: { [key: number]: { total: number; count: number } } = {};

  games.forEach(game => {
    game.players.forEach(player => {
      const pos = player.startingPosition;
      if (!positionStats[pos]) {
        positionStats[pos] = { total: 0, count: 0 };
      }
      positionStats[pos].total += player.score;
      positionStats[pos].count += 1;
    });
  });

  return Object.entries(positionStats).map(([position, stats]) => ({
    position: parseInt(position),
    averageScore: stats.total / stats.count,
    games: stats.count
  })).sort((a, b) => a.position - b.position);
}

// NEW ADVANCED METRICS

export function getWinRateByPosition(games: GameRecord[]) {
  const positionStats: { [key: number]: { wins: number; total: number } } = {};

  games.forEach(game => {
    game.players.forEach(player => {
      const pos = player.startingPosition;
      if (!positionStats[pos]) {
        positionStats[pos] = { wins: 0, total: 0 };
      }
      positionStats[pos].total += 1;
      if (player.playerName === game.winner) {
        positionStats[pos].wins += 1;
      }
    });
  });

  return Object.entries(positionStats).map(([position, stats]) => ({
    position: parseInt(position),
    winRate: (stats.wins / stats.total) * 100,
    wins: stats.wins,
    total: stats.total
  })).sort((a, b) => a.position - b.position);
}

export function getScoreConsistency(games: GameRecord[]) {
  const playerScores: { [key: string]: number[] } = {};

  games.forEach(game => {
    game.players.forEach(player => {
      if (!playerScores[player.playerName]) {
        playerScores[player.playerName] = [];
      }
      playerScores[player.playerName].push(player.score);
    });
  });

  return Object.entries(playerScores).map(([name, scores]) => {
    const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length;
    const standardDeviation = Math.sqrt(variance);
    
    return {
      name,
      averageScore: mean,
      standardDeviation,
      consistency: 100 - (standardDeviation / mean) * 100, // Higher is more consistent
      range: Math.max(...scores) - Math.min(...scores)
    };
  }).sort((a, b) => b.consistency - a.consistency);
}

export function getExpansionPerformance(games: GameRecord[]) {
  const expansionData: { [key: string]: { [key: string]: { scores: number[]; wins: number } } } = {};

  games.forEach(game => {
    if (!expansionData[game.expansion]) {
      expansionData[game.expansion] = {};
    }

    game.players.forEach(player => {
      if (!expansionData[game.expansion][player.playerName]) {
        expansionData[game.expansion][player.playerName] = { scores: [], wins: 0 };
      }
      expansionData[game.expansion][player.playerName].scores.push(player.score);
      if (player.playerName === game.winner) {
        expansionData[game.expansion][player.playerName].wins += 1;
      }
    });
  });

  const result: { [key: string]: any[] } = {};
  
  Object.entries(expansionData).forEach(([expansion, players]) => {
    result[expansion] = Object.entries(players).map(([name, data]) => ({
      name,
      averageScore: data.scores.reduce((a, b) => a + b, 0) / data.scores.length,
      wins: data.wins,
      games: data.scores.length,
      winRate: (data.wins / data.scores.length) * 100
    })).sort((a, b) => b.winRate - a.winRate);
  });

  return result;
}

export function getMonthlyTrends(games: GameRecord[]) {
  const monthlyData: { [key: string]: { games: number; totalScore: number; players: Set<string> } } = {};

  games.forEach(game => {
    const month = new Date(game.date).toISOString().slice(0, 7); // YYYY-MM format
    if (!monthlyData[month]) {
      monthlyData[month] = { games: 0, totalScore: 0, players: new Set() };
    }
    
    monthlyData[month].games += 1;
    game.players.forEach(player => {
      monthlyData[month].totalScore += player.score;
      monthlyData[month].players.add(player.playerName);
    });
  });

  return Object.entries(monthlyData).map(([month, data]) => ({
    month,
    games: data.games,
    averageScore: data.totalScore / (data.games * 4), // Assuming average 4 players
    uniquePlayers: data.players.size
  })).sort((a, b) => a.month.localeCompare(b.month));
}

export function getDominanceMetrics(games: GameRecord[]) {
  const playerStats: { [key: string]: { 
    totalPoints: number; 
    gamesPlayed: number; 
    pointsControlled: number;
    settlements: number;
    cities: number;
    specialAchievements: number;
  } } = {};

  let totalPointsAllGames = 0;

  games.forEach(game => {
    const gameTotal = game.players.reduce((sum, p) => sum + p.score, 0);
    totalPointsAllGames += gameTotal;

    game.players.forEach(player => {
      if (!playerStats[player.playerName]) {
        playerStats[player.playerName] = { 
          totalPoints: 0, 
          gamesPlayed: 0, 
          pointsControlled: 0,
          settlements: 0,
          cities: 0,
          specialAchievements: 0
        };
      }
      
      playerStats[player.playerName].totalPoints += player.score;
      playerStats[player.playerName].gamesPlayed += 1;
      playerStats[player.playerName].pointsControlled += (player.score / gameTotal) * 100;
      playerStats[player.playerName].settlements += player.settlements;
      playerStats[player.playerName].cities += player.cities;
      
      if (player.longestRoad || player.largestArmy) {
        playerStats[player.playerName].specialAchievements += 1;
      }
    });
  });

  return Object.entries(playerStats).map(([name, stats]) => ({
    name,
    averageScore: stats.totalPoints / stats.gamesPlayed,
    averagePointControl: stats.pointsControlled / stats.gamesPlayed,
    totalPointsEarned: stats.totalPoints,
    marketShare: (stats.totalPoints / totalPointsAllGames) * 100,
    averageSettlements: stats.settlements / stats.gamesPlayed,
    averageCities: stats.cities / stats.gamesPlayed,
    specialAchievementRate: (stats.specialAchievements / stats.gamesPlayed) * 100
  })).sort((a, b) => b.marketShare - a.marketShare);
}

export function getHeadToHeadMatrix(games: GameRecord[]) {
  const matrix: { [key: string]: { [key: string]: { wins: number; losses: number; avgScoreDiff: number } } } = {};

  games.forEach(game => {
    game.players.forEach(player1 => {
      game.players.forEach(player2 => {
        if (player1.playerName !== player2.playerName) {
          if (!matrix[player1.playerName]) matrix[player1.playerName] = {};
          if (!matrix[player1.playerName][player2.playerName]) {
            matrix[player1.playerName][player2.playerName] = { wins: 0, losses: 0, avgScoreDiff: 0 };
          }

          const scoreDiff = player1.score - player2.score;
          matrix[player1.playerName][player2.playerName].avgScoreDiff += scoreDiff;

          if (player1.playerName === game.winner && player2.playerName !== game.winner) {
            matrix[player1.playerName][player2.playerName].wins += 1;
          } else if (player2.playerName === game.winner && player1.playerName !== game.winner) {
            matrix[player1.playerName][player2.playerName].losses += 1;
          }
        }
      });
    });
  });

  // Calculate average score differences
  Object.keys(matrix).forEach(player1 => {
    Object.keys(matrix[player1]).forEach(player2 => {
      const totalGames = matrix[player1][player2].wins + matrix[player1][player2].losses;
      if (totalGames > 0) {
        matrix[player1][player2].avgScoreDiff /= totalGames;
      }
    });
  });

  return matrix;
}

export function getWinStreaks(games: GameRecord[]) {
  const playerStreaks: { [key: string]: { current: number; longest: number; lastGame: string } } = {};
  
  // Sort games by date
  const sortedGames = [...games].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  sortedGames.forEach(game => {
    game.players.forEach(player => {
      if (!playerStreaks[player.playerName]) {
        playerStreaks[player.playerName] = { current: 0, longest: 0, lastGame: '' };
      }

      if (player.playerName === game.winner) {
        playerStreaks[player.playerName].current += 1;
        playerStreaks[player.playerName].longest = Math.max(
          playerStreaks[player.playerName].longest,
          playerStreaks[player.playerName].current
        );
      } else {
        playerStreaks[player.playerName].current = 0;
      }
      
      playerStreaks[player.playerName].lastGame = game.date;
    });
  });

  return Object.entries(playerStreaks).map(([name, streak]) => ({
    name,
    currentStreak: streak.current,
    longestStreak: streak.longest,
    lastGame: streak.lastGame
  })).sort((a, b) => b.longestStreak - a.longestStreak);
}

export function getGameDurationAnalysis(games: GameRecord[]) {
  const gamesWithDuration = games.filter(g => g.duration);
  
  if (gamesWithDuration.length === 0) return null;

  const durations = gamesWithDuration.map(g => g.duration!);
  const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
  
  const expansionDurations: { [key: string]: number[] } = {};
  gamesWithDuration.forEach(game => {
    if (!expansionDurations[game.expansion]) {
      expansionDurations[game.expansion] = [];
    }
    expansionDurations[game.expansion].push(game.duration!);
  });

  const expansionAvgs = Object.entries(expansionDurations).map(([expansion, durations]) => ({
    expansion,
    averageDuration: durations.reduce((a, b) => a + b, 0) / durations.length,
    games: durations.length
  })).sort((a, b) => b.averageDuration - a.averageDuration);

  return {
    averageDuration: avgDuration,
    shortestGame: Math.min(...durations),
    longestGame: Math.max(...durations),
    expansionDurations: expansionAvgs
  };
}

export function getClutchPerformance(games: GameRecord[]) {
  const playerClutch: { [key: string]: { closeWins: number; closeLosses: number; blowoutWins: number } } = {};

  games.forEach(game => {
    const scores = game.players.map(p => p.score).sort((a, b) => b - a);
    const winningScore = scores[0];
    const secondPlace = scores[1];
    const margin = winningScore - secondPlace;
    
    const isCloseGame = margin <= 2; // Close game if margin is 2 points or less

    game.players.forEach(player => {
      if (!playerClutch[player.playerName]) {
        playerClutch[player.playerName] = { closeWins: 0, closeLosses: 0, blowoutWins: 0 };
      }

      if (player.playerName === game.winner) {
        if (isCloseGame) {
          playerClutch[player.playerName].closeWins += 1;
        } else {
          playerClutch[player.playerName].blowoutWins += 1;
        }
      } else if (player.score === secondPlace && isCloseGame) {
        playerClutch[player.playerName].closeLosses += 1;
      }
    });
  });

  return Object.entries(playerClutch).map(([name, stats]) => ({
    name,
    closeWins: stats.closeWins,
    closeLosses: stats.closeLosses,
    blowoutWins: stats.blowoutWins,
    clutchRatio: stats.closeWins + stats.closeLosses > 0 ? 
      (stats.closeWins / (stats.closeWins + stats.closeLosses)) * 100 : 0
  })).sort((a, b) => b.clutchRatio - a.clutchRatio);
}