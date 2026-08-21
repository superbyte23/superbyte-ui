@use('SuperbyteUi\Support\Attributes', 'Attr')

@props(['padding' => true])

<div {{ Attr::mergeClass($attributes, 'card', $padding ? 'p-4' : '') }}>
    {{ $slot }}
</div>
