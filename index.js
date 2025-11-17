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
const allowedOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors(
    allowedOrigins.length
      ? { origin: allowedOrigins, credentials: true }
      : {}
  )
);
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

// Static assets (so the app can serve the frontend too if deployed on a dyno/server)
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));

// Root page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});


// Zentrales Fehlerhandling
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  logger.info(`Server läuft auf http://localhost:${PORT}`);
});
