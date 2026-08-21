@props(['title' => null, 'description' => null, 'code' => null, 'language' => 'HTML'])

@php
    $grammars = ['HTML' => 'markup', 'JS' => 'javascript', 'JSON' => 'json', 'BASH' => 'bash'];
    $grammar = $grammars[$language] ?? 'markup';
    $sectionId = $title !== null ? \Illuminate\Support\Str::slug($title) : null;
@endphp

<div {{ $attributes->merge(['class' => ($sectionId ? ' scroll-mt-24' : '')]) }}
     @if ($sectionId) id="{{ $sectionId }}" data-doc-section @endif>
    @if ($title !== null || $description !== null)
        <div class="mb-3">
            @if ($title !== null)
                <h3 class="text-base font-semibold mb-0">{{ $title }}</h3>
            @endif
            @if ($description !== null)
                <p class="text-sm text-ink-2 mt-1 mb-0">{{ $description }}</p>
            @endif
        </div>
    @endif

    <div class="card overflow-hidden">
        <div class="p-4">{{ $slot }}</div>

        @if ($code !== null)
            <div data-code class="border-t border-line bg-surface-2">
                <div class="flex items-center justify-between gap-3 px-4 py-1.5">
                    <span class="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-3">{{ $language }}</span>
                    <button type="button" class="btn btn-ghost btn-sm" data-copy>Copy</button>
                </div>
                <pre class="m-0 px-4 pb-4 font-mono text-xs leading-relaxed overflow-x-auto"><code class="language-{{ $grammar }}">{{ (string) $code }}</code></pre>
            </div>
        @endif
    </div>
</div>
