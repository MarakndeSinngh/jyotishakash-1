import { Faculty } from '../models/faculty';
import { supabase } from '../lib/supabaseClient';

export const supabaseFacultyRepository = {
  async getAll(): Promise<Faculty[]> {
    try {
      const { data, error } = await supabase
        .from('faculty')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching faculty from Supabase:', error);
        throw error;
      }

      if (!data) return [];

      return data.map((row: any) => ({
        id: row.id,
        name: row.name,
        title: row.title,
        image: row.image,
        bio: row.description,
        languages: typeof row.languages === 'string' 
          ? row.languages.split('&').map((l: string) => l.trim()).flatMap((l: string) => l.split(',').map((x: string) => x.trim()))
          : Array.isArray(row.languages) ? row.languages : ['English', 'Hindi'],
        consultationLink: row.consultation_link || `https://leofamily.com/consult/${row.id}`,
        registrationLink: row.registration_link || `https://leofamily.com/webinar/${row.id}`,
        facebookUrl: row.facebook_url || '',
        youtubeUrl: row.youtube_url || '',
        displayOrder: row.display_order ?? 0,
        active: row.is_active ?? true,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      }));
    } catch (error) {
      console.error('Failed to get faculty from Supabase:', error);
      throw error;
    }
  },

  async getById(id: string): Promise<Faculty | null> {
    try {
      const { data, error } = await supabase
        .from('faculty')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null;
        }
        console.error(`Error fetching faculty ${id} from Supabase:`, error);
        throw error;
      }

      if (!data) return null;

      const row = data;
      return {
        id: row.id,
        name: row.name,
        title: row.title,
        image: row.image,
        bio: row.description,
        languages: typeof row.languages === 'string' 
          ? row.languages.split('&').map((l: string) => l.trim()).flatMap((l: string) => l.split(',').map((x: string) => x.trim()))
          : Array.isArray(row.languages) ? row.languages : ['English', 'Hindi'],
        consultationLink: row.consultation_link || `https://leofamily.com/consult/${row.id}`,
        registrationLink: row.registration_link || `https://leofamily.com/webinar/${row.id}`,
        facebookUrl: row.facebook_url || '',
        youtubeUrl: row.youtube_url || '',
        displayOrder: row.display_order ?? 0,
        active: row.is_active ?? true,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      };
    } catch (error) {
      console.error(`Failed to get faculty ${id} from Supabase:`, error);
      throw error;
    }
  },

  async update(id: string, updates: Partial<Faculty>): Promise<Faculty> {
    try {
      const dbPayload: any = {};
      if (updates.name !== undefined) dbPayload.name = updates.name;
      if (updates.title !== undefined) dbPayload.title = updates.title;
      if (updates.image !== undefined) dbPayload.image = updates.image;
      if (updates.bio !== undefined) dbPayload.description = updates.bio;
      if (updates.languages !== undefined) {
        dbPayload.languages = Array.isArray(updates.languages) 
          ? updates.languages.join(', ') 
          : updates.languages;
      }
      if (updates.displayOrder !== undefined) dbPayload.display_order = updates.displayOrder;
      if (updates.active !== undefined) dbPayload.is_active = updates.active;
      dbPayload.updated_at = new Date().toISOString();

      const { data, error } = await supabase
        .from('faculty')
        .update(dbPayload)
        .eq('id', id)
        .select();

      if (error) {
        console.error(`Error updating faculty ${id} in Supabase:`, error);
        throw error;
      }

      if (!data || data.length === 0) {
        throw new Error(`Failed to update faculty ${id}: Row not found or blocked by RLS policy.`);
      }

      const row = data[0];
      return {
        id: row.id,
        name: row.name,
        title: row.title,
        image: row.image,
        bio: row.description,
        languages: typeof row.languages === 'string' 
          ? row.languages.split('&').map((l: string) => l.trim()).flatMap((l: string) => l.split(',').map((x: string) => x.trim()))
          : Array.isArray(row.languages) ? row.languages : ['English', 'Hindi'],
        consultationLink: row.consultation_link || `https://leofamily.com/consult/${row.id}`,
        registrationLink: row.registration_link || `https://leofamily.com/webinar/${row.id}`,
        facebookUrl: row.facebook_url || '',
        youtubeUrl: row.youtube_url || '',
        displayOrder: row.display_order ?? 0,
        active: row.is_active ?? true,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      };
    } catch (error) {
      console.error(`Failed to update faculty ${id} in Supabase:`, error);
      throw error;
    }
  }
};
