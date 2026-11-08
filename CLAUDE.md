# The Capable Human — notes for Claude Code

Personal gamified calisthenics skill-tree PWA. Owner: Lukas (writes Swedish and English; the app UI is English, docs are Swedish).

## Stack
- Plain HTML/CSS/JS, no build step, no framework. Classic scripts load in order: `firebase-config.js` → `sync.js` → `data.js` → `app.js` (globals, not modules).
- Hosting: GitHub Pages via `.github/workflows/deploy.yml` (push to `main`).
- Sync: Firebase Auth (Google) + Firestore, loaded at runtime from gstatic only when `window.FIREBASE_CONFIG` is set. Without it the app is local-only (`localStorage` key `tch-state-v1`).
- Offline: `sw.js` caches the shell. **Bump `VERSION` in `sw.js` on every change that ships.**

## Data model (`state`, normalized by `normalize()` in app.js)
- `st`: `{skillId: 1 training | 2 mastered}`
- `goals`: up to 3 skill ids
- `log`: `[{id, v, d:'YYYY-MM-DD'}]` best set per entry; capped at 800
- `md`: `{skillId: date mastered}`
- `ach`: `{achievementId: date unlocked}` — stored so XP persists
- `q`: `{weekKey: [questId]}` — completed weekly quests
- Firestore doc: `users/{uid}` → `{state, updated}`

## XP rules (keep these consistent if you change them)
- Mastery: `XPT[tier]` per mastered skill.
- Log: +5 first log per skill per day, +15 for a PR (once per skill per day), +10 per distinct training day.
- Quests (`QDEF`) and achievements (`ACH[].xp`) add their XP once stored.
- Level: `floor(sqrt(xp/15)) + 1`. Ranks in `RANKS`.
- XP is derived from state on every render, never stored as a number.

## Conventions
- Colors are CSS tokens in `:root`; branch neon colors in `NEON` (app.js).
- Skills are added in `data.js` with `S(...)`. Prereqs must reference existing ids and a lower tier.
- Test at 390px width (phone) and desktop. No horizontal page scroll.
- Respect `prefers-reduced-motion` for new animations.
