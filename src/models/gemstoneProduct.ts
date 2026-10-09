export interface GemstoneVariant {
  id: string;
  name: string;
  carat: number;
  ratti: number;
  origin: string;
  shape?: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  inStock: boolean;
  stockQuantity: number;
}

export interface GemstoneCertification {
  certified: boolean;
  labName: string;
  certificateNo?: string;
  natural: boolean;
  treatment?: string;
}

export interface GemstoneSpecifications {
  caratWeight?: string;
  origin?: string;
  shape?: string;
  color?: string;
  transparency?: string;
  energizationStatus?: string;
  metalRecommendation?: string;
  wearingFinger?: string;
  wearingDayMuhurat?: string;
}

export interface GemstoneProduct {
  id: string;
  slug: string;
  name: string;
  hindiName: string;
  category: string;
  planetaryRuler: string;
  primaryDeity?: string;
  benefit?: string;
  shortDescription: string;
  description: string;
  images: string[];
  price: number;
  compareAtPrice?: number | null;
  sku: string;
  stockQuantity: number;
  inStock: boolean;
  isPublished: boolean;
  isFeatured: boolean;
  certification: GemstoneCertification;
  specifications: GemstoneSpecifications;
  variants: GemstoneVariant[];
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface GemstoneFilterState {
  search: string;
  category: string;
  planetaryRuler: string;
  availability: 'all' | 'in_stock' | 'out_of_stock';
  minPrice: number;
  maxPrice: number;
  certifiedOnly: boolean;
  origin: string;
}

export type GemstoneSortOption = 
  | 'featured'
  | 'price_asc'
  | 'price_desc'
  | 'name_asc'
  | 'name_desc'
  | 'newest'
  | 'oldest';

export interface CartItem {
  id: string; // unique item line id, e.g. `${productId}_${variantId || 'base'}`
  productId: string;
  slug: string;
  name: string;
  hindiName: string;
  image: string;
  price: number;
  compareAtPrice?: number;
  quantity: number;
  variantId?: string;
  variantName?: string;
  maxStock: number;
  sku: string;
}
