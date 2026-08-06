import { Media } from '../models/media';
import { mediaRepository } from '../repositories/mediaRepository';

export const mediaService = {
  /**
   * Get all media entries
   */
  async getAllMedia(): Promise<Media[]> {
    return mediaRepository.getAll();
  },

  /**
   * Get media by mentor ID
   */
  async getMediaByMentor(mentorId: string): Promise<Media[]> {
    return mediaRepository.getByMentor(mentorId);
  },

  /**
   * Get featured media
   */
  async getFeaturedMedia(): Promise<Media[]> {
    return mediaRepository.getFeatured();
  },

  /**
   * Get media by category
   */
  async getMediaByCategory(category: string): Promise<Media[]> {
    return mediaRepository.getByCategory(category);
  },

  /**
   * Save a new media item
   */
  async saveMedia(media: Media): Promise<Media> {
    return mediaRepository.create(media);
  },

  /**
   * Update an existing media item
   */
  async updateMedia(id: string, updates: Partial<Media>): Promise<Media> {
    return mediaRepository.update(id, updates);
  },

  /**
   * Delete a media item by ID
   */
  async deleteMedia(id: string): Promise<boolean> {
    return mediaRepository.delete(id);
  }
};
