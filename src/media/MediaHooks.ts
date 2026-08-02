import { useMemo } from 'react';
import { useMedia } from './MediaProvider';
import { MediaItem, MediaFilters } from './MediaTypes';
import { filterMediaItems, sortMediaItems } from './MediaFilters';
import { searchMediaLibrary } from './MediaSearch';

/**
 * Hook to retrieve all featured media items.
 */
export function useFeaturedMedia(): MediaItem[] {
  const { items } = useMedia();
  return useMemo(() => {
    return items.filter(item => item.featured).sort((a, b) => (b.priority || 0) - (a.priority || 0));
  }, [items]);
}

/**
 * Hook to retrieve trending videos.
 */
export function useTrendingMedia(limit = 6): MediaItem[] {
  const { items } = useMedia();
  return useMemo(() => {
    // Items in "trending" collection or sorted by viewCount descending
    const trending = items.filter(item => item.collection.includes('trending') || (item.viewCount && item.viewCount > 50000));
    return sortMediaItems(trending, 'popular').slice(0, limit);
  }, [items, limit]);
}

/**
 * Hook to retrieve items within a specific collection ID.
 */
export function useCollection(collectionId: string, limit?: number): MediaItem[] {
  const { items } = useMedia();
  return useMemo(() => {
    const collected = items.filter(item => item.collection.includes(collectionId));
    const sorted = sortMediaItems(collected, 'priority');
    return limit ? sorted.slice(0, limit) : sorted;
  }, [items, collectionId, limit]);
}

/**
 * Hook to retrieve latest standard lecture classes/videos (excluding shorts).
 */
export function useLatestVideos(limit = 8): MediaItem[] {
  const { items } = useMedia();
  return useMemo(() => {
    const videos = items.filter(item => !item.isShort);
    return sortMediaItems(videos, 'latest').slice(0, limit);
  }, [items, limit]);
}

/**
 * Hook to retrieve micro video shorts.
 */
export function useShorts(limit?: number): MediaItem[] {
  const { items } = useMedia();
  return useMemo(() => {
    const shorts = items.filter(item => item.isShort);
    const sorted = sortMediaItems(shorts, 'priority');
    return limit ? sorted.slice(0, limit) : sorted;
  }, [items, limit]);
}

/**
 * Hook to retrieve student success reviews and testimonials.
 */
export function useReviews(limit?: number): MediaItem[] {
  const { items } = useMedia();
  return useMemo(() => {
    const reviews = items.filter(item => 
      item.collection.includes('student-reviews') || 
      item.collection.includes('success-stories') || 
      item.category === 'Student Success Stories'
    );
    const sorted = sortMediaItems(reviews, 'priority');
    return limit ? sorted.slice(0, limit) : sorted;
  }, [items, limit]);
}

/**
 * Dynamic localized Search and Filter hook.
 */
export function useMediaSearch(query: string, filters: MediaFilters = {}): MediaItem[] {
  const { items } = useMedia();
  return useMemo(() => {
    // 1. Run Search Query first
    const searchResults = searchMediaLibrary(items, query);
    const searchedItems = searchResults.map(r => r.item);

    // 2. Run Category / Collection filters on top
    return filterMediaItems(searchedItems, filters);
  }, [items, query, filters]);
}

/**
 * Suggests highly related content when viewing a video.
 * Matches: same collection, same category, same instructor/speaker, or latest.
 */
export function useRelatedMedia(currentItemId: string, limit = 5): MediaItem[] {
  const { items } = useMedia();
  
  return useMemo(() => {
    const currentItem = items.find(i => i.id === currentItemId);
    if (!currentItem) return [];

    // Filter out current item itself
    const pool = items.filter(item => item.id !== currentItemId);

    const scoredPool = pool.map(item => {
      let score = 0;

      // Collection overlap matches
      const commonCollections = item.collection.filter(c => currentItem.collection.includes(c));
      score += commonCollections.length * 4;

      // Category match
      if (item.category === currentItem.category) {
        score += 5;
      }

      // Speaker / instructor match
      if (item.speaker && item.speaker === currentItem.speaker) {
        score += 3;
      }
      if (item.instructor && item.instructor === currentItem.instructor) {
        score += 3;
      }

      // Language match
      if (item.language === currentItem.language) {
        score += 1;
      }

      return { item, score };
    });

    // Sort by relation score, and fallback to priority
    return scoredPool
      .filter(entry => entry.score > 0)
      .sort((a, b) => b.score - a.score || (b.item.priority || 0) - (a.item.priority || 0))
      .map(entry => entry.item)
      .slice(0, limit);
  }, [items, currentItemId, limit]);
}

/**
 * Retrieves the items currently in progress (Continue Watching).
 */
export function useContinueWatchingList(): (MediaItem & { progress: number; currentTime: number })[] {
  const { items, continueWatching } = useMedia();

  return useMemo(() => {
    const progressIds = Object.keys(continueWatching);
    const result: (MediaItem & { progress: number; currentTime: number })[] = [];

    progressIds.forEach(id => {
      const item = items.find(i => i.id === id);
      const prog = continueWatching[id];
      if (item && prog && prog.duration > 0) {
        const pct = Math.min((prog.currentTime / prog.duration) * 100, 100);
        result.push({
          ...item,
          progress: Number(pct.toFixed(0)),
          currentTime: prog.currentTime,
          // override updated date for sorting
          updatedAt: prog.updatedAt
        });
      }
    });

    // Sort by most recently updated/viewed progression
    return result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [items, continueWatching]);
}
