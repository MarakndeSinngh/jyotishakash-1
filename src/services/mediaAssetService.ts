import { MediaAsset } from '../models/mediaAsset';
import { mediaAssetRepository } from '../repositories/mediaAssetRepository';

export const mediaAssetService = {
  async getAssets(): Promise<MediaAsset[]> {
    return mediaAssetRepository.getAssets();
  },

  async getAssetById(id: string): Promise<MediaAsset | null> {
    return mediaAssetRepository.getAssetById(id);
  },

  async createAsset(asset: Omit<MediaAsset, 'id' | 'createdDate' | 'lastModified'>): Promise<MediaAsset> {
    return mediaAssetRepository.createAsset(asset);
  },

  async updateAsset(id: string, updates: Partial<MediaAsset>): Promise<MediaAsset> {
    return mediaAssetRepository.updateAsset(id, updates);
  },

  async deleteAsset(id: string): Promise<boolean> {
    return mediaAssetRepository.deleteAsset(id);
  }
};
