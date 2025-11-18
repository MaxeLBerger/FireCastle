#  FireCastle Production Architecture

## System Overview

```
                                    INTERNET
                                       
                                       
                    
                                                          
                                                          
                          
            End Users                          Developer      
           (Browser)                          (Local Dev)     
                          
                                                       
                    HTTPS                              HTTP
                                                       
                          
           GitHub Pages                       localhost:3000  
           Static Hosting                     Express Server  
                          
                   
                    API Calls
                   
         
                  Supabase Edge Functions                      
                  https://wwopmipdxzhkouxngezp.supabase.co    
                                                                
                            
             clan      player     clanwar   ...        
                            
                                                            
                                   
                                                              
         
                             
                              API Proxy Request
                             
                
                   Cloudflare Worker        
                   (API Proxy)              
                                            
                    Static Cloudflare IPs 
                    IP Whitelisted        
                    5min Cache            
                
                            
                             Authenticated Request
                             Bearer Token
                            
                
                   Clash of Clans API       
                   (Supercell)              
                                            
                    IP Whitelist Required 
                
```

---

## Data Flow

### Production Flow (After Setup)

```
1. User opens FireCastle
   
2. JavaScript makes API call to Supabase Function
   https://wwopmipdxzhkouxngezp.supabase.co/functions/v1/clan
   
3. Supabase Function calls Cloudflare Worker
   https://firecastle-clash-proxy.WORKER-ID.workers.dev/api/clans/%23TAG
   
4. Cloudflare Worker adds Bearer token & forwards to Clash API
   https://api.clashofclans.com/v1/clans/%23TAG
   
5. Clash API returns data
   
6. Cloudflare Worker caches (5min) & returns to Supabase
   
7. Supabase Function processes & returns to user
   
8. User sees clan data! 
```

### Local Development Flow (Fallback)

```
1. Developer runs Express server locally
   npm run dev (port 3000)
   
2. Frontend detects localhost
   API_BASE = "/api"
   
3. Express server calls Clash API directly
   Uses local API token (whitelisted with dev IP)
   
4. Data displayed locally
```

---

## Component Status

| Component | Status | URL | Notes |
|-----------|--------|-----|-------|
| **Frontend** |  Ready | https://maximilianhaak.de/FireCastle/ | Auto-detects environment |
| **Supabase Functions** |  Created | https://wwopmipdxzhkouxngezp.supabase.co/functions/v1/ | Ready to deploy |
| **Cloudflare Worker** |  Created | To be deployed | Solves IP whitelist |
| **Clash API** |  Pending | https://api.clashofclans.com/v1 | Need Cloudflare IPs |

---

## Deployment Steps

```
Step 1: Cloudflare Worker
 Install Wrangler CLI
 Login to Cloudflare
 Create Clash API key with Cloudflare IPs
 Set Worker secret (CLASH_API_TOKEN)
 Deploy worker  Get worker URL

Step 2: Supabase Configuration
 Set CLOUDFLARE_WORKER_URL
 Set USE_CLOUDFLARE_PROXY=true
 Optionally set CLASH_CLAN_TAG

Step 3: Supabase Functions
 Install Supabase CLI
 Login to Supabase
 Deploy all 5 functions

Step 4: Test Everything
 Test Cloudflare Worker
 Test Supabase Functions
 Test FireCastle Website
  Success!
```

---

## Environment Variables

### Cloudflare Worker

| Variable | Value | Where |
|----------|-------|-------|
| `CLASH_API_TOKEN` | Your Clash API token | `wrangler secret put` |

### Supabase Edge Functions

| Variable | Value | Where |
|----------|-------|-------|
| `CLOUDFLARE_WORKER_URL` | `https://firecastle-clash-proxy.ID.workers.dev` | Supabase Dashboard |
| `USE_CLOUDFLARE_PROXY` | `true` | Supabase Dashboard |
| `CLASH_CLAN_TAG` | `%232Y0G2QC9J` | Supabase Dashboard |

### Frontend (Auto-Configured)

No manual configuration needed! The `js/api-config.js` automatically:
- **Localhost:** Uses `/api` (Express server)
- **Production:** Uses `https://wwopmipdxzhkouxngezp.supabase.co/functions/v1`

---

## Security

```
 API tokens stored as secrets (never in code)
 CORS properly configured
 HTTPS everywhere
 IP whitelist on Clash API
 Caching reduces API calls
 Error handling prevents data leaks
```

---

## Monitoring

### Cloudflare Worker
```bash
npx wrangler tail
```
Shows real-time logs from worker

### Supabase Functions
```bash
supabase functions logs FUNCTION_NAME
```
Shows function execution logs

### Website
Browser DevTools  Network Tab  Check API calls

---

## Cost Breakdown

| Service | Free Tier | Used | Cost |
|---------|-----------|------|------|
| GitHub Pages | Unlimited | Static hosting | $0 |
| Supabase Edge Functions | 500k/month | ~1k-10k/month | $0 |
| Cloudflare Worker | 100k/day | ~500-5k/day | $0 |
| Clash API | Unlimited | Via Cloudflare | $0 |
| **TOTAL** | | | **$0/month**  |

---

## Next Action

 **Start with Phase 1:**

```powershell
cd cloudflare-worker
npm install
npx wrangler login
```

Then follow: `DEPLOYMENT_GUIDE.md` 

---

**Architecture Design:** 2025-01-18  
**All Components:**  Ready  
**Status:** Ready to deploy
