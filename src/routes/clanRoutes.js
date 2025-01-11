// src/routes/clanRoutes.js

const express = require('express');
const { getClanDetails, getClanStats } = require('../controllers/clanController');
const router = express.Router();

// Route: Clan Details
router.get('/', getClanDetails);

// Route: Clan Stats
router.get('/stats', getClanStats);

module.exports = router;
