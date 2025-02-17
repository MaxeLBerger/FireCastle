document.addEventListener('DOMContentLoaded', () => {
    // Initialize progress bar
    const progressBar = document.getElementById("progress-bar");
    if (progressBar) {
        window.addEventListener("scroll", () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollTop = document.documentElement.scrollTop;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            console.log(`Scroll Percentage: ${scrollPercent}%`); // Debug log
            progressBar.style.width = `${scrollPercent}%`;
        });
    } else {
        console.warn("Progress bar element not found!");
    }

    // Nur ausführen, wenn der entsprechende Container existiert

    // Wenn ein Element mit id "search-result" existiert, rufe fetchClanData auf
    if (document.getElementById('search-result')) {
        fetchClanData('#P9QGQLPU');
    } else {
        console.warn("Search result container not found – überspringe fetchClanData.");
    }

    // Wenn ein Element mit id "war-status" existiert, rufe fetchLiveWarStatus auf
    if (document.getElementById('war-status')) {
        fetchLiveWarStatus();
    } else {
        console.warn("War status container not found – überspringe fetchLiveWarStatus.");
    }
});

// Fetch Clan Data
async function fetchClanData(clanTag = '') {
    const tag = clanTag || (document.getElementById('search-tag') && document.getElementById('search-tag').value.trim());
    console.log(`Fetching clan data for tag: ${tag}`);

    if (!tag || !tag.startsWith('#')) {
        alert(t('alert_invalid_clan_tag'));
        return;
    }

    try {
        const response = await fetch(`/api/clan?tag=${encodeURIComponent(tag)}`);
        const data = await response.json();
        console.log('Clan data fetched:', data);

        if (response.ok) {
            const searchResult = document.getElementById('search-result');
            if (searchResult) {
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
            } else {
                console.error('Search result container not found.');
            }
        } else {
            alert(`${t('error_fetching_clan_data')}${data.error}`);
        }
    } catch (error) {
        console.error('Error fetching clan data:', error);
        alert(`${t('error_fetching_clan_data')}${error.message}`);
    }
}

// Fetch Live War Status
async function fetchLiveWarStatus() {
    console.log('Fetching live war status...');
    try {
        const response = await fetch('/api/clanwar');
        const data = await response.json();
        console.log('Live war status fetched:', data);

        if (response.ok) {
            const warStatusContainer = document.getElementById('war-status');
            if (warStatusContainer) {
                warStatusContainer.innerHTML = `
                    <p>${t('clan')}: ${data.clanName} ${t('vs')} ${t('opponent')}: ${data.opponentName}</p>
                    <p>${t('score')}: ${data.clanStars} - ${data.opponentStars}</p>
                    <p>${t('attacks_used')}: ${data.clanAttacks}/${data.totalAttacks}</p>
                `;
            } else {
                console.error('War status container not found in HTML.');
            }
        } else {
            const warStatusContainer = document.getElementById('war-status');
            if (warStatusContainer) {
                warStatusContainer.textContent = t('error_fetching_live_war_status');
            }
        }
    } catch (error) {
        console.error('Error fetching live war status:', error);
        const warStatusContainer = document.getElementById('war-status');
        if (warStatusContainer) {
            warStatusContainer.textContent = t('failed_fetching_live_war_data');
        }
    }
}

// Fetch Player Data
async function fetchPlayerData() {
    const playerTagEl = document.getElementById('player-tag');
    const playerTag = playerTagEl ? playerTagEl.value.trim() : '';
    console.log(`Fetching player data for tag: ${playerTag}`);

    if (!playerTag.startsWith('#')) {
        alert(t('alert_invalid_player_tag'));
        return;
    }

    try {
        const response = await fetch(`/api/player?tag=${encodeURIComponent(playerTag)}`);
        const data = await response.json();
        console.log('Player data fetched:', data);

        if (response.ok) {
            const searchResult = document.getElementById('search-result');
            if (searchResult) {
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
            } else {
                console.error('Search result container not found.');
            }
        } else {
            alert(`${t('error_fetching_player_data')}${data.error}`);
        }
    } catch (error) {
        console.error('Error fetching player data:', error);
        alert(`${t('error_fetching_player_data')}${error.message}`);
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
        alert(searchType === 'clan' ? t('alert_invalid_clan_tag') : t('alert_invalid_player_tag'));
        return;
    }

    try {
        const endpoint = searchType === 'clan' ? '/api/clan' : '/api/player';
        const response = await fetch(`${endpoint}?tag=${encodeURIComponent(searchTag)}`);
        const data = await response.json();
        console.log(`Search result for ${searchType}:`, data);

        if (response.ok) {
            if (searchType === 'clan') {
                // Anzeige der Clan-Daten
                await fetchClanData(searchTag);
            } else {
                // Anzeige der Spieler-Daten
                await fetchPlayerData();
            }
        } else {
            alert(`${t('error_fetching_' + searchType + '_data')}${data.error}`);
        }
    } catch (error) {
        console.error(`Error fetching ${searchType} data:`, error);
        alert(`${t('error_fetching_' + searchType + '_data')}${error.message}`);
    }
}
