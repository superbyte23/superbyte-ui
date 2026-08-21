@use('SuperbyteUi\Support\Attributes', 'Attr')

@props([
    'variant' => 'primary',
    'size' => 'md',
    'icon' => null,
    'iconTrailing' => null,
    'kbd' => null,
    'type' => 'button',
    'square' => false,
    'badge' => null,
])

@php
    $variantClasses = match ($variant) {
        'primary' => 'btn-primary',
        'secondary' => 'btn-secondary',
        'ghost' => 'btn-ghost',
        'outline' => 'btn-outline-secondary',
        'danger' => 'btn-danger',
        'soft' => 'btn-soft',
        'link' => 'btn-link',
        default => 'btn-primary',
    };

    $sizeClasses = match ($size) {
        'sm' => 'btn-sm',
        'lg' => 'btn-lg',
        default => '',
    };

    $activeClass = $attributes->has('active') ? 'active' : '';

    $squareClass = $square ? 'btn-square' : '';
@endphp

<button {{ Attr::mergeClass($attributes, 'btn inline-flex items-center justify-center gap-2', $variantClasses, $sizeClasses, $activeClass, $squareClass)->merge(['type' => $type]) }}>
    @if ($icon)
        <sb:icon :name="$icon" />
    @endif
    @if (! $slot->isEmpty())
        <span class="contents">{{ $slot }}</span>
    @endif
    @if ($iconTrailing)
        <sb:icon :name="$iconTrailing" />
    @endif
    @if ($kbd)
        <kbd class="kbd ms-auto">{{ $kbd }}</kbd>
    @endif
    @if (! empty($badge))
        {{ $badge }}
    @endif
</button>
