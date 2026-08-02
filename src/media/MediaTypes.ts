export type MediaDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
export type MediaVisibility = 'public' | 'private' | 'unlisted';

export interface MediaItem {
  id: string; // Dynamic ID, e.g., YouTube video ID or custom ID
  title: string;
  subtitle?: string;
  description: string;
  youtubeUrl: string;
  youtubeId: string; // Extracted YouTube ID
  thumbnail: string; // YouTube thumbnail or custom override
  banner?: string;
  category: string; // Primary category
  collection: string[]; // Can belong to multiple collections (Student Reviews, Latest, etc.)
  speaker?: string; // Optional: speaker/student name
  instructor?: string; // Optional: teacher name (e.g. Raajeev Singh Chauhann)
  duration: string; // "14:22" or "Playlist (12 Videos)"
  publishedDate: string; // ISO format or YYYY-MM-DD
  language: string; // "Hindi", "English", "Multilingual"
  tags: string[];
  featured?: boolean;
  recommended?: boolean;
  isShort?: boolean;
  isPlaylist?: boolean;
  isCourse?: boolean;
  isWebinar?: boolean;
  difficulty?: MediaDifficulty;
  visibility: MediaVisibility;
  priority?: number; // Sorting weight (higher = higher priority)
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
  transcript?: string;
  captions?: string;
  aiSummary?: string;
  createdAt: string;
  updatedAt: string;

  // Real-time local Telemetry and Interaction state
  viewCount?: number;
  watchTime?: number; // Total watch duration in minutes
  completionRate?: number; // 0 to 100
  likes?: number;

  // Custom metadata for legacy/reconstructed mappings
  learnings?: string[];
  relatedCourseId?: string;
  relatedCourseName?: string;
  consultationLink?: string;
  stars?: number;
  location?: string; // E.g., "Delhi, India" for success story speakers
  courseName?: string; // For reviews/shorts course tag
}

export interface MediaCollection {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  priority?: number;
}

export interface MediaPlaylist {
  id: string;
  name: string;
  description?: string;
  items: string[]; // Array of MediaItem IDs
}

export interface MediaCategory {
  id: string;
  name: string;
  description?: string;
}

export interface MediaSpeaker {
  id: string;
  name: string;
  role: string;
  bio?: string;
  avatar?: string;
}

export interface MediaFilters {
  collection?: string; // "All" or a collection ID
  category?: string; // "All" or category name/ID
  language?: string; // "All" or language name
  difficulty?: string; // "All" or difficulty level
  featured?: boolean;
  latest?: boolean;
  popular?: boolean;
  shorts?: boolean;
  courses?: boolean;
  webinars?: boolean;
  searchQuery?: string;
}

export interface SearchResult {
  item: MediaItem;
  score: number; // For relevance ranking
  matchFields: string[]; // Fields that matched
}

export interface PlayerState {
  activeItem: MediaItem | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playbackSpeed: number;
}
