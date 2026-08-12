import { MediaAsset } from '../models/mediaAsset';
import { supabaseMediaAssetRepository } from '../repositories/supabaseMediaAssetRepository';

export const mediaAssetService = {
  async getAssets(): Promise<MediaAsset[]> {
    return supabaseMediaAssetRepository.getAssets();
  },

  async getAssetById(id: string): Promise<MediaAsset | null> {
    return supabaseMediaAssetRepository.getAssetById(id);
  },

  async createAsset(asset: Omit<MediaAsset, 'id' | 'createdDate' | 'lastModified'>): Promise<MediaAsset> {
    return supabaseMediaAssetRepository.createAsset(asset);
  },

  async updateAsset(id: string, updates: Partial<MediaAsset>): Promise<MediaAsset> {
    return supabaseMediaAssetRepository.updateAsset(id, updates);
  },

  async deleteAsset(id: string): Promise<boolean> {
    return supabaseMediaAssetRepository.deleteAsset(id);
  }
};
