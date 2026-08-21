@use('SuperbyteUi\Support\Attributes', 'Attr')

<div {{ Attr::mergeClass($attributes, 'flex flex-col gap-2') }} role="group">
    {{ $slot }}
</div>
