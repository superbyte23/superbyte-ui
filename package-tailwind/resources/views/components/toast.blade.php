@use('SuperbyteUi\Support\Attributes', 'Attr')

@props([
    'type' => 'success',
    'message' => null,
])

<span {{ Attr::mergeClass($attributes, 'toast-custom', $type) }} role="status" aria-live="polite">
    <sb:icon :name="$type === 'success' ? 'circle-check' : 'circle-x'" :class="$type === 'success' ? 'success' : 'error'" />
    <span>{{ $message ?? $slot }}</span>
</span>
