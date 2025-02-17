// src/routes/playerRoutes.js
const express = require('express');
const { getPlayerDetails } = require('../controllers/playerController');
const router = express.Router();

// Route: Player Details
router.get('/', getPlayerDetails);

module.exports = router;
