@extends('layouts.docs', ['title' => 'Theming — Component Docs'])

@section('content')
    <section id="tokens" class="scroll-mt-24" data-doc-section data-toc-title="Tokens">
        <sb:heading level="h1">Theming</sb:heading>
        <p class="mt-2 max-w-2xl text-ink-2">
            The package is driven by <strong>CSS custom properties</strong>. Override them on
            <code class="kbd">:root</code> (or on <code class="kbd">.dark</code> / <code class="kbd">.light</code>)
            and every component follows — no recompilation needed.
        </p>
    </section>

    <section id="accent" class="scroll-mt-24" data-doc-section data-toc-title="Accent">
        <x-docs.demo title="Accent color"
            description="A single --accent token repaints primary buttons, focus rings and active states.">
            <div class="flex flex-wrap items-center gap-2">
                <sb:button variant="primary" icon="plus">Primary</sb:button>
                <sb:button variant="soft" icon="sparkles">Soft</sb:button>
                <sb:button variant="ghost">Ghost</sb:button>
            </div>
            <x-slot name="code">
@verbatim
:root {
    --accent: #18181b;      /* primary fill */
    --accent-h: #27272a;    /* hover shade */
    --accent-text: #ffffff; /* text on the accent fill */
    --accent-rgb: 24, 24, 27;   /* translucent tints */
    --accent-bg: rgba(24, 24, 27, .08); /* tinted surfaces */
    --accent-soft: #18181b; /* text on tinted surfaces */
    --accent-ink: #18181b;  /* accent text on plain surfaces */
}
@endverbatim
            </x-slot>
        </x-docs.demo>
    </section>

    <section id="radius" class="scroll-mt-24" data-doc-section data-toc-title="Radius">
        <x-docs.demo title="Radius & fonts"
            description="Radius and font tokens flow through every component.">
            <x-slot name="code">
@verbatim
:root {
    --radius: 0.5rem;
    --radius-sm: 0.375rem;
    --sans: ui-sans-serif, system-ui, sans-serif;
    --mono: ui-monospace, SFMono-Regular, Menlo, monospace;
}
@endverbatim
            </x-slot>
        </x-docs.demo>
    </section>

    <section id="utilities" class="scroll-mt-24" data-doc-section data-toc-title="Utilities">
        <x-docs.demo title="Token utilities"
            description="Tailwind v4 @theme maps the tokens to utilities you can use anywhere.">
            <div class="flex flex-wrap items-center gap-2">
                <span class="rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-accent-text">bg-accent</span>
                <span class="rounded-lg bg-accent-bg px-3 py-1.5 text-xs font-medium text-accent-soft">bg-accent-bg</span>
                <span class="rounded-lg bg-surface-2 px-3 py-1.5 text-xs font-medium text-ink-2">bg-surface-2</span>
            </div>
            <x-slot name="code">
@verbatim
<div class="bg-accent text-accent-text rounded-lg px-4 py-2">Primary</div>
<div class="bg-accent-bg text-accent-soft rounded-lg px-4 py-2">Tinted callout</div>
<div class="bg-surface-2 text-ink-2 rounded-lg px-4 py-2">Muted surface</div>
@endverbatim
            </x-slot>
        </x-docs.demo>
    </section>
@endsection
