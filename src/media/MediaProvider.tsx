import React, { createContext, useState, useEffect, useContext } from 'react';
import { MediaItem, PlayerState } from './MediaTypes';
import { MediaLibrary } from './MediaLibrary';

interface MediaContextType {
  items: MediaItem[];
  activeItem: MediaItem | null;
  playerState: PlayerState;
  favorites: string[];
  watchLater: string[];
  recentlyViewed: string[];
  continueWatching: Record<string, { currentTime: number; duration: number; updatedAt: string }>;
  
  // Library Actions (CMS / User)
  openPlayer: (item: MediaItem) => void;
  closePlayer: () => void;
  addMediaItem: (item: MediaItem) => void;
  updateMediaItem: (item: MediaItem) => void;
  deleteMediaItem: (id: string) => void;
  incrementViews: (id: string) => void;
  addWatchTime: (id: string, minutes: number) => void;
  
  // User Actions
  toggleFavorite: (id: string) => void;
  toggleWatchLater: (id: string) => void;
  savePlaybackPosition: (id: string, currentTime: number, duration: number) => void;
  clearHistory: () => void;
  resetToDefault: () => void;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [activeItem, setActiveItem] = useState<MediaItem | null>(null);
  const [playerState, setPlayerState] = useState<PlayerState>({
    activeItem: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.8,
    isMuted: false,
    playbackSpeed: 1
  });

  // User list states
  const [favorites, setFavorites] = useState<string[]>([]);
  const [watchLater, setWatchLater] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [continueWatching, setContinueWatching] = useState<Record<string, { currentTime: number; duration: number; updatedAt: string }>>({});

  // 1. Initial Load of items & lists
  useEffect(() => {
    // Items
    setItems(MediaLibrary.getAll());

    // User preference lists
    try {
      const storedFavs = localStorage.getItem('leo-media-favs');
      if (storedFavs) setFavorites(JSON.parse(storedFavs));

      const storedLater = localStorage.getItem('leo-media-later');
      if (storedLater) setWatchLater(JSON.parse(storedLater));

      const storedHist = localStorage.getItem('leo-media-history');
      if (storedHist) setRecentlyViewed(JSON.parse(storedHist));

      const storedProgress = localStorage.getItem('leo-media-progress');
      if (storedProgress) setContinueWatching(JSON.parse(storedProgress));
    } catch (e) {
      console.warn("Could not load user media configuration:", e);
    }
  }, []);

  // Sync state functions
  const syncItems = () => {
    setItems([...MediaLibrary.getAll()]);
  };

  // 2. Playback Control
  const openPlayer = (item: MediaItem) => {
    setActiveItem(item);
    setPlayerState(prev => ({
      ...prev,
      activeItem: item,
      isPlaying: true,
      currentTime: continueWatching[item.id]?.currentTime || 0
    }));

    // Record interaction view count
    incrementViews(item.id);

    // Update Recently Viewed history list (Max 15 items)
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== item.id);
      const updated = [item.id, ...filtered].slice(0, 15);
      localStorage.setItem('leo-media-history', JSON.stringify(updated));
      return updated;
    });
  };

  const closePlayer = () => {
    setActiveItem(null);
    setPlayerState(prev => ({
      ...prev,
      activeItem: null,
      isPlaying: false
    }));
  };

  // 3. CMS Actions
  const addMediaItem = (item: MediaItem) => {
    MediaLibrary.add(item);
    syncItems();
  };

  const updateMediaItem = (item: MediaItem) => {
    MediaLibrary.update(item);
    syncItems();
    if (activeItem && activeItem.id === item.id) {
      setActiveItem(item);
    }
  };

  const deleteMediaItem = (id: string) => {
    MediaLibrary.delete(id);
    syncItems();
    if (activeItem && activeItem.id === id) {
      closePlayer();
    }
  };

  const incrementViews = (id: string) => {
    MediaLibrary.incrementViews(id);
    syncItems();
  };

  const addWatchTime = (id: string, minutes: number) => {
    MediaLibrary.addWatchTime(id, minutes);
    syncItems();
  };

  // 4. User Interaction Methods
  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const updated = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem('leo-media-favs', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleWatchLater = (id: string) => {
    setWatchLater(prev => {
      const updated = prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id];
      localStorage.setItem('leo-media-later', JSON.stringify(updated));
      return updated;
    });
  };

  const savePlaybackPosition = (id: string, currentTime: number, duration: number) => {
    if (!id || duration <= 0) return;
    
    // Calculate percentage watched
    const pct = (currentTime / duration) * 100;

    setContinueWatching(prev => {
      let updated = { ...prev };
      
      if (pct > 95) {
        // If watched past 95%, consider it fully complete and clear from continue list
        delete updated[id];
      } else if (currentTime > 5) {
        // Only save if watched more than 5 seconds
        updated[id] = {
          currentTime,
          duration,
          updatedAt: new Date().toISOString()
        };
      }

      localStorage.setItem('leo-media-progress', JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    setRecentlyViewed([]);
    setContinueWatching({});
    localStorage.removeItem('leo-media-history');
    localStorage.removeItem('leo-media-progress');
  };

  const resetToDefault = () => {
    MediaLibrary.resetToDefault();
    syncItems();
    closePlayer();
  };

  return (
    <MediaContext.Provider
      value={{
        items,
        activeItem,
        playerState,
        favorites,
        watchLater,
        recentlyViewed,
        continueWatching,
        
        openPlayer,
        closePlayer,
        addMediaItem,
        updateMediaItem,
        deleteMediaItem,
        incrementViews,
        addWatchTime,
        
        toggleFavorite,
        toggleWatchLater,
        savePlaybackPosition,
        clearHistory,
        resetToDefault
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
};
