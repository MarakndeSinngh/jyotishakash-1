import { EnterpriseCourse, CourseSearchFilter, CourseModule, CourseLesson } from '../types/course';
import { ENTERPRISE_COURSES_SEED } from '../data/mockCourses';
import { Course as LegacyCourse } from '../types/academy';

class CourseEngineService {
  private courses: EnterpriseCourse[] = [...ENTERPRISE_COURSES_SEED];

  // ==========================================
  // GET ALL COURSES
  // ==========================================
  public getAllCourses(): EnterpriseCourse[] {
    return [...this.courses];
  }

  // ==========================================
  // GET COURSE BY ID
  // ==========================================
  public getCourseById(courseId: string): EnterpriseCourse | undefined {
    return this.courses.find(c => c.id === courseId);
  }

  // ==========================================
  // GET COURSES BY ACADEMY ID
  // ==========================================
  public getCoursesByAcademy(academyId: string): EnterpriseCourse[] {
    return this.courses.filter(c => c.academyId === academyId || c.academyId.toLowerCase() === academyId.toLowerCase());
  }

  // ==========================================
  // SEARCH & FILTER COURSES
  // ==========================================
  public searchCourses(filters: CourseSearchFilter): EnterpriseCourse[] {
    return this.courses.filter(course => {
      // Text Search Query
      if (filters.query && filters.query.trim() !== '') {
        const q = filters.query.toLowerCase();
        const matchesTitle = course.title.toLowerCase().includes(q);
        const matchesSub = course.subtitle?.toLowerCase().includes(q);
        const matchesDesc = course.description.toLowerCase().includes(q);
        const matchesTags = course.tags.some(t => t.toLowerCase().includes(q));
        const matchesInstructor = course.instructorName.toLowerCase().includes(q);

        if (!matchesTitle && !matchesSub && !matchesDesc && !matchesTags && !matchesInstructor) {
          return false;
        }
      }

      // Filter by Academy
      if (filters.academyId && filters.academyId !== 'All' && filters.academyId !== '') {
        if (course.academyId.toLowerCase() !== filters.academyId.toLowerCase()) {
          return false;
        }
      }

      // Filter by Instructor
      if (filters.instructorId && filters.instructorId !== 'All' && filters.instructorId !== '') {
        if (!course.instructorId.toLowerCase().includes(filters.instructorId.toLowerCase())) {
          return false;
        }
      }

      // Filter by Language
      if (filters.language && filters.language !== 'All' && filters.language !== '') {
        if (course.language.toLowerCase() !== filters.language.toLowerCase()) {
          return false;
        }
      }

      // Filter by Level / Difficulty
      if (filters.level && filters.level !== 'All') {
        if (course.level.toLowerCase() !== filters.level.toLowerCase()) {
          return false;
        }
      }

      // Filter by Category
      if (filters.category && filters.category !== 'All') {
        if (course.category.toLowerCase() !== filters.category.toLowerCase()) {
          return false;
        }
      }

      // Filter by Price Range
      if (filters.priceRange) {
        if (filters.priceRange === 'free' && !course.isFree) return false;
        if (filters.priceRange === 'paid' && course.isFree) return false;
      }

      // Featured / Bestseller
      if (filters.isFeatured && !course.isFeatured) return false;
      if (filters.isBestseller && !course.isBestseller) return false;

      // Filter by Tags
      if (filters.tags && filters.tags.length > 0) {
        const hasTag = filters.tags.some(tag => course.tags.includes(tag));
        if (!hasTag) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'popular') return b.studentsEnrolled - a.studentsEnrolled;
      if (filters.sortBy === 'price_low') return a.price - b.price;
      if (filters.sortBy === 'price_high') return b.price - a.price;
      return 0; // Default ordering
    });
  }

  // ==========================================
  // ENRICH LEGACY ACADEMY COURSE TO ENTERPRISE
  // ==========================================
  public enrichLegacyCourse(legacy: LegacyCourse, academyId: string, instructorName: string): EnterpriseCourse {
    const existing = this.getCourseById(legacy.id);
    if (existing) return existing;

    // Standardize price
    const rawPriceNum = legacy.price ? parseInt(legacy.price.replace(/[^0-9]/g, ''), 10) || 4999 : 4999;

    const defaultModules: CourseModule[] = [
      {
        id: `${legacy.id}-m1`,
        title: 'Module 1: Comprehensive Foundations',
        description: `Core principles and theoretical methodology of ${legacy.title}.`,
        order: 1,
        lessons: [
          {
            id: `${legacy.id}-l1`,
            title: 'Lesson 1.1: Introduction & Philosophical Basis',
            duration: '35:00',
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            videoType: 'mp4',
            isFreePreview: true,
            order: 1,
            status: 'active',
            notes: 'Introductory notes & resource overview.',
          },
          {
            id: `${legacy.id}-l2`,
            title: 'Lesson 1.2: Core Applied Methods',
            duration: '45:00',
            isFreePreview: false,
            order: 2,
            status: 'active',
          },
        ],
      },
      {
        id: `${legacy.id}-m2`,
        title: 'Module 2: Advanced Practical Case Studies',
        description: 'Real-world consultation analysis and remedies.',
        order: 2,
        lessons: [
          {
            id: `${legacy.id}-l3`,
            title: 'Lesson 2.1: Case Study Workshop & Analysis',
            duration: '50:00',
            isFreePreview: false,
            order: 3,
            status: 'active',
          },
        ],
      },
    ];

    const newCourse: EnterpriseCourse = {
      id: legacy.id,
      academyId,
      instructorId: instructorName.toLowerCase().replace(/\s+/g, '-'),
      instructorName,
      title: legacy.title,
      subtitle: `${legacy.title} Masterclass certified by ${instructorName}`,
      description: legacy.description,
      language: 'English',
      category: academyId === 'raajeev' ? 'Vastu' : academyId === 'shaunak' ? 'Astrology' : 'Numerology',
      level: (legacy.difficulty as any) || 'All Levels',
      duration: legacy.duration || '12 Hours',
      lessonsCount: 8,
      thumbnail: legacy.image,
      banner: legacy.image,
      price: rawPriceNum,
      discountPrice: Math.round(rawPriceNum * 0.5),
      currency: 'INR',
      rating: 4.9,
      studentsEnrolled: 850,
      status: 'published',
      isFree: rawPriceNum === 0,
      isPremium: rawPriceNum > 0,
      isFeatured: legacy.badge === 'Featured' || legacy.badge === 'Most Popular',
      isBestseller: legacy.badge === 'Best Seller' || legacy.badge === 'Bestseller',
      isComingSoon: false,
      tags: [legacy.title, instructorName, legacy.format || 'Masterclass'],
      badge: legacy.badge,
      hasCertificate: legacy.hasCertificate,
      format: legacy.format,
      seo: {
        title: `${legacy.title} - ${instructorName}`,
        description: legacy.description,
        keywords: [legacy.title, instructorName],
      },
      modules: defaultModules,
    };

    this.courses.push(newCourse);
    return newCourse;
  }

  // ==========================================
  // ADMIN READY: ADD NEW COURSE DYNAMICALLY
  // ==========================================
  public addAdminCourse(newCourse: EnterpriseCourse): void {
    const existingIndex = this.courses.findIndex(c => c.id === newCourse.id);
    if (existingIndex >= 0) {
      this.courses[existingIndex] = newCourse;
    } else {
      this.courses.unshift(newCourse);
    }
  }
}

export const courseEngineService = new CourseEngineService();
