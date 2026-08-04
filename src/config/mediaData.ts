import { MEDIA_REGISTRY, MediaItem, getVideosByTeacher, getVideosByCategory } from './mediaRegistry';

export interface MediaVideo {
  id: string; // YouTube Video ID or playlist ID
  type: 'video' | 'playlist' | 'shorts';
  title: string;
  category: string;
  instructor: string;
  duration: string;
  views: string;
  publishedDate: string;
  description: string;
  url: string;
  featured?: boolean;
  learnings?: string[];
  relatedCourseId?: string;
  relatedCourseName?: string;
  consultationLink?: string;
  stars?: number;
  tags?: string[];
  teacherId?: string;
}

export const MEDIA_CATEGORIES = [
  "All",
  "Student Success Stories",
  "Free Classes",
  "Astrology",
  "Numerology",
  "Vastu",
  "Gemstones",
  "Motivational Videos",
  "Webinars",
  "Interviews",
  "Spiritual AI"
];

const teacherNameMap: Record<string, string> = {
  raajeev: 'Raajeev Singh Chauhann',
  shaunak: 'Shaunak S. Patthak',
  sannjoy: 'Sannjoy Biswass',
  all: 'LEO Family Master',
};

/**
 * Derived MEDIA_VIDEOS array dynamically mapped from centralized MEDIA_REGISTRY
 */
export const MEDIA_VIDEOS: MediaVideo[] = MEDIA_REGISTRY.map((item) => ({
  id: item.id,
  type: item.isPlaylist ? 'playlist' : item.isShort ? 'shorts' : 'video',
  title: item.title,
  category: item.category,
  instructor: teacherNameMap[item.teacherId] || 'LEO Family Master',
  teacherId: item.teacherId,
  duration: item.duration,
  views: item.views || '100K+',
  publishedDate: item.publishDate,
  description: item.description,
  url: item.youtubeUrl,
  featured: item.featured,
  tags: item.tags,
  stars: item.stars || 5,
  consultationLink: item.consultationLink || 'https://wa.me/919953713176',
}));

export const MEDIA_SHORTS = MEDIA_REGISTRY.filter((i) => i.isShort || i.category === 'Shorts').map((item) => ({
  id: item.youtubeVideoId,
  student: item.speaker || 'LEO Scholar',
  course: item.courseName || item.category,
  tag: item.tags[0] || 'Transformation',
  quote: item.description,
  city: item.location || 'India',
  likes: item.views || '10K+',
}));

export { getVideosByTeacher, getVideosByCategory };
