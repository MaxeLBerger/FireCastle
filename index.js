// index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const NodeCache = require('node-cache');
const logger = require('./src/utils/logger');

// Routen
const clanRoutes = require('./src/routes/clanRoutes');
const playerRoutes = require('./src/routes/playerRoutes');
const clanWarRoutes = require('./src/routes/clanWarRoutes');
const clanStatsRoutes = require('./src/routes/clanStatsRoutes');
const playerStatsRoutes = require('./src/routes/playerStatsRoutes');

// Umgebungsvariablen laden
dotenv.config();

const cache = new NodeCache({ stdTTL: 300 });
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Zentrales Request-Logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Caching-Middleware
app.use((req, res, next) => {
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);
  if (cachedResponse) {
    logger.info(`Cache hit for ${key}`);
    return res.json(cachedResponse);
  }
  res.sendResponse = res.json;
  res.json = (body) => {
    cache.set(key, body);
    res.sendResponse(body);
  };
  next();
});

// Routen registrieren
app.use('/api/clan', clanRoutes);
app.use('/api/clan', clanStatsRoutes);
app.use('/api/player', playerRoutes);
app.use('/api/player', playerStatsRoutes);
app.use('/api/clanwar', clanWarRoutes);


// Zentrales Fehlerhandling
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  logger.info(`Server läuft auf http://localhost:${PORT}`);
});
