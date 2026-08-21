# Superbyte UI (Tailwind CSS v4)

A hand-crafted, zero-dependency UI component library for Laravel + Livewire, **built on
Tailwind CSS v4** and the superbyte design system. Blade anonymous components,
Tailwind utility classes, and theme-token design variables. Ships source CSS that plugs
into your own Tailwind/Vite build — no CDN, no separate build step for the package.

```blade
<sb:button variant="primary" icon="plus">Save</sb:button>
```

## Requirements

- PHP 8.3+
- Laravel 11 / 12 / 13
- Livewire 4 (for `wire:model` / validation features)
- A Tailwind CSS v4 build (Vite + `@tailwindcss/vite`, or PostCSS + `@tailwindcss/postcss`)
- Tailwind is **not** shipped by the package — it is the consuming app's build tool

## Installation

```bash
composer require superbyte/ui-tailwind
```

The service provider is auto-discovered. If your app does not use package discovery,
register `SuperbyteUi\SuperbyteUiServiceProvider` in `bootstrap/providers.php`.

## Setup

### 1. Import the source CSS

Add the design system to your Tailwind entry stylesheet (e.g. `resources/css/app.css`):

```css
@import "tailwindcss";
@import "../../vendor/superbyte/ui-tailwind/resources/css/superbyte-ui.css";
```

Prefer a Vite alias so the import stays short:

```js
// vite.config.js
resolve: { alias: { '@superbyte-ui': 'vendor/superbyte/ui-tailwind/resources' } },
```

```css
@import "tailwindcss";
@import "@superbyte-ui/css/superbyte-ui.css";
```

The imported file contains the design tokens (`@theme` / `@theme inline`), the `dark`
custom variant, component classes, and the self-hosted font faces. Because it is source
CSS, Tailwind scans it at build time and only ships what is used. If you import the
package's CSS instead of building it, you must also include the tokens CSS for browsers —
see `@sbStyles` below.

### 2. Bootstrap the layout

```blade
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My App</title>

    @vite(['resources/css/app.css'])

    @sbAppearance
    @sbStyles
    @sbScripts
</head>
<body>
    <sb:heading level="h1">Welcome</sb:heading>

    <sb:input wire:model="email" type="email" label="Email" />
    <sb:button type="submit">Save</sb:button>
</body>
</html>
```

## Directives

### `@sbAppearance`

Emits the pre-paint theme bootstrap — a small inline script that applies the saved theme
before first paint by toggling the `dark` / `light` class on `<html>` (no FOUC, no
scroll jump). Preferences are read from `localStorage` using the `grid_admin_*` keys the
standalone kit uses. Defaults are configurable:

```php
// config/superbyte-ui.php
'appearance' => [
    'theme_key' => 'grid_admin_theme', // default
    'default_theme' => 'dark',         // light | dark | system
],
```

### `@sbStyles`

Emits the design tokens (`tokens-static.css`) plus the self-hosted font faces, inlined by
default so the theme renders correctly even before your built CSS arrives. When
`assets.inline` is `false`, emits links to the published assets instead:

```bash
php artisan vendor:publish --tag=superbyte-ui-assets
```

### `@sbScripts`

Emits the theme engine and component behaviors (modals, dropdowns, alert dismiss, file
uploads, toasts) as a single inline script. Same inlining behavior as `@sbStyles`, and it
re-binds on `livewire:navigated` / `turbo:render` navigation.

## Theming

Dark mode is class-based on `<html>` (`.dark` / `.light`), matching the Tailwind v4
`custom-variant` pattern the design system uses. Components reference semantic tokens
(`--bg`, `--surface`, `--text`, `--accent`, `--success`, `--danger`, …) so a single
class swap re-themes the whole app.

```js
// Toggle from JS
window.SuperbyteUi.setTheme('dark');
```

## The `sb:` prefix

Components are used with the `sb` prefix, rendered by the package's Blade tag compiler:

```blade
<sb:button>Save</sb:button>
<sb:card>
    <sb:card.header title="Settings" />
    <sb:card.footer><sb:button size="sm">Save</sb:button></sb:card.footer>
</sb:card>
```

Laravel's stock compiler only understands `x-` tags, so the package registers a custom
compiler as a Blade precompiler. The classic `x-sb::button` syntax also keeps working.
The prefix is configurable:

```php
// config/superbyte-ui.php
'prefix' => 'sb',
```

## Publishing overrides

```bash
# Publish config
php artisan vendor:publish --tag=superbyte-ui-config

# Publish component views (loaded before the package defaults)
php artisan vendor:publish --tag=superbyte-ui-views

# Publish CSS/JS assets (design tokens + fonts + runtime JS)
php artisan vendor:publish --tag=superbyte-ui-assets
```

## Development

Tests use Pest + Testbench and a small Livewire fixture:

```bash
composer install
vendor/bin/pest
```

The suite covers the class-merge helper (Tailwind conflict resolution, last wins),
attribute forwarding, every component's rendering, directive output, and Livewire
integration (wire:model forwarding, validation errors into `<sb:error>` + `.is-invalid`,
value persistence).

## Version

**0.1.0** — initial release. Tailwind CSS v4 edition; see `DEV_PLAN.md` (repo root) for the
roadmap.
