-- WEBSITE_SETTINGS RLS POLICIES FOR ADMIN SECURE UPSERT / UPDATE / SELECT

-- Ensure RLS is enabled on website_settings
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;

-- Drop any conflicting or old policies
DROP POLICY IF EXISTS "Enable read access for all users" ON public.website_settings;
DROP POLICY IF EXISTS "Enable insert for authenticated admins only" ON public.website_settings;
DROP POLICY IF EXISTS "Enable update for authenticated admins only" ON public.website_settings;
DROP POLICY IF EXISTS "website_settings_select_policy" ON public.website_settings;
DROP POLICY IF EXISTS "website_settings_insert_policy" ON public.website_settings;
DROP POLICY IF EXISTS "website_settings_update_policy" ON public.website_settings;

-- 1. Public read access
CREATE POLICY "website_settings_select_policy"
ON public.website_settings
FOR SELECT
USING (true);

-- 2. Admin insert access (authenticated users present in admin_users)
CREATE POLICY "website_settings_insert_policy"
ON public.website_settings
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE public.admin_users.user_id = auth.uid()
  )
);

-- 3. Admin update access (authenticated users present in admin_users)
CREATE POLICY "website_settings_update_policy"
ON public.website_settings
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE public.admin_users.user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE public.admin_users.user_id = auth.uid()
  )
);
