# FireCastle Production Deployment
# Deploys Supabase Edge Functions with Auto-Login

Write-Host "FireCastle Deployment" -ForegroundColor Cyan
Write-Host "=====================" -ForegroundColor Cyan

# Ensure we are in the FireCastle directory
if (!(Test-Path "supabase")) {
    Write-Host "Error: Please run this script from the FireCastle directory." -ForegroundColor Red
    exit 1
}

# Check for Supabase CLI via npx
Write-Host "Checking Supabase CLI..." -ForegroundColor Yellow
try {
     = npx supabase --version
    Write-Host "Supabase CLI found: " -ForegroundColor Green
} catch {
    Write-Host "Supabase CLI not found. Installing locally..." -ForegroundColor Yellow
    npm install -D supabase
}

# Login
Write-Host ""
Write-Host "Step 1: Login to Supabase" -ForegroundColor Yellow
Write-Host "If a browser opens, please log in. If asked for a token, paste it here." -ForegroundColor Gray
npx supabase login

# Link
Write-Host ""
Write-Host "Step 2: Link Project" -ForegroundColor Yellow
$projectId = Read-Host "Enter your Supabase Project ID (from URL, e.g. 'abcdefghijklm')"
npx supabase link --project-ref $projectId

# Deploy
Write-Host ""
Write-Host "Step 3: Deploy Functions" -ForegroundColor Yellow
npx supabase functions deploy --no-verify-jwt

Write-Host ""
Write-Host "Deployment Complete!" -ForegroundColor Green
Write-Host "Your functions are now live and will auto-login to Clash API." -ForegroundColor Cyan