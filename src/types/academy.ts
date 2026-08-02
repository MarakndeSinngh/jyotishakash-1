export interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels' | string;
  duration: string;
  format: 'Live Online' | 'Self-Paced Video' | 'Hybrid Masterclass' | string;
  hasCertificate: boolean;
  instructor: string;
  image: string;
  badge?: 'Most Popular' | 'Best Seller' | 'New' | 'Advanced' | 'Featured' | string;
  price?: string;
}

export interface UpcomingEvent {
  id: string;
  date: string; // ISO string or human-readable (e.g., "Oct 24, 2026")
  time: string; // E.g., "7:00 PM IST"
  speaker: string;
  topic: string;
  seatsAvailable: number;
  totalSeats: number;
  countdownTarget: string; // "2026-10-24T19:00:00"
}

export interface FreeResource {
  id: string;
  title: string;
  type: 'eBook' | 'Article' | 'Video Guide' | 'Cheat Sheet' | string;
  description: string;
  downloadUrl: string;
  image: string;
}
