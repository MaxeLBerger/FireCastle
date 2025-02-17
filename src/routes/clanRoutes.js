// src/routes/clanRoutes.js
const express = require('express');
const { getClanDetails } = require('../controllers/clanController');
const router = express.Router();

// Route: Clan Details
router.get('/', getClanDetails);

module.exports = router;
