// src/utils/apiHelper.js
const axios = require('axios');
require('dotenv').config(); // Umgebungsvariablen laden

const API_BASE_URL = process.env.API_BASE_URL || 'https://api.clashofclans.com/v1';
const API_TOKEN = process.env.API_TOKEN; // Token sollte in der .env-Datei stehen

/**
 * Führt einen GET-Request an das Clash of Clans API aus.
 * @param {string} endpoint - API-Endpunkt
 * @returns {Promise<Object>} Antwortdaten
 */
const fetchFromAPI = async (endpoint) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
      timeout: 5000, // 5 Sekunden Timeout
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};

module.exports = { fetchFromAPI };
