// src/models/playerModel.js

/**
 * Modell für einen Spieler.
 */
class Player {
    /**
     * Erzeugt eine neue Spieler-Instanz.
     * @param {Object} param0 
     * @param {string} [param0.name='N/A']
     * @param {number} [param0.level=0]
     * @param {number} [param0.trophies=0]
     * @param {number} [param0.donations=0]
     * @param {number} [param0.attacks=0]
     * @param {number} [param0.defenses=0]
     */
    constructor({
      name = 'N/A',
      level = 0,
      trophies = 0,
      donations = 0,
      attacks = 0,
      defenses = 0,
    } = {}) {
      this.name = name;
      this.level = level;
      this.trophies = trophies;
      this.donations = donations;
      this.attacks = attacks;
      this.defenses = defenses;
    }
  
    /**
     * Formatiert die Spieler-Informationen als String.
     * @returns {string}
     */
    formatInfo() {
      return `${this.name} (Level: ${this.level}) - ${this.trophies} Trophäen`;
    }
  }
  
  module.exports = Player;
  