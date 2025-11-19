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

    console.log('Fetching player stats for:', playerTag);
    
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

    const data = await response.json();
    
    // Calculate additional stats
    const stats = {
      ...data,
      attackWins: data.attackWins || 0,
      defenseWins: data.defenseWins || 0,
      donations: data.donations || 0,
      donationsReceived: data.donationsReceived || 0,
      clanRank: data.clanRank || 0
    };
    
    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Player Stats API Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
