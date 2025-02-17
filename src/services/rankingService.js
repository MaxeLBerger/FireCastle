// src/services/rankingService.js

class RankingService {
    /**
     * Sortiert Spieler nach absteigenden Trophäen.
     * @param {Array} players 
     * @returns {Array} sortierte Spieler
     */
    static sortPlayersByTrophies(players) {
      return players.sort((a, b) => b.trophies - a.trophies);
    }
  
    /**
     * Berechnet die Siegquote eines Clans im Krieg.
     * @param {number} warWins 
     * @param {number} warLosses 
     * @returns {string} Siegquote als Prozentzahl oder 'N/A'
     */
    static calculateWarWinRate(warWins, warLosses) {
      if (warWins + warLosses === 0) return 'N/A';
      return `${((warWins / (warWins + warLosses)) * 100).toFixed(2)}%`;
    }
  
    /**
     * Filtert Clans nach einem Mindestlevel.
     * @param {Array} clans 
     * @param {number} minLevel 
     * @returns {Array} gefilterte Clans
     */
    static filterTopClans(clans, minLevel) {
      return clans.filter(clan => clan.level >= minLevel);
    }
  }
  
  module.exports = RankingService;
  