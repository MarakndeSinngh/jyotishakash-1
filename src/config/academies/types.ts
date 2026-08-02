import { Course, UpcomingEvent, FreeResource } from '../../types/academy';

export interface AcademyTestimonial {
  id: string;
  name: string;
  role: string;
  location?: string;
  rating: number;
  content: string;
  avatar: string;
  courseTitle?: string;
}

export interface AcademyFAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface AcademyFeature {
  title: string;
  desc: string;
}

export interface RoadmapStep {
  step: string;
  title: string;
  desc: string;
}

export interface AcademyConfig {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  instructorName: string;
  instructorTitle: string;
  instructorBio?: string;
  tagline: string;
  description: string;
  language: string;
  languages?: {
    default: string;
    available: string[];
  };
  hero?: {
    title: string;
    subtitle: string;
    ctaText: string;
    secondaryCtaText?: string;
  };
  branding: {
    logo: string;
    theme: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    courseBanner?: string;
  };
  assets: {
    heroImage: string;
    profileImage: string;
    founderPortrait: string;
    background: string;
    ogImage: string;
    courseBanner?: string;
    dashboardProfile?: string;
    certificateTemplate?: string;
    videoPlayerPoster?: string;
    instructorCard?: string;
  };
  contactDetails?: {
    phone?: string;
    whatsapp?: string;
    email?: string;
    address?: string;
  };
  socialLinks?: {
    youtube?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
    twitterCard?: string;
    siteName?: string;
    structuredData?: Record<string, any>;
  };
  courses: Course[];
  testimonials: AcademyTestimonial[];
  faqs: AcademyFAQ[];
  learningRoadmap: RoadmapStep[];
  whyChooseUs: AcademyFeature[];
  events: UpcomingEvent[];
  freeResources: FreeResource[];
  stats?: {
    value: string;
    label: string;
    desc: string;
  }[];
  translations?: Record<string, Record<string, string>>;
}
