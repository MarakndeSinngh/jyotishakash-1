export interface Faculty {
  id: string;
  name: string;
  title: string;
  image: string;
  bio: string;
  languages: string[];
  consultationLink: string;
  registrationLink: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  displayOrder?: number;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

