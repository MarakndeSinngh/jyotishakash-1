import { GemstoneProduct } from '../models/gemstoneProduct';
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
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('[GemstoneRepo] Error reading localStorage:', e);
  }
  return [];
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
    images: Array.isArray(row.images) ? row.images : [],
    price: Number(row.price) || 0,
    compareAtPrice: row.compare_at_price ? Number(row.compare_at_price) : null,
    sku: row.sku || '',
    stockQuantity: Number(row.stock_quantity) || 0,
    inStock: Boolean(row.in_stock),
    isPublished: Boolean(row.is_published),
    isFeatured: Boolean(row.is_featured),
    certification: typeof row.certification === 'object' && row.certification !== null ? row.certification : {
      certified: false,
      labName: '',
      natural: false,
      treatment: 'Pending Verification'
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
  if (p.price !== undefined) {
    const num = Number(p.price);
    if (isNaN(num) || num <= 0) {
      throw new Error('Invalid product price: A valid positive price must be explicitly entered.');
    }
    row.price = num;
  }
  if (p.compareAtPrice !== undefined) row.compare_at_price = p.compareAtPrice ? Number(p.compareAtPrice) : null;
  if (p.sku !== undefined) row.sku = p.sku;
  if (p.stockQuantity !== undefined) {
    row.stock_quantity = Math.max(0, Number(p.stockQuantity) || 0);
    if (row.stock_quantity === 0) {
      row.in_stock = false;
    }
  }
  if (p.inStock !== undefined) {
    if (row.stock_quantity !== undefined && row.stock_quantity <= 0) {
      row.in_stock = false;
    } else {
      row.in_stock = Boolean(p.inStock);
    }
  }
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

  async checkDatabaseStatus(): Promise<{ connected: boolean; count: number; error?: string }> {
    try {
      const { data, count, error } = await supabase
        .from('gemstone_products')
        .select('id', { count: 'exact' })
        .limit(1);

      if (error) {
        return { connected: false, count: 0, error: error.message };
      }
      return { connected: true, count: count ?? (data ? data.length : 0) };
    } catch (err: any) {
      return { connected: false, count: 0, error: err.message || 'Unknown database error' };
    }
  },

  async getAll(includeUnpublished = false): Promise<GemstoneProduct[]> {
    // 1. Authoritative source of truth: Supabase database
    try {
      let query = supabase
        .from('gemstone_products')
        .select('*')
        .order('display_order', { ascending: true });

      if (!includeUnpublished) {
        query = query.eq('is_published', true);
      }

      const { data, error } = await query;

      if (!error && data !== null) {
        const mapped = data.map(mapRowToProduct);
        // Sync local cache with authoritative DB response (even if empty [])
        saveStoredCatalogue(mapped);
        return mapped;
      }

      if (error) {
        console.error('[GemstoneRepo] Supabase error in getAll:', error);
      }
    } catch (err) {
      console.error('[GemstoneRepo] Error querying Supabase in getAll:', err);
    }

    // On database/network errors, fail closed:
    // Storefront must never display unverified starter inventory or bypass publication rules.
    if (!includeUnpublished) {
      return [];
    }

    // In Admin Panel only, return local cached drafts if present (safe for administration inspection)
    return getStoredCatalogue();
  },

  async getBySlug(slug: string, includeUnpublished = false): Promise<GemstoneProduct | null> {
    try {
      let query = supabase
        .from('gemstone_products')
        .select('*')
        .eq('slug', slug);

      if (!includeUnpublished) {
        query = query.eq('is_published', true);
      }

      const { data, error } = await query.maybeSingle();

      if (!error) {
        // Authoritative database result: null if no matching row exists
        return data ? mapRowToProduct(data) : null;
      }
      console.error('[GemstoneRepo] Supabase error in getBySlug:', error);
    } catch (err) {
      console.error('[GemstoneRepo] Error querying Supabase in getBySlug:', err);
    }

    // Fail closed: Never fallback to local starter catalogue to expose unpublished or deleted products
    return null;
  },

  async getById(id: string, includeUnpublished = false): Promise<GemstoneProduct | null> {
    try {
      let query = supabase
        .from('gemstone_products')
        .select('*')
        .eq('id', id);

      if (!includeUnpublished) {
        query = query.eq('is_published', true);
      }

      const { data, error } = await query.maybeSingle();

      if (!error) {
        // Authoritative database result: null if no matching row exists
        return data ? mapRowToProduct(data) : null;
      }
      console.error('[GemstoneRepo] Supabase error in getById:', error);
    } catch (err) {
      console.error('[GemstoneRepo] Error querying Supabase in getById:', err);
    }

    // Fail closed: Never fallback to local starter catalogue
    return null;
  },

  async create(product: Partial<GemstoneProduct>): Promise<GemstoneProduct> {
    if (product.price === undefined || product.price === null || isNaN(Number(product.price)) || Number(product.price) <= 0) {
      throw new Error('Invalid product price: A valid positive price must be explicitly entered.');
    }

    const id = product.id || `gem-${Date.now()}`;
    const slug = product.slug || (product.name ? product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : `gem-${Date.now()}`);
    const stockQuantity = Math.max(0, Number(product.stockQuantity !== undefined ? product.stockQuantity : 0));
    const inStock = stockQuantity > 0 ? Boolean(product.inStock) : false;
    
    // Safe defaults: Draft (unpublished), unavailable (stock = 0), unverified certification, empty images if none provided
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
      images: Array.isArray(product.images) ? product.images : [],
      price: Number(product.price),
      compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
      sku: product.sku || `LEO-${Date.now().toString().slice(-4)}`,
      stockQuantity,
      inStock,
      isPublished: product.isPublished !== undefined ? Boolean(product.isPublished) : false,
      isFeatured: Boolean(product.isFeatured),
      certification: product.certification || {
        certified: false,
        labName: '',
        natural: false,
        treatment: 'Pending Verification'
      },
      specifications: product.specifications || {},
      variants: Array.isArray(product.variants) ? product.variants : [],
      displayOrder: product.displayOrder || 99,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Authoritative database persistence check
    const row = mapProductToRow(newProduct, false);
    const { data, error } = await supabase.from('gemstone_products').insert([row]).select().maybeSingle();

    if (error) {
      console.error('[GemstoneRepo] Supabase insert failed:', error);
      throw new Error(`Database save failed: ${error.message} (Code: ${error.code || 'DB_ERROR'}). Ensure table 'gemstone_products' exists and admin user is authorized.`);
    }

    const savedProduct = data ? mapRowToProduct(data) : newProduct;

    // Persist to local cache only after successful database save
    const local = getStoredCatalogue();
    const updatedList = [...local.filter(p => p.id !== id), savedProduct];
    saveStoredCatalogue(updatedList);

    return savedProduct;
  },

  async update(id: string, updates: Partial<GemstoneProduct>): Promise<GemstoneProduct> {
    if (updates.price !== undefined) {
      const p = Number(updates.price);
      if (isNaN(p) || p <= 0) {
        throw new Error('Invalid product price: A valid positive price must be explicitly entered.');
      }
    }

    if (updates.inStock === true) {
      const local = getStoredCatalogue();
      const existing = local.find(p => p.id === id);
      const effectiveStock = updates.stockQuantity !== undefined ? Number(updates.stockQuantity) : (existing?.stockQuantity || 0);
      if (effectiveStock <= 0) {
        throw new Error(`Inventory safeguard: Cannot mark "${existing?.name || id}" as in stock when stock quantity is 0.`);
      }
    }

    if (updates.stockQuantity !== undefined && Number(updates.stockQuantity) <= 0) {
      if (updates.inStock === true) {
        throw new Error('Inventory safeguard: Cannot mark product as in stock when stock quantity is 0 or less.');
      }
      if (updates.inStock === undefined) {
        updates.inStock = false;
      }
    }

    const rowUpdates = mapProductToRow(updates, true);
    const { data, error } = await supabase
      .from('gemstone_products')
      .update(rowUpdates)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      console.error('[GemstoneRepo] Supabase update failed:', error);
      throw new Error(`Database update failed: ${error.message} (Code: ${error.code || 'DB_ERROR'}). Changes were not persisted to database.`);
    }

    const local = getStoredCatalogue();
    const existingIndex = local.findIndex(p => p.id === id);
    const updatedProduct: GemstoneProduct = data
      ? mapRowToProduct(data)
      : ({ ...(local[existingIndex] || {}), ...updates, updatedAt: new Date().toISOString() } as GemstoneProduct);

    if (existingIndex !== -1) {
      local[existingIndex] = updatedProduct;
    } else {
      local.push(updatedProduct);
    }
    saveStoredCatalogue([...local]);

    return updatedProduct;
  },

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase.from('gemstone_products').delete().eq('id', id);
    if (error) {
      console.error('[GemstoneRepo] Supabase delete failed:', error);
      throw new Error(`Database delete failed: ${error.message} (Code: ${error.code || 'DB_ERROR'}). Item was not removed from database.`);
    }

    const local = getStoredCatalogue();
    const filtered = local.filter(p => p.id !== id);
    saveStoredCatalogue(filtered);

    return true;
  },

  async resetToDefault(): Promise<GemstoneProduct[]> {
    saveStoredCatalogue([]);
    return [];
  }
};
