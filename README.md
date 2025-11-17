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
  Erstelle eine `.env`-Datei im Stammverzeichnis (siehe `.env.example`) und füge deinen Clash of Clans API-Schlüssel hinzu:
  ```env
  API_TOKEN=<dein_api_token>
  API_BASE_URL=https://api.clashofclans.com/v1
  PORT=3000
  # Optional: CORS erlaubte Origins (nur Origin, ohne Pfad), kommasepariert
  # Beispiel korrekt: https://maximilianhaak.de,http://localhost:3000
  # Beispiel falsch (mit Pfad): https://maximilianhaak.de/FireCastle
  CORS_ORIGINS=https://maximilianhaak.de,http://localhost:3000
  LOG_LEVEL=info
  ```

4. **Server starten:**
   ```bash
   npm start
   ```

   Der Server wird auf `http://localhost:3000` laufen.

## Sicherheit und API-Keys (wichtig)

- Leake niemals deinen API-Key im Quellcode oder im Browser. Hinterlege ihn ausschließlich als Umgebungsvariable (`API_TOKEN`) auf dem Server.
- Die Supercell/Clash of Clans API ist per IP-Whitelist geschützt. Du musst in der Developer Console die öffentliche IP deines Backends hinterlegen. Dynos/Server ohne feste Ausgangs-IP (z. B. Free-Tier) funktionieren i. d. R. nicht zuverlässig.
- Empfohlene Optionen für eine feste Ausgangs-IP:
  - Eigenen Server/VPS (Hetzner, DO, etc.) betreiben und diese IP whitelisten.
  - PaaS mit statischer Egress-IP nutzen (z. B. QuotaGuard Static/Proxies).
- Wenn ein Key versehentlich öffentlich wurde, lösche ihn sofort und erstelle einen neuen.

### IP-Whitelist: Egress-IP zuverlässig ermitteln

Ermittle die ausgehende öffentliche IPv4 deines Backends und trage sie im Supercell Developer Portal ein:

- Linux/macOS (Shell):
  - Optional
    curl https://api.ipify.org
  - Optional
    curl https://ifconfig.me
- Windows (PowerShell):
  - Optional
    Invoke-RestMethod -Uri "https://api.ipify.org"

Hinweise:
- Bei PaaS-Providern unterscheidet sich die Egress-IP oft von der Instanz-IP. Prüfe die Doku deines Anbieters (Stichworte: "static egress IP", "NAT gateway").
- Bei Lastverteilern/Proxies kann die Egress-IP eine vom Gateway sein.
- Änderungen der IP erfordern ein Update der Whitelist, sonst schlagen Requests mit 403 fehl.

### Alternative ohne eigene statische IP: RoyaleAPI Proxy

Wenn du keine statische Ausgangs-IP bereitstellen kannst, kannst du den Proxy von RoyaleAPI nutzen:

1) Erstelle einen API-Key im offiziellen Portal und whitelist die Proxy-IP.
2) Ersetze die Basis-URL der API:
   - Clash of Clans: `https://api.clashofclans.com` → `https://cocproxy.royaleapi.dev`

Quelle und Details: https://docs.royaleapi.com/proxy.html

Hinweis: Die in der Doku genannte Whitelist-IP (z. B. `45.79.218.79` für CR) kann sich ändern. Prüfe die verlinkte Seite für die aktuell gültige IP und Hinweise für Clash of Clans.

## Deployment unter maximilianhaak.de/FireCastle/

Dieses Projekt kann sowohl das Frontend (statische Dateien) als auch die API-Endpunkte ausliefern:

- Der Node-Server (`index.js`) bedient `/api/...` sowie statische Assets (`/css`, `/js`, `/images`, `/pages`) und `index.html`.
- Das Procfile startet nun `node index.js`.

Varianten:
- Vollständig auf einem Server hosten (Empfehlung): Domain/Reverse Proxy → Node-App. Dann funktionieren relative Calls wie `/api/clan` direkt.
- Frontend z. B. via GitHub Pages unter `/FireCastle` und Backend separat hosten: Dann im Frontend eine Basis-URL konfigurieren (oder Reverse Proxy einrichten), damit Requests an dein Backend gehen.

## Tests und Entwicklung

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
 
