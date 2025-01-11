# FireCastle Project

## Projektbeschreibung
FireCastle ist ein Node.js-Projekt, das API-Endpunkte für Clash of Clans bereitstellt. Es bietet Routen für die Abfrage von Clan- und Spielerinformationen sowie den Status laufender Clan-Kriege. Erweiterte Statistiken und eine Caching-Logik verbessern die Performance.

## Installation

### Voraussetzungen
- Node.js (Version 14 oder höher)
- npm (Node Package Manager)

### Schritte
1. **Repository klonen:**
   ```bash
   git clone <repository-url>
   cd FireCastle
   ```

2. **Abhängigkeiten installieren:**
   ```bash
   npm install
   ```

3. **Umgebungsvariablen einrichten:**
   Erstelle eine `.env`-Datei im Stammverzeichnis und füge deinen Clash of Clans API-Schlüssel hinzu:
   ```env
   API_TOKEN=<dein_api_token>
   ```

4. **Server starten:**
   ```bash
   npm start
   ```

   Der Server wird auf `http://localhost:3000` laufen.

## Tests

### Ausführen der Tests
Um sicherzustellen, dass alles korrekt funktioniert, führe die Tests mit Jest aus:
```bash
npm test
```

### Testberichte
Die Tests decken folgende Bereiche ab:
- Unit-Tests für Modelle und Services.
- Integrationstests für API-Endpunkte.

## API-Dokumentation

### Clan-Informationen
**Endpoint:** `/api/clan`

**Method:** GET

**Query-Parameter:**
- `tag` (erforderlich): Der Tag des Clans.

**Beispiel:**
```bash
curl "http://localhost:3000/api/clan?tag=%23TESTTAG"
```

**Antwort:**
```json
{
  "name": "Test Clan",
  "level": 10,
  "points": 2000,
  "members": 30,
  "badgeUrls": {},
  "warWinRate": "75.00%",
  "description": "Integration Test Clan"
}
```

### Spieler-Informationen
**Endpoint:** `/api/player`

**Method:** GET

**Query-Parameter:**
- `tag` (erforderlich): Der Tag des Spielers.

**Beispiel:**
```bash
curl "http://localhost:3000/api/player?tag=%23PLAYER123"
```

**Antwort:**
```json
{
  "name": "Test Player",
  "level": 99,
  "trophies": 3000,
  "donations": 200,
  "attacks": 150,
  "defenses": 50
}
```

### Clan-Kriegsstatus
**Endpoint:** `/api/clanwar`

**Method:** GET

**Query-Parameter:**
- `tag` (optional): Der Tag des Clans. Standardwert: `#P9QGQLPU`.

**Beispiel:**
```bash
curl "http://localhost:3000/api/clanwar?tag=%23TESTCLAN"
```

**Antwort:**
```json
{
  "clanName": "Test Clan",
  "opponentName": "Opponent Clan",
  "clanStars": 30,
  "opponentStars": 20,
  "clanAttacks": 15,
  "totalAttacks": 20
}
```

### Erweiterte Clan-Statistiken
**Endpoint:** `/api/clan/stats`

**Method:** GET

**Query-Parameter:**
- `tag` (erforderlich): Der Tag des Clans.

**Beispiel:**
```bash
curl "http://localhost:3000/api/clan/stats?tag=%23TESTCLAN"
```

**Antwort:**
```json
{
  "clanName": "Test Clan",
  "totalDonations": 650,
  "topDonors": [
    { "name": "Member3", "donations": 300 },
    { "name": "Member2", "donations": 200 },
    { "name": "Member1", "donations": 100 }
  ]
}
```

### Erweiterte Spieler-Statistiken
**Endpoint:** `/api/player/stats`

**Method:** GET

**Query-Parameter:**
- `tag` (erforderlich): Der Tag des Spielers.

**Beispiel:**
```bash
curl "http://localhost:3000/api/player/stats?tag=%23TESTPLAYER"
```

**Antwort:**
```json
{
  "playerName": "Test Player",
  "level": 50,
  "totalTrophies": 3000,
  "totalDonations": 500,
  "totalAttacks": 150,
  "totalDefenses": 100
}
```

## Caching

### Implementierung
- Es wird ein In-Memory-Cache mit **node-cache** verwendet.
- Standardzeit (TTL): 5 Minuten.

### Funktionsweise
1. **Cache-Hit:** Wenn eine Anfrage bereits im Cache gespeichert ist, wird die Antwort direkt geliefert.
2. **Cache-Miss:** Die Antwort wird nach der Verarbeitung gespeichert.

### Beispiel
- Anfrage an `/api/clan` mit dem gleichen Tag innerhalb von 5 Minuten liefert die Antwort aus dem Cache.
- Logs zeigen „Cache hit“ an.

## Logging

### Implementierung
- Es wird **winston** für Logging verwendet.
- Logs werden in die Konsole und in folgende Dateien geschrieben:
  - `logs/combined.log`: Alle Logs.
  - `logs/error.log`: Nur Fehler.

### Log-Level
- **info**: Allgemeine Informationen, wie eingehende Anfragen.
- **error**: Fehler und Ausnahmen.

### Beispiel
- Anfrage an `/api/player` ohne `tag`:
  ```
  [2025-01-11 12:00:00] ERROR: Player tag is required
  ```

## Lizenz
Dieses Projekt ist unter der MIT-Lizenz veröffentlicht.
