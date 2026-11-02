/**
 * LEO Family gemstone catalogue consistency and safety checks.
 * This script is read-only: it does not connect to Supabase or execute SQL.
 */

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { INITIAL_GEMSTONES_CATALOGUE } from '../src/data/gemstoneCatalogueData';
import { getProductReviewIssues, GemstoneProduct } from '../src/models/gemstoneProduct';

const root = process.cwd();
const seedPath = path.join(root, 'supabase/seed/20261010_gemstone_catalogue_seed.sql');
const seed = fs.readFileSync(seedPath, 'utf8');
const appPage = fs.readFileSync(path.join(root, 'src/components/sections/GemstonesPage.tsx'), 'utf8');
const detailPage = fs.readFileSync(path.join(root, 'src/components/sections/GemstoneDetailPage.tsx'), 'utf8');
const repository = fs.readFileSync(path.join(root, 'src/repositories/gemstoneProductRepository.ts'), 'utf8');
const admin = fs.readFileSync(path.join(root, 'src/components/admin/GemstoneAdminView.tsx'), 'utf8');
const cart = fs.readFileSync(path.join(root, 'src/components/cart/CartDrawer.tsx'), 'utf8');
const generator = fs.readFileSync(path.join(root, 'scripts/generate_gemstone_seed.ts'), 'utf8');

let passed = 0;
function check(name: string, condition: unknown, detail?: string) {
  assert.ok(condition, `FAILED: ${name}${detail ? ` — ${detail}` : ''}`);
  passed++;
  console.log(`[PASS] ${name}${detail ? ` — ${detail}` : ''}`);
}

const products = INITIAL_GEMSTONES_CATALOGUE;
const originalIds = [
  'gem-ruby', 'gem-pearl', 'gem-red-coral', 'gem-emerald', 'gem-yellow-sapphire',
  'gem-diamond', 'gem-blue-sapphire', 'gem-hessonite', 'gem-cats-eye', 'gem-opal'
];
const popularIds = [
  'gem-amethyst', 'gem-moonstone', 'gem-labradorite', 'gem-garnet',
  'gem-carnelian', 'gem-turquoise', 'gem-citrine', 'gem-peridot',
  'gem-lapis-lazuli', 'gem-tourmaline', 'gem-chalcedony', 'gem-amber'
];

check('22 products in TypeScript catalogue', products.length === 22, `found ${products.length}`);
check('Unique product IDs', new Set(products.map(p => p.id)).size === products.length);
check('Unique product slugs', new Set(products.map(p => p.slug)).size === products.length);
check('All 10 original stable IDs preserved', originalIds.every(id => products.some(p => p.id === id)));
check('All 12 popular variety candidates included', popularIds.every(id => products.some(p => p.id === id)));

for (const product of products) {
  check(`${product.id}: draft and zero inventory`,
    product.isPublished === false && product.inStock === false && product.stockQuantity === 0);
  check(`${product.id}: natural status unknown`,
    product.certification?.natural === false &&
    product.certification?.certified === false &&
    product.certification?.naturalStatus === 'UNKNOWN');
  check(`${product.id}: price requires administrator review`,
    product.specifications?.pricingVerificationStatus === 'UNVERIFIED_DRAFT_PRICE');
  check(`${product.id}: material identity pending`,
    product.specifications?.materialIdentityStatus === 'PENDING_VERIFICATION' ||
    product.specifications?.materialIdentityStatus === 'AMBIGUOUS_UNVERIFIED');
  check(`${product.id}: image review state`,
    product.specifications?.imageVerificationStatus ===
      (product.images?.length ? 'PENDING_VERIFICATION' : 'PENDING_UPLOAD'));
  for (const variant of product.variants || []) {
    check(`${product.id}/${variant.id}: variant unavailable and price unverified`,
      variant.inStock === false && variant.stockQuantity === 0 &&
      variant.priceVerificationStatus === 'UNVERIFIED_DRAFT_PRICE');
  }
  for (const image of product.images || []) {
    const localPath = path.join(root, 'public', image.replace(/^\//, ''));
    check(`${product.id}: image file exists`, fs.existsSync(localPath), image);
  }
}

const opal = products.find(p => p.id === 'gem-opal');
check('Opal has no substitute photograph', !!opal && opal.images.length === 0 &&
  opal.specifications?.imageVerificationStatus === 'PENDING_UPLOAD');

const popular = products.filter(p => popularIds.includes(p.id));
check('Popular candidates are not represented as LEO sales rankings',
  popular.every(p => p.specifications?.catalogueResearchStatus === 'POPULAR_VARIETY_CANDIDATE_NOT_LEO_SALES_RANKING'));
check('Popular candidates have no assumed commercial price or photo',
  popular.every(p => p.price === 1 &&
    String(p.specifications?.priceNote || '').includes('NO_COMMERCIAL_PRICE_SET') &&
    p.images.length === 0 &&
    p.variants.length === 0));

const sqlManifest = [...seed.matchAll(/-- Product:.*\[ID: ([^,]+), Slug: ([^\]]+)\]/g)]
  .map(match => ({ id: match[1], slug: match[2] }));
const expectedManifest = new Map(products.map(p => [p.id, p.slug]));
check('22 seed SQL product entries', sqlManifest.length === 22, `found ${sqlManifest.length}`);
check('Seed IDs and slugs match TypeScript source',
  sqlManifest.length === 22 &&
  sqlManifest.every(entry => expectedManifest.get(entry.id) === entry.slug));
check('Every seed insert is idempotent',
  (seed.match(/INSERT INTO public\.gemstone_products/g) || []).length === 22 &&
  (seed.match(/ON CONFLICT \(id\) DO NOTHING;/g) || []).length === 22);
check('Seed contains no destructive SQL statements',
  !/^\s*(?:DROP|TRUNCATE|DELETE)\b/gim.test(seed));
check('Seed verification query uses display_order',
  /ORDER BY display_order ASC/i.test(seed) && !/ORDER BY sort_order/i.test(seed));
check('All seed rows use zero stock and remain unpublished',
  !/^\s+true,\s*true,\s*true,/gm.test(seed));
check('Seed uses PostgreSQL TEXT[] and JSONB casts',
  seed.includes("'{}'::text[]") && seed.includes("'[]'::jsonb"));

const validNaturalProduct: GemstoneProduct = {
  id: 'test-natural-ruby',
  slug: 'test-natural-ruby',
  name: 'Natural Ruby',
  hindiName: 'Manik',
  category: 'Ruby',
  planetaryRuler: 'The Sun',
  benefit: 'Traditional Jyotish association',
  shortDescription: 'Test item',
  description: 'Test item',
  images: ['/gemstone-assets/ruby.jpg'],
  price: 15000,
  sku: 'TEST-RUBY',
  stockQuantity: 2,
  inStock: true,
  isPublished: false,
  isFeatured: false,
  certification: {
    certified: true,
    labName: 'Test Gem Lab',
    natural: true,
    naturalStatus: 'NATURAL_CONFIRMED',
    treatment: 'Treatment disclosed'
  },
  specifications: {
    pricingVerificationStatus: 'VERIFIED',
    materialIdentityStatus: 'VERIFIED',
    imageVerificationStatus: 'VERIFIED',
    adminReviewNotice: ''
  },
  variants: [{
    id: 'test-ruby-variant',
    name: '2 Ratti',
    carat: 1.82,
    ratti: 2,
    origin: 'Verified test source',
    price: 15000,
    sku: 'TEST-RUBY-2R',
    inStock: true,
    stockQuantity: 2,
    priceVerificationStatus: 'VERIFIED'
  }],
  displayOrder: 1
};
check('Fully verified product passes review gate',
  getProductReviewIssues(validNaturalProduct).length === 0);
check('Unknown natural status is blocked',
  getProductReviewIssues({
    ...validNaturalProduct,
    certification: { ...validNaturalProduct.certification, natural: false, naturalStatus: 'UNKNOWN' }
  }).some(issue => issue.type === 'identity'));
check('Natural product title cannot be used for synthetic status',
  getProductReviewIssues({
    ...validNaturalProduct,
    certification: { ...validNaturalProduct.certification, natural: false, naturalStatus: 'SYNTHETIC_CONFIRMED' }
  }).some(issue => issue.type === 'identity'));
check('Unapproved variant price blocks publication',
  getProductReviewIssues({
    ...validNaturalProduct,
    variants: validNaturalProduct.variants.map(v => ({ ...v, priceVerificationStatus: 'UNVERIFIED_DRAFT_PRICE' }))
  }).some(issue => issue.type === 'pricing'));
check('Certified claim requires a laboratory name',
  getProductReviewIssues({
    ...validNaturalProduct,
    certification: { ...validNaturalProduct.certification, labName: '' }
  }).some(issue => issue.type === 'identity'));

check('Public repository filters unresolved review gates',
  repository.includes('mapped.filter(product => getProductReviewIssues(product).length === 0') &&
  repository.includes('getProductReviewIssues(product).length > 0'));
check('Collection filters expose origin and unavailable options',
  appPage.includes('availableOrigins.map') &&
  appPage.includes("filters.availability === 'out_of_stock'"));
check('Product detail does not claim every item is natural or lab-certified',
  !detailPage.includes('100% Natural</span>') &&
  !detailPage.includes('Unheated & Pure'));
check('Admin blocks temporary Blob URLs on upload failure',
  !admin.includes('URL.createObjectURL(file)'));
check('Cart revalidates products, prices, and stock before WhatsApp enquiry',
  cart.includes('getProductById(item.productId, false)') &&
  cart.includes('variant.priceVerificationStatus !== \'VERIFIED\'') &&
  cart.includes('not a confirmed or paid order'));
check('Seed generator preserves verification-first semantics',
  generator.includes("naturalStatus: 'UNKNOWN'") &&
  generator.includes("priceVerificationStatus: 'UNVERIFIED_DRAFT_PRICE'") &&
  !generator.includes('VERIFIED_PRESET'));

console.log(`\nGEMSTONE CATALOGUE CHECKS: ${passed} PASSED`);
console.log('No Supabase connection was made and no SQL was executed.');
