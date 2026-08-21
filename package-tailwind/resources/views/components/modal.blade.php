@use('SuperbyteUi\Support\Attributes', 'Attr')

@props([
    'id' => null,
    'title' => null,
    'icon' => null,
    'size' => null,
    'centered' => false,
    'show' => false,
    'dismissible' => true,
])

@php
    $id = $id ?? 'sb-modal-'.bin2hex(random_bytes(4));

    $sizeClass = match ($size) {
        'sm' => 'modal-sm',
        'lg' => 'modal-lg',
        'xl' => 'modal-xl',
        default => '',
    };
@endphp

<div {{ Attr::mergeClass($attributes, 'modal', $show ? 'open' : '') }}
    id="{{ $id }}"
    role="dialog"
    aria-modal="true"
    @if ($title !== null) aria-labelledby="{{ $id }}-title" @endif>
    <div class="modal-dialog {{ $sizeClass }} {{ $centered ? 'modal-dialog-centered' : '' }}">
        <div class="modal-content">
            @if ($title !== null || $dismissible)
                <div class="modal-header">
                    @if ($title !== null)
                        <h3 class="modal-title" id="{{ $id }}-title">
                            @if ($icon !== null)
                                <span class="modal-icon">
                                    <sb:icon :name="$icon" class="icon-sz-15" />
                                </span>
                            @endif
                            {{ $title }}
                        </h3>
                    @endif
                    @if ($dismissible)
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            <sb:icon name="x" class="icon-sz-15" />
                        </button>
                    @endif
                </div>
            @endif

            @if (trim((string) $slot) !== '')
                <div class="modal-body">{{ $slot }}</div>
            @endif

            @if (trim((string) $footer) !== '')
                <div class="modal-footer">{{ $footer }}</div>
            @endif
        </div>
    </div>
</div>
