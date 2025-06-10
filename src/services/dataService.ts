// src/services/dataService.ts
import { GameRecord, Player } from '../types';
import { FirebaseGameService } from './firebase';

class DataService {
  private games: GameRecord[] = [];
  private players: Player[] = [];
  private isLoaded = false;
  private useFirebase = false;
  private firebaseService: FirebaseGameService | null = null;

  constructor() {
    // Check if Firebase should be used (only if config is available)
    this.useFirebase = this.checkFirebaseConfig();
    if (this.useFirebase) {
      this.initFirebase();
    }
  }

  private checkFirebaseConfig(): boolean {
    return !!(
      import.meta.env.VITE_FIREBASE_API_KEY &&
      import.meta.env.VITE_FIREBASE_PROJECT_ID
    );
  }

  private async initFirebase() {
    try {
      const { firebaseService } = await import('./firebase');
      this.firebaseService = firebaseService;
      console.log('Firebase initialized successfully');
    } catch (error) {
      console.warn('Firebase initialization failed, falling back to mock data:', error);
      this.useFirebase = false;
    }
  }

  async loadData(): Promise<void> {
    if (this.isLoaded) return;

    try {
      if (this.useFirebase && this.firebaseService) {
        // Use Firebase
        console.log('Loading data from Firebase...');
        const [gamesData, playersData] = await Promise.all([
          this.firebaseService.getGames(),
          this.firebaseService.getPlayers()
        ]);

        this.games = gamesData;
        this.players = playersData;

        // If no data exists, seed with mock data
        if (this.games.length === 0 && this.players.length === 0) {
          await this.seedFirebaseData();
        }
      } else {
        // Try API first, then fallback to mock data
        console.log('Trying API endpoints...');
        const response = await fetch('/api/games');
        if (response.ok) {
          const data = await response.json();
          this.games = data.games || data || []; // Handle different response formats

          const playersResponse = await fetch('/api/players');
          if (playersResponse.ok) {
            const playersData = await playersResponse.json();
            this.players = playersData.players || playersData || [];
          }
        } else {
          throw new Error('API not available');
        }
      }

      this.isLoaded = true;
    } catch (error) {
      console.warn('Loading from external sources failed, using mock data:', error);
      // Fallback to mock data
      const { mockGames, mockPlayers } = await import('../data/mockData2');
      this.games = mockGames;
      this.players = mockPlayers;
      this.isLoaded = true;
    }
  }

  private async seedFirebaseData(): Promise<void> {
    if (!this.useFirebase || !this.firebaseService) return;

    try {
      console.log('Seeding Firebase with initial data...');
      const { mockGames, mockPlayers } = await import('../data/mockData2');

      // Add players first
      for (const player of mockPlayers) {
        await this.firebaseService.addPlayer({
          playerId: player.playerId,
          name: player.name,
          avatar: player.avatar,
          joinDate: player.joinDate
        });
      }

      // Add games
      for (const game of mockGames) {
        await this.firebaseService.addGame({
          date: game.date,
          expansion: game.expansion,
          duration: game.duration,
          players: game.players,
          winner: game.winner
        });
      }

      // Reload data
      const [gamesData, playersData] = await Promise.all([
        this.firebaseService.getGames(),
        this.firebaseService.getPlayers()
      ]);

      this.games = gamesData;
      this.players = playersData;
    } catch (error) {
      console.error('Error seeding Firebase data:', error);
    }
  }

  async getGames(): Promise<GameRecord[]> {
    return [...this.games];
  }

  async getPlayers(): Promise<Player[]> {
    return [...this.players];
  }

  async addGame(game: Omit<GameRecord, 'id'>): Promise<GameRecord> {
    // Auto-create players if they don't exist
    for (const gamePlayer of game.players) {
      const existingPlayer = this.players.find(p => p.name === gamePlayer.playerName);
      if (!existingPlayer) {
        console.log(`Creating new player: ${gamePlayer.playerName}`);
        await this.addPlayer({
          playerId: (Math.max(...this.players.map(p => Number(p.playerId))) + 1) + "",
          name: gamePlayer.playerName,
          avatar: '🎲', // Default avatar
          joinDate: new Date().toISOString().split('T')[0]
        });
      }
    }

    if (this.useFirebase && this.firebaseService) {
      // Use Firebase
      try {
        const gameId = await this.firebaseService.addGame(game);
        // Reload games to get updated list
        this.games = await this.firebaseService.getGames();
        return this.games.find(g => g.id === gameId)!;
      } catch (error) {
        console.error('Firebase add game failed:', error);
        throw error;
      }
    } else {
      // Try API, then fallback to local storage
      const newGame: GameRecord = {
        ...game,
        id: Date.now().toString()
      };

      try {
        const response = await fetch('/api/games', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newGame),
        });

        if (response.ok) {
          const savedGame = await response.json();
          this.games.unshift(savedGame);
          return savedGame;
        }
      } catch (error) {
        console.warn('API not available, storing locally:', error);
      }

      // Fallback: store locally
      this.games.unshift(newGame);
      return newGame;
    }
  }

  async updateGame(id: string, updates: Partial<GameRecord>): Promise<GameRecord | null> {
    if (this.useFirebase && this.firebaseService) {
      // Use Firebase
      try {
        await this.firebaseService.updateGame(id, updates);
        this.games = await this.firebaseService.getGames();
        return this.games.find(g => g.id === id) || null;
      } catch (error) {
        console.error('Firebase update game failed:', error);
        throw error;
      }
    } else {
      // API/Local fallback logic (your existing code)
      const gameIndex = this.games.findIndex(g => g.id === id);
      if (gameIndex === -1) return null;

      const updatedGame = { ...this.games[gameIndex], ...updates };

      try {
        const response = await fetch(`/api/games?id=${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedGame),
        });

        if (response.ok) {
          const savedGame = await response.json();
          this.games[gameIndex] = savedGame;
          return savedGame;
        }
      } catch (error) {
        console.warn('API not available, updating locally:', error);
      }

      // Fallback: update locally
      this.games[gameIndex] = updatedGame;
      return updatedGame;
    }
  }

  async deleteGame(id: string): Promise<boolean> {
    if (this.useFirebase && this.firebaseService) {
      // Use Firebase
      try {
        await this.firebaseService.deleteGame(id);
        this.games = this.games.filter(g => g.id !== id);
        return true;
      } catch (error) {
        console.error('Firebase delete game failed:', error);
        throw error;
      }
    } else {
      // API/Local fallback logic (your existing code)
      const gameIndex = this.games.findIndex(g => g.id === id);
      if (gameIndex === -1) return false;

      try {
        const response = await fetch(`/api/games?id=${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          this.games.splice(gameIndex, 1);
          return true;
        }
      } catch (error) {
        console.warn('API not available, deleting locally:', error);
      }

      // Fallback: delete locally
      this.games.splice(gameIndex, 1);
      return true;
    }
  }

  // Player operations for Firebase
  async addPlayer(playerData: Omit<Player, 'id'>): Promise<Player> {
    if (this.useFirebase && this.firebaseService) {
      try {
        const playerId = await this.firebaseService.addPlayer(playerData);
        this.players = await this.firebaseService.getPlayers();
        return this.players.find(p => p.playerId === playerId)!;
      } catch (error) {
        console.error('Firebase add player failed:', error);
        throw error;
      }
    } else {
      // Fallback to local storage
      const newPlayer: Player = {
        ...playerData,
        playerId: Date.now().toString()
      };
      this.players.push(newPlayer);
      return newPlayer;
    }
  }

  // Helper method to refresh data
  async refreshData(): Promise<void> {
    this.isLoaded = false;
    await this.loadData();
  }

  // Get current storage mode
  getStorageMode(): 'firebase' | 'api' | 'local' {
    if (this.useFirebase) return 'firebase';
    // You could add logic here to detect if API is working
    return 'local';
  }
}

export const dataService = new DataService();