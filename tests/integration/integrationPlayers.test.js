// tests/integration/integrationPlayers.test.js

const request = require('supertest');
const express = require('express');
const Player = require('../../src/models/playerModel');
const playerRoutes = require('../../src/routes/playerRoutes');
const { fetchFromAPI } = require('../../src/utils/apiHelper');

// Mock API Helper
jest.mock('../../src/utils/apiHelper', () => ({
    fetchFromAPI: jest.fn((endpoint) => {
        if (endpoint.includes('/players/')) {
            return Promise.resolve({
                name: 'Test Player',
                expLevel: 99,
                trophies: 3000,
                donations: 200,
                attackWins: 150,
                defenseWins: 50,
            });
        }
        return Promise.reject(new Error('Invalid API endpoint'));
    }),
}));

const app = express();
app.use(express.json());
app.use('/api/player', playerRoutes);

describe('Integration Test: Player API', () => {
    test('GET /api/player returns extended player data and integrates with model', async () => {
        const response = await request(app).get('/api/player').query({ tag: '#TESTPLAYER' });
        expect(response.statusCode).toBe(200);

        // Validate Model Integration
        const player = new Player(response.body);
        expect(player.formatInfo()).toBe('Test Player (Level: 99) - 3000 Trophäen');

        // Validate Response Data
        expect(response.body).toEqual({
            name: 'Test Player',
            level: 99,
            trophies: 3000,
            donations: 200,
            attacks: 150,
            defenses: 50,
        });
    });

    test('GET /api/player with API error returns 500', async () => {
        fetchFromAPI.mockRejectedValueOnce(new Error('API Error'));
        const response = await request(app).get('/api/player').query({ tag: '#INVALIDPLAYER' });
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({ error: 'Failed to fetch player data' });
    });
});