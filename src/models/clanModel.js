// src/models/clanModel.js

class Clan {
    constructor({
        name = 'N/A',
        level = 0,
        points = 0,
        members = 0,
        badgeUrls = {},
        warWinRate = 'N/A',
        description = 'No description available',
    }) {
        console.log('Initializing Clan:', { name, level, points, members, badgeUrls, warWinRate, description });
        this.name = name;
        this.level = level;
        this.points = points;
        this.members = members;
        this.badgeUrls = badgeUrls;
        this.warWinRate = warWinRate;
        this.description = description;
    }

    // Beispielmethode: Claninformationen formatieren
    formatInfo() {
        console.log('Formatting Clan Info:', this);
        return `${this.name} (Level: ${this.level}) - ${this.points} Punkte`;
    }
}

module.exports = Clan;
