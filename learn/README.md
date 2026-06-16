# DriveAruba Learn

Gamified learning for the **Aruba driving theory exam** — _Learn. Practice. Pass._

This is the **v1 landing page** (marketing + email waitlist), built with **Vite +
React**. It deploys to the `/learn` path of the repo's GitHub Pages site, while
the existing Velox AI page keeps the root. The full Duolingo-style learning app
(skill tree, quizzes, mock exams, XP/streaks, AI tutor) builds on this foundation
in later milestones.

## Local development

```bash
cd learn
npm install     # first time only
npm run dev     # http://localhost:5173/claude-code-/learn/
npm run build   # production build -> learn/dist
npm run preview # serve the production build locally
```

> Node 18+ required (developed on Node 22).

## Project structure

```
learn/
├── index.html              # Vite HTML entry (meta tags, fonts, PWA manifest)
├── vite.config.js          # base path = /claude-code-/learn/
├── public/
│   ├── favicon.svg         # steering-wheel mark in Aruba colors
│   └── manifest.webmanifest
└── src/
    ├── main.jsx            # React entry
    ├── App.jsx             # page composition
    ├── index.css           # design system + all section styles
    ├── api/waitlist.js     # waitlist submit (Google Apps Script backend)
    └── components/         # Nav, Hero, PhoneMockup, Features, HowItWorks,
                            # Topics, Gamification, FinalCTA, Footer, WaitlistForm
```

## Wiring up the waitlist

The form posts to the same Google Apps Script backend the Velox page uses
(see [`../apps-script/SETUP.md`](../apps-script/SETUP.md)). Signups are tagged
`source: "drivearuba-landing"`, so one sheet can collect both products.

Until a backend URL is set, the form runs in **demo mode** (success is simulated,
no network call, emails remembered in `localStorage`). To go live, either:

1. Edit `WAITLIST_URL` in [`src/api/waitlist.js`](src/api/waitlist.js), **or**
2. Set `VITE_WAITLIST_URL` at build time (e.g. a `.env` file or CI variable).

## Going live (one-time GitHub Pages setup)

Deployment is handled by [`../.github/workflows/deploy-pages.yml`](../.github/workflows/deploy-pages.yml),
which builds this app and publishes the whole site (Velox at `/`, DriveAruba at
`/learn`). Two steps to activate it:

1. **Repo → Settings → Pages → Build and deployment → Source = "GitHub Actions"**
   (this replaces the current branch-based deploy).
2. Merge to the default branch (currently `claude/quirky-euler-awf8te`). The
   workflow runs on every push there, or on demand via **Actions → Run workflow**.

Live URLs once deployed:

- Velox AI → `https://louisfilsa-beep.github.io/claude-code-/`
- DriveAruba Learn → `https://louisfilsa-beep.github.io/claude-code-/learn/`

> If you later add a custom domain, update `base` in `vite.config.js`
> (e.g. to `/` or `/learn/`) so asset URLs still resolve.

## A note on `npm audit`

`npm audit` flags a **high-severity esbuild advisory** (`GHSA-67mh-4wv8-2f99`).
It only affects the **local dev server** (`npm run dev`) — it cannot reach the
static files we deploy. The only "fix" is a breaking upgrade to Vite 8, so it's
intentionally left as-is for now. The production build is unaffected.

## Content disclaimer

DriveAruba Learn is an independent study aid and is **not affiliated with any
Aruba government body**. Lesson content (signs, rules, right-of-way) should be
verified against the official Aruba driving manual before public launch.
