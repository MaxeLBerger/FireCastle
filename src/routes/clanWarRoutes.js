// src/routes/clanWarRoutes.js
const express = require('express');
const { getClanWarStatus } = require('../controllers/clanWarController');
const router = express.Router();

// Route: Clan War Status
router.get('/', getClanWarStatus);

module.exports = router;
