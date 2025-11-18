// FireCastle API Configuration
// This file configures the API base URL for production deployment

// Supabase Edge Functions base URL
const SUPABASE_PROJECT_URL = 'https://wwopmipdxzhkouxngezp.supabase.co';
const SUPABASE_FUNCTIONS_PATH = '/functions/v1';

// API endpoints mapping
const API_ENDPOINTS = {
  clan: '/clan',
  player: '/player', 
  clanwar: '/clanwar',
  'clan-stats': '/clan-stats',
  'player-stats': '/player-stats'
};

// Determine if we're running locally or in production
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Set API base URL
// Local: use /api (assumes local Express server)
// Production: use Supabase Edge Functions
window.FIRECASTLE_API_BASE = isLocalhost 
  ? '/api' 
  : `${SUPABASE_PROJECT_URL}${SUPABASE_FUNCTIONS_PATH}`;

// Helper function to build API URL
window.getFireCastleApiUrl = function(endpoint) {
  return `${window.FIRECASTLE_API_BASE}${API_ENDPOINTS[endpoint] || endpoint}`;
};

console.log('FireCastle API configured:', {
  environment: isLocalhost ? 'local' : 'production',
  baseUrl: window.FIRECASTLE_API_BASE
});
