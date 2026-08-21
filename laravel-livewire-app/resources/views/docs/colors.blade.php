@extends('layouts.docs', ['title' => 'Colors — Component Docs'])

@section('content')
    {{-- Page header --}}
    <section>
        <sb:heading level="h1" class="mt-4">Colors</sb:heading>
        <p class="mt-2 max-w-2xl text-ink-2">
            The package registers <strong>semantic color tokens</strong> — accent, success, warning, danger, info and
            neutrals — as utilities like <code class="kbd">bg-accent</code>, <code class="kbd">text-green</code> and
            <code class="kbd">bg-danger-bg</code>. The full <strong>Tailwind v4 default palette</strong> stays
            available on top, so <code class="kbd">bg-red-500</code>, <code class="kbd">text-emerald-600</code> and
            every shade ramp work out of the box.
        </p>
    </section>

    {{-- Tailwind palette --}}
    <section>
        <x-docs.demo title="Tailwind palette"
            description="The default Tailwind v4 color system is untouched — all hues and shade ramps work.">
            <div class="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                <div>
                    <div class="h-10 rounded-lg bg-red-500"></div>
                    <p class="mt-1.5 font-mono text-[10px] text-ink-2">red-500</p>
                </div>
                <div>
                    <div class="h-10 rounded-lg bg-orange-500"></div>
                    <p class="mt-1.5 font-mono text-[10px] text-ink-2">orange-500</p>
                </div>
                <div>
                    <div class="h-10 rounded-lg bg-amber-500"></div>
                    <p class="mt-1.5 font-mono text-[10px] text-ink-2">amber-500</p>
                </div>
                <div>
                    <div class="h-10 rounded-lg bg-yellow-500"></div>
                    <p class="mt-1.5 font-mono text-[10px] text-ink-2">yellow-500</p>
                </div>
                <div>
                    <div class="h-10 rounded-lg bg-lime-500"></div>
                    <p class="mt-1.5 font-mono text-[10px] text-ink-2">lime-500</p>
                </div>
                <div>
                    <div class="h-10 rounded-lg bg-green-500"></div>
                    <p class="mt-1.5 font-mono text-[10px] text-ink-2">green-500</p>
                </div>
                <div>
                    <div class="h-10 rounded-lg bg-emerald-500"></div>
                    <p class="mt-1.5 font-mono text-[10px] text-ink-2">emerald-500</p>
                </div>
                <div>
                    <div class="h-10 rounded-lg bg-teal-500"></div>
                    <p class="mt-1.5 font-mono text-[10px] text-ink-2">teal-500</p>
                </div>
                <div>
                    <div class="h-10 rounded-lg bg-cyan-500"></div>
                    <p class="mt-1.5 font-mono text-[10px] text-ink-2">cyan-500</p>
                </div>
                <div>
                    <div class="h-10 rounded-lg bg-sky-500"></div>
                    <p class="mt-1.5 font-mono text-[10px] text-ink-2">sky-500</p>
                </div>
                <div>
                    <div class="h-10 rounded-lg bg-blue-500"></div>
                    <p class="mt-1.5 font-mono text-[10px] text-ink-2">blue-500</p>
                </div>
                <div>
                    <div class="h-10 rounded-lg bg-indigo-500"></div>
                    <p class="mt-1.5 font-mono text-[10px] text-ink-2">indigo-500</p>
                </div>
                <div>
                    <div class="h-10 rounded-lg bg-violet-500"></div>
                    <p class="mt-1.5 font-mono text-[10px] text-ink-2">violet-500</p>
                </div>
                <div>
                    <div class="h-10 rounded-lg bg-purple-500"></div>
                    <p class="mt-1.5 font-mono text-[10px] text-ink-2">purple-500</p>
                </div>
                <div>
                    <div class="h-10 rounded-lg bg-fuchsia-500"></div>
                    <p class="mt-1.5 font-mono text-[10px] text-ink-2">fuchsia-500</p>
                </div>
                <div>
                    <div class="h-10 rounded-lg bg-pink-500"></div>
                    <p class="mt-1.5 font-mono text-[10px] text-ink-2">pink-500</p>
                </div>
                <div>
                    <div class="h-10 rounded-lg bg-rose-500"></div>
                    <p class="mt-1.5 font-mono text-[10px] text-ink-2">rose-500</p>
                </div>
            </div>

            <div class="mt-6 border-t border-line pt-4">
                <p class="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-3">Shade ramp — blue</p>
                <div class="flex overflow-hidden rounded-lg border border-line">
                    <div class="h-12 flex-1 bg-blue-50"></div>
                    <div class="h-12 flex-1 bg-blue-100"></div>
                    <div class="h-12 flex-1 bg-blue-200"></div>
                    <div class="h-12 flex-1 bg-blue-300"></div>
                    <div class="h-12 flex-1 bg-blue-400"></div>
                    <div class="h-12 flex-1 bg-blue-500"></div>
                    <div class="h-12 flex-1 bg-blue-600"></div>
                    <div class="h-12 flex-1 bg-blue-700"></div>
                    <div class="h-12 flex-1 bg-blue-800"></div>
                    <div class="h-12 flex-1 bg-blue-900"></div>
                    <div class="h-12 flex-1 bg-blue-950"></div>
                </div>
                <div class="mt-2 flex justify-between font-mono text-[10px] text-ink-3">
                    <span>blue-50</span><span>blue-500</span><span>blue-950</span>
                </div>
            </div>

            <x-slot name="code">
                @verbatim
                    <div class="bg-red-500 rounded-lg px-4 py-2"></div>
                    <div class="bg-blue-600 text-white rounded-lg px-4 py-2">blue-600</div>
                    <div class="h-12 bg-blue-50"></div>
                    <div class="h-12 bg-blue-950"></div>
                @endverbatim
            </x-slot>
        </x-docs.demo>
    </section>

    {{-- Semantic tokens --}}
    <section>
        <x-docs.demo title="Semantic tokens"
            description="Package tokens — the solid color plus its translucent tint for backgrounds.">
            <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                @php
                    $tokens = [
                        [
                            'solid' => 'bg-accent',
                            'solidText' => 'text-accent-text',
                            'tint' => 'bg-accent-bg',
                            'tintText' => 'text-accent-soft',
                            'name' => 'accent',
                            'desc' => 'Primary — buttons, links, focus',
                        ],
                        [
                            'solid' => 'bg-green',
                            'solidText' => 'text-white',
                            'tint' => 'bg-green-bg',
                            'tintText' => 'text-green',
                            'name' => 'green',
                            'desc' => 'Success / confirmations',
                        ],
                        [
                            'solid' => 'bg-yellow',
                            'solidText' => 'text-white',
                            'tint' => 'bg-yellow-bg',
                            'tintText' => 'text-yellow',
                            'name' => 'yellow',
                            'desc' => 'Warning / attention',
                        ],
                        [
                            'solid' => 'bg-danger',
                            'solidText' => 'text-white',
                            'tint' => 'bg-danger-bg',
                            'tintText' => 'text-danger',
                            'name' => 'danger',
                            'desc' => 'Danger / destructive',
                        ],
                        [
                            'solid' => 'bg-sky',
                            'solidText' => 'text-white',
                            'tint' => 'bg-sky-bg',
                            'tintText' => 'text-sky',
                            'name' => 'sky',
                            'desc' => 'Info / links',
                        ],
                    ];
                @endphp
                @foreach ($tokens as $t)
                    <div>
                        <div class="grid grid-rows-2 gap-1.5">
                            <div class="grid h-8 place-items-center rounded-lg {{ $t['solid'] }} {{ $t['solidText'] }}">
                                <span class="font-mono text-[9px]">{{ $t['name'] }}</span>
                            </div>
                            <div
                                class="grid h-8 place-items-center rounded-lg border border-line {{ $t['tint'] }} {{ $t['tintText'] }}">
                                <span class="font-mono text-[9px]">-bg</span>
                            </div>
                        </div>
                        <p class="mt-1.5 font-mono text-[10px] text-ink">{{ $t['name'] }}</p>
                        <p class="text-[10px] text-ink-3">{{ $t['desc'] }}</p>
                    </div>
                @endforeach
            </div>

            <div class="mt-6 border-t border-line pt-4">
                <p class="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-3">Neutrals</p>
                <div class="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7">
                    @php
                        $neutrals = [
                            ['c' => 'bg-surface', 'l' => 'surface'],
                            ['c' => 'bg-surface-2', 'l' => 'surface-2'],
                            ['c' => 'bg-surface-3', 'l' => 'surface-3'],
                            ['c' => 'bg-line-2', 'l' => 'line-2'],
                            ['c' => 'bg-ink', 'l' => 'ink'],
                            ['c' => 'bg-ink-2', 'l' => 'ink-2'],
                            ['c' => 'bg-ink-3', 'l' => 'ink-3'],
                        ];
                    @endphp
                    @foreach ($neutrals as $n)
                        <div>
                            <div class="h-10 rounded-lg border border-line {{ $n['c'] }}"></div>
                            <p class="mt-1.5 font-mono text-[10px] text-ink-2">{{ $n['l'] }}</p>
                        </div>
                    @endforeach
                </div>
            </div>

            <x-slot name="code">
                @verbatim
                    <div class="bg-accent text-accent-text rounded-lg px-4 py-2">Primary</div>
                    <div class="bg-accent-bg text-accent-soft rounded-lg px-4 py-2">Tinted callout</div>
                    <span class="text-green">Saved</span>
                    <div class="bg-danger-bg text-danger rounded-lg px-4 py-3">This cannot be undone.</div>
                    <div class="bg-surface-2 text-ink-2 rounded-lg px-4 py-2">Muted surface</div>
                @endverbatim
            </x-slot>
        </x-docs.demo>
    </section>

    {{-- Usage --}}
    <section>
        <x-docs.demo title="Usage"
            description="Combine the palette with the package: override a button, tint a callout, mark success.">
            <div class="space-y-4">
                <div class="flex flex-wrap items-center gap-2">
                    <a href="#"
                        class="inline-flex items-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white">Save</a>
                    <a href="#"
                        class="inline-flex items-center rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white">Delete</a>
                    <sb:button variant="ghost" class="text-amber-500">Favorite</sb:button>
                    <sb:button class="bg-indigo-600 border-transparent">Indigo</sb:button>
                </div>
                <div class="rounded-lg bg-danger-bg px-4 py-3 text-danger">
                    <p class="mb-0 text-sm font-medium">This action cannot be undone</p>
                    <p class="mb-0 mt-0.5 text-xs text-ink-2">The row will be permanently removed from your workspace.</p>
                </div>
                <p class="mb-0 text-green">
                    <sb:icon name="check" class="icon-sz-13" /> Changes saved
                </p>
            </div>
            <x-slot name="code">
                @verbatim
                    <sb:button variant="ghost" class="text-amber-500">Favorite</sb:button>
                    <sb:button class="bg-indigo-600 border-transparent">Indigo</sb:button>

                    <div class="rounded-lg bg-danger-bg px-4 py-3 text-danger">
                        <p class="text-sm font-medium">This action cannot be undone</p>
                        <p class="text-xs text-ink-2">The row will be permanently removed.</p>
                    </div>

                    <p class="text-green">
                        <sb:icon name="check" /> Changes saved
                    </p>
                @endverbatim
            </x-slot>
        </x-docs.demo>
    </section>
@endsection
