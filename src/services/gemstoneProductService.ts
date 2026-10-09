import { GemstoneProduct } from '../models/gemstoneProduct';
import { gemstoneProductRepository } from '../repositories/gemstoneProductRepository';

export const gemstoneProductService = {
  async getAllProducts(includeUnpublished = false): Promise<GemstoneProduct[]> {
    return gemstoneProductRepository.getAll(includeUnpublished);
  },

  async getProductBySlug(slug: string): Promise<GemstoneProduct | null> {
    return gemstoneProductRepository.getBySlug(slug);
  },

  async getProductById(id: string): Promise<GemstoneProduct | null> {
    return gemstoneProductRepository.getById(id);
  },

  async saveProduct(product: Partial<GemstoneProduct>): Promise<GemstoneProduct> {
    return gemstoneProductRepository.create(product);
  },

  async updateProduct(id: string, updates: Partial<GemstoneProduct>): Promise<GemstoneProduct> {
    return gemstoneProductRepository.update(id, updates);
  },

  async deleteProduct(id: string): Promise<boolean> {
    return gemstoneProductRepository.delete(id);
  },

  async resetDefaults(): Promise<GemstoneProduct[]> {
    return gemstoneProductRepository.resetToDefault();
  },

  subscribe(callback: () => void): () => void {
    return gemstoneProductRepository.subscribe(callback);
  }
};
