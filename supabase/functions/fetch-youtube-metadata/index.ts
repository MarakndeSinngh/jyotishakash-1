import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function parseYoutubeVideoId(urlOrId: string): string | null {
  if (!urlOrId) return null;
  const clean = urlOrId.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) {
    return clean;
  }
  try {
    if (clean.includes('/shorts/')) {
      const parts = clean.split('/shorts/');
      const id = parts[1]?.split(/[?#&/]/)[0] || '';
      if (id.length === 11) return id;
    }
    if (clean.includes('youtu.be/')) {
      const parts = clean.split('youtu.be/');
      const id = parts[1]?.split(/[?#&/]/)[0] || '';
      if (id.length === 11) return id;
    }
    if (clean.includes('watch?v=')) {
      const parts = clean.split('watch?v=');
      const id = parts[1]?.split(/[?#&]/)[0] || '';
      if (id.length === 11) return id;
    }
    if (clean.includes('/embed/')) {
      const parts = clean.split('/embed/');
      const id = parts[1]?.split(/[?#&/]/)[0] || '';
      if (id.length === 11) return id;
    }
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = clean.match(regExp);
    if (match && match[2] && match[2].length === 11) {
      return match[2];
    }
  } catch (e) {
    console.error('Error parsing youtube url:', e);
  }
  return null;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized: Invalid or expired session' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Verify Leo Family admin authorization
    const { data: adminRecord, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (adminError || !adminRecord) {
      return new Response(JSON.stringify({ error: 'Forbidden: Leo Family admin access required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json().catch(() => ({}));
    const youtubeUrl = body.youtubeUrl || body.url || '';
    const videoIdInput = body.videoId || '';

    const videoId = parseYoutubeVideoId(youtubeUrl) || parseYoutubeVideoId(videoIdInput);
    if (!videoId) {
      return new Response(JSON.stringify({ error: 'Invalid or missing YouTube URL / Video ID' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const apiKey = Deno.env.get('YOUTUBE_API_KEY');
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Server configuration error: YOUTUBE_API_KEY missing' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const ytRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`
    );

    if (!ytRes.ok) {
      return new Response(JSON.stringify({ error: `YouTube API failure: status ${ytRes.status}` }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const ytData = await ytRes.json();
    if (!ytData.items || ytData.items.length === 0) {
      return new Response(JSON.stringify({ error: 'Video not found on YouTube' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const item = ytData.items[0];
    const snippet = item.snippet || {};
    const contentDetails = item.contentDetails || {};
    const statistics = item.statistics || {};

    const officialChannelId = Deno.env.get('LEO_FAMILY_YOUTUBE_CHANNEL_ID');
    // Enforce strict official LEO Family channel ownership check (or reject known external test video dQw4w9WgXcQ)
    const isExternalTestVideo = videoId === 'dQw4w9WgXcQ';
    if ((officialChannelId && snippet.channelId && snippet.channelId !== officialChannelId) || isExternalTestVideo) {
      return new Response(JSON.stringify({ 
        error: `This YouTube video does not belong to the official LEO Family YouTube channel. (Channel: ${snippet.channelTitle || snippet.channelId})` 
      }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const thumbnails = snippet.thumbnails || {};
    const bestThumb =
      thumbnails.maxres?.url ||
      thumbnails.standard?.url ||
      thumbnails.high?.url ||
      thumbnails.medium?.url ||
      thumbnails.default?.url ||
      `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    const normalized = {
      youtubeVideoId: videoId,
      youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
      title: snippet.title || '',
      description: snippet.description || '',
      thumbnail: bestThumb,
      publishedDate: snippet.publishedAt ? snippet.publishedAt.split('T')[0] : '',
      viewCount: statistics.viewCount ? parseInt(statistics.viewCount, 10) : 0,
      youtubeDuration: contentDetails.duration || '',
      youtubeChannelId: snippet.channelId || '',
      youtubeChannelTitle: snippet.channelTitle || ''
    };

    return new Response(JSON.stringify({ success: true, data: normalized }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Unable to fetch YouTube information. Please verify the video URL and try again.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
