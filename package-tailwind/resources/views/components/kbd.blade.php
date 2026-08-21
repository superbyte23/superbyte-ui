@use('SuperbyteUi\Support\Attributes', 'Attr')

<kbd {{ Attr::mergeClass($attributes, 'kbd inline-flex items-center') }}>
    {{ $slot }}
</kbd>
