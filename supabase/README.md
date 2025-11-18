# FireCastle Supabase Edge Functions

This directory contains the Supabase Edge Functions that power the FireCastle Clash of Clans API.

## Structure

```
supabase/functions/
 _shared/
    clashApi.ts          # Shared API helper for all functions
 clan/
    index.ts             # GET /clan - Fetch clan data
 player/
    index.ts             # GET /player?tag={tag} - Fetch player data
 clanwar/
    index.ts             # GET /clanwar - Fetch war status
 clan-stats/
    index.ts             # GET /clan-stats - Extended clan statistics
 player-stats/
     index.ts             # GET /player-stats?tag={tag} - Extended player stats
```

## Shared Helper (_shared/clashApi.ts)

All functions use a shared helper that provides:

- **fetchFromClashAPI(endpoint, apiToken)** - Makes API calls to Clash of Clans API
- **corsHeaders(origin)** - Returns CORS headers for responses
- **Error handling** - Standardized error types (API_ERROR, TIMEOUT, NETWORK_ERROR)
- **10 second timeout** - Prevents hanging requests

## Environment Variables

Each function requires:

- **CLASH_API_TOKEN** - Your Clash of Clans API token (required)
- **CLASH_CLAN_TAG** - Default clan tag (optional, defaults to `%232Y0G2QC9J`)

Set these in: Supabase Dashboard  Project Settings  Edge Functions  Secrets

## Deployment

### Local Testing

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to project
supabase link --project-ref wwopmipdxzhkouxngezp

# Test function locally
cd supabase/functions/clan
supabase functions serve clan
```

### Production Deployment

```bash
# Deploy all functions
./deploy-functions.sh

# Or use PowerShell
.\deploy-functions.ps1

# Deploy single function
supabase functions deploy clan --project-ref wwopmipdxzhkouxngezp
```

### Automated Deployment (GitHub Actions)

Push to main branch triggers automatic deployment via `.github/workflows/deploy-firecastle-functions.yml`

## API Endpoints

Base URL: `https://wwopmipdxzhkouxngezp.supabase.co/functions/v1`

### Clan Data
```
GET /clan
Response: { name, level, points, members, ... }
```

### Player Data
```
GET /player?tag=%23PLAYERTAG
Response: { name, level, trophies, donations, ... }
```

### Clan War
```
GET /clanwar
Response: { clanName, opponentName, clanStars, ... }
```

### Clan Stats (Extended)
```
GET /clan-stats
Response: { ...clanData, warStats: { wins, losses, ... } }
```

### Player Stats (Extended)
```
GET /player-stats?tag=%23PLAYERTAG
Response: { ...playerData, progress: { trophyProgress, ... } }
```

## Error Handling

All functions return standardized errors:

```json
{
  "error": "Error message",
  "type": "API_ERROR | TIMEOUT | NETWORK_ERROR | VALIDATION_ERROR",
  "statusCode": 400
}
```

## CORS

All endpoints support CORS:
- Origin: `*` (all origins allowed)
- Methods: `GET, POST, OPTIONS`
- Headers: `Content-Type, Authorization`

## Development

### Adding a New Function

1. Create new directory: `supabase/functions/my-function/`
2. Create `index.ts`:
   ```typescript
   import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
   import { fetchFromClashAPI, corsHeaders } from '../_shared/clashApi.ts'

   serve(async (req) => {
     // Handle OPTIONS for CORS
     if (req.method === 'OPTIONS') {
       return new Response('ok', { headers: corsHeaders() })
     }

     try {
       const apiToken = Deno.env.get('CLASH_API_TOKEN')
       const data = await fetchFromClashAPI('/endpoint', apiToken)
       return new Response(JSON.stringify(data), { 
         headers: corsHeaders(), 
         status: 200 
       })
     } catch (error: any) {
       return new Response(JSON.stringify({ 
         error: error.message,
         type: error.type
       }), { 
         headers: corsHeaders(), 
         status: error.statusCode || 500 
       })
     }
   })
   ```
3. Deploy: `supabase functions deploy my-function`

## Testing Functions

```bash
# Test clan endpoint
curl https://wwopmipdxzhkouxngezp.supabase.co/functions/v1/clan

# Test player endpoint
curl https://wwopmipdxzhkouxngezp.supabase.co/functions/v1/player?tag=%23PLAYERTAG

# Test with verbose output
curl -v https://wwopmipdxzhkouxngezp.supabase.co/functions/v1/clanwar
```

## Resources

- [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions)
- [Deno Documentation](https://deno.land/manual)
- [Clash of Clans API](https://developer.clashofclans.com/)

---

**Last Updated:** 2025-01-18  
**Status:** Production Ready 
