import { GemstoneProduct } from '../models/gemstoneProduct';
import { INITIAL_GEMSTONES_CATALOGUE } from '../data/gemstoneCatalogueData';
import { supabase } from '../lib/supabaseClient';

const STORAGE_KEY = 'leo_gemstone_catalogue_v1';
const UPDATE_EVENT = 'leo_gemstone_catalogue_changed';

// Helper to notify all components on live changes
function broadcastChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT));
  }
}

function getStoredCatalogue(): GemstoneProduct[] {
  if (typeof window === 'undefined') return INITIAL_GEMSTONES_CATALOGUE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_GEMSTONES_CATALOGUE));
      return INITIAL_GEMSTONES_CATALOGUE;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (e) {
    console.warn('[GemstoneRepo] Error reading localStorage:', e);
  }
  return INITIAL_GEMSTONES_CATALOGUE;
}

function saveStoredCatalogue(products: GemstoneProduct[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    broadcastChange();
  } catch (e) {
    console.warn('[GemstoneRepo] Error writing localStorage:', e);
  }
}

function mapRowToProduct(row: any): GemstoneProduct {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    hindiName: row.hindi_name,
    category: row.category,
    planetaryRuler: row.planetary_ruler,
    primaryDeity: row.primary_deity || '',
    benefit: row.benefit || '',
    shortDescription: row.short_description || '',
    description: row.description || '',
    images: Array.isArray(row.images) && row.images.length > 0 ? row.images : ['/gemstone-assets/ruby.jpg'],
    price: Number(row.price) || 0,
    compareAtPrice: row.compare_at_price ? Number(row.compare_at_price) : null,
    sku: row.sku || '',
    stockQuantity: Number(row.stock_quantity) || 0,
    inStock: row.in_stock ?? true,
    isPublished: row.is_published ?? true,
    isFeatured: row.is_featured ?? false,
    certification: typeof row.certification === 'object' && row.certification !== null ? row.certification : {
      certified: true,
      labName: 'Govt. Approved Gemological Testing Lab',
      natural: true,
      treatment: '100% Natural, Unheated & Untreated'
    },
    specifications: typeof row.specifications === 'object' && row.specifications !== null ? row.specifications : {},
    variants: Array.isArray(row.variants) ? row.variants : [],
    displayOrder: Number(row.display_order) || 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function mapProductToRow(p: Partial<GemstoneProduct>, isUpdate = false): any {
  const row: any = {};
  if (p.id !== undefined && !isUpdate) row.id = p.id;
  if (p.slug !== undefined) row.slug = p.slug;
  if (p.name !== undefined) row.name = p.name;
  if (p.hindiName !== undefined) row.hindi_name = p.hindiName;
  if (p.category !== undefined) row.category = p.category;
  if (p.planetaryRuler !== undefined) row.planetary_ruler = p.planetaryRuler;
  if (p.primaryDeity !== undefined) row.primary_deity = p.primaryDeity;
  if (p.benefit !== undefined) row.benefit = p.benefit;
  if (p.shortDescription !== undefined) row.short_description = p.shortDescription;
  if (p.description !== undefined) row.description = p.description;
  if (p.images !== undefined) row.images = p.images;
  if (p.price !== undefined) row.price = Number(p.price);
  if (p.compareAtPrice !== undefined) row.compare_at_price = p.compareAtPrice ? Number(p.compareAtPrice) : null;
  if (p.sku !== undefined) row.sku = p.sku;
  if (p.stockQuantity !== undefined) row.stock_quantity = Number(p.stockQuantity);
  if (p.inStock !== undefined) row.in_stock = Boolean(p.inStock);
  if (p.isPublished !== undefined) row.is_published = Boolean(p.isPublished);
  if (p.isFeatured !== undefined) row.is_featured = Boolean(p.isFeatured);
  if (p.certification !== undefined) row.certification = p.certification;
  if (p.specifications !== undefined) row.specifications = p.specifications;
  if (p.variants !== undefined) row.variants = p.variants;
  if (p.displayOrder !== undefined) row.display_order = Number(p.displayOrder);
  if (isUpdate) {
    row.updated_at = new Date().toISOString();
  }
  return row;
}

export const gemstoneProductRepository = {
  subscribe(callback: () => void): () => void {
    if (typeof window === 'undefined') return () => {};
    window.addEventListener(UPDATE_EVENT, callback);
    return () => window.removeEventListener(UPDATE_EVENT, callback);
  },

  async getAll(includeUnpublished = false): Promise<GemstoneProduct[]> {
    // 1. Try Supabase first
    try {
      let query = supabase
        .from('gemstone_products')
        .select('*')
        .order('display_order', { ascending: true });

      if (!includeUnpublished) {
        query = query.eq('is_published', true);
      }

      const { data, error } = await query;

      if (!error && data && data.length > 0) {
        const mapped = data.map(mapRowToProduct);
        // Sync local cache
        saveStoredCatalogue(mapped);
        return mapped;
      }
    } catch (err) {
      // Supabase table not created yet or network issue: proceed to local resilient cache
    }

    // 2. Resilient local storage cache fallback
    const local = getStoredCatalogue();
    if (!includeUnpublished) {
      return local.filter(p => p.isPublished);
    }
    return local;
  },

  async getBySlug(slug: string): Promise<GemstoneProduct | null> {
    try {
      const { data, error } = await supabase
        .from('gemstone_products')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (!error && data) {
        return mapRowToProduct(data);
      }
    } catch (err) {
      // Fallback
    }

    const local = getStoredCatalogue();
    return local.find(p => p.slug === slug) || null;
  },

  async getById(id: string): Promise<GemstoneProduct | null> {
    try {
      const { data, error } = await supabase
        .from('gemstone_products')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (!error && data) {
        return mapRowToProduct(data);
      }
    } catch (err) {
      // Fallback
    }

    const local = getStoredCatalogue();
    return local.find(p => p.id === id) || null;
  },

  async create(product: Partial<GemstoneProduct>): Promise<GemstoneProduct> {
    const id = product.id || `gem-${Date.now()}`;
    const slug = product.slug || (product.name ? product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : `gem-${Date.now()}`);
    
    const newProduct: GemstoneProduct = {
      id,
      slug,
      name: product.name || 'New Vedic Gemstone',
      hindiName: product.hindiName || '',
      category: product.category || 'Ruby',
      planetaryRuler: product.planetaryRuler || 'The Sun',
      primaryDeity: product.primaryDeity || '',
      benefit: product.benefit || '',
      shortDescription: product.shortDescription || '',
      description: product.description || '',
      images: product.images && product.images.length > 0 ? product.images : ['/gemstone-assets/ruby.jpg'],
      price: Number(product.price) || 0,
      compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
      sku: product.sku || `LEO-${Date.now().toString().slice(-4)}`,
      stockQuantity: product.stockQuantity !== undefined ? Number(product.stockQuantity) : 5,
      inStock: product.inStock ?? true,
      isPublished: product.isPublished ?? true,
      isFeatured: product.isFeatured ?? false,
      certification: product.certification || {
        certified: true,
        labName: 'Govt. Approved Gemological Testing Lab',
        natural: true,
        treatment: '100% Natural, Unheated & Untreated'
      },
      specifications: product.specifications || {},
      variants: product.variants || [],
      displayOrder: product.displayOrder || 99,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Update local cache first for instant UI response
    const local = getStoredCatalogue();
    const updatedList = [...local.filter(p => p.id !== id), newProduct];
    saveStoredCatalogue(updatedList);

    // Try Supabase insert
    try {
      const row = mapProductToRow(newProduct, false);
      const { data, error } = await supabase.from('gemstone_products').insert([row]).select().maybeSingle();
      if (!error && data) {
        return mapRowToProduct(data);
      }
    } catch (err) {
      console.warn('[GemstoneRepo] Supabase insert skipped/failed:', err);
    }

    return newProduct;
  },

  async update(id: string, updates: Partial<GemstoneProduct>): Promise<GemstoneProduct> {
    const local = getStoredCatalogue();
    const existingIndex = local.findIndex(p => p.id === id);
    if (existingIndex === -1) {
      throw new Error(`Gemstone product with ID ${id} not found.`);
    }

    const updatedProduct: GemstoneProduct = {
      ...local[existingIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    local[existingIndex] = updatedProduct;
    saveStoredCatalogue([...local]);

    // Try Supabase update
    try {
      const rowUpdates = mapProductToRow(updates, true);
      const { data, error } = await supabase
        .from('gemstone_products')
        .update(rowUpdates)
        .eq('id', id)
        .select()
        .maybeSingle();

      if (!error && data) {
        return mapRowToProduct(data);
      }
    } catch (err) {
      console.warn('[GemstoneRepo] Supabase update skipped/failed:', err);
    }

    return updatedProduct;
  },

  async delete(id: string): Promise<boolean> {
    const local = getStoredCatalogue();
    const filtered = local.filter(p => p.id !== id);
    saveStoredCatalogue(filtered);

    try {
      await supabase.from('gemstone_products').delete().eq('id', id);
    } catch (err) {
      console.warn('[GemstoneRepo] Supabase delete skipped/failed:', err);
    }

    return true;
  },

  async resetToDefault(): Promise<GemstoneProduct[]> {
    saveStoredCatalogue(INITIAL_GEMSTONES_CATALOGUE);
    return INITIAL_GEMSTONES_CATALOGUE;
  }
};
