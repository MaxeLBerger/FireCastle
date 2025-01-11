// src/controllers/clanController.js

const { fetchFromAPI } = require('../utils/apiHelper');

// Controller: Clan Details
const getClanDetails = async (req, res) => {
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
};

// Controller: Clan Stats
const getClanStats = async (req, res) => {
    const clanTag = req.query.tag;
    if (!clanTag) {
        return res.status(400).json({ error: 'Clan tag is required' });
    }

    try {
        const data = await fetchFromAPI(`/clans/${encodeURIComponent(clanTag)}`);

        // Extract top donors
        const topDonors = data.memberList
            ? data.memberList.sort((a, b) => b.donations - a.donations).slice(0, 3)
            : [];

        // Calculate total donations
        const totalDonations = data.memberList
            ? data.memberList.reduce((sum, member) => sum + member.donations, 0)
            : 0;

        res.json({
            clanName: data.name || 'N/A',
            totalDonations,
            topDonors: topDonors.map(donor => ({
                name: donor.name,
                donations: donor.donations,
            })),
        });
    } catch (error) {
        console.error('Error fetching clan stats:', error.message);
        res.status(500).json({ error: 'Failed to fetch clan stats' });
    }
};

module.exports = { getClanDetails, getClanStats };