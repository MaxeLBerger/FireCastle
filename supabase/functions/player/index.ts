import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { fetchFromClashAPI, corsHeaders } from '../_shared/clashApi.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders() })
  }

  try {
    const apiToken = Deno.env.get('CLASH_API_TOKEN')
    if (!apiToken) {
      throw new Error('CLASH_API_TOKEN not configured')
    }

    const url = new URL(req.url)
    const playerTag = url.searchParams.get('tag')
    
    if (!playerTag) {
      return new Response(
        JSON.stringify({ error: 'Player tag is required', type: 'VALIDATION_ERROR' }),
        { headers: corsHeaders(), status: 400 }
      )
    }

    const data = await fetchFromClashAPI(`/players/${encodeURIComponent(playerTag)}`, apiToken)
    
    return new Response(
      JSON.stringify(data),
      { headers: corsHeaders(), status: 200 }
    )
  } catch (error: any) {
    console.error('Player API Error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to fetch player data',
        type: error.type || 'UNKNOWN'
      }),
      { headers: corsHeaders(), status: error.statusCode || 500 }
    )
  }
})
