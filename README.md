FireCastle Project

Projektbeschreibung

FireCastle ist ein Node.js-Projekt, das API-Endpunkte für Clash of Clans bereitstellt. Es bietet Routen für die Abfrage von Clan- und Spielerinformationen sowie den Status laufender Clan-Kriege.

Installation

Voraussetzungen

Node.js (Version 14 oder höher)

npm (Node Package Manager)

Schritte

Repository klonen:

git clone <repository-url>
cd FireCastle

Abhängigkeiten installieren:

npm install

Umgebungsvariablen einrichten:
Erstelle eine .env-Datei im Stammverzeichnis und füge deinen Clash of Clans API-Schlüssel hinzu:

API_TOKEN=<dein_api_token>

Server starten:

npm start

Der Server wird auf http://localhost:3000 laufen.

Tests

Ausführen der Tests

Um sicherzustellen, dass alles korrekt funktioniert, führe die Tests mit Jest aus:

npm test

Testberichte

Die Tests decken folgende Bereiche ab:

Unit-Tests für Modelle und Services.

Integrationstests für API-Endpunkte.

API-Dokumentation

Clan-Informationen

Endpoint: /api/clan

Method: GET

Query-Parameter:

tag (erforderlich): Der Tag des Clans.

Beispiel:

curl "http://localhost:3000/api/clan?tag=%23TESTTAG"

Antwort:

{
  "name": "Test Clan",
  "level": 10,
  "points": 2000,
  "members": 30,
  "badgeUrls": {},
  "warWinRate": "75.00%",
  "description": "Integration Test Clan"
}

Spieler-Informationen

Endpoint: /api/player

Method: GET

Query-Parameter:

tag (erforderlich): Der Tag des Spielers.

Beispiel:

curl "http://localhost:3000/api/player?tag=%23PLAYER123"

Antwort:

{
  "name": "Test Player",
  "level": 99,
  "trophies": 3000,
  "donations": 200,
  "attacks": 150,
  "defenses": 50
}

Clan-Kriegsstatus

Endpoint: /api/clanwar

Method: GET

Query-Parameter:

tag (optional): Der Tag des Clans. Standardwert: #P9QGQLPU.

Beispiel:

curl "http://localhost:3000/api/clanwar?tag=%23TESTCLAN"

Antwort:

{
  "clanName": "Test Clan",
  "opponentName": "Opponent Clan",
  "clanStars": 30,
  "opponentStars": 20,
  "clanAttacks": 15,
  "totalAttacks": 20
}

Lizenz

Dieses Projekt ist unter der MIT-Lizenz veröffentlicht.

