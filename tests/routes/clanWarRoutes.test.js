// tests/routes/clanWarRoutes.test.js

const request = require('supertest');
const express = require('express');
const clanWarRoutes = require('../../src/routes/clanWarRoutes');

// Mock API Helper
jest.mock('../../src/utils/apiHelper', () => ({
    fetchFromAPI: jest.fn((endpoint) => {
        if (endpoint.includes('/currentwar')) {
            return Promise.resolve({
                clan: { name: 'Test Clan', stars: 20, attacks: 10, members: 15 },
                opponent: { name: 'Opponent Clan', stars: 15 },
            });
        }
        return Promise.reject(new Error('Invalid API endpoint'));
    }),
}));

const app = express();
app.use(express.json());
app.use('/api/clanwar', clanWarRoutes);

describe('Clan War Routes', () => {
    test('GET /api/clanwar with valid tag', async () => {
        const response = await request(app).get('/api/clanwar').query({ tag: '#CLAN123' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            clanName: 'Test Clan',
            opponentName: 'Opponent Clan',
            clanStars: 20,
            opponentStars: 15,
            clanAttacks: 10,
            totalAttacks: 30, // Calculated from members * 2
        });
    });

    test('GET /api/clanwar without tag', async () => {
        const response = await request(app).get('/api/clanwar');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            clanName: 'Test Clan',
            opponentName: 'Opponent Clan',
            clanStars: 20,
            opponentStars: 15,
            clanAttacks: 10,
            totalAttacks: 30,
        });
    });

    test('GET /api/clanwar with API error', async () => {
        jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console errors
        const { fetchFromAPI } = require('../../src/utils/apiHelper');
        fetchFromAPI.mockRejectedValueOnce(new Error('API Error'));

        const response = await request(app).get('/api/clanwar').query({ tag: '#INVALIDCLAN' });
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({ error: 'Failed to fetch live war status' });

        console.error.mockRestore();
    });
});
