// src/utils/apiHelper.js
const axios = require('axios');
require('dotenv').config(); // Umgebungsvariablen laden

const API_BASE_URL = process.env.API_BASE_URL || 'https://api.clashofclans.com/v1';
const API_TOKEN = process.env.API_TOKEN; // Token sollte in der .env-Datei stehen

if (!API_TOKEN) {
  // Frühzeitiger Hinweis, falls kein Token gesetzt ist
  // Wir werfen keinen Fehler beim Import, um Tests mit Mocks nicht zu stören,
  // loggen aber eine Warnung.
  // eslint-disable-next-line no-console
  console.warn('WARN: API_TOKEN is not set. Live API calls will fail until it is configured.');
}

/**
 * Führt einen GET-Request an das Clash of Clans API aus.
 * @param {string} endpoint - API-Endpunkt
 * @returns {Promise<Object>} Antwortdaten
 * @throws {Error} Enhanced error with status code and detailed message
 */
const fetchFromAPI = async (endpoint) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
      timeout: 5000, // 5 Sekunden Timeout
    });
    return response.data;
  } catch (error) {
    // Enhance error with detailed information
    const enhancedError = new Error();
    
    if (error.response) {
      // API responded with an error status code
      enhancedError.message = error.response.data?.message || error.response.data?.reason || `API Error: ${error.response.status} ${error.response.statusText}`;
      enhancedError.statusCode = error.response.status;
      enhancedError.type = 'API_ERROR';
      console.error(`API Error [${error.response.status}]:`, error.response.data || error.response.statusText);
    } else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      // Request timeout
      enhancedError.message = 'Request timeout: The Clash of Clans API did not respond in time';
      enhancedError.statusCode = 504;
      enhancedError.type = 'TIMEOUT';
      console.error('API Timeout:', error.message);
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED' || error.message.includes('getaddrinfo')) {
      // Network/DNS error
      enhancedError.message = 'Network error: Unable to reach the Clash of Clans API';
      enhancedError.statusCode = 503;
      enhancedError.type = 'NETWORK_ERROR';
      console.error('Network Error:', error.message);
    } else {
      // Unknown error
      enhancedError.message = error.message || 'Unknown error occurred while fetching data';
      enhancedError.statusCode = 500;
      enhancedError.type = 'UNKNOWN';
      console.error('Unknown Error:', error.message);
    }
    
    throw enhancedError;
  }
};

module.exports = { fetchFromAPI };
