// API Base URL - set by api-config.js or fallback to meta tag
const API_BASE = (window.FIRECASTLE_API_BASE || document.querySelector('meta[name="firecastle-api-base"]')?.content || '/api').replace(/\/$/, '');

// Centralized GET wrapper with unified error handling
async function apiGet(endpoint, params = {}) {
    const url = new URL(`${API_BASE}/${endpoint.replace(/^\//,'')}`);
    Object.entries(params).forEach(([k,v]) => { if (v != null) url.searchParams.set(k, v); });
    const res = await fetch(url.toString(), { headers: { 'Accept': 'application/json' } });
    const ct = res.headers.get('content-type') || '';
    const body = ct.includes('application/json') ? await res.json() : await res.text();
    if (!res.ok) {
        const msg = typeof body === 'string' ? body : body.error || 'Unknown error';
        throw new Error(msg);
    }
    return body;
}

document.addEventListener('DOMContentLoaded', () => {
    // Nur ausführen, wenn der entsprechende Container existiert
    if (document.getElementById('search-result')) {
        fetchClanData('#P9QGQLPU');
    }

    if (document.getElementById('war-status')) {
        fetchLiveWarStatus();
    }
});

// Fetch Clan Data
async function fetchClanData(clanTag = '') {
    const tag = clanTag || (document.getElementById('search-tag')?.value.trim());
    if (!tag || !tag.startsWith('#')) {
      showError(t('alert_invalid_clan_tag'));
      return;
    }
    try {
        const data = await apiGet('clan', { tag });
        console.log('Clan data fetched:', data);
        const searchResult = document.getElementById('search-result');
        if (!searchResult) return console.error('Search result container not found.');
        searchResult.innerHTML = `
            <h3>${t('section_clan_details')}</h3>
            <img src="${data.badgeUrls?.medium || 'images/default-badge.png'}" alt="${t('clan_badge_alt')}" />
            <p>${t('label_name')} ${data.name}</p>
            <p>${t('label_level')} ${data.level}</p>
            <p>${t('label_points')} ${data.points}</p>
            <p>${t('label_members')} ${data.members}</p>
            <p>${t('label_war_winrate')} ${data.warWinRate}</p>
            <p>${t('label_description')} ${data.description}</p>
        `;
        searchResult.style.display = 'block';
    } catch (error) {
        console.error('Error fetching clan data:', error);
        showError(`${t('error_fetching_clan_data')}${error.message}`);
    }
}

// Fetch Live War Status
async function fetchLiveWarStatus() {
  try {
    const data = await apiGet('clanwar');
    console.log('Live war status fetched:', data);
    const warStatusContainer = document.getElementById('war-status');
    if (!warStatusContainer) return;
    warStatusContainer.innerHTML = `
      <p>${t('clan')}: ${data.clanName} ${t('vs')} ${t('opponent')}: ${data.opponentName}</p>
      <p>${t('score')}: ${data.clanStars} - ${data.opponentStars}</p>
      <p>${t('attacks_used')}: ${data.clanAttacks}/${data.totalAttacks}</p>
    `;
  } catch (error) {
    console.error('Error fetching live war status:', error);
    const warStatusContainer = document.getElementById('war-status');
    if (warStatusContainer) warStatusContainer.textContent = t('failed_fetching_live_war_data');
  }
}

// Fetch Player Data
async function fetchPlayerData() {
  const playerTag = document.getElementById('player-tag')?.value.trim() || '';
  if (!playerTag.startsWith('#')) return showError(t('alert_invalid_player_tag'));
  try {
    const data = await apiGet('player', { tag: playerTag });
    console.log('Player data fetched:', data);
    const searchResult = document.getElementById('search-result');
    if (!searchResult) return console.error('Search result container not found.');
    searchResult.innerHTML = `
      <h3>${t('section_player_details')}</h3>
      <img src="${data.avatarUrl || 'images/default-player.png'}" alt="${t('player_avatar_alt')}" />
      <p>${t('label_name')} ${data.name}</p>
      <p>${t('label_level')} ${data.level}</p>
      <p>${t('label_trophies')} ${data.trophies}</p>
      <p>${t('label_donations')} ${data.donations}</p>
      <p>${t('label_attack_wins')} ${data.attacks}</p>
      <p>${t('label_defense_wins')} ${data.defenses}</p>
    `;
    searchResult.style.display = 'block';
  } catch (error) {
    console.error('Error fetching player data:', error);
    showError(`${t('error_fetching_player_data')}${error.message}`);
  }
}

// Funktion zur Handhabung der Suche
async function handleSearch() {
    const searchTagEl = document.getElementById('search-tag');
    const searchTag = searchTagEl ? searchTagEl.value.trim() : '';
    const searchTypeEl = document.querySelector('input[name="searchType"]:checked');
    const searchType = searchTypeEl ? searchTypeEl.value : '';
    console.log(`Handling search for type: ${searchType} with tag: ${searchTag}`);

    if (!searchTag.startsWith('#')) {
      showError(searchType === 'clan' ? t('alert_invalid_clan_tag') : t('alert_invalid_player_tag'));
      return;
    }

        try {
            if (searchType === 'clan') {
                await fetchClanData(searchTag);
            } else {
                await fetchPlayerData();
            }
        } catch (error) {
            console.error(`Error fetching ${searchType} data:`, error);
            showError(`${t('error_fetching_' + searchType + '_data')}${error.message}`);
        }
}

// Centralized UI error panel
function ensureErrorPanel() {
  let panel = document.getElementById('error-panel');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'error-panel';
    panel.style.cssText = 'background:#7d1212;color:#fff;padding:8px 12px;margin:8px 0;border-radius:4px;font-size:14px;display:none;';
    const container = document.body.querySelector('#search-section') || document.body;
    container.prepend(panel);
  }
  return panel;
}

function showError(message) {
  const panel = ensureErrorPanel();
  panel.textContent = message;
  panel.style.display = 'block';
  setTimeout(() => {
    panel.style.display = 'none';
  }, 8000);
}
