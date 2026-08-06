# Superbyte UI — React port

React (Vite) port of the **Superbyte UI** admin dashboard. It consumes the
`superbyte-admin` npm package (this repo's root `assets/` + `vendor/`) directly
from `node_modules`.

## Stack

- Vite 8 + React 19 + plain JS (no TypeScript)
- `react-router-dom` v7 for routing
- All styles/JS come from `superbyte-admin` (local `file:..` dependency) — no
  CDN or external resources, same as the vanilla template.

## Run

```bash
npm install
npm run dev          # http://localhost:5173
```

`vite.config.js` sets `server.fs.allow: ['..']` because the `file:..`
dependency symlinks one level up.

## Build

```bash
npm run build        # dist/
npm run preview      # serve the production build
```

Note: `build.cssMinify` is forced to `'esbuild'` — Vite 8's LightningCSS minifier
chokes on `app.css` (`Unexpected token Semicolon`).

## What's implemented

- Core shell: sidebar, toolbar, footer, customizer off-canvas, quick search
  (Ctrl+K), modals, toasts, mobile off-canvas drawer + overlay.
- Theme system ported 1:1 from the vanilla template: same localStorage keys
  (`grid_admin_theme/accent/basetheme/font/radius/fontsize/compact/boxed`,
  `grid_admin_layout_mode`, `grid_admin_width_mode`), pre-paint script in
  `index.html` (port of `theme-bootstrap.js`), body-class/`data-bs-theme` sync in
  `src/theme/AppContext.jsx`.
- Pages: Dashboard (Chart.js from `superbyte-admin`), Tables (`SuperDataTable`
  client-side mode), Forms (Quill + CodeMirror from vendor), Components,
  Layouts (mirrors `preview/layout-*.html` presets), 404.
- Chart canvases re-render when theme/accent/radius/font-size change via
  `themeVars()`.

## Layout

```
index.html            pre-paint theme bootstrap + /favicon.svg
src/main.jsx          imports superbyte-admin CSS + JS bundle, AppProvider + router
src/App.jsx           routes + ScrollToTop
src/theme/            constants, AppContext (state + localStorage + body sync), themeVars
src/layout/           AppShell, Sidebar, Toolbar, Footer, Customizer, QuickSearch, Modals, ToastHost
src/components/       ChartCanvas, StatCard
src/pages/            Dashboard, Tables, Forms, Components, Layouts, NotFound
```
