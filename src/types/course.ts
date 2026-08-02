export type CourseStatus = 'draft' | 'published' | 'archived' | 'coming_soon';
export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
export type LessonVideoType = 'mp4' | 'youtube' | 'vimeo' | 'hls' | 'embed';

export interface LessonResource {
  id: string;
  title: string;
  fileUrl: string;
  type: 'pdf' | 'doc' | 'zip' | 'link';
  fileSize?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation?: string;
}

export interface CourseQuiz {
  id: string;
  title: string;
  passingScore: number;
  questions: QuizQuestion[];
}

export interface CourseAssignment {
  id: string;
  title: string;
  description: string;
  submissionInstructions?: string;
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string; // e.g. "15:30"
  videoUrl?: string;
  videoType?: LessonVideoType;
  pdfUrl?: string;
  assignment?: CourseAssignment;
  quiz?: CourseQuiz;
  resources?: LessonResource[];
  notes?: string;
  transcript?: string;
  isFreePreview: boolean;
  order: number;
  status: 'active' | 'draft' | 'locked';
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: CourseLesson[];
}

export interface CourseSEO {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

export interface EnterpriseCourse {
  id: string;
  academyId: string;
  instructorId: string;
  instructorName: string;
  title: string;
  subtitle: string;
  description: string;
  language: string;
  category: string; // e.g. 'Numerology', 'Astrology', 'Vastu', 'Spiritual Science'
  level: CourseLevel;
  duration: string; // e.g. '12 Hours'
  lessonsCount: number;
  thumbnail: string;
  banner: string;
  introVideoUrl?: string;
  price: number;
  discountPrice?: number;
  currency: string;
  rating: number;
  studentsEnrolled: number;
  status: CourseStatus;
  isFree: boolean;
  isPremium: boolean;
  isFeatured: boolean;
  isBestseller: boolean;
  isComingSoon: boolean;
  tags: string[];
  seo: CourseSEO;
  modules: CourseModule[];
  badge?: string;
  hasCertificate: boolean;
  format?: string;
}

export interface CourseSearchFilter {
  query?: string;
  academyId?: string;
  instructorId?: string;
  language?: string;
  level?: CourseLevel | 'All';
  category?: string | 'All';
  priceRange?: 'all' | 'free' | 'paid';
  isFeatured?: boolean;
  isBestseller?: boolean;
  tags?: string[];
  sortBy?: 'popular' | 'rating' | 'newest' | 'price_low' | 'price_high';
}
