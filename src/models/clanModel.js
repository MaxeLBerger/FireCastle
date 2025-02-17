// src/models/clanModel.js

/**
 * Modell für einen Clan.
 */
class Clan {
    /**
     * Erzeugt eine neue Clan-Instanz.
     * @param {Object} param0 
     * @param {string} [param0.name='N/A']
     * @param {number} [param0.level=0]
     * @param {number} [param0.points=0]
     * @param {number} [param0.members=0]
     * @param {Object} [param0.badgeUrls={}]
     * @param {string} [param0.warWinRate='N/A']
     * @param {string} [param0.description='No description available']
     */
    constructor({
      name = 'N/A',
      level = 0,
      points = 0,
      members = 0,
      badgeUrls = {},
      warWinRate = 'N/A',
      description = 'No description available',
    } = {}) {
      this.name = name;
      this.level = level;
      this.points = points;
      this.members = members;
      this.badgeUrls = badgeUrls;
      this.warWinRate = warWinRate;
      this.description = description;
    }
  
    /**
     * Formatiert die Clan-Informationen als String.
     * @returns {string}
     */
    formatInfo() {
      return `${this.name} (Level: ${this.level}) - ${this.points} Punkte`;
    }
  }
  
  module.exports = Clan;
  