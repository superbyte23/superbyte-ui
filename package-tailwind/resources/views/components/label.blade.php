@use('SuperbyteUi\Support\Attributes', 'Attr')

@props(['for' => null])

<label {{ Attr::mergeClass($attributes, 'form-label') }}{!! $for !== null ? ' for="'.e($for).'"' : '' !!}>
    {{ $slot }}
</label>
