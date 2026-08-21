@use('SuperbyteUi\Support\Attributes', 'Attr')

<p {{ Attr::mergeClass($attributes, 'form-text') }}>
    {{ $slot }}
</p>
