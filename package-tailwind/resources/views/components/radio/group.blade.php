@use('SuperbyteUi\Support\Attributes', 'Attr')

<div {{ Attr::mergeClass($attributes, 'flex flex-col gap-2') }} role="radiogroup">
    {{ $slot }}
</div>
