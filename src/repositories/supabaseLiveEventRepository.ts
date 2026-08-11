import { LiveEvent } from '../models/liveEvent';
import { supabase } from '../lib/supabaseClient';

const mapRowToLiveEvent = (row: any): LiveEvent => ({
  id: row.id,
  mentorId: row.mentor_id,
  title: row.title,
  date: row.date,
  time: row.time,
  language: row.language,
  seats: row.seats ?? 0,
  registrationLink: row.registration_link || '',
  banner: row.banner || '',
  status: row.status || 'upcoming',
  featured: row.featured ?? false,
  createdAt: row.created_at,
  updatedAt: row.updated_at
});

export const supabaseLiveEventRepository = {
  async getAll(): Promise<LiveEvent[]> {
    try {
      const { data, error } = await supabase
        .from('live_events')
        .select('*')
        .order('date', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching live events from Supabase:', error);
        throw error;
      }

      if (!data) return [];
      return data.map(mapRowToLiveEvent);
    } catch (error) {
      console.error('Failed to get live events from Supabase:', error);
      throw error;
    }
  },

  async getById(id: string): Promise<LiveEvent | null> {
    try {
      const { data, error } = await supabase
        .from('live_events')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null;
        }
        console.error(`Error fetching live event ${id} from Supabase:`, error);
        throw error;
      }

      return data ? mapRowToLiveEvent(data) : null;
    } catch (error) {
      console.error(`Failed to get live event ${id} from Supabase:`, error);
      throw error;
    }
  },

  async getByMentor(mentorId: string): Promise<LiveEvent[]> {
    try {
      const { data, error } = await supabase
        .from('live_events')
        .select('*')
        .eq('mentor_id', mentorId)
        .order('date', { ascending: true });

      if (error) {
        console.error(`Error fetching live events for mentor ${mentorId} from Supabase:`, error);
        throw error;
      }

      if (!data) return [];
      return data.map(mapRowToLiveEvent);
    } catch (error) {
      console.error(`Failed to get live events for mentor ${mentorId}:`, error);
      throw error;
    }
  },

  async getUpcoming(): Promise<LiveEvent[]> {
    try {
      const { data, error } = await supabase
        .from('live_events')
        .select('*')
        .eq('status', 'upcoming')
        .order('date', { ascending: true });

      if (error) {
        console.error('Error fetching upcoming live events from Supabase:', error);
        throw error;
      }

      if (!data) return [];
      return data.map(mapRowToLiveEvent);
    } catch (error) {
      console.error('Failed to get upcoming live events:', error);
      throw error;
    }
  },

  async getLive(): Promise<LiveEvent[]> {
    try {
      const { data, error } = await supabase
        .from('live_events')
        .select('*')
        .eq('status', 'live');

      if (error) {
        console.error('Error fetching live events from Supabase:', error);
        throw error;
      }

      if (!data) return [];
      return data.map(mapRowToLiveEvent);
    } catch (error) {
      console.error('Failed to get live events:', error);
      throw error;
    }
  },

  async getFeatured(): Promise<LiveEvent[]> {
    try {
      const { data, error } = await supabase
        .from('live_events')
        .select('*')
        .eq('featured', true)
        .order('date', { ascending: true });

      if (error) {
        console.error('Error fetching featured live events from Supabase:', error);
        throw error;
      }

      if (!data) return [];
      return data.map(mapRowToLiveEvent);
    } catch (error) {
      console.error('Failed to get featured live events:', error);
      throw error;
    }
  },

  async create(event: LiveEvent): Promise<LiveEvent> {
    try {
      const id = event.id || `web-${Date.now()}`;
      const dbPayload = {
        id,
        mentor_id: event.mentorId,
        title: event.title,
        date: event.date,
        time: event.time,
        language: event.language,
        seats: event.seats ?? 100,
        registration_link: event.registrationLink,
        banner: event.banner,
        status: event.status || 'upcoming',
        featured: event.featured ?? false,
        created_at: event.createdAt || new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('live_events')
        .insert([dbPayload])
        .select();

      if (error) {
        console.error('Error creating live event in Supabase:', error);
        throw error;
      }

      if (!data || data.length === 0) {
        throw new Error('Failed to create live event record.');
      }

      return mapRowToLiveEvent(data[0]);
    } catch (error) {
      console.error('Failed to create live event in Supabase:', error);
      throw error;
    }
  },

  async update(id: string, updates: Partial<LiveEvent>): Promise<LiveEvent> {
    try {
      const dbPayload: any = {};
      if (updates.mentorId !== undefined) dbPayload.mentor_id = updates.mentorId;
      if (updates.title !== undefined) dbPayload.title = updates.title;
      if (updates.date !== undefined) dbPayload.date = updates.date;
      if (updates.time !== undefined) dbPayload.time = updates.time;
      if (updates.language !== undefined) dbPayload.language = updates.language;
      if (updates.seats !== undefined) dbPayload.seats = updates.seats;
      if (updates.registrationLink !== undefined) dbPayload.registration_link = updates.registrationLink;
      if (updates.banner !== undefined) dbPayload.banner = updates.banner;
      if (updates.status !== undefined) dbPayload.status = updates.status;
      if (updates.featured !== undefined) dbPayload.featured = updates.featured;
      dbPayload.updated_at = new Date().toISOString();

      const { data, error } = await supabase
        .from('live_events')
        .update(dbPayload)
        .eq('id', id)
        .select();

      if (error) {
        console.error(`Error updating live event ${id} in Supabase:`, error);
        throw error;
      }

      if (!data || data.length === 0) {
        throw new Error(`Failed to update live event ${id}: Row not found or blocked by RLS policy.`);
      }

      return mapRowToLiveEvent(data[0]);
    } catch (error) {
      console.error(`Failed to update live event ${id} in Supabase:`, error);
      throw error;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('live_events')
        .delete()
        .eq('id', id);

      if (error) {
        console.error(`Error deleting live event ${id} from Supabase:`, error);
        throw error;
      }
      return true;
    } catch (error) {
      console.error(`Failed to delete live event ${id} from Supabase:`, error);
      throw error;
    }
  },

  async upsertMany(events: LiveEvent[]): Promise<LiveEvent[]> {
    try {
      if (!events || events.length === 0) return [];

      const dbPayloads = events.map(event => ({
        id: event.id || `web-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        mentor_id: event.mentorId,
        title: event.title,
        date: event.date,
        time: event.time,
        language: event.language,
        seats: event.seats ?? 100,
        registration_link: event.registrationLink,
        banner: event.banner,
        status: event.status || 'upcoming',
        featured: event.featured ?? false,
        created_at: event.createdAt || new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));

      const { data, error } = await supabase
        .from('live_events')
        .upsert(dbPayloads, { onConflict: 'id' })
        .select();

      if (error) {
        console.error('Error upserting live events in Supabase:', error);
        throw error;
      }

      if (!data) return [];
      return data.map(mapRowToLiveEvent);
    } catch (error) {
      console.error('Failed to upsert live events in Supabase:', error);
      throw error;
    }
  }
};
