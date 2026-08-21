@use('SuperbyteUi\Support\Attributes', 'Attr')

@props(['src' => null, 'alt' => null, 'initials' => null, 'size' => 'md'])

@php
    $sizes = [
        'xs' => 'w-5 h-5 text-[9px]',
        'sm' => 'w-7 h-7 text-[10px]',
        'md' => 'w-8 h-8 text-[11px]',
        'lg' => 'w-10 h-10 text-sm',
        'xl' => 'w-14 h-14 text-lg',
    ];
    $sizeClass = $sizes[$size] ?? $sizes['md'];
@endphp

@if ($src !== null)
    <img {{ Attr::mergeClass($attributes, 'rounded-full object-cover', $sizeClass) }} src="{{ $src }}" alt="{{ $alt ?? '' }}" />
@else
    <span {{ Attr::mergeClass($attributes, 'avatar-circle rounded-full inline-flex items-center justify-center font-semibold text-bg-primary', $sizeClass) }} aria-hidden="true">
        {{ $initials ?? '?' }}
    </span>
@endif
