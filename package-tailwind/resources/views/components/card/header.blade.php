@use('SuperbyteUi\Support\Attributes', 'Attr')

@props(['title' => null, 'description' => null])

<div {{ Attr::mergeClass($attributes, 'flex items-start justify-between gap-4 px-4 py-4 border-bottom') }}>
    <div class="min-w-0">
        @if ($title !== null)
            <h3 class="text-sm font-semibold mb-1">{{ $title }}</h3>
        @endif
        @if ($description !== null)
            <p class="text-sm text-(--text2) mb-0">{{ $description }}</p>
        @endif
        {{ $slot }}
    </div>
</div>
