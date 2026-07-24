# 4Barg Delete Account Guide — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a dimmed "Deleting your account" link to the 4Barg footer and create a step-by-step guide page with 4Barg visual theming.

**Architecture:** Standalone Astro page (`delete_account.astro`) with inline 4Barg token overrides and a radial-gradient backdrop — no layout dependency. The 4barg landing page footer gets one new `<a>` tag with `opacity-50`.

**Tech Stack:** Astro v6, Tailwind CSS v4, static HTML output (`format: 'file'`)

## Global Constraints

- Build format is `file` (pages emit sibling `.html` files, e.g. `delete_account.html`)
- 4Barg theme colors: base `#030d0b`, accent gold `#ffd65a`, text-secondary `#a2beba`
- `!important` on all token overrides to defeat global portfolio defaults
- No shared layout components — the guide page is self-contained (matches the 4barg pattern of inline styles)

---

## File Map

| Action | Path | Purpose |
|--------|------|---------|
| Create | `src/pages/4barg/delete_account.astro` | Step-by-step guide page with 4Barg theming |
| Modify | `src/pages/4barg/index.astro:313-318` | Add dimmed footer link |
| Place | `public/4barg/screenshots/lobby.png` | Screenshot: lobby screen with profile button |
| Place | `public/4barg/screenshots/profile-delete.png` | Screenshot: profile settings with delete button |

---

### Task 1: Place screenshots (user action)

**Files:**
- Place: `public/4barg/screenshots/lobby.png`
- Place: `public/4barg/screenshots/profile-delete.png`

**Interfaces:**
- Produces: Image assets available at `/4barg/screenshots/lobby.png` and `/4barg/screenshots/profile-delete.png`

- [ ] **Step 1: Copy `lobby.png` into the repo**

```bash
# User action — copy your lobby screenshot into the project:
cp /path/to/your/lobby.PNG public/4barg/screenshots/lobby.png
```

- [ ] **Step 2: Copy `profile.png` into the repo**

```bash
# User action — copy your profile screenshot into the project:
cp /path/to/your/profile.PNG public/4barg/screenshots/profile-delete.png
```

- [ ] **Step 3: Verify files exist**

```bash
ls -la public/4barg/screenshots/lobby.png public/4barg/screenshots/profile-delete.png
```

Expected: Both files listed.

---

### Task 2: Create the delete-account guide page

**Files:**
- Create: `src/pages/4barg/delete_account.astro`

**Interfaces:**
- Consumes: Screenshots at `/4barg/screenshots/lobby.png` and `/4barg/screenshots/profile-delete.png`
- Produces: Page route `/4barg/delete_account` (built as `4barg/delete_account.html`)
- Links from: Footer link (Task 3)
- Links to: `/4barg/` (back link)

- [ ] **Step 1: Create the page file**

```bash
touch src/pages/4barg/delete_account.astro
```

- [ ] **Step 2: Write the full page**

Write to `src/pages/4barg/delete_account.astro`:

```astro
---
import '../styles/global.css';

const title = "How to Delete Your 4Barg Account";
const description = "Step-by-step guide to delete your 4Barg (&#x686;&#x647;&#x627;&#x631; &#x628;&#x631;&#x6AF;) account from the mobile app.";
const canonical = new URL(Astro.url.pathname, Astro.site).toString();
---
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Delete Account &mdash; 4Barg</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="article" />
    <meta property="og:url" content={canonical} />
    <meta property="og:image" content={new URL('/og-image.png', Astro.site).toString()} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={new URL('/og-image.png', Astro.site).toString()} />
  </head>
  <body class="bg-ink-base text-[color:var(--text-primary)]">
    <div
      aria-hidden="true"
      class="pointer-events-none fixed inset-0 -z-10"
      style="background: radial-gradient(120% 80% at 0% 0%, var(--bg-radial-from) 0%, var(--bg-base) 60%);"
    ></div>

    <main class="mx-auto max-w-2xl px-6 py-16">
      <a
        href="/4barg"
        class="inline-flex items-center text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-from)] transition-colors mb-8"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to 4Barg
      </a>

      <h1 class="text-3xl md:text-4xl font-semibold mb-8">{title}</h1>

      <article class="delete-guide-prose">
        <ol class="space-y-10">
          <li class="guide-step">
            <h2 class="text-xl font-semibold text-[var(--text-primary)] mb-2">Login to the app</h2>
            <p>Open the 4Barg app and login with your username and password.</p>
          </li>

          <li class="guide-step">
            <h2 class="text-xl font-semibold text-[var(--text-primary)] mb-2">Navigate to your profile</h2>
            <p>
              From the Lobby screen, tap on <strong>&ldquo;&#x67E;&#x631;&#x648;&#x641;&#x627;&#x6CC;&#x644;&rdquo;</strong> (Profile).
              You can find this by tapping your avatar at the top of the screen,
              or the profile icon in the bottom navigation bar.
            </p>
            <img
              src="/4barg/screenshots/lobby.png"
              alt="4Barg Lobby screen showing the profile button"
              class="guide-screenshot"
              loading="lazy"
            />
          </li>

          <li class="guide-step">
            <h2 class="text-xl font-semibold text-[var(--text-primary)] mb-2">Open delete account</h2>
            <p>
              On the Profile Settings screen, scroll all the way to the bottom and tap the
              <strong>&ldquo;&#x62D;&#x630;&#x641; &#x62D;&#x633;&#x627;&#x628; &#x6A9;&#x627;&#x631;&#x628;&#x631;&#x6CC;&rdquo;</strong>
              (Delete Account) button. It is the solid red button at the very bottom of the page.
            </p>
            <img
              src="/4barg/screenshots/profile-delete.png"
              alt="4Barg Profile Settings screen highlighting the Delete Account button at the bottom"
              class="guide-screenshot"
              loading="lazy"
            />
          </li>

          <li class="guide-step">
            <h2 class="text-xl font-semibold text-[var(--text-primary)] mb-2">Confirm deletion</h2>
            <p>
              A confirmation dialog will appear asking you to confirm.
              Type your <strong>exact username</strong> into the text field, then tap
              <strong>&ldquo;&#x62A;&#x627;&#x6CC;&#x6CC;&#x62F;&rdquo;</strong> (Confirm).
              Your account and all associated data will be permanently deleted.
            </p>
          </li>
        </ol>
      </article>

      <footer class="mt-16 pt-8 border-t border-[#1d5c50]/20 text-center">
        <a href="/4barg" class="text-sm text-[#6b8f8a] hover:text-[var(--accent-from)] transition-colors">
          &larr; Back to 4Barg
        </a>
        <p class="text-xs text-[#6b8f8a] mt-4">
          &copy; {new Date().getFullYear()} Sep Behroozi
        </p>
      </footer>
    </main>

    <style>
      :root {
        --bg-base: #030d0b !important;
        --bg-radial-from: #082b22 !important;
        --accent-from: #ffd65a !important;
        --accent-to: #ffe4b0 !important;
        --text-primary: #fffdf9 !important;
        --text-secondary: #a2beba !important;
        --text-tertiary: #6b8f8a !important;
      }

      .delete-guide-prose {
        color: var(--text-secondary);
        line-height: 1.7;
        font-size: 1rem;
      }

      .delete-guide-prose p {
        margin-bottom: 1em;
      }

      .guide-step {
        counter-increment: step;
        list-style: none;
      }

      .guide-step::before {
        content: counter(step);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background: linear-gradient(135deg, #ffd65a 0%, #d5ac4f 100%);
        color: #030d0b;
        font-weight: 700;
        font-size: 0.875rem;
        margin-right: 0.75rem;
        vertical-align: middle;
        flex-shrink: 0;
      }

      .guide-screenshot {
        max-width: 100%;
        border-radius: 0.75rem;
        border: 1px solid rgba(29, 92, 80, 0.35);
        margin-top: 0.75rem;
      }
    </style>
  </body>
</html>
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/4barg/delete_account.astro
git commit -m "feat: add 4barg delete account guide page"
```

---

### Task 3: Add dimmed footer link to the 4barg landing page

**Files:**
- Modify: `src/pages/4barg/index.astro:318-318`

**Interfaces:**
- Links to: `/4barg/delete_account` (Task 2)

- [ ] **Step 1: Add the link after the Contact email link**

In `src/pages/4barg/index.astro`, find line 318:
```html
        <a href="mailto:efromfb@gmail.com" class="footer-link" id="footer-email">Contact: efromfb@gmail.com</a>
```

Insert after it:
```html
        <span class="hidden md:inline text-[#6b8f8a]">•</span>
        <a href="/4barg/delete_account" class="footer-link opacity-50" id="footer-delete-account">Deleting your account</a>
```

- [ ] **Step 2: Verify the edit looks correct**

Read the footer section:
```bash
grep -n -A 10 '<footer' src/pages/4barg/index.astro | head -20
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/4barg/index.astro
git commit -m "feat: add dimmed delete-account link to 4barg footer"
```

---

### Task 4: Build verification

**Files:**
- No code changes — verify the build passes

- [ ] **Step 1: Run the build**

```bash
npm run build
```

Expected: Build succeeds with no errors. Output includes:
```
4barg/delete_account.html
```

- [ ] **Step 2: Check the generated file exists**

```bash
ls -la dist/4barg/delete_account.html
```

Expected: File exists.

- [ ] **Step 3: Spot-check the generated HTML for the footer link**

```bash
grep "Deleting your account" dist/4barg/index.html
```

Expected: The link `<a href="/4barg/delete_account" ...>Deleting your account</a>` is present.

- [ ] **Step 4: Spot-check the guide page for image references**

```bash
grep "lobby.png\|profile-delete.png" dist/4barg/delete_account.html
```

Expected: Both `<img>` tags with correct `src` attributes are present.
