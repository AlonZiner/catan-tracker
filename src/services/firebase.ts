// src/services/firebase.ts
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  serverTimestamp,
  setDoc
} from 'firebase/firestore';
import { GameRecord, Player } from '../types';

console.log('=== ENVIRONMENT DEBUG ===');
console.log('NODE_ENV:', import.meta.env.MODE);
console.log('All env vars:', Object.keys(import.meta.env));
console.log('VITE_FIREBASE_API_KEY exists:', !!import.meta.env.VITE_FIREBASE_API_KEY);
console.log('VITE_FIREBASE_PROJECT_ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID);
console.log('==========================');

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

console.log('Firebase Config - Project ID:', firebaseConfig.projectId);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log('Firebase initialized successfully');

// Collections
const GAMES_COLLECTION = 'games';
const PLAYERS_COLLECTION = 'players';

export class FirebaseGameService {
  // Games methods
  async getGames(): Promise<GameRecord[]> {
    try {
      console.log('Fetching games from Firebase...');
      
      const gamesQuery = query(
        collection(db, GAMES_COLLECTION), 
        orderBy('date', 'desc')
      );
      const snapshot = await getDocs(gamesQuery);
      
      console.log(`Found ${snapshot.docs.length} games in Firebase`);
      
      const games = snapshot.docs.map(doc => {
        const data = doc.data();
        console.log('Raw game data:', data);
        
        return {
          id: doc.id,
          ...data,
          // Ensure duration is handled properly
          duration: data.duration || undefined
        } as GameRecord;
      });
      
      console.log('Processed games:', games);
      return games;
    } catch (error) {
      console.error('Error fetching games:', error);
      
      // If the error is due to missing index or permissions, try a simpler query
      if (error.code === 'failed-precondition' || error.code === 'permission-denied') {
        console.log('Trying simple query without ordering...');
        try {
          const snapshot = await getDocs(collection(db, GAMES_COLLECTION));
          const games = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as GameRecord[];
          
          // Sort in memory instead
          games.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          return games;
        } catch (fallbackError) {
          console.error('Fallback query also failed:', fallbackError);
          throw new Error('Failed to fetch games from Firebase');
        }
      }
      
      throw new Error('Failed to fetch games from Firebase');
    }
  }

  async addGame(gameData: Omit<GameRecord, 'id'>): Promise<string> {
    try {
      // Calculate winner from players
      const winner = gameData.players.reduce((prev, current) => 
        (prev.score > current.score) ? prev : current
      );

      // Clean the data to remove undefined values
      const cleanGameData = {
        date: gameData.date,
        expansion: gameData.expansion,
        winner: winner.playerName,
        players: gameData.players,
        duration: gameData.duration,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      // Only add duration if it exists and is not undefined
      if (gameData.duration !== undefined && gameData.duration !== null) {
        cleanGameData.duration = gameData.duration;
      }

      const docRef = await addDoc(collection(db, GAMES_COLLECTION), cleanGameData);
      return docRef.id;
    } catch (error) {
      console.error('Error adding game to Firebase:', error);
      throw new Error('Failed to add game to Firebase');
    }
  }

  async updateGame(id: string, updates: Partial<GameRecord>): Promise<void> {
    try {
      const gameRef = doc(db, GAMES_COLLECTION, id);
      
      // Clean updates to remove undefined values
      const cleanUpdates: any = {
        updatedAt: serverTimestamp()
      };

      // Only add fields that are not undefined
      Object.keys(updates).forEach(key => {
        const value = updates[key as keyof GameRecord];
        if (value !== undefined) {
          cleanUpdates[key] = value;
        }
      });

      // Recalculate winner if players changed
      if (updates.players) {
        const winner = updates.players.reduce((prev, current) => 
          (prev.score > current.score) ? prev : current
        );
        cleanUpdates.winner = winner.playerName;
      }

      await updateDoc(gameRef, cleanUpdates);
    } catch (error) {
      console.error('Error updating game in Firebase:', error);
      throw new Error('Failed to update game in Firebase');
    }
  }

  async deleteGame(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, GAMES_COLLECTION, id));
    } catch (error) {
      console.error('Error deleting game from Firebase:', error);
      throw new Error('Failed to delete game from Firebase');
    }
  }

  // Players methods
  async getPlayers(): Promise<Player[]> {
    try {
      console.log('Fetching players from Firebase...');
      
      const snapshot = await getDocs(collection(db, PLAYERS_COLLECTION));
      
      console.log(`Found ${snapshot.docs.length} players in Firebase`);
      
      const players = snapshot.docs.map(doc => {
        const data = doc.data();
        console.log('Raw player data:', data);
        
        return {
          id: doc.id,
          ...data
        } as Player;
      });
      
      console.log('Processed players:', players);
      return players;
    } catch (error) {
      console.error('Error fetching players:', error);
      throw new Error('Failed to fetch players from Firebase');
    }
  }

  async addPlayer(playerData: Player): Promise<string> {
  try {
    const playerToAdd = {
      ...playerData,
      joinDate: playerData.joinDate || new Date().toISOString().split('T')[0],
      createdAt: serverTimestamp()
    };

    // Use the player's ID from playerData
    const docRef = doc(db, PLAYERS_COLLECTION, playerData.id);
    await setDoc(docRef, playerToAdd);
    return playerData.id;
  } catch (error) {
    console.error('Error adding player to Firebase:', error);
    throw new Error('Failed to add player to Firebase');
  }
}

  async updatePlayer(id: string, updates: Partial<Player>): Promise<void> {
    try {
      const playerRef = doc(db, PLAYERS_COLLECTION, id);
      await updateDoc(playerRef, updates);
    } catch (error) {
      console.error('Error updating player in Firebase:', error);
      throw new Error('Failed to update player in Firebase');
    }
  }

  async deletePlayer(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, PLAYERS_COLLECTION, id));
    } catch (error) {
      console.error('Error deleting player from Firebase:', error);
      throw new Error('Failed to delete player from Firebase');
    }
  }
}

// Export a singleton instance
export const firebaseService = new FirebaseGameService();