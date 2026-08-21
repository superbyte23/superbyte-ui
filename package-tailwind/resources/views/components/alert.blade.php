@use('SuperbyteUi\Support\Attributes', 'Attr')

@props([
    'variant' => 'primary',
    'title' => null,
    'icon' => null,
    'dismissible' => false,
])

@php
    $variantClass = match ($variant) {
        'success' => 'alert-success',
        'warning' => 'alert-warning',
        'danger' => 'alert-danger',
        default => 'alert-primary',
    };

    $defaultIcon = match ($variant) {
        'success' => 'circle-check',
        'warning' => 'triangle-alert',
        'danger' => 'circle-x',
        default => 'info',
    };
@endphp

<div {{ Attr::mergeClass($attributes, 'alert', $variantClass) }} role="alert">
    <sb:icon :name="$icon ?? $defaultIcon" class="text-sm mt-1" />

    <div class="flex-1 min-w-0">
        @if ($title !== null)
            <h5 class="alert-heading">{{ $title }}</h5>
        @endif
        <div>{{ $slot }}</div>
    </div>

    @if ($dismissible)
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
            <sb:icon name="x" class="icon-sz-13" />
        </button>
    @endif
</div>
