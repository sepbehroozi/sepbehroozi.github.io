# 4Barg Delete Account Guide — Design Spec

**Date:** 2025-07-25
**Status:** Approved

## Summary

Add a dimmed "Deleting your account" link to the 4Barg landing page footer and a companion guide page that shows users how to delete their account in the mobile app, step by step with screenshots.

## Motivation

The Apple App Store and Google Play Store increasingly require apps with account creation to provide a clear account deletion path. The 4Barg app already has a full delete-account flow (Android, iOS, server), but it is not documented on the website. Adding a guide page provides a public, accessible reference.

## Design

### 1. Footer Link

**Location:** `src/pages/4barg/index.astro`, footer `<div>` (around line 313).

**Change:** Add a new link after the Contact email link:

```html
<span class="hidden md:inline text-[#6b8f8a]">•</span>
<a href="/4barg/delete_account" class="footer-link opacity-50" id="footer-delete-account">Deleting your account</a>
```

**Styling:** Uses existing `.footer-link` class plus `opacity: 50` to dim it. Hover restores full opacity via the existing `.footer-link:hover` rule (gold color accent). No new CSS needed.

### 2. Guide Page

**File:** `src/pages/4barg/delete_account.astro`

#### Layout & Theming

The page applies **4Barg-specific design tokens** (dark emerald-green base + warm gold accents) to match the landing page, NOT the portfolio purple theme used by `Legal.astro`.

Token overrides (inline `<style>` block):

| Token | Value |
|-------|-------|
| `--bg-base` | `#030d0b` (deep green-black) |
| `--bg-radial-from` | `#082b22` (forest teal) |
| `--accent-from` | `#ffd65a` (gold) |
| `--text-primary` | `#fffdf9` (warm white) |
| `--text-secondary` | `#a2beba` (sage) |
| `--text-tertiary` | `#6b8f8a` (faded teal) |
| `--surface` | `rgba(18, 60, 52, 0.15)` |
| `--surface-border` | `rgba(29, 92, 80, 0.35)` |

Backdrop: Inline radial gradient (same approach as `Legal.astro` but with 4Barg colors).

#### Structure

```
<html>
  <head> — Meta tags (title: "Delete Account — 4Barg"), OG, canonical URL </head>
  <body>
    <backdrop gradient>
    <main class="mx-auto max-w-2xl px-6 py-16">
      <back link> ← Back to 4Barg
      <h1>How to Delete Your 4Barg Account</h1>
      <article>
        <numbered list of 4 steps with screenshots>
      </article>
      <footer> © year, back to 4Barg link </footer>
    </main>
  </body>
</html>
```

#### Content (Numbered Steps)

```
1. Login to the 4Barg app with your username and password.

2. From the Lobby screen, tap on "پروفایل" (Profile).
   You can find this by either tapping your avatar at the top of the screen,
   or tapping the profile icon in the bottom navigation bar.
   [Image: /4barg/screenshots/lobby.png]

3. On the Profile Settings screen, scroll all the way down and tap the
   "حذف حساب کاربری" (Delete Account) button — it is the red button at the
   very bottom.
   [Image: /4barg/screenshots/profile-delete.png]

4. A confirmation dialog will appear. Type your exact username to confirm,
   then tap "تایید" (Confirm). Your account and all associated data will be
   permanently deleted.
```

#### Prose Styling

```css
.delete-guide-prose {
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 1rem;
}
.delete-guide-prose ol { counter-reset: step; list-style: none; }
.delete-guide-prose li { counter-increment: step; }
.delete-guide-prose li::before {
  content: counter(step);
  color: var(--text-primary);
  font-weight: 700;
}
.delete-guide-prose img { max-width: 100%; border-radius: 0.75rem; }
.delete-guide-prose strong { color: var(--text-primary); font-weight: 600; }
```

### 3. Screenshots (User-Provided)

The user provides two screenshots to place in `/public/4barg/screenshots/`:

| Filename | What it shows |
|----------|--------------|
| `lobby.png` | Lobby screen with the profile button highlighted (top avatar or bottom "پروفایل" tab) |
| `profile-delete.png` | Profile Settings scrolled to the bottom, highlighting the red "حذف حساب کاربری" button |

### 4. Routing

The page is served at `/4barg/delete_account` (built by Astro as `/4barg/delete_account.html`).

### 5. What Does NOT Change

- The server (`4Barg-Server`) — no changes
- The Android app (`4Barg-Android`) — no changes
- The iOS app (`4Barg-iOS`) — no changes
- Other 4Barg pages (privacy_policy, terms_of_service) — no changes
- The portfolio homepage — no changes

## Implementation Plan

1. User drops `lobby.png` and `profile-delete.png` into `/public/4barg/screenshots/`
2. Create `src/pages/4barg/delete_account.astro` — full page with 4Barg theming, prose styling, numbered steps, image placeholders
3. Edit `src/pages/4barg/index.astro` — add dimmed footer link
4. Verify with `npm run build`
