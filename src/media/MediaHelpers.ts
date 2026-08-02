import { MediaItem } from './MediaTypes';

/**
 * Extracts the YouTube Video ID or Playlist ID from any standard YouTube URL format.
 */
export function extractYoutubeId(url: string): { id: string; isPlaylist: boolean; isShort: boolean } {
  if (!url) return { id: '', isPlaylist: false, isShort: false };

  // Match playlist first
  const playlistMatch = url.match(/[&?]list=([^&]+)/) || url.match(/playlist\/([^?]+)/);
  if (playlistMatch && playlistMatch[1]) {
    return { id: playlistMatch[1], isPlaylist: true, isShort: false };
  }

  // Match shorts
  const shortsMatch = url.match(/youtube\.com\/shorts\/([^?&]+)/) || url.match(/shorts\/([^?&]+)/);
  if (shortsMatch && shortsMatch[1]) {
    return { id: shortsMatch[1], isPlaylist: false, isShort: true };
  }

  // Match regular video
  const regMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/);
  if (regMatch && regMatch[1]) {
    return { id: regMatch[1], isPlaylist: false, isShort: false };
  }

  // Fallback: If it's already an 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return { id: url, isPlaylist: false, isShort: false };
  }

  return { id: url, isPlaylist: false, isShort: false };
}

/**
 * Generates official YouTube thumbnail URLs.
 * Resolves fallback order inside image tags via onError or returns maxresdefault.
 */
export function getYoutubeThumbnail(youtubeId: string, resolution: 'maxresdefault' | 'hqdefault' | 'mqdefault' | 'sddefault' = 'maxresdefault'): string {
  if (!youtubeId || youtubeId.length > 20) {
    // Return a beautiful default Unsplash spiritual background for playlists or custom override
    return `https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=600`;
  }
  return `https://img.youtube.com/vi/${youtubeId}/${resolution}.jpg`;
}

/**
 * Returns an array of backup thumbnail URLs for React to try in sequence upon load errors.
 */
export function getThumbnailFallbacks(youtubeId: string): string[] {
  if (!youtubeId || youtubeId.length > 20) return [];
  return [
    `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${youtubeId}/sddefault.jpg`,
    `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
    `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`
  ];
}

/**
 * Scrapes or auto-populates metadata from a YouTube URL.
 * Since client-side scraping is blocked by CORS, we use a smart generator
 * that infers clean metadata structure.
 */
export function inferMediaMetadata(url: string, category: string): Partial<MediaItem> {
  const { id: ytId, isPlaylist, isShort } = extractYoutubeId(url);
  
  // Format clean title from slug if possible, or provide standard placeholders
  const cleanCategory = category || "General Wisdom";
  const now = new Date().toISOString();

  return {
    id: ytId || `item-${Date.now()}`,
    youtubeId: ytId,
    youtubeUrl: url,
    thumbnail: getYoutubeThumbnail(ytId, 'maxresdefault'),
    isShort,
    isPlaylist,
    language: "Hindi", // Default to Hindi as typical for LEO family
    difficulty: "All Levels",
    visibility: "public",
    createdAt: now,
    updatedAt: now,
    publishedDate: now.split('T')[0],
    viewCount: 0,
    watchTime: 0,
    likes: 0
  };
}

/**
 * Generates automated Video SEO schema (JSON-LD) for search crawlers.
 */
export function generateVideoSchema(item: MediaItem): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": item.title,
    "description": item.description,
    "thumbnailUrl": [
      item.thumbnail,
      getYoutubeThumbnail(item.youtubeId, 'hqdefault'),
      getYoutubeThumbnail(item.youtubeId, 'mqdefault')
    ],
    "uploadDate": item.publishedDate,
    "duration": item.isShort ? "PT30S" : "PT15M", // approximate fallback or actual
    "embedUrl": `https://www.youtube.com/embed/${item.youtubeId}`,
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": { "@type": "WatchAction" },
      "userInteractionCount": item.viewCount || 0
    }
  };
  return JSON.stringify(schema, null, 2);
}

/**
 * Generates Open Graph & Twitter meta tags programmatically.
 */
export function getSeoMetaTags(item: MediaItem, siteUrl = "https://leofamily.com"): Record<string, string> {
  const pageUrl = `${siteUrl}/media-center?v=${item.id}`;
  return {
    "title": item.seoTitle || `${item.title} | LEO Family Media Library`,
    "description": item.seoDescription || item.description,
    "og:type": "video.other",
    "og:title": item.title,
    "og:description": item.description,
    "og:image": item.thumbnail,
    "og:url": pageUrl,
    "twitter:card": "summary_large_image",
    "twitter:title": item.title,
    "twitter:description": item.description,
    "twitter:image": item.thumbnail
  };
}

/**
 * Creates a fully compliant MediaItem from basic user-provided story inputs.
 */
export function createDynamicStory(data: {
  youtubeUrl: string;
  title: string;
  category: string;
  description: string;
  featured: boolean;
  collection: string[];
}): MediaItem {
  const { id: ytId, isShort, isPlaylist } = extractYoutubeId(data.youtubeUrl);
  const now = new Date().toISOString();

  return {
    id: ytId || `item-${Date.now()}`,
    title: data.title,
    description: data.description,
    youtubeUrl: data.youtubeUrl,
    youtubeId: ytId || '',
    thumbnail: getYoutubeThumbnail(ytId, 'maxresdefault'),
    category: data.category,
    collection: data.collection,
    featured: data.featured,
    isShort,
    isPlaylist,
    duration: isShort ? "1 Min" : "10 Mins",
    publishedDate: now.split('T')[0],
    language: "Hindi",
    tags: ["Success Story", data.category],
    difficulty: "All Levels",
    visibility: "public",
    createdAt: now,
    updatedAt: now,
    viewCount: 0,
    watchTime: 0,
    likes: 0
  };
}
