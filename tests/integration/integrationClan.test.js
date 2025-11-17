// tests/integration/integrationClans.test.js
const request = require('supertest');
const express = require('express');
const Clan = require('../../src/models/clanModel');
const clanRoutes = require('../../src/routes/clanRoutes');
const { fetchFromAPI } = require('../../src/utils/apiHelper');

jest.mock('../../src/utils/apiHelper', () => ({
  fetchFromAPI: jest.fn((endpoint) => {
    if (endpoint.includes('/clans/')) {
      return Promise.resolve({
        name: 'Test Clan',
        clanLevel: 5,
        clanPoints: 1500,
        members: 25,
        badgeUrls: {},
        warWins: 30,
        warLosses: 10,
        description: 'Integration Test Clan',
      });
    }
    return Promise.reject(new Error('Invalid API endpoint'));
  }),
}));

const app = express();
app.use(express.json());
app.use('/api/clan', clanRoutes);

describe('Integration Test: Clan API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET /api/clan returns extended clan data and integrates with model', async () => {
    const response = await request(app).get('/api/clan').query({ tag: '#TESTCLAN' });
    expect(response.statusCode).toBe(200);

    const clan = new Clan(response.body);
    expect(clan.formatInfo()).toBe('Test Clan (Level: 5) - 1500 Punkte');

    expect(response.body).toEqual({
      name: 'Test Clan',
      level: 5,
      points: 1500,
      members: 25,
      badgeUrls: {},
      warWinRate: '75.00%',
      description: 'Integration Test Clan',
    });
  });

  test('GET /api/clan with API error returns 500', async () => {
    fetchFromAPI.mockRejectedValueOnce(new Error('API Error'));
    const response = await request(app).get('/api/clan').query({ tag: '#INVALIDCLAN' });
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ 
        error: 'Failed to fetch clan data',
        details: 'API Error',
        type: 'UNKNOWN'
    });
  });
});
