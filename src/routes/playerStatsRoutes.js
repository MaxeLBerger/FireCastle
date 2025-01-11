// src/routes/playerStatsRoutes.js

const express = require('express');
const { fetchFromAPI } = require('../utils/apiHelper');
const router = express.Router();

// Route to Fetch Player Statistics
router.get('/stats', async (req, res) => {
    const playerTag = req.query.tag;
    if (!playerTag) {
        return res.status(400).json({ error: 'Player tag is required' });
    }

    try {
        // Fetch player data
        const data = await fetchFromAPI(`/players/${encodeURIComponent(playerTag)}`);

        // Prepare statistics
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
});

module.exports = router;
