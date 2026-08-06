export interface LiveEvent {
  id: string;
  mentorId: string;
  title: string;
  date: string;
  time: string;
  language: string;
  seats: number;
  registrationLink: string;
  banner: string;
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
  featured: boolean;
  createdAt?: string;
  updatedAt?: string;
}
