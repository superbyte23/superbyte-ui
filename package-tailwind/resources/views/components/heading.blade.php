@use('SuperbyteUi\Support\Attributes', 'Attr')

@props(['level' => 'h2', 'as' => null])

@php
    $tag = $as ?? $level;
    $sizeClass = match ((string) $level) {
        'h1' => 'text-3xl',
        'h2' => 'text-2xl',
        'h3' => 'text-xl',
        'h4' => 'text-lg',
        'h5' => 'text-base',
        default => 'text-sm',
    };
@endphp

<{{ $tag }} {{ Attr::mergeClass($attributes, 'font-semibold', $sizeClass) }}>
    {{ $slot }}
</{{ $tag }}>
