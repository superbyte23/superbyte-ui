@use('SuperbyteUi\Support\Attributes', 'Attr')

@props([
    'label' => null,
    'hint' => null,
    'name' => null,
    'error' => null,
])

@php
    $explicitName = $name;
    $name = $explicitName ?? $attributes->get('wire:model');

    $hasError = $error !== null || ($name !== null && isset($errors) && $errors->has($name));
    $classes = \SuperbyteUi\Support\ClassMerge::merge(
        'form-select',
        $hasError ? 'is-invalid' : '',
        (string) $attributes->get('class'),
    );

    $wrapped = $explicitName !== null || $label !== null || $error !== null;
@endphp

@if ($wrapped)
    <div class="mb-3">
        @if ($label !== null || $name !== null)
            <sb:label :for="$name">{{ $label ?? \Illuminate\Support\Str::headline($name) }}</sb:label>
        @endif

        <select {{ $attributes->except(['class'])->merge(['name' => $name])->class($classes) }}>{{ $slot }}</select>

        @if ($hint !== null)
            <sb:description>{{ $hint }}</sb:description>
        @endif

        @if ($error !== null)
            <sb:error>{{ $error }}</sb:error>
        @elseif ($name !== null)
            <sb:error :name="$name" />
        @endif
    </div>
@else
    <select {{ $attributes->except(['class'])->merge(['name' => $name])->class($classes) }}>{{ $slot }}</select>
@endif
