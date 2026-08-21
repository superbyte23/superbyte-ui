<div class="space-y-4">
    <div class="flex flex-wrap items-center gap-2">
        <sb:button wire:click="increment">
            <sb:icon name="plus" /> Increment
        </sb:button>
        <span class="text-sm text-ink-2">
            Count: <strong class="text-ink">{{ $count }}</strong>
        </span>
    </div>

    <div class="flex flex-wrap items-center gap-2">
        <sb:button wire:click="save" wire:target="save" wire:loading.attr="disabled">
            <sb:spinner size="sm" wire:loading wire:target="save" />
            <span wire:loading.remove wire:target="save">Save</span>
            <span wire:loading wire:target="save">Saving…</span>
        </sb:button>

        <sb:button variant="danger" wire:click="resetCount" wire:confirm="Reset the counter to zero?">
            <sb:icon name="trash" /> Reset
        </sb:button>
    </div>
</div>
