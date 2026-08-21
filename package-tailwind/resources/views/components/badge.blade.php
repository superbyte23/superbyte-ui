@use('SuperbyteUi\Support\Attributes', 'Attr')

@props(['variant' => 'neutral', 'size' => 'md', 'icon' => null])

@php
    $variantClasses = match ($variant) {
        'neutral' => 'text-bg-secondary',
        'primary' => 'badge-primary',
        'success' => 'text-(--green) bg-(--green-bg)',
        'warning' => 'text-(--yellow) bg-(--yellow-bg)',
        'danger' => 'text-(--danger) bg-(--danger-bg)',
        'info' => 'text-(--sky) bg-(--sky-bg)',
        'soft' => 'badge-soft',
        'outline' => 'badge-outline',
        default => 'text-bg-secondary',
    };

    $sizeClasses = match ($size) {
        'sm' => 'px-2 py-0',
        'lg' => 'px-3 py-1',
        default => '',
    };
@endphp

<span {{ Attr::mergeClass($attributes, 'badge font-medium', $variantClasses, $sizeClasses) }}>@if ($icon)<sb:icon :name="$icon" class="me-1" />@endif{{ $slot }}</span>
