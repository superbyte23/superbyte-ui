@use('SuperbyteUi\Support\Attributes', 'Attr')

@props([
    'variant' => null,
    'size' => null,
])

<div {{ Attr::mergeClass($attributes, 'inline-flex items-stretch [&>*]:relative [&>*+*]:-ms-px [&>*:not(:first-child)]:rounded-s-none [&>*:not(:last-child)]:rounded-e-none [&>*:hover]:z-[1] [&>*:focus-visible]:z-[1] [&>*:active]:z-[1] [&>*.active]:z-[1]') }} role="group">
    {{ $slot }}
</div>
