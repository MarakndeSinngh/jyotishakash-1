import { Course, UpcomingEvent, FreeResource } from '../types/academy';
import { getAcademyBySlug, getDefaultAcademy, ACADEMIES_REGISTRY } from '../config/academies';

// Helper to get courses dynamically by academy slug or return default
export function getAcademyCourses(slug?: string): Course[] {
  const academy = getAcademyBySlug(slug);
  return academy.courses;
}

// Helper to get learning roadmap dynamically by academy slug
export function getAcademyRoadmap(slug?: string) {
  const academy = getAcademyBySlug(slug);
  return academy.learningRoadmap;
}

// Helper to get why choose us features dynamically
export function getAcademyWhyChooseUs(slug?: string) {
  const academy = getAcademyBySlug(slug);
  return academy.whyChooseUs;
}

// Helper to get upcoming events dynamically
export function getAcademyEvents(slug?: string): UpcomingEvent[] {
  const academy = getAcademyBySlug(slug);
  return academy.events;
}

// Helper to get free resources dynamically
export function getAcademyFreeResources(slug?: string): FreeResource[] {
  const academy = getAcademyBySlug(slug);
  return academy.freeResources;
}

// Default fallback exports for backwards compatibility
export const LEARNING_ROADMAP = getDefaultAcademy().learningRoadmap;
export const COURSES: Course[] = getDefaultAcademy().courses;
export const WHY_CHOOSE_US_FEATURES = getDefaultAcademy().whyChooseUs;
export const EVENTS: UpcomingEvent[] = getDefaultAcademy().events;
export const FREE_RESOURCES: FreeResource[] = getDefaultAcademy().freeResources;
