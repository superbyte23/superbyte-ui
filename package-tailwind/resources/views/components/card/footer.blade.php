@use('SuperbyteUi\Support\Attributes', 'Attr')

<div {{ Attr::mergeClass($attributes, 'flex items-center justify-end gap-2 px-4 pt-4 border-top') }}>
    {{ $slot }}
</div>
