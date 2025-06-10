// src/hooks/useFirebaseGames.ts
import { useState, useEffect } from 'react';
import { firebaseService } from '../services/firebase';
import { GameRecord, Player } from '../types';
// Import mock data as fallback for offline/development
import { mockGames, mockPlayers } from '../data/mockData2';

export function useFirebaseGames() {
  const [games, setGames] = useState<GameRecord[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Track online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load initial data
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!isOnline) {
        // Use mock data when offline
        setGames(mockGames);
        setPlayers(mockPlayers);
        return;
      }

      // Load from Firebase
      const [gamesData, playersData] = await Promise.all([
        firebaseService.getGames(),
        firebaseService.getPlayers()
      ]);

      setGames(gamesData);
      setPlayers(playersData);

      // If no data exists, seed with mock data
      if (gamesData.length === 0 && playersData.length === 0) {
        await seedInitialData();
      }

    } catch (err) {
      console.error('Firebase error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
      
      // Fallback to mock data on error
      setGames(mockGames);
      setPlayers(mockPlayers);
    } finally {
      setLoading(false);
    }
  };

  // Seed initial data from mock data
  const seedInitialData = async () => {
    try {
      console.log('Seeding initial data...');
      
      // Add players first
      for (const player of mockPlayers) {
        await firebaseService.addPlayer({
          playerId: player.playerId,
          name: player.name,
          avatar: player.avatar,
          joinDate: player.joinDate
        });
      }

      // Add games
      for (const game of mockGames) {
        await firebaseService.addGame({
          date: game.date,
          expansion: game.expansion,
          duration: game.duration,
          players: game.players,
          winner: game.winner
        });
      }

      // Reload data
      await loadData();
    } catch (error) {
      console.error('Error seeding data:', error);
    }
  };

  // Game operations
  const addGame = async (gameData: Omit<GameRecord, 'id' | 'winner'>) => {
    try {
      if (!isOnline) {
        throw new Error('Cannot add games while offline');
      }

      const gameId = await firebaseService.addGame(gameData);
      console.log('Game added with ID:', gameId);
      
      // Reload games to get updated list
      const updatedGames = await firebaseService.getGames();
      setGames(updatedGames);
      
      return gameId;
    } catch (error) {
      console.error('Error adding game:', error);
      throw error;
    }
  };

  const updateGame = async (id: string, updates: Partial<GameRecord>) => {
    try {
      if (!isOnline) {
        throw new Error('Cannot update games while offline');
      }

      await firebaseService.updateGame(id, updates);
      
      // Reload games
      const updatedGames = await firebaseService.getGames();
      setGames(updatedGames);
    } catch (error) {
      console.error('Error updating game:', error);
      throw error;
    }
  };

  const deleteGame = async (id: string) => {
    try {
      if (!isOnline) {
        throw new Error('Cannot delete games while offline');
      }

      await firebaseService.deleteGame(id);
      
      // Remove from local state immediately
      setGames(prev => prev.filter(game => game.id !== id));
    } catch (error) {
      console.error('Error deleting game:', error);
      throw error;
    }
  };

  const updatePlayer = async (id: string, updates: Partial<Player>) => {
    try {
      if (!isOnline) {
        throw new Error('Cannot update players while offline');
      }

      await firebaseService.updatePlayer(id, updates);
      
      // Reload players
      const updatedPlayers = await firebaseService.getPlayers();
      setPlayers(updatedPlayers);
    } catch (error) {
      console.error('Error updating player:', error);
      throw error;
    }
  };

  const deletePlayer = async (id: string) => {
    try {
      if (!isOnline) {
        throw new Error('Cannot delete players while offline');
      }

      await firebaseService.deletePlayer(id);
      
      // Remove from local state
      setPlayers(prev => prev.filter(player => player.playerId !== id));
    } catch (error) {
      console.error('Error deleting player:', error);
      throw error;
    }
  };

  // Manual refresh
  const refresh = () => {
    loadData();
  };

  // Load data on mount
  useEffect(() => {
    loadData();
  }, [isOnline]);

  return {
    // Data
    games,
    players,
    loading,
    error,
    isOnline,
    
    // Game operations
    addGame,
    updateGame,
    deleteGame,
    
    // Player operations
    addPlayer,
    updatePlayer,
    deletePlayer,
    
    // Utilities
    refresh,
    seedInitialData
  };
}