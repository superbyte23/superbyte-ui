# AGENTS.md

Guidance for AI agents working in this repository. Read this before making changes.

## Project
- Static Bootstrap 5.3.3 admin dashboard UI (HTML + CSS + vanilla JS). No build step, no package manager needed.
- Product version: **1.0.0**. The footer badge reads `v1.0.0` on all pages. Do not bump it without being asked.
- **Everything is vendored locally under `vendor/`. Never add CDN/network resource loads.**
- The admin dashboard lives in **`preview/`** (48 pages); the root **`index.html`** is the landing page about the UI (styles in `assets/css/landing.css`). All preview pages reference shared assets as `../assets/` / `../vendor/`.

## Running / verifying
- Serve statically, e.g. `python -m http.server 8000` (dev harness on port 8765).
- Syntax check: `node --check assets/js/app.js assets/js/theme-bootstrap.js assets/js/auth.js assets/js/datatable.js`
- Full integrity check: `node C:\Users\Windows\AppData\Local\Temp\opencode\verify.cjs`
  (parses every inline script, resolves local refs, asserts zero CDN refs).
- Headless browser probes live in `C:\Users\Windows\AppData\Local\Temp\opencode\`
  (CDP against Chrome, static server :8765, debug port 9222). See SESSION.md for the suite.

## Architecture (what lives where)
- `assets/css/app.css` — design tokens, layout features, auth, component gallery, page footer.
- `assets/css/layout-modes.css` — horizontal nav, mini-sidebar, boxed/contained inners, mobile fallback.
- `assets/js/app.js` — shell behavior: theme, `setLayoutMode`/`setWidthMode`, chart hook, quick search, notifications, footer toggle.
- `assets/js/theme-bootstrap.js` — pre-paint script in `<head>`; applies saved theme + layout + fonts before first paint (prevents refresh scroll-jump / flash).
- `assets/js/auth.js`, `assets/js/icons-data.js` — auth pages / icon data.
- `assets/js/datatable.js` — `SuperDataTable` dependency-free DataTable lib (client `data` or async `source` mode; self-builds toolbar/table/footer; no build step).
- `app-shell.tmpl`, `auth.html.tmpl` — page generators; `_pages/` — fragments + page scripts.

## Conventions & pitfalls
- **Pre-paint is mandatory.** Theme + layout must be applied by `theme-bootstrap.js` before first paint; app.js early-apply syncs from rendered `<body>` classes (single source of truth). Keep both files LF.
- **Chart canvases** must sit in fixed-height wrappers (`style="height:230px"` etc.), never flex/growing parents. Chart pages register `window.__chartInit`; non-chart pages register `window.__pageInit`, both BEFORE `assets/js/app.js`.
- **Boxed width = Bootstrap container grid** via `--app-boxed-w` (540/720/960/1140/1320). Any media-query token override must repeat `:root, [data-bs-theme="dark"]` or body's own declaration shadows inheritance.
- **Layout axes:** nav (`vertical`/`horizontal`/`mini-sidebar`) × width (`fluid`/`boxed`/`contained`) are mutually exclusive class sets; density = `layout-compact`. `setBoxed()` does not exist — use `setWidthMode`.
- **Horizontal/mini top-nav is hover-only**; clicks are no-ops on desktop. Mobile (≤991.98px) horizontal = off-canvas drawer.
- **Icons are HugeIcons** (`hgi hgi-stroke hgi-<name>`), vendored subset. No Font Awesome.
- **Do not add `animation` to `.page-section`** (removed on purpose: it was the visible refresh nudge).
- **`html, body { overflow-x: hidden; }`** in app.css must stay (drawer/flyout first-frame overflow).
- Never commit `session-ses_03f8.md` (untracked session note).
- Keep commit messages imperative and focused; stage only intended files with `git add -u` after checking `git status`/`git diff`.

## More detail
See `SESSION.md` for the full session handoff, conventions, and verification suite.
