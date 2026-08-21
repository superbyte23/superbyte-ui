<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Component prefix
    |--------------------------------------------------------------------------
    |
    | The Blade anonymous-component prefix. Components are used as <sb:button>,
    | <sb:input>, <sb:card.header> and so on.
    |
    */

    'prefix' => 'sb',

    /*
    |--------------------------------------------------------------------------
    | Appearance (light / dark / system)
    |--------------------------------------------------------------------------
    |
    | Controls the pre-paint theme bootstrap emitted by @sbAppearance.
    | 'default_theme' may be 'light', 'dark' or 'system'. The chosen theme is
    | applied to <html> by toggling the class-based `dark` / `light` variant
    | (dark is the design system's default). Saved preferences are read from
    | localStorage using the same `grid_admin_*` keys as the standalone kit.
    |
    */

    'appearance' => [
        'theme_key' => 'grid_admin_theme',
        'default_theme' => 'dark',
    ],

    /*
    |--------------------------------------------------------------------------
    | Asset delivery
    |--------------------------------------------------------------------------
    |
    | Tailwind CSS v4 compiles at build time, so the design system ships as
    | source CSS for your own Tailwind/Vite build (see README — add an
    | `@import` of `resources/css/superbyte-ui.css` to your entry stylesheet).
    |
    | The directives still work as a runtime bootstrap:
    |   - @sbAppearance  pre-paint script (theme prefs applied before first paint)
    |   - @sbStyles      design tokens + fonts inline by default
    |   - @sbScripts     theme engine + component behaviors inline by default
    |
    | When 'inline' is false, @sbStyles / @sbScripts emit links to the
    | published assets instead (php artisan vendor:publish --tag=superbyte-ui-assets).
    |
    */

    'assets' => [
        'inline' => true,
    ],

];
