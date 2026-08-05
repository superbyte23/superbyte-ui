<div align="center">

# Superbyte UI

**A free, open-source admin dashboard & UI kit — built with Bootstrap 5, HTML, CSS, and vanilla JavaScript.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#license)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Static](https://img.shields.io/badge/pages-static-lightgrey)
![No Build Step](https://img.shields.io/badge/build-none%20required-brightgreen)

[Live Demo](https://superbyte23.github.io/superbyte-ui/) · [Report a Bug](https://github.com/superbyte23/superbyte-ui/issues) · [Request a Feature](https://github.com/superbyte23/superbyte-ui/issues)

</div>

---

## Table of Contents

- [About](#about)
- [Why This Project Exists](#why-this-project-exists)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Page Coverage](#page-coverage)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Theme Customization](#theme-customization)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## About

Superbyte UI is a static, front-end-only admin dashboard template. There's no build pipeline, no `npm install`, and no backend required — clone it, open a page, and it works.

The repository is split in two: the root `index.html` is a landing page that introduces the kit, and the full admin dashboard (47 ready-to-use pages) lives under `preview/`. It ships with dashboard analytics, CRUD-style data views, CRM and e-commerce workflows, forms, charts, maps, editors, authentication screens, and a large library of reusable UI components — everything you need to skip the "download a template and hope it has what you need" problem.

## Why This Project Exists

Most free admin templates give you a nice-looking dashboard page and stop there — missing the file manager, the kanban board, or half the components a real project needs. Superbyte UI was built to be the opposite: a complete, no-compromise starting point for internal tools, client portals, and admin panels, with:

- Consistent visual structure across every page
- Rich, ready-made pages for common admin use cases
- Zero external CDN dependencies — everything is vendored locally
- Offline-friendly asset delivery
- Easy customization by editing plain HTML, CSS, and JS

## Features

- **App shell** — fixed sidebar, top toolbar, global search, notifications, and user profile dropdown
- **Layout modes** — vertical, horizontal, mini-sidebar navigation × fluid, boxed (Bootstrap container grid), contained content width, plus condensed/comfy density, all persisted via `localStorage` and switchable from any page
- **Theme customizer** — light/dark mode, accent colors, border radius, font family and size, all persisted via `localStorage`
- **Full page coverage** — see [Page Coverage](#page-coverage) below
- **Reusable components** — buttons, badges, cards, alerts, modals, tabs, tables, and more
- **No build step** — just static files, servable anywhere

## Tech Stack

**Core**
- HTML5, CSS3, Vanilla JavaScript
- Bootstrap 5.3.3

**UI & Charting Libraries**
- Bootstrap Icons
- HugeIcons
- Chart.js
- ECharts
- Leaflet
- Quill
- CodeMirror

All dependencies are vendored locally under `vendor/` — no external CDN calls.

## Page Coverage

| Category | Pages |
|---|---|
| General | Dashboard, Create, Analytics |
| Data | Records, Users |
| Components | Forms, Buttons & Badges, Cards & Alerts, Modals & Tabs, Utilities, Icons, Layouts, Components, All Components |
| Visuals | Tables, Charts, Widgets, Maps, ECharts, Editors |
| Apps | CRM, E-commerce, Calendar, Kanban, Email, File Manager |
| Layout | Layout hub + 11 preset pages (vertical, horizontal, mini-sidebar × fluid, boxed, contained, plus condensed & comfy) |
| Auth | Login, Register, Forgot/Reset Password, Lock Screen, Verify Email, Two-Factor Auth, Session Expired |
| Other | RTL Preview, Docs |

## Project Structure

```text
.
├── index.html                 # Landing page about the UI kit
├── assets/
│   ├── css/app.css            # Shared design system and layout styles
│   ├── css/layout-modes.css   # Layout mode / frame styles
│   ├── css/landing.css        # Landing page styles
│   ├── js/app.js              # Shared shell behavior, theme, and utilities
│   ├── js/theme-bootstrap.js  # Pre-paint theme + layout bootstrap
│   ├── js/datatable.js        # SuperDataTable — dependency-free DataTable lib
│   ├── js/auth.js             # Auth-related shared logic
│   └── js/icons-data.js       # Icon library data
├── vendor/                    # Vendored local libraries and assets
├── preview/                   # The admin dashboard (48 pages)
│   ├── index.html             # Main dashboard page
│   ├── analytics.html         # Analytics page
│   ├── records.html           # Records listing page
│   ├── users.html             # Users management page
│   ├── forms.html             # Forms examples
│   ├── components.html        # Component gallery
│   ├── all-components.html    # Full component showcase
│   ├── elements.html          # Buttons and badges
│   ├── cards.html             # Cards and alerts
│   ├── overlays.html          # Modals and tabs
│   ├── utilities.html         # Utility classes
│   ├── icons.html             # Icon library preview
│   ├── layouts.html           # Layout mode hub page
│   ├── charts.html            # Chart demos
│   ├── visuals.html           # Widgets / visual blocks
│   ├── maps.html              # Map page using Leaflet
│   ├── echarts.html           # ECharts examples
│   ├── editors.html           # Rich text / code editor demos
│   ├── crm.html               # CRM workflow page
│   ├── ecommerce.html         # E-commerce page
│   ├── calendar.html          # Calendar demo
│   ├── kanban.html            # Kanban board page
│   ├── email.html             # Email UI demo
│   ├── file-manager.html      # File manager demo
│   ├── login.html             # Authentication page
│   ├── register.html          # Registration page
│   ├── forgot.html            # Password recovery page
│   ├── reset.html             # Reset password page
│   ├── lock.html              # Lock screen page
│   ├── verify.html            # Email verification page
│   ├── two-factor.html        # Two-factor auth page
│   ├── session-expired.html   # Session expired page
│   ├── rtl.html               # RTL preview page
│   ├── create.html            # Preset/theme generator page
│   ├── docs.html              # Documentation page
│   └── layout-*.html          # 11 layout preset pages (one per mode/combo)
├── _pages/                    # Page fragments and page-specific scripts
├── app-shell.tmpl             # Shared shell template source
├── auth.html.tmpl             # Auth page template source
├── package.json               # Minimal project metadata
└── SESSION.md                 # Session/implementation handoff notes
```

## Getting Started

Because the project is fully static, you can run it with any local server.

**Option 1 — VS Code Live Server**
1. Open the project folder in VS Code.
2. Open `index.html` (the landing page).
3. Run it with the Live Server extension or live preview.

**Option 2 — Python**
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000/` for the landing page, or `http://localhost:8000/preview/` to go straight into the dashboard.

**Option 3 — Any static server**
`npx serve`, `php -S`, or anything that serves a static file set will work.

## Theme Customization

The built-in theme drawer lets you adjust, all persisted via `localStorage`:

- Light / dark appearance
- Accent color palettes
- Border radius
- Font family and size
- Compact vs. roomy layout density
- Content width: fluid, boxed (Bootstrap container grid — 540px @sm, 720px @md, 960px @lg, 1140px @xl, 1320px @xxl), or contained
- Navigation frame: vertical sidebar, horizontal top nav, or mini-sidebar rail

For deeper customization, the shared styles and behavior live in `assets/css/app.css` and `assets/js/app.js`.

## Roadmap

- [x] Static HTML/CSS/JS release
- [ ] Framework support (component-based versions for modern JS frameworks)
- [ ] Expanded component library
- [ ] Additional themes/presets

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the [issues page](https://github.com/superbyte23/superbyte-ui/issues) or open a pull request.

## License

Distributed under the MIT License. Free to use, modify, and build on for personal and commercial projects.

---

<div align="center">

Built by [John Canete](https://github.com/superbyte23)

</div>
