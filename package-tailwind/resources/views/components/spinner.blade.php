@use('SuperbyteUi\Support\Attributes', 'Attr')

@props(['size' => 'md'])

@php
    $sizeClasses = match ($size) {
        'sm' => 'sm',
        'lg' => '',
        default => '',
    };
@endphp

<span {{ Attr::mergeClass($attributes, 'spinner', $sizeClasses) }} aria-hidden="true"></span>
