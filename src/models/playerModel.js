// src/models/playerModel.js

class Player {
    constructor({
        name = 'N/A',
        level = 0,
        trophies = 0,
        donations = 0,
        attacks = 0,
        defenses = 0,
    }) {
        console.log('Initializing Player:', { name, level, trophies, donations, attacks, defenses });
        this.name = name;
        this.level = level;
        this.trophies = trophies;
        this.donations = donations;
        this.attacks = attacks;
        this.defenses = defenses;
    }

    // Beispielmethode: Spielerinformationen formatieren
    formatInfo() {
        console.log('Formatting Player Info:', this);
        return `${this.name} (Level: ${this.level}) - ${this.trophies} Trophäen`;
    }
}

module.exports = Player;
