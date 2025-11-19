import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { fetchFromClashAPI, corsHeaders } from '../_shared/clashApi.ts';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const clanTag = url.searchParams.get('tag') || '#P9QGQLPU';

    console.log('Fetching clan data for:', clanTag);
    
    const clanData = await fetchFromClashAPI(`/clans/${encodeURIComponent(clanTag)}`);
    
    return new Response(JSON.stringify(clanData), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Clan API Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
