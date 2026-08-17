import { WebsiteSettings } from '../models/websiteSettings';
import { websiteSettingsRepository } from '../repositories/websiteSettingsRepository';

export const websiteSettingsService = {
  /**
   * Get current website settings
   */
  async getSettings(): Promise<WebsiteSettings> {
    return websiteSettingsRepository.getSettings();
  },

  /**
   * Update website settings
   */
  async updateSettings(updates: Partial<WebsiteSettings>): Promise<WebsiteSettings> {
    return websiteSettingsRepository.updateSettings(updates);
  },

  /**
   * Save Meditation Hero YouTube URL to Supabase via persistent UPSERT
   */
  async saveMeditationHeroVideo(youtubeUrl: string): Promise<WebsiteSettings> {
    return websiteSettingsRepository.saveMeditationHeroVideo(youtubeUrl);
  }
};
