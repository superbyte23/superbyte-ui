@use('SuperbyteUi\Support\Attributes', 'Attr')

@props(['name' => null])

@php
    $message = trim((string) $slot);

    if ($message === '' && $name !== null && isset($errors)) {
        $message = trim((string) $errors->first($name));
    }
@endphp

@if ($message !== '')
    <p {{ Attr::mergeClass($attributes, 'mt-1 text-sm text-(--danger)') }} role="alert">{{ $message }}</p>
@endif
