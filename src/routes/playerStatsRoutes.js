// src/routes/playerStatsRoutes.js
const express = require('express');
const { getPlayerStats } = require('../controllers/playerController');
const router = express.Router();

// Route: Player Stats
router.get('/stats', getPlayerStats);

module.exports = router;
