# Personal site / online resume — design spec

**Date:** 2026-05-08
**Repo:** `sepbehroozi.github.io`
**Status:** approved design, ready for implementation plan

## Overview

Replace the current "Hello World" homepage at `sepbehroozi.github.io` with a personal site that combines a short bio with an inline online resume. The site is general-audience (recruiters, peers, prospective clients) and will be edited a few times a year. The resume PDF is maintained separately by the user via an external CV maker; the site links to it for download but the inline HTML resume is a hand-curated, web-flavored representation of the same information.

## Hard constraints

These URLs are referenced by the user's shipped mobile apps (Treffen via AltStore, Sepool, TM Forwarder) and **must continue to resolve at the same paths with semantically equivalent content**:

| URL | Today | After redesign |
|-----|-------|----------------|
| `/altstore/alt_source.json` | static JSON | static JSON, byte-identical |
| `/altstore/Treffen/*` (IPA files) | static binaries | static binaries, byte-identical |
| `/sepool/privacy_policy` | rendered HTML | rendered HTML (new layout) |
| `/sepool/terms_of_service` | rendered HTML | rendered HTML (new layout) |
| `/tmforwarder/privacy_policy` | rendered HTML | rendered HTML (new layout) |
| `/tmforwarder/power-optimization-settings` | rendered HTML | rendered HTML (new layout) |
| `/tmforwarder/resources/*` | static images | static images, byte-identical |

Other constraints:
- Hosting: stays on `sepbehroozi.github.io` (no custom domain)
- Resume PDF (`/resume.pdf`) is hand-maintained externally; site only links to it
- Light maintenance: editing the site should mean editing one structured data file, not touching components

## Out of scope

- Projects / portfolio page
- Blog / writing
- Custom domain
- Auto-generating the resume PDF from data
- Preserving the `/sepool/terms_of_service.md` raw-markdown URL form (the bare-name and `.html` forms are preserved). Nothing in the repo references `.md` URLs; shipped apps presumably link to bare names.
- i18n (English only)
- Analytics / tracking

## Stack

| Layer | Choice |
|-------|--------|
| Static site generator | **Astro** |
| Styling | **Tailwind CSS** via `@astrojs/tailwind` |
| Animations | **Motion** (`motion.dev`) |
| Language | TypeScript for components and data |
| Hosting | **GitHub Pages**, deployed via **GitHub Actions** (Pages source: "GitHub Actions" — no `gh-pages` branch) |

## Project structure

```
sepbehroozi.github.io/
├── src/
│   ├── pages/
│   │   ├── index.astro                      # homepage (bio + resume)
│   │   ├── sepool/
│   │   │   ├── privacy_policy.md
│   │   │   └── terms_of_service.md
│   │   └── tmforwarder/
│   │       ├── privacy_policy.md
│   │       ├── terms_of_service.md
│   │       └── power-optimization-settings.md
│   ├── layouts/
│   │   ├── Layout.astro                     # base HTML, fonts, gradient backdrop, motion init
│   │   └── Legal.astro                      # plain layout for legal markdown pages
│   ├── components/
│   │   ├── Sidebar.astro                    # sticky identity rail
│   │   ├── Avatar.astro                     # circular photo
│   │   ├── ContactLinks.astro               # GitHub + LinkedIn icons
│   │   ├── DownloadCV.astro                 # gradient CTA → /resume.pdf
│   │   ├── SkillGroup.astro                 # one labeled cluster of pills
│   │   ├── ContentStream.astro              # right column wrapper
│   │   ├── ExperienceCard.astro
│   │   └── EducationCard.astro
│   ├── data/
│   │   └── resume.ts                        # typed source-of-truth for site content
│   └── styles/
│       └── global.css                       # Tailwind directives + CSS custom properties
├── public/
│   ├── resume.pdf                           # hand-maintained PDF
│   ├── photo.jpg                            # portrait
│   ├── favicon.svg                          # SVG favicon (gradient initial 'S')
│   ├── og-image.png                         # OpenGraph share card (1200×630)
│   ├── altstore/
│   │   ├── alt_source.json
│   │   └── Treffen/                         # IPA files
│   └── tmforwarder/
│       └── resources/                       # icons referenced from MD pages
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── tsconfig.json
├── README.md
└── .github/
    └── workflows/
        └── deploy.yml
```

The legacy `_config.yml`, root `index.html` (Hello World), and the existing `altstore/`, `sepool/`, `tmforwarder/` directories at repo root are **deleted** and recreated under `public/` (for static assets) or `src/pages/` (for markdown legal pages with front matter added).

## URL preservation contract

`astro.config.mjs` sets `build.format: 'file'`. Astro emits sibling `.html` files (e.g. `dist/sepool/terms_of_service.html`), not directory-index pages. GitHub Pages strips the `.html` extension automatically, so both `/sepool/terms_of_service` and `/sepool/terms_of_service.html` resolve to the same rendered page.

Each legal `.md` file gets minimal front matter added:

```yaml
---
layout: ../../layouts/Legal.astro
title: Privacy Policy — Sepool
---
```

The original markdown body is preserved verbatim. Inline raw HTML (e.g. the `<img>` tags with style attributes used in `power-optimization-settings.md`) continues to work since Astro's markdown processor allows raw HTML.

`tmforwarder/resources/` lives in `public/tmforwarder/resources/` so the relative `./resources/<icon>.png` references in `power-optimization-settings.md` continue to resolve at runtime.

## Visual design

**Mood:** modern dark with soft purple/pink gradients (selected as "Modern Dark Gradient" in brainstorm).

**Color tokens** (defined as CSS custom properties in `global.css`):
- `--bg-base`: `#0a0a18`
- `--bg-radial-from`: `#1f1147` (deep purple)
- `--text-primary`: `#f5f5f7`
- `--text-secondary`: `#a5b0c7`
- `--text-tertiary`: `#6c7693`
- `--accent-from`: `#c4b5fd` (violet)
- `--accent-to`: `#f9a8d4` (pink)
- `--surface`: `rgba(255, 255, 255, 0.03)`
- `--surface-border`: `rgba(255, 255, 255, 0.08)`
- `--pill-bg`: `rgba(255, 255, 255, 0.06)`
- `--pill-border`: `rgba(255, 255, 255, 0.13)`

**Backdrop:**
- Radial gradient from `--bg-radial-from` (top-left) to `--bg-base`
- Two-three soft glowing orbs (blurred radial gradients) drifting slowly, parallaxing on scroll & cursor
- Backdrop is a fixed-position element behind content

**Typography:**
- Primary: **Inter Variable** (self-hosted via `@fontsource-variable/inter` for stability)
- Tabular numerics for date ranges
- Fallback stack: `system-ui, -apple-system, sans-serif`
- Hero name uses gradient-text effect (`--accent-from` → `--accent-to`)

**Layout:**
- Two-column above 1024px: ~300px sticky left rail + flexible right stream
- Single column below 1024px: rail collapses into a top hero, stream below
- Max content width ~1100px, centered with horizontal padding
- Comfortable section spacing (~64px between top-level sections on the right column)

**Surfaces:**
- Cards (`ExperienceCard`, `EducationCard`): translucent white surface (`--surface`), 1px hairline border (`--surface-border`), 12px radius, ~16-20px padding
- Pills (skill items): translucent ghost style with `--pill-bg` / `--pill-border`, 999px radius

## Component contracts

### Sidebar (sticky on left ≥1024px)

```
Avatar (96px circle, photo, soft gradient halo)
Name (gradient text, 28px bold)
Role (1 line, secondary color)
Tagline (1-2 sentences, secondary color)
ContactLinks  → GitHub, LinkedIn
DownloadCV    → /resume.pdf, gradient-fill button
SkillGroup × N → grouped by category, label + pills
```

Sticky positioning: `position: sticky; top: 32px;` within a tall container, so it stays visible while the right column scrolls. Below 1024px, the sidebar becomes a flowing top section (no sticky behavior).

### ContentStream (right column)

Sections in order:
1. **About** — short narrative paragraph (1-3 sentences) sourced from `resume.ts`. Optional; omitted if empty.
2. **Experience** — vertical list of `ExperienceCard`, newest first.
3. **Education** — vertical list of `EducationCard`, newest first.

Each section has a small uppercase label (`--text-tertiary`) above its content.

### ExperienceCard

```
[ Company · Role                              dates ]   ← header row
[ Location (optional, secondary)                    ]
[ • Bullet                                          ]
[ • Bullet                                          ]
[ Optional links (e.g., project URL)                ]
```

- Dates use tabular-nums and right-align
- Bullets are 1-3 short achievement-oriented points
- Hover: card lifts ~2px and border brightens slightly

### EducationCard

```
[ Institution                                  dates ]
[ Degree (+ optional notes)                          ]
```

### SkillGroup

```
LABEL
[pill] [pill] [pill] [pill]
```

Each group is a thematic cluster (e.g. "Languages", "Mobile", "Backend", "Tooling"). Number of groups and labels are user-defined in `resume.ts`.

## Data model (`src/data/resume.ts`)

Single source of truth for all editable site content. Editing the site = editing this file.

```typescript
type ContactLink = { kind: 'github' | 'linkedin'; href: string; label: string };

type SkillGroup = { label: string; items: string[] };

type DateRange = { start: string; end: string | 'present' }; // 'YYYY' or 'YYYY-MM'

type Experience = {
  company: string;
  role: string;
  location?: string;
  range: DateRange;
  bullets: string[];
  links?: { label: string; href: string }[];
};

type Education = {
  institution: string;
  degree: string;
  range: DateRange;
  notes?: string;
};

type Resume = {
  identity: {
    name: string;
    role: string;
    tagline: string;
    photo: string;          // path under public/, e.g., '/photo.jpg'
    contact: ContactLink[]; // GitHub + LinkedIn
  };
  about?: string;            // optional narrative paragraph
  experience: Experience[];
  education: Education[];
  skillGroups: SkillGroup[];
  resumePdf: string;         // defaults to '/resume.pdf'
};

export const resume: Resume = { /* user-filled */ };
```

## Animations (Motion)

All animation work uses the Motion library (`motion.dev`), imported as ES modules into a single client-side script registered via Astro's `is:inline` or `client:load` islands as needed.

**On load:**
- Sidebar: slides in from -16px x and fades (opacity 0→1) over ~400ms, ease-out
- Hero name: gentle character stagger (~20ms per character) for the gradient-text name
- Background orbs: enter their continuous drift loop (20-30s linear cycles)

**On scroll (IntersectionObserver-triggered):**
- ExperienceCard / EducationCard: stagger reveal as they enter viewport — translateY(12px) → 0, opacity 0 → 1, with a soft spring (~stiffness 100, damping 15)
- Section labels fade in just before their first child enters

**Continuous / interactive:**
- Background orbs drift along low-amplitude paths
- Light parallax: orb offset tracks scroll position (~-0.05 multiplier) and cursor position (~3px max offset)

**Hover:**
- Cards: `translateY(-2px)` and border brighten (~150ms)
- Pills: subtle glow / brightness bump
- DownloadCV: gradient angle shifts on hover (animate `background-position`)

**`prefers-reduced-motion: reduce`:**
- Skip springs, drift, parallax, character stagger
- Keep simple opacity fade-ins (≤200ms) for content reveals so the page doesn't feel broken

## Deployment

`.github/workflows/deploy.yml`:

1. Trigger on `push` to `main` (and `workflow_dispatch`)
2. Permissions: `pages: write`, `id-token: write`
3. Steps:
   - Checkout
   - Setup Node 20 + cache npm
   - `npm ci`
   - `npm run build` (runs `astro build`)
   - Upload `dist/` as Pages artifact (`actions/upload-pages-artifact@v3`)
   - Deploy (`actions/deploy-pages@v4`)

**One-time manual step:** in repo Settings → Pages, switch source from "Deploy from a branch" to "GitHub Actions". This is documented in the README.

## SEO & metadata

`Layout.astro` emits per-page:
- `<title>` (homepage: "Sep Behroozi"; legal pages: "<Page Title> — <App>")
- `<meta name="description">` (sourced from `resume.identity.tagline` for the homepage; per-page front matter for legal pages)
- OpenGraph + Twitter Card tags pointing to `/og-image.png`
- `<link rel="canonical">` set to the absolute URL of the page
- `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`

The README is updated to describe (1) how to run `npm run dev`, (2) the one-time Pages-source switch in repo settings, and (3) where to edit content (`src/data/resume.ts` and the markdown files under `src/pages/sepool/` and `src/pages/tmforwarder/`).

## Acceptance criteria

- [ ] Homepage renders the sidebar (avatar, name, role, tagline, GitHub + LinkedIn, CV button, grouped skills) and content stream (about, experience, education).
- [ ] All preserved URLs return HTTP 200 with the expected content type after deploy:
  - `/altstore/alt_source.json` (application/json)
  - `/sepool/privacy_policy`, `/sepool/terms_of_service` (text/html)
  - `/tmforwarder/privacy_policy`, `/tmforwarder/terms_of_service`, `/tmforwarder/power-optimization-settings` (text/html)
  - `/tmforwarder/resources/<icon>.png` (image/png)
  - `/resume.pdf` (application/pdf)
- [ ] Treffen IPA files at `/altstore/Treffen/*` are byte-identical to current production.
- [ ] Lighthouse Performance / Accessibility / Best Practices / SEO ≥ 95 on both desktop and mobile.
- [ ] Site renders correctly in latest Chrome, Safari, Firefox; iOS Safari; Android Chrome.
- [ ] `prefers-reduced-motion: reduce` disables springs, drift, parallax; opacity-only fade-ins remain.
- [ ] Editing `src/data/resume.ts` and pushing to `main` triggers a rebuild; the deployed site reflects the change within ~2 minutes.
- [ ] Repo root no longer contains `_config.yml`, the placeholder `index.html`, or the legacy `altstore/`, `sepool/`, `tmforwarder/` directories.
- [ ] Each rendered page emits `<title>`, `<meta description>`, OpenGraph + Twitter Card tags, and a canonical URL.
- [ ] Favicon (`favicon.svg`) is served and shows in browser tabs.
- [ ] README documents local dev (`npm run dev`), the one-time Pages-source switch, and where to edit content.

## Open implementation choices (defer to writing-plans)

- Final font weight set for Inter (likely 400/500/600/700)
- Exact orb count, sizes, positions in the backdrop
- Whether `Layout.astro` ships Motion as an inline `<script type="module">` or a bundled island component (`client:load`)
- Smoke-test approach: a simple curl-based shell script vs. a Playwright check
- Whether to add a "View source" / GitHub link in the footer

## Risks

- **URL preservation regression** — high impact (mobile apps reference these). Mitigated by the curl smoke test in acceptance criteria; run before merging the cutover.
- **Pages source switch** — switching from "branch" to "GitHub Actions" is a one-time manual step in repo settings. If forgotten, the deploy won't go live. Documented in README and called out in the implementation plan.
- **Tailwind + raw markdown styling** — the legal markdown pages use raw `<img>` tags with inline styles. Tailwind's `preflight` resets img styles; the `Legal.astro` layout will need a scoped wrapper that allows `prose` styling without fighting the inline styles. Verify visually before cutover.
