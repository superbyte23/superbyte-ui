# Superbyte UI — Session Handoff

Saved: Mon Aug 03 2026. Next session: read this first, then `git status` + `git log --oneline -5`.

## Project
- Static Bootstrap 5.3.3 admin UI at `D:\superbyte-ui` (git repo, branch `main`, remote
  `git@github.com:superbyte23/superbyte-ui.git`).
- No build step, no `npm install`, no backend. Serve with any static server
  (dev harness: `node Temp\opencode\static-server.cjs` on port 8765).
- **Product version: 1.0.0.** Footer badge `v1.0.0` on all 48 pages, auth headers `v1.0.0`,
  docs heading `v1.0.0`. Demo content may still mention `v2.x` (calendar event, file names,
  docs changelog) — those are sample data, not page versions.
- **CDN policy: all assets are vendored locally under `vendor/`; zero external/CDN resource loads.**

## Status: v1.0.0 — dashboard lives in `preview/`, root is the landing page
- **48-page admin dashboard is now under `preview/`** (index, analytics, records, users, datatables, forms,
  elements, cards, overlays, utilities, docs, components, all-components, tables, charts,
  visuals, rtl, maps, echarts, editors, crm, ecommerce, calendar, kanban, email, file-manager,
  create, layouts, 11 `layout-*.html` presets, 8 auth pages).
- Root **`index.html`** is the landing page about the UI (styles in `assets/css/landing.css`),
  with a hero that live-frames `preview/index.html` and links into the dashboard. Preview pages
  reference shared assets as `../assets/` / `../vendor/`; `app-shell.tmpl` / `auth.html.tmpl`
  emit `../` paths for regeneration into `preview/`.
- All pages share the app shell (`#app` sidebar + toolbar + theme customizer) and
  `assets/css/app.css` / `assets/css/layout-modes.css` / `assets/js/app.js` /
  `assets/js/theme-bootstrap.js`. Auth pages are standalone (no shell).
- Latest work (commit `b6f13bd` + finalization):
  - Shell aligned to Bootstrap's container grid; **boxed width = container widths**
    (540 @sm / 720 @md / 960 @lg / 1140 @xl / 1320 @xxl) via `--app-boxed-w`,
    not the old 1440px cap. `.layout-boxed #app-nav` rail offset now at `min-width: 992px`.
  - Boxed horizontal nav squeezes gracefully (logo shrinks to 56px mark under 1400px,
    user name/chev hidden, compact groups) and uses 24px gutters like contained.
  - Page footer rebuilt on Bootstrap flex: `.app-footer-inner` = `d-flex flex-wrap
    align-items-center justify-content-center justify-content-md-between`, single 13px
    base font size, storage meter `flex: 0 1 250px` desktop / full-width row mobile.
  - Version bumps: footer badge `v2.5.0` → `v1.0.0` (47), auth header `v2.4.0` → `v1.0.0`
    (8), docs heading → `v1.0.0`.

## How to verify (re-run before declaring done)
- `node --check assets/js/app.js assets/js/theme-bootstrap.js assets/js/auth.js`
- `node C:\Users\Windows\AppData\Local\Temp\opencode\verify.cjs` — parses every inline
  `<script>` via `vm.Script`, resolves all local src/href, counts CDN refs (must be 0),
  checks app.js/auth.js syntax and sidebar links.
- Headless browser checks live in `Temp\opencode\` (CDP against Chrome at
  `C:\Program Files\Google\Chrome\Application\chrome.exe`, static server port 8765,
  debug port 9222). Current suite: `verify-combo.cjs`, `verify-sb.cjs`,
  `verify-horizontal-mobile3.cjs`, `diff-drawer.cjs`, `probe-rtl-boxed.cjs`,
  `probe-rtl-h.cjs`, `trace-stress.cjs`, `hover-test.cjs`, `verify-menus.cjs`,
  `sweep-all-components.cjs`, `cdp-all-components.cjs`.
- **Visible-browser note:** headless Chrome does NOT render CSS animations like a real
  window. For anything visual/animation, run a visible profile
  (`Start-Process chrome.exe --remote-debugging-port=9224 --user-data-dir=Temp\opencode\chrome-visible`).
  `Page.navigate`-only probes are robust; a killed probe can wedge a tab — restart the profile.

## CRITICAL CONVENTIONS
- **Pre-paint bootstrap (`theme-bootstrap.js`):** applied via external
  `<script src="assets/js/theme-bootstrap.js">` in `<head>` of all 44 shell pages. Reads
  `localStorage` synchronously and pre-applies theme (accent, base theme, font, radius,
  font size), resolves the three layout axes (nav × width × density) so no reflow happens
  after first paint, and eagerly loads in-use fonts. DO NOT regenerate from the OLD
  `Temp\opencode\inject-theme-bootstrap.cjs` (inline-injection generator, points at the old
  folder). Keep both theme-bootstrap.js and app.js LF (repo standard; edit tool once wrote
  CRLF — convert back before committing).
- **`__pageInit` hook (app.js):** non-chart pages register
  `window.__pageInit = <renderFn>;` at end of their inline script BEFORE `assets/js/app.js`;
  app.js `runPageInit()` calls it after shared helpers are defined.
- **Chart hook contract:** chart pages define `initCharts()` and set
  `window.__chartInit = initCharts;` BEFORE `assets/js/app.js`. `refreshCharts()` re-runs it
  on every theme/accent/radius change. Every chart `<canvas>` MUST sit in a fixed-height
  wrapper div (never a flex-column/h-100 parent) — ResizeObserver feedback bug.
  Script order: `bootstrap.bundle.min.js` → page libs → inline (hook registration, no direct
  call) → `assets/js/app.js`.
- **Layout model — two orthogonal axes + density** (all in `localStorage`):
  - Navigation: `vertical` (default) / `horizontal` / `mini-sidebar` (`grid_admin_layout_mode`).
  - Content width: `fluid` (default) / `boxed` (container grid) / `contained`
    (`grid_admin_width_mode`). Legacy `grid_admin_boxed` is a fallback.
  - Density: `layout-compact` from `grid_admin_compact`.
  - Frame classes are mutually exclusive; `setLayoutMode`/`setWidthMode` in app.js write
    storage + toggle `.active` markers. `layouts.html` is the hub; each `layout-*.html`
    preset page FORCES its mode(s) via `<script>setLayoutMode(...);setWidthMode(...)</script>`
    after app.js.
- **`setBoxed()` was REMOVED** — create.html now calls `setWidthMode`.
- **Horizontal / mini-sidebar top-nav is hover-only** (no `:focus-within`, no click pinning);
  keyboard access via a `kb-open` class. On mobile (≤991.98px) horizontal falls back to the
  standard off-canvas drawer (CSS in layout-modes.css "Mobile fallback").
- **RTL:** `rtl.html` uses `bootstrap.rtl.min.css` + `dir="rtl"`; overrides live in app.css /
  layout-modes.css under `[dir="rtl"]` descendant selectors (dir is on `<html>`, layout
  classes on `<body>`).
- **Version tokens:** `--app-boxed-w` media overrides on `:root, [data-bs-theme="dark"]`
  (app.css). **Any media-query token override MUST repeat the full selector list
  `:root, [data-bs-theme="dark"]`** — body `data-bs-theme` shadows inheritance otherwise.
- **HTML overflow:** `html, body { overflow-x: hidden; }` in app.css — the off-canvas
  drawer/flyouts count toward `scrollWidth` on first frames otherwise. Wide tables scroll
  inside `.card:has(.data-table) { overflow-x: auto; }` instead.
- **HugeIcons:** all icons are `hgi hgi-stroke hgi-<name>` from the vendored
  `vendor/hugeicons/` subset (used-glyph set + `hugeicons.css`). `fa-*` is gone project-wide.
  Adding a new glyph = rebuild subset webfont via `Temp\opencode\fontwork\add-glyph.cjs`.
- **Auth pages** generated from `auth.html.tmpl` + `assets/js/auth.js` (demo only, no real
  auth). Guards in app.js keep shell features inert there.
- **`.page-section` must NOT animate on load** — the fadeIn entrance was removed (it was the
  visible refresh "nudge"); keep `display:none`/`.active` but no `animation`.
- **`session-ses_03f8.md` (repo root) is untracked and NEVER committed.**

## CSS/JS section map (append new styles under the matching section)
- app.css: TOKENS (`--app-boxed-w` etc.), LAYOUT FEATURES (compact/boxed/RTL), AUTH PAGES,
  COMPONENTS GALLERY, ENTERPRISE TABLES, ADVANCED FORMS, VISUALIZATIONS, page footer
  (`.app-footer-*`), mobile drawer.
- layout-modes.css: horizontal top-nav, mini-sidebar rail, boxed/contained inner widths,
  nav-fit blocks (1200–1399.98 / ≥1400), 24px gutter block, sidebar collapse toggle,
  mobile fallback.
- app.js: toasts, theme, layout (setLayoutMode/setWidthMode), chart hook, quick search,
  notifications, scroll-to-top, loading overlay, footer `.dropup` toggle.
- theme-bootstrap.js: pre-paint theme + layout + font loading.

## Changelog (condensed)
- DataTables row actions (2026-08-05): client-side demo (2) now has always-visible
  view · edit · delete buttons (`hgi-eye` view modal `#viewModal`, `openView`);
  `.row-actions-always` override added so CRUD controls are discoverable.
- DataTables CRUD (2026-08-05): client-side demo (2) on `preview/datatables.html` gained
  add · edit · delete via `#customerModal` + row-actions buttons (`openAdd`/`openEdit`/`openDelete`);
  row-action indices fixed for non-first pages (`csStart + idx`); verified headless (probe-crud.cjs).
- DataTables page (2026-08-05): added `preview/datatables.html` showcasing four table
  implementations (1 · static markup, 2 · client-side search/sort/paginate, 3 · simulated
  server-side fetch, 4 · live streaming feed); `DataTables` nav link added to all 39 shell
  pages; landing/docs/README/AGENTS/SESSION page counts bumped to 48.
- Landing page + preview split (2026-08-04): moved all 47 dashboard pages into `preview/`
  (rewrote `assets/`/`vendor/` → `../`, incl. rtl.html's runtime CSS swap), root `index.html`
  became the landing page (`assets/css/landing.css`), templates/docs/README/AGENTS updated;
  verify.cjs now scans `preview/` too (also ignores `www.w3.org/2000/svg` namespace URIs).
- v1.0.0 finalization (2026-08-03): boxed = Bootstrap container grid; footer flex + 13px;
  version 1.0.0 on all pages; README/SESSION/AGENTS updated; pushed to origin/main.
- Footer/profile rework (2026-08-02): user dropdown in sidebar footer, theme toggle in
  toolbar, page footer (version + uptime + storage meter + links + copyright) on all 48 pages.
- Layout: two-axis model (nav × width) + density; 11 preset pages; pre-paint scroll-jump
  fixes (theme-bootstrap, font preload, `.page-section` fadeIn removal); hover-only
  horizontal flyouts; mobile fallback drawer.
- Rename Gridline → Superbyte; theme flash fix (head bootstrap); sidebar sub-menus;
  all-components catalog page; Font Awesome → HugeIcons migration; quick search /
  notifications / scroll-to-top / loading overlay; create.html preset generator.
