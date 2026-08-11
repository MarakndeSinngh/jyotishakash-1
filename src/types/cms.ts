export interface Page {
  id?: string;
  title: string;
  slug: string;
  template: string;
  isPublished: boolean;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export type SectionType = 'hero' | 'services' | 'testimonials' | 'about' | 'contact' | 'cta' | 'gemstones' | 'numerology' | 'academy' | 'ai' | 'custom' | 'ecosystem';

export interface Section {
  id?: string;
  pageId: string;
  type: SectionType;
  title?: string;
  subtitle?: string;
  content?: string;
  image?: string;
  order: number;
  isActive: boolean;
}

export interface Service {
  id?: string;
  title: string;
  description: string;
  price?: number;
  image?: string;
  isFeatured: boolean;
  order: number;
}

export interface Testimonial {
  id?: string;
  testimonialCode?: string;
  name: string;
  role?: string;
  course?: string;
  feedback: string;
  rating: number;
  image?: string;
  published?: boolean;
  displayOrder?: number;
  testimonialDate?: string;
  createdAt?: string;
  updatedAt?: string;
}
