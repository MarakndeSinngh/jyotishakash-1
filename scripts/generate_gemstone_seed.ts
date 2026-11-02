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
-- AUDIT & COMPLIANCE REQUIREMENTS:
-- 1. Source of truth: src/data/gemstoneCatalogueData.ts (10 original Vedic/Opal records + 12 popular variety candidates).
-- 2. All seed records remain unpublished, zero-stock and unavailable; all variant inventory is zero.
-- 3. Natural status is UNKNOWN until the physical stone or supporting documents are reviewed. UNKNOWN is not synthetic.
-- 4. Product and variant prices are unverified reference values. New popular candidates use INR 1 only as a NOT NULL database sentinel;
--    the sentinel is never shown as a customer price and cannot be approved as a commercial price.
-- 5. Assigned images are PENDING_VERIFICATION; missing images are PENDING_UPLOAD. Opal keeps an empty image array.
-- 6. Diamond / White Zircon preserves its stable ID and slug and stays explicitly ambiguous until physical stock is identified.
-- 7. Popular candidates are not represented as LEO Family sales rankings.
-- 8. Seed is idempotent: ON CONFLICT (id) DO NOTHING; administrator changes are never overwritten.
-- 9. No destructive SQL or unrelated-table changes are generated.
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
    priceVerificationStatus: 'UNVERIFIED_DRAFT_PRICE'
  }));

  // Safe unverified certification semantics
  const safeCertification = {
    certified: false,
    labName: '',
    natural: false,
    naturalStatus: 'UNKNOWN',
    treatment: 'Pending gemological verification',
    verificationStatus: 'PENDING_VERIFICATION'
  };

  // Safe specifications with detailed review flags
  let adminNotice = p.specifications?.adminReviewNotice
    || 'STARTER DRAFT: Description, origin, weight, and price values are references only. Verify the actual physical stone, material identity, treatments, origin, price, authentic photo, certificate, and stock before publication.';
  let imageStatus = p.images && p.images.length > 0 ? 'PENDING_VERIFICATION' : 'PENDING_UPLOAD';

  if (p.id === 'gem-diamond') {
    adminNotice = 'MATERIAL IDENTITY AMBIGUITY: Diamond (Heera) and White Zircon (Safed Jarkan) are distinct materials. Inspect physical stock and confirm one identity before changing the title, price, specifications, or publication status.';
  } else if (p.id === 'gem-opal') {
    adminNotice = 'PENDING ASSET UPLOAD: No verified Opal photograph is present in project assets. Keep images empty; upload a genuine product photo and approve it before publication.';
    imageStatus = 'PENDING_UPLOAD';
  } else if (p.specifications?.catalogueResearchStatus === 'POPULAR_VARIETY_CANDIDATE_NOT_LEO_SALES_RANKING') {
    adminNotice = p.specifications.adminReviewNotice
      || 'POPULAR VARIETY CANDIDATE: This is not a verified LEO sales ranking. Confirm exact material/species, origin, treatment, quality, current price, photo, certificate, and stock before publication.';
  }

  const safeSpecifications = {
    ...(p.specifications || {}),
    pricingVerificationStatus: 'UNVERIFIED_DRAFT_PRICE',
    materialIdentityStatus: p.id === 'gem-diamond' ? 'AMBIGUOUS_UNVERIFIED' : (p.specifications?.materialIdentityStatus || 'PENDING_VERIFICATION'),
    certificationStatus: 'PENDING_LAB_VERIFICATION',
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
-- SELECT id, slug, name, category, price, is_published, in_stock, stock_quantity, certification, specifications, variants, display_order
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
console.log(`Total draft products generated: ${INITIAL_GEMSTONES_CATALOGUE.length}`);
console.log('All products remain unpublished, out of stock, and unverified; this script generates SQL only and does not execute it.');
