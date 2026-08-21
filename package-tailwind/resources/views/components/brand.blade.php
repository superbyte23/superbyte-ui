@use('SuperbyteUi\Support\Attributes', 'Attr')

@props(['name' => null, 'href' => null])

@if ($href !== null)
    <a href="{{ $href }}" {{ Attr::mergeClass($attributes, 'inline-flex items-center gap-2') }}>
        {{ $slot }}
        @if ($name !== null)
            <span class="font-semibold text-(--text)">{{ $name }}</span>
        @endif
    </a>
@else
    <div {{ Attr::mergeClass($attributes, 'inline-flex items-center gap-2') }}>
        {{ $slot }}
        @if ($name !== null)
            <span class="font-semibold text-(--text)">{{ $name }}</span>
        @endif
    </div>
@endif
