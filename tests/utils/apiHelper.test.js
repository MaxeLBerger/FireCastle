// tests/utils/apiHelper.test.js
// Tests for enhanced error handling in apiHelper

const axios = require('axios');
const { fetchFromAPI } = require('../../src/utils/apiHelper');

jest.mock('axios');

describe('API Helper Error Handling', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Suppress console output during tests
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        console.error.mockRestore();
    });

    test('should return data on successful API call', async () => {
        const mockData = { name: 'Test Clan', level: 10 };
        axios.get.mockResolvedValue({ data: mockData });

        const result = await fetchFromAPI('/clans/%23TESTTAG');
        expect(result).toEqual(mockData);
    });

    test('should throw enhanced error with API_ERROR type for API response errors', async () => {
        const mockError = {
            response: {
                status: 404,
                statusText: 'Not Found',
                data: { message: 'Clan not found' }
            }
        };
        axios.get.mockRejectedValue(mockError);

        try {
            await fetchFromAPI('/clans/%23NOTFOUND');
            fail('Should have thrown an error');
        } catch (error) {
            expect(error.type).toBe('API_ERROR');
            expect(error.statusCode).toBe(404);
            expect(error.message).toContain('Clan not found');
        }
    });

    test('should throw enhanced error with TIMEOUT type for timeout errors', async () => {
        const mockError = {
            code: 'ECONNABORTED',
            message: 'timeout of 5000ms exceeded'
        };
        axios.get.mockRejectedValue(mockError);

        try {
            await fetchFromAPI('/clans/%23TESTTAG');
            fail('Should have thrown an error');
        } catch (error) {
            expect(error.type).toBe('TIMEOUT');
            expect(error.statusCode).toBe(504);
            expect(error.message).toContain('timeout');
        }
    });

    test('should throw enhanced error with NETWORK_ERROR type for DNS errors', async () => {
        const mockError = {
            code: 'ENOTFOUND',
            message: 'getaddrinfo ENOTFOUND api.clashofclans.com'
        };
        axios.get.mockRejectedValue(mockError);

        try {
            await fetchFromAPI('/clans/%23TESTTAG');
            fail('Should have thrown an error');
        } catch (error) {
            expect(error.type).toBe('NETWORK_ERROR');
            expect(error.statusCode).toBe(503);
            expect(error.message).toContain('Network error');
        }
    });

    test('should throw enhanced error with NETWORK_ERROR type for connection refused', async () => {
        const mockError = {
            code: 'ECONNREFUSED',
            message: 'connect ECONNREFUSED'
        };
        axios.get.mockRejectedValue(mockError);

        try {
            await fetchFromAPI('/clans/%23TESTTAG');
            fail('Should have thrown an error');
        } catch (error) {
            expect(error.type).toBe('NETWORK_ERROR');
            expect(error.statusCode).toBe(503);
            expect(error.message).toContain('Network error');
        }
    });

    test('should throw enhanced error with UNKNOWN type for unhandled errors', async () => {
        const mockError = new Error('Some unexpected error');
        axios.get.mockRejectedValue(mockError);

        try {
            await fetchFromAPI('/clans/%23TESTTAG');
            fail('Should have thrown an error');
        } catch (error) {
            expect(error.type).toBe('UNKNOWN');
            expect(error.statusCode).toBe(500);
            expect(error.message).toBe('Some unexpected error');
        }
    });

    test('should handle API error with 403 (Forbidden) status', async () => {
        const mockError = {
            response: {
                status: 403,
                statusText: 'Forbidden',
                data: { reason: 'accessDenied.invalidIp', message: 'Invalid IP address' }
            }
        };
        axios.get.mockRejectedValue(mockError);

        try {
            await fetchFromAPI('/clans/%23TESTTAG');
            fail('Should have thrown an error');
        } catch (error) {
            expect(error.type).toBe('API_ERROR');
            expect(error.statusCode).toBe(403);
            expect(error.message).toContain('Invalid IP address');
        }
    });
});
