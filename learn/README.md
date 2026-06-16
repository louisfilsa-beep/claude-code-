# DriveAruba Learn

Gamified learning for the **Aruba driving theory exam** — _Learn. Practice. Pass._

A mobile-first, Duolingo-style web app built with **Vite + React**. It is the
whole site, served from the GitHub Pages project root. No backend, no sign-up —
all progress is stored on the device, so it works offline-first and installs as
a PWA. Later it can be wrapped for the iOS/Android stores.

## What's inside

- **Landing page** — marketing hero, features, and "Start learning" CTAs.
- **Skill-tree path** — units → lessons that unlock as you progress.
- **Lesson player** — multiple-choice, true/false, and traffic-sign questions
  with instant feedback, explanations, and a 5-heart limit.
- **Mock exam** — 10 mixed questions, 80% to pass, tracks your best score.
- **Gamification** — XP, levels, daily streaks, and 3-star lesson scoring.
- **Profile** — your stats, level progress, and a reset button.

## Local development

```bash
cd learn
npm install     # first time only
npm run dev     # http://localhost:5173/claude-code-/
npm run build   # production build -> learn/dist
npm run preview # serve the production build locally
```

> Node 18+ required (developed on Node 22).

## Project structure

```
learn/
├── index.html              # Vite entry (meta, fonts, PWA manifest)
├── vite.config.js          # base path = /claude-code-/
├── public/                 # favicon, manifest
└── src/
    ├── main.jsx            # entry — wraps app in <ProgressProvider>
    ├── App.jsx             # hash router: landing / app / lesson
    ├── index.css           # landing + design-token styles
    ├── app.css             # in-app (post-landing) styles
    ├── lib/router.js       # tiny hash-based router
    ├── data/curriculum.js  # units, lessons, questions, exam builder
    ├── state/progress.jsx  # XP / streak / hearts / unlocks (localStorage)
    └── components/
        ├── Landing + sections (Nav, Hero, Features, …)
        └── app/            # AppShell, LearnPath, LessonPlayer, QuestionCard,
                            # Practice, Profile, Onboarding, TopBar, TabBar, Sign
```

## Routing

Hash-based, so deep links and refreshes work on static GitHub Pages with no
server rewrites:

| Route          | Screen              |
| -------------- | ------------------- |
| `#/`           | Landing page        |
| `#/learn`      | Skill-tree home     |
| `#/lesson/:id` | Lesson player       |
| `#/practice`   | Mock exam           |
| `#/profile`    | Stats & settings    |

## Going live (one-time GitHub Pages setup)

Deployment is handled by
[`../.github/workflows/deploy-pages.yml`](../.github/workflows/deploy-pages.yml),
which builds this app and publishes it to the Pages root. Two steps to activate:

1. **Repo → Settings → Pages → Build and deployment → Source = "GitHub Actions"**.
2. Merge to the default branch (currently `claude/quirky-euler-awf8te`). The
   workflow runs on every push there, or on demand via **Actions → Run workflow**.

Live URL once deployed: `https://louisfilsa-beep.github.io/claude-code-/`

> If you add a custom domain later, set `base` in `vite.config.js` to `/`.

## A note on `npm audit`

`npm audit` flags a **high-severity esbuild advisory** (`GHSA-67mh-4wv8-2f99`).
It only affects the **local dev server** (`npm run dev`) — it cannot reach the
static files we deploy. The only "fix" is a breaking Vite 8 upgrade, so it's
intentionally left as-is. The production build is unaffected.

## Content disclaimer

DriveAruba Learn is an independent study aid and is **not affiliated with any
Aruba government body**. Lesson content is written to be conceptually correct for
general driving theory; **exact Aruba-specific figures (speed limits, blood-
alcohol limits, fees) must be verified against the official Aruba driving manual**
before public launch. Most questions are deliberately framed around universal
principles or reading the sign in front of you.

## Roadmap ideas

- Expand the question bank and add Papiamento / Dutch / Spanish language options.
- AI tutor ("explain this answer") via a small serverless proxy.
- Image-based hazard-perception questions and a timed exam mode.
- Optional accounts to sync progress across devices.
