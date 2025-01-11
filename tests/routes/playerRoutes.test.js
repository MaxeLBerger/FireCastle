// tests/routes/playerRoutes.test.js

const request = require('supertest');
const express = require('express');
const playerRoutes = require('../../src/routes/playerRoutes');

// Mock API Helper
jest.mock('../../src/utils/apiHelper', () => ({
    fetchFromAPI: jest.fn((endpoint) => {
        if (endpoint.includes('/players/')) {
            return Promise.resolve({
                name: 'Test Player',
                expLevel: 100,
                trophies: 2500,
                donations: 150,
                attackWins: 200,
                defenseWins: 50,
            });
        }
        return Promise.reject(new Error('Invalid API endpoint'));
    }),
}));

const app = express();
app.use(express.json());
app.use('/api/player', playerRoutes);

describe('Player Routes', () => {
    test('GET /api/player with valid tag', async () => {
        const response = await request(app).get('/api/player').query({ tag: '#PLAYER123' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            name: 'Test Player',
            level: 100,
            trophies: 2500,
            donations: 150,
            attacks: 200,
            defenses: 50,
        });
    });

    test('GET /api/player without tag', async () => {
        const response = await request(app).get('/api/player');
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: 'Player tag is required' });
    });

    test('GET /api/player with API error', async () => {
        jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console errors
        const { fetchFromAPI } = require('../../src/utils/apiHelper');
        fetchFromAPI.mockRejectedValueOnce(new Error('API Error'));

        const response = await request(app).get('/api/player').query({ tag: '#INVALIDPLAYER' });
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({ error: 'Failed to fetch player data' });

        console.error.mockRestore();
    });
});