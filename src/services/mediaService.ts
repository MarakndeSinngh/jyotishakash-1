import { Media } from '../models/media';
import { supabaseMediaRepository } from '../repositories/supabaseMediaRepository';

export const mediaService = {
  /**
   * Get all media entries
   */
  async getAllMedia(): Promise<Media[]> {
    return supabaseMediaRepository.getAll();
  },

  /**
   * Get media by mentor ID
   */
  async getMediaByMentor(mentorId: string): Promise<Media[]> {
    return supabaseMediaRepository.getByMentor(mentorId);
  },

  /**
   * Get featured media
   */
  async getFeaturedMedia(): Promise<Media[]> {
    return supabaseMediaRepository.getFeatured();
  },

  /**
   * Get media by category
   */
  async getMediaByCategory(category: string): Promise<Media[]> {
    return supabaseMediaRepository.getByCategory(category);
  },

  /**
   * Save a new media item
   */
  async saveMedia(media: Media): Promise<Media> {
    return supabaseMediaRepository.create(media);
  },

  /**
   * Update an existing media item
   */
  async updateMedia(id: string, updates: Partial<Media>): Promise<Media> {
    return supabaseMediaRepository.update(id, updates);
  },

  /**
   * Delete a media item by ID
   */
  async deleteMedia(id: string): Promise<boolean> {
    return supabaseMediaRepository.delete(id);
  }
};
