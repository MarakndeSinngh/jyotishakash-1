import { StorageAsset } from '../models/storageAsset';
import { storageRepository } from '../repositories/storageRepository';

export const storageService = {
  async listAssets(category?: string): Promise<StorageAsset[]> {
    return storageRepository.listAssets(category);
  },

  async getAssetUrl(assetId: string): Promise<string> {
    return storageRepository.getAssetUrl(assetId);
  },

  async uploadImage(file: any): Promise<StorageAsset> {
    return storageRepository.uploadImage(file);
  },

  async deleteImage(assetId: string): Promise<boolean> {
    return storageRepository.deleteImage(assetId);
  },

  async replaceImage(assetId: string, file: any): Promise<StorageAsset> {
    return storageRepository.replaceImage(assetId, file);
  }
};
