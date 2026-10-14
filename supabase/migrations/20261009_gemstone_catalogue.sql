-- ==============================================================================
-- LEO FAMILY GEMSTONE E-COMMERCE MIGRATION
-- Table: public.gemstone_products
-- Provides a full e-commerce gemstone catalogue with variants, specifications,
-- certifications, stock inventory, and secure RLS policies.
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.gemstone_products (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  hindi_name TEXT NOT NULL,
  category TEXT NOT NULL,
  planetary_ruler TEXT NOT NULL,
  primary_deity TEXT,
  benefit TEXT,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  images TEXT[] NOT NULL DEFAULT '{}',
  price NUMERIC NOT NULL,
  compare_at_price NUMERIC,
  sku TEXT,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  in_stock BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  certification JSONB NOT NULL DEFAULT '{"certified": false, "labName": "", "natural": false, "treatment": "Pending Verification"}'::jsonb,
  specifications JSONB NOT NULL DEFAULT '{}'::jsonb,
  variants JSONB NOT NULL DEFAULT '[]'::jsonb,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indices for rapid querying, filtering, and indexing
CREATE INDEX IF NOT EXISTS idx_gemstone_products_slug ON public.gemstone_products(slug);
CREATE INDEX IF NOT EXISTS idx_gemstone_products_category ON public.gemstone_products(category);
CREATE INDEX IF NOT EXISTS idx_gemstone_products_published ON public.gemstone_products(is_published);
CREATE INDEX IF NOT EXISTS idx_gemstone_products_in_stock ON public.gemstone_products(in_stock);
CREATE INDEX IF NOT EXISTS idx_gemstone_products_order ON public.gemstone_products(display_order);

-- Enable Row Level Security (RLS)
ALTER TABLE public.gemstone_products ENABLE ROW LEVEL SECURITY;

-- 1. Public Read Policy:
-- Unauthenticated and authenticated users can view published products.
-- Authenticated admins can view all products (including drafts).
DROP POLICY IF EXISTS "gemstone_products_select_policy" ON public.gemstone_products;
CREATE POLICY "gemstone_products_select_policy"
ON public.gemstone_products
FOR SELECT
USING (
  is_published = true 
  OR 
  (auth.role() = 'authenticated' AND EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()))
);

-- 2. Admin Insert Policy:
-- Authenticated users listed in public.admin_users can create products.
DROP POLICY IF EXISTS "gemstone_products_insert_policy" ON public.gemstone_products;
CREATE POLICY "gemstone_products_insert_policy"
ON public.gemstone_products
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid())
);

-- 3. Admin Update Policy:
-- Authenticated users listed in public.admin_users can update products.
DROP POLICY IF EXISTS "gemstone_products_update_policy" ON public.gemstone_products;
CREATE POLICY "gemstone_products_update_policy"
ON public.gemstone_products
FOR UPDATE
TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid())
)
WITH CHECK (
  EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid())
);

-- 4. Admin Delete Policy:
-- Authenticated users listed in public.admin_users can delete products.
DROP POLICY IF EXISTS "gemstone_products_delete_policy" ON public.gemstone_products;
CREATE POLICY "gemstone_products_delete_policy"
ON public.gemstone_products
FOR DELETE
TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid())
);
