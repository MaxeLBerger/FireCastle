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

    const data = await fetchFromClashAPI(`/clans/${encodeURIComponent(CLAN_TAG)}`, apiToken)
    
    return new Response(
      JSON.stringify(data),
      { headers: corsHeaders(), status: 200 }
    )
  } catch (error: any) {
    console.error('Clan API Error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to fetch clan data',
        type: error.type || 'UNKNOWN'
      }),
      { headers: corsHeaders(), status: error.statusCode || 500 }
    )
  }
})
