import { StorageAsset } from '../models/storageAsset';
import { mediaAssetRepository } from './mediaAssetRepository';

export const storageRepository = {
  async listAssets(category?: string): Promise<StorageAsset[]> {
    const allAssets = await mediaAssetRepository.getAssets();
    if (!category || category === 'all') {
      return allAssets;
    }
    return allAssets.filter(asset => asset.category.toLowerCase() === category.toLowerCase());
  },

  async getAssetUrl(assetId: string): Promise<string> {
    const asset = await mediaAssetRepository.getAssetById(assetId);
    if (!asset) {
      throw new Error(`Asset with id ${assetId} not found`);
    }
    return asset.url;
  },

  async uploadImage(fileData: any): Promise<StorageAsset> {
    // fileData can be a partial asset object or mock file
    const newAssetData = {
      fileName: fileData.fileName || 'uploaded-asset.jpg',
      url: fileData.url || 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
      category: fileData.category || 'General',
      altText: fileData.altText || 'Uploaded asset',
      caption: fileData.caption || '',
      tags: fileData.tags || ['upload'],
      width: fileData.width || 1920,
      height: fileData.height || 1080,
      fileSize: fileData.fileSize || '1.0 MB',
      fileType: fileData.fileType || 'image/jpeg',
      visibility: fileData.visibility || 'Public',
      usedBy: fileData.usedBy || ['Media Library']
    };
    return mediaAssetRepository.createAsset(newAssetData);
  },

  async deleteImage(assetId: string): Promise<boolean> {
    return mediaAssetRepository.deleteAsset(assetId);
  },

  async replaceImage(assetId: string, newFileData: any): Promise<StorageAsset> {
    const updates: Partial<StorageAsset> = {};
    if (typeof newFileData === 'string') {
      updates.url = newFileData;
    } else if (newFileData && typeof newFileData === 'object') {
      if (newFileData.url) updates.url = newFileData.url;
      if (newFileData.fileName) updates.fileName = newFileData.fileName;
      if (newFileData.fileSize) updates.fileSize = newFileData.fileSize;
    }
    return mediaAssetRepository.updateAsset(assetId, updates);
  }
};
