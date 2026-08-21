@use('SuperbyteUi\Support\Attributes', 'Attr')

@props(['checked' => false])

@php
    $split = \SuperbyteUi\Support\Attributes::split($attributes, ['class']);
@endphp

<div {{ Attr::mergeClass($split['wrapper'], 'form-check') }}>
    <input type="checkbox" {{ $split['inner']->merge(['class' => 'form-check-input']) }} @if ($checked) checked @endif />
    <label class="form-check-label">{{ $slot }}</label>
</div>
