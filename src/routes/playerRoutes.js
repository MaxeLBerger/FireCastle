// src/routes/playerRoutes.js

const express = require('express');
const { fetchFromAPI } = require('../utils/apiHelper');
const router = express.Router();

// Route to Fetch Player Details
router.get('/', async (req, res) => {
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

module.exports = router;
