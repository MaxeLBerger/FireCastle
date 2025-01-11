const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

// Clash of Clans API Configurations
const API_BASE_URL = 'https://api.clashofclans.com/v1';
const API_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImZhY2NjZGRlLWMzNzUtNDU0OS05M2UyLTg2NzY0MGNiYzYwNyIsImlhdCI6MTczNjE5ODAxOCwic3ViIjoiZGV2ZWxvcGVyL2FjYTFlYjRiLTMwMjUtOWQ1Yi0xODQ5LWVjNDc3MDI5OTZmNiIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjc5LjIyNi4yMzMuMjM2Il0sInR5cGUiOiJjbGllbnQifV19.IIPD9NpnGGFEl5hwHUtkiWsJnGNUevFIuJoVWkbAwGUdUWKZqw9acCQ1EEsCcYyJoTAo4VftbSIUFCsAmvFKcQ';

// Middleware to Parse JSON
app.use(express.json());

// Middleware for Logging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Serve static files for CSS, JS, and images
app.use('/css', express.static(path.join(__dirname, '..', 'css')));
app.use('/js', express.static(path.join(__dirname, '..', 'js')));
app.use('/images', express.static(path.join(__dirname, '..', 'images')));

// Serve the index.html file for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Helper Function to Handle API Requests
const fetchFromAPI = async (endpoint) => {
    try {
        const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
        });
        return response.data;
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
};

// Route to Fetch Clan Details
app.get('/api/clan', async (req, res) => {
    const clanTag = req.query.tag;
    if (!clanTag) {
        return res.status(400).json({ error: 'Clan tag is required' });
    }

    try {
        const data = await fetchFromAPI(`/clans/${encodeURIComponent(clanTag)}`);
        const extendedData = {
            name: data.name || 'N/A',
            level: data.clanLevel || 'N/A',
            points: data.clanPoints || 'N/A',
            members: data.members || 'N/A',
            badgeUrls: data.badgeUrls || {},
            warWinRate: data.warWins && data.warLosses !== undefined
                ? `${((data.warWins / (data.warWins + data.warLosses)) * 100).toFixed(2)}%`
                : 'N/A',
            description: data.description || 'No description available',
        };
        res.json(extendedData);
    } catch (error) {
        console.error('Error fetching clan data:', error.message);
        res.status(500).json({ error: 'Failed to fetch clan data' });
    }
});

// Route to Fetch Player Details
app.get('/api/player', async (req, res) => {
    const playerTag = req.query.tag;
    if (!playerTag) {
        return res.status(400).json({ error: 'Player tag is required' });
    }

    try {
        const data = await fetchFromAPI(`/players/${encodeURIComponent(playerTag)}`);
        const extendedData = {
            name: data.name || 'N/A',
            level: data.expLevel || 'N/A',
            trophies: data.trophies || 'N/A',
            donations: data.donations || 'N/A',
            attacks: data.attackWins || 'N/A',
            defenses: data.defenseWins || 'N/A',
        };
        res.json(extendedData);
    } catch (error) {
        console.error('Error fetching player data:', error.message);
        res.status(500).json({ error: 'Failed to fetch player data' });
    }
});

// Route to Fetch Live War Status
app.get('/api/clanwar', async (req, res) => {
    const clanTag = '#P9QGQLPU'; // Default Clan Tag
    try {
        const warData = await fetchFromAPI(`/clans/${encodeURIComponent(clanTag)}/currentwar`);
        res.json({
            clanName: warData.clan?.name || 'N/A',
            opponentName: warData.opponent?.name || 'N/A',
            clanStars: warData.clan?.stars || 0,
            opponentStars: warData.opponent?.stars || 0,
            clanAttacks: warData.clan?.attacks || 0,
            totalAttacks: warData.clan?.members * 2 || 0,
        });
    } catch (error) {
        console.error('Error fetching live war status:', error);
        res.status(500).json({ error: 'Failed to fetch live war status' });
    }
});


// Start the Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
