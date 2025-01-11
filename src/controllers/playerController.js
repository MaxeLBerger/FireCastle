// src/controllers/playerController.js

const { fetchFromAPI } = require('../utils/apiHelper');

// Controller: Player Details
const getPlayerDetails = async (req, res) => {
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
};

// Controller: Player Stats
const getPlayerStats = async (req, res) => {
    const playerTag = req.query.tag;
    if (!playerTag) {
        return res.status(400).json({ error: 'Player tag is required' });
    }

    try {
        const data = await fetchFromAPI(`/players/${encodeURIComponent(playerTag)}`);
        const stats = {
            playerName: data.name || 'N/A',
            level: data.expLevel || 0,
            totalTrophies: data.trophies || 0,
            totalDonations: data.donations || 0,
            totalAttacks: data.attackWins || 0,
            totalDefenses: data.defenseWins || 0,
        };
        res.json(stats);
    } catch (error) {
        console.error('Error fetching player stats:', error.message);
        res.status(500).json({ error: 'Failed to fetch player stats' });
    }
};

module.exports = { getPlayerDetails, getPlayerStats };
