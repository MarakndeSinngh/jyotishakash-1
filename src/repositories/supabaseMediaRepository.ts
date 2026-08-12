import { Media } from '../models/media';
import { supabase } from '../lib/supabaseClient';

const mapRowToMedia = (row: any): Media => ({
  id: row.id,
  mentorId: row.mentor_id,
  title: row.title || undefined,
  description: row.description || undefined,
  youtubeUrl: row.youtube_url,
  youtubeVideoId: row.youtube_video_id,
  thumbnail: row.thumbnail,
  category: row.category,
  featured: row.featured ?? false,
  visible: row.visible ?? true,
  order: row.order ?? 0,
  speaker: row.speaker || undefined,
  publishedDate: row.published_date || undefined,
  viewCount: row.view_count !== null && row.view_count !== undefined ? Number(row.view_count) : undefined,
  createdAt: row.created_at || undefined,
  updatedAt: row.updated_at || undefined
});

const mapMediaToRow = (m: Partial<Media>, isUpdate = false): any => {
  const row: any = {};
  if (m.id !== undefined && !isUpdate) row.id = m.id;
  if (m.mentorId !== undefined) row.mentor_id = m.mentorId;
  if (m.title !== undefined) row.title = m.title || null;
  if (m.description !== undefined) row.description = m.description || null;
  if (m.youtubeUrl !== undefined) row.youtube_url = m.youtubeUrl;
  if (m.youtubeVideoId !== undefined) row.youtube_video_id = m.youtubeVideoId;
  if (m.thumbnail !== undefined) row.thumbnail = m.thumbnail;
  if (m.category !== undefined) row.category = m.category;
  if (m.featured !== undefined) row.featured = Boolean(m.featured);
  if (m.visible !== undefined) row.visible = Boolean(m.visible);
  if (m.order !== undefined) row.order = Number(m.order) || 0;
  if (m.speaker !== undefined) row.speaker = m.speaker || null;
  if (m.publishedDate !== undefined) row.published_date = m.publishedDate || null;
  if (m.viewCount !== undefined) row.view_count = m.viewCount !== null && m.viewCount !== undefined ? Number(m.viewCount) : null;
  if (isUpdate) {
    row.updated_at = new Date().toISOString();
  }
  return row;
};

export const supabaseMediaRepository = {
  async getAll(): Promise<Media[]> {
    try {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }
      return (data || []).map(mapRowToMedia);
    } catch (error) {
      console.error('Failed to get media from Supabase:', error);
      throw error;
    }
  },

  async getById(id: string): Promise<Media | null> {
    try {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        throw new Error(error.message);
      }
      return data ? mapRowToMedia(data) : null;
    } catch (error) {
      console.error(`Failed to get media ${id} from Supabase:`, error);
      throw error;
    }
  },

  async getByMentor(mentorId: string): Promise<Media[]> {
    try {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .eq('mentor_id', mentorId)
        .order('order', { ascending: true });

      if (error) {
        throw new Error(error.message);
      }
      return (data || []).map(mapRowToMedia);
    } catch (error) {
      console.error(`Failed to get media for mentor ${mentorId}:`, error);
      throw error;
    }
  },

  async getFeatured(): Promise<Media[]> {
    try {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .eq('featured', true)
        .eq('visible', true)
        .order('order', { ascending: true });

      if (error) {
        throw new Error(error.message);
      }
      return (data || []).map(mapRowToMedia);
    } catch (error) {
      console.error('Failed to get featured media from Supabase:', error);
      throw error;
    }
  },

  async getByCategory(category: string): Promise<Media[]> {
    try {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .eq('category', category)
        .order('order', { ascending: true });

      if (error) {
        throw new Error(error.message);
      }
      return (data || []).map(mapRowToMedia);
    } catch (error) {
      console.error(`Failed to get media for category ${category}:`, error);
      throw error;
    }
  },

  async create(media: Omit<Media, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): Promise<Media> {
    try {
      const newId = media.id || `media-${Date.now()}`;
      const payload = {
        ...mapMediaToRow(media, false),
        id: newId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('media')
        .insert(payload)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return mapRowToMedia(data);
    } catch (error) {
      console.error('Failed to create media in Supabase:', error);
      throw error;
    }
  },

  async update(id: string, updates: Partial<Media>): Promise<Media> {
    try {
      const payload = mapMediaToRow(updates, true);

      const { data, error } = await supabase
        .from('media')
        .update(payload)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return mapRowToMedia(data);
    } catch (error) {
      console.error(`Failed to update media ${id} in Supabase:`, error);
      throw error;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('media')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }
      return true;
    } catch (error) {
      console.error(`Failed to delete media ${id} from Supabase:`, error);
      throw error;
    }
  },

  async upsertMany(mediaList: Media[]): Promise<void> {
    try {
      const rows = mediaList.map(m => ({
        id: m.id,
        mentor_id: m.mentorId,
        title: m.title || null,
        description: m.description || null,
        youtube_url: m.youtubeUrl,
        youtube_video_id: m.youtubeVideoId,
        thumbnail: m.thumbnail,
        category: m.category,
        featured: m.featured ?? false,
        visible: m.visible ?? true,
        order: m.order ?? 0,
        speaker: m.speaker || null,
        published_date: m.publishedDate || null,
        view_count: m.viewCount ?? 0,
        created_at: m.createdAt || new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));

      const { error } = await supabase
        .from('media')
        .upsert(rows, { onConflict: 'id' });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Failed to upsert media list in Supabase:', error);
      throw error;
    }
  }
};
