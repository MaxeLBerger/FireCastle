// src/controllers/clanWarController.js
const { fetchFromAPI } = require('../utils/apiHelper');
const logger = require('../utils/logger');

/**
 * Liefert den Live-Krieg-Status eines Clans.
 */
const getClanWarStatus = async (req, res) => {
  // Wenn kein Tag übergeben wird, wird ein Standard-Tag verwendet
  const clanTag = req.query.tag || '#P9QGQLPU';
  try {
    const warData = await fetchFromAPI(`/clans/${encodeURIComponent(clanTag)}/currentwar`);
    return res.json({
      clanName: warData.clan?.name || 'N/A',
      opponentName: warData.opponent?.name || 'N/A',
      clanStars: warData.clan?.stars || 0,
      opponentStars: warData.opponent?.stars || 0,
      clanAttacks: warData.clan?.attacks || 0,
      totalAttacks: (warData.clan?.members || 0) * 2,
    });
  } catch (error) {
    logger.error(`Error fetching live war status: ${error.message}`);
    return res.status(500).json({ error: 'Failed to fetch live war status' });
  }
};

module.exports = { getClanWarStatus };
