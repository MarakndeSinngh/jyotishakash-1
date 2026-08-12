import { StorageAsset } from '../models/storageAsset';
import { supabaseMediaAssetRepository } from './supabaseMediaAssetRepository';
import { supabase } from '../lib/supabaseClient';

function getStoragePathFromUrl(url: string): string | null {
  try {
    if (!url) return null;
    const marker = '/leo-media/';
    const index = url.indexOf(marker);
    if (index !== -1) {
      return decodeURIComponent(url.substring(index + marker.length));
    }
  } catch (e) {
    // ignore
  }
  return null;
}

export const storageRepository = {
  async listAssets(category?: string): Promise<StorageAsset[]> {
    const allAssets = await supabaseMediaAssetRepository.getAssets();
    if (!category || category === 'all') {
      return allAssets;
    }
    return allAssets.filter(asset => asset.category.toLowerCase() === category.toLowerCase());
  },

  async getAssetUrl(assetId: string): Promise<string> {
    const asset = await supabaseMediaAssetRepository.getAssetById(assetId);
    if (!asset) {
      throw new Error(`Asset with id ${assetId} not found`);
    }
    return asset.url;
  },

  async uploadImage(fileData: any): Promise<StorageAsset> {
    let url = fileData.url;
    let fileName = fileData.fileName || 'uploaded-asset.jpg';
    let fileSize = fileData.fileSize || '1.0 MB';
    let fileType = fileData.fileType || 'image/jpeg';

    const fileObj = fileData instanceof File ? fileData : (fileData?.file instanceof File ? fileData.file : null);

    if (fileObj) {
      fileName = fileObj.name;
      fileSize = `${(fileObj.size / (1024 * 1024)).toFixed(1)} MB`;
      fileType = fileObj.type || 'image/jpeg';
      const cleanName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
      const storagePath = `uploads/${Date.now()}-${cleanName}`;

      const { error: uploadError } = await supabase.storage
        .from('leo-media')
        .upload(storagePath, fileObj, { upsert: false });

      if (uploadError) {
        throw new Error(`Storage upload failed: ${uploadError.message}`);
      }

      const { data: publicUrlData } = supabase.storage
        .from('leo-media')
        .getPublicUrl(storagePath);

      url = publicUrlData.publicUrl;
    }

    const newAssetData = {
      fileName,
      url: url || 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
      category: fileData.category || 'General',
      altText: fileData.altText || fileName,
      caption: fileData.caption || '',
      tags: fileData.tags || ['upload'],
      width: fileData.width || 1920,
      height: fileData.height || 1080,
      fileSize,
      fileType,
      visibility: fileData.visibility || 'Public',
      usedBy: fileData.usedBy || ['Media Library']
    };

    return supabaseMediaAssetRepository.createAsset(newAssetData);
  },

  async deleteImage(assetId: string): Promise<boolean> {
    const asset = await supabaseMediaAssetRepository.getAssetById(assetId);
    if (asset && asset.url) {
      const storagePath = getStoragePathFromUrl(asset.url);
      if (storagePath) {
        await supabase.storage
          .from('leo-media')
          .remove([storagePath]);
      }
    }
    return supabaseMediaAssetRepository.deleteAsset(assetId);
  },

  async replaceImage(assetId: string, newFileData: any): Promise<StorageAsset> {
    const existingAsset = await supabaseMediaAssetRepository.getAssetById(assetId);
    if (!existingAsset) {
      throw new Error(`Asset with id ${assetId} not found`);
    }

    let url = existingAsset.url;
    let fileName = existingAsset.fileName;
    let fileSize = existingAsset.fileSize;
    let fileType = existingAsset.fileType;

    const fileObj = newFileData instanceof File ? newFileData : (newFileData?.file instanceof File ? newFileData.file : null);

    if (fileObj) {
      fileName = fileObj.name;
      fileSize = `${(fileObj.size / (1024 * 1024)).toFixed(1)} MB`;
      fileType = fileObj.type || existingAsset.fileType;
      const cleanName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
      const storagePath = `uploads/${Date.now()}-${cleanName}`;

      const { error: uploadError } = await supabase.storage
        .from('leo-media')
        .upload(storagePath, fileObj, { upsert: false });

      if (uploadError) {
        throw new Error(`Storage replacement upload failed: ${uploadError.message}`);
      }

      const { data: publicUrlData } = supabase.storage
        .from('leo-media')
        .getPublicUrl(storagePath);

      const oldStoragePath = getStoragePathFromUrl(existingAsset.url);
      if (oldStoragePath) {
        await supabase.storage.from('leo-media').remove([oldStoragePath]);
      }

      url = publicUrlData.publicUrl;
    } else if (newFileData && typeof newFileData === 'object') {
      if (newFileData.url) url = newFileData.url;
      if (newFileData.fileName) fileName = newFileData.fileName;
      if (newFileData.fileSize) fileSize = newFileData.fileSize;
    } else if (typeof newFileData === 'string') {
      url = newFileData;
    }

    const updates: Partial<StorageAsset> = {
      url,
      fileName,
      fileSize,
      fileType
    };

    return supabaseMediaAssetRepository.updateAsset(assetId, updates);
  }
};

