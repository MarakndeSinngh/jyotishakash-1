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
  verificationStatus?: string;
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
  pricingVerificationStatus?: string;
  adminReviewNotice?: string;
  materialIdentityStatus?: string;
  imageVerificationStatus?: string;
  [key: string]: any;
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

export interface ReviewIssue {
  type: 'pricing' | 'identity' | 'image' | 'notice' | 'stock';
  message: string;
}

export function getProductReviewIssues(product: Partial<GemstoneProduct>): ReviewIssue[] {
  const issues: ReviewIssue[] = [];

  // 1. Price safety & pricing verification
  const price = Number(product.price);
  if (product.price === undefined || product.price === null || isNaN(price) || price <= 0) {
    issues.push({ type: 'pricing', message: 'Valid positive price must be explicitly entered' });
  } else if (product.specifications?.pricingVerificationStatus === 'UNVERIFIED_DRAFT_PRICE') {
    issues.push({ type: 'pricing', message: 'Starter draft price requires verification' });
  }

  // 2. Material Identity Ambiguity (e.g. Diamond vs White Zircon)
  if (product.specifications?.materialIdentityStatus === 'AMBIGUOUS_UNVERIFIED') {
    issues.push({ type: 'identity', message: 'Material identity ambiguity must be resolved (Diamond vs White Zircon)' });
  }
  const nameLower = (product.name || '').toLowerCase();
  if (nameLower.includes('pending material confirmation') || (nameLower.includes('diamond') && nameLower.includes('white zircon'))) {
    if (product.specifications?.materialIdentityStatus !== 'VERIFIED') {
      issues.push({ type: 'identity', message: 'Product title contains ambiguous dual identity' });
    }
  }

  // 3. Image requirement: Photograph must exist AND be explicitly verified by administrator
  if (!product.images || product.images.length === 0 || !product.images[0]) {
    issues.push({ type: 'image', message: 'Product photograph is missing and required before publishing' });
  } else if (
    product.specifications?.imageVerificationStatus === 'PENDING_UPLOAD' ||
    product.specifications?.imageVerificationStatus === 'PENDING_VERIFICATION' ||
    product.specifications?.imageVerificationStatus !== 'VERIFIED'
  ) {
    issues.push({ type: 'image', message: 'Product photograph is pending explicit administrator verification (Status: PENDING_VERIFICATION)' });
  }

  // 4. Admin Review Notice
  if (product.specifications?.adminReviewNotice && product.specifications.adminReviewNotice.trim().length > 0) {
    issues.push({ type: 'notice', message: product.specifications.adminReviewNotice });
  }

  // 5. Inventory safeguard
  if (product.inStock && Number(product.stockQuantity || 0) <= 0) {
    issues.push({ type: 'stock', message: 'Product cannot be marked in stock when stock quantity is 0' });
  }

  return issues;
}

