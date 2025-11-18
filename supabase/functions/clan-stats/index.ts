import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { fetchFromClashAPI, corsHeaders } from '../_shared/clashApi.ts'

const CLAN_TAG = Deno.env.get('CLASH_CLAN_TAG') || '%232Y0G2QC9J'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders() })
  }

  try {
    const apiToken = Deno.env.get('CLASH_API_TOKEN')
    if (!apiToken) {
      throw new Error('CLASH_API_TOKEN not configured')
    }

    // Fetch clan data and warlog for extended stats
    const [clanData, warLog] = await Promise.all([
      fetchFromClashAPI(`/clans/${encodeURIComponent(CLAN_TAG)}`, apiToken),
      fetchFromClashAPI(`/clans/${encodeURIComponent(CLAN_TAG)}/warlog?limit=10`, apiToken)
    ])

    // Calculate extended stats
    const stats = {
      ...clanData,
      warStats: {
        recentWars: warLog?.items?.length || 0,
        wins: warLog?.items?.filter((war: any) => war.result === 'win')?.length || 0,
        losses: warLog?.items?.filter((war: any) => war.result === 'lose')?.length || 0,
        draws: warLog?.items?.filter((war: any) => war.result === 'tie')?.length || 0
      }
    }
    
    return new Response(
      JSON.stringify(stats),
      { headers: corsHeaders(), status: 200 }
    )
  } catch (error: any) {
    console.error('Clan Stats API Error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to fetch clan stats',
        type: error.type || 'UNKNOWN'
      }),
      { headers: corsHeaders(), status: error.statusCode || 500 }
    )
  }
})
