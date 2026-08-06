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
  }
};
