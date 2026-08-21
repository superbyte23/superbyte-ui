@extends('layouts.docs', ['title' => 'Dark mode — Component Docs'])

@section('content')
    <section id="how-it-works" class="scroll-mt-24" data-doc-section data-toc-title="How it works">
        <sb:heading level="h1">Dark mode</sb:heading>
        <p class="mt-2 max-w-2xl text-ink-2">
            Dark mode is class-based: the theme lives as <code class="kbd">dark</code> or
            <code class="kbd">light</code> on the <code class="kbd">&lt;html&gt;</code> element.
            The <code class="kbd">@sbAppearance</code> directive applies the saved theme
            <strong>before first paint</strong>, so there is no flash of the wrong theme and no
            refresh scroll-jump.
        </p>
    </section>

    <section id="toggle" class="scroll-mt-24" data-doc-section data-toc-title="Toggle">
        <x-docs.demo title="Toggle theme"
            description="window.toggleTheme() flips the class and persists the choice.">
            <div class="flex flex-wrap items-center gap-2">
                <sb:button variant="ghost" square aria-label="Toggle theme" onclick="toggleTheme()">
                    <sb:icon name="moon" class="icon-theme-moon" />
                    <sb:icon name="sun" class="icon-theme-sun" />
                </sb:button>
            </div>
            <x-slot name="code">
@verbatim
<button type="button" class="btn btn-ghost btn-square" aria-label="Toggle theme" onclick="toggleTheme()">
    <sb:icon name="moon" class="icon-theme-moon" />
    <sb:icon name="sun" class="icon-theme-sun" />
</button>
@endverbatim
            </x-slot>
        </x-docs.demo>
    </section>

    <section id="system" class="scroll-mt-24" data-doc-section data-toc-title="System preference">
        <x-docs.demo title="Follow the system"
            description="Set the theme to 'system' and the runtime resolves the OS preference.">
            <x-slot name="code">
@verbatim
<script>
    SuperbyteUi.setAppearance('system'); // 'light' | 'dark' | 'system'
</script>
@endverbatim
            </x-slot>
        </x-docs.demo>
    </section>

    <section id="persistence" class="scroll-mt-24" data-doc-section data-toc-title="Persistence">
        <x-docs.demo title="Persistence"
            description="The choice is stored per visitor; the pre-paint script reads it before rendering.">
            <x-slot name="code">
@verbatim
// localStorage key: 'grid_admin_theme'
// stored value: 'light' | 'dark' | 'system'
// the pre-paint script in <head> applies it before first paint:
localStorage.getItem('grid_admin_theme') || 'dark'
@endverbatim
            </x-slot>
        </x-docs.demo>
    </section>

    <section id="customizing" class="scroll-mt-24" data-doc-section data-toc-title="Customizing">
        <x-docs.demo title="Override per theme"
            description="Scope token overrides under .dark or .light to theme them differently.">
            <x-slot name="code">
@verbatim
.dark {
    --accent: #F2F0EA;          /* ivory primary in dark mode */
    --accent-text: #18181b;
    --surface: #18181b;
    --surface-2: #232326;
}
.light {
    --accent: #18181b;          /* charcoal primary in light mode */
    --accent-text: #ffffff;
}
@endverbatim
            </x-slot>
        </x-docs.demo>
    </section>
@endsection
