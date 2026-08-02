/**
 * YouTube Utility and Thumbnail Engine for the LEO Family project.
 * Implements a dynamic, robust, caching, and multi-resolution fallback system
 * for videos, shorts, playlists, and channels.
 */

import { BrandRegistry } from '../config/brandRegistry';

export interface YoutubeDetails {
  type: 'video' | 'shorts' | 'playlist' | 'channel' | 'unknown';
  id: string; // Video ID, playlist ID, or channel handle
  canonicalUrl: string;
}

/**
 * Parses any YouTube-related URL and extracts the relevant entity type and ID.
 * Supports:
 * - https://youtu.be/VIDEO_ID
 * - https://youtube.com/watch?v=VIDEO_ID
 * - https://youtube.com/shorts/VIDEO_ID
 * - https://youtube.com/playlist?list=PLAYLIST_ID
 * - https://youtube.com/@channel
 */
export function parseYoutubeUrl(url: string | undefined | null): YoutubeDetails {
  if (!url) {
    return { type: 'unknown', id: '', canonicalUrl: '' };
  }

  const cleanUrl = url.trim();

  try {
    // 1. Shorts link
    if (cleanUrl.includes('/shorts/')) {
      const parts = cleanUrl.split('/shorts/');
      const id = parts[1]?.split(/[?#&/]/)[0] || '';
      return { type: 'shorts', id, canonicalUrl: `https://www.youtube.com/shorts/${id}` };
    }

    // 2. Playlist link
    if (cleanUrl.includes('playlist?list=')) {
      const parts = cleanUrl.split('playlist?list=');
      const id = parts[1]?.split(/[?#&]/)[0] || '';
      return { type: 'playlist', id, canonicalUrl: `https://www.youtube.com/playlist?list=${id}` };
    }

    // 3. Channel handle (starts with @)
    if (cleanUrl.includes('/@')) {
      const parts = cleanUrl.split('/@');
      const id = '@' + (parts[1]?.split(/[?#&/]/)[0] || '');
      return { type: 'channel', id, canonicalUrl: `https://www.youtube.com/${id}` };
    }

    // 4. Short URL (youtu.be)
    if (cleanUrl.includes('youtu.be/')) {
      const parts = cleanUrl.split('youtu.be/');
      const id = parts[1]?.split(/[?#&/]/)[0] || '';
      return { type: 'video', id, canonicalUrl: `https://youtu.be/${id}` };
    }

    // 5. Standard video URL (watch?v=)
    if (cleanUrl.includes('watch?v=')) {
      const parts = cleanUrl.split('watch?v=');
      const id = parts[1]?.split(/[?#&]/)[0] || '';
      return { type: 'video', id, canonicalUrl: `https://www.youtube.com/watch?v=${id}` };
    }

    // 6. Direct embed URL (embed/VIDEO_ID)
    if (cleanUrl.includes('/embed/')) {
      const parts = cleanUrl.split('/embed/');
      const id = parts[1]?.split(/[?#&/]/)[0] || '';
      return { type: 'video', id, canonicalUrl: `https://www.youtube.com/watch?v=${id}` };
    }

    // 7. If it's just an 11-character string, assume it's a direct video ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) {
      return { type: 'video', id: cleanUrl, canonicalUrl: `https://www.youtube.com/watch?v=${cleanUrl}` };
    }
  } catch (e) {
    console.error('Error parsing YouTube URL:', e);
  }

  return { type: 'unknown', id: '', canonicalUrl: cleanUrl };
}

/**
 * Returns an ordered array of high to low quality thumbnail URLs for a video ID.
 * This serves as our fallback chain when checking for missing maxresdefault.jpg.
 */
export function getFallbackThumbnails(videoId: string): string[] {
  if (!videoId) return [];
  return [
    `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/default.jpg`
  ];
}

// In-memory cache for dynamic oEmbed resolutions (playlists and channels)
const localCache: Record<string, string> = {};

// Safe localStorage initialization
try {
  const saved = localStorage.getItem('leo-youtube-thumbnail-cache');
  if (saved) {
    Object.assign(localCache, JSON.parse(saved));
  }
} catch (e) {
  console.warn('Could not read YouTube thumbnail cache from localStorage:', e);
}

/**
 * Resolves the channel or playlist artwork from cache or oEmbed API.
 */
export async function fetchYoutubeArtwork(url: string, id: string, type: 'playlist' | 'channel'): Promise<string> {
  const cacheKey = `${type}:${id}`;
  if (localCache[cacheKey]) {
    return localCache[cacheKey];
  }

  // Fallback map in case the network fails or oEmbed is blocked
  const fallbackMap: Record<string, string> = {
    'channel:@leofamilyoccultgyan': BrandRegistry.assets?.logos?.symbol || '/gemstone-assets/logo.jpg',
    'channel:@raajeevsinghchauhann': BrandRegistry.assets?.founderPhotos?.portrait || '/assets/Raajeev.png',
    'channel:@leofamilyindianfilms': BrandRegistry.assets?.logos?.symbol || '/gemstone-assets/logo.jpg',
    'playlist:PLOFld0SYjqbZ-wCREGBGP4d96TDm7ZbDf': 'https://i.ytimg.com/vi/RcmLxAECJAc/maxresdefault.jpg',
  };

  try {
    // Utilize public oEmbed endpoints wrapped in a safe CORS proxy if needed, or directly from YouTube oembed.
    // YouTube oEmbed endpoint is highly reliable.
    const res = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(url)}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.thumbnail_url) {
        let artworkUrl = data.thumbnail_url;
        // Upgrade hqdefault to maxresdefault for higher resolution where possible
        if (artworkUrl.includes('hqdefault.jpg')) {
          artworkUrl = artworkUrl.replace('hqdefault.jpg', 'maxresdefault.jpg');
        }
        localCache[cacheKey] = artworkUrl;
        try {
          localStorage.setItem('leo-youtube-thumbnail-cache', JSON.stringify(localCache));
        } catch (e) {
          console.warn('localStorage write failed:', e);
        }
        return artworkUrl;
      }
    }
  } catch (err) {
    console.warn(`oEmbed fetch failed for ${url}, using fallback registry artwork`, err);
  }

  return fallbackMap[cacheKey] || fallbackMap[`channel:@leofamilyoccultgyan`] || '/gemstone-assets/logo.jpg';
}
