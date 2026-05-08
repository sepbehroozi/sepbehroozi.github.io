# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the placeholder homepage at `sepbehroozi.github.io` with a personal site (bio + online resume) while preserving every URL referenced by the user's shipped mobile apps.

**Architecture:** A single-page Astro site styled with Tailwind, animated with Motion, deployed to GitHub Pages via GitHub Actions. The homepage is composed of a sticky sidebar identity rail and a right-column content stream rendered from a typed data file (`src/data/resume.ts`). Existing legal markdown pages and the AltStore source pass through unchanged at their current URLs (`build.format: 'file'` plus pass-through under `public/`).

**Tech Stack:** Astro 4+, Tailwind CSS, Motion (motion.dev), TypeScript, GitHub Actions + GitHub Pages.

**Spec:** [`docs/superpowers/specs/2026-05-08-portfolio-site-design.md`](../specs/2026-05-08-portfolio-site-design.md)

---

## Conventions used by this plan

- **Working directory:** the repository root (`/home/sepehr/IdeaProjects/sepbehroozi.github.io`).
- **Node:** install Node 20+ before starting (`node -v` should print `v20.x` or `v22.x`).
- **Commit cadence:** every task ends with a single commit. Use the messages shown.
- **Smoke test:** the URL-preservation smoke script is created in Task 6 and re-run after every structural change.
- **Placeholder assets:** `public/photo.jpg`, `public/resume.pdf`, `public/og-image.png` are committed as placeholders. Replace before launch (called out in the README task).

---

## File structure (target)

```
sepbehroozi.github.io/
├── package.json
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── README.md                              # rewritten in Task 21
├── .gitignore                             # already exists; extended
├── .github/workflows/deploy.yml           # Task 22
├── scripts/smoke-test-urls.sh             # Task 6
├── docs/superpowers/                      # already exists
├── public/
│   ├── favicon.svg                        # Task 20
│   ├── og-image.png                       # Task 20 (placeholder)
│   ├── photo.jpg                          # Task 9 (placeholder)
│   ├── resume.pdf                         # Task 9 (placeholder)
│   ├── altstore/                          # Task 3
│   │   ├── alt_source.json
│   │   └── Treffen/...
│   └── tmforwarder/resources/             # Task 3
└── src/
    ├── styles/global.css                  # Task 2
    ├── data/resume.ts                     # Task 9
    ├── layouts/
    │   ├── Layout.astro                   # Task 15
    │   └── Legal.astro                    # Task 5
    ├── components/
    │   ├── Backdrop.astro                 # Task 10
    │   ├── Avatar.astro                   # Task 11
    │   ├── ContactLinks.astro             # Task 11
    │   ├── DownloadCV.astro               # Task 11
    │   ├── SkillGroup.astro               # Task 11
    │   ├── Sidebar.astro                  # Task 12
    │   ├── ExperienceCard.astro           # Task 13
    │   ├── EducationCard.astro            # Task 13
    │   └── ContentStream.astro            # Task 14
    └── pages/
        ├── index.astro                    # Task 16
        ├── sepool/
        │   ├── privacy_policy.md          # Task 4
        │   └── terms_of_service.md        # Task 4
        └── tmforwarder/
            ├── privacy_policy.md          # Task 4
            ├── terms_of_service.md        # Task 4
            └── power-optimization-settings.md  # Task 4
```

---

### Task 1: Scaffold Astro + TypeScript

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Modify: `.gitignore`

- [ ] **Step 1: Verify Node version**

Run: `node -v`
Expected: prints `v20.x` or higher. If not, install Node 20 first.

- [ ] **Step 2: Create `package.json`**

```json
{
  "name": "sepbehroozi-github-io",
  "type": "module",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "smoke": "scripts/smoke-test-urls.sh"
  },
  "dependencies": {
    "@astrojs/tailwind": "^5.1.0",
    "@fontsource-variable/inter": "^5.0.0",
    "astro": "^4.16.0",
    "motion": "^11.11.0",
    "tailwindcss": "^3.4.0"
  }
}
```

- [ ] **Step 3: Create `astro.config.mjs`**

```javascript
// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://sepbehroozi.github.io',
  build: {
    // Emit sibling .html files (e.g. /sepool/terms_of_service.html) instead of
    // directory-index pages, so existing /sepool/terms_of_service URLs keep working.
    format: 'file',
  },
  integrations: [
    tailwind({
      applyBaseStyles: false, // we register Tailwind base in src/styles/global.css ourselves
    }),
  ],
});
```

- [ ] **Step 4: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": ["src/**/*", ".astro/**/*"],
  "exclude": ["dist", "node_modules"]
}
```

- [ ] **Step 5: Extend `.gitignore`**

Append these lines to the existing `.gitignore` (do not overwrite):

```
node_modules/
dist/
.astro/
.env
.env.production
```

- [ ] **Step 6: Install dependencies**

Run: `npm install`
Expected: completes without error, creates `node_modules/` and `package-lock.json`.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json .gitignore
git commit -m "chore: scaffold Astro project with TypeScript and Tailwind"
```

---

### Task 2: Tailwind config + global styles

**Files:**
- Create: `tailwind.config.mjs`
- Create: `src/styles/global.css`

- [ ] **Step 1: Create `tailwind.config.mjs`**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter Variable"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        ink: {
          base: '#0a0a18',
          elev: '#12122a',
        },
        accent: {
          from: '#c4b5fd',
          to: '#f9a8d4',
        },
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 2: Create `src/styles/global.css`**

```css
@import '@fontsource-variable/inter';

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg-base: #0a0a18;
  --bg-radial-from: #1f1147;
  --text-primary: #f5f5f7;
  --text-secondary: #a5b0c7;
  --text-tertiary: #6c7693;
  --accent-from: #c4b5fd;
  --accent-to: #f9a8d4;
  --surface: rgba(255, 255, 255, 0.03);
  --surface-border: rgba(255, 255, 255, 0.08);
  --pill-bg: rgba(255, 255, 255, 0.06);
  --pill-border: rgba(255, 255, 255, 0.13);
}

html, body {
  background: var(--bg-base);
  color: var(--text-primary);
  font-family: 'Inter Variable', system-ui, -apple-system, sans-serif;
  font-feature-settings: 'cv11', 'ss01';
}

body {
  min-height: 100dvh;
  position: relative;
  overflow-x: hidden;
}

.gradient-text {
  background: linear-gradient(90deg, var(--accent-from), var(--accent-to));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.tabular { font-variant-numeric: tabular-nums; }
.label-eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
  color: var(--text-tertiary);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.mjs src/styles/global.css
git commit -m "chore: configure Tailwind theme tokens and global CSS"
```

---

### Task 3: Migrate static assets to `public/`

This task moves the AltStore source and tmforwarder image resources under `public/` so Astro copies them into the build output verbatim. The legacy directories at the repo root will be deleted in the same task.

**Files:**
- Move: `altstore/alt_source.json` → `public/altstore/alt_source.json`
- Move: `altstore/Treffen/*` → `public/altstore/Treffen/*`
- Move: `tmforwarder/resources/*` → `public/tmforwarder/resources/*`

- [ ] **Step 1: Create destination directories**

```bash
mkdir -p public/altstore/Treffen public/tmforwarder/resources
```

- [ ] **Step 2: Move AltStore files**

```bash
git mv altstore/alt_source.json public/altstore/alt_source.json
git mv altstore/Treffen/* public/altstore/Treffen/
```

- [ ] **Step 3: Move tmforwarder resources**

```bash
git mv tmforwarder/resources/* public/tmforwarder/resources/
```

- [ ] **Step 4: Verify nothing is left behind in altstore/Treffen and tmforwarder/resources**

Run: `ls altstore/Treffen tmforwarder/resources`
Expected: both directories are empty (no files, no further subdirectories).

If non-empty, repeat Step 2 / Step 3 with explicit filenames (the wildcard may not have matched dotfiles).

- [ ] **Step 5: Remove now-empty source directories**

```bash
rmdir altstore/Treffen tmforwarder/resources
```

(Do NOT remove `altstore/` or `tmforwarder/` themselves yet — they still contain the markdown files that move in Task 4.)

- [ ] **Step 6: Commit**

```bash
git add -A altstore/ tmforwarder/ public/
git commit -m "chore: move AltStore source and tmforwarder resources under public/"
```

---

### Task 4: Migrate legal markdown pages to `src/pages/`

**Files:**
- Move: `sepool/privacy_policy.md` → `src/pages/sepool/privacy_policy.md`
- Move: `sepool/terms_of_service.md` → `src/pages/sepool/terms_of_service.md`
- Move: `tmforwarder/privacy_policy.md` → `src/pages/tmforwarder/privacy_policy.md`
- Move: `tmforwarder/terms_of_service.md` → `src/pages/tmforwarder/terms_of_service.md`
- Move: `tmforwarder/power-optimization-settings.md` → `src/pages/tmforwarder/power-optimization-settings.md`

Each gets minimal Astro front matter prepended that points at the layout (created in Task 5).

- [ ] **Step 1: Create destination directories**

```bash
mkdir -p src/pages/sepool src/pages/tmforwarder
```

- [ ] **Step 2: Move and add front matter — `sepool/privacy_policy.md`**

Move the file:
```bash
git mv sepool/privacy_policy.md src/pages/sepool/privacy_policy.md
```

Then prepend front matter. Open `src/pages/sepool/privacy_policy.md` and add this exact block at the very top of the file (before the existing `**Privacy Policy**` line):

```markdown
---
layout: ../../../layouts/Legal.astro
title: Privacy Policy — Sepool
description: Privacy policy for the Sepool mobile application.
---

```

(Note the blank line between the closing `---` and the body.)

- [ ] **Step 3: Move and add front matter — `sepool/terms_of_service.md`**

```bash
git mv sepool/terms_of_service.md src/pages/sepool/terms_of_service.md
```

Prepend:
```markdown
---
layout: ../../../layouts/Legal.astro
title: Terms of Service — Sepool
description: Terms of service for the Sepool mobile application.
---

```

- [ ] **Step 4: Move and add front matter — `tmforwarder/privacy_policy.md`**

```bash
git mv tmforwarder/privacy_policy.md src/pages/tmforwarder/privacy_policy.md
```

Prepend:
```markdown
---
layout: ../../../layouts/Legal.astro
title: Privacy Policy — TM Forwarder
description: Privacy policy for the TM Forwarder mobile application.
---

```

- [ ] **Step 5: Move and add front matter — `tmforwarder/terms_of_service.md`**

```bash
git mv tmforwarder/terms_of_service.md src/pages/tmforwarder/terms_of_service.md
```

Prepend:
```markdown
---
layout: ../../../layouts/Legal.astro
title: Terms of Service — TM Forwarder
description: Terms of service for the TM Forwarder mobile application.
---

```

- [ ] **Step 6: Move and add front matter — `tmforwarder/power-optimization-settings.md`**

```bash
git mv tmforwarder/power-optimization-settings.md src/pages/tmforwarder/power-optimization-settings.md
```

Prepend:
```markdown
---
layout: ../../../layouts/Legal.astro
title: Power Optimization Settings — TM Forwarder
description: How to disable Android power optimization for TM Forwarder.
---

```

- [ ] **Step 7: Verify the legacy directories are now empty**

Run: `ls -la altstore sepool tmforwarder`
Expected: each directory contains only `.` and `..`.

- [ ] **Step 8: Remove the legacy directories**

```bash
rmdir altstore sepool tmforwarder
```

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "chore: migrate legal markdown pages to src/pages/ with front matter"
```

---

### Task 5: Create `Legal.astro` layout

This layout renders the legal markdown pages. It must keep raw HTML in the markdown working (e.g., `<img>` tags with inline styles in `power-optimization-settings.md`) and produce content that visually fits the new dark site without fighting Tailwind's preflight.

**Files:**
- Create: `src/layouts/Legal.astro`

- [ ] **Step 1: Create `src/layouts/Legal.astro`**

```astro
---
import '../styles/global.css';
interface Props {
  title?: string;
  description?: string;
}
const { title, description } = Astro.props.frontmatter ?? Astro.props;
const fullTitle = title ?? 'Sep Behroozi';
const desc = description ?? 'Software engineer.';
const canonical = new URL(Astro.url.pathname, Astro.site).toString();
---
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{fullTitle}</title>
    <meta name="description" content={desc} />
    <link rel="canonical" href={canonical} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta property="og:title" content={fullTitle} />
    <meta property="og:description" content={desc} />
    <meta property="og:type" content="article" />
    <meta property="og:url" content={canonical} />
    <meta property="og:image" content={new URL('/og-image.png', Astro.site).toString()} />
    <meta name="twitter:card" content="summary_large_image" />
  </head>
  <body class="bg-ink-base text-[color:var(--text-primary)]">
    <div
      aria-hidden="true"
      class="pointer-events-none fixed inset-0 -z-10"
      style="background: radial-gradient(120% 80% at 0% 0%, var(--bg-radial-from) 0%, var(--bg-base) 60%);"
    ></div>

    <main class="mx-auto max-w-2xl px-6 py-16">
      <a
        href="/"
        class="label-eyebrow inline-block mb-8 hover:text-[color:var(--text-secondary)] transition-colors"
      >&larr; Sep Behroozi</a>
      <h1 class="text-3xl md:text-4xl font-semibold mb-2">{title}</h1>
      <article class="legal-prose">
        <slot />
      </article>
    </main>

    <style is:global>
      .legal-prose {
        color: var(--text-secondary);
        line-height: 1.7;
        font-size: 1rem;
      }
      .legal-prose h1, .legal-prose h2, .legal-prose h3, .legal-prose h4 {
        color: var(--text-primary);
        font-weight: 600;
        margin-top: 2em;
        margin-bottom: 0.5em;
        line-height: 1.25;
      }
      .legal-prose h1 { font-size: 1.75rem; }
      .legal-prose h2 { font-size: 1.4rem; }
      .legal-prose h3 { font-size: 1.15rem; }
      .legal-prose p { margin-bottom: 1em; }
      .legal-prose ul, .legal-prose ol { margin: 1em 0; padding-left: 1.5em; }
      .legal-prose li { margin-bottom: 0.4em; }
      .legal-prose a {
        color: var(--accent-from);
        text-decoration: underline;
        text-decoration-color: rgba(196, 181, 253, 0.4);
        text-underline-offset: 2px;
      }
      .legal-prose a:hover {
        text-decoration-color: var(--accent-from);
      }
      .legal-prose strong { color: var(--text-primary); font-weight: 600; }
      .legal-prose code {
        background: var(--surface);
        border: 1px solid var(--surface-border);
        padding: 0.1em 0.4em;
        border-radius: 4px;
        font-size: 0.9em;
      }
      /* Allow inline image styling (used in power-optimization-settings.md) */
      .legal-prose img { max-width: 100%; vertical-align: middle; }
    </style>
  </body>
</html>
```

- [ ] **Step 2: Verify the layout type-checks**

Run: `npx astro check`
Expected: completes without errors. (Astro must resolve the layout reference from the markdown front matter.)

If `astro check` reports "Cannot find module '../../../layouts/Legal.astro'", verify the directory depth: a markdown file at `src/pages/sepool/privacy_policy.md` is three levels under `src/`, so the relative path is `../../../layouts/Legal.astro` from inside `src/pages/sepool/`. The path in the front matter must match exactly.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Legal.astro
git commit -m "feat: add Legal.astro layout for legal markdown pages"
```

---

### Task 6: URL-preservation smoke test script

This script is the safety net for the entire migration. It hits every URL the shipped mobile apps depend on and validates status code + content type.

**Files:**
- Create: `scripts/smoke-test-urls.sh`

- [ ] **Step 1: Create `scripts/smoke-test-urls.sh`**

```bash
#!/usr/bin/env bash
# Verifies that legacy URLs return 200 with the expected content type.
# Usage:
#   scripts/smoke-test-urls.sh                 # default base http://localhost:4321
#   scripts/smoke-test-urls.sh https://sepbehroozi.github.io
set -u

BASE="${1:-http://localhost:4321}"
fail=0

# path|expected_content_type_substring
checks=(
  "/altstore/alt_source.json|application/json"
  "/sepool/privacy_policy|text/html"
  "/sepool/privacy_policy.html|text/html"
  "/sepool/terms_of_service|text/html"
  "/sepool/terms_of_service.html|text/html"
  "/tmforwarder/privacy_policy|text/html"
  "/tmforwarder/privacy_policy.html|text/html"
  "/tmforwarder/terms_of_service|text/html"
  "/tmforwarder/terms_of_service.html|text/html"
  "/tmforwarder/power-optimization-settings|text/html"
  "/tmforwarder/power-optimization-settings.html|text/html"
  "/|text/html"
)

printf "Smoke testing against %s\n\n" "$BASE"

for entry in "${checks[@]}"; do
  path="${entry%%|*}"
  expected_ct="${entry##*|}"
  url="${BASE}${path}"

  # -L follows redirects; -s silent; -o /dev/null discards body; -w prints fields
  read -r status content_type < <(curl -sL -o /dev/null -w "%{http_code} %{content_type}\n" --max-time 10 "$url")

  if [[ "$status" != "200" ]]; then
    printf "FAIL  %s  (status=%s, expected 200)\n" "$url" "$status"
    fail=1
  elif [[ "$content_type" != *"$expected_ct"* ]]; then
    printf "FAIL  %s  (content-type=%s, expected to contain %s)\n" "$url" "$content_type" "$expected_ct"
    fail=1
  else
    printf "OK    %s  [%s]\n" "$url" "$content_type"
  fi
done

# Verify Treffen IPA presence: the AltStore source file references IPAs by URL,
# so any IPA listed in alt_source.json must resolve. Resolve dynamically.
ipa_paths=$(curl -sL --max-time 10 "${BASE}/altstore/alt_source.json" \
  | grep -oE '"downloadURL"\s*:\s*"[^"]+"' \
  | sed -E 's/.*"downloadURL"\s*:\s*"([^"]+)".*/\1/' || true)

if [[ -n "${ipa_paths}" ]]; then
  printf "\nVerifying IPA URLs referenced in alt_source.json:\n"
  while IFS= read -r ipa_url; do
    [[ -z "$ipa_url" ]] && continue
    # Strip the host so we test against the configured BASE
    relative=$(echo "$ipa_url" | sed -E 's#^https?://[^/]+##')
    test_url="${BASE}${relative}"
    status=$(curl -sLI -o /dev/null -w "%{http_code}" --max-time 30 "$test_url")
    if [[ "$status" == "200" ]]; then
      printf "OK    %s\n" "$test_url"
    else
      printf "FAIL  %s  (status=%s)\n" "$test_url" "$status"
      fail=1
    fi
  done <<< "$ipa_paths"
fi

if (( fail )); then
  printf "\nSmoke test FAILED.\n"
  exit 1
fi
printf "\nSmoke test PASSED.\n"
```

- [ ] **Step 2: Make it executable**

```bash
chmod +x scripts/smoke-test-urls.sh
```

- [ ] **Step 3: Commit**

```bash
git add scripts/smoke-test-urls.sh
git commit -m "chore: add URL-preservation smoke test script"
```

---

### Task 7: First build + smoke pass (preservation gate)

Verify the legacy URLs still resolve before moving on. This is the gate.

- [ ] **Step 1: Build the site**

Run: `npm run build`
Expected: `npm run build` exits 0 and produces a `dist/` directory.

If the build fails because the homepage `src/pages/index.astro` does not yet exist, that's expected — Astro permits building with no homepage in 4.x as long as some page exists. If Astro errors with "no pages found," create a temporary `src/pages/index.astro` containing only `<h1>placeholder</h1>` and re-run; this file will be replaced in Task 16.

- [ ] **Step 2: Inspect build output**

Run: `ls dist/altstore dist/sepool dist/tmforwarder`
Expected:
- `dist/altstore/` contains `alt_source.json` and a `Treffen/` subdirectory.
- `dist/sepool/` contains `privacy_policy.html` and `terms_of_service.html`.
- `dist/tmforwarder/` contains `privacy_policy.html`, `terms_of_service.html`, `power-optimization-settings.html`, and a `resources/` subdirectory.

- [ ] **Step 3: Start preview server in background**

```bash
npm run preview &
PREVIEW_PID=$!
sleep 3
```

- [ ] **Step 4: Run smoke test**

Run: `npm run smoke`
Expected: every line begins with `OK`, ends with `Smoke test PASSED.` Exit code 0.

If any URL fails:
- Status 404 on a `*.html`-stripped URL: confirm `astro.config.mjs` has `build.format: 'file'`.
- Status 404 on `/altstore/alt_source.json` or an IPA: confirm files were moved into `public/altstore/` (Task 3) and `dist/altstore/` shows them.
- Wrong content-type on a `.md` -> .html page: confirm front matter was added (Task 4) and the layout reference resolves (Task 5).

- [ ] **Step 5: Stop preview server**

```bash
kill "$PREVIEW_PID"
wait "$PREVIEW_PID" 2>/dev/null || true
```

- [ ] **Step 6: Commit**

No file changes — but to make the gate visible in history, run:

```bash
git commit --allow-empty -m "chore: verify URL preservation smoke test passes after migration"
```

---

### Task 8: Delete legacy root files

The placeholder `index.html` and the now-unused `_config.yml` no longer belong in the repo.

- [ ] **Step 1: Delete the placeholder homepage**

```bash
git rm index.html
```

If you created a temporary `src/pages/index.astro` in Task 7 Step 1, leave it in place — it will be replaced in Task 16.

- [ ] **Step 2: Delete the Jekyll config**

```bash
git rm _config.yml
```

- [ ] **Step 3: Confirm working tree is clean except for the deletions**

Run: `git status`
Expected: only `deleted: index.html` and `deleted: _config.yml` shown.

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: remove Jekyll placeholder index.html and _config.yml"
```

---

### Task 9: Resume data model + placeholder personal assets

**Files:**
- Create: `src/data/resume.ts`
- Create: `public/photo.jpg` (placeholder)
- Create: `public/resume.pdf` (placeholder)

- [ ] **Step 1: Create `src/data/resume.ts`**

```typescript
// Single source of truth for editable site content. Update this file to change
// what appears on the homepage. Replace the placeholder content below with
// your real resume information before launch.

export type ContactKind = 'github' | 'linkedin';

export interface ContactLink {
  kind: ContactKind;
  href: string;
  label: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface DateRange {
  start: string; // 'YYYY' or 'YYYY-MM'
  end: string | 'present'; // 'YYYY' or 'YYYY-MM' or 'present'
}

export interface Experience {
  company: string;
  role: string;
  location?: string;
  range: DateRange;
  bullets: string[];
  links?: { label: string; href: string }[];
}

export interface Education {
  institution: string;
  degree: string;
  range: DateRange;
  notes?: string;
}

export interface Resume {
  identity: {
    name: string;
    role: string;
    tagline: string;
    photo: string;
    contact: ContactLink[];
  };
  about?: string;
  experience: Experience[];
  education: Education[];
  skillGroups: SkillGroup[];
  resumePdf: string;
}

export const resume: Resume = {
  identity: {
    name: 'Sep Behroozi',
    role: 'Software Engineer',
    tagline:
      'I build mobile apps and developer tooling. Currently shipping iOS and Android apps under my own name.',
    photo: '/photo.jpg',
    contact: [
      { kind: 'github', href: 'https://github.com/sepbehroozi', label: 'GitHub' },
      { kind: 'linkedin', href: 'https://www.linkedin.com/in/sepbehroozi/', label: 'LinkedIn' },
    ],
  },
  about:
    'Replace this paragraph with a short narrative about yourself — a few sentences ' +
    'about what you focus on, what you care about in a team, and what you are working on now.',
  experience: [
    {
      company: 'Placeholder Co.',
      role: 'Senior Software Engineer',
      location: 'Remote',
      range: { start: '2023', end: 'present' },
      bullets: [
        'Replace with a real achievement-oriented bullet.',
        'Aim for outcomes and metrics where possible.',
      ],
    },
    {
      company: 'Earlier Co.',
      role: 'Software Engineer',
      range: { start: '2019', end: '2023' },
      bullets: ['Replace with another concrete achievement bullet.'],
    },
  ],
  education: [
    {
      institution: 'Your University',
      degree: 'B.Sc. in Computer Science',
      range: { start: '2015', end: '2019' },
    },
  ],
  skillGroups: [
    { label: 'Languages', items: ['Swift', 'Kotlin', 'TypeScript', 'Go'] },
    { label: 'Mobile', items: ['iOS / SwiftUI', 'Android / Jetpack Compose'] },
    { label: 'Backend & Tooling', items: ['Node.js', 'Postgres', 'Docker', 'GitHub Actions'] },
  ],
  resumePdf: '/resume.pdf',
};
```

- [ ] **Step 2: Create placeholder `public/photo.jpg`**

Generate any small image and save it to `public/photo.jpg`. A 256×256 solid-color image is fine. Examples:

If ImageMagick is installed:
```bash
convert -size 256x256 xc:'#3a3454' -gravity center -fill white -font 'DejaVu-Sans-Bold' -pointsize 18 -annotate 0 'REPLACE\nWITH\nPHOTO' public/photo.jpg
```

If ImageMagick is not installed, create any 256×256 JPEG named `photo.jpg` in `public/` (use any image editor or `sips` on macOS). The exact appearance does not matter — it will be replaced by the user before launch.

- [ ] **Step 3: Create placeholder `public/resume.pdf`**

If `pandoc` is installed:
```bash
echo "Placeholder resume — replace with the real PDF." | pandoc -o public/resume.pdf
```

Otherwise, save any 1-page PDF as `public/resume.pdf`. The exact contents do not matter.

- [ ] **Step 4: Verify the data file type-checks**

Run: `npx astro check`
Expected: completes with no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add src/data/resume.ts public/photo.jpg public/resume.pdf
git commit -m "feat: add typed resume data model and placeholder personal assets"
```

---

### Task 10: Backdrop component

**Files:**
- Create: `src/components/Backdrop.astro`

- [ ] **Step 1: Create `src/components/Backdrop.astro`**

```astro
---
// A fixed-position decorative backdrop. Two layers:
//   1. A radial gradient base
//   2. Three soft glowing orbs that drift (animated client-side in Task 18)
---
<div aria-hidden="true" class="backdrop">
  <div class="backdrop-gradient"></div>
  <div class="backdrop-orb backdrop-orb-1" data-orb="1"></div>
  <div class="backdrop-orb backdrop-orb-2" data-orb="2"></div>
  <div class="backdrop-orb backdrop-orb-3" data-orb="3"></div>
</div>

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    z-index: -10;
    pointer-events: none;
    overflow: hidden;
  }
  .backdrop-gradient {
    position: absolute;
    inset: 0;
    background: radial-gradient(120% 80% at 0% 0%, var(--bg-radial-from) 0%, var(--bg-base) 60%);
  }
  .backdrop-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.55;
    will-change: transform;
  }
  .backdrop-orb-1 {
    width: 380px;
    height: 380px;
    top: -120px;
    left: -100px;
    background: radial-gradient(circle, var(--accent-from) 0%, transparent 70%);
    opacity: 0.35;
  }
  .backdrop-orb-2 {
    width: 460px;
    height: 460px;
    bottom: -160px;
    right: -120px;
    background: radial-gradient(circle, var(--accent-to) 0%, transparent 70%);
    opacity: 0.30;
  }
  .backdrop-orb-3 {
    width: 320px;
    height: 320px;
    top: 40%;
    left: 60%;
    background: radial-gradient(circle, #7c5cff 0%, transparent 70%);
    opacity: 0.25;
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Backdrop.astro
git commit -m "feat: add Backdrop component (gradient + glow orbs)"
```

---

### Task 11: Sidebar leaf components

Four small components: `Avatar`, `ContactLinks`, `DownloadCV`, `SkillGroup`.

**Files:**
- Create: `src/components/Avatar.astro`
- Create: `src/components/ContactLinks.astro`
- Create: `src/components/DownloadCV.astro`
- Create: `src/components/SkillGroup.astro`

- [ ] **Step 1: Create `src/components/Avatar.astro`**

```astro
---
interface Props {
  src: string;
  alt: string;
  size?: number;
}
const { src, alt, size = 96 } = Astro.props;
---
<div class="avatar" style={`--size:${size}px;`}>
  <span class="avatar-halo" aria-hidden="true"></span>
  <img src={src} alt={alt} width={size} height={size} loading="eager" decoding="async" />
</div>

<style>
  .avatar {
    position: relative;
    width: var(--size);
    height: var(--size);
    flex: 0 0 auto;
  }
  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 9999px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    background: var(--surface);
    position: relative;
    z-index: 1;
  }
  .avatar-halo {
    position: absolute;
    inset: -8px;
    border-radius: 9999px;
    background: linear-gradient(135deg, var(--accent-from), var(--accent-to));
    filter: blur(14px);
    opacity: 0.45;
    z-index: 0;
  }
</style>
```

- [ ] **Step 2: Create `src/components/ContactLinks.astro`**

```astro
---
import type { ContactLink } from '../data/resume';
interface Props { links: ContactLink[]; }
const { links } = Astro.props;

// Inline SVG icons keyed by ContactLink.kind. Adding a new kind requires
// adding an entry here.
const icons: Record<string, string> = {
  github:
    '<path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.69-1.3-1.69-1.06-.73.08-.71.08-.71 1.18.08 1.8 1.21 1.8 1.21 1.04 1.79 2.74 1.27 3.41.97.1-.76.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.19a11 11 0 0 1 5.79 0c2.21-1.5 3.18-1.19 3.18-1.19.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.68.42.36.79 1.06.79 2.15v3.18c0 .31.21.67.8.56 4.57-1.52 7.85-5.83 7.85-10.91C23.5 5.65 18.35.5 12 .5z" fill="currentColor"/>',
  linkedin:
    '<path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.86-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45C23.21 24 24 23.23 24 22.27V1.72C24 .77 23.21 0 22.22 0z" fill="currentColor"/>',
};
---
<ul class="contact-links">
  {links.map((link) => (
    <li>
      <a href={link.href} target="_blank" rel="noopener" aria-label={link.label}>
        <svg viewBox="0 0 24 24" width="18" height="18" set:html={icons[link.kind] ?? ''} />
        <span>{link.label}</span>
      </a>
    </li>
  ))}
</ul>

<style>
  .contact-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  .contact-links a {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.9rem;
    padding: 0.25rem 0;
    transition: color 0.15s ease;
  }
  .contact-links a:hover {
    color: var(--text-primary);
  }
  .contact-links svg { color: var(--text-tertiary); transition: color 0.15s ease; }
  .contact-links a:hover svg { color: var(--accent-from); }
</style>
```

- [ ] **Step 3: Create `src/components/DownloadCV.astro`**

```astro
---
interface Props { href: string; }
const { href } = Astro.props;
---
<a class="dl-cv" href={href} download>
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <span>Download CV</span>
</a>

<style>
  .dl-cv {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
    border-radius: 9999px;
    font-weight: 600;
    font-size: 0.9rem;
    color: #0a0a18;
    background: linear-gradient(120deg, var(--accent-from), var(--accent-to));
    background-size: 200% 100%;
    background-position: 0% 50%;
    text-decoration: none;
    transition: background-position 0.4s ease, transform 0.15s ease, box-shadow 0.2s ease;
    box-shadow: 0 4px 18px rgba(196, 181, 253, 0.2);
  }
  .dl-cv:hover {
    background-position: 100% 50%;
    transform: translateY(-1px);
    box-shadow: 0 6px 22px rgba(249, 168, 212, 0.28);
  }
</style>
```

- [ ] **Step 4: Create `src/components/SkillGroup.astro`**

```astro
---
import type { SkillGroup } from '../data/resume';
interface Props { group: SkillGroup; }
const { group } = Astro.props;
---
<div class="skill-group">
  <div class="label-eyebrow">{group.label}</div>
  <ul class="pills">
    {group.items.map((item) => <li class="pill">{item}</li>)}
  </ul>
</div>

<style>
  .skill-group { display: flex; flex-direction: column; gap: 0.5rem; }
  .pills {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }
  .pill {
    font-size: 0.78rem;
    padding: 0.22rem 0.6rem;
    border-radius: 9999px;
    background: var(--pill-bg);
    border: 1px solid var(--pill-border);
    color: var(--text-secondary);
  }
</style>
```

- [ ] **Step 5: Type-check**

Run: `npx astro check`
Expected: 0 errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/Avatar.astro src/components/ContactLinks.astro src/components/DownloadCV.astro src/components/SkillGroup.astro
git commit -m "feat: add sidebar leaf components (Avatar, ContactLinks, DownloadCV, SkillGroup)"
```

---

### Task 12: Sidebar composite component

**Files:**
- Create: `src/components/Sidebar.astro`

- [ ] **Step 1: Create `src/components/Sidebar.astro`**

```astro
---
import { resume } from '../data/resume';
import Avatar from './Avatar.astro';
import ContactLinks from './ContactLinks.astro';
import DownloadCV from './DownloadCV.astro';
import SkillGroup from './SkillGroup.astro';
const { identity, skillGroups, resumePdf } = resume;
---
<aside class="sidebar" data-anim="sidebar">
  <Avatar src={identity.photo} alt={`Photo of ${identity.name}`} />
  <div class="identity">
    <h1 class="name gradient-text">{identity.name}</h1>
    <p class="role">{identity.role}</p>
    <p class="tagline">{identity.tagline}</p>
  </div>
  <DownloadCV href={resumePdf} />
  <ContactLinks links={identity.contact} />
  <div class="skills">
    {skillGroups.map((g) => <SkillGroup group={g} />)}
  </div>
</aside>

<style>
  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding: 1.25rem;
    background: var(--surface);
    border: 1px solid var(--surface-border);
    border-radius: 16px;
    backdrop-filter: blur(8px);
  }
  .identity { display: flex; flex-direction: column; gap: 0.35rem; }
  .name {
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1.1;
    margin: 0;
  }
  .role {
    color: var(--text-secondary);
    font-size: 0.95rem;
    margin: 0;
  }
  .tagline {
    color: var(--text-secondary);
    font-size: 0.92rem;
    line-height: 1.5;
    margin: 0;
  }
  .skills { display: flex; flex-direction: column; gap: 1rem; }

  @media (min-width: 1024px) {
    .sidebar {
      position: sticky;
      top: 2rem;
    }
    .name { font-size: 1.8rem; }
  }
</style>
```

- [ ] **Step 2: Type-check**

Run: `npx astro check`
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Sidebar.astro
git commit -m "feat: add Sidebar composite component"
```

---

### Task 13: Content-stream leaf components

**Files:**
- Create: `src/components/ExperienceCard.astro`
- Create: `src/components/EducationCard.astro`

- [ ] **Step 1: Create `src/components/ExperienceCard.astro`**

```astro
---
import type { Experience } from '../data/resume';
interface Props { item: Experience; }
const { item } = Astro.props;

function formatRange(r: { start: string; end: string }) {
  const end = r.end === 'present' ? 'Present' : r.end;
  return `${r.start} – ${end}`;
}
---
<article class="card" data-anim="reveal">
  <header class="row">
    <div class="title">
      <span class="company">{item.company}</span>
      <span class="sep">·</span>
      <span class="role">{item.role}</span>
    </div>
    <span class="dates tabular">{formatRange(item.range)}</span>
  </header>
  {item.location && <p class="location">{item.location}</p>}
  <ul class="bullets">
    {item.bullets.map((b) => <li>{b}</li>)}
  </ul>
  {item.links && (
    <ul class="links">
      {item.links.map((l) => (
        <li><a href={l.href} target="_blank" rel="noopener">{l.label} ↗</a></li>
      ))}
    </ul>
  )}
</article>

<style>
  .card {
    background: var(--surface);
    border: 1px solid var(--surface-border);
    border-radius: 12px;
    padding: 1rem 1.1rem;
    transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
  }
  .card:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.18);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .title { font-weight: 600; }
  .company { color: var(--text-primary); }
  .sep { color: var(--text-tertiary); margin: 0 0.35em; }
  .role { color: var(--text-secondary); font-weight: 500; }
  .dates { color: var(--text-tertiary); font-size: 0.85rem; }
  .location {
    color: var(--text-tertiary);
    font-size: 0.85rem;
    margin: 0.25rem 0 0.5rem 0;
  }
  .bullets {
    margin: 0.5rem 0 0 0;
    padding-left: 1.1rem;
    color: var(--text-secondary);
    line-height: 1.55;
    font-size: 0.93rem;
  }
  .bullets li { margin-bottom: 0.3em; }
  .links {
    list-style: none;
    padding: 0;
    margin: 0.7rem 0 0 0;
    display: flex;
    gap: 0.8rem;
    flex-wrap: wrap;
  }
  .links a {
    color: var(--accent-from);
    text-decoration: none;
    font-size: 0.85rem;
  }
  .links a:hover { color: var(--accent-to); }
</style>
```

- [ ] **Step 2: Create `src/components/EducationCard.astro`**

```astro
---
import type { Education } from '../data/resume';
interface Props { item: Education; }
const { item } = Astro.props;

function formatRange(r: { start: string; end: string }) {
  const end = r.end === 'present' ? 'Present' : r.end;
  return `${r.start} – ${end}`;
}
---
<article class="card" data-anim="reveal">
  <header class="row">
    <span class="institution">{item.institution}</span>
    <span class="dates tabular">{formatRange(item.range)}</span>
  </header>
  <p class="degree">{item.degree}</p>
  {item.notes && <p class="notes">{item.notes}</p>}
</article>

<style>
  .card {
    background: var(--surface);
    border: 1px solid var(--surface-border);
    border-radius: 12px;
    padding: 1rem 1.1rem;
    transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
  }
  .card:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.18);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
  }
  .institution { font-weight: 600; }
  .dates { color: var(--text-tertiary); font-size: 0.85rem; }
  .degree {
    color: var(--text-secondary);
    margin: 0.4rem 0 0 0;
    font-size: 0.93rem;
  }
  .notes {
    color: var(--text-tertiary);
    margin: 0.25rem 0 0 0;
    font-size: 0.85rem;
  }
</style>
```

- [ ] **Step 3: Type-check**

Run: `npx astro check`
Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ExperienceCard.astro src/components/EducationCard.astro
git commit -m "feat: add ExperienceCard and EducationCard components"
```

---

### Task 14: Content-stream composite component

**Files:**
- Create: `src/components/ContentStream.astro`

- [ ] **Step 1: Create `src/components/ContentStream.astro`**

```astro
---
import { resume } from '../data/resume';
import ExperienceCard from './ExperienceCard.astro';
import EducationCard from './EducationCard.astro';
const { about, experience, education } = resume;
---
<div class="stream">
  {about && (
    <section class="section" data-anim="reveal">
      <div class="label-eyebrow">About</div>
      <p class="about">{about}</p>
    </section>
  )}

  <section class="section">
    <div class="label-eyebrow" data-anim="reveal">Experience</div>
    <div class="stack">
      {experience.map((item) => <ExperienceCard item={item} />)}
    </div>
  </section>

  <section class="section">
    <div class="label-eyebrow" data-anim="reveal">Education</div>
    <div class="stack">
      {education.map((item) => <EducationCard item={item} />)}
    </div>
  </section>
</div>

<style>
  .stream {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    min-width: 0;
  }
  .section { display: flex; flex-direction: column; gap: 0.9rem; }
  .stack { display: flex; flex-direction: column; gap: 0.8rem; }
  .about {
    color: var(--text-secondary);
    line-height: 1.65;
    font-size: 1rem;
    margin: 0;
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ContentStream.astro
git commit -m "feat: add ContentStream composite (about, experience, education)"
```

---

### Task 15: Base `Layout.astro`

**Files:**
- Create: `src/layouts/Layout.astro`

- [ ] **Step 1: Create `src/layouts/Layout.astro`**

```astro
---
import '../styles/global.css';
import Backdrop from '../components/Backdrop.astro';

interface Props {
  title?: string;
  description?: string;
  ogType?: 'website' | 'article';
}
const {
  title = 'Sep Behroozi',
  description = 'Software engineer building mobile apps and developer tooling.',
  ogType = 'website',
} = Astro.props;

const canonical = new URL(Astro.url.pathname, Astro.site).toString();
const ogImage = new URL('/og-image.png', Astro.site).toString();
---
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content={ogType} />
    <meta property="og:url" content={canonical} />
    <meta property="og:image" content={ogImage} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImage} />
  </head>
  <body>
    <Backdrop />
    <slot />
  </body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat: add base Layout.astro with backdrop and SEO meta"
```

---

### Task 16: Homepage `index.astro`

**Files:**
- Create or replace: `src/pages/index.astro`

- [ ] **Step 1: Replace any temporary `src/pages/index.astro` with the real homepage**

```astro
---
import Layout from '../layouts/Layout.astro';
import Sidebar from '../components/Sidebar.astro';
import ContentStream from '../components/ContentStream.astro';
import { resume } from '../data/resume';

const title = `${resume.identity.name} — ${resume.identity.role}`;
const description = resume.identity.tagline;
---
<Layout title={title} description={description}>
  <main class="page">
    <div class="grid">
      <Sidebar />
      <ContentStream />
    </div>
  </main>
</Layout>

<style>
  .page {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem 1.25rem 4rem;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items: start;
  }
  @media (min-width: 1024px) {
    .page { padding: 3rem 2rem 5rem; }
    .grid {
      grid-template-columns: 320px 1fr;
      gap: 3rem;
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: wire homepage with Sidebar + ContentStream"
```

---

### Task 17: Visual sanity check

No code changes — confirm the homepage renders before adding animations.

- [ ] **Step 1: Build and preview**

```bash
npm run build
```
Expected: `npm run build` exits 0.

- [ ] **Step 2: Run preview server**

```bash
npm run preview &
PREVIEW_PID=$!
sleep 3
```

- [ ] **Step 3: Smoke test legacy URLs again**

Run: `npm run smoke`
Expected: every line `OK`, exit 0.

- [ ] **Step 4: Manually open the homepage**

Navigate a browser to `http://localhost:4321/`. Verify:
- Sidebar is visible on the left (above 1024px) with avatar, name, tagline, "Download CV" button, GitHub + LinkedIn links, three skill groups.
- Right column shows About paragraph, Experience cards, Education card.
- No console errors in the browser dev tools.

If something looks wrong, do not advance. Fix it in the relevant component file before continuing.

- [ ] **Step 5: Stop preview**

```bash
kill "$PREVIEW_PID"
wait "$PREVIEW_PID" 2>/dev/null || true
```

- [ ] **Step 6: Commit**

```bash
git commit --allow-empty -m "chore: visual sanity check passes (sidebar + stream render correctly)"
```

---

### Task 18: On-load and scroll-reveal animations

Add Motion-driven animations: sidebar slides in, hero name does a character stagger, cards reveal as they enter the viewport. All animations are no-ops under `prefers-reduced-motion`.

**Files:**
- Modify: `src/layouts/Layout.astro`
- Create: `src/scripts/animations.client.ts`

- [ ] **Step 1: Create `src/scripts/animations.client.ts`**

```typescript
// Client-side animation initialization. Loaded only on the homepage from
// Layout.astro via an inline <script> tag with a slot opt-in.
//
// Behaviors:
//   - Sidebar slides in from -16px / fades on initial load
//   - Cards and section labels with [data-anim="reveal"] reveal as they
//     enter the viewport (one-shot, IntersectionObserver-driven)
//   - Backdrop orbs drift continuously and parallax with scroll & cursor
//
// Respect prefers-reduced-motion: all motion becomes a 0-duration snap.

import { animate, inView, stagger } from 'motion';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const reveal = (el: Element) => {
  if (reduced) {
    (el as HTMLElement).style.opacity = '1';
    return;
  }
  animate(
    el,
    { opacity: [0, 1], y: [12, 0] },
    { duration: 0.55, easing: [0.16, 1, 0.3, 1] },
  );
};

export function initAnimations() {
  // Initial state: hide reveal targets so the load entrance is meaningful
  document.querySelectorAll<HTMLElement>('[data-anim="reveal"]').forEach((el) => {
    el.style.opacity = '0';
  });

  // Sidebar entrance
  const sidebar = document.querySelector<HTMLElement>('[data-anim="sidebar"]');
  if (sidebar) {
    if (reduced) {
      sidebar.style.opacity = '1';
    } else {
      sidebar.style.opacity = '0';
      animate(
        sidebar,
        { opacity: [0, 1], x: [-16, 0] },
        { duration: 0.5, easing: [0.16, 1, 0.3, 1] },
      );
    }
  }

  // Stagger reveal for any [data-anim="reveal"] currently in viewport on load
  // (these would otherwise be revealed individually by inView; staggering
  // them at once produces a nicer initial cascade).
  const reveals = Array.from(
    document.querySelectorAll<HTMLElement>('[data-anim="reveal"]'),
  );
  if (reveals.length) {
    if (reduced) {
      reveals.forEach((el) => (el.style.opacity = '1'));
    } else {
      animate(
        reveals.slice(0, 6),
        { opacity: [0, 1], y: [12, 0] },
        { duration: 0.55, delay: stagger(0.06, { start: 0.1 }), easing: [0.16, 1, 0.3, 1] },
      );
      // Anything past the first 6 (off-screen on load) gets revealed by inView
      reveals.slice(6).forEach((el) => {
        inView(el, () => {
          reveal(el);
        }, { amount: 0.2 });
      });
    }
  }

  // Backdrop orb drift + parallax
  const orbs = Array.from(document.querySelectorAll<HTMLElement>('[data-orb]'));
  if (orbs.length && !reduced) {
    orbs.forEach((orb, i) => {
      const amplitude = 18 + i * 6;
      const duration = 18 + i * 4;
      animate(
        orb,
        { transform: [`translate(0px, 0px)`, `translate(${amplitude}px, ${-amplitude}px)`, `translate(0px, 0px)`] },
        { duration, repeat: Infinity, easing: 'ease-in-out' },
      );
    });

    let scrollY = 0;
    let mouseX = 0;
    let mouseY = 0;
    const onScroll = () => { scrollY = window.scrollY; };
    const onMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 8;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 8;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMove, { passive: true });

    // Apply parallax via inline style updates on rAF
    const tick = () => {
      orbs.forEach((orb, i) => {
        const factor = 0.04 + i * 0.02;
        orb.style.translate = `${mouseX * (i + 1)}px ${(-scrollY * factor) + mouseY * (i + 1)}px`;
      });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
}

initAnimations();
```

- [ ] **Step 2: Update `src/layouts/Layout.astro` to load the script on the homepage only**

Add a `loadAnimations` prop and conditionally include the script. Modify the props interface and the body section as shown.

Find this in `src/layouts/Layout.astro`:
```astro
interface Props {
  title?: string;
  description?: string;
  ogType?: 'website' | 'article';
}
const {
  title = 'Sep Behroozi',
  description = 'Software engineer building mobile apps and developer tooling.',
  ogType = 'website',
} = Astro.props;
```

Replace with:
```astro
interface Props {
  title?: string;
  description?: string;
  ogType?: 'website' | 'article';
  loadAnimations?: boolean;
}
const {
  title = 'Sep Behroozi',
  description = 'Software engineer building mobile apps and developer tooling.',
  ogType = 'website',
  loadAnimations = false,
} = Astro.props;
```

Then find the body section:
```astro
  <body>
    <Backdrop />
    <slot />
  </body>
```

Replace with:
```astro
  <body>
    <Backdrop />
    <slot />
    {loadAnimations && (
      <script>
        import('../scripts/animations.client.ts');
      </script>
    )}
  </body>
```

- [ ] **Step 3: Update `src/pages/index.astro` to opt in to animations**

Find this in `src/pages/index.astro`:
```astro
<Layout title={title} description={description}>
```

Replace with:
```astro
<Layout title={title} description={description} loadAnimations>
```

- [ ] **Step 4: Build and verify**

```bash
npm run build
```
Expected: build exits 0. The dist output should contain a small JS chunk for Motion + animation init referenced from `dist/index.html`.

- [ ] **Step 5: Preview and visually verify animations**

```bash
npm run preview &
PREVIEW_PID=$!
sleep 3
```

Open `http://localhost:4321/` and verify:
- On initial load: sidebar slides in from the left and fades in.
- Cards in the right column appear with a slight stagger.
- Background orbs drift slowly.
- Move the cursor: orbs shift slightly (subtle).
- Scroll: orbs parallax slightly with the page.

Then enable the OS-level "reduce motion" setting and reload the page:
- All animations should be effectively instant; orbs should not drift.

```bash
kill "$PREVIEW_PID"
wait "$PREVIEW_PID" 2>/dev/null || true
```

- [ ] **Step 6: Commit**

```bash
git add src/scripts/animations.client.ts src/layouts/Layout.astro src/pages/index.astro
git commit -m "feat: add Motion animations (load entrance, scroll reveals, orb parallax)"
```

---

### Task 19: Re-run smoke test after animations

Quick safety check that the legal pages still render correctly.

- [ ] **Step 1: Build + preview + smoke**

```bash
npm run build
npm run preview &
PREVIEW_PID=$!
sleep 3
npm run smoke
SMOKE_EXIT=$?
kill "$PREVIEW_PID"
wait "$PREVIEW_PID" 2>/dev/null || true
exit "$SMOKE_EXIT"
```

Expected: smoke exits 0 with all `OK` lines.

- [ ] **Step 2: Commit**

```bash
git commit --allow-empty -m "chore: smoke test passes after animation work"
```

---

### Task 20: Favicon + OG image (placeholders)

**Files:**
- Create: `public/favicon.svg`
- Create: `public/og-image.png`

- [ ] **Step 1: Create `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#c4b5fd"/>
      <stop offset="100%" stop-color="#f9a8d4"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="64" height="64" rx="14" fill="#0a0a18"/>
  <text x="50%" y="56%" text-anchor="middle" dominant-baseline="middle"
        font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="36"
        fill="url(#g)">S</text>
</svg>
```

- [ ] **Step 2: Create placeholder `public/og-image.png`**

Generate any 1200×630 PNG named `og-image.png` and save it to `public/`. The exact image does not matter for now — it will be replaced before launch (called out in the README).

If ImageMagick is installed:
```bash
convert -size 1200x630 \
  gradient:'#1f1147-#0a0a18' \
  -gravity center -fill '#f5f5f7' -font 'DejaVu-Sans-Bold' -pointsize 72 \
  -annotate 0 'Sep Behroozi' \
  public/og-image.png
```

If not, save any 1200×630 PNG to `public/og-image.png`.

- [ ] **Step 3: Verify Layout references resolve**

Run: `npm run build`
Expected: builds successfully with no warnings about missing favicon/og-image.

- [ ] **Step 4: Commit**

```bash
git add public/favicon.svg public/og-image.png
git commit -m "feat: add favicon (gradient S) and placeholder OG image"
```

---

### Task 21: Rewrite `README.md`

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Replace the entire contents of `README.md` with**

````markdown
# sepbehroozi.github.io

Personal site and online resume for Sep Behroozi, deployed to GitHub Pages from this repository.

## Stack

- [Astro](https://astro.build) — static site generator
- [Tailwind CSS](https://tailwindcss.com) — styling
- [Motion](https://motion.dev) — animations
- TypeScript

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:4321.

To preview a production build locally:

```bash
npm run build
npm run preview
```

## Editing content

All editable site content lives in **`src/data/resume.ts`**. To update the homepage (bio, experience, education, skills, contact links), edit that file and commit.

Legal pages (privacy policies, terms) live as Markdown under `src/pages/sepool/` and `src/pages/tmforwarder/`. The URLs they generate (e.g. `/sepool/terms_of_service`) must remain stable because they are referenced from shipped mobile apps. Do not rename or delete these files.

The downloadable resume PDF is **maintained externally** (via a CV maker website) and committed to `public/resume.pdf`. To update the downloadable resume, replace that file. The inline web-formatted resume in `resume.ts` and the PDF are intentionally separate sources — keep them roughly aligned but they do not need to match line-for-line.

## Personal assets to replace before launch

- `public/photo.jpg` — replace the placeholder with your portrait (square, ~256–512 px).
- `public/resume.pdf` — replace with your real CV.
- `public/og-image.png` — replace with a real social-share card (1200×630).

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages.

**One-time repo setting:** under **Settings → Pages**, set **Source** to **GitHub Actions**. The workflow will fail to deploy if this is still set to "Deploy from a branch."

## Preserved URLs

The following URLs are referenced from shipped mobile apps and must continue to resolve. The `scripts/smoke-test-urls.sh` script verifies them:

- `/altstore/alt_source.json` — AltStore source for Treffen
- `/altstore/Treffen/*.ipa` — Treffen build artifacts
- `/sepool/privacy_policy`, `/sepool/terms_of_service`
- `/tmforwarder/privacy_policy`, `/tmforwarder/terms_of_service`, `/tmforwarder/power-optimization-settings`

Run the smoke test against a local preview:

```bash
npm run build
npm run preview &     # starts on :4321
sleep 3
npm run smoke
```

Or against the deployed site:

```bash
scripts/smoke-test-urls.sh https://sepbehroozi.github.io
```
````

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: rewrite README for the new Astro-based site"
```

---

### Task 22: GitHub Actions deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy site to GitHub Pages

on:
  push:
    branches: [main, master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npm run build

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Actions workflow to build and deploy to Pages"
```

---

### Task 23: Final cutover smoke test

After the deploy workflow runs successfully, verify against the live site.

- [ ] **Step 1: Push to `main` (or `master` — this repo's default is `master`)**

```bash
git push origin master
```

- [ ] **Step 2: Switch the GitHub Pages source (one-time, manual)**

In the GitHub web UI for `sepbehroozi/sepbehroozi.github.io`:

1. Go to **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions** (instead of "Deploy from a branch").
3. Save.

If the workflow already ran before this step, it built and uploaded an artifact but the deploy job is skipped or queued waiting on the source setting; you may need to re-run the workflow from the Actions tab after switching.

- [ ] **Step 3: Wait for workflow to complete**

Open the **Actions** tab on GitHub and wait for the most recent run of "Deploy site to GitHub Pages" to show ✅ for both the `build` and `deploy` jobs.

If `build` fails, fix the issue locally, commit, and push again.
If `deploy` fails with a permissions error, double-check the **Pages → Source** setting from Step 2.

- [ ] **Step 4: Smoke-test the deployed site**

```bash
scripts/smoke-test-urls.sh https://sepbehroozi.github.io
```

Expected: every line `OK`, exit 0. **All preserved URLs must pass.** If any fail, do not consider the cutover complete — investigate before walking away.

- [ ] **Step 5: Manual visual check**

Open `https://sepbehroozi.github.io/` in a browser and confirm:
- Sidebar with avatar, name, tagline, Download CV button, GitHub + LinkedIn links, skill groups.
- Right column: About, Experience, Education sections.
- Animations behave as expected (load entrance, scroll reveals, orb drift).
- `/sepool/terms_of_service` renders the legal page with the new dark layout.
- `/altstore/alt_source.json` returns valid JSON.

- [ ] **Step 6: Commit a launch marker (empty commit)**

```bash
git commit --allow-empty -m "chore: site cut over to Astro on GitHub Pages"
git push origin master
```

---

## Self-review

**Spec coverage check:**

- ✅ Astro + Tailwind + Motion stack — Tasks 1–2, 18.
- ✅ Project structure (src/, public/, layouts, components, data) — Tasks 1, 3–16.
- ✅ URL preservation contract (build.format: 'file', legal MD pages, AltStore/tmforwarder pass-through) — Tasks 1 (config), 3, 4, 6, 7.
- ✅ Visual design (gradient backdrop, glow orbs, gradient-text name, Inter, surface tokens) — Tasks 2, 10, 11, 15.
- ✅ Sidebar contracts (Avatar, name, role, tagline, ContactLinks GitHub+LinkedIn, DownloadCV, SkillGroup × N) — Tasks 11, 12.
- ✅ ContentStream contracts (About, Experience, Education) — Tasks 13, 14.
- ✅ ExperienceCard / EducationCard structures — Task 13.
- ✅ Resume data model — Task 9.
- ✅ Animations (on-load, scroll reveals, parallax, drift, prefers-reduced-motion) — Task 18.
- ✅ Deployment via GitHub Actions, Pages source switch — Tasks 22, 23.
- ✅ SEO meta (title, description, canonical, OG, Twitter Card, favicon) — Tasks 5 (Legal), 15 (Layout), 20 (favicon + og-image).
- ✅ README documents local dev, content edit points, Pages-source switch — Task 21.
- ✅ Acceptance criteria covered: smoke script (Task 6) covers URL preservation; visual sanity check (Task 17) and final cutover (Task 23) cover homepage rendering; reduced-motion behavior verified in Task 18 Step 5.

**Placeholder scan:** searched the plan for "TODO", "TBD", "implement later", "fill in details". None remain. Placeholder personal assets (photo.jpg, resume.pdf, og-image.png) are intentional and called out in the README task as user-replaced.

**Type consistency:** verified that `Resume`, `Experience`, `Education`, `SkillGroup`, `ContactLink`, `ContactKind`, `DateRange` are all defined in Task 9 and used consistently in Tasks 11–14. Component prop names (`item`, `group`, `links`, `src`, `alt`, `href`) are consistent across leaf and composite components. Method names match (`formatRange` is local to each card and identical in both).

**One known limitation called out in the spec:** the `/sepool/terms_of_service.md` (raw markdown, content-type `text/markdown`) URL form is intentionally not preserved. The bare-name and `.html` forms remain. This is documented in the spec's "Out of scope" section and the smoke test reflects only the preserved forms.
