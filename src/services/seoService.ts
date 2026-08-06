import { SEOPage } from '../models/seo';
import { seoRepository } from '../repositories/seoRepository';

export const seoService = {
  async getSeoPages(): Promise<SEOPage[]> {
    return seoRepository.getSeoPages();
  },

  async updateSeoPage(id: string, updates: Partial<SEOPage>): Promise<SEOPage> {
    return seoRepository.updateSeoPage(id, updates);
  },

  async createSeoPage(page: Omit<SEOPage, 'id' | 'lastUpdated'>): Promise<SEOPage> {
    return seoRepository.createSeoPage(page);
  },

  async deleteSeoPage(id: string): Promise<boolean> {
    return seoRepository.deleteSeoPage(id);
  }
};
