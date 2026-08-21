@props(['name' => null])

<div {{ $attributes->merge(['class' => 'mb-3 min-w-0']) }}>
    {{ $slot }}
</div>
