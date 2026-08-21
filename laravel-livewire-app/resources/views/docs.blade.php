@extends('layouts.docs', ['title' => 'Component Docs'])

@section('content')
    {{-- Getting started --}}
    <section id="getting-started" class="scroll-mt-24" data-doc-section data-toc-title="Getting started">
        <sb:heading level="h1">Component docs</sb:heading>
        <p class="mt-2 max-w-2xl text-ink-2">
            The <code class="kbd">superbyte/ui-tailwind</code> package is wired into this app through a Composer
            <em>path repository</em>, compiled by Vite, and consumed entirely through Blade tags. Each component gets
            its own page with live examples and copy-paste snippets.
        </p>

        <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <a class="card p-5 transition hover:-translate-y-0.5 hover:border-line-2" href="{{ url('/docs/buttons') }}">
                <span class="grid h-9 w-9 place-items-center rounded-lg bg-accent-bg text-accent-soft">
                    <sb:icon name="plus" class="icon-sz-15" />
                </span>
                <h3 class="mt-3 text-sm font-semibold">Buttons</h3>
                <p class="mt-1 mb-0 text-xs text-ink-2">Variants, sizes, icons, keyboard hints, groups and states.</p>
                <span class="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent-hi">Open page <sb:icon name="arrow-right" class="icon-sz-11" /></span>
            </a>

            <a class="card p-5 transition hover:-translate-y-0.5 hover:border-line-2" href="{{ url('/docs/colors') }}">
                <span class="grid h-9 w-9 place-items-center rounded-lg bg-accent-bg text-accent-soft">
                    <sb:icon name="sparkles" class="icon-sz-15" />
                </span>
                <h3 class="mt-3 text-sm font-semibold">Colors</h3>
                <p class="mt-1 mb-0 text-xs text-ink-2">The Tailwind palette plus the package's semantic color tokens.</p>
                <span class="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent-hi">Open page <sb:icon name="arrow-right" class="icon-sz-11" /></span>
            </a>

            <div class="card p-5 opacity-60">
                <span class="grid h-9 w-9 place-items-center rounded-lg bg-surface-2 text-ink-2">
                    <sb:icon name="sparkles" class="icon-sz-15" />
                </span>
                <h3 class="mt-3 text-sm font-semibold">Badges</h3>
                <p class="mt-1 mb-0 text-xs text-ink-2">Status chips with variants, sizes and icons.</p>
                <span class="mt-3 inline-flex items-center gap-1 text-xs text-ink-3">Coming soon</span>
            </div>

            <div class="card p-5 opacity-60">
                <span class="grid h-9 w-9 place-items-center rounded-lg bg-surface-2 text-ink-2">
                    <sb:icon name="user" class="icon-sz-15" />
                </span>
                <h3 class="mt-3 text-sm font-semibold">Avatars</h3>
                <p class="mt-1 mb-0 text-xs text-ink-2">Initial-based avatars and stacks.</p>
                <span class="mt-3 inline-flex items-center gap-1 text-xs text-ink-3">Coming soon</span>
            </div>

            <div class="card p-5 opacity-60">
                <span class="grid h-9 w-9 place-items-center rounded-lg bg-surface-2 text-ink-2">
                    <sb:icon name="folder" class="icon-sz-15" />
                </span>
                <h3 class="mt-3 text-sm font-semibold">Cards</h3>
                <p class="mt-1 mb-0 text-xs text-ink-2">Containers with header and footer rows.</p>
                <span class="mt-3 inline-flex items-center gap-1 text-xs text-ink-3">Coming soon</span>
            </div>

            <div class="card p-5 opacity-60">
                <span class="grid h-9 w-9 place-items-center rounded-lg bg-surface-2 text-ink-2">
                    <sb:icon name="pencil" class="icon-sz-15" />
                </span>
                <h3 class="mt-3 text-sm font-semibold">Forms</h3>
                <p class="mt-1 mb-0 text-xs text-ink-2">Inputs, selects, textareas, checks and switches.</p>
                <span class="mt-3 inline-flex items-center gap-1 text-xs text-ink-3">Coming soon</span>
            </div>

            <div class="card p-5 opacity-60">
                <span class="grid h-9 w-9 place-items-center rounded-lg bg-surface-2 text-ink-2">
                    <sb:icon name="info" class="icon-sz-15" />
                </span>
                <h3 class="mt-3 text-sm font-semibold">Feedback</h3>
                <p class="mt-1 mb-0 text-xs text-ink-2">Alerts, spinners, skeletons and toasts.</p>
                <span class="mt-3 inline-flex items-center gap-1 text-xs text-ink-3">Coming soon</span>
            </div>

            <div class="card p-5 opacity-60">
                <span class="grid h-9 w-9 place-items-center rounded-lg bg-surface-2 text-ink-2">
                    <sb:icon name="eye" class="icon-sz-15" />
                </span>
                <h3 class="mt-3 text-sm font-semibold">Overlays</h3>
                <p class="mt-1 mb-0 text-xs text-ink-2">Dropdowns, modals and tooltips.</p>
                <span class="mt-3 inline-flex items-center gap-1 text-xs text-ink-3">Coming soon</span>
            </div>

            <div class="card p-5 opacity-60">
                <span class="grid h-9 w-9 place-items-center rounded-lg bg-surface-2 text-ink-2">
                    <sb:icon name="star" class="icon-sz-15" />
                </span>
                <h3 class="mt-3 text-sm font-semibold">Icons &amp; Brand</h3>
                <p class="mt-1 mb-0 text-xs text-ink-2">The icon set and brand mark.</p>
                <span class="mt-3 inline-flex items-center gap-1 text-xs text-ink-3">Coming soon</span>
            </div>
        </div>
    </section>

    {{-- Setup --}}
    <section id="setup" class="scroll-mt-24" data-doc-section data-toc-title="Setup">
        <sb:heading level="h1">Setup</sb:heading>

        <div class="mt-4 space-y-4">
            <x-docs.demo title="Composer" description="Point at the local package; Livewire is pulled in automatically." language="JSON">
                <x-slot name="code">
@verbatim
"repositories": [
    {
        "type": "path",
        "url": "../package-tailwind",
        "options": { "symlink": true }
    }
]

composer require superbyte/ui-tailwind:@dev
@endverbatim
                </x-slot>
            </x-docs.demo>

            <x-docs.demo title="Vite + CSS" description="Source the package CSS through the published copy." language="JS">
                <x-slot name="code">
@verbatim
// vite.config.js
resolve: { alias: { '@superbyte-ui': './vendor/superbyte/ui-tailwind/resources' }, symlinks: false }

// resources/css/app.css
@import 'tailwindcss';
@import './vendor/superbyte-ui/superbyte-ui.css';

// publish the package CSS once
php artisan vendor:publish --tag=superbyte-ui-css --force
@endverbatim
                </x-slot>
            </x-docs.demo>

            <x-docs.demo title="Layout directives" description="Pre-paint theme script in <head>, then styles + JS before </body>.">
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
        </div>
    </section>
@endsection
