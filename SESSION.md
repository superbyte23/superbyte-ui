# Superbyte Admin — Session Handoff

Saved: Sat Aug 01 2026. Next session: read this first, then continue from **Next Move**.

## Project
Static Bootstrap 5.3.3 admin console at `C:\Users\Windows\Downloads\superbyte-admin`.
No build step. Open the HTML files directly in a browser.
Node v26.5.0 available. **CDN policy: all assets are vendored locally under `vendor/`; zero external/CDN resource loads.**

## Status: WAVE 1 + WAVE 2 + CREATE PAGE + ALL-COMPONENTS COMPLETE (verified)
WAVE 1: 23 HTML pages: index, analytics, records, users, forms, elements, cards,
overlays, utilities, docs, components, tables, charts, visuals, rtl, login,
register, forgot, reset, lock, verify, two-factor, session-expired.
WAVE 2: 9 more pages → 32 total. maps, echarts, editors, crm, ecommerce,
calendar, kanban, email, file-manager. All pass verify.cjs + smoke.cjs.
CREATE PAGE: `create.html` (33rd page) — a shadcn.com/create-style preset
builder: base-color swatches, radius/appearance/layout/font controls, live
preview frame, and a generated `npx superbyte@latest init --preset "…"` command
+ JSON tokens with syntax-highlighted code and a copy button. Preset is
persisted in the URL (`?preset=base-radius-appearance-layout-font`).

All pages share the same app shell (sidebar + toolbar + theme customizer offcanvas)
and `assets/css/app.css` / `assets/js/app.js`.

## How to verify (re-run before declaring done)
`node C:\Users\Windows\AppData\Local\Temp\opencode\verify.cjs`
Checks: parse every inline `<script>` via vm.Script, resolve all local src/href,
count CDN refs (must be 0), check app.js/auth.js syntax, check sidebar links exist.
Also: `node --check assets/js/app.js` and `assets/js/auth.js`.

## CRITICAL CONVENTIONS
- **`__pageInit` hook (app.js):** non-chart pages register
  `window.__pageInit = <renderFn>;` at end of their inline script (BEFORE
  `assets/js/app.js`). `app.js` `runPageInit()` calls it after shared helpers
  (`esc`, `showToast`, …) are defined. Calendar/email/file-manager use it for
  their initial render; editors/kanban run at script end (no app.js deps at load).
- **Chart.js loop fix (the original bug):** every chart `<canvas>` MUST sit in a
  fixed-height wrapper div (`style="height:230px"` etc.), never a flex-column/h-100
  parent. Root cause was ResizeObserver feedback (container height derived from
  canvas while canvas derived from container). `maintainAspectRatio:false`,
  `responsive:true` retained. Grep before adding charts: no bare `canvas` inside
  flex/growing containers.
- **Chart hook contract:** chart pages define `initCharts()` and set
  `window.__chartInit = initCharts;` BEFORE `assets/js/app.js`. `app.js`
  `refreshCharts()` invokes it; re-run on every theme/accent/radius change.
  `themeVars()` reads CSS tokens live (accent, rgb, grid, green, etc.).
  Page script order: `bootstrap.bundle.min.js` → page libs → inline
  (hook registration, no direct call) → `assets/js/app.js`.
  `mk(id, cfg)` in charts.html destroys prior instance.
- **Vendored wave-2 libs (all local, zero CDN):** `vendor/leaflet/` (1.9.4, has
  `images/` for css url() refs), `vendor/echarts/echarts.min.js` (5.5.1),
  `vendor/quill/` (2.0.3), `vendor/codemirror/` (5.65.16; `mode/` +
  `addon/edit/`, `addon/selection/`). Map tiles URL is built at runtime in
  maps.js as `'https' + '://{s}.tile.openstreetmap.org/…'` so static HTML has
  zero `http` refs. Quill/CodeMirror modes: javascript/xml/css/python/htmlmixed,
  matchbrackets, closebrackets, active-line.
- **Page generator:** `_pages/<name>.frag` (HTML) + `_pages/<name>.js` (inline
  script) → `node C:\Users\Windows\AppData\Local\Temp\opencode\gen-shell.cjs`.
  Shell = `app-shell.tmpl` (%PAGE_TITLE%, %BREADCRUMB%, %PAGE_LIB_CSS%,
  %PAGE_LIB_JS%, %CONTENT%, %PAGE_INLINE_JS%). Generator uses function
  replacements (String.replace with string mangles `$'`/`$&` in inline JS).
  Re-run after fragment edits. Sidebar nav patched via patch-sidebar.cjs (done);
  new groups: Visuals (Tables/Charts/Widgets/Maps/ECharts/Editors) and Apps
  (CRM/E-commerce/Calendar/Kanban/Email/File manager). v2.5.0 in sidebar footer.
- **Smoke test:** `node C:\Users\Windows\AppData\Local\Temp\opencode\smoke.cjs`
  runs every new page's inline script in a stubbed browser context and invokes
  `__chartInit`/`__pageInit` like app.js. Catches ReferenceErrors/typos that
  `vm.Script` parse checks miss. 9/9 passing.
- **Prefs (localStorage):** `grid_admin_theme`, `grid_admin_accent`,
  `grid_admin_radius`, `grid_admin_compact`, `grid_admin_boxed`,
  `grid_admin_fontsize` (13–17 on `<html>` root). `restorePrefs()` in app.js
  re-applies all. `setCompact`/`setBoxed`/`setFontSize` live in app.js.
- **app.js is hardened for auth pages** (no `#app`): guards on `theme-icon`,
  `opt-dark/light`, `swatch-grid`, `drop-file`. Keep those guards when editing.
- **Auth pages** are generated from `auth.html.tmpl` + shared handler in
  `assets/js/auth.js`, inlined via
  `node C:\Users\Windows\AppData\Local\Temp\opencode\gen-auth.cjs`
  (fill `%AUTH_TITLE%`, `%AUTH_SUBTITLE%`, `%AUTH_SHIELD%`, `%AUTH_SHIELD_ICON%`,
  `%AUTH_VERSION%`, `%AUTH_FORM%`, `%AUTH_FOOT%`, `%INLINE_AUTH_JS%`).
  Regenerate with that script if template/forms change. Demo only — no real auth.
- **RTL:** `rtl.html` loads `vendor/bootstrap/css/bootstrap.rtl.min.css` and sets
  `dir="rtl"`; toggle swaps stylesheet href + `dir`. RTL overrides live in
  `assets/css/app.css` under LAYOUT FEATURES (`[dir="rtl"]` rules).
- **Layout controls:** Compact/Roomy, Fluid/Boxed (1440px), Base font size 13–17.
  On all 15 shell pages incl. auth theme button (`.auth-theme-btn`, top-right).
- Theme customizer sections: Appearance, Accent, Radius, Layout density,
  Content width, Base font size, Preview.

## CSS/JS section map (append new styles under the matching section)
app.css: TOKENS, LAYOUT FEATURES (compact/boxed/RTL), AUTH PAGES, COMPONENTS
GALLERY, ENTERPRISE TABLES, ADVANCED FORMS, VISUALIZATIONS (rings, count-num,
timeline, funnel-bar, skeleton). app.js: toasts, theme, layout, chart hook.

## NEXT MOVE (wave 2 — approved scope, heavier libs vendored locally, never CDN)
1. Maps (Leaflet/maplibre) + rich text/code editors + ECharts heatmap/candlestick/
   treemap/network — vendor under `vendor/` first.
2. App module pages: CRM, e-commerce, calendar, kanban, email, file-manager.
3. Each new page: same shell, add sidebar entry, keep chart hook contract,
   run verify.cjs before finishing.

## NEXT MOVE (wave 2 — DONE; browser pass remaining)
- Manual browser pass on the 9 new pages (open each HTML directly). Maps needs
  network for OSM tiles. All script/ref/verify/smoke checks pass.
- If browser pass finds issues: edit `_pages/<name>.frag`/`.js`, re-run
  `gen-shell.cjs` + `verify.cjs` + `smoke.cjs`.

## NEXT MOVE (wave 2 — COMPLETE; CREATE page shipped)
- All 33 pages + shell features verified: verify.cjs, smoke.cjs (10/10 incl.
  create), node --check, CDP browser passes (console + overflow at 420/800/
  desktop, cdp-features 13/13, cdp-create 13/13).
- Remaining ideas: none in scope. Possible future work: lightbox/progress demos,
  additional auth variants, or a build pipeline (not requested).

## Current gaps / notes
- `index.html`/`analytics.html` charts rely on `__chartInit` + `refreshCharts()`.
- `charts.html` has 15 Chart.js canvases; `visuals.html` uses SVG rings/counters
  (no Chart.js).
- Wave-2 browser pass: **DONE via CDP harness** (console/exception capture +
  geometry/overflow scans) on all 9 pages at 420/800/desktop widths — no JS
  errors, no page-level horizontal overflow. Fixes made during the pass:
  * calendar.html: `.cal-grid` tracks are `repeat(7, minmax(0, 1fr))` + cells
    `min-width:0; overflow:hidden` (1fr tracks were floor-locked to cell
    min-content ~133px → overflow); head cells get ellipsis.
  * Wide tables (crm/ecommerce/file-manager + shared records/tables/analytics):
    `.card:has(.data-table) { overflow-x: auto; }` + `#fm-list { overflow-x: auto; }`
    so tables scroll in-card instead of blowing out the page.
- **CDP harnesses** (Temp\opencode\cdp-check.cjs = console/exception + init-state
  capture, cdp-icon.cjs = geometry/overflow scan at emulated widths, cdp-layout.cjs
  = geometry, cdp-shot.cjs = screenshot). Run with a file:// URL arg; Chrome at
  `C:\Program Files\Google\Chrome\Application\chrome.exe`.
- Notification panel / quick search / scroll-to-top / loading-overlay demos:
  **DONE — all JS/CSS-injected in app.js/app.css (no per-page markup edits) so
  they apply to all 32 pages automatically.**
  * Loading overlay: first page load per session (sessionStorage
    `grid_admin_loaded`), 6-dot accent loader, fades in 300ms + removes at 900ms.
  * Scroll-to-top: fixed round accent button bottom-right, appears past 400px.
  * Quick search: Ctrl+K, `/`, or focusing the toolbar `#global-search` opens a
    palette indexing sidebar `.side-link` pages; ↑↓/Enter/Esc, empty state.
  * Notifications: injected `Mark all as read` row; clicking a notif marks it
    read (dim + strikethrough via `.notif.read`); `.ping` badge counts unread
    and hides at 0. Verified: Temp\opencode\cdp-features.cjs — 13/13 PASS.
- **CDP shell-feature harness:** Temp\opencode\cdp-features.cjs (functional
  checks for the above four features; port 9223).
- **Create page (`create.html`):** built from `_pages/create.frag` + `.js`
  (regenerate with gen-shell). Uses the `__pageInit` hook and calls the shared
  app.js theme fns (applyThemeColor/setRadius/applyAppearance/setCompact/
  setBoxed/setFontSize) so the live preview restyles via the same CSS vars.
  NOTE: applying a preset writes those prefs to localStorage (that's the app's
  own theme persistence, not a bug). Boot defaults are radius 8px / font 14px
  (matches app.css `--radius: 8px`); body defaults to `data-bs-theme="dark"`.
  Verified by Temp\opencode\cdp-create.cjs (13/13; run with a FRESH profile —
  it uses `--user-data-dir=…cdp-create-<Date.now()>`; stale profiles will show
  persisted prefs instead of defaults).
- Sidebar "Create" link (fa-cubes) added to app-shell.tmpl + all 24 shell
  pages; index.html got it via edit (its Dashboard link is `side-link active`).
  Re-running gen-shell regenerates the 10 fragment pages with the link.

## Rename: Gridline → Superbyte (DONE)
- Brand text/npm/email/CodeMirror theme (`.cm-s-gridline` → `.cm-s-superbyte`)
  replaced across all 33 pages, templates, fragments, app.js/app.css,
  vendor/fonts css, SESSION.md via Temp\opencode\rename-brand.cjs (48 files).
- Preset command is now `npx superbyte@latest init --preset "…"` (cdp-create.cjs
  assertion updated). Physical folder `gridline-admin` was NOT renamed.
- gen-shell.cjs / gen-auth.cjs / fetch-fonts.cjs brand strings updated so future
  regenerations keep Superbyte; harness ROOT paths still point at the real folder.

## Theme flash fix: head bootstrap (DONE)
- Problem: prefs (accent/radius/font/fontsize/appearance/base-theme) were applied
  by app.js at end of <body> → page painted default theme first.
- Fix: inline `<script>` in <head> (marker `<!-- sb-theme-bootstrap -->`) that
  reads localStorage synchronously and pre-applies: html-level `--accent/
  --accent-h/--bs-primary/--bs-primary-rgb`, `--sans`, radius vars, `fontSize`,
  then on body creation (MutationObserver on document) sets `data-bs-theme`,
  `data-base-theme`, layout-compact/boxed classes and body-level accent vars
  (accent-bg respects light `.08`/dark `.12`).
- Data is generated from app.js THEMES/FONTS (Temp\opencode\inject-theme-bootstrap.cjs)
  so it can't drift. Injected into all 33 HTMLs + app-shell.tmpl + auth.html.tmpl.
  Idempotent: `indexOf(MARK)` skip; `replaceBlock` swaps the old script in-place.
- CAUTION: `inject()` uses the FIRST `</head>` (editors.html contains a literal
  `</head>` inside its CodeMirror demo string — lastIndexOf corrupted it once).
- Verified by Temp\opencode\cdp-bootstrap.cjs (18/18, port 9227): html-level
  accent set pre-body, probe observer sees accent at body insertion, light/
  stone/spacegrotesk/14px/15px/compact/boxed all restored, defaults intact, 0
  console/network/exception errors.

## Random theme lab (DONE earlier this session)
- create.html now = shadcn-style random theme generator: 17 base colors
  (THEMES in app.js) + 7 base palettes (BASE_THEMES: neutral/stone/zinc/mauve/
  olive/mist/taupe via body `data-base-theme` + CSS `[data-bs-theme][data-base-
  theme=…]` overrides) + 17 fonts (16 vendored locally in vendor/fonts/theme-*.woff2
  + theme-fonts.css; FONTS map in app.js; `--sans` on body). #create-random
  (fa-shuffle) randomizes all fields avoiding the current value + flips appearance.
- Preset token = 8 fields: color-baseTheme-font-style-radius-appearance-layout-
  fontSize; default `indigo-neutral-ubuntu-default-8-dark-roomy-14`; URL carries
  `?preset=…`; command `npx superbyte@latest init --preset "<token>"`.
- Base-color swatches on create page are compact: `#create-swatches` = 8-column
  grid (app.css ~1143). The customizer panel keeps the 4-col `.swatch-grid`.
- localStorage keys in play: grid_admin_theme (appearance), grid_admin_accent,
  grid_admin_basetheme, grid_admin_font, grid_admin_radius, grid_admin_compact,
  grid_admin_boxed, grid_admin_fontsize. The head bootstrap + restorePrefs both
  read these.

## Sidebar sub-menus (DONE)
- Nav is now grouped & collapsible: each `nav-group-label` + its side-links were
  transformed into `.side-group` (`.side-group-toggle` with `fa-chevron-down .sg-chev`
  + `.side-submenu`) by Temp\opencode\submenus.cjs. Group icons: General fa-gauge-high,
  Data fa-database, Components fa-puzzle-piece, Visuals fa-chart-pie, Apps
  fa-table-cells-large, Pages fa-file-lines, Docs fa-book.
- app.css: `.side-group-toggle` / `.side-submenu` styles; app.js: click+keyboard
  toggle (`.open` flips `aria-expanded` + rotates chevron), active link's group
  auto-opens on load. All 25 shell navs stay byte-identical (nav-consistency.cjs).
- Recovery note: first run's regex `^<a class="side-link"` dropped every active
  link (`side-link active`). Fixed via Temp\opencode\fix-submenus.cjs (reverse
  transform → re-insert self-link active from canonical template nav → re-apply
  with prefix-match regex). Keep `^<a class="side-link` (no trailing quote).

## All-components page (DONE)
- New static page `all-components.html` = complete Bootstrap 5.3 catalog, 25
  component types: accordion, alerts, badges, breadcrumb, buttons, button group,
  card, carousel, collapse, dropdowns, forms, input group, list group, modal,
  navs & tabs, navbar, offcanvas, pagination, placeholders, popovers, progress,
  scrollspy, spinners, toasts, tooltips. Built by
  Temp\opencode\build-all-components.cjs from a components.html copy +
  Temp\opencode\all-components-section.html fragment; nav link inserted into all
  shell pages + tmpl (Components group, fa-boxes-stacked).
- Interactions are data-attribute only (bootstrap.bundle.min.js); tooltips/
  popovers/toasts reuse app.js (auto init + showToast). Demo modal + offcanvas
  targets live at the end of the section.
- The static toast demo needs `style="width:100%;max-width:320px"` or the default
  `.toast` 350px width overflows at 320px viewport.
- Verified: Temp\opencode\cdp-all-components.cjs (13 checks: group auto-open,
  active self-link, accordion/tabs/carousel/modal/offcanvas/popover/tooltip/toast/
  dropdown, 0 console errors) + Temp\opencode\sweep-all-components.cjs (320/420/
  800/1440 no overflow). Regression suite green: verify.cjs, smoke.cjs,
  cdp-submenu.cjs, cdp-sweep.cjs.

## Font Awesome → HugeIcons migration (DONE)
- All 2,618 Font Awesome icon tokens across 58 non-vendor files (.html/.js/.tmpl/
  .frag) replaced with HugeIcons Stroke-Rounded classes; 36 stylesheet links
  swapped from `vendor/font-awesome/css/all.min.css` to
  `vendor/hugeicons/css/hugeicons.css`. 0 leftover `fa-*`/`fas/far/fab` project-wide.
- Vendored assets: `vendor/hugeicons/font/hgi-stroke-rounded.{woff2,woff,ttf}` +
  generated `vendor/hugeicons/css/hugeicons.css` (5,502 icon rules, local `../font/`
  refs, zero CDN). Free-tier icon names from `Temp\opencode\hgi-icon-names.txt`.
- Map: 209 FA classes → HGI names at `Temp\opencode\fa-hgi-map.json` (validated
  vs token usage, 0 missing). Migration driver `Temp\opencode\apply-hgi.cjs`
  (replaces `fas|far|fab` + `fa-<name>` via map; do NOT let it match bare `fa`).
  Pre-migration backups of all 58 files at `Temp\opencode\fa-backup\`.
- CSS tweaks: `.hgi-spin` (app.css, spin keyframes) replaces `fa-spin`; added
  `vertical-align:-0.125em` to `.hgi-stroke` in hugeicons.css. app.js now queries
  `.hgi-notification-01`; generator tooling (Temp\opencode\*) regenerates HGI.
- CAUTION: hugeicons.css is ~1 MB / 22k lines — loads slower than all.min.css and
  makes CDP overflow scans racy on first paint (see next section).

## Horizontal-overflow fix: html overflow-x (DONE)
- `sweep-all-components.cjs` went flaky post-migration (offcanvas demo panels
  contributed ~280px to `scrollWidth` for the first ~100-200 ms of load, so the
  1800 ms measurement sometimes caught it). The transient is NOT an icon problem:
  it reproduces byte-identically with all.min.css and with no icon CSS; it is a
  first-render quirk where the off-canvas (fixed, `visibility:hidden`,
  translateX(100%)) counts toward `documentElement.scrollWidth` until the
  viewport starts clipping.
- Fix: `html, body { … overflow-x: hidden; }` in `assets/css/app.css` (~line 87).
  `html` clipping makes the viewport clip fixed off-canvas overflow from the very
  first frame (verified: sw=cw from t=0). Card/data-table pages still scroll
  horizontally inside `.card:has(.data-table)` — unaffected.

## create.html "theme resets to default" bug (DONE)
- Symptom: visiting `create.html` (plain or `?preset=…`) clobbered the saved theme
  to defaults and leaked it to every other page.
- Root cause 1: `readState()` in create.html read `window.activeThemeKey` /
  `activeBaseTheme` / `activeFont`, but those are script-scoped `let` vars in
  app.js — never on `window` (verified via CDP: always `undefined`). So cfg fell
  back to defaults and `applyCfg()` re-persisted them (probe: saved teal →
  storage became indigo/neutral/ubuntu on a single plain visit; the head-bootstrap
  DOMContentLoaded applyBody then re-applied the saved theme over the clobber, so
  the UI showed teal while storage said indigo).
- Root cause 2: a `?preset=…` URL ran `parseToken()` then `applyCfg()`, which
  PERSISTED the preset values into localStorage (probe: preset
  `indigo-…-14-dark-compact-17` overwrote accent/base/font/radius/compact/fs/theme).
- Fix (create.html only):
  - `readState()` now reads the applied theme from the DOM: body inline `--accent`
    → match to THEMES key, `data-base-theme`, `--sans` → FONT_MAP key, `--radius`,
    `data-bs-theme`, body classes, html font-size.
  - `__pageInit()`: when a `?preset=` param is present, apply it as a PREVIEW only
    — snapshot the 8 `grid_admin_*` keys, `applyCfg()`, then restore the snapshot
    so nothing persists.
  - Head bootstrap: parse `?preset=` (color/base/font/radius/appearance/layout/fs)
    into the theme map so the preset actually renders (previously applyBody at
    DOMContentLoaded re-applied the saved theme over the preview).
- Verified via CDP probe (saved light/teal/mist/manrope):
  - plain visit: applied = saved, storage untouched;
  - `?preset=indigo-…` visit: preset previews (indigo/dark/compact/17) but storage
    untouched;
  - index.html after: still saved theme, no leak.
- No JS console/exception errors on create.html (both with and without the preset
  URL).

## Next Move
- No open work. Full regression suite re-run green AFTER the create.html fix:
  verify.cjs (ALL CHECKS PASSED, 0 external refs), smoke.cjs (10/10),
  nav-consistency.cjs (26 pages/1 variant), cdp-submenu.cjs (9/9),
  cdp-all-components.cjs (13/13), sweep-all-components.cjs (4 widths),
  cdp-sweep.cjs (12 pages × 3 widths clean), cdp-hgi-check.cjs
  (fontsLoaded, emptyGlyphs:0; "missing" list is the known file:// cssRules
  cross-origin artifact).
- Optional pending (low): re-run cdp-hgi-check.cjs icon sanity on a clean profile.
