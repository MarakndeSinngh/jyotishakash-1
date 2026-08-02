import { MediaItem, MediaFilters } from './MediaTypes';

/**
 * High-performance filters for media library collections and search parameters.
 */
export function filterMediaItems(items: MediaItem[], filters: MediaFilters): MediaItem[] {
  return items.filter(item => {
    // 1. Filter by collection ID
    if (filters.collection && filters.collection !== "All" && filters.collection !== "") {
      if (!item.collection.includes(filters.collection)) {
        return false;
      }
    }

    // 2. Filter by category (by name match or normalized ID match)
    if (filters.category && filters.category !== "All" && filters.category !== "") {
      const catLower = filters.category.toLowerCase();
      const itemCatLower = item.category.toLowerCase();
      if (itemCatLower !== catLower && !itemCatLower.includes(catLower)) {
        return false;
      }
    }

    // 3. Filter by language
    if (filters.language && filters.language !== "All" && filters.language !== "") {
      if (item.language.toLowerCase() !== filters.language.toLowerCase()) {
        return false;
      }
    }

    // 4. Filter by difficulty
    if (filters.difficulty && filters.difficulty !== "All" && filters.difficulty !== "") {
      if (item.difficulty && item.difficulty.toLowerCase() !== filters.difficulty.toLowerCase()) {
        return false;
      }
    }

    // 5. Featured only
    if (filters.featured === true && !item.featured) {
      return false;
    }

    // 6. Shorts only
    if (filters.shorts === true && !item.isShort) {
      return false;
    }

    // 7. Playlists / Courses only
    if (filters.courses === true && !item.isPlaylist && !item.isCourse) {
      return false;
    }

    // 8. Webinars only
    if (filters.webinars === true && !item.isWebinar) {
      return false;
    }

    return true;
  });
}

/**
 * Sorts media items by predefined sorting weights or parameters.
 */
export function sortMediaItems(
  items: MediaItem[],
  sortBy: 'priority' | 'latest' | 'popular' | 'watchTime'
): MediaItem[] {
  return [...items].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
      case 'popular':
        return (b.viewCount || 0) - (a.viewCount || 0);
      case 'watchTime':
        return (b.watchTime || 0) - (a.watchTime || 0);
      case 'priority':
      default:
        // Sort by priority first, then date fallback
        const priorityA = a.priority ?? 0;
        const priorityB = b.priority ?? 0;
        if (priorityB !== priorityA) {
          return priorityB - priorityA;
        }
        return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    }
  });
}
