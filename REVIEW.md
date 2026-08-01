# Code Review — Superbyte Admin

Reviewed the working tree at `74b670a` on `arena/019fbc5c-superbyte-ui`:
36 HTML pages, shared app shell, `assets/js/app.js` (479 LOC), `assets/js/auth.js`,
`assets/js/theme-bootstrap.js`, `assets/css/app.css` (1344 LOC),
`assets/css/layout-modes.css`, `_pages/*.frag` + `*.js`, and `app-shell.tmpl`.

Checks performed:
- `node --check` on every `.js` (assets + `_pages`) — **all pass**.
- Internal `href="*.html"` link integrity — **no broken links**.
- External `http(s)` refs in static HTML — **zero** (CDN policy holds).
- Duplicate element IDs per page — clean (the two `id="content"` hits in
  `docs.html` are one real element + one escaped code-sample string).
- `toast-container` present on all 36 pages; `app.js` loads everywhere it's used.

Overall the codebase is clean, well-organized, and internally consistent in the
shipped pages. Findings below, most- to least-important.

---

## Status: fixes applied

Items 1–2 below were fixed in this pass (verified: `node --check` clean,
template nav byte-matches all 35 standard shell pages). Original review item 3
(white/dark accent swatches) was **superseded by the existing `main` "light and
dark accent fix"** — see §3. Items 4–5 are noted as intentional/optional and were
left as-is.

> **Branch reconciliation note.** The review branch was based on an older commit
> that predates `main`'s "light and dark accent fix". Before opening the PR the
> branch was reconciled onto current `main` (`assets/js/app.js` +
> `assets/css/app.css` pulled in from `origin/main`) so the PR carries only the
> review changes on top of `main` rather than reverting `main`'s accent work.

---

## 1. `app-shell.tmpl` was out of sync with the shipped shell pages — FIXED

The template was stale in three ways: it still used the old flat `nav-group-label`
nav instead of the collapsible `side-group` structure every shipped page uses; it
had a stale "Layout" submenu with `data-layout-mode` links; and it linked
`assets/css/layout-modes.css` in the `<head>`.

**Changes made:**
- Rebuilt `app-shell.tmpl`'s `#nav-scroll` nav to the canonical collapsible
  8-group structure (byte-identical to the shipped pages, minus the active
  marker). Verified the template now matches all 35 standard shell pages.
- Removed `<link rel="stylesheet" href="assets/css/layout-modes.css">` from the
  template head. `layouts.html` (the layout showcase) keeps its own Layout group
  and `layout-modes.css` — it remains the single page where layout modes are a
  live feature.
- **`assets/js/app.js` `setLayoutMode()`** now guards against applying
  `layout-horizontal` on pages that don't load `layout-modes.css`. A persisted
  `horizontal` setting on a non-showcase page falls back to `vertical` instead of
  toggling a body class with no matching CSS (the "silent layout break" bug).

Regenerating from the template now yields the same collapsible nav as every
shipped page, so `nav-consistency.cjs` stays green.

- `app-shell.tmpl` (the generator template for the shell pages) contains:
  - a **"Layout" side-group submenu** with `data-layout-mode` links
    (`vertical` / `horizontal` / `boxed` / `fluid`), and
  - `<link rel="stylesheet" href="assets/css/layout-modes.css">` (line 14).
- The **shipped** pages (`index.html`, `calendar.html`, and all other fragment-
  generated pages) do **not** include the Layout submenu, the `data-layout-mode`
  links, or `assets/css/layout-modes.css`. Only `layouts.html` has them.

Consequences:
- **Regenerating any page with `gen-shell.cjs` today would produce a nav that is
  inconsistent with every other shipped page** — breaking the "byte-identical
  sidebar nav" invariant that `nav-consistency.cjs` checks.
- Because `app.js` runs `setLayoutMode(savedLayoutMode)` on *every* page load,
  choosing "Horizontal" on `layouts.html` (persisted in `grid_admin_layout_mode`)
  adds `layout-horizontal` to `<body>` on other pages — but `layout-modes.css`
  isn't loaded there, so the mode silently falls back to vertical. The persisted
  layout mode only ever renders on `layouts.html`.

Fix: decide whether the Layout submenu + `layout-modes.css` are part of the
standard shell. If yes, regenerate all pages (or add the `<link>` + submenu to
all pages); if the feature is meant to live only on the `layouts.html` showcase,
then **remove them from `app-shell.tmpl`** so future regenerations stay
consistent, and consider skipping `setLayoutMode(savedLayoutMode)` on non-
`layouts` pages so a stale persisted mode can't toggle a class with no CSS.

## 2. Quick-search `href` interpolated un-escaped — FIXED

`assets/js/app.js`, quick-search `render()` previously interpolated `l.href`
raw into the `href` attribute while `label`/`hint` were escaped:

```js
`<a class="qs-item" href="${l.href}"><span class="qs-label">${esc(l.label)}</span>...`
```

**Change made:** the attribute is now `esc(l.href)`, matching the rest of the
template. (The actual navigation in `open()`/click handler uses the raw href via
`window.location.href`, which is fine — no injection there.)

## 3. `white` / `dark` accent swatches can produce invisible accents — SUPERSEDED on `main`

`THEMES` includes `white` (`#ffffff`) and `dark` (`#111827`), and choosing
"white" in dark mode or "dark" in light mode drives `--accent`, `--accent-bg`,
and active-state borders toward low contrast against the page background.

This was already addressed on `main` by the "light and dark accent fix":
`assets/js/app.js` gained `getContrastText()` and a `--accent-text` custom
property, and `app.css` now uses `color: var(--accent-text)` (instead of hardcoded
`#fff`) on primary buttons, active pagination, the swatch checkmark, wizard-step
numbers, and the preview logo. That keeps the swatches selectable while choosing
a legible foreground per accent, so **no code change is made here** — the branch
simply inherits `main`'s fix.

## 4. Optional cleanup: vendored icon sets are single-page-only

Only `icons.html` (the showcase) loads `vendor/font-awesome` (1.1 MB),
`vendor/remixicon` (316 KB), `vendor/bootstrap-icons` (396 KB), and
`vendor/hugeicons/css/hugeicons-full.css` (350 KB). The other 35 pages use the
12.9 KB `hugeicons-used.css`. This is fine as a deliberate showcase, but if the
repo is meant to ship lean, those ~1.8 MB of icon assets are only exercised on
one page.

## 5. Duplicated theme maps / drift surface (informational)

`THEMES`, `FONTS`, and the radius map are hardcoded in three places:
`app.js`, `theme-bootstrap.js` (inlined into every page's `<head>`), and
`create.html`. SESSION.md notes these are generated by tooling so they can't
drift — that's acceptable. Just flagging that any future hand-edit must be
applied in all three (or re-run the generator), since there's no single source
of truth in the repo.

---

## Things that look good / verified fine

- No CDN/external requests in static HTML; all vendor assets local.
- No broken internal links; all 36 pages load `app.js` and have `toast-container`
  (so `showToast` can't hit a null container).
- `esc()` is used consistently for user-visible strings in toasts, search
  results, etc.
- Theme/layout persistence is well-guarded with `try/catch` around
  `localStorage`; missing elements are null-checked (`swatch-grid`, `opt-*`,
  `drop-file`, `theme-icon`, etc.).
- The chart `__chartInit`/`refreshCharts()` and `__pageInit` hooks are cleanly
  separated and no-op safely when absent.
- `overflow-x:hidden` on `html/body` plus in-card table scroll (`:has(.data-table)`)
  is a sensible, documented fix for the horizontal-overflow regressions.
- JS syntax check clean across all `assets/js/*.js` and `_pages/*.js`.
