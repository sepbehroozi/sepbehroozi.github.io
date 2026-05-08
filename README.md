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

Pushes to `main` (or `master`) trigger `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages.

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
