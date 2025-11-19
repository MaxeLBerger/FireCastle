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
    const playerTag = url.searchParams.get('tag');
    
    if (!playerTag) {
      throw new Error('Player tag is required');
    }

    console.log('Fetching player data for:', playerTag);
    
    const token = await getValidToken();
    
    const response = await fetch(`https://api.clashofclans.com/v1/players/${encodeURIComponent(playerTag)}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Clash API Error: ${response.status} ${response.statusText}`);
    }

    const playerData = await response.json();
    
    return new Response(JSON.stringify(playerData), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Player API Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
