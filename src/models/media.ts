export interface Media {
  id: string;
  mentorId: string;
  title?: string;
  description?: string;
  youtubeUrl: string;
  youtubeVideoId: string;
  thumbnail: string;
  category: string;
  featured: boolean;
  visible: boolean;
  order: number;
  speaker?: string;
  publishedDate?: string;
  viewCount?: number;
  createdAt?: string;
  updatedAt?: string;
}
