@php
    $title = $title ?? 'Component Docs';
    $path = trim(request()->path(), '/');

    $components = [
        'Alert', 'Avatar', 'Badge', 'Brand', 'Button', 'Card', 'Checkbox',
        'Description', 'Dropdown', 'Error', 'Field', 'File upload', 'Heading',
        'Icon', 'Input', 'Kbd', 'Label', 'Modal', 'Radio', 'Select', 'Separator',
        'Skeleton', 'Spinner', 'Switch', 'Text', 'Textarea', 'Toast', 'Tooltip',
    ];

    $sections = [
        [
            'label' => 'Getting started',
            'items' => [
                ['label' => 'Introduction', 'href' => '/docs/introduction'],
                ['label' => 'Installation', 'href' => '/docs/installation'],
                ['label' => 'Theming', 'href' => '/docs/theming'],
                ['label' => 'Dark mode', 'href' => '/docs/dark-mode'],
                ['label' => 'Patterns', 'href' => '/docs/patterns'],
            ],
        ],
        [
            'label' => 'Components',
            'items' => [
                ['label' => 'Overview', 'href' => '/docs'],
                ['label' => 'Buttons', 'href' => '/docs/buttons'],
            ],
            'plain' => $components,
        ],
        [
            'label' => 'Utilities',
            'items' => [
                ['label' => 'Colors', 'href' => '/docs/colors'],
            ],
        ],
    ];
@endphp

<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Superbyte UI') }} — {{ $title }}</title>

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
                <nav class="flex items-center gap-1">
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

    <div class="mx-auto max-w-screen-2xl px-6 py-8">
        <div class="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_220px]">
            {{-- Component nav --}}
            <aside class="hidden lg:block">
                <div class="sticky top-24 space-y-6 text-sm">
                    @foreach ($sections as $section)
                        <div class="space-y-1 mb-2">
                            <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-3">{{ $section['label'] }}</p>
                        @foreach ($section['items'] as $item)
                            @php $isActive = $path === trim($item['href'], '/'); @endphp
                            <a class="block rounded-lg px-3 py-1.5 {{ $isActive ? 'bg-surface-2 font-medium text-ink' : 'text-ink-2 hover:bg-surface-2 hover:text-ink' }}"
                               href="{{ $item['href'] }}" wire:navigate>{{ $item['label'] }}</a>
                        @endforeach
                        @if (!empty($section['plain']))
                            @foreach ($section['plain'] as $name)
                                <span class="block cursor-default rounded-lg px-3 py-1.5 text-ink-3">{{ $name }}</span>
                            @endforeach
                        @endif
                        </div>
                    @endforeach
                </div>
            </aside>

            <main class="min-w-0 space-y-10">
                @yield('content')
            </main>

            {{-- On this page --}}
            <aside class="hidden xl:block" data-on-this-page>
                <div class="sticky top-24 space-y-1 text-sm">
                    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-3">On this page</p>
                    <ul class="space-y-1"></ul>
                </div>
            </aside>
        </div>
    </div>

    <div id="toast-container" class="toast-container"></div>

    <script src="{{ asset('vendor/prism/prism.min.js') }}"></script>
    <script src="{{ asset('vendor/prism/prism-json.min.js') }}"></script>
    <script src="{{ asset('vendor/prism/prism-bash.min.js') }}"></script>
    <script data-docs data-navigate-once>
        (function () {
            document.addEventListener('click', function (e) {
                var btn = e.target.closest('[data-copy]');
                if (!btn) return;
                var block = btn.closest('[data-code]');
                var code = block && block.querySelector('code');
                if (!code) return;
                var text = code.textContent.replace(/\n$/, '');
                var done = function () {
                    btn.textContent = 'Copied';
                    btn.classList.add('text-green');
                    setTimeout(function () {
                        btn.textContent = 'Copy';
                        btn.classList.remove('text-green');
                    }, 1500);
                };
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(text).then(done);
                } else {
                    var ta = document.createElement('textarea');
                    ta.value = text;
                    document.body.appendChild(ta);
                    ta.select();
                    document.execCommand('copy');
                    document.body.removeChild(ta);
                    done();
                }
            });
        })();
    </script>

    <script data-docs-toc>
        (function () {
            var main = document.querySelector('main');
            var aside = document.querySelector('[data-on-this-page]');
            if (!main || !aside) return;
            var list = aside.querySelector('ul');
            var entries = [];
            main.querySelectorAll('[data-doc-section]').forEach(function (sec) {
                if (!sec.id) return;
                var heading = sec.querySelector('h1, h2, h3');
                if (!heading) return;
                var label = sec.getAttribute('data-toc-title') || heading.textContent.trim();
                var a = document.createElement('a');
                a.href = '#' + sec.id;
                a.textContent = label;
                a.className = 'block rounded-lg px-3 py-1.5 text-ink-2 hover:bg-surface-2 hover:text-ink';
                a.addEventListener('click', function (e) {
                    e.preventDefault();
                    sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    history.replaceState(null, '', '#' + sec.id);
                });
                var li = document.createElement('li');
                li.appendChild(a);
                list.appendChild(li);
                entries.push({ sec: sec, link: a });
            });
            if (!entries.length) {
                aside.style.display = 'none';
                return;
            }
            function setActive(id) {
                entries.forEach(function (en) {
                    var on = en.sec.id === id;
                    en.link.classList.toggle('bg-surface-2', on);
                    en.link.classList.toggle('font-medium', on);
                    en.link.classList.toggle('text-ink', on);
                    en.link.classList.toggle('text-ink-2', !on);
                });
            }
            if ('IntersectionObserver' in window) {
                var io = new IntersectionObserver(function (obs) {
                    obs.forEach(function (o) { if (o.isIntersecting) setActive(o.target.id); });
                }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });
                entries.forEach(function (en) { io.observe(en.sec); });
            } else if (entries.length) {
                setActive(entries[0].sec.id);
            }
        })();
    </script>

    @vite(['resources/js/app.js'])
    @livewireScripts
    @sbScripts
</body>
</html>
