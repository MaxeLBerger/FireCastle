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

    console.log('Fetching clan stats for:', clanTag);
    const [clanData, warLog] = await Promise.all([
      fetchFromClashAPI(`/clans/${encodeURIComponent(clanTag)}`),
      fetchFromClashAPI(`/clans/${encodeURIComponent(clanTag)}/warlog`)
    ]);

    // Calculate win rate from war log
    const totalWars = warLog.items?.length || 0;
    const wins = warLog.items?.filter((war: any) => war.result === 'win').length || 0;
    const winRate = totalWars > 0 ? Math.round((wins / totalWars) * 100) : 0;

    const stats = {
      ...clanData,
      warWinRate: `${winRate}%`,
      totalWars,
      wins
    };
    
    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Clan Stats API Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
