import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import GameHistory from './components/GameHistory';
import PlayerProfiles from './components/PlayerProfiles';
import Analytics from './components/Analytics';
import AddGame from './components/AddGame';
import Documentation from './components/Documentation';
import { dataService } from './services/dataService';
import { GameRecord, Player } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [games, setGames] = useState<GameRecord[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [storageMode, setStorageMode] = useState<'firebase' | 'api' | 'local'>('local');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const [gamesData, playersData] = await Promise.all([
        dataService.getGames(),
        dataService.getPlayers()
      ]);
      
      setGames(gamesData);
      setPlayers(playersData);
      setStorageMode(dataService.getStorageMode());
    } catch (error) {
      console.error('Failed to load data:', error);
      setError(error instanceof Error ? error.message : 'Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = async () => {
    await dataService.refreshData();
    await loadData();
  };

  const handleAddGame = async (gameData: Omit<GameRecord, 'id'>) => {
    try {
      const newGame = await dataService.addGame(gameData);
      setGames(prev => [newGame, ...prev]);
      
      // Refresh players in case new ones were auto-created
      const playersData = await dataService.getPlayers();
      setPlayers(playersData);
      
      return newGame;
    } catch (error) {
      console.error('Failed to add game:', error);
      throw error;
    }
  };

  const handleUpdateGame = async (id: string, updates: Partial<GameRecord>) => {
    try {
      const updatedGame = await dataService.updateGame(id, updates);
      if (updatedGame) {
        setGames(prev => prev.map(game => game.id === id ? updatedGame : game));
      }
      return updatedGame;
    } catch (error) {
      console.error('Failed to update game:', error);
      throw error;
    }
  };

  const handleDeleteGame = async (id: string) => {
    try {
      const success = await dataService.deleteGame(id);
      if (success) {
        setGames(prev => prev.filter(game => game.id !== id));
      }
      return success;
    } catch (error) {
      console.error('Failed to delete game:', error);
      throw error;
    }
  };

  const renderPage = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-400">Loading your Catan data...</p>
            <div className="text-xs text-gray-500">
              {storageMode === 'firebase' ? 'Connecting to Firebase...' : 'Loading data...'}
            </div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4 max-w-md mx-auto p-6">
            <div className="text-red-400 text-4xl">⚠️</div>
            <h2 className="text-xl font-semibold text-red-400">Failed to Load Data</h2>
            <p className="text-gray-400">{error}</p>
            <div className="space-y-2">
              <button 
                onClick={refreshData}
                className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg text-white transition-colors"
              >
                Try Again
              </button>
              <div className="text-xs text-gray-500">
                Using {storageMode} storage
              </div>
            </div>
          </div>
        </div>
      );
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard games={games} players={players} onPageChange={setCurrentPage} />;
      case 'games':
        return <GameHistory games={games} players={players} onPageChange={setCurrentPage} onDeleteGame={handleDeleteGame} />;
      case 'players':
        return <PlayerProfiles games={games} players={players} onPageChange={setCurrentPage} />;
      case 'analytics':
        return <Analytics games={games} players={players} onPageChange={setCurrentPage} />;
      case 'add-game':
        return <AddGame players={players} onBack={() => setCurrentPage('dashboard')} onAddGame={handleAddGame} />;
      case 'docs':
        return <Documentation onBack={() => setCurrentPage('dashboard')} />;
      default:
        return <Dashboard games={games} players={players} onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="relative">
      {/* Storage Mode Indicator */}
      <div className="fixed top-4 right-4 z-50">
        <div className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
          storageMode === 'firebase' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
          storageMode === 'api' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
          'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
        }`}>
          {storageMode === 'firebase' ? '🔥 Firebase' :
           storageMode === 'api' ? '🌐 API' :
           '💾 Local'}
        </div>
      </div>

      <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
        {renderPage()}
      </Layout>
    </div>
  );
}

export default App;