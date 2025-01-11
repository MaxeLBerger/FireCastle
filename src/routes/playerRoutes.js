// src/routes/playerRoutes.js

const express = require('express');
const { getPlayerDetails, getPlayerStats } = require('../controllers/playerController');
const router = express.Router();

// Route: Player Details
router.get('/', getPlayerDetails);

// Route: Player Stats
router.get('/stats', getPlayerStats);

module.exports = router;