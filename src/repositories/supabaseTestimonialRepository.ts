import { supabase } from '../lib/supabaseClient';
import { Testimonial } from '../types/cms';

export function mapRowToTestimonial(row: any): Testimonial {
  return {
    id: row.id,
    testimonialCode: row.testimonial_code,
    name: row.name,
    role: row.role || undefined,
    course: row.course || undefined,
    feedback: row.feedback,
    rating: row.rating,
    image: row.image || undefined,
    published: row.published ?? false,
    displayOrder: row.display_order ?? 0,
    testimonialDate: row.testimonial_date || undefined,
    createdAt: row.created_at || undefined,
    updatedAt: row.updated_at || undefined
  };
}

export function mapTestimonialToRow(t: Partial<Testimonial>): any {
  const row: any = {};
  if (t.testimonialCode !== undefined) row.testimonial_code = t.testimonialCode;
  if (t.name !== undefined) row.name = t.name;
  if (t.role !== undefined) row.role = t.role || null;
  if (t.course !== undefined) row.course = t.course || null;
  if (t.feedback !== undefined) row.feedback = t.feedback;
  if (t.rating !== undefined) {
    const r = Number(t.rating);
    row.rating = isNaN(r) ? 5 : Math.max(1, Math.min(5, r));
  }
  if (t.image !== undefined) row.image = t.image || null;
  if (t.published !== undefined) row.published = Boolean(t.published);
  if (t.displayOrder !== undefined) row.display_order = Number(t.displayOrder) || 0;
  if (t.testimonialDate !== undefined) row.testimonial_date = t.testimonialDate || null;
  return row;
}

export const supabaseTestimonialRepository = {
  async getAll(): Promise<Testimonial[]> {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('display_order', { ascending: true })
        .order('testimonial_date', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching all testimonials from Supabase:', error.message);
        return [];
      }
      return (data || []).map(mapRowToTestimonial);
    } catch (err) {
      console.error('Exception fetching all testimonials:', err);
      return [];
    }
  },

  async getPublished(): Promise<Testimonial[]> {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('published', true)
        .order('display_order', { ascending: true })
        .order('testimonial_date', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching published testimonials from Supabase:', error.message);
        return [];
      }
      return (data || []).map(mapRowToTestimonial);
    } catch (err) {
      console.error('Exception fetching published testimonials:', err);
      return [];
    }
  },

  async getById(id: string): Promise<Testimonial | null> {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching testimonial by id:', error.message);
        return null;
      }
      return data ? mapRowToTestimonial(data) : null;
    } catch (err) {
      console.error('Exception fetching testimonial by id:', err);
      return null;
    }
  },

  async getByCode(testimonialCode: string): Promise<Testimonial | null> {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('testimonial_code', testimonialCode)
        .maybeSingle();

      if (error) {
        console.error('Error fetching testimonial by code:', error.message);
        return null;
      }
      return data ? mapRowToTestimonial(data) : null;
    } catch (err) {
      console.error('Exception fetching testimonial by code:', err);
      return null;
    }
  },

  async create(testimonial: Partial<Testimonial>): Promise<Testimonial | null> {
    try {
      const row = mapTestimonialToRow(testimonial);
      if (!row.testimonial_code) {
        row.testimonial_code = `TEST-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      }
      if (!row.rating) row.rating = 5;

      const { data, error } = await supabase
        .from('testimonials')
        .insert([row])
        .select()
        .single();

      if (error) {
        console.error('Error creating testimonial in Supabase:', error.message);
        throw error;
      }
      return data ? mapRowToTestimonial(data) : null;
    } catch (err) {
      console.error('Exception creating testimonial:', err);
      throw err;
    }
  },

  async update(id: string, updates: Partial<Testimonial>): Promise<Testimonial | null> {
    try {
      const row = mapTestimonialToRow(updates);
      const { data, error } = await supabase
        .from('testimonials')
        .update(row)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating testimonial in Supabase:', error.message);
        throw error;
      }
      return data ? mapRowToTestimonial(data) : null;
    } catch (err) {
      console.error('Exception updating testimonial:', err);
      throw err;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting testimonial from Supabase:', error.message);
        throw error;
      }
      return true;
    } catch (err) {
      console.error('Exception deleting testimonial:', err);
      throw err;
    }
  },

  async upsertMany(testimonials: Partial<Testimonial>[]): Promise<Testimonial[]> {
    try {
      const rows = testimonials.map(t => {
        const row = mapTestimonialToRow(t);
        if (!row.testimonial_code) {
          row.testimonial_code = `TEST-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        }
        if (!row.rating) row.rating = 5;
        return row;
      });

      const { data, error } = await supabase
        .from('testimonials')
        .upsert(rows, { onConflict: 'testimonial_code' })
        .select();

      if (error) {
        console.error('Error upserting testimonials in Supabase:', error.message);
        throw error;
      }
      return (data || []).map(mapRowToTestimonial);
    } catch (err) {
      console.error('Exception upserting testimonials:', err);
      throw err;
    }
  }
};
