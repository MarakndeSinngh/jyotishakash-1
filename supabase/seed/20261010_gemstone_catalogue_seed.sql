-- ==============================================================================
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

-- ------------------------------------------------------------------------------
-- Product: Natural Burmese Ruby (Ruby) [ID: gem-ruby, Slug: ruby-manik]
-- ------------------------------------------------------------------------------
INSERT INTO public.gemstone_products (
  id,
  slug,
  name,
  hindi_name,
  category,
  planetary_ruler,
  primary_deity,
  benefit,
  short_description,
  description,
  images,
  price,
  compare_at_price,
  sku,
  stock_quantity,
  in_stock,
  is_published,
  is_featured,
  certification,
  specifications,
  variants,
  display_order,
  created_at,
  updated_at
)
VALUES (
  'gem-ruby',
  'ruby-manik',
  'Natural Burmese Ruby',
  'Manik (माणिक)',
  'Ruby',
  'The Sun (Surya Dev)',
  'Lord Surya',
  'Enhances leadership, vital energy, and self-confidence. It strengthens the soul''s purpose and brings clarity to one''s professional path.',
  'Royal Vedic Manikya stone aligned with the Sun to ignite authority, vitality, and professional success.',
  'The Ruby (Manikya) is the king of gemstones, ruled by the Sun (Surya Dev). Known for radiating fiery solar energy, this sacred gemstone empowers the wearer with self-discipline, command, vital stamina, and elevated social standing. Carefully sourced and consecrated according to authentic Vedic rites under the personal guidance of LEO Family masters.',
  '{"/gemstone-assets/ruby.jpg"}'::text[],
  15500,
  18500,
  'LEO-RUB-01',
  0,
  false,
  false,
  false,
  '{"certified":false,"labName":"Uncertified - Pending Gemological Laboratory Testing","natural":false,"treatment":"Unverified - Laboratory evaluation required to determine natural origin and treatments","verificationStatus":"unverified"}'::jsonb,
  '{"caratWeight":"4.25 Ratti / 3.89 Carat","origin":"Old Burma (Myanmar)","shape":"Oval Mixed Cut","color":"Pigeon Blood Red","transparency":"Transparent","energizationStatus":"Vedic Pran Pratishtha & Surya Beej Mantra Chanted","metalRecommendation":"Gold or Copper","wearingFinger":"Ring Finger of Right Hand","wearingDayMuhurat":"Sunday Sunrise during Shukla Paksha","pricingVerificationStatus":"UNVERIFIED_DRAFT_PRICE","certificationStatus":"PENDING_LAB_VERIFICATION","authenticityGuarantee":"UNVERIFIED_NO_LAB_CERTIFICATE","imageVerificationStatus":"VERIFIED_PRESET","adminReviewNotice":"DRAFT SEED: Starter reference price, weight, and specifications only. Gemological laboratory certificate, actual physical piece dimensions, and market pricing must be verified by administrator before publishing."}'::jsonb,
  '[{"id":"var-rub-325","name":"3.25 Ratti (Burmese)","carat":2.97,"ratti":3.25,"origin":"Old Burma","shape":"Oval","price":12500,"compareAtPrice":14500,"sku":"LEO-RUB-325","inStock":false,"stockQuantity":0,"priceNote":"Draft starter price - Pending admin verification"},{"id":"var-rub-425","name":"4.25 Ratti (Burmese - Prime)","carat":3.89,"ratti":4.25,"origin":"Old Burma","shape":"Oval","price":15500,"compareAtPrice":18500,"sku":"LEO-RUB-425","inStock":false,"stockQuantity":0,"priceNote":"Draft starter price - Pending admin verification"},{"id":"var-rub-550","name":"5.50 Ratti (African Premium)","carat":5.03,"ratti":5.5,"origin":"Mozambique","shape":"Cushion","price":19800,"compareAtPrice":23000,"sku":"LEO-RUB-550","inStock":false,"stockQuantity":0,"priceNote":"Draft starter price - Pending admin verification"}]'::jsonb,
  1,
  NOW(),
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- ------------------------------------------------------------------------------
-- Product: Natural Basra-Quality Pearl (Natural Pearl) [ID: gem-pearl, Slug: natural-pearl-moti]
-- ------------------------------------------------------------------------------
INSERT INTO public.gemstone_products (
  id,
  slug,
  name,
  hindi_name,
  category,
  planetary_ruler,
  primary_deity,
  benefit,
  short_description,
  description,
  images,
  price,
  compare_at_price,
  sku,
  stock_quantity,
  in_stock,
  is_published,
  is_featured,
  certification,
  specifications,
  variants,
  display_order,
  created_at,
  updated_at
)
VALUES (
  'gem-pearl',
  'natural-pearl-moti',
  'Natural Basra-Quality Pearl',
  'Moti (मोती)',
  'Natural Pearl',
  'The Moon (Chandra Dev)',
  'Lord Chandra',
  'Harmonizes the mind, reduces anxiety, and brings emotional stability. Essential for maintaining a calm, creative flow and inner peace.',
  'Lustrous natural pearl blessed with lunar calmness for mental peace, emotional serenity, and intuition.',
  'The Natural Pearl (Mukta / Moti) is governed by the Moon (Chandra), the cosmic significator of the mind and emotions. It balances water elements in the human aura, relieves stress, and nurtures harmonious relationships. Every pearl is handpicked for its pure silvery orient and authentic organic origin.',
  '{"/gemstone-assets/pearl.jpg"}'::text[],
  8500,
  10500,
  'LEO-PRL-01',
  0,
  false,
  false,
  false,
  '{"certified":false,"labName":"Uncertified - Pending Gemological Laboratory Testing","natural":false,"treatment":"Unverified - Laboratory evaluation required to determine natural origin and treatments","verificationStatus":"unverified"}'::jsonb,
  '{"caratWeight":"5.50 Ratti / 5.03 Carat","origin":"South Sea / Basra Grade","shape":"Round Spherical","color":"Silvery Moonlit White","transparency":"Opaque with Silky Luster","energizationStatus":"Vedic Chandra Mantra Pran Pratishtha","metalRecommendation":"Pure Silver","wearingFinger":"Little Finger of Right Hand","wearingDayMuhurat":"Monday Evening during Shukla Paksha","pricingVerificationStatus":"UNVERIFIED_DRAFT_PRICE","certificationStatus":"PENDING_LAB_VERIFICATION","authenticityGuarantee":"UNVERIFIED_NO_LAB_CERTIFICATE","imageVerificationStatus":"VERIFIED_PRESET","adminReviewNotice":"DRAFT SEED: Starter reference price, weight, and specifications only. Gemological laboratory certificate, actual physical piece dimensions, and market pricing must be verified by administrator before publishing."}'::jsonb,
  '[{"id":"var-prl-450","name":"4.50 Ratti (Pure White)","carat":4.12,"ratti":4.5,"origin":"South Sea","shape":"Round","price":7200,"compareAtPrice":8900,"sku":"LEO-PRL-450","inStock":false,"stockQuantity":0,"priceNote":"Draft starter price - Pending admin verification"},{"id":"var-prl-550","name":"5.50 Ratti (Basra Grade)","carat":5.03,"ratti":5.5,"origin":"South Sea","shape":"Round","price":8500,"compareAtPrice":10500,"sku":"LEO-PRL-550","inStock":false,"stockQuantity":0,"priceNote":"Draft starter price - Pending admin verification"},{"id":"var-prl-725","name":"7.25 Ratti (Royal Lustre)","carat":6.63,"ratti":7.25,"origin":"South Sea","shape":"Round","price":11900,"compareAtPrice":14000,"sku":"LEO-PRL-725","inStock":false,"stockQuantity":0,"priceNote":"Draft starter price - Pending admin verification"}]'::jsonb,
  2,
  NOW(),
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- ------------------------------------------------------------------------------
-- Product: Natural Italian Red Coral (Red Coral) [ID: gem-red-coral, Slug: red-coral-moonga]
-- ------------------------------------------------------------------------------
INSERT INTO public.gemstone_products (
  id,
  slug,
  name,
  hindi_name,
  category,
  planetary_ruler,
  primary_deity,
  benefit,
  short_description,
  description,
  images,
  price,
  compare_at_price,
  sku,
  stock_quantity,
  in_stock,
  is_published,
  is_featured,
  certification,
  specifications,
  variants,
  display_order,
  created_at,
  updated_at
)
VALUES (
  'gem-red-coral',
  'red-coral-moonga',
  'Natural Italian Red Coral',
  'Moonga (मूँगा)',
  'Red Coral',
  'Mars (Mangal Dev)',
  'Lord Mangal / Hanuman Ji',
  'Ignites courage, physical stamina, and the drive to overcome obstacles. A powerful stone for vitality and protection from negative energies.',
  'Deep vermilion Italian Moonga stone transmitting Martian stamina, vitality, and unshakeable courage.',
  'Red Coral (Praval / Moonga) channels the dynamic, courageous frequency of planet Mars (Mangal). Recommended for individuals seeking physical stamina, property success, competitive victory, and relief from lethargy. Sanctified under authentic Mangal Vedic rituals.',
  '{"/gemstone-assets/red-coral.jpg"}'::text[],
  9800,
  12000,
  'LEO-CRL-01',
  0,
  false,
  false,
  false,
  '{"certified":false,"labName":"Uncertified - Pending Gemological Laboratory Testing","natural":false,"treatment":"Unverified - Laboratory evaluation required to determine natural origin and treatments","verificationStatus":"unverified"}'::jsonb,
  '{"caratWeight":"6.25 Ratti / 5.72 Carat","origin":"Mediterranean (Italian)","shape":"Capsule / Triangular Cabochon","color":"Ox-Blood Red","transparency":"Opaque with Porcelain Finish","energizationStatus":"Mangal Beej Mantra & Hanuman Chalisa Abhimantrit","metalRecommendation":"Copper or Gold","wearingFinger":"Ring Finger of Right Hand","wearingDayMuhurat":"Tuesday Morning at Sunrise","pricingVerificationStatus":"UNVERIFIED_DRAFT_PRICE","certificationStatus":"PENDING_LAB_VERIFICATION","authenticityGuarantee":"UNVERIFIED_NO_LAB_CERTIFICATE","imageVerificationStatus":"VERIFIED_PRESET","adminReviewNotice":"DRAFT SEED: Starter reference price, weight, and specifications only. Gemological laboratory certificate, actual physical piece dimensions, and market pricing must be verified by administrator before publishing."}'::jsonb,
  '[{"id":"var-crl-525","name":"5.25 Ratti (Italian Capsule)","carat":4.81,"ratti":5.25,"origin":"Italian","shape":"Capsule","price":8500,"compareAtPrice":10500,"sku":"LEO-CRL-525","inStock":false,"stockQuantity":0,"priceNote":"Draft starter price - Pending admin verification"},{"id":"var-crl-625","name":"6.25 Ratti (Italian Prime)","carat":5.72,"ratti":6.25,"origin":"Italian","shape":"Capsule","price":9800,"compareAtPrice":12000,"sku":"LEO-CRL-625","inStock":false,"stockQuantity":0,"priceNote":"Draft starter price - Pending admin verification"},{"id":"var-crl-750","name":"7.50 Ratti (Triangular Mars Cut)","carat":6.86,"ratti":7.5,"origin":"Italian","shape":"Triangular","price":12500,"compareAtPrice":15000,"sku":"LEO-CRL-750","inStock":false,"stockQuantity":0,"priceNote":"Draft starter price - Pending admin verification"}]'::jsonb,
  3,
  NOW(),
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- ------------------------------------------------------------------------------
-- Product: Natural Zambian Emerald (Emerald) [ID: gem-emerald, Slug: emerald-panna]
-- ------------------------------------------------------------------------------
INSERT INTO public.gemstone_products (
  id,
  slug,
  name,
  hindi_name,
  category,
  planetary_ruler,
  primary_deity,
  benefit,
  short_description,
  description,
  images,
  price,
  compare_at_price,
  sku,
  stock_quantity,
  in_stock,
  is_published,
  is_featured,
  certification,
  specifications,
  variants,
  display_order,
  created_at,
  updated_at
)
VALUES (
  'gem-emerald',
  'emerald-panna',
  'Natural Zambian Emerald',
  'Panna (पन्ना)',
  'Emerald',
  'Mercury (Budh Dev)',
  'Lord Budh',
  'Sharpens intellect, memory, and communication skills. Perfect for those seeking mental clarity and success in business and education.',
  'Lush green emerald radiating Mercury’s intellect, commercial acumen, and sharp expressive eloquence.',
  'Emerald (Marakatha / Panna) governs Mercury (Budh), the planet of commercial intelligence, analytical prowess, and communication. It revitalizes the nervous system, unlocks mathematical clarity, and attracts lucrative business prospects.',
  '{"/gemstone-assets/emerald.jpg"}'::text[],
  16800,
  20500,
  'LEO-EMR-01',
  0,
  false,
  false,
  false,
  '{"certified":false,"labName":"Uncertified - Pending Gemological Laboratory Testing","natural":false,"treatment":"Unverified - Laboratory evaluation required to determine natural origin and treatments","verificationStatus":"unverified"}'::jsonb,
  '{"caratWeight":"4.50 Ratti / 4.12 Carat","origin":"Zambia (Kagem Mine)","shape":"Octagonal Emerald Cut","color":"Vivid Forest Green","transparency":"Transparent with Natural Jardins","energizationStatus":"Budh Gayatri Mantra Pran Pratishtha","metalRecommendation":"Gold, Silver or Panchdhatu","wearingFinger":"Little Finger of Right Hand","wearingDayMuhurat":"Wednesday Morning two hours after Sunrise","pricingVerificationStatus":"UNVERIFIED_DRAFT_PRICE","certificationStatus":"PENDING_LAB_VERIFICATION","authenticityGuarantee":"UNVERIFIED_NO_LAB_CERTIFICATE","imageVerificationStatus":"VERIFIED_PRESET","adminReviewNotice":"DRAFT SEED: Starter reference price, weight, and specifications only. Gemological laboratory certificate, actual physical piece dimensions, and market pricing must be verified by administrator before publishing."}'::jsonb,
  '[{"id":"var-emr-350","name":"3.50 Ratti (Zambian Bright)","carat":3.2,"ratti":3.5,"origin":"Zambia","shape":"Emerald Cut","price":13500,"compareAtPrice":16500,"sku":"LEO-EMR-350","inStock":false,"stockQuantity":0,"priceNote":"Draft starter price - Pending admin verification"},{"id":"var-emr-450","name":"4.50 Ratti (Zambian Vivid)","carat":4.12,"ratti":4.5,"origin":"Zambia","shape":"Emerald Cut","price":16800,"compareAtPrice":20500,"sku":"LEO-EMR-450","inStock":false,"stockQuantity":0,"priceNote":"Draft starter price - Pending admin verification"},{"id":"var-emr-575","name":"5.75 Ratti (Colombian High Luster)","carat":5.26,"ratti":5.75,"origin":"Colombia","shape":"Oval","price":24500,"compareAtPrice":29000,"sku":"LEO-EMR-575","inStock":false,"stockQuantity":0,"priceNote":"Draft starter price - Pending admin verification"}]'::jsonb,
  4,
  NOW(),
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- ------------------------------------------------------------------------------
-- Product: Natural Ceylon Yellow Sapphire (Yellow Sapphire) [ID: gem-yellow-sapphire, Slug: yellow-sapphire-pukhraj]
-- ------------------------------------------------------------------------------
INSERT INTO public.gemstone_products (
  id,
  slug,
  name,
  hindi_name,
  category,
  planetary_ruler,
  primary_deity,
  benefit,
  short_description,
  description,
  images,
  price,
  compare_at_price,
  sku,
  stock_quantity,
  in_stock,
  is_published,
  is_featured,
  certification,
  specifications,
  variants,
  display_order,
  created_at,
  updated_at
)
VALUES (
  'gem-yellow-sapphire',
  'yellow-sapphire-pukhraj',
  'Natural Ceylon Yellow Sapphire',
  'Pukhraj (पुखराज)',
  'Yellow Sapphire',
  'Jupiter (Brihaspati Dev)',
  'Lord Brihaspati',
  'The stone of wisdom, prosperity, and spiritual growth. It aligns the wearer with the frequency of abundance and divine grace.',
  'Golden Ceylon Pukhraj unlocking divine Guru blessings, immense wealth, and higher spiritual wisdom.',
  'Yellow Sapphire (Pushparag / Pukhraj) channels Guru (Brihaspati), the supreme benefic planet overseeing fortune, righteousness, higher knowledge, and auspicious family blessings. Sourced from the gem-rich river gravels of Ratnapura, Sri Lanka.',
  '{"/gemstone-assets/yellow-sapphire.jpg"}'::text[],
  21000,
  25000,
  'LEO-PUK-01',
  0,
  false,
  false,
  false,
  '{"certified":false,"labName":"Uncertified - Pending Gemological Laboratory Testing","natural":false,"treatment":"Unverified - Laboratory evaluation required to determine natural origin and treatments","verificationStatus":"unverified"}'::jsonb,
  '{"caratWeight":"5.25 Ratti / 4.81 Carat","origin":"Ceylon (Sri Lanka - Ratnapura)","shape":"Cushion Mixed Cut","color":"Canary Yellow / Golden Hue","transparency":"Brilliantly Transparent","energizationStatus":"Brihaspati Beej Mantra Consecrated","metalRecommendation":"Pure Yellow Gold or Panchdhatu","wearingFinger":"Index Finger of Right Hand","wearingDayMuhurat":"Thursday Morning at Sunrise","pricingVerificationStatus":"UNVERIFIED_DRAFT_PRICE","certificationStatus":"PENDING_LAB_VERIFICATION","authenticityGuarantee":"UNVERIFIED_NO_LAB_CERTIFICATE","imageVerificationStatus":"VERIFIED_PRESET","adminReviewNotice":"DRAFT SEED: Starter reference price, weight, and specifications only. Gemological laboratory certificate, actual physical piece dimensions, and market pricing must be verified by administrator before publishing."}'::jsonb,
  '[{"id":"var-puk-375","name":"3.75 Ratti (Ceylon Bright)","carat":3.43,"ratti":3.75,"origin":"Ceylon","shape":"Cushion","price":16500,"compareAtPrice":19500,"sku":"LEO-PUK-375","inStock":false,"stockQuantity":0,"priceNote":"Draft starter price - Pending admin verification"},{"id":"var-puk-525","name":"5.25 Ratti (Ceylon Prime)","carat":4.81,"ratti":5.25,"origin":"Ceylon","shape":"Cushion","price":21000,"compareAtPrice":25000,"sku":"LEO-PUK-525","inStock":false,"stockQuantity":0,"priceNote":"Draft starter price - Pending admin verification"},{"id":"var-puk-710","name":"7.10 Ratti (Royal Golden Ceylon)","carat":6.5,"ratti":7.1,"origin":"Ceylon","shape":"Oval","price":29500,"compareAtPrice":35000,"sku":"LEO-PUK-710","inStock":false,"stockQuantity":0,"priceNote":"Draft starter price - Pending admin verification"}]'::jsonb,
  5,
  NOW(),
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- ------------------------------------------------------------------------------
-- Product: Vedic Diamond / White Zircon (Pending Material Confirmation) (Diamond) [ID: gem-diamond, Slug: diamond-heera]
-- ------------------------------------------------------------------------------
INSERT INTO public.gemstone_products (
  id,
  slug,
  name,
  hindi_name,
  category,
  planetary_ruler,
  primary_deity,
  benefit,
  short_description,
  description,
  images,
  price,
  compare_at_price,
  sku,
  stock_quantity,
  in_stock,
  is_published,
  is_featured,
  certification,
  specifications,
  variants,
  display_order,
  created_at,
  updated_at
)
VALUES (
  'gem-diamond',
  'diamond-heera',
  'Vedic Diamond / White Zircon (Pending Material Confirmation)',
  'Heera (हीरा)',
  'Diamond',
  'Venus (Shukra Dev)',
  'Goddess Mahalakshmi / Shukra Dev',
  'Attracts luxury, artistic refinement, and harmonious relationships. Enhances the quality of life and brings beauty to one’s surroundings.',
  'Scintillating Venusian gemstone for artistic luxury, magnetic charisma, and marital harmony.',
  'Diamond (Vajra / Heera) channels Shukra (Venus), the deity of sensual luxury, aesthetics, romance, and financial opulence. Known for indestructible hardness and prismatic fire, it magnifies the wearer’s aura and social magnetism.',
  '{"/gemstone-assets/diamond.jpg"}'::text[],
  32000,
  38000,
  'LEO-HRA-01',
  0,
  false,
  false,
  false,
  '{"certified":false,"labName":"Uncertified - Pending Gemological Laboratory Testing","natural":false,"treatment":"Unverified - Laboratory evaluation required to determine natural origin and treatments","verificationStatus":"unverified"}'::jsonb,
  '{"caratWeight":"1.15 Carat (VVS Clarity / E Color)","origin":"Natural Earth Mined","shape":"Round Brilliant Cut","color":"Colorless / D-F Grade","transparency":"Exceptional Brilliance","energizationStatus":"Shukra Gayatri & Mahalakshmi Mantra Abhimantrit","metalRecommendation":"Platinum, White Gold or Silver","wearingFinger":"Middle or Little Finger of Right Hand","wearingDayMuhurat":"Friday Morning at Sunrise","pricingVerificationStatus":"UNVERIFIED_DRAFT_PRICE","materialIdentityStatus":"AMBIGUOUS_UNVERIFIED","adminReviewNotice":"MATERIAL IDENTITY AMBIGUITY: Diamond (Heera) and White Zircon (Safed Jarkan) are distinct gemological materials with differing astrological and monetary values. Administrator must inspect physical stock to confirm whether this item is Natural Diamond or White Zircon. Product name, specifications, pricing, and certificate must be corrected prior to publishing.","certificationStatus":"PENDING_LAB_VERIFICATION","authenticityGuarantee":"UNVERIFIED_NO_LAB_CERTIFICATE","imageVerificationStatus":"VERIFIED_PRESET"}'::jsonb,
  '[{"id":"var-hra-075","name":"0.75 Carat (VS1 / G-Color)","carat":0.75,"ratti":0.82,"origin":"Natural Earth Mined","shape":"Round","price":24000,"compareAtPrice":28000,"sku":"LEO-HRA-075","inStock":false,"stockQuantity":0,"priceNote":"Draft starter price - Pending admin verification"},{"id":"var-hra-115","name":"1.15 Carat (VVS / E-Color Prime)","carat":1.15,"ratti":1.25,"origin":"Natural Earth Mined","shape":"Round","price":32000,"compareAtPrice":38000,"sku":"LEO-HRA-115","inStock":false,"stockQuantity":0,"priceNote":"Draft starter price - Pending admin verification"}]'::jsonb,
  6,
  NOW(),
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- ------------------------------------------------------------------------------
-- Product: Natural Ceylon Blue Sapphire (Blue Sapphire) [ID: gem-blue-sapphire, Slug: blue-sapphire-neelam]
-- ------------------------------------------------------------------------------
INSERT INTO public.gemstone_products (
  id,
  slug,
  name,
  hindi_name,
  category,
  planetary_ruler,
  primary_deity,
  benefit,
  short_description,
  description,
  images,
  price,
  compare_at_price,
  sku,
  stock_quantity,
  in_stock,
  is_published,
  is_featured,
  certification,
  specifications,
  variants,
  display_order,
  created_at,
  updated_at
)
VALUES (
  'gem-blue-sapphire',
  'blue-sapphire-neelam',
  'Natural Ceylon Blue Sapphire',
  'Neelam (नीलम)',
  'Blue Sapphire',
  'Saturn (Shani Dev)',
  'Lord Shani Dev',
  'A powerful catalyst for discipline, focus, and karmic balance. Known for its ability to clear blockages and provide strong protection.',
  'Deep royal blue Neelam with potent Shani frequency for karmic resolution, focus, and massive breakthroughs.',
  'Blue Sapphire (Neelashma / Neelam) is the most swift and potent gemstone in Vedic astrology, ruled by Saturn (Shani Dev). It awards unwavering focus, shields against malevolent forces, and dissolves longstanding karmic obstacles when aligned with one’s horoscope.',
  '{"/gemstone-assets/blue-sapphire.jpg"}'::text[],
  24500,
  29000,
  'LEO-NLM-01',
  0,
  false,
  false,
  false,
  '{"certified":false,"labName":"Uncertified - Pending Gemological Laboratory Testing","natural":false,"treatment":"Unverified - Laboratory evaluation required to determine natural origin and treatments","verificationStatus":"unverified"}'::jsonb,
  '{"caratWeight":"4.85 Ratti / 4.44 Carat","origin":"Ceylon (Sri Lanka)","shape":"Cushion Mixed Cut","color":"Royal Cornflower Blue","transparency":"Transparent with Velvety Luster","energizationStatus":"Shani Shanti & Vedic Shani Gayatri Abhimantrit","metalRecommendation":"Panchdhatu, Silver or White Gold","wearingFinger":"Middle Finger of Right Hand","wearingDayMuhurat":"Saturday Evening at Twilight","pricingVerificationStatus":"UNVERIFIED_DRAFT_PRICE","certificationStatus":"PENDING_LAB_VERIFICATION","authenticityGuarantee":"UNVERIFIED_NO_LAB_CERTIFICATE","imageVerificationStatus":"VERIFIED_PRESET","adminReviewNotice":"DRAFT SEED: Starter reference price, weight, and specifications only. Gemological laboratory certificate, actual physical piece dimensions, and market pricing must be verified by administrator before publishing."}'::jsonb,
  '[{"id":"var-nlm-350","name":"3.50 Ratti (Ceylon Blue)","carat":3.2,"ratti":3.5,"origin":"Ceylon","shape":"Oval","price":18500,"compareAtPrice":22000,"sku":"LEO-NLM-350","inStock":false,"stockQuantity":0,"priceNote":"Draft starter price - Pending admin verification"},{"id":"var-nlm-485","name":"4.85 Ratti (Royal Ceylon Prime)","carat":4.44,"ratti":4.85,"origin":"Ceylon","shape":"Cushion","price":24500,"compareAtPrice":29000,"sku":"LEO-NLM-485","inStock":false,"stockQuantity":0,"priceNote":"Draft starter price - Pending admin verification"},{"id":"var-nlm-650","name":"6.50 Ratti (Deep Cornflower)","carat":5.95,"ratti":6.5,"origin":"Ceylon","shape":"Cushion","price":34000,"compareAtPrice":40000,"sku":"LEO-NLM-650","inStock":false,"stockQuantity":0,"priceNote":"Draft starter price - Pending admin verification"}]'::jsonb,
  7,
  NOW(),
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- ------------------------------------------------------------------------------
-- Product: Natural Ceylon Hessonite Garnet (Hessonite) [ID: gem-hessonite, Slug: hessonite-gomed]
-- ------------------------------------------------------------------------------
INSERT INTO public.gemstone_products (
  id,
  slug,
  name,
  hindi_name,
  category,
  planetary_ruler,
  primary_deity,
  benefit,
  short_description,
  description,
  images,
  price,
  compare_at_price,
  sku,
  stock_quantity,
  in_stock,
  is_published,
  is_featured,
  certification,
  specifications,
  variants,
  display_order,
  created_at,
  updated_at
)
VALUES (
  'gem-hessonite',
  'hessonite-gomed',
  'Natural Ceylon Hessonite Garnet',
  'Gomed (गोमेद)',
  'Hessonite',
  'Rahu (North Lunar Node)',
  'Rahu Dev',
  'Provides mental clarity and relief from confusion. It helps in managing sudden life changes and fuels innovative, strategic thinking.',
  'Cinnamon honey Gomed stone designed to pacify shadow planet Rahu and inspire strategic victories.',
  'Hessonite (Gomedhikam / Gomed) is the designated sacred stone of shadow planet Rahu. It clears illusions, calms overactive overthinking, shields from secret adversaries, and fosters unconventional success in politics, technology, and public leadership.',
  '{"/gemstone-assets/gomed.jpg"}'::text[],
  7800,
  9500,
  'LEO-GOM-01',
  0,
  false,
  false,
  false,
  '{"certified":false,"labName":"Uncertified - Pending Gemological Laboratory Testing","natural":false,"treatment":"Unverified - Laboratory evaluation required to determine natural origin and treatments","verificationStatus":"unverified"}'::jsonb,
  '{"caratWeight":"5.80 Ratti / 5.31 Carat","origin":"Ceylon (Sri Lanka)","shape":"Oval Mixed Cut","color":"Honey Brown / Deep Cinnamon","transparency":"Transparent with characteristic treacle swirl","energizationStatus":"Rahu Beej Mantra Sanctified","metalRecommendation":"Silver or Ashtadhatu","wearingFinger":"Middle Finger of Right Hand","wearingDayMuhurat":"Saturday Evening or Wednesday Evening","pricingVerificationStatus":"UNVERIFIED_DRAFT_PRICE","certificationStatus":"PENDING_LAB_VERIFICATION","authenticityGuarantee":"UNVERIFIED_NO_LAB_CERTIFICATE","imageVerificationStatus":"VERIFIED_PRESET","adminReviewNotice":"DRAFT SEED: Starter reference price, weight, and specifications only. Gemological laboratory certificate, actual physical piece dimensions, and market pricing must be verified by administrator before publishing."}'::jsonb,
  '[{"id":"var-gom-450","name":"4.50 Ratti (Ceylon Honey)","carat":4.12,"ratti":4.5,"origin":"Ceylon","shape":"Oval","price":6500,"compareAtPrice":8000,"sku":"LEO-GOM-450","inStock":false,"stockQuantity":0,"priceNote":"Draft starter price - Pending admin verification"},{"id":"var-gom-580","name":"5.80 Ratti (Ceylon Prime)","carat":5.31,"ratti":5.8,"origin":"Ceylon","shape":"Oval","price":7800,"compareAtPrice":9500,"sku":"LEO-GOM-580","inStock":false,"stockQuantity":0,"priceNote":"Draft starter price - Pending admin verification"},{"id":"var-gom-750","name":"7.50 Ratti (Deep Cinnamon)","carat":6.86,"ratti":7.5,"origin":"Ceylon","shape":"Oval","price":10500,"compareAtPrice":13000,"sku":"LEO-GOM-750","inStock":false,"stockQuantity":0,"priceNote":"Draft starter price - Pending admin verification"}]'::jsonb,
  8,
  NOW(),
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- ------------------------------------------------------------------------------
-- Product: Natural Chrysoberyl Cat’s Eye (Cat’s Eye) [ID: gem-cats-eye, Slug: cats-eye-lehsunia]
-- ------------------------------------------------------------------------------
INSERT INTO public.gemstone_products (
  id,
  slug,
  name,
  hindi_name,
  category,
  planetary_ruler,
  primary_deity,
  benefit,
  short_description,
  description,
  images,
  price,
  compare_at_price,
  sku,
  stock_quantity,
  in_stock,
  is_published,
  is_featured,
  certification,
  specifications,
  variants,
  display_order,
  created_at,
  updated_at
)
VALUES (
  'gem-cats-eye',
  'cats-eye-lehsunia',
  'Natural Chrysoberyl Cat’s Eye',
  'Lehsunia (लहसुनिया)',
  'Cat’s Eye',
  'Ketu (South Lunar Node)',
  'Ketu Dev / Lord Ganesha',
  'Offers spiritual protection and shields against hidden obstacles. Enhances intuition and aids in spiritual detachment and enlightenment.',
  'Sharp chatoyant Chrysoberyl Cat’s Eye for psychic shielding, spiritual protection, and Ketu balance.',
  'Cat’s Eye (Vaidoorya / Lehsunia) is ruled by Ketu, the spiritual catalyst representing Moksha, intuition, and liberation from sudden perils. Featuring a striking, razor-sharp chatoyant milk-and-honey band across the surface, it guards against negativity and restores spiritual clarity.',
  '{"/gemstone-assets/cats-eye.jpg"}'::text[],
  11200,
  13500,
  'LEO-CAT-01',
  0,
  false,
  false,
  false,
  '{"certified":false,"labName":"Uncertified - Pending Gemological Laboratory Testing","natural":false,"treatment":"Unverified - Laboratory evaluation required to determine natural origin and treatments","verificationStatus":"unverified"}'::jsonb,
  '{"caratWeight":"4.75 Ratti / 4.35 Carat","origin":"Orissa (India) / Ceylon","shape":"Oval Cabochon with Sharp Chatoyancy","color":"Greenish Yellow (Chrysoberyl)","transparency":"Translucent with Ray Effect","energizationStatus":"Ketu Beej Mantra & Ganesha Pratishtha","metalRecommendation":"Silver or Panchdhatu","wearingFinger":"Middle or Ring Finger of Right Hand","wearingDayMuhurat":"Tuesday or Thursday Midnight / Twilight","pricingVerificationStatus":"UNVERIFIED_DRAFT_PRICE","certificationStatus":"PENDING_LAB_VERIFICATION","authenticityGuarantee":"UNVERIFIED_NO_LAB_CERTIFICATE","imageVerificationStatus":"VERIFIED_PRESET","adminReviewNotice":"DRAFT SEED: Starter reference price, weight, and specifications only. Gemological laboratory certificate, actual physical piece dimensions, and market pricing must be verified by administrator before publishing."}'::jsonb,
  '[{"id":"var-cat-375","name":"3.75 Ratti (Sharp Band)","carat":3.43,"ratti":3.75,"origin":"Ceylon","shape":"Cabochon","price":9200,"compareAtPrice":11000,"sku":"LEO-CAT-375","inStock":false,"stockQuantity":0,"priceNote":"Draft starter price - Pending admin verification"},{"id":"var-cat-475","name":"4.75 Ratti (Prime Chatoyant)","carat":4.35,"ratti":4.75,"origin":"Ceylon","shape":"Cabochon","price":11200,"compareAtPrice":13500,"sku":"LEO-CAT-475","inStock":false,"stockQuantity":0,"priceNote":"Draft starter price - Pending admin verification"},{"id":"var-cat-625","name":"6.25 Ratti (Golden Ray Chrysoberyl)","carat":5.72,"ratti":6.25,"origin":"Ceylon","shape":"Cabochon","price":15800,"compareAtPrice":19000,"sku":"LEO-CAT-625","inStock":false,"stockQuantity":0,"priceNote":"Draft starter price - Pending admin verification"}]'::jsonb,
  9,
  NOW(),
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- ------------------------------------------------------------------------------
-- Product: Natural Australian Fire Opal (Opal) [ID: gem-opal, Slug: australian-fire-opal]
-- ------------------------------------------------------------------------------
INSERT INTO public.gemstone_products (
  id,
  slug,
  name,
  hindi_name,
  category,
  planetary_ruler,
  primary_deity,
  benefit,
  short_description,
  description,
  images,
  price,
  compare_at_price,
  sku,
  stock_quantity,
  in_stock,
  is_published,
  is_featured,
  certification,
  specifications,
  variants,
  display_order,
  created_at,
  updated_at
)
VALUES (
  'gem-opal',
  'australian-fire-opal',
  'Natural Australian Fire Opal',
  'Opal (ओपल)',
  'Opal',
  'Venus (Shukra Dev)',
  'Shukra Dev',
  'Stimulates artistic creativity, marital bliss, and luxury. Highly effective substitute for Diamond to channel Venusian grace.',
  'Prismatic natural Australian Opal radiating rainbow fire for creative brilliance, romance, and financial ease.',
  'Natural Australian Opal is the premier Vedic alternative to Diamond for strengthening Venus (Shukra). Its mesmerizing play of iridescent colors awakens the wearer’s creative spark, softens marital discord, and attracts luxury and aesthetic abundance.',
  '{}'::text[],
  6800,
  8200,
  'LEO-OPL-01',
  0,
  false,
  false,
  false,
  '{"certified":false,"labName":"Uncertified - Pending Gemological Laboratory Testing","natural":false,"treatment":"Unverified - Laboratory evaluation required to determine natural origin and treatments","verificationStatus":"unverified"}'::jsonb,
  '{"caratWeight":"5.20 Ratti / 4.76 Carat","origin":"Coober Pedy (Australia)","shape":"Oval Cabochon","color":"Milky White with Multi-Color Fire","transparency":"Semi-Translucent with Full Play of Color","energizationStatus":"Shukra Vedic Consecration","metalRecommendation":"Pure Silver or White Gold","wearingFinger":"Middle or Little Finger of Right Hand","wearingDayMuhurat":"Friday Morning at Sunrise","pricingVerificationStatus":"UNVERIFIED_DRAFT_PRICE","imageVerificationStatus":"PENDING_UPLOAD","adminReviewNotice":"PENDING ASSET UPLOAD: No authentic Opal photograph exists in project assets (do not use diamond.jpg). Upload verified Australian Opal photographs via Admin Panel before publishing.","certificationStatus":"PENDING_LAB_VERIFICATION","authenticityGuarantee":"UNVERIFIED_NO_LAB_CERTIFICATE"}'::jsonb,
  '[{"id":"var-opl-420","name":"4.20 Ratti (Vivid Play-of-Color)","carat":3.85,"ratti":4.2,"origin":"Australia","shape":"Oval Cabochon","price":5500,"compareAtPrice":6800,"sku":"LEO-OPL-420","inStock":false,"stockQuantity":0,"priceNote":"Draft starter price - Pending admin verification"},{"id":"var-opl-520","name":"5.20 Ratti (Prime Australian Fire)","carat":4.76,"ratti":5.2,"origin":"Australia","shape":"Oval Cabochon","price":6800,"compareAtPrice":8200,"sku":"LEO-OPL-520","inStock":false,"stockQuantity":0,"priceNote":"Draft starter price - Pending admin verification"},{"id":"var-opl-750","name":"7.50 Ratti (Rainbow Aurora Fire)","carat":6.86,"ratti":7.5,"origin":"Australia","shape":"Oval Cabochon","price":9800,"compareAtPrice":12000,"sku":"LEO-OPL-750","inStock":false,"stockQuantity":0,"priceNote":"Draft starter price - Pending admin verification"}]'::jsonb,
  10,
  NOW(),
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- Verify insertion count summary
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
