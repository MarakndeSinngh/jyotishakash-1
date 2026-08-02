import React, { createContext, useContext, useState, useMemo } from 'react';
import { EnterpriseCourse, CourseSearchFilter, CourseLevel } from '../types/course';
import { courseEngineService } from '../services/courseEngine';
import { useAcademy } from './AcademyContext';

export interface CourseFilterState {
  query: string;
  academyId: string;
  instructorId: string;
  language: string;
  level: CourseLevel | 'All';
  category: string | 'All';
  priceRange: 'all' | 'free' | 'paid';
  isFeatured: boolean;
  isBestseller: boolean;
  sortBy: 'popular' | 'rating' | 'newest' | 'price_low' | 'price_high';
}

const DEFAULT_FILTERS: CourseFilterState = {
  query: '',
  academyId: 'All',
  instructorId: 'All',
  language: 'All',
  level: 'All',
  category: 'All',
  priceRange: 'all',
  isFeatured: false,
  isBestseller: false,
  sortBy: 'popular',
};

interface CourseEngineContextType {
  courses: EnterpriseCourse[];
  filteredCourses: EnterpriseCourse[];
  filters: CourseFilterState;
  
  // Filtering Actions
  setFilter: <K extends keyof CourseFilterState>(key: K, value: CourseFilterState[K]) => void;
  resetFilters: () => void;
  
  // Bookmarks & Favorites
  bookmarks: string[];
  favorites: string[];
  toggleBookmark: (courseId: string) => void;
  toggleFavorite: (courseId: string) => void;
  isBookmarked: (courseId: string) => boolean;
  isFavorite: (courseId: string) => boolean;

  // Course Helpers
  getCourseById: (courseId: string) => EnterpriseCourse | undefined;
  getCoursesByAcademy: (academyId: string) => EnterpriseCourse[];

  // Admin Ready
  addAdminCourse: (newCourse: EnterpriseCourse) => void;
}

const CourseEngineContext = createContext<CourseEngineContextType | undefined>(undefined);

export const CourseEngineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { allAcademies } = useAcademy();

  // Initialize course engine with pre-seed + legacy academies sync
  const [coursesList, setCoursesList] = useState<EnterpriseCourse[]>(() => {
    // Sync any academy courses from legacy config into Enterprise Course Engine
    allAcademies.forEach(academy => {
      academy.courses.forEach(legacyCourse => {
        courseEngineService.enrichLegacyCourse(legacyCourse, academy.slug, academy.instructorName);
      });
    });
    return courseEngineService.getAllCourses();
  });

  const [filters, setFilters] = useState<CourseFilterState>(DEFAULT_FILTERS);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Filter updates
  const setFilter = <K extends keyof CourseFilterState>(key: K, value: CourseFilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  // Compute filtered courses dynamically
  const filteredCourses = useMemo(() => {
    return courseEngineService.searchCourses({
      query: filters.query,
      academyId: filters.academyId,
      instructorId: filters.instructorId,
      language: filters.language,
      level: filters.level,
      category: filters.category,
      priceRange: filters.priceRange,
      isFeatured: filters.isFeatured,
      isBestseller: filters.isBestseller,
      sortBy: filters.sortBy,
    });
  }, [coursesList, filters]);

  // Bookmarks & Favorites
  const toggleBookmark = (courseId: string) => {
    setBookmarks(prev => (prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId]));
  };

  const toggleFavorite = (courseId: string) => {
    setFavorites(prev => (prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId]));
  };

  const isBookmarked = (courseId: string) => bookmarks.includes(courseId);
  const isFavorite = (courseId: string) => favorites.includes(courseId);

  // Queries
  const getCourseById = (courseId: string) => {
    return coursesList.find(c => c.id === courseId) || courseEngineService.getCourseById(courseId);
  };

  const getCoursesByAcademy = (academyId: string) => {
    return coursesList.filter(c => c.academyId.toLowerCase() === academyId.toLowerCase());
  };

  // Admin Dynamic Insert
  const addAdminCourse = (newCourse: EnterpriseCourse) => {
    courseEngineService.addAdminCourse(newCourse);
    setCoursesList(courseEngineService.getAllCourses());
  };

  return (
    <CourseEngineContext.Provider
      value={{
        courses: coursesList,
        filteredCourses,
        filters,
        setFilter,
        resetFilters,
        bookmarks,
        favorites,
        toggleBookmark,
        toggleFavorite,
        isBookmarked,
        isFavorite,
        getCourseById,
        getCoursesByAcademy,
        addAdminCourse,
      }}
    >
      {children}
    </CourseEngineContext.Provider>
  );
};

export const useCourseEngine = () => {
  const context = useContext(CourseEngineContext);
  if (!context) {
    throw new Error('useCourseEngine must be used within a CourseEngineProvider');
  }
  return context;
};
