@use('SuperbyteUi\Support\Attributes', 'Attr')

@props(['lines' => 1])

@if ($lines > 1)
    <div {{ Attr::mergeClass($attributes, 'grid gap-2') }} aria-hidden="true">
        @for ($i = 0; $i < $lines; $i++)
            <span class="skeleton w-100" style="height: 14px"></span>
        @endfor
    </div>
@else
    <span {{ Attr::mergeClass($attributes, 'skeleton w-100') }} style="height: 14px" aria-hidden="true"></span>
@endif
