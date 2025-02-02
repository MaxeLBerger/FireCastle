// /js/language.js

window.translations = {
    en: {
        menu_search: "Search",
        menu_attack_strategies: "Attack Strategies",
        menu_join_us: "Join Us",
        menu_clan_capital_guide: "Clan Capital Guide",
        menu_live_war_status: "Live War Status",
        menu_about_us: "About Us",
        noscript_message: "Enable JavaScript to view the interactive background.",
        section_search: "Search",
        search_clan: "Clan Search",
        search_player: "Player Search",
        label_tag: "Tag:",
        button_search: "Search",
        section_clan_capital_guide: "Clan Capital Guide",
        clan_capital_intro: "Learn how to build the best Clan Capital layouts and strategies:",
        clan_capital_optimal_layouts: "Optimal layouts for Capital Hall levels",
        clan_capital_attack_strategies: "Attack strategies for Capital Raids",
        clan_capital_tips: "Tips for upgrading and managing districts",
        section_live_war_status: "Live War Status",
        live_war_fetching: "Fetching live war data...",
        section_attack_strategies: "Attack Strategies",
        section_join_firecastle: "Join FireCastle Clan",
        label_name: "Name:",
        label_age: "Age:",
        label_player_tag: "Player Tag:",
        label_townhall_level: "Town Hall Level:",
        label_war_stars: "War Stars:",
        label_best_ranking: "Best Ranking (optional):",
        button_apply_now: "Apply Now",
        section_about_us: "About FireCastle Clan",
        about_us_intro: "Welcome to FireCastle Clan! We are a passionate group of players aiming for victory in Clash of Clans.",
        about_us_leaders: "Clan Leaders: Maxii & Susanne",
        about_us_co_leaders: "Co-Leaders: Mike, Kai and Aydin",
        about_us_join: "Join us to experience epic battles, strategic gameplay, and a fun, active community with a lot of Wins!",
        footer_text: "&copy; 2025 FireCastle Clan - Powered by Family and War, since 2014",
        alert_invalid_clan_tag: 'Please enter a valid clan tag starting with "#"',
        alert_invalid_player_tag: 'Please enter a valid player tag starting with "#"',
        error_fetching_clan_data: 'Error fetching clan data: ',
        error_fetching_player_data: 'Error fetching player data: ',
        error_fetching_live_war_status: 'Error fetching live war status.',
        failed_fetching_live_war_data: 'Failed to fetch live war data.',
        clan: "Clan",
        vs: "vs.",
        opponent: "Opponent",
        score: "Score",
        attacks_used: "Attacks Used",
        clan_badge_alt: "Clan Badge",
        section_clan_details: "Clan Details",
        section_player_details: "Player Details",
        label_level: "Level:",
        label_points: "Points:",
        label_members: "Members:",
        label_war_winrate: "War Winrate:",
        label_description: "Description:",
        label_trophies: "Trophies:",
        label_donations: "Donations:",
        label_attack_wins: "Attack Wins:",
        label_defense_wins: "Defense Wins:"
    },
    de: {
        menu_search: "Suche",
        menu_attack_strategies: "Angriffstrategien",
        menu_join_us: "Bewerben",
        menu_clan_capital_guide: "Clan-Stadt-Guide",
        menu_live_war_status: "Live-Krieg-Status",
        menu_about_us: "Über uns",
        noscript_message: "Aktiviere JavaScript, um den interaktiven Hintergrund anzuzeigen.",
        section_search: "Suche",
        search_clan: "Clan-Suche",
        search_player: "Spieler-Suche",
        label_tag: "Tag:",
        button_search: "Suchen",
        section_clan_capital_guide: "Clan-Hauptstadt-Leitfaden",
        clan_capital_intro: "Lerne, wie du die besten Clan-Hauptstadt-Layouts und -Strategien erstellst:",
        clan_capital_optimal_layouts: "Optimale Layouts für Capital Hall-Level",
        clan_capital_attack_strategies: "Angriffstrategien für Capital Raids",
        clan_capital_tips: "Tipps zum Aufrüsten und Verwalten von Distrikten",
        section_live_war_status: "Live-Krieg-Status",
        live_war_fetching: "Live-Krieg-Daten werden abgerufen...",
        section_attack_strategies: "Angriffstrategien",
        section_join_firecastle: "FireCastle Clan beitreten",
        label_name: "Name:",
        label_age: "Alter:",
        label_player_tag: "Spieler-Tag:",
        label_townhall_level: "Rathaus-Level:",
        label_war_stars: "Krieg-Sterne:",
        label_best_ranking: "Bestes Ranking (optional):",
        button_apply_now: "Jetzt bewerben",
        section_about_us: "Über FireCastle Clan",
        about_us_intro: "Willkommen beim FireCastle Clan! Wir sind eine leidenschaftliche Gruppe von Spielern, die nach Siegen in Clash of Clans streben.",
        about_us_leaders: "Clanleiter: Maxii & Susanne",
        about_us_co_leaders: "Co-Leader: Mike, Kai und Aydin",
        about_us_join: "Tritt uns bei, um epische Schlachten, strategisches Gameplay und eine lustige, aktive Community mit vielen Siegen zu erleben!",
        footer_text: "&copy; 2025 FireCastle Clan - Powered by Familie und Krieg, seit 2014",
        alert_invalid_clan_tag: 'Bitte gib einen gültigen Clan-Tag ein, der mit "#" beginnt',
        alert_invalid_player_tag: 'Bitte gib einen gültigen Spieler-Tag ein, der mit "#" beginnt',
        error_fetching_clan_data: 'Fehler beim Abrufen der Clan-Daten: ',
        error_fetching_player_data: 'Fehler beim Abrufen der Spieler-Daten: ',
        error_fetching_live_war_status: 'Fehler beim Abrufen des Live-Krieg-Status.',
        failed_fetching_live_war_data: 'Fehler beim Abrufen der Live-Krieg-Daten.',
        clan: "Clan",
        vs: "gegen",
        opponent: "Gegner",
        score: "Punktestand",
        attacks_used: "Angriffe verwendet",
        clan_badge_alt: "Clan-Abzeichen",
        section_clan_details: "Clan-Details",
        section_player_details: "Spieler-Details",
        label_level: "Level:",
        label_points: "Punkte:",
        label_members: "Mitglieder:",
        label_war_winrate: "Krieg-Siegquote:",
        label_description: "Beschreibung:",
        label_trophies: "Trophäen:",
        label_donations: "Spenden:",
        label_attack_wins: "Angriffssiege:",
        label_defense_wins: "Verteidigungssiege:"
    }
};

// Funktion zum Aktualisieren der Texte basierend auf der ausgewählten Sprache
function updateContent(language) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const translationKey = element.getAttribute('data-i18n');
        if (window.translations[language][translationKey]) {
            element.innerHTML = window.translations[language][translationKey];
        }
    });

    // Update des <html> lang-Attributs
    document.documentElement.lang = language;
}

// Funktion zum Abrufen von Übersetzungen in JavaScript
function t(key) {
    const language = localStorage.getItem('language') || 'de';
    return window.translations[language][key] || key;
}

// Event Listener für Sprachumschalter
document.addEventListener('DOMContentLoaded', () => {
    const langButtons = document.querySelectorAll('.lang-btn');

    // Überprüfen, ob eine Sprache in localStorage gespeichert ist
    const savedLanguage = localStorage.getItem('language') || 'de';
    updateContent(savedLanguage);
    setActiveButton(savedLanguage);

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedLang = button.id === 'lang-en' ? 'en' : 'de';
            updateContent(selectedLang);
            setActiveButton(selectedLang);
            localStorage.setItem('language', selectedLang);
        });
    });
});

// Funktion zum Setzen der aktiven Button-Klasse
function setActiveButton(language) {
    document.getElementById('lang-en').classList.remove('active');
    document.getElementById('lang-de').classList.remove('active');

    if (language === 'en') {
        document.getElementById('lang-en').classList.add('active');
    } else {
        document.getElementById('lang-de').classList.add('active');
    }
}
