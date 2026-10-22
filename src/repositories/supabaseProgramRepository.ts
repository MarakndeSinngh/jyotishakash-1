import { Program } from '../models/program';
import { supabase } from '../lib/supabaseClient';

export const NAVRATRI_NUMEROLOGY_BUNDLE_PROGRAM: Program = {
  id: 'prog-navratri-numerology',
  mentorId: 'raajeev',
  title: 'Super Advanced Vedic Numerology',
  subtitle: 'An advanced learning journey through Vedic Numerology concepts and practical analysis by Raajeev Singh Chauhann.',
  description: 'Master complete Vedic Numerology including Psychic & Destiny numbers, Master numbers, the complete 81 combinations, authentic Vedic Grid, profession & relationship analysis, house numbers, signature science, and remedies in live sessions with Raajeev Singh Chauhann.',
  image: '/assets/teachers/Raajeev.webp',
  duration: 'Live Classes (2/Week)',
  price: 194,
  discountPrice: undefined,
  featured: true,
  visible: true,
  order: 0,
  category: 'numerology',
  paymentUrl: 'https://rzp.io/rzp/Pyh2zDaN',
  approximateValue: undefined,
  schedule: '11:00 AM–1:00 PM (Commencing 16 November)',
  startDate: '16 November',
  campaignActive: true
};

const LOCAL_OVERRIDE_KEY = 'leo_local_program_overrides';

function sanitizeSingleCourseOverride(p: Partial<Program>): Partial<Program> {
  const cleaned = { ...p };
  if (
    cleaned.title &&
    (cleaned.title.includes('Mobile Numerology') || cleaned.title.includes('Bundle'))
  ) {
    cleaned.title = NAVRATRI_NUMEROLOGY_BUNDLE_PROGRAM.title;
  }
  if (
    cleaned.subtitle &&
    (cleaned.subtitle.includes('Two advanced courses') || cleaned.subtitle.includes('Mobile Numerology'))
  ) {
    cleaned.subtitle = NAVRATRI_NUMEROLOGY_BUNDLE_PROGRAM.subtitle;
  }
  if (
    cleaned.description &&
    (cleaned.description.includes('Mobile Numerology') || cleaned.description.includes('bundle'))
  ) {
    cleaned.description = NAVRATRI_NUMEROLOGY_BUNDLE_PROGRAM.description;
  }
  if (cleaned.price === 995) {
    cleaned.price = NAVRATRI_NUMEROLOGY_BUNDLE_PROGRAM.price;
  }
  if (cleaned.discountPrice === 24000) {
    cleaned.discountPrice = undefined;
  }
  if (cleaned.approximateValue === 24000) {
    cleaned.approximateValue = undefined;
  }
  if (!cleaned.paymentUrl || cleaned.paymentUrl === 'https://rzp.io/rzp/znXO15N') {
    cleaned.paymentUrl = NAVRATRI_NUMEROLOGY_BUNDLE_PROGRAM.paymentUrl;
  }
  return cleaned;
}

function getLocalOverrides(): Record<string, Partial<Program>> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(LOCAL_OVERRIDE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLocalOverride(id: string, updates: Partial<Program>) {
  if (typeof window === 'undefined') return;
  try {
    const overrides = getLocalOverrides();
    overrides[id] = { ...(overrides[id] || {}), ...updates };
    localStorage.setItem(LOCAL_OVERRIDE_KEY, JSON.stringify(overrides));
  } catch (e) {
    console.warn('Failed to save local program override:', e);
  }
}

const mapRowToProgram = (row: any): Program => {
  const rawOverrides = getLocalOverrides()[row.id] || {};
  const overrides = row.id === 'prog-navratri-numerology' ? sanitizeSingleCourseOverride(rawOverrides) : rawOverrides;
  const isSpecialVedicOffer = row.id === 'prog-navratri-numerology';

  const mapped: Program = {
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
    category: row.category || overrides.category || (isSpecialVedicOffer ? 'numerology' : undefined),
    paymentUrl: row.payment_url || overrides.paymentUrl || (isSpecialVedicOffer ? 'https://rzp.io/rzp/Pyh2zDaN' : undefined),
    approximateValue: row.approximate_value ? Number(row.approximate_value) : overrides.approximateValue,
    schedule: row.schedule || overrides.schedule || (isSpecialVedicOffer ? '11:00 AM–1:00 PM (Commencing 16 November)' : undefined),
    startDate: row.start_date || overrides.startDate || (isSpecialVedicOffer ? '16 November' : undefined),
    campaignActive: row.campaign_active !== undefined ? Boolean(row.campaign_active) : (overrides.campaignActive ?? (isSpecialVedicOffer ? true : undefined)),
    campaignEndDate: row.campaign_end_date || overrides.campaignEndDate || undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };

  if (isSpecialVedicOffer) {
    return {
      ...mapped,
      ...sanitizeSingleCourseOverride(mapped),
      title: NAVRATRI_NUMEROLOGY_BUNDLE_PROGRAM.title,
      price: NAVRATRI_NUMEROLOGY_BUNDLE_PROGRAM.price,
      discountPrice: undefined,
      approximateValue: undefined,
      paymentUrl: NAVRATRI_NUMEROLOGY_BUNDLE_PROGRAM.paymentUrl,
    };
  }

  return mapped;
};

const mapProgramToRow = (p: Partial<Program>, isUpdate = false, includeExtended = false): any => {
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

  if (includeExtended) {
    if (p.category !== undefined) row.category = p.category;
    if (p.paymentUrl !== undefined) row.payment_url = p.paymentUrl;
    if (p.approximateValue !== undefined) row.approximate_value = p.approximateValue;
    if (p.schedule !== undefined) row.schedule = p.schedule;
    if (p.startDate !== undefined) row.start_date = p.startDate;
    if (p.campaignActive !== undefined) row.campaign_active = p.campaignActive;
    if (p.campaignEndDate !== undefined) row.campaign_end_date = p.campaignEndDate;
  }

  if (isUpdate) {
    row.updated_at = new Date().toISOString();
  }
  return row;
};

function ensureNavratriBundle(list: Program[]): Program[] {
  const rawOverrides = getLocalOverrides()['prog-navratri-numerology'] || {};
  const overrides = sanitizeSingleCourseOverride(rawOverrides);
  const courseOffer: Program = {
    ...NAVRATRI_NUMEROLOGY_BUNDLE_PROGRAM,
    ...overrides,
    title: NAVRATRI_NUMEROLOGY_BUNDLE_PROGRAM.title,
    price: NAVRATRI_NUMEROLOGY_BUNDLE_PROGRAM.price,
    discountPrice: undefined,
    approximateValue: undefined,
    paymentUrl: NAVRATRI_NUMEROLOGY_BUNDLE_PROGRAM.paymentUrl,
  };

  const existingIdx = list.findIndex(p => p.id === 'prog-navratri-numerology');
  if (existingIdx >= 0) {
    const updated = [...list];
    const sanitizedExisting = sanitizeSingleCourseOverride(updated[existingIdx]);
    updated[existingIdx] = {
      ...courseOffer,
      ...sanitizedExisting,
      title: NAVRATRI_NUMEROLOGY_BUNDLE_PROGRAM.title,
      price: NAVRATRI_NUMEROLOGY_BUNDLE_PROGRAM.price,
      discountPrice: undefined,
      approximateValue: undefined,
      paymentUrl: NAVRATRI_NUMEROLOGY_BUNDLE_PROGRAM.paymentUrl,
    };
    return updated.sort((a, b) => a.order - b.order);
  }

  return [courseOffer, ...list].sort((a, b) => a.order - b.order);
}

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
        return ensureNavratriBundle([]);
      }

      if (!data) return ensureNavratriBundle([]);
      return ensureNavratriBundle(data.map(mapRowToProgram));
    } catch (error) {
      console.error('Failed to get programs from Supabase:', error);
      return ensureNavratriBundle([]);
    }
  },

  async getById(id: string): Promise<Program | null> {
    if (id === 'prog-navratri-numerology') {
      try {
        const { data, error } = await supabase
          .from('programs')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (!error && data) {
          return mapRowToProgram(data);
        }
      } catch (e) {
        console.warn('Supabase fetch for navratri bundle failed, using default:', e);
      }
      const overrides = getLocalOverrides()['prog-navratri-numerology'] || {};
      return { ...NAVRATRI_NUMEROLOGY_BUNDLE_PROGRAM, ...overrides };
    }

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

      const list = data ? data.map(mapRowToProgram) : [];
      if (mentorId === 'raajeev') {
        const withBundle = ensureNavratriBundle(list);
        return withBundle.filter(p => p.mentorId === 'raajeev');
      }
      return list;
    } catch (error) {
      console.error(`Failed to get programs for mentor ${mentorId}:`, error);
      if (mentorId === 'raajeev') {
        return ensureNavratriBundle([]).filter(p => p.mentorId === 'raajeev');
      }
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

      const list = data ? data.map(mapRowToProgram) : [];
      const withBundle = ensureNavratriBundle(list);
      return withBundle.filter(p => p.featured && p.visible !== false);
    } catch (error) {
      console.error('Failed to get featured programs:', error);
      const all = ensureNavratriBundle([]);
      return all.filter(p => p.featured && p.visible !== false);
    }
  },

  async getVisible(): Promise<Program[]> {
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .eq('visible', true)
        .order('order', { ascending: true });

      const list = data ? data.map(mapRowToProgram) : [];
      const withBundle = ensureNavratriBundle(list);
      return withBundle.filter(p => p.visible !== false);
    } catch (error) {
      console.error('Failed to get visible programs:', error);
      const all = ensureNavratriBundle([]);
      return all.filter(p => p.visible !== false);
    }
  },

  async create(program: Program): Promise<Program> {
    saveLocalOverride(program.id, program);

    // Try first with extended columns; fall back to base columns if columns do not exist yet in DB
    try {
      const rowExtended = {
        id: program.id || `prog-${Date.now()}`,
        ...mapProgramToRow(program, false, true),
        created_at: program.createdAt || new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('programs')
        .insert([rowExtended])
        .select()
        .single();

      if (!error && data) {
        return mapRowToProgram(data);
      }

      if (error && (error.code === '42703' || error.message?.includes('column'))) {
        console.warn('[ProgramRepo] Extended columns missing in Supabase, inserting base columns:', error.message);
        const rowBase = {
          id: program.id || `prog-${Date.now()}`,
          ...mapProgramToRow(program, false, false),
          created_at: program.createdAt || new Date().toISOString()
        };
        const resBase = await supabase.from('programs').insert([rowBase]).select().single();
        if (resBase.data) return { ...program, ...mapRowToProgram(resBase.data) };
      }
      
      console.warn('Creating program in Supabase had error, using local memory state:', error);
      return program;
    } catch (err) {
      console.warn('Exception during create program in Supabase:', err);
      return program;
    }
  },

  async update(id: string, updates: Partial<Program>): Promise<Program> {
    saveLocalOverride(id, updates);

    try {
      // First try with extended columns
      const rowExtended = mapProgramToRow(updates, true, true);
      const { data, error } = await supabase
        .from('programs')
        .update(rowExtended)
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        return mapRowToProgram(data);
      }

      if (error && (error.code === '42703' || error.message?.includes('column'))) {
        console.warn('[ProgramRepo] Extended columns missing in Supabase, updating base columns:', error.message);
        const rowBase = mapProgramToRow(updates, true, false);
        const resBase = await supabase
          .from('programs')
          .update(rowBase)
          .eq('id', id)
          .select()
          .single();

        if (resBase.data) {
          return { ...updates, ...mapRowToProgram(resBase.data) } as Program;
        }
      }

      if (id === 'prog-navratri-numerology') {
        const overrides = getLocalOverrides()['prog-navratri-numerology'] || {};
        return { ...NAVRATRI_NUMEROLOGY_BUNDLE_PROGRAM, ...overrides, ...updates };
      }

      throw error;
    } catch (error) {
      console.warn(`Failed to update program ${id} in Supabase:`, error);
      if (id === 'prog-navratri-numerology') {
        const overrides = getLocalOverrides()['prog-navratri-numerology'] || {};
        return { ...NAVRATRI_NUMEROLOGY_BUNDLE_PROGRAM, ...overrides, ...updates };
      }
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
        ...mapProgramToRow(p, false, false),
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
