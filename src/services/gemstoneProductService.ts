import { GemstoneProduct, getProductReviewIssues } from '../models/gemstoneProduct';
import { gemstoneProductRepository } from '../repositories/gemstoneProductRepository';

export const gemstoneProductService = {
  async getAllProducts(includeUnpublished = false): Promise<GemstoneProduct[]> {
    return gemstoneProductRepository.getAll(includeUnpublished);
  },

  async getProductBySlug(slug: string, includeUnpublished = false): Promise<GemstoneProduct | null> {
    return gemstoneProductRepository.getBySlug(slug, includeUnpublished);
  },

  async getProductById(id: string, includeUnpublished = false): Promise<GemstoneProduct | null> {
    return gemstoneProductRepository.getById(id, includeUnpublished);
  },

  async saveProduct(product: Partial<GemstoneProduct>): Promise<GemstoneProduct> {
    // 1. Price safety: Must explicitly provide a valid positive price
    if (product.price === undefined || product.price === null || isNaN(Number(product.price)) || Number(product.price) <= 0) {
      throw new Error('Price safety: A valid positive selling price must be explicitly entered.');
    }

    // 2. Inventory safeguard: Cannot mark in stock when stock quantity is <= 0
    const stockQty = Math.max(0, Number(product.stockQuantity !== undefined ? product.stockQuantity : 0));
    if (product.inStock && stockQty <= 0) {
      throw new Error('Inventory safeguard: Cannot mark product as in stock when stock quantity is 0 or less.');
    }

    // 3. Publication safeguards: Prevent publication if mandatory review items unresolved
    if (product.isPublished) {
      const issues = getProductReviewIssues({
        ...product,
        price: Number(product.price),
        stockQuantity: stockQty,
        inStock: stockQty > 0 ? Boolean(product.inStock) : false
      });
      if (issues.length > 0) {
        throw new Error(
          `Publication blocked: Cannot publish product while review items remain unresolved: ${issues.map(i => i.message).join('; ')}`
        );
      }
    }

    return gemstoneProductRepository.create({
      ...product,
      stockQuantity: stockQty,
      inStock: stockQty > 0 ? Boolean(product.inStock) : false
    });
  },

  async updateProduct(id: string, updates: Partial<GemstoneProduct>): Promise<GemstoneProduct> {
    // 1. Price safety check on update
    if (updates.price !== undefined) {
      const p = Number(updates.price);
      if (isNaN(p) || p <= 0) {
        throw new Error('Price safety: A valid positive selling price must be explicitly entered.');
      }
    }

    // Fetch existing product for context verification
    const existing = await gemstoneProductRepository.getById(id, true);

    // 2. Inventory safeguards
    if (updates.inStock === true) {
      const effectiveStock = updates.stockQuantity !== undefined 
        ? Number(updates.stockQuantity) 
        : Number(existing?.stockQuantity ?? 0);
      if (effectiveStock <= 0) {
        throw new Error(`Inventory safeguard: Cannot mark "${existing?.name || id}" as in stock when stock quantity is 0 or less.`);
      }
    }

    // If stock is reduced to 0 or less, enforce that inStock cannot remain true
    if (updates.stockQuantity !== undefined && Number(updates.stockQuantity) <= 0) {
      if (updates.inStock === true) {
        throw new Error('Inventory safeguard: Cannot mark product as in stock when stock quantity is 0 or less.');
      }
      if (updates.inStock === undefined) {
        updates.inStock = false;
      }
    }

    // 3. Publication safeguards
    if (updates.isPublished === true) {
      const merged: Partial<GemstoneProduct> = {
        ...(existing || {}),
        ...updates
      };
      const issues = getProductReviewIssues(merged);
      if (issues.length > 0) {
        throw new Error(
          `Publication blocked: Cannot publish product while review items remain unresolved: ${issues.map(i => i.message).join('; ')}`
        );
      }
    }

    return gemstoneProductRepository.update(id, updates);
  },

  async deleteProduct(id: string): Promise<boolean> {
    return gemstoneProductRepository.delete(id);
  },

  async resetDefaults(): Promise<GemstoneProduct[]> {
    return gemstoneProductRepository.resetToDefault();
  },

  async checkDatabaseStatus(): Promise<{ connected: boolean; count: number; error?: string }> {
    return gemstoneProductRepository.checkDatabaseStatus();
  },

  subscribe(callback: () => void): () => void {
    return gemstoneProductRepository.subscribe(callback);
  }
};
