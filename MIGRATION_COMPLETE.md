#  FireCastle Supabase Migration - Complete!

##  Was wurde gemacht?

FireCastle wurde erfolgreich von einem lokalen Node.js Express Server zu Supabase Edge Functions migriert - genau wie bei CasinoIdleSlots!

### Erstellte Dateien

#### 1. Supabase Edge Functions (5 Functions)
```
supabase/functions/
 _shared/clashApi.ts        Shared API helper
 clan/index.ts               Clan data endpoint
 player/index.ts             Player data endpoint
 clanwar/index.ts            War status endpoint
 clan-stats/index.ts         Extended clan stats
 player-stats/index.ts       Extended player stats
```

#### 2. Frontend Anpassungen
-  `js/api-config.js` - Auto-Detection von local vs production
-  `js/script.js` - Updated für neue API-Config
-  `index.html` - Script Tag hinzugefügt
-  `pages/clanSearch.html` - Script Tag hinzugefügt
-  `pages/livewarStatus.html` - Script Tag hinzugefügt

#### 3. Deployment & Dokumentation
-  `deploy-functions.sh` - Bash deployment script
-  `deploy-functions.ps1` - PowerShell deployment script
-  `SUPABASE_SETUP.md` - Komplette Setup-Dokumentation
-  `supabase/README.md` - Functions Dokumentation

##  Wie funktioniert es?

### Automatische Environment-Detection

Das Frontend erkennt automatisch ob es lokal oder in Production läuft:

```javascript
// Local Development (localhost)
API_BASE = "/api"  //  Express Server auf localhost:3000

// Production (maximilianhaak.de)
API_BASE = "https://wwopmipdxzhkouxngezp.supabase.co/functions/v1"
```

**Keine manuelle Konfiguration nötig!** 

### API Endpoints

Alle 5 Endpoints sind verfügbar:

| Endpoint | URL | Beschreibung |
|----------|-----|--------------|
| Clan | `/functions/v1/clan` | Clan-Daten |
| Player | `/functions/v1/player?tag={tag}` | Spieler-Daten |
| Clan War | `/functions/v1/clanwar` | Kriegs-Status |
| Clan Stats | `/functions/v1/clan-stats` | Erweiterte Clan-Statistiken |
| Player Stats | `/functions/v1/player-stats?tag={tag}` | Erweiterte Spieler-Stats |

##  Nächste Schritte (WICHTIG!)

### 1. Supabase Dashboard Secrets konfigurieren

Gehe zu: https://supabase.com/dashboard/project/wwopmipdxzhkouxngezp/settings/functions

Füge folgende Secrets hinzu:

```
CLASH_API_TOKEN = [Dein Clash of Clans API Token]
CLASH_CLAN_TAG = %232Y0G2QC9J  (optional, dein Clan Tag)
```

**Wie bekomme ich den Token?**
1. Gehe zu https://developer.clashofclans.com/
2. Login mit Supercell ID
3. Erstelle einen neuen API Key
4. Kopiere den Token

### 2. Functions deployen

#### Option A: Lokales Deployment (empfohlen zum Testen)

```powershell
# Supabase CLI installieren (einmalig)
npm install -g supabase

# Login
supabase login

# Functions deployen
cd FireCastle
.\deploy-functions.ps1
```

#### Option B: GitHub Actions Workflow (später)

Wir können einen automatischen Deployment-Workflow erstellen wie bei CasinoIdleSlots.

### 3. Testen

Nach dem Deployment:

1. **Test Clan Endpoint:**
   ```
   https://wwopmipdxzhkouxngezp.supabase.co/functions/v1/clan
   ```

2. **Test Player Endpoint:**
   ```
   https://wwopmipdxzhkouxngezp.supabase.co/functions/v1/player?tag=%23PLAYERTAG
   ```

3. **Test auf der Website:**
   ```
   https://maximilianhaak.de/FireCastle/
   ```

##  Status

```
 Edge Functions erstellt (5/5)
 Shared API Helper implementiert
 Frontend angepasst mit Auto-Detection
 Deployment Scripts erstellt
 Dokumentation komplett

 Supabase Secrets konfigurieren
 Functions deployen
 Testen
 GitHub Actions Workflow erstellen (optional)
```

##  Vorteile der neuen Architektur

1. **Serverless** - Keine Server-Verwaltung
2. **Kostenlos** - Supabase Free Tier reicht
3. **Skalierbar** - Automatisches Scaling
4. **Schnell** - Edge Functions in Deno
5. **Einfach** - Deployment mit einem Befehl
6. **GitHub Pages kompatibel** - Static hosting funktioniert jetzt!

##  Dokumentation

- `SUPABASE_SETUP.md` - Komplette Setup-Anleitung
- `supabase/README.md` - Functions Dokumentation
- `deploy-functions.ps1` - Deployment Script

##  Zusammenfassung

FireCastle nutzt jetzt die **gleiche moderne Serverless-Architektur** wie CasinoIdleSlots!

**Von:** Node.js Express (localhost only)
**Zu:** Supabase Edge Functions (production ready)

**Nächster Schritt:** Secrets konfigurieren und deployen! 

---

**Migration abgeschlossen:** 2025-01-18
**Nächste Aktion:** Supabase Dashboard Secrets konfigurieren
