import { MediaItem } from './MediaTypes';
import { INITIAL_MEDIA_ITEMS } from './MediaRegistry';
import { filterMediaItems, sortMediaItems } from './MediaFilters';
import { searchMediaLibrary } from './MediaSearch';

const LOCAL_STORAGE_KEY = 'leo-family-unified-media-library';

export class MediaLibraryService {
  private static instance: MediaLibraryService;
  private items: MediaItem[] = [];

  private constructor() {
    this.loadLibrary();
  }

  public static getInstance(): MediaLibraryService {
    if (!MediaLibraryService.instance) {
      MediaLibraryService.instance = new MediaLibraryService();
    }
    return MediaLibraryService.instance;
  }

  /**
   * Loads library from LocalStorage or falls back to standard seed registry.
   */
  private loadLibrary(): void {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        this.items = JSON.parse(stored);
      } else {
        this.items = [...INITIAL_MEDIA_ITEMS];
        this.saveLibrary();
      }
    } catch (e) {
      console.warn("Could not access localStorage. Falling back to in-memory media registry:", e);
      this.items = [...INITIAL_MEDIA_ITEMS];
    }
  }

  /**
   * Saves current state of library to persistent LocalStorage.
   */
  private saveLibrary(): void {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.items));
    } catch (e) {
      console.warn("Could not persist library state:", e);
    }
  }

  public getAll(): MediaItem[] {
    return this.items;
  }

  public getById(id: string): MediaItem | undefined {
    return this.items.find(item => item.id === id);
  }

  /**
   * Adds a new media item to the library (CMS endpoint).
   */
  public add(item: MediaItem): void {
    // Prevent duplicate IDs
    this.items = this.items.filter(i => i.id !== item.id);
    this.items.unshift(item);
    this.saveLibrary();
  }

  /**
   * Updates an existing media item.
   */
  public update(item: MediaItem): void {
    this.items = this.items.map(i => i.id === item.id ? item : i);
    this.saveLibrary();
  }

  /**
   * Deletes a media item from the library.
   */
  public delete(id: string): void {
    this.items = this.items.filter(i => i.id !== id);
    this.saveLibrary();
  }

  /**
   * Automatically resets to the factory default list.
   */
  public resetToDefault(): void {
    this.items = [...INITIAL_MEDIA_ITEMS];
    this.saveLibrary();
  }

  /**
   * Logs a view interaction in local telemetry.
   */
  public incrementViews(id: string): MediaItem | undefined {
    const item = this.getById(id);
    if (item) {
      item.viewCount = (item.viewCount || 0) + 1;
      this.update(item);
      return item;
    }
    return undefined;
  }

  /**
   * Adds active watching duration to the video.
   */
  public addWatchTime(id: string, minutes: number): MediaItem | undefined {
    const item = this.getById(id);
    if (item) {
      item.watchTime = Number(((item.watchTime || 0) + minutes).toFixed(2));
      this.update(item);
      return item;
    }
    return undefined;
  }

  /**
   * Analytics summaries for dashboard widgets.
   */
  public getAnalyticsSummary() {
    const totalViews = this.items.reduce((sum, item) => sum + (item.viewCount || 0), 0);
    const totalWatchDuration = this.items.reduce((sum, item) => sum + (item.watchTime || 0), 0);
    
    // Most popular category
    const categoryViews: Record<string, number> = {};
    this.items.forEach(item => {
      categoryViews[item.category] = (categoryViews[item.category] || 0) + (item.viewCount || 0);
    });
    
    let popularCategory = "General";
    let maxCatViews = -1;
    Object.entries(categoryViews).forEach(([cat, val]) => {
      if (val > maxCatViews) {
        maxCatViews = val;
        popularCategory = cat;
      }
    });

    return {
      totalVideos: this.items.length,
      totalViews,
      totalWatchDuration,
      popularCategory,
      totalShorts: this.items.filter(i => i.isShort).length
    };
  }
}

export const MediaLibrary = MediaLibraryService.getInstance();
