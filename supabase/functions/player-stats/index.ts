import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { fetchFromClashAPI, corsHeaders } from '../_shared/clashApi.ts';

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
    const data = await fetchFromClashAPI(`/players/${encodeURIComponent(playerTag)}`);
    
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
