// tests/routes/clanRoutes.test.js

const request = require('supertest');
const express = require('express');
const clanRoutes = require('../../src/routes/clanRoutes');

// Mock API Helper
jest.mock('../../src/utils/apiHelper', () => ({
    fetchFromAPI: jest.fn((endpoint) => {
        if (endpoint.includes('/clans/')) {
            return Promise.resolve({
                name: 'Test Clan',
                clanLevel: 10,
                clanPoints: 2000,
                members: 30,
                badgeUrls: {},
                warWins: 50,
                warLosses: 25,
                description: 'A test clan',
            });
        }
        return Promise.reject(new Error('Invalid API endpoint'));
    }),
}));

const app = express();
app.use(express.json());
app.use('/api/clan', clanRoutes);

describe('Clan Routes', () => {
    test('GET /api/clan with valid tag', async () => {
        const response = await request(app).get('/api/clan').query({ tag: '#TESTTAG' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            name: 'Test Clan',
            level: 10,
            points: 2000,
            members: 30,
            badgeUrls: {},
            warWinRate: '66.67%',
            description: 'A test clan',
        });
    });

    test('GET /api/clan without tag', async () => {
        const response = await request(app).get('/api/clan');
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: 'Clan tag is required' });
    });

    test('GET /api/clan with API error', async () => {
        jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console errors
        const { fetchFromAPI } = require('../../src/utils/apiHelper');
        fetchFromAPI.mockRejectedValueOnce(new Error('API Error'));

        const response = await request(app).get('/api/clan').query({ tag: '#INVALIDTAG' });
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({ error: 'Failed to fetch clan data' });

        console.error.mockRestore();
    });
});
