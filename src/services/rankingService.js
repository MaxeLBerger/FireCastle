// src/services/rankingService.js

class RankingService {
    static sortPlayersByTrophies(players) {
        return players.sort((a, b) => b.trophies - a.trophies);
    }

    static calculateWarWinRate(warWins, warLosses) {
        if (warWins + warLosses === 0) return 'N/A';
        return `${((warWins / (warWins + warLosses)) * 100).toFixed(2)}%`;
    }

    static filterTopClans(clans, minLevel) {
        return clans.filter(clan => clan.level >= minLevel);
    }
}

module.exports = RankingService;
