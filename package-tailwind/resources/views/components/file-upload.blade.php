@use('SuperbyteUi\Support\Attributes', 'Attr')

@props([
    'label' => null,
    'hint' => null,
    'name' => null,
    'accept' => null,
    'multiple' => false,
])

@php
    $split = \SuperbyteUi\Support\Attributes::split($attributes, ['class']);
@endphp

<div {{ Attr::mergeClass($split['wrapper'], 'w-100') }}>
    @if ($label !== null)
        <sb:label>{{ $label }}</sb:label>
    @endif

    <div data-sb-upload>
        <div class="dropzone">
            <sb:icon name="arrow-up-tray" class="text-lg text-(--text2) mx-auto mb-2" />
            <p class="text-sm font-medium mb-1">Drop files here or <span class="text-(--accent)">browse</span></p>
            @if ($hint !== null)
                <p class="text-sm text-(--text2) mb-0">{{ $hint }}</p>
            @endif
        </div>
        <input type="file" {{ $split['inner']->merge(['name' => $name, 'accept' => $accept]) }} @if ($multiple) multiple @endif class="sr-only" />
        <ul data-sb-files class="mt-2 mb-0 list-none p-0 flex flex-col gap-2"></ul>
    </div>
</div>
