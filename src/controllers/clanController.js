// src/controllers/clanController.js
const { fetchFromAPI } = require('../utils/apiHelper');
const logger = require('../utils/logger');

/**
 * Liefert erweiterte Clan-Details.
 */
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
      warWinRate: (typeof data.warWins === 'number' && typeof data.warLosses === 'number' && (data.warWins + data.warLosses) > 0)
        ? `${((data.warWins / (data.warWins + data.warLosses)) * 100).toFixed(2)}%`
        : 'N/A',
      description: data.description || 'No description available',
    };
    return res.json(extendedData);
  } catch (error) {
    logger.error(`Error fetching clan data: ${error.message}`);
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ 
      error: 'Failed to fetch clan data',
      details: error.message,
      type: error.type || 'UNKNOWN'
    });
  }
};

/**
 * Liefert Clan-Statistiken, z.B. Top-Spender.
 */
const getClanStats = async (req, res) => {
  const clanTag = req.query.tag;
  if (!clanTag) {
    return res.status(400).json({ error: 'Clan tag is required' });
  }

  try {
    const data = await fetchFromAPI(`/clans/${encodeURIComponent(clanTag)}`);
    const memberList = Array.isArray(data.memberList) ? data.memberList : [];
    const topDonors = memberList
      .sort((a, b) => b.donations - a.donations)
      .slice(0, 3);

    const totalDonations = memberList.reduce((sum, member) => sum + (member.donations || 0), 0);

    return res.json({
      clanName: data.name || 'N/A',
      totalDonations,
      topDonors: topDonors.map(donor => ({
        name: donor.name,
        donations: donor.donations,
      })),
    });
  } catch (error) {
    logger.error(`Error fetching clan stats: ${error.message}`);
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ 
      error: 'Failed to fetch clan stats',
      details: error.message,
      type: error.type || 'UNKNOWN'
    });
  }
};

module.exports = { getClanDetails, getClanStats };
