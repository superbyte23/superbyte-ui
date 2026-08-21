@use('SuperbyteUi\Support\Attributes', 'Attr')

@props(['as' => 'p', 'weight' => null])

@php
    $weightClass = match ($weight) {
        'normal' => 'font-normal',
        'medium' => 'font-medium',
        'semibold' => 'font-semibold',
        'bold' => 'font-bold',
        default => '',
    };
@endphp

<{{ $as }} {{ Attr::mergeClass($attributes, 'text-sm text-(--text2)', $weightClass) }}>
    {{ $slot }}
</{{ $as }}>
