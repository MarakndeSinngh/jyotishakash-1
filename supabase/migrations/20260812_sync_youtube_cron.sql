-- PHASE 9C.2.3 — SUPABASE CRON & AUTOMATIC SCHEDULE SETUP
-- Enables pg_cron and pg_net extensions and schedules the sync-youtube-media Edge Function to run every 12 hours.

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- 2. Schedule cron job (runs every 12 hours at minute 0)
-- Note: Replace <YOUR_SUPABASE_PROJECT_REF> and YOUR_YOUTUBE_SYNC_SECRET with actual project credentials in Supabase SQL Editor.
SELECT cron.schedule(
  'sync-youtube-media-job',
  '0 */12 * * *',
  $$
  SELECT
    net.http_post(
      url:='https://<YOUR_SUPABASE_PROJECT_REF>.supabase.co/functions/v1/sync-youtube-media',
      headers:='{"Content-Type": "application/json", "Authorization": "Bearer YOUR_YOUTUBE_SYNC_SECRET"}'::jsonb,
      body:='{}'::jsonb
    ) AS request_id;
  $$
);
