export interface Media {
  id: string;
  mentorId: string;
  youtubeUrl: string;
  youtubeVideoId: string;
  thumbnail: string;
  category: string;
  featured: boolean;
  visible: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}
