// src/routes/clanRoutes.js

const express = require('express');
const { fetchFromAPI } = require('../utils/apiHelper');
const router = express.Router();

// Route to Fetch Clan Details
router.get('/', async (req, res) => {
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

module.exports = router;