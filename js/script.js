document.addEventListener('DOMContentLoaded', () => {
    // Dynamically fetch default clan data
    fetchClanData('#P9QGQLPU');

    // Initialize progress bar
    const progressBar = document.getElementById('progress-bar');
    if (!progressBar) {
        console.error('Progress bar element not found!');
        return;
    }

    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollTop = document.documentElement.scrollTop;
        const scrollPercent = (scrollTop / scrollHeight) * 100;

        console.log(`Scroll Percentage: ${scrollPercent}%`); // Debugging log
        progressBar.style.width = `${scrollPercent}%`;
    });

    // Test: Set progress bar width to 50% after 2 seconds
    setTimeout(() => {
        progressBar.style.width = '50%'; // Temporär für Debugging
    }, 2000);

    // Fetch live war status on page load
    fetchLiveWarStatus();
});

// Fetch Clan Data
async function fetchClanData(clanTag = '') {
    const tag = clanTag || document.getElementById('clan-tag').value.trim();
    if (!tag.startsWith('#')) {
        alert('Please enter a valid clan tag starting with "#"');
        return;
    }

    try {
        const response = await fetch(`/api/clan?tag=${encodeURIComponent(tag)}`);
        const data = await response.json();

        if (response.ok) {
            document.getElementById('clan-badge').src = data.badgeUrls?.medium || 'images/default-badge.png';
            document.getElementById('clan-name').textContent = `Name: ${data.name}`;
            document.getElementById('clan-level').textContent = `Level: ${data.level}`;
            document.getElementById('clan-points').textContent = `Points: ${data.points}`;
            document.getElementById('clan-members').textContent = `Members: ${data.members}`;
            document.getElementById('clan-warwinrate').textContent = `War Winrate: ${data.warWinRate}`;
            document.getElementById('clan-description').textContent = `Description: ${data.description}`;
        } else {
            alert(`Error fetching clan data: ${data.error}`);
        }
    } catch (error) {
        console.error('Error fetching clan data:', error);
    }
}

// Fetch Live War Status
async function fetchLiveWarStatus() {
    try {
        const response = await fetch('/api/clanwar');
        const data = await response.json();

        if (response.ok) {
            document.getElementById('war-status').innerHTML = `
                <p>Clan: ${data.clanName} vs. Opponent: ${data.opponentName}</p>
                <p>Score: ${data.clanStars} - ${data.opponentStars}</p>
                <p>Attacks Used: ${data.clanAttacks}/${data.totalAttacks}</p>
            `;
        } else {
            document.getElementById('war-status').textContent = 'Error fetching live war status.';
        }
    } catch (error) {
        console.error('Error fetching live war status:', error);
        document.getElementById('war-status').textContent = 'Failed to fetch live war data.';
    }
}

// Fetch Player Data
async function fetchPlayerData() {
    const playerTag = document.getElementById('player-tag').value.trim();
    if (!playerTag.startsWith('#')) {
        alert('Please enter a valid player tag starting with "#"');
        return;
    }

    try {
        const response = await fetch(`/api/player?tag=${encodeURIComponent(playerTag)}`);
        const data = await response.json();

        if (response.ok) {
            document.getElementById('player-name').textContent = `Name: ${data.name}`;
            document.getElementById('player-level').textContent = `Level: ${data.level}`;
            document.getElementById('player-trophies').textContent = `Trophies: ${data.trophies}`;
            document.getElementById('player-donations').textContent = `Donations: ${data.donations}`;
            document.getElementById('player-attacks').textContent = `Attack Wins: ${data.attacks}`;
            document.getElementById('player-defenses').textContent = `Defense Wins: ${data.defenses}`;
        } else {
            alert(`Error fetching player data: ${data.error}`);
        }
    } catch (error) {
        console.error('Error fetching player data:', error);
    }
}

async function handleSearch() {
    const searchTag = document.getElementById('search-tag').value.trim();
    const searchType = document.querySelector('input[name="searchType"]:checked').value;

    if (!searchTag.startsWith('#')) {
        alert('Please enter a valid tag starting with "#"');
        return;
    }

    try {
        const endpoint = searchType === 'clan' ? '/api/clan' : '/api/player';
        const response = await fetch(`${endpoint}?tag=${encodeURIComponent(searchTag)}`);
        const data = await response.json();

        if (response.ok) {
            displaySearchResult(data, searchType);
        } else {
            alert(`Error fetching ${searchType} data: ${data.error}`);
        }
    } catch (error) {
        console.error(`Error fetching ${searchType} data:`, error);
    }
}

function displaySearchResult(data, type) {
    const resultContainer = document.getElementById('search-result');
    resultContainer.innerHTML = ''; // Reset

    if (type === 'clan') {
        resultContainer.innerHTML = `
            <h3>Clan Details</h3>
            <img src="${data.badgeUrls?.medium || 'images/default-badge.png'}" alt="Clan Badge">
            <p>Name: ${data.name}</p>
            <p>Level: ${data.level}</p>
            <p>Points: ${data.points}</p>
            <p>Members: ${data.members}</p>
            <p>War Winrate: ${data.warWinRate}</p>
            <p>Description: ${data.description}</p>
        `;
    } else {
        resultContainer.innerHTML = `
            <h3>Player Details</h3>
            <p>Name: ${data.name}</p>
            <p>Level: ${data.level}</p>
            <p>Trophies: ${data.trophies}</p>
            <p>Donations: ${data.donations}</p>
            <p>Attack Wins: ${data.attacks}</p>
            <p>Defense Wins: ${data.defenses}</p>
        `;
    }
}
