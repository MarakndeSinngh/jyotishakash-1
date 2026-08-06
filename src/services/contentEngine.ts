import { facultyService } from './facultyService';
import { programService } from './programService';
import { mediaService } from './mediaService';
import { liveEventService } from './liveEventService';
import { Faculty } from '../models/faculty';
import { Program } from '../models/program';
import { Media } from '../models/media';
import { LiveEvent } from '../models/liveEvent';

export interface HomepageContent {
  founder: Faculty | null;
  facultyMembers: Faculty[];
  featuredPrograms: Program[];
  featuredMedia: Media[];
  liveEvents: LiveEvent[];
}

export interface AcademyContent {
  mentor: Faculty | null;
  programs: Program[];
  media: Media[];
  liveEvents: LiveEvent[];
}

export const contentEngine = {
  /**
   * Aggregate all homepage content across faculty, programs, media, and live events.
   */
  async getHomepageContent(): Promise<HomepageContent> {
    const [founder, facultyMembers, featuredPrograms, featuredMedia, liveEvents] = await Promise.all([
      facultyService.getFounder(),
      facultyService.getAllFaculty(),
      programService.getFeaturedPrograms(),
      mediaService.getFeaturedMedia(),
      liveEventService.getAllLiveEvents()
    ]);

    return {
      founder,
      facultyMembers,
      featuredPrograms,
      featuredMedia,
      liveEvents
    };
  },

  /**
   * Get comprehensive academy content tailored for a specific mentor.
   */
  async getAcademyContent(mentorId: string): Promise<AcademyContent> {
    const [mentor, programs, media, liveEvents] = await Promise.all([
      facultyService.getFacultyById(mentorId),
      programService.getProgramsByMentor(mentorId),
      mediaService.getMediaByMentor(mentorId),
      liveEventService.getLiveEventByMentor(mentorId)
    ]);

    return {
      mentor,
      programs,
      media,
      liveEvents
    };
  },

  /**
   * Get hero section content for a specific mentor or founder fallback.
   */
  async getHeroContent(mentorId?: string): Promise<Faculty | null> {
    if (mentorId) {
      const mentor = await facultyService.getFacultyById(mentorId);
      if (mentor) return mentor;
    }
    return facultyService.getFounder();
  },

  /**
   * Get featured programs (optionally filtered by mentor).
   */
  async getFeaturedPrograms(mentorId?: string): Promise<Program[]> {
    if (mentorId) {
      const programs = await programService.getProgramsByMentor(mentorId);
      return programs.filter(p => p.featured && p.visible !== false);
    }
    return programService.getFeaturedPrograms();
  },

  /**
   * Get featured media (optionally filtered by mentor).
   */
  async getFeaturedMedia(mentorId?: string): Promise<Media[]> {
    if (mentorId) {
      const media = await mediaService.getMediaByMentor(mentorId);
      return media.filter(m => m.featured && m.visible !== false);
    }
    return mediaService.getFeaturedMedia();
  },

  /**
   * Get live webinar / events (optionally filtered by mentor).
   */
  async getLiveWebinar(mentorId?: string): Promise<LiveEvent[]> {
    if (mentorId) {
      return liveEventService.getLiveEventByMentor(mentorId);
    }
    return liveEventService.getAllLiveEvents();
  }
};
