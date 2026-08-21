@extends('layouts.docs', ['title' => 'Installation — Component Docs'])

@section('content')
    <section id="requirements" class="scroll-mt-24" data-doc-section data-toc-title="Requirements">
        <sb:heading level="h1">Installation</sb:heading>
        <p class="mt-2 max-w-2xl text-ink-2">
            <code class="kbd">superbyte/ui-tailwind</code> requires <strong>Laravel 11+</strong> and
            <strong>Tailwind CSS v4</strong>. No other runtime dependency is required to render components;
            Livewire is pulled in automatically when you require the package.
        </p>
    </section>

    <section id="composer" class="scroll-mt-24" data-doc-section data-toc-title="Composer">
        <x-docs.demo title="Install via Composer"
            description="Require the package, then publish its CSS once." language="BASH">
            <div class="flex flex-wrap items-center gap-2">
                <code class="kbd">composer require superbyte/ui-tailwind</code>
                <code class="kbd">php artisan vendor:publish --tag=superbyte-ui-css</code>
            </div>
            <x-slot name="code">
@verbatim
composer require superbyte/ui-tailwind:@dev

# publish the package CSS once (fonts + tokens + components)
php artisan vendor:publish --tag=superbyte-ui-css --force
@endverbatim
            </x-slot>
        </x-docs.demo>
    </section>

    <section id="vite" class="scroll-mt-24" data-doc-section data-toc-title="Vite + CSS">
        <x-docs.demo title="Vite + CSS" description="Source the package CSS through the published copy." language="JS">
            <div class="flex flex-wrap items-center gap-2">
                <code class="kbd">resources/css/app.css</code>
                <code class="kbd">resources/js/app.js</code>
            </div>
            <x-slot name="code">
@verbatim
// resources/css/app.css
@import 'tailwindcss';
@import './vendor/superbyte-ui/superbyte-ui.css';

// vite.config.js
resolve: { alias: { '@superbyte-ui': './vendor/superbyte/ui-tailwind/resources' }, symlinks: false }

// resources/js/app.js
import Alpine from 'alpinejs';
window.Alpine = Alpine;
Alpine.start();
@endverbatim
            </x-slot>
        </x-docs.demo>
    </section>

    <section id="layout" class="scroll-mt-24" data-doc-section data-toc-title="Layout directives">
        <x-docs.demo title="Layout directives"
            description="Pre-paint theme script in <head>, then styles + runtime before </body>.">
            <x-slot name="code">
@verbatim
<head>
    @sbAppearance
    @sbStyles
    @vite(['resources/css/app.css'])
</head>
<body>
    ...
    @sbScripts
    @vite(['resources/js/app.js'])
</body>
@endverbatim
            </x-slot>
        </x-docs.demo>
    </section>
@endsection
