# Superbyte Admin

Superbyte Admin is a polished, static admin dashboard and management UI template built with Bootstrap 5, plain HTML, CSS, and vanilla JavaScript. The project ships as a collection of self-contained pages that can be opened directly in the browser or served locally with any lightweight web server.

It is designed to feel like a modern enterprise admin console with dashboard analytics, CRUD-style data views, CRM/ecommerce workflows, forms, charts, maps, editors, authentication screens, and reusable UI components.

## Overview

This repository is a front-end-only admin template rather than a full-stack application. It does not require a build pipeline, npm install, or a backend service to view the UI.

The project includes:

- A shared app shell with a fixed sidebar, top toolbar, notifications, theme controls, and global search
- Multiple standalone HTML pages for dashboard and admin workflows
- Vendored third-party assets under the local `vendor/` directory
- A customizable dark/light theme system with accent color, radius, font, compact, and boxed layout options
- LocalStorage-based theme persistence
- Support for tables, charts, maps, editors, file management, CRM, ecommerce, auth pages, and RTL preview

## Why this project exists

Superbyte Admin is intended as a fast, reusable starting point for building internal tools, client portals, or admin panels. Its emphasis is on:

- consistent visual structure
- rich starter pages for common admin use cases
- zero external CDN dependencies
- offline-friendly local asset delivery
- easy customization by editing HTML, CSS, and JavaScript directly

## Tech Stack

### Core technologies

- HTML5
- CSS3
- Vanilla JavaScript
- Bootstrap 5.3.3

### UI and charting libraries

- Bootstrap Icons
- Font Awesome
- HugeIcons
- Chart.js
- ECharts
- Leaflet
- Quill
- CodeMirror

### Asset strategy

All vendor dependencies are stored locally under the `vendor/` directory, and the project is intentionally designed to avoid external CDN assets.

## Project Structure

```text
.
├── index.html                 # Main dashboard page
├── analytics.html             # Analytics page
├── records.html               # Records listing page
├── users.html                 # Users management page
├── forms.html                 # Forms examples
├── components.html            # Component gallery
├── all-components.html        # Full component showcase
├── charts.html                # Chart demos
├── visuals.html               # Widgets / visual blocks
├── maps.html                  # Map page using Leaflet
├── echarts.html               # ECharts examples
├── editors.html               # Rich text / code editor demos
├── crm.html                   # CRM workflow page
├── ecommerce.html             # E-commerce page
├── calendar.html              # Calendar demo
├── kanban.html                # Kanban board page
├── email.html                 # Email UI demo
├── file-manager.html          # File manager demo
├── login.html                 # Authentication page
├── register.html              # Registration page
├── forgot.html                # Password recovery page
├── reset.html                 # Reset password page
├── lock.html                  # Lock screen page
├── verify.html                # Email verification page
├── two-factor.html            # Two-factor auth page
├── session-expired.html       # Session expired page
├── rtl.html                   # RTL preview page
├── create.html                # Preset/theme generator page
├── assets/
│   ├── css/app.css            # Shared design system and layout styles
│   ├── js/app.js              # Shared shell behavior, theme, and utilities
│   └── js/auth.js             # Auth-related shared logic
├── vendor/                    # Vendored local libraries and assets
├── _pages/                    # Page fragments and page-specific scripts
├── app-shell.tmpl             # Shared shell template source
├── auth.html.tmpl             # Auth page template source
├── package.json               # Minimal project metadata
└── SESSION.md                 # Session/implementation handoff notes
```

## Features

### Dashboard and app shell

The shared application shell provides:

- a left sidebar navigation system with grouped sections
- a top toolbar with quick actions and breadcrumb navigation
- a global search box
- notification dropdowns
- user profile dropdown
- theme customization drawer/offcanvas
- responsive layout behavior for smaller viewports

### Theme customization

The UI supports local theme preferences through browser `localStorage`, including:

- light/dark appearance
- accent color palettes
- base theme selection
- font family selection
- border radius adjustment
- compact and boxed layout modes
- font size scaling

This makes the dashboard feel significantly more flexible than a static mockup.

### Page coverage

The template includes a wide set of admin-oriented pages, including:

- Dashboard
- Analytics
- Records
- Users
- Forms
- Buttons and badges
- Cards and alerts
- Tables
- Charts
- Widgets
- Maps
- ECharts
- Editors
- CRM
- E-commerce
- Calendar
- Kanban
- Email
- File manager
- Authentication pages
- RTL preview
- Docs

## Running the Project

Because the project is static, you can run it with any local static server.

### Option 1: Live Server in VS Code

1. Open the project folder in VS Code.
2. Open any HTML page such as `index.html`.
3. Use the Live Server extension or the VS Code live preview workflow to serve the site locally.

### Option 2: Python HTTP server

From the project root:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

### Option 3: Any static server

You can use `npx serve`, `php -S`, or another static local server. The important part is that the project is served as a static file set.

## Development Notes

### No build step

This repository is intentionally lightweight:

- there is no frontend build pipeline
- there are no framework dependencies that require bundling
- there is no backend connection or API layer

That means you can customize the UI directly by editing the HTML, CSS, and JS files.

### Vendored assets

All externally used libraries are bundled locally under `vendor/`. This is a major design choice for portability and offline reliability.

### Local persistence

The dashboard uses `localStorage` for user preference persistence. This includes theme settings and layout control preferences.

## Customization Guide

### Changing the brand

The project currently uses the Superbyte branding throughout its pages and shared shell. If you want to personalize it further:

- update the visible brand text in the shell and page titles
- replace the favicon or logo styling
- adjust the accent colors in the theme system
- tune typography and spacing in `assets/css/app.css`

### Updating shared behavior

Most shared behavior is centralized in:

- `assets/js/app.js`
- `assets/css/app.css`

This is the best place to modify navigation behavior, theme persistence, toast handling, layout toggles, and other cross-page UI features.

### Updating page-specific content

Page-specific markup and logic are generally stored in the top-level HTML pages or in the `_pages/` fragment system.

## Browser and Runtime Expectations

This is a static HTML/CSS/JS project and is best viewed in modern desktop browsers. It is designed to work well with Chromium-based browsers and modern evergreen browsers in general.

## License

This project is currently marked with the ISC license in `package.json`.

## Summary

Superbyte Admin is a static, Bootstrap-based admin dashboard template with a large number of built-in pages, a consistent app shell, reusable styling, theme controls, and a no-build development workflow. It is especially well suited for:

- dashboard prototypes
- internal admin tools
- management consoles
- product demos
- UI starter kits

If you want a lightweight, visually polished admin UI template that can be served instantly, this repository is a strong starting point.
