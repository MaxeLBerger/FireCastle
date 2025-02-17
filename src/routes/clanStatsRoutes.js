// src/routes/clanStatsRoutes.js
const express = require('express');
const { getClanStats } = require('../controllers/clanController');
const router = express.Router();

// Route: Clan Stats
router.get('/stats', getClanStats);

module.exports = router;
