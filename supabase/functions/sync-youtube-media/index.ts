import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-sync-secret',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 1. Verify background sync secret
    const syncSecretHeader = req.headers.get('x-sync-secret') || '';
    const authHeader = req.headers.get('authorization') || '';
    const expectedSecret = Deno.env.get('YOUTUBE_SYNC_SECRET');

    const isAuthorized =
      (expectedSecret && syncSecretHeader === expectedSecret) ||
      (expectedSecret && authHeader === `Bearer ${expectedSecret}`);

    if (!isAuthorized) {
      return new Response(JSON.stringify({ error: 'Unauthorized: Invalid or missing sync secret' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    
    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(JSON.stringify({ error: 'Server configuration error: Supabase credentials missing' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Use service role client for backend sync operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const apiKey = Deno.env.get('YOUTUBE_API_KEY');
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Server configuration error: YOUTUBE_API_KEY missing' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 2. Fetch eligible media records
    const { data: mediaRecords, error: fetchError } = await supabase
      .from('media')
      .select('id, youtube_url, youtube_video_id, title, description, thumbnail, published_date, view_count, youtube_duration, youtube_channel_id, youtube_channel_title, youtube_last_synced_at')
      .not('youtube_video_id', 'is', null)
      .neq('youtube_video_id', '');

    if (fetchError) {
      return new Response(JSON.stringify({ error: `Failed to fetch media records: ${fetchError.message}` }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!mediaRecords || mediaRecords.length === 0) {
      return new Response(JSON.stringify({ success: true, message: 'No eligible YouTube media records found for synchronization', syncedCount: 0 }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 3. Batch requests in chunks of 50 video IDs
    const videoIds = mediaRecords.map(m => m.youtube_video_id).filter(Boolean) as string[];
    const chunks: string[][] = [];
    for (let i = 0; i < videoIds.length; i += 50) {
      chunks.push(videoIds.slice(i, i + 50));
    }

    let updatedCount = 0;
    let unchangedCount = 0;
    let unavailableCount = 0;
    let failedCount = 0;
    const errors: any[] = [];

    for (const chunk of chunks) {
      try {
        const idsParam = chunk.join(',');
        const ytRes = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${idsParam}&key=${apiKey}`
        );

        if (!ytRes.ok) {
          throw new Error(`YouTube API batch request failed with status ${ytRes.status}`);
        }

        const ytData = await ytRes.json();
        const items = ytData.items || [];
        const itemMap = new Map();
        for (const item of items) {
          itemMap.set(item.id, item);
        }

        // Process each media record in this chunk
        for (const record of mediaRecords) {
          // Verify record belongs to this chunk
          if (!chunk.includes(record.youtube_video_id)) {
            continue;
          }

          if (!record.youtube_video_id || !itemMap.has(record.youtube_video_id)) {
            unavailableCount++;
            continue;
          }

          const ytItem = itemMap.get(record.youtube_video_id);
          const snippet = ytItem.snippet || {};
          const contentDetails = ytItem.contentDetails || {};
          const statistics = ytItem.statistics || {};

          const thumbnails = snippet.thumbnails || {};
          const bestThumb =
            thumbnails.maxres?.url ||
            thumbnails.standard?.url ||
            thumbnails.high?.url ||
            thumbnails.medium?.url ||
            thumbnails.default?.url ||
            record.thumbnail;

          const newTitle = snippet.title || record.title;
          const newDescription = snippet.description || record.description;
          const newPublishedDate = snippet.publishedAt ? snippet.publishedAt.split('T')[0] : record.published_date;
          const newViewCount = statistics.viewCount ? parseInt(statistics.viewCount, 10) : record.view_count;
          const newDuration = contentDetails.duration || record.youtube_duration;
          const newChannelId = snippet.channelId || record.youtube_channel_id;
          const newChannelTitle = snippet.channelTitle || record.youtube_channel_title;

          const hasChanged =
            newTitle !== record.title ||
            newDescription !== record.description ||
            bestThumb !== record.thumbnail ||
            newPublishedDate !== record.published_date ||
            newViewCount !== record.view_count ||
            newDuration !== record.youtube_duration ||
            newChannelId !== record.youtube_channel_id ||
            newChannelTitle !== record.youtube_channel_title;

          const now = new Date().toISOString();

          if (hasChanged) {
            const { error: updateError } = await supabase
              .from('media')
              .update({
                title: newTitle,
                description: newDescription,
                thumbnail: bestThumb,
                published_date: newPublishedDate,
                view_count: newViewCount,
                youtube_duration: newDuration,
                youtube_channel_id: newChannelId,
                youtube_channel_title: newChannelTitle,
                youtube_last_synced_at: now
              })
              .eq('id', record.id);

            if (updateError) {
              failedCount++;
              errors.push({ id: record.id, error: updateError.message });
            } else {
              updatedCount++;
            }
          } else {
            const { error: tsError } = await supabase
              .from('media')
              .update({ youtube_last_synced_at: now })
              .eq('id', record.id);

            if (tsError) {
              failedCount++;
              errors.push({ id: record.id, error: tsError.message });
            } else {
              unchangedCount++;
            }
          }
        }
      } catch (chunkErr: any) {
        failedCount += chunk.length;
        errors.push({ chunk, error: chunkErr.message });
      }
    }

    return new Response(JSON.stringify({
      success: true,
      summary: {
        total: mediaRecords.length,
        updated: updatedCount,
        unchanged: unchangedCount,
        unavailable: unavailableCount,
        failed: failedCount
      },
      errors: errors.length > 0 ? errors : undefined
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Internal server error during YouTube synchronization' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
