document.addEventListener('DOMContentLoaded', () => {
    // Dynamically fetch default clan data
    fetchClanData('#P9QGQLPU');

    // Initialize progress bar
    const progressBar = document.getElementById('progress-bar');
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollTop = document.documentElement.scrollTop;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    });

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
