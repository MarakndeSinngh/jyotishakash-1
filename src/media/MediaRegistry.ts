import { MediaItem as ConfigMediaItem, MEDIA_REGISTRY } from '../config/mediaRegistry';
import { MediaItem } from './MediaTypes';
import { getYoutubeThumbnail } from './MediaHelpers';

const DEFAULT_NOW = "2026-07-17T00:00:00Z";

const teacherNameMap: Record<string, string> = {
  raajeev: 'Raajeev Singh Chauhann',
  shaunak: 'Shaunak S. Patthak',
  sannjoy: 'Sannjoy Biswass',
  all: 'LEO Family Master',
};

/**
 * Robust initial list of high-vibrational media items for LEO Family.
 * Derived directly from the central MEDIA_REGISTRY in src/config/mediaRegistry.ts.
 */
export const INITIAL_MEDIA_ITEMS: MediaItem[] = MEDIA_REGISTRY.map((item) => {
  const teacherName = teacherNameMap[item.teacherId] || 'LEO Family Master';
  return {
    id: item.id,
    title: item.title,
    subtitle: `${item.category} Masterclass`,
    description: item.description,
    youtubeUrl: item.youtubeUrl,
    youtubeId: item.youtubeVideoId,
    thumbnail: item.thumbnail || getYoutubeThumbnail(item.youtubeVideoId, 'maxresdefault'),
    category: item.category,
    collection: ['all', item.category.toLowerCase().replace(/\s+/g, '-'), item.teacherId],
    instructor: teacherName,
    speaker: item.speaker || teacherName,
    location: item.location || 'India',
    duration: item.duration,
    publishedDate: item.publishDate,
    language: item.language,
    tags: item.tags,
    featured: item.featured,
    recommended: item.featured,
    isShort: item.isShort,
    isPlaylist: item.isPlaylist,
    difficulty: 'All Levels',
    visibility: 'public',
    priority: item.featured ? 100 : 50,
    createdAt: DEFAULT_NOW,
    updatedAt: DEFAULT_NOW,
    viewCount: parseInt((item.views || '100').replace(/[^0-9]/g, ''), 10) * 1000 || 150000,
    watchTime: 1200000,
    likes: 12000,
    stars: item.stars || 5,
    courseName: item.courseName || item.category,
    consultationLink: item.consultationLink || 'https://wa.me/919953713176',
  };
});
