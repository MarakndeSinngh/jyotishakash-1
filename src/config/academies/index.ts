import { AcademyConfig } from './types';
import { sannjoyAcademy } from './sannjoy';
import { shaunakAcademy } from './shaunak';
import { raajeevAcademy } from './raajeev';

export * from './types';

export const ACADEMIES_REGISTRY: Record<string, AcademyConfig> = {
  raajeev: raajeevAcademy,
  shaunak: shaunakAcademy,
  sannjoy: sannjoyAcademy,
};

export const DEFAULT_ACADEMY_SLUG = 'sannjoy';

/**
 * Retrieve an academy configuration by slug (e.g. 'sannjoy', 'shaunak', 'raajeev').
 * Falls back to default academy if slug is unknown or not provided.
 */
export function getAcademyBySlug(slug?: string): AcademyConfig {
  if (!slug) return ACADEMIES_REGISTRY[DEFAULT_ACADEMY_SLUG];
  const cleanSlug = slug.toLowerCase().trim().replace(/^\/academy\/?/, '').replace('/', '');
  return ACADEMIES_REGISTRY[cleanSlug] || ACADEMIES_REGISTRY[DEFAULT_ACADEMY_SLUG];
}

/**
 * Get all available academies in the platform.
 */
export function getAllAcademies(): AcademyConfig[] {
  return Object.values(ACADEMIES_REGISTRY);
}

/**
 * Get default platform academy configuration.
 */
export function getDefaultAcademy(): AcademyConfig {
  return ACADEMIES_REGISTRY[DEFAULT_ACADEMY_SLUG];
}
