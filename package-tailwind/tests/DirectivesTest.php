<?php

use Illuminate\Support\Facades\Blade;

it('renders the pre-paint appearance script', function () {
    $html = Blade::render('@sbAppearance');

    expect($html)->toContain('<script data-sb-appearance>');
    expect($html)->toContain('window.SuperbyteUiPrefs');
    expect($html)->toContain('data-sb-pre-paint');
    expect($html)->toContain('grid_admin_theme');
    expect($html)->toContain('prefers-color-scheme');
    expect($html)->toContain('localStorage');
});

it('honours the configured theme key', function () {
    config()->set('superbyte-ui.appearance.theme_key', 'acme_theme');

    $html = Blade::render('@sbAppearance');

    expect($html)->toContain('"key":"acme_theme"');
    expect($html)->not->toContain('"key":"grid_admin_theme"');
});

it('renders the configured default theme into the prefs', function () {
    config()->set('superbyte-ui.appearance.default_theme', 'system');

    $html = Blade::render('@sbAppearance');

    expect($html)->toContain('"theme":"system"');
});

it('renders inline static tokens by default', function () {
    $html = Blade::render('@sbStyles');

    expect($html)->toContain('<style data-sb-styles>');
    expect($html)->toContain('--accent');
    expect($html)->toContain('--text');
    expect($html)->not->toContain('@theme');
});

it('renders inline scripts by default', function () {
    $html = Blade::render('@sbScripts');

    expect($html)->toContain('<script data-sb-scripts>');
    expect($html)->toContain('SuperbyteUi');
    expect($html)->toContain('grid_admin_theme');
    expect($html)->toContain('showToast');
});

it('renders published asset links when inline is disabled', function () {
    config()->set('superbyte-ui.assets.inline', false);

    $styles = Blade::render('@sbStyles');
    expect($styles)->toContain('vendor/superbyte-ui/superbyte.css');

    $scripts = Blade::render('@sbScripts');
    expect($scripts)->toContain('vendor/superbyte-ui/superbyte.js');
});
