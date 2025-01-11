// src/routes/clanWarRoutes.js

const express = require('express');
const { fetchFromAPI } = require('../utils/apiHelper');
const router = express.Router();

// Route to Fetch Live War Status
router.get('/', async (req, res) => {
    const clanTag = req.query.tag || '#P9QGQLPU'; // Default Clan Tag
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

module.exports = router;
