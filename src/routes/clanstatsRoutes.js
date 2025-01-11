// src/routes/clanStatsRoutes.js

const express = require('express');
const { fetchFromAPI } = require('../utils/apiHelper');
const router = express.Router();

// Route to Fetch Clan Statistics
router.get('/stats', async (req, res) => {
    const clanTag = req.query.tag;
    if (!clanTag) {
        return res.status(400).json({ error: 'Clan tag is required' });
    }

    try {
        // Fetch clan data
        const data = await fetchFromAPI(`/clans/${encodeURIComponent(clanTag)}`);

        // Extract top donors (example logic)
        const topDonors = data.memberList
            ? data.memberList.sort((a, b) => b.donations - a.donations).slice(0, 3)
            : [];

        // Calculate donation total
        const totalDonations = data.memberList
            ? data.memberList.reduce((sum, member) => sum + member.donations, 0)
            : 0;

        // Prepare response
        const stats = {
            clanName: data.name || 'N/A',
            totalDonations,
            topDonors: topDonors.map((donor) => ({
                name: donor.name,
                donations: donor.donations,
            })),
        };

        res.json(stats);
    } catch (error) {
        console.error('Error fetching clan stats:', error.message);
        res.status(500).json({ error: 'Failed to fetch clan stats' });
    }
});

module.exports = router;