import { Program } from '../models/program';
import { supabase } from '../lib/supabaseClient';

const mapRowToProgram = (row: any): Program => ({
  id: row.id,
  mentorId: row.mentor_id,
  title: row.title,
  subtitle: row.subtitle || '',
  description: row.description || '',
  image: row.image || '',
  duration: row.duration || '',
  price: Number(row.price) || 0,
  discountPrice: row.discount_price !== null && row.discount_price !== undefined ? Number(row.discount_price) : undefined,
  featured: row.featured ?? false,
  visible: row.visible ?? true,
  order: row.order ?? 0,
  createdAt: row.created_at,
  updatedAt: row.updated_at
});

const mapProgramToRow = (p: Partial<Program>, isUpdate = false): any => {
  const row: any = {};
  if (p.id !== undefined && !isUpdate) row.id = p.id;
  if (p.mentorId !== undefined) row.mentor_id = p.mentorId;
  if (p.title !== undefined) row.title = p.title;
  if (p.subtitle !== undefined) row.subtitle = p.subtitle;
  if (p.description !== undefined) row.description = p.description;
  if (p.image !== undefined) row.image = p.image;
  if (p.duration !== undefined) row.duration = p.duration;
  if (p.price !== undefined) row.price = Number(p.price);
  if (p.discountPrice !== undefined) {
    row.discount_price = p.discountPrice !== null && p.discountPrice !== undefined ? Number(p.discountPrice) : null;
  }
  if (p.featured !== undefined) row.featured = Boolean(p.featured);
  if (p.visible !== undefined) row.visible = Boolean(p.visible);
  if (p.order !== undefined) row.order = Number(p.order) || 0;
  if (isUpdate) {
    row.updated_at = new Date().toISOString();
  }
  return row;
};

export const supabaseProgramRepository = {
  async getAll(): Promise<Program[]> {
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching programs from Supabase:', error);
        throw error;
      }

      if (!data) return [];
      return data.map(mapRowToProgram);
    } catch (error) {
      console.error('Failed to get programs from Supabase:', error);
      throw error;
    }
  },

  async getById(id: string): Promise<Program | null> {
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error(`Error fetching program ${id} from Supabase:`, error);
        throw error;
      }

      return data ? mapRowToProgram(data) : null;
    } catch (error) {
      console.error(`Failed to get program ${id} from Supabase:`, error);
      throw error;
    }
  },

  async getByMentor(mentorId: string): Promise<Program[]> {
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .eq('mentor_id', mentorId)
        .order('order', { ascending: true });

      if (error) {
        console.error(`Error fetching programs for mentor ${mentorId}:`, error);
        throw error;
      }

      if (!data) return [];
      return data.map(mapRowToProgram);
    } catch (error) {
      console.error(`Failed to get programs for mentor ${mentorId}:`, error);
      throw error;
    }
  },

  async getFeatured(): Promise<Program[]> {
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .eq('featured', true)
        .eq('visible', true)
        .order('order', { ascending: true });

      if (error) {
        console.error('Error fetching featured programs:', error);
        throw error;
      }

      if (!data) return [];
      return data.map(mapRowToProgram);
    } catch (error) {
      console.error('Failed to get featured programs:', error);
      throw error;
    }
  },

  async getVisible(): Promise<Program[]> {
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .eq('visible', true)
        .order('order', { ascending: true });

      if (error) {
        console.error('Error fetching visible programs:', error);
        throw error;
      }

      if (!data) return [];
      return data.map(mapRowToProgram);
    } catch (error) {
      console.error('Failed to get visible programs:', error);
      throw error;
    }
  },

  async create(program: Program): Promise<Program> {
    try {
      const row = {
        id: program.id || `prog-${Date.now()}`,
        ...mapProgramToRow(program, false),
        created_at: program.createdAt || new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('programs')
        .insert([row])
        .select()
        .single();

      if (error) {
        console.error('Error creating program in Supabase:', error);
        throw error;
      }

      return mapRowToProgram(data);
    } catch (error) {
      console.error('Failed to create program:', error);
      throw error;
    }
  },

  async update(id: string, updates: Partial<Program>): Promise<Program> {
    try {
      const row = mapProgramToRow(updates, true);

      const { data, error } = await supabase
        .from('programs')
        .update(row)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error(`Error updating program ${id}:`, error);
        throw error;
      }

      if (!data) {
        throw new Error(`Program with id ${id} not found.`);
      }

      return mapRowToProgram(data);
    } catch (error) {
      console.error(`Failed to update program ${id}:`, error);
      throw error;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('programs')
        .delete()
        .eq('id', id);

      if (error) {
        console.error(`Error deleting program ${id}:`, error);
        throw error;
      }

      return true;
    } catch (error) {
      console.error(`Failed to delete program ${id}:`, error);
      throw error;
    }
  },

  async upsertMany(programs: Program[]): Promise<Program[]> {
    try {
      const rows = programs.map(p => ({
        id: p.id,
        ...mapProgramToRow(p, false),
        created_at: p.createdAt || new Date().toISOString(),
        updated_at: p.updatedAt || new Date().toISOString()
      }));

      const { data, error } = await supabase
        .from('programs')
        .upsert(rows, { onConflict: 'id' })
        .select();

      if (error) {
        console.error('Error upserting programs:', error);
        throw error;
      }

      if (!data) return [];
      return data.map(mapRowToProgram);
    } catch (error) {
      console.error('Failed to upsert programs:', error);
      throw error;
    }
  }
};
