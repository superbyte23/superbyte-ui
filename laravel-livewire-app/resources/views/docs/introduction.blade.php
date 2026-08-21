@extends('layouts.docs', ['title' => 'Introduction — Component Docs'])

@section('content')
    <section id="introduction" class="scroll-mt-24" data-doc-section data-toc-title="Introduction">
        <sb:heading level="h1">Introduction</sb:heading>
        <p class="mt-2 max-w-2xl text-ink-2">
            <code class="kbd">superbyte/ui-tailwind</code> is a hand-crafted component library for
            <strong>Laravel + Livewire</strong>, built on <strong>Tailwind CSS v4</strong>. Every component
            renders through a Blade tag (<code class="kbd">&lt;sb:button&gt;</code>,
            <code class="kbd">&lt;sb:card&gt;</code>, …) with zero JavaScript frameworks and zero CDN
            dependencies — behavior ships as a small dependency-free runtime.
        </p>
    </section>

    <section id="whats-included" class="scroll-mt-24" data-doc-section data-toc-title="What's included">
        <sb:heading level="h2">What's included</sb:heading>

        <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div class="card p-5">
                <span class="grid h-9 w-9 place-items-center rounded-lg bg-accent-bg text-accent-soft">
                    <sb:icon name="plus" class="icon-sz-15" />
                </span>
                <h3 class="mt-3 text-sm font-semibold">Core primitives</h3>
                <p class="mt-1 mb-0 text-xs text-ink-2">Buttons, badges, cards, headings, text, separators and brand.</p>
            </div>

            <div class="card p-5">
                <span class="grid h-9 w-9 place-items-center rounded-lg bg-accent-bg text-accent-soft">
                    <sb:icon name="pencil" class="icon-sz-15" />
                </span>
                <h3 class="mt-3 text-sm font-semibold">Forms</h3>
                <p class="mt-1 mb-0 text-xs text-ink-2">Inputs, selects, textareas, checkboxes, radios, switches and file uploads.</p>
            </div>

            <div class="card p-5">
                <span class="grid h-9 w-9 place-items-center rounded-lg bg-accent-bg text-accent-soft">
                    <sb:icon name="info" class="icon-sz-15" />
                </span>
                <h3 class="mt-3 text-sm font-semibold">Feedback</h3>
                <p class="mt-1 mb-0 text-xs text-ink-2">Alerts, spinners, skeletons and toasts.</p>
            </div>

            <div class="card p-5">
                <span class="grid h-9 w-9 place-items-center rounded-lg bg-accent-bg text-accent-soft">
                    <sb:icon name="eye" class="icon-sz-15" />
                </span>
                <h3 class="mt-3 text-sm font-semibold">Overlays</h3>
                <p class="mt-1 mb-0 text-xs text-ink-2">Dropdowns, modals and tooltips.</p>
            </div>

            <div class="card p-5">
                <span class="grid h-9 w-9 place-items-center rounded-lg bg-accent-bg text-accent-soft">
                    <sb:icon name="user" class="icon-sz-15" />
                </span>
                <h3 class="mt-3 text-sm font-semibold">Data display</h3>
                <p class="mt-1 mb-0 text-xs text-ink-2">Avatars, avatars stacks, description lists and keybind hints.</p>
            </div>

            <div class="card p-5">
                <span class="grid h-9 w-9 place-items-center rounded-lg bg-accent-bg text-accent-soft">
                    <sb:icon name="moon" class="icon-sz-15" />
                </span>
                <h3 class="mt-3 text-sm font-semibold">Dark mode</h3>
                <p class="mt-1 mb-0 text-xs text-ink-2">Pre-painted theming with no flash, persisted per visitor.</p>
            </div>
        </div>
    </section>

    <section id="philosophy" class="scroll-mt-24" data-doc-section data-toc-title="Philosophy">
        <sb:heading level="h2">Philosophy</sb:heading>
        <div class="mt-4 space-y-3">
            <div class="rounded-lg bg-accent-bg px-4 py-3 text-accent-soft">
                <p class="mb-0 text-sm font-medium">Blade-first</p>
                <p class="mb-0 mt-0.5 text-xs text-ink-2">Components are just Blade views — no JS component registry, no build-step plugins.</p>
            </div>
            <div class="rounded-lg bg-accent-bg px-4 py-3 text-accent-soft">
                <p class="mb-0 text-sm font-medium">Tokens over magic</p>
                <p class="mb-0 mt-0.5 text-xs text-ink-2">Colors, radii, fonts and spacing come from CSS custom properties you can override.</p>
            </div>
            <div class="rounded-lg bg-accent-bg px-4 py-3 text-accent-soft">
                <p class="mb-0 text-sm font-medium">Zero dependencies</p>
                <p class="mb-0 mt-0.5 text-xs text-ink-2">Everything is vendored locally. No CDN, no network requests.</p>
            </div>
        </div>
    </section>

    <section id="browsers" class="scroll-mt-24" data-doc-section data-toc-title="Browser support">
        <sb:heading level="h2">Browser support</sb:heading>
        <p class="mt-2 max-w-2xl text-ink-2">
            The library targets evergreen browsers (Chrome, Edge, Firefox, Safari) and uses modern CSS —
            custom properties, <code class="kbd">oklch()</code>-ready tokens and <code class="kbd">:focus-visible</code>.
        </p>
    </section>
@endsection
