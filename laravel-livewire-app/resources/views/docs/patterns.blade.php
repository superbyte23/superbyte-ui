@extends('layouts.docs', ['title' => 'Patterns — Component Docs'])

@section('content')
    <section id="introduction" class="scroll-mt-24" data-doc-section data-toc-title="Introduction">
        <sb:heading level="h1">Patterns</sb:heading>
        <p class="mt-2 max-w-2xl text-ink-2">
            Common compositions that combine several components. Every snippet is copy-paste ready
            and renders against the package tokens.
        </p>
    </section>

    <section id="page-header" class="scroll-mt-24" data-doc-section data-toc-title="Page header">
        <x-docs.demo title="Page header"
            description="Heading + muted lead paragraph, spaced like every docs page.">
            <div class="flex flex-wrap items-center gap-3">
                <sb:button variant="primary" icon="plus">New invoice</sb:button>
                <sb:button variant="outline" iconTrailing="arrow-right">Export</sb:button>
                <sb:button variant="ghost" kbd="⌘K">Search</sb:button>
            </div>
            <x-slot name="code">
@verbatim
<div class="flex flex-wrap items-center justify-between gap-3">
    <div>
        <sb:heading level="h1">Invoices</sb:heading>
        <p class="mt-1 mb-0 text-sm text-ink-2">Manage and export your invoices.</p>
    </div>
    <div class="flex flex-wrap items-center gap-2">
        <sb:button variant="primary" icon="plus">New invoice</sb:button>
        <sb:button variant="outline" iconTrailing="arrow-right">Export</sb:button>
    </div>
</div>
@endverbatim
            </x-slot>
        </x-docs.demo>
    </section>

    <section id="button-group" class="scroll-mt-24" data-doc-section data-toc-title="Button group">
        <x-docs.demo title="Button group with active state"
            description="Flush, equal-height buttons; the active member paints its full border.">
            <div class="flex flex-wrap items-center gap-3">
                <sb:button.group>
                    <sb:button variant="outline" active>Day</sb:button>
                    <sb:button variant="outline">Week</sb:button>
                    <sb:button variant="outline">Month</sb:button>
                </sb:button.group>
            </div>
            <x-slot name="code">
@verbatim
<sb:button.group>
    <sb:button variant="outline" active>Day</sb:button>
    <sb:button variant="outline">Week</sb:button>
    <sb:button variant="outline">Month</sb:button>
</sb:button.group>
@endverbatim
            </x-slot>
        </x-docs.demo>
    </section>

    <section id="tinted-callout" class="scroll-mt-24" data-doc-section data-toc-title="Tinted callout">
        <x-docs.demo title="Tinted callout"
            description="A semantic tint with matching text — works in both appearances.">
            <div class="space-y-3">
                <div class="rounded-lg bg-accent-bg px-4 py-3 text-accent-soft">
                    <p class="mb-0 text-sm font-medium">New workspace</p>
                    <p class="mb-0 mt-0.5 text-xs text-ink-2">Your accent-tinted callout in the current theme.</p>
                </div>
                <div class="rounded-lg bg-danger-bg px-4 py-3 text-danger">
                    <p class="mb-0 text-sm font-medium">This cannot be undone</p>
                    <p class="mb-0 mt-0.5 text-xs text-ink-2">Danger surfaces use the danger tint.</p>
                </div>
            </div>
            <x-slot name="code">
@verbatim
<div class="rounded-lg bg-accent-bg px-4 py-3 text-accent-soft">
    <p class="text-sm font-medium">New workspace</p>
    <p class="text-xs text-ink-2">Your accent-tinted callout.</p>
</div>

<div class="rounded-lg bg-danger-bg px-4 py-3 text-danger">
    <p class="text-sm font-medium">This cannot be undone</p>
    <p class="text-xs text-ink-2">Danger surfaces use the danger tint.</p>
</div>
@endverbatim
            </x-slot>
        </x-docs.demo>
    </section>

    <section id="icon-button" class="scroll-mt-24" data-doc-section data-toc-title="Icon button">
        <x-docs.demo title="Icon button with badge"
            description="A square icon button with a floating count badge.">
            <div class="flex flex-wrap items-center gap-3">
                <sb:button variant="ghost" square icon="bell">
                    <span class="ping">3</span>
                </sb:button>
                <sb:button variant="ghost" square icon="trash" aria-label="Delete"></sb:button>
            </div>
            <x-slot name="code">
@verbatim
<sb:button variant="ghost" square icon="bell">
    <span class="ping">3</span>
</sb:button>

<sb:button variant="ghost" square icon="trash" aria-label="Delete" />
@endverbatim
            </x-slot>
        </x-docs.demo>
    </section>
@endsection
