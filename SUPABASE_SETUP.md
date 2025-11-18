# FireCastle Supabase Edge Functions Setup

## Overview

FireCastle has been migrated from a Node.js Express server to Supabase Edge Functions for production deployment on GitHub Pages. This document describes the setup and deployment process.

## Architecture

### Previous Architecture (Local Only)
- Node.js Express server
- Runs on `localhost:3000`
- Cannot be deployed to GitHub Pages (static hosting only)

### New Architecture (Production Ready)
- **Supabase Edge Functions** (Deno/TypeScript serverless)
- Deployed to: `https://wwopmipdxzhkouxngezp.supabase.co/functions/v1/`
- Works with GitHub Pages static hosting

## Supabase Edge Functions

### Available Functions

| Function | Endpoint | Description |
|----------|----------|-------------|
| `clan` | `/functions/v1/clan` | Fetch clan data |
| `player` | `/functions/v1/player?tag={tag}` | Fetch player data |
| `clanwar` | `/functions/v1/clanwar` | Fetch current war status |
| `clan-stats` | `/functions/v1/clan-stats` | Fetch extended clan statistics |
| `player-stats` | `/functions/v1/player-stats?tag={tag}` | Fetch extended player statistics |

### Function Files

```
FireCastle/supabase/functions/
 _shared/
    clashApi.ts          # Shared API helper
 clan/
    index.ts             # Clan endpoint
 player/
    index.ts             # Player endpoint
 clanwar/
    index.ts             # War endpoint
 clan-stats/
    index.ts             # Extended clan stats
 player-stats/
     index.ts             # Extended player stats
```

## Environment Variables

### Required Secrets (Supabase Dashboard)

1. **CLASH_API_TOKEN**
   - Your Clash of Clans API token
   - Get it from: https://developer.clashofclans.com/
   - Set in Supabase: Project Settings  Edge Functions  Secrets

2. **CLASH_CLAN_TAG** (optional)
   - Your default clan tag (e.g., `%232Y0G2QC9J`)
   - Used by clan/clanwar functions
   - Falls back to `%232Y0G2QC9J` if not set

### GitHub Secrets (for deployment)

Add these to repository settings:

1. **SUPABASE_ACCESS_TOKEN**
   - Create at: Supabase Dashboard  Account Settings  Access Tokens
   - Used by GitHub Actions to deploy functions

2. **SUPABASE_PROJECT_ID**
   - Your project reference ID: `wwopmipdxzhkouxngezp`
   - Found in: Project Settings  General

## Frontend Configuration

### API Configuration (`js/api-config.js`)

The frontend automatically detects environment:

- **Local Development**: Uses `/api` (assumes local Express server)
- **Production**: Uses `https://wwopmipdxzhkouxngezp.supabase.co/functions/v1`

No manual configuration needed! 

### HTML Files Updated

All HTML files include the API config script:
- `index.html`
- `pages/clanSearch.html`
- `pages/livewarStatus.html`

## Deployment

### Manual Deployment (Supabase CLI)

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref wwopmipdxzhkouxngezp

# Deploy all functions
supabase functions deploy

# Deploy specific function
supabase functions deploy clan
```

### Automated Deployment (GitHub Actions)

A workflow will be created to automatically deploy functions on push to main branch.

## Testing

### Local Testing (Express Server)

```bash
npm install
npm run dev
# Server runs on localhost:3000
# Frontend uses /api endpoints
```

### Production Testing

Visit: https://maximilianhaak.de/FireCastle/

Frontend automatically calls Supabase Edge Functions.

## API Endpoints Documentation

### Clan Data
```
GET /functions/v1/clan
Returns: Clan information including name, level, points, members, etc.
```

### Player Data
```
GET /functions/v1/player?tag=%23PLAYERTAG
Returns: Player information including name, level, trophies, donations, etc.
```

### Clan War
```
GET /functions/v1/clanwar
Returns: Current war status including clan vs opponent, stars, attacks
```

### Clan Stats (Extended)
```
GET /functions/v1/clan-stats
Returns: Clan data + war statistics (recent wars, wins, losses, draws)
```

### Player Stats (Extended)
```
GET /functions/v1/player-stats?tag=%23PLAYERTAG
Returns: Player data + progress statistics (trophy progress, war stars, etc.)
```

## Error Handling

All functions return standardized error responses:

```json
{
  "error": "Error message",
  "type": "API_ERROR | TIMEOUT | NETWORK_ERROR | VALIDATION_ERROR"
}
```

## CORS

All functions support CORS with the following headers:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization`

## Next Steps

1.  Edge Functions created
2.  Frontend adapted with auto-detection
3.  Configure Supabase Secrets (CLASH_API_TOKEN)
4.  Deploy functions to Supabase
5.  Test on production
6.  Create GitHub Actions workflow for auto-deployment

## Resources

- [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions)
- [Clash of Clans API Docs](https://developer.clashofclans.com/)
- [Supabase Dashboard](https://supabase.com/dashboard/project/wwopmipdxzhkouxngezp)

---

**Setup Date:** 2025-01-18  
**Supabase Project:** wwopmipdxzhkouxngezp  
**Status:** Ready for deployment
