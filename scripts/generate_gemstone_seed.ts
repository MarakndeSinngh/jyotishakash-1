import * as fs from 'fs';
import * as path from 'path';
import { INITIAL_GEMSTONES_CATALOGUE } from '../src/data/gemstoneCatalogueData';

function pgEscape(str: string | null | undefined): string {
  if (str === null || str === undefined) return 'NULL';
  return "'" + str.replace(/'/g, "''") + "'";
}

function pgArray(arr: string[] | undefined): string {
  if (!arr || arr.length === 0) return "'{}'::text[]";
  const elements = arr.map(item => '"' + item.replace(/"/g, '\\"') + '"');
  return "'{" + elements.join(',') + "}'::text[]";
}

function pgJson(obj: any): string {
  if (obj === null || obj === undefined) return "'{}'::jsonb";
  const jsonStr = JSON.stringify(obj).replace(/'/g, "''");
  return "'" + jsonStr + "'::jsonb";
}

let sql = `-- ==============================================================================
-- LEO FAMILY GEMSTONE E-COMMERCE CATALOGUE SEED
-- Migration / Seed: supabase/seed/20261010_gemstone_catalogue_seed.sql
-- Target Table: public.gemstone_products
--
-- AUDIT & COMPLIANCE REQUIREMENTS MET:
-- 1. Exact data from src/data/gemstoneCatalogueData.ts (9 Vedic gemstones + Opal).
-- 2. Fully unpublished by default: is_published = false.
-- 3. Inventory set to zero and unavailable: stock_quantity = 0, in_stock = false.
--    Variant inventory is also set to 0 and inStock = false to prevent ordering.
-- 4. Certification marked unverified: certified = false,
--    labName = 'Uncertified - Pending Gemological Laboratory Testing',
--    natural = false (unverified/pending),
--    treatment = 'Unverified - Laboratory evaluation required to determine natural origin and treatments'.
-- 5. Opal Image Corrected: diamond.jpg substitute removed; Opal images set to empty '{}'::text[]
--    pending administrator upload via Admin Panel.
-- 6. Diamond / White Zircon Material Ambiguity Resolved: Preserves id 'gem-diamond' and slug 'diamond-heera',
--    marks product name as pending material confirmation, adds explicit adminReviewNotice in specifications,
--    and keeps unpublished until administrator confirms material and corrects specifications.
-- 7. Starter prices flagged as unverified draft reference values for admin review.
-- 8. Safe & idempotent: ON CONFLICT (id) DO NOTHING (never overwrites admin edits).
-- 9. Zero destructive operations (no DROP, TRUNCATE, DELETE).
-- ==============================================================================

DO $$
BEGIN
  RAISE NOTICE 'Starting safe catalogue seeding for public.gemstone_products...';
END $$;

`;

INITIAL_GEMSTONES_CATALOGUE.forEach((p) => {
  // Safe zero-inventory variants
  const safeVariants = (p.variants || []).map((v) => ({
    ...v,
    inStock: false,
    stockQuantity: 0,
    priceNote: 'Draft starter price - Pending admin verification'
  }));

  // Safe unverified certification semantics
  const safeCertification = {
    certified: false,
    labName: 'Uncertified - Pending Gemological Laboratory Testing',
    natural: false,
    treatment: 'Unverified - Laboratory evaluation required to determine natural origin and treatments',
    verificationStatus: 'unverified'
  };

  // Safe specifications with detailed review flags
  let adminNotice = 'DRAFT SEED: Starter reference price, weight, and specifications only. Gemological laboratory certificate, actual physical piece dimensions, and market pricing must be verified by administrator before publishing.';
  let imageStatus = 'VERIFIED_PRESET';

  if (p.id === 'gem-diamond') {
    adminNotice = 'MATERIAL IDENTITY AMBIGUITY: Diamond (Heera) and White Zircon (Safed Jarkan) are distinct gemological materials with differing astrological and monetary values. Administrator must inspect physical stock to confirm whether this item is Natural Diamond or White Zircon. Product name, specifications, pricing, and certificate must be corrected prior to publishing.';
  } else if (p.id === 'gem-opal') {
    adminNotice = 'PENDING ASSET UPLOAD: No authentic Opal photograph exists in project assets (do not use diamond.jpg). Upload verified Australian Opal photographs via Admin Panel before publishing.';
    imageStatus = 'PENDING_UPLOAD';
  }

  const safeSpecifications = {
    ...(p.specifications || {}),
    pricingVerificationStatus: 'UNVERIFIED_DRAFT_PRICE',
    certificationStatus: 'PENDING_LAB_VERIFICATION',
    authenticityGuarantee: 'UNVERIFIED_NO_LAB_CERTIFICATE',
    imageVerificationStatus: imageStatus,
    adminReviewNotice: adminNotice
  };

  if (p.id === 'gem-diamond') {
    safeSpecifications.materialIdentityStatus = 'AMBIGUOUS_UNVERIFIED';
  }

  // Opal images MUST be empty array (no diamond.jpg substitute)
  const productImages = p.id === 'gem-opal' ? [] : (p.images || []);

  sql += `-- ------------------------------------------------------------------------------\n`;
  sql += `-- Product: ${p.name} (${p.category}) [ID: ${p.id}, Slug: ${p.slug}]\n`;
  sql += `-- ------------------------------------------------------------------------------\n`;
  sql += `INSERT INTO public.gemstone_products (\n`;
  sql += `  id,\n`;
  sql += `  slug,\n`;
  sql += `  name,\n`;
  sql += `  hindi_name,\n`;
  sql += `  category,\n`;
  sql += `  planetary_ruler,\n`;
  sql += `  primary_deity,\n`;
  sql += `  benefit,\n`;
  sql += `  short_description,\n`;
  sql += `  description,\n`;
  sql += `  images,\n`;
  sql += `  price,\n`;
  sql += `  compare_at_price,\n`;
  sql += `  sku,\n`;
  sql += `  stock_quantity,\n`;
  sql += `  in_stock,\n`;
  sql += `  is_published,\n`;
  sql += `  is_featured,\n`;
  sql += `  certification,\n`;
  sql += `  specifications,\n`;
  sql += `  variants,\n`;
  sql += `  display_order,\n`;
  sql += `  created_at,\n`;
  sql += `  updated_at\n`;
  sql += `)\nVALUES (\n`;
  sql += `  ${pgEscape(p.id)},\n`;
  sql += `  ${pgEscape(p.slug)},\n`;
  sql += `  ${pgEscape(p.name)},\n`;
  sql += `  ${pgEscape(p.hindiName)},\n`;
  sql += `  ${pgEscape(p.category)},\n`;
  sql += `  ${pgEscape(p.planetaryRuler)},\n`;
  sql += `  ${pgEscape(p.primaryDeity || null)},\n`;
  sql += `  ${pgEscape(p.benefit || null)},\n`;
  sql += `  ${pgEscape(p.shortDescription)},\n`;
  sql += `  ${pgEscape(p.description)},\n`;
  sql += `  ${pgArray(productImages)},\n`;
  sql += `  ${p.price},\n`;
  sql += `  ${p.compareAtPrice ? p.compareAtPrice : 'NULL'},\n`;
  sql += `  ${pgEscape(p.sku)},\n`;
  sql += `  0,\n`;               // stock_quantity = 0
  sql += `  false,\n`;           // in_stock = false
  sql += `  false,\n`;           // is_published = false
  sql += `  false,\n`;           // is_featured = false
  sql += `  ${pgJson(safeCertification)},\n`;
  sql += `  ${pgJson(safeSpecifications)},\n`;
  sql += `  ${pgJson(safeVariants)},\n`;
  sql += `  ${p.displayOrder || 0},\n`;
  sql += `  NOW(),\n`;
  sql += `  NOW()\n`;
  sql += `)\nON CONFLICT (id) DO NOTHING;\n\n`;
});

sql += `-- Verify insertion count summary
DO $$
DECLARE
  seeded_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO seeded_count FROM public.gemstone_products;
  RAISE NOTICE 'Gemstone catalogue seeding complete. Current total gemstone products in database: %', seeded_count;
END $$;

-- Post-seed inspection query for Supabase SQL Editor:
-- SELECT id, slug, name, hindi_name, category, is_published, in_stock, stock_quantity, images, display_order
-- FROM public.gemstone_products
-- ORDER BY display_order ASC;
`;

const outDir = path.resolve('supabase/seed');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const outFile = path.join(outDir, '20261010_gemstone_catalogue_seed.sql');
fs.writeFileSync(outFile, sql, 'utf-8');
console.log(`Generated SQL seed successfully at: ${outFile}`);
console.log(`Total items seeded: ${INITIAL_GEMSTONES_CATALOGUE.length}`);
