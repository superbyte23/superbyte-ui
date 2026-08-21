@use('SuperbyteUi\Support\Attributes', 'Attr')

@props(['text' => null, 'side' => 'top'])

<span {{ Attr::mergeClass($attributes, 'inline-flex') }}
    data-bs-toggle="tooltip"
    data-bs-placement="{{ $side }}"
    data-bs-title="{{ $text ?? '' }}">
    {{ $slot }}
</span>
