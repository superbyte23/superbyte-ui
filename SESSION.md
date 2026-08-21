# Session Handoff — superbyte-ui

## Project
- **Superbyte UI** is an admin-dashboard UI library with two editions + a Livewire package:
  1. **Bootstrap edition** — `package-bootstrap/` + static demo in `preview/` (48 HTML pages). Original design.
  2. **Tailwind edition** — `package-tailwind/` (Blade components + `resources/js/superbyte.js` runtime + Tailwind v4 CSS). Created by following the Bootstrap design patterns but is its own source of truth.
  3. **Demo app** — `laravel-livewire-app/` is a Laravel 13 + Livewire **v4.3.5** app that renders `package-tailwind/` views live via a Composer path repo (symlink).
- Repo layout (consolidated 2026-08-09): root = Bootstrap HTML edition; `superbyte-ui-tailwind/` = Tailwind HTML edition (the package's design-pattern reference); `superbyte-ui-react/` = React edition; `package-bootstrap/` + `package-tailwind/` = the two Laravel/Livewire kits; `laravel-livewire-app/` = the demo app (was `demo-app/`).
- Version **1.0.0**; footer badge `v1.0.0` on all pages. Do not bump without being asked.
- **Everything vendored locally under `vendor/`** in preview; the demo app uses `@vite` (hashed local build) — zero CDN/network loads.

## Running / verifying
- laravel-livewire-app dev server: `http://127.0.0.1:8099` (Laravel `php artisan serve`).
- Static preview server (dev harness): port **8765**.
- Syntax check: `node --check assets/js/app.js assets/js/theme-bootstrap.js assets/js/auth.js assets/js/datatable.js`
- Full integrity check: `node C:\Users\Windows\AppData\Local\Temp\opencode\verify.cjs` (parses every inline script, resolves local refs, asserts zero CDN refs — 50 pages, must end `ALL CHECKS PASSED`).
- Headless browser probes live in `C:\Users\Windows\AppData\Local\Temp\opencode\` (CDP against Chrome; each probe uses its own debug port + `--user-data-dir`). **PowerShell corrupts inline backtick JS on `node -e` — always write probe files.**
  - `cdp_final.js` (port 9265): theme toggle + SPA home↔/docs↔/docs/buttons + TOC + console errors.
  - `cdp_realclick.js` (port 9264): real mouse-click SPA (docs link).
  - `cdp_brand.js` (port 9266): brand-logo SPA click.
  - `cdp_primary.js` (port 9251): dark/light primary-button colors.
- Rebuild laravel-livewire-app front-end after package CSS/JS changes: `npm run build` in `laravel-livewire-app/` (outputs hashed `app-*.css` / `app-*.js`).
- Re-publish package CSS: `vendor:publish --tag=superbyte-ui-css --force` from `laravel-livewire-app/`.

## Conventions & pitfalls (condensed; see AGENTS.md)
- **Pre-paint is mandatory**: `theme-bootstrap.js` (static) / `@sbAppearance` (package) applies theme+layout before first paint; `app.js` early-apply syncs from `<body>` classes. Both files LF.
- **SPA (Livewire v4, done 2026-08-09)**: canonical v4 pattern — **per-link `wire:navigate`** (NOT body-level), `data-navigate-once` on once-only inline scripts, `@livewireScripts`/`@livewireStyles` present, Vite assets get `data-navigate-track="reload"` automatically. v4 full-reloads only if a tracked asset's query string changes. Livewire v4's own test views (`vendor/livewire/livewire/src/Features/SupportNavigate/test-views/`) never use body-level; they use per-link + `@persist` + `data-navigate-once`.
- `.light`/`:root` token blocks must stay in sync; boxed-width token overrides must repeat `:root, [data-bs-theme="dark"]`.
- `html, body { overflow-x: hidden; overflow-x: clip; }` both declarations required (sticky depends on clip fallback).
- Fixes go in the **package source** (`package-tailwind/`); laravel-livewire-app renders it live. Do NOT touch `package-bootstrap/`. Record every fix in `DEV_PLAN.md` §16.
- Never commit `session-ses_03f8.md` (was deleted; do not restore it).
- Icons are HugeIcons (`hgi-stroke hgi-<name>`), vendored full set. No Font Awesome.

## Work State

### Completed (recent)
- **Accordion added to the Tailwind HTML edition** (`superbyte-ui-tailwind/`) — markup in `src/pages/all-components.html` (3-item demo card in the catalog, first item open), behavior in `src/js/components.js` (`initAccordions()`: click toggles `.open` on the `.accordion-item`, mutually exclusive per `.accordion` group, `aria-expanded` kept in sync; registered in `initComponents()`). CSS already existed in `src/styles/app.css` (`.accordion-item`/`.accordion-button .chev`/`.accordion-body`). Verified headless via Vite dev (`npm run dev`, port 8765): open states `[T,F,F] → [F,T,F] → [T,F,F] → [F,T,F]`, 3 chevron SVGs rendered, `npm run check` ALL CHECKS PASSED. Next step per the pipeline: port to `package-tailwind/` as an `sb:accordion` Blade component.
- **Dark-theme accent inversion**: dark = ivory accent `#F2F0EA`/hover `#E5E2DA` with charcoal `#18181b` text; fixed `.light` missing `--accent-text`, `.btn-soft:hover`, on-tint borders, `::selection`, checkbox/switch knob. Verified via `cdp_primary.js`. Logged in DEV_PLAN.md §16.
- **Top bar rework** (welcome + docs layouts): profile dropdown removed; icon-only square theme toggle (moon/sun swap via `html.dark .icon-theme-sun{display:none}` / `html.light .icon-theme-moon{display:none}`); nav right-aligned; welcome search/bell removed; brand = `<img src="{{ asset('img/brand.png') }}" class="h-8 w-auto">`; welcome width `max-w-screen-2xl`.
- **Getting started docs section**: 5 new pages (introduction, installation, theming, dark-mode, patterns) + routes + sidebar `$sections` array.
- **Livewire v4 SPA adopted** (see conventions): per-link `wire:navigate`, `data-navigate-once` on `@sbScripts`/`@sbAppearance`/copy-handler, duplicate Alpine removed from `resources/js/app.js` (now comment-only — Livewire bundles Alpine; re-importing Alpine would re-trigger "multiple instances" errors). Verified: 0 console errors, SPA across all nav links including brand.
- **Docs sidebar inventory** (`laravel-livewire-app/resources/views/layouts/docs.blade.php`): Components section lists all 28 package components as inert muted spans (no routing); **Utilities** section added with **Colors** moved into it. Getting-started + Overview/Buttons/Colors remain routed links.

### Package component inventory (28 top-level)
alert, avatar, badge, brand, button, card, checkbox, description, dropdown, error, field, file-upload, heading, icon, input, kbd, label, modal, radio, select, separator, skeleton, spinner, switch, text, textarea, toast, tooltip.
Sub-components: `button.group`, `card.header`, `card.footer`, `checkbox.group`, `radio.group`.

### Identified gaps (analysis, not yet implemented)
- Parity signals from the Bootstrap edition's `all-components.html` (design-pattern reference only — NOT a hard inventory to match): Accordion, Breadcrumb, Carousel, Collapse, Input group, List group, Navs & tabs, Navbar, Offcanvas, Pagination, Placeholders, Popovers, Progress, Scrollspy.
- Recommended additions for the Tailwind package (admin-dashboard critical): **Table/DataTable** (top priority — preview has `datatables.html` + `SuperDataTable.js`, Tailwind edition has nothing), **Tabs**, **Accordion**, **Input group** (or `leading`/`trailing` on Input), **Breadcrumb**, **Pagination**, **Progress**, **Drawer/Offcanvas**, then form-y ones: Combobox, Date picker, Slider, Stepper, Segmented control, Empty state, Stat/KPI card.
- Docs only build out Buttons + Colors so far; 26 components have no docs page.

### Active / Open threads
- **User is organizing/consolidating all project files into `D:\superbyte-ui\`** — the Tailwind HTML reference version (currently outside the folder) will be moved in. When it arrives, use it as the authoritative inventory source for the Tailwind package.
- User asked for the component-gap analysis (done, above). Next decision pending: implement new components in `package-tailwind/` vs. just extend the docs sidebar list.

## Next Move (when work resumes)
1. After the Tailwind HTML version is merged into the repo, audit `package-tailwind/resources/views/components/` against it and reconcile the docs sidebar inventory.
2. Decide + implement the top missing components (DataTable first) as Blade components + CSS, with docs pages using the `x-docs.demo` pattern.
3. Re-run `verify.cjs` + a CDP probe after any change; log fixes in DEV_PLAN.md §16.

## Relevant Files
- `laravel-livewire-app/resources/views/layouts/docs.blade.php` — sidebar `$sections`/`$components` arrays, per-link `wire:navigate`, TOC/copy scripts.
- `laravel-livewire-app/resources/views/welcome.blade.php` — landing, header nav, hero.
- `package-tailwind/src/Directives/SbScripts.php`, `SbAppearance.php` — inline scripts now `data-navigate-once`.
- `package-tailwind/resources/js/superbyte.js` — runtime; `bind()` + `livewire:navigated` listener; `__sbBound` guards.
- `package-tailwind/resources/css/tokens.css` + `tokens-static.css` — accent inversion work (keep in sync).
- `package-tailwind/resources/views/components/` — 28 Blade components.
- `laravel-livewire-app/routes/web.php` — docs routes.
- `DEV_PLAN.md` §16 — running fix log.
- Probe scripts: `C:\Users\Windows\AppData\Local\Temp\opencode\cdp_final.js` (9265), `cdp_realclick.js` (9264), `cdp_brand.js` (9266), `cdp_primary.js` (9251), `verify.cjs`.
