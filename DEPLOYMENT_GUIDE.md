# FireCastle Production Deployment Guide

## Architektur

`	ext
  FireCastle Website  
 (GitHub Pages)       
       |
       v
 Supabase Edge Funcs  <-- Auto-Login & Key Management
 (Serverless Deno)    
       |
       v
 Clash of Clans API   
 (Supercell)          
``r

## Deployment Checkliste

### Phase 1: Supabase Setup
- [ ] 1.1 Projekt erstellen
- [ ] 1.2 Tabelle clash_api_keys erstellen (siehe supabase/schema.sql)
- [ ] 1.3 Secrets setzen: CLASH_DEV_EMAIL, CLASH_DEV_PASSWORD

### Phase 2: Deployment
- [ ] 2.1 deploy.ps1 ausführen
- [ ] 2.2 Supabase Login & Link durchführen
- [ ] 2.3 Functions deployen

## Troubleshooting

### "Invalid IP" Fehler
Das System loggt sich automatisch ein und erstellt einen Key für die aktuelle IP.
Falls das fehlschlägt, prüfe die Logs in Supabase Dashboard -> Edge Functions -> Logs.

### "Login Failed"
Prüfe ob CLASH_DEV_EMAIL und CLASH_DEV_PASSWORD korrekt gesetzt sind.
Prüfe ob du dich manuell im Developer Portal einloggen kannst.