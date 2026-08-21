<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Superbyte UI') }} — Demo</title>

    @sbAppearance
    @sbStyles
    @livewireStyles
    @vite(['resources/css/app.css'])
</head>
<body class="min-h-screen bg-bg text-ink antialiased">
    {{-- Top bar --}}
    <header class="sticky top-0 z-40 border-b border-line-2 bg-surface/80 backdrop-blur">
        <div class="mx-auto flex max-w-screen-2xl items-center justify-between gap-4 px-6 py-3">
            <sb:brand name="Superbyte UI" href="{{ url('/') }}" wire:navigate>
                <img src="{{ asset('img/brand.png') }}" alt="Superbyte UI" class="h-8 w-auto">
            </sb:brand>

            <div class="flex items-center gap-2">
                <nav class="hidden items-center gap-1 md:flex">
                    <a class="btn btn-ghost" href="{{ url('/') }}" wire:navigate>Demo</a>
                    <a class="btn btn-soft" href="{{ url('/docs') }}" wire:navigate>Docs</a>
                </nav>

                <sb:button variant="ghost" square aria-label="Toggle theme" onclick="toggleTheme()">
                    <sb:icon name="moon" class="icon-theme-moon" />
                    <sb:icon name="sun" class="icon-theme-sun" />
                </sb:button>
            </div>
        </div>
    </header>

    <main class="mx-auto max-w-screen-2xl px-6 py-10">
        {{-- Hero --}}
        <section class="mb-10">
            <sb:badge variant="primary" icon="sparkles">Superbyte UI for Laravel + Livewire</sb:badge>
            <sb:heading level="h1" class="mt-4">A hand-crafted component library,<br>built on Tailwind CSS v4.</sb:heading>
            <p class="mt-3 max-w-xl text-ink-2">
                This Laravel 13 app consumes the <code class="kbd">superbyte/ui-tailwind</code>
                package from a local Composer path repository. Everything on this page renders
                through Blade components (<code class="kbd">&lt;sb:button&gt;</code>,
                <code class="kbd">&lt;sb:card&gt;</code>, …) with zero CDN dependencies.
            </p>
            <div class="mt-6 flex flex-wrap items-center gap-3">
                <sb:button variant="primary" icon="plus">Get started</sb:button>
                <sb:button variant="outline" iconTrailing="arrow-right">Documentation</sb:button>
                <sb:button variant="ghost" kbd="⌘K">Quick search</sb:button>
            </div>
        </section>

        {{-- Demo grid --}}
        <div class="grid gap-6 lg:grid-cols-3">
            {{-- Forms card --}}
            <sb:card class="lg:col-span-2" :padding="false">
                <sb:card.header title="Account settings" description="Shorthand label= composes field + label + error automatically." />
                <div class="grid gap-x-6 p-4 md:grid-cols-2">
                    <sb:input label="Full name" name="name" value="Alex Rivera" />
                    <sb:input label="Email" name="email" type="email" value="alex@example.com" hint="We never share your email." />
                    <sb:select label="Role" name="role">
                        <option>Administrator</option>
                        <option selected>Editor</option>
                        <option>Viewer</option>
                    </sb:select>
                    <sb:input label="Timezone" name="timezone" value="Europe/Amsterdam" />
                </div>
                <div class="mt-2 space-y-3 p-4 pt-0">
                    <sb:checkbox checked>Email me about product updates</sb:checkbox>
                    <sb:switch checked>Enable two-factor authentication</sb:switch>
                </div>
                <div class="flex justify-end gap-2 p-4 pt-0">
                    <sb:button variant="ghost">Cancel</sb:button>
                    <sb:button variant="primary" type="submit" icon="check">Save changes</sb:button>
                </div>
            </sb:card>

            {{-- Stats / misc card --}}
            <sb:card :padding="false">
                <sb:card.header title="Components" description="From this package only." />
                <div class="space-y-3 p-4">
                    <div class="flex items-center justify-between">
                        <span class="text-ink-2">Status</span>
                        <sb:badge variant="success">Healthy</sb:badge>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-ink-2">Uptime</span>
                        <span class="font-mono text-sm">99.99%</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-ink-2">Latency</span>
                        <span class="flex items-center gap-2"><sb:spinner size="sm" /> 42ms</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-ink-2">Team</span>
                        <span class="avatar-stack">
                            <sb:avatar initials="AR" size="sm" />
                            <sb:avatar initials="JM" size="sm" />
                            <sb:avatar initials="SK" size="sm" />
                            <sb:avatar initials="+9" size="sm" />
                        </span>
                    </div>
                </div>
                <div class="mt-6 space-y-2">
                    <sb:skeleton lines="3" />
                </div>
            </sb:card>
        </div>

        {{-- Alerts + interactions --}}
        <div class="mt-6 grid gap-6 lg:grid-cols-3">
            <div class="space-y-3 lg:col-span-2">
                <sb:alert title="Heads up" icon="info">You are viewing the Tailwind CSS v4 edition of Superbyte UI, wired into a Laravel 13 app via a local path repository.</sb:alert>
                <sb:alert variant="success" title="All green" dismissible>Package discovery, the <code class="kbd">sb:</code> tag compiler, directives and the Vite build are all working.</sb:alert>
                <sb:alert variant="warning" title="Experimental" icon="triangle-alert">Overlays (dropdown, modal, toast) ship with the runtime in <code class="kbd">@sbScripts</code>.</sb:alert>
            </div>

            <sb:card>
                <sb:card.header title="Playground" description="Widgets backed by superbyte.js." />
                <div class="flex flex-wrap items-center gap-3">
                    <sb:button variant="primary" data-bs-toggle="modal" data-bs-target="#demo-modal" icon="send">Open modal</sb:button>
                    <sb:button variant="soft" icon="bell" onclick="showToast('success', 'Settings saved!')">Toast</sb:button>
                    <sb:button variant="danger" icon="trash" onclick="showToast('error', 'Something went wrong')">Danger toast</sb:button>
                </div>
                <div class="mt-4 text-sm text-ink-2">
                    Tip: press <sb:kbd>Esc</sb:kbd> to close an open modal.
                </div>
            </sb:card>
        </div>

        {{-- Footer --}}
        <footer class="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-line py-6 text-xs text-ink-3">
            <span>Laravel {{ app()->version() }} · Livewire · Tailwind v4</span>
            <span class="font-mono">superbyte/ui-tailwind @ dev-main (path repo)</span>
        </footer>
    </main>

    {{-- Modal --}}
    <sb:modal id="demo-modal" title="Delete project?" icon="danger" size="sm">
        <p class="text-sm text-ink-2">
            This action is irreversible. The project and all of its files will be
            permanently removed.
        </p>
        <x-slot name="footer">
            <sb:button variant="ghost" data-bs-dismiss="modal">Cancel</sb:button>
            <sb:button variant="danger" data-bs-dismiss="modal" icon="trash">Delete</sb:button>
        </x-slot>
    </sb:modal>

    <div id="toast-container"></div>

    @sbScripts
    @livewireScripts
    @vite(['resources/js/app.js'])
</body>
</html>
