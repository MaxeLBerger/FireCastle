<#
 FireCastle Production Deployment
 --------------------------------
 Deploys Supabase Edge Functions with Clash API auto-login.

 Enhancements:
    - Robust Supabase CLI detection and version output
    - Optional environment variable driven project linking (SUPABASE_PROJECT_ID)
    - Pre-flight validation of Edge Functions directory
    - Clear error handling & colored status messages
    - Safe exit codes for CI integration later
    - Summary section with next steps
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Write-Host "FireCastle Deployment" -ForegroundColor Cyan
Write-Host "=====================" -ForegroundColor Cyan

function Fail($msg) {
    Write-Host "ERROR: $msg" -ForegroundColor Red
    exit 1
}

# Ensure repository structure (supabase/functions exists)
if (!(Test-Path "supabase")) { Fail "Run this script from the FireCastle root (supabase folder missing)." }
if (!(Test-Path "supabase/functions")) { Fail "supabase/functions folder missing." }

Write-Host "Checking Supabase CLI..." -ForegroundColor Yellow
try {
    $supabaseVersion = (npx supabase --version) 2>$null
    if (-not $supabaseVersion) { throw "No version returned" }
    Write-Host "Supabase CLI found: $supabaseVersion" -ForegroundColor Green
} catch {
    Write-Host "Supabase CLI not found. Installing locally (dev dependency)..." -ForegroundColor Yellow
    npm install -D supabase | Out-Null
    try {
        $supabaseVersion = (npx supabase --version) 2>$null
        Write-Host "Supabase CLI installed: $supabaseVersion" -ForegroundColor Green
    } catch { Fail "Failed to install Supabase CLI: $($_.Exception.Message)" }
}

# Login (skips if already authenticated; Supabase CLI manages session)
Write-Host "\nStep 1: Supabase Login" -ForegroundColor Yellow
Write-Host "If a browser opens, complete login. If terminal asks for PAT, paste it." -ForegroundColor Gray
try {
    npx supabase login | Out-Null
    Write-Host "Login step completed (or already authenticated)." -ForegroundColor Green
} catch { Fail "Supabase login failed: $($_.Exception.Message)" }

# Link project (env override or prompt)
Write-Host "\nStep 2: Link Project" -ForegroundColor Yellow
$projectRef = $env:SUPABASE_PROJECT_ID
if ([string]::IsNullOrWhiteSpace($projectRef)) {
    $projectRef = Read-Host "Enter Supabase Project ID (from dashboard URL)"
}
if ([string]::IsNullOrWhiteSpace($projectRef)) { Fail "No project ID provided" }
try {
    npx supabase link --project-ref $projectRef | Out-Null
    Write-Host "Linked to project: $projectRef" -ForegroundColor Green
} catch { Fail "Project link failed: $($_.Exception.Message)" }

# Optional secrets sync hint
Write-Host "\n(Optional) To set secrets: npx supabase secrets set NAME=VALUE" -ForegroundColor DarkGray

# Deploy functions (all .ts in supabase/functions/*)
Write-Host "\nStep 3: Deploy Edge Functions" -ForegroundColor Yellow
try {
    npx supabase functions deploy --no-verify-jwt | Out-Null
    Write-Host "Functions deployed successfully." -ForegroundColor Green
} catch { Fail "Function deployment failed: $($_.Exception.Message)" }

# Post-deploy summary
Write-Host "\nDeployment Complete!" -ForegroundColor Green
Write-Host "Project: $projectRef" -ForegroundColor Cyan
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "  - Verify endpoints in Supabase Dashboard (Edge Functions logs)." -ForegroundColor Gray
Write-Host "  - Confirm Clash API auto-login in logs (token rotation events)." -ForegroundColor Gray
Write-Host "  - Add secrets with API keys if not yet stored." -ForegroundColor Gray
Write-Host "  - Re-run this script after adding new functions." -ForegroundColor Gray

exit 0