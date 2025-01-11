// index.js - Haupt-Einstiegspunkt für den Server

// Module einbinden
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const NodeCache = require('node-cache');

const clanRoutes = require('./src/routes/clanRoutes');
const playerRoutes = require('./src/routes/playerRoutes');
const clanWarRoutes = require('./src/routes/clanWarRoutes');
const clanStatsRoutes = require('./src/routes/clanStatsRoutes');
const playerStatsRoutes = require('./src/routes/playerStatsRoutes');

// Umgebungsvariablen laden
dotenv.config();

// Cache-Instanz erstellen
const cache = new NodeCache({ stdTTL: 300 });

// Express-App erstellen
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // CORS aktivieren
app.use(express.json()); // Für JSON-Parsing
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
app.use(express.static(path.join(__dirname, '../public'))); // Statische Dateien bereitstellen

// Caching-Middleware
app.use((req, res, next) => {
    const key = req.originalUrl;
    const cachedResponse = cache.get(key);
    if (cachedResponse) {
        console.log(`Cache hit for ${key}`);
        return res.json(cachedResponse);
    }
    res.sendResponse = res.json;
    res.json = (body) => {
        cache.set(key, body);
        res.sendResponse(body);
    };
    next();
});

// Statische Dateien für spezifische Pfade
app.use('/css', express.static(path.join(__dirname, '../css')));
app.use('/js', express.static(path.join(__dirname, '../js')));
app.use('/images', express.static(path.join(__dirname, '../images')));

// Routen
app.use('/api/clan', clanRoutes);
app.use('/api/player', playerRoutes);
app.use('/api/clanwar', clanWarRoutes);
app.use('/api/clan', clanStatsRoutes);
app.use('/api/player', playerStatsRoutes);

// Startseite
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
