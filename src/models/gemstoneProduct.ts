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
  priceVerificationStatus?: 'UNVERIFIED_DRAFT_PRICE' | 'VERIFIED';
}

export interface GemstoneCertification {
  certified: boolean;
  labName: string;
  certificateNo?: string;
  natural: boolean;
  treatment?: string;
  verificationStatus?: string;
  naturalStatus?: 'UNKNOWN' | 'NATURAL_CONFIRMED' | 'SYNTHETIC_CONFIRMED';
}

export interface GemstoneTraditionalGuide {
  vedicGraha?: string;
  traditionalIntent?: string;
  whoMayConsider?: string;
  cheiroNumbers?: string[];
  numerologyNote?: string;
  qualityChecks?: string[];
}

export interface GemstoneSpecifications {
  traditionalGuide?: GemstoneTraditionalGuide;
  imageAssetType?: 'AI_GENERATED_ILLUSTRATION' | 'ACTUAL_PRODUCT_PHOTO';
  imageIllustrationNotice?: string;
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
  } else if (product.specifications?.pricingVerificationStatus !== 'VERIFIED') {
    issues.push({ type: 'pricing', message: 'Selling price must be explicitly reviewed and approved by an administrator' });
  }
  if ((product.variants || []).some(variant => variant.priceVerificationStatus !== 'VERIFIED')) {
    issues.push({ type: 'pricing', message: 'Every product variant price must also be reviewed and approved' });
  }

  // 2. Material identity must be explicitly reviewed; ambiguous dual-material names are blocked.
  const materialStatus = product.specifications?.materialIdentityStatus;
  if (materialStatus !== 'VERIFIED') {
    issues.push({ type: 'identity', message: 'Gemstone material identity is pending administrator verification' });
  }
  const nameLower = (product.name || '').toLowerCase();
  if (nameLower.includes('pending material confirmation') || (nameLower.includes('diamond') && nameLower.includes('white zircon'))) {
    if (materialStatus !== 'VERIFIED') {
      issues.push({ type: 'identity', message: 'Product title contains ambiguous dual identity' });
    }
  }
  const naturalStatus = product.certification?.naturalStatus || 'UNKNOWN';
  if (naturalStatus === 'UNKNOWN') {
    issues.push({ type: 'identity', message: 'Natural, treated, or synthetic/lab-grown status must be explicitly recorded before publication' });
  }
  if (naturalStatus === 'NATURAL_CONFIRMED' && product.certification?.natural !== true) {
    issues.push({ type: 'identity', message: 'Natural status is marked confirmed but the natural-origin flag is not enabled' });
  }
  if (naturalStatus === 'SYNTHETIC_CONFIRMED' && product.certification?.natural !== false) {
    issues.push({ type: 'identity', message: 'Synthetic/lab-grown status conflicts with the natural-origin flag' });
  }
  if (product.certification?.certified && !product.certification.labName?.trim()) {
    issues.push({ type: 'identity', message: 'A lab-certified claim requires the actual testing laboratory name' });
  }
  if (nameLower.includes('natural') && naturalStatus !== 'NATURAL_CONFIRMED') {
    issues.push({ type: 'identity', message: 'A product described as natural requires explicit natural-origin confirmation' });
  }

  // 3. Image requirement: Photograph must exist AND be explicitly verified by administrator
  if (!product.images || product.images.length === 0 || !product.images[0]) {
    issues.push({ type: 'image', message: 'Product photograph is missing and required before publishing' });
  } else if (product.specifications?.imageVerificationStatus !== 'VERIFIED') {
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

