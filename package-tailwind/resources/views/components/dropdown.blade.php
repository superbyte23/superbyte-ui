@use('SuperbyteUi\Support\Attributes', 'Attr')

@props([
    'label' => null,
    'icon' => null,
    'variant' => 'ghost',
    'menuEnd' => false,
])

@php
    $variantClass = match ($variant) {
        'primary' => 'btn-primary',
        'secondary' => 'btn-secondary',
        'outline' => 'btn-outline-secondary',
        'danger' => 'btn-danger',
        default => 'btn-ghost',
    };
@endphp

<div {{ Attr::mergeClass($attributes, 'dropdown') }}>
    <button type="button" class="btn {{ $variantClass }}" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        @if ($icon !== null)
            <sb:icon :name="$icon" />
        @endif
        @if ($label !== null)
            <span>{{ $label }}</span>
        @endif
        <sb:icon name="chevron-down" class="icon-sz-12 opacity-70" />
    </button>

    <div class="dropdown-menu {{ $menuEnd ? 'dropdown-menu-end' : '' }}" role="menu">
        {{ $slot }}
    </div>
</div>
