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
  category?: string;
  paymentUrl?: string;
  approximateValue?: number;
  schedule?: string;
  startDate?: string;
  campaignActive?: boolean;
  campaignEndDate?: string;
  createdAt?: string;
  updatedAt?: string;
}
