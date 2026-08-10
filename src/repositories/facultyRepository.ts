import { Faculty } from '../models/faculty';
import { supabase } from '../lib/supabaseClient';
import { supabaseFacultyRepository } from './supabaseFacultyRepository';

export const facultyRepository = {
  async getAll(): Promise<Faculty[]> {
    try {
      const { data, error } = await supabase
        .from('faculty')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching public faculty from Supabase:', error);
        return [];
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
      console.error('Failed to get public faculty from Supabase:', error);
      return [];
    }
  },

  async getById(id: string): Promise<Faculty | null> {
    try {
      const { data, error } = await supabase
        .from('faculty')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null;
        }
        console.error(`Error fetching public faculty ${id} from Supabase:`, error);
        return null;
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
      console.error(`Failed to get public faculty ${id} from Supabase:`, error);
      return null;
    }
  },

  async getFounder(): Promise<Faculty | null> {
    try {
      const all = await this.getAll();
      return all.find(f => f.id === 'raajeev' || f.title.toLowerCase().includes('founder')) || all[0] || null;
    } catch (error) {
      console.error('Failed to get founder from Supabase:', error);
      return null;
    }
  },

  async create(faculty: Faculty): Promise<Faculty> {
    return supabaseFacultyRepository.create(faculty);
  },

  async update(id: string, updates: Partial<Faculty>): Promise<Faculty> {
    return supabaseFacultyRepository.update(id, updates);
  },

  async delete(id: string): Promise<boolean> {
    await supabaseFacultyRepository.delete(id);
    return true;
  }
};
