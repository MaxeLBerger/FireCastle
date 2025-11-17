// src/controllers/playerController.js
const { fetchFromAPI } = require('../utils/apiHelper');
const logger = require('../utils/logger');

/**
 * Liefert erweiterte Spieler-Details.
 */
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
    return res.json(extendedData);
  } catch (error) {
    logger.error(`Error fetching player data: ${error.message}`);
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ 
      error: 'Failed to fetch player data',
      details: error.message,
      type: error.type || 'UNKNOWN'
    });
  }
};

/**
 * Liefert aggregierte Spieler-Statistiken.
 */
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
    return res.json(stats);
  } catch (error) {
    logger.error(`Error fetching player stats: ${error.message}`);
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ 
      error: 'Failed to fetch player stats',
      details: error.message,
      type: error.type || 'UNKNOWN'
    });
  }
};

module.exports = { getPlayerDetails, getPlayerStats };
