// tests/integration/integrationPlayerStats.test.js

const request = require('supertest');
const express = require('express');
const playerStatsRoutes = require('../../src/routes/playerStatsRoutes');
const { fetchFromAPI } = require('../../src/utils/apiHelper');

// Mock API Helper
jest.mock('../../src/utils/apiHelper', () => ({
    fetchFromAPI: jest.fn((endpoint) => {
        if (endpoint.includes('/players/')) {
            return Promise.resolve({
                name: 'Test Player',
                expLevel: 50,
                trophies: 3000,
                donations: 500,
                attackWins: 150,
                defenseWins: 100,
            });
        }
        return Promise.reject(new Error('Invalid API endpoint'));
    }),
}));

const app = express();
app.use(express.json());
app.use('/api/player', playerStatsRoutes);

describe('Integration Test: Player Stats API', () => {
    test('GET /api/player/stats returns correct statistics', async () => {
        const response = await request(app).get('/api/player/stats').query({ tag: '#TESTPLAYER' });
        expect(response.statusCode).toBe(200);

        // Validate Response Data
        expect(response.body).toEqual({
            playerName: 'Test Player',
            level: 50,
            totalTrophies: 3000,
            totalDonations: 500,
            totalAttacks: 150,
            totalDefenses: 100,
        });
    });

    test('GET /api/player/stats with API error returns 500', async () => {
        fetchFromAPI.mockRejectedValueOnce(new Error('API Error'));
        const response = await request(app).get('/api/player/stats').query({ tag: '#INVALIDPLAYER' });
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({ 
            error: 'Failed to fetch player stats',
            details: 'API Error',
            type: 'UNKNOWN'
        });
    });

    test('GET /api/player/stats without tag returns 400', async () => {
        const response = await request(app).get('/api/player/stats');
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: 'Player tag is required' });
    });
});
