import { MediaAsset } from '../models/mediaAsset';
import { supabase } from '../lib/supabaseClient';

const mapRowToMediaAsset = (row: any): MediaAsset => ({
  id: row.id,
  fileName: row.file_name,
  url: row.url,
  category: row.category,
  altText: row.alt_text || '',
  caption: row.caption || '',
  tags: Array.isArray(row.tags) ? row.tags : (row.tags ? [row.tags] : []),
  width: row.width ?? 0,
  height: row.height ?? 0,
  fileSize: row.file_size || '0 MB',
  fileType: row.file_type || 'image/jpeg',
  createdDate: row.created_date || new Date().toISOString(),
  lastModified: row.last_modified || new Date().toISOString(),
  usedBy: Array.isArray(row.used_by) ? row.used_by : (row.used_by ? [row.used_by] : []),
  visibility: row.visibility || 'Public'
});

const mapMediaAssetToRow = (a: Partial<MediaAsset>, isUpdate = false): any => {
  const row: any = {};
  if (a.id !== undefined && !isUpdate) row.id = a.id;
  if (a.fileName !== undefined) row.file_name = a.fileName;
  if (a.url !== undefined) row.url = a.url;
  if (a.category !== undefined) row.category = a.category;
  if (a.altText !== undefined) row.alt_text = a.altText;
  if (a.caption !== undefined) row.caption = a.caption;
  if (a.tags !== undefined) row.tags = Array.isArray(a.tags) ? a.tags : [];
  if (a.width !== undefined) row.width = Number(a.width) || 0;
  if (a.height !== undefined) row.height = Number(a.height) || 0;
  if (a.fileSize !== undefined) row.file_size = a.fileSize;
  if (a.fileType !== undefined) row.file_type = a.fileType;
  if (a.createdDate !== undefined && !isUpdate) row.created_date = a.createdDate;
  if (a.visibility !== undefined) row.visibility = a.visibility;
  if (a.usedBy !== undefined) row.used_by = Array.isArray(a.usedBy) ? a.usedBy : [];
  row.last_modified = new Date().toISOString();
  return row;
};

export const supabaseMediaAssetRepository = {
  async getAssets(): Promise<MediaAsset[]> {
    try {
      const { data, error } = await supabase
        .from('media_assets')
        .select('*')
        .order('created_date', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }
      return (data || []).map(mapRowToMediaAsset);
    } catch (error) {
      console.error('Failed to get media assets from Supabase:', error);
      throw error;
    }
  },

  async getAll(): Promise<MediaAsset[]> {
    return this.getAssets();
  },

  async getAssetById(id: string): Promise<MediaAsset | null> {
    try {
      const { data, error } = await supabase
        .from('media_assets')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        throw new Error(error.message);
      }
      return data ? mapRowToMediaAsset(data) : null;
    } catch (error) {
      console.error(`Failed to get media asset ${id} from Supabase:`, error);
      throw error;
    }
  },

  async createAsset(asset: Omit<MediaAsset, 'id' | 'createdDate' | 'lastModified'> & { id?: string }): Promise<MediaAsset> {
    try {
      const newId = asset.id || `asset-${Date.now()}`;
      const now = new Date().toISOString();
      const payload = {
        ...mapMediaAssetToRow(asset, false),
        id: newId,
        created_date: now,
        last_modified: now
      };

      const { data, error } = await supabase
        .from('media_assets')
        .insert(payload)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return mapRowToMediaAsset(data);
    } catch (error) {
      console.error('Failed to create media asset in Supabase:', error);
      throw error;
    }
  },

  async updateAsset(id: string, updates: Partial<MediaAsset>): Promise<MediaAsset> {
    try {
      const payload = mapMediaAssetToRow(updates, true);

      const { data, error } = await supabase
        .from('media_assets')
        .update(payload)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return mapRowToMediaAsset(data);
    } catch (error) {
      console.error(`Failed to update media asset ${id} in Supabase:`, error);
      throw error;
    }
  },

  async deleteAsset(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('media_assets')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }
      return true;
    } catch (error) {
      console.error(`Failed to delete media asset ${id} from Supabase:`, error);
      throw error;
    }
  },

  async upsertMany(assets: MediaAsset[]): Promise<void> {
    try {
      const rows = assets.map(a => ({
        id: a.id,
        file_name: a.fileName,
        url: a.url,
        category: a.category,
        alt_text: a.altText || '',
        caption: a.caption || '',
        tags: Array.isArray(a.tags) ? a.tags : [],
        width: a.width ?? 0,
        height: a.height ?? 0,
        file_size: a.fileSize || '0 MB',
        file_type: a.fileType || 'image/jpeg',
        created_date: a.createdDate || new Date().toISOString(),
        last_modified: a.lastModified || new Date().toISOString(),
        used_by: Array.isArray(a.usedBy) ? a.usedBy : [],
        visibility: a.visibility || 'Public'
      }));

      const { error } = await supabase
        .from('media_assets')
        .upsert(rows, { onConflict: 'id' });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Failed to upsert media assets in Supabase:', error);
      throw error;
    }
  }
};
