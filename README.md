# The Capable Human

Ett gamifierat skill tree för calisthenics. 115 färdigheter i 11 grenar, med guider, XP, veckouppdrag, achievements, streaks, träningslogg och ett tredagarsschema som anpassar sig efter dina mål.

Appen är en vanlig webbsida utan byggsteg. Den kan installeras som app på telefonen och fungerar offline. Med Firebase påslaget loggar du in med Google och har samma framsteg på mobil och dator.

## Struktur

| Fil | Vad den gör |
|---|---|
| `index.html` | Appens skal: header, vyer, flikar |
| `css/style.css` | All styling (färger som tokens i `:root`) |
| `js/data.js` | Grenar, tiers, XP per tier och alla färdigheter med guider |
| `js/app.js` | All logik: trädet, grenvyn, XP, quests, achievements, logg, plan |
| `js/sync.js` | Google-inloggning och molnsynk via Firebase |
| `js/firebase-config.js` | Din Firebase-konfiguration (tom = bara lokalt) |
| `sw.js`, `manifest.webmanifest`, `icons/` | Installation som app och offline-stöd |
| `firestore.rules` | Säkerhetsregler: var och en kan bara läsa sin egen data |

## Kör lokalt

```bash
python3 -m http.server 8000
# öppna http://localhost:8000
```

## Publicera med en länk (GitHub Pages, gratis)

1. Repot måste vara **publikt** för gratis GitHub Pages. Koden innehåller ingen personlig data.
2. GitHub → repot → **Settings → Pages → Source: GitHub Actions**.
3. Varje push till `main` publicerar automatiskt till `https://<användarnamn>.github.io/the-capable-human/`.

## Slå på Google-inloggning och synk (Firebase, gratis)

1. Gå till [console.firebase.google.com](https://console.firebase.google.com) och skapa ett projekt (Google Analytics behövs inte).
2. **Build → Authentication → Get started → Sign-in method → Google → Enable.**
3. **Authentication → Settings → Authorized domains → Add domain:** `<användarnamn>.github.io`.
4. **Build → Firestore Database → Create database** (produktionsläge, region `europe-north1`).
5. **Firestore → Rules:** klistra in innehållet i `firestore.rules` och publicera.
6. **Project settings → Your apps → Web (`</>`)** → registrera appen → kopiera `firebaseConfig`.
7. Klistra in värdena i `js/firebase-config.js` och pusha.

Värdena i konfigurationen är inte hemliga. Det är säkerhetsreglerna som skyddar datan.

## Installera på telefonen

- **iPhone (Safari):** öppna länken → Dela → **Lägg till på hemskärmen**.
- **Android (Chrome):** öppna länken → ⋮ → **Installera app**.

Om Google-inloggningen krånglar i hemskärmsappen på iPhone: logga in en gång i Safari först, eller flytta hostingen till Firebase Hosting (`firebase deploy`) så att inloggning och app ligger på samma domän.

## Uppdatera appen

Ändra `VERSION` i `sw.js` vid varje release, så att telefoner hämtar de nya filerna.

## Flytta över framsteg från Claude-versionen

Öppna den gamla versionen → profilikonen → **Copy backup**. Öppna den nya → profilikonen → **Restore from backup** och klistra in.
