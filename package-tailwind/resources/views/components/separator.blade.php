@use('SuperbyteUi\Support\Attributes', 'Attr')

@props(['label' => null])

@if ($label !== null)
    <div {{ Attr::mergeClass($attributes, 'flex items-center gap-3 text-sm uppercase font-medium text-(--text2)') }}>
        <span class="flex-1 border-top"></span>
        <span>{{ $label }}</span>
        <span class="flex-1 border-top"></span>
    </div>
@else
    <div {{ Attr::mergeClass($attributes, 'border-top') }} role="separator"></div>
@endif
