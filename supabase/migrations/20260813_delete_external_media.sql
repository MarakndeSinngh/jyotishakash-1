-- PHASE 9D.2.2 — REMOVE UNAUTHORIZED EXTERNAL TEST RECORD
-- Deletes the unauthorized test record (Rick Astley / dQw4w9WgXcQ) from public.media.

DELETE FROM public.media 
WHERE youtube_video_id = 'dQw4w9WgXcQ';
