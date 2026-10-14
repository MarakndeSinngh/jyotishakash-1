-- ==============================================================================
-- LEO FAMILY GEMSTONE E-COMMERCE: SAFE DEFAULTS & INVENTORY INTEGRATION
-- Migration: 20261012_gemstone_safe_defaults.sql
--
-- Enforces fail-closed, unverified-draft defaults on public.gemstone_products:
-- 1. is_published DEFAULT false (new products must be explicitly reviewed and published)
-- 2. stock_quantity DEFAULT 0 and in_stock DEFAULT false (zero inventory by default)
-- 3. certification DEFAULT unverified status (requires authentic lab documentation)
-- 4. images DEFAULT '{}' (no automatic image substitution or ruby.jpg fallbacks)
-- ==============================================================================

DO $$
BEGIN
  -- Alter table column defaults if public.gemstone_products exists
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'gemstone_products'
  ) THEN
    ALTER TABLE public.gemstone_products
      ALTER COLUMN price DROP DEFAULT,
      ALTER COLUMN price SET NOT NULL,
      ALTER COLUMN stock_quantity SET DEFAULT 0,
      ALTER COLUMN in_stock SET DEFAULT false,
      ALTER COLUMN is_published SET DEFAULT false,
      ALTER COLUMN images SET DEFAULT '{}'::text[],
      ALTER COLUMN certification SET DEFAULT '{"certified": false, "labName": "", "natural": false, "treatment": "Pending Verification"}'::jsonb;

    RAISE NOTICE 'Successfully applied safe unverified draft defaults to public.gemstone_products (price default removed, price NOT NULL enforced, zero inventory, unpublished drafts)';
  ELSE
    RAISE NOTICE 'Table public.gemstone_products does not exist yet; please execute 20261009_gemstone_catalogue.sql first.';
  END IF;
END $$;
