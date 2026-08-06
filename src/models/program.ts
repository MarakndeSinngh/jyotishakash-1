export interface Program {
  id: string;
  mentorId: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  duration: string;
  price: number;
  discountPrice?: number;
  featured: boolean;
  visible: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}
