import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { getValidToken } from '../_shared/clashApi.ts';
import { corsHeaders } from '../_shared/cors.ts';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const clanTag = url.searchParams.get('tag') || '#P9QGQLPU';

    console.log('Fetching clan data for:', clanTag);
    
    const token = await getValidToken();
    
    const response = await fetch(`https://api.clashofclans.com/v1/clans/${encodeURIComponent(clanTag)}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Clash API Error: ${response.status} ${response.statusText}`);
    }

    const clanData = await response.json();
    
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
