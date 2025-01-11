// src/utils/apiHelper.js

const axios = require('axios');

// Clash of Clans API Configurations
const API_BASE_URL = 'https://api.clashofclans.com/v1';
const API_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImZhY2NjZGRlLWMzNzUtNDU0OS05M2UyLTg2NzY0MGNiYzYwNyIsImlhdCI6MTczNjE5ODAxOCwic3ViIjoiZGV2ZWxvcGVyL2FjYTFlYjRiLTMwMjUtOWQ1Yi0xODQ5LWVjNDc3MDI5OTZmNiIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjc5LjIyNi4yMzMuMjM2Il0sInR5cGUiOiJjbGllbnQifV19.IIPD9NpnGGFEl5hwHUtkiWsJnGNUevFIuJoVWkbAwGUdUWKZqw9acCQ1EEsCcYyJoTAo4VftbSIUFCsAmvFKcQ';

// Helper Function to Handle API Requests
const fetchFromAPI = async (endpoint) => {
    try {
        const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
        });
        return response.data;
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
};

module.exports = { fetchFromAPI };
