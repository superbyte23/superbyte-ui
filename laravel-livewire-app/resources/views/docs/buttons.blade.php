@extends('layouts.docs', ['title' => 'Button — Component Docs'])

@section('content')
    {{-- Page header --}}
    <section>
        <sb:heading level="h1" class="mt-4">Buttons</sb:heading>
        <p class="mt-2 max-w-2xl text-ink-2">
            Six variants, three sizes, optional leading/trailing icons and keyboard hints.
            Render with <code class="kbd">&lt;sb:button&gt;</code> — any extra attribute
            (<code class="kbd">id</code>, <code class="kbd">class</code>, <code class="kbd">disabled</code>,
            <code class="kbd">onclick</code>, <code class="kbd">data-sb-*</code>, …) passes through to the
            underlying <code class="kbd">&lt;button&gt;</code>.
        </p>
    </section>

    {{-- Variants --}}
    <section>
        <div class="space-y-4">
            <x-docs.demo title="Variants"
                description="primary is the default; soft and link are accent-tinted alternatives.">
                <div class="flex flex-wrap gap-2">
                    <sb:button>Primary</sb:button>
                    <sb:button variant="secondary">Secondary</sb:button>
                    <sb:button variant="ghost">Ghost</sb:button>
                    <sb:button variant="outline">Outline</sb:button>
                    <sb:button variant="danger">Danger</sb:button>
                    <sb:button variant="soft">Soft</sb:button>
                    <sb:button variant="link">Link</sb:button>
                </div>
                <x-slot name="code">
@verbatim
<sb:button>Primary</sb:button>
<sb:button variant="secondary">Secondary</sb:button>
<sb:button variant="ghost">Ghost</sb:button>
<sb:button variant="outline">Outline</sb:button>
<sb:button variant="danger">Danger</sb:button>
<sb:button variant="soft">Soft</sb:button>
<sb:button variant="link">Link</sb:button>
@endverbatim
                </x-slot>
            </x-docs.demo>

            <x-docs.demo title="Sizes" description="sm, md (default) and lg.">
                <div class="flex flex-wrap items-center gap-2">
                    <sb:button size="sm">Small</sb:button>
                    <sb:button>Medium</sb:button>
                    <sb:button size="lg">Large</sb:button>
                </div>
                <x-slot name="code">
@verbatim
<sb:button size="sm">Small</sb:button>
<sb:button>Medium</sb:button>
<sb:button size="lg">Large</sb:button>
@endverbatim
                </x-slot>
            </x-docs.demo>

            <x-docs.demo title="Icons" description="Leading icon, trailing icon, or icon-only (square).">
                <div class="flex flex-wrap items-center gap-2">
                    <sb:button variant="primary" icon="plus">Create</sb:button>
                    <sb:button variant="outline" iconTrailing="arrow-right">Continue</sb:button>
                    <sb:button variant="secondary" icon="settings" iconTrailing="chevron-down">Options</sb:button>
                    <sb:button variant="ghost" icon="trash" aria-label="Delete" square></sb:button>
                    <sb:button variant="ghost" icon="bell" aria-label="Notifications" square><span
                            class="ping">3</span></sb:button>
                </div>
                <x-slot name="code">
@verbatim
<sb:button variant="primary" icon="plus">Create</sb:button>
<sb:button variant="outline" iconTrailing="arrow-right">Continue</sb:button>
<sb:button variant="secondary" icon="settings" iconTrailing="chevron-down">Options</sb:button>
<sb:button variant="ghost" icon="trash" aria-label="Delete" square></sb:button>
<sb:button variant="ghost" icon="bell" aria-label="Notifications" square><span class="ping">3</span></sb:button>
@endverbatim
                </x-slot>
            </x-docs.demo>

            <x-docs.demo title="Keyboard hint" description="A kbd hint pinned to the end of the button.">
                <div class="flex flex-wrap items-center gap-2">
                    <sb:button variant="ghost" icon="search" kbd="⌘K">Search</sb:button>
                    <sb:button variant="outline" iconTrailing="check" kbd="⌘S">Save all</sb:button>
                </div>
                <x-slot name="code">
@verbatim
<sb:button variant="ghost" icon="search" kbd="⌘K">Search</sb:button>
<sb:button variant="outline" iconTrailing="check" kbd="⌘S">Save all</sb:button>
@endverbatim
                </x-slot>
            </x-docs.demo>
        </div>
    </section>

    {{-- Groups & states --}}
    <section>
        <div class="space-y-4">
            <x-docs.demo title="Button group"
                description="Buttons sit flush at equal height. Mark the active item with the active class (or aria-pressed).">
                <div class="flex flex-wrap items-center gap-4">
                    <sb:button.group>
                        <sb:button variant="ghost" active>Day</sb:button>
                        <sb:button variant="ghost">Week</sb:button>
                        <sb:button variant="ghost">Month</sb:button>
                    </sb:button.group>
                    <sb:button.group>
                        <sb:button variant="outline" icon="arrow-left" aria-label="Previous" square></sb:button>
                        <sb:button variant="outline" active>1</sb:button>
                        <sb:button variant="outline" icon="arrow-right" aria-label="Next" square></sb:button>
                    </sb:button.group>
                </div>
                <x-slot name="code">
@verbatim
<sb:button.group>
  <sb:button variant="ghost" active>Day</sb:button>
  <sb:button variant="ghost">Week</sb:button>
  <sb:button variant="ghost">Month</sb:button>
</sb:button.group>

<sb:button.group>
  <sb:button variant="outline" icon="arrow-left" aria-label="Previous" square></sb:button>
  <sb:button variant="outline" active>1</sb:button>
  <sb:button variant="outline" icon="arrow-right" aria-label="Next" square></sb:button>
</sb:button.group>
@endverbatim
                </x-slot>
            </x-docs.demo>

            <x-docs.demo title="Disabled"
                description="Not clickable, tab-focus is skipped, and the active/locked styling is muted.">
                <div class="flex flex-wrap items-center gap-2">
                    <sb:button disabled>Disabled</sb:button>
                    <sb:button variant="outline" disabled icon="lock">Locked</sb:button>
                </div>
                <x-slot name="code">
@verbatim
<sb:button disabled>Disabled</sb:button>
<sb:button variant="outline" disabled icon="lock">Locked</sb:button>
@endverbatim
                </x-slot>
            </x-docs.demo>

            <x-docs.demo title="Loading"
                description="A spinner-prefixed loading state; combine with wire:loading on Livewire for a reactive busy state.">
                <div class="flex flex-wrap items-center gap-2">
                    <sb:button disabled>
                        <sb:spinner size="sm" /> Saving…
                    </sb:button>
                </div>
                <x-slot name="code">
@verbatim
<sb:button disabled>
  <sb:spinner size="sm"/> Saving…
</sb:button>
@endverbatim
                </x-slot>
            </x-docs.demo>

            <x-docs.demo title="Full width" description="Block-level button that fills its container.">
                <div class="flex flex-wrap items-center gap-2">
                    <sb:button class="w-full">Full width</sb:button>
                </div>
                <x-slot name="code">
@verbatim
<sb:button class="w-full">Full width</sb:button>
@endverbatim
                </x-slot>
            </x-docs.demo>
        </div>
    </section>

    {{-- Livewire --}}
    <section>
        <x-docs.demo title="Livewire"
            description="wire: attributes pass straight through to the native button — wire:click, wire:loading, wire:target and wire:confirm work as-is.">
            <livewire:docs.buttons-demo />
            <x-slot name="code">
@verbatim
<sb:button wire:click="increment">
    <sb:icon name="plus" /> Increment
</sb:button>

<sb:button wire:click="save" wire:target="save" wire:loading.attr="disabled">
    <sb:spinner size="sm" wire:loading wire:target="save" />
    <span wire:loading.remove wire:target="save">Save</span>
    <span wire:loading wire:target="save">Saving…</span>
</sb:button>

<sb:button variant="danger" wire:click="resetCount" wire:confirm="Reset the counter to zero?">
    <sb:icon name="trash" /> Reset
</sb:button>
@endverbatim
            </x-slot>
        </x-docs.demo>
    </section>

    {{-- Props --}}
    <section>
        <x-docs.demo title="Props"
            description="Props for the button component and the button group component. All other attributes are forwarded to the underlying element.">
            <h4 class="text-sm font-semibold text-ink mb-2">Button props</h4>
            <div class="overflow-x-auto">
                <table class="w-full border-collapse text-sm">
                    <thead>
                        <tr class="text-left text-ink-3">
                            <th class="border-b border-line py-2 pr-4 font-medium">Prop</th>
                            <th class="border-b border-line py-2 pr-4 font-medium">Type</th>
                            <th class="border-b border-line py-2 pr-4 font-medium">Default</th>
                            <th class="border-b border-line py-2 font-medium">Description</th>
                        </tr>
                    </thead>
                    <tbody class="text-ink-2">
                        <tr>
                            <td class="border-b border-line py-2 pr-4 text-ink"><code class="kbd">variant</code></td>
                            <td class="border-b border-line py-2 pr-4">string</td>
                            <td class="border-b border-line py-2 pr-4"><code class="kbd">primary</code></td>
                            <td class="border-b border-line py-2">primary · secondary · ghost · outline · danger · soft ·
                                link</td>
                        </tr>
                        <tr>
                            <td class="border-b border-line py-2 pr-4 text-ink"><code class="kbd">size</code></td>
                            <td class="border-b border-line py-2 pr-4">string</td>
                            <td class="border-b border-line py-2 pr-4"><code class="kbd">md</code></td>
                            <td class="border-b border-line py-2">sm · md · lg</td>
                        </tr>
                        <tr>
                            <td class="border-b border-line py-2 pr-4 text-ink"><code class="kbd">icon</code></td>
                            <td class="border-b border-line py-2 pr-4">string|null</td>
                            <td class="border-b border-line py-2 pr-4">—</td>
                            <td class="border-b border-line py-2">Leading icon name</td>
                        </tr>
                        <tr>
                            <td class="border-b border-line py-2 pr-4 text-ink"><code class="kbd">iconTrailing</code>
                            </td>
                            <td class="border-b border-line py-2 pr-4">string|null</td>
                            <td class="border-b border-line py-2 pr-4">—</td>
                            <td class="border-b border-line py-2">Trailing icon name</td>
                        </tr>
                        <tr>
                            <td class="border-b border-line py-2 pr-4 text-ink"><code class="kbd">kbd</code></td>
                            <td class="border-b border-line py-2 pr-4">string|null</td>
                            <td class="border-b border-line py-2 pr-4">—</td>
                            <td class="border-b border-line py-2">Keyboard shortcut hint</td>
                        </tr>
                        <tr>
                            <td class="border-b border-line py-2 pr-4 text-ink"><code class="kbd">type</code></td>
                            <td class="border-b border-line py-2 pr-4">string</td>
                            <td class="border-b border-line py-2 pr-4"><code class="kbd">button</code></td>
                            <td class="border-b border-line py-2">button · submit · reset</td>
                        </tr>
                        <tr>
                            <td class="border-b border-line py-2 pr-4 text-ink"><code class="kbd">square</code></td>
                            <td class="border-b border-line py-2 pr-4">bool</td>
                            <td class="border-b border-line py-2 pr-4"><code class="kbd">false</code></td>
                            <td class="border-b border-line py-2">Icon-only button with equal width and height</td>
                        </tr>
                        <tr>
                            <td class="border-b border-line py-2 pr-4 text-ink"><code class="kbd">active</code></td>
                            <td class="border-b border-line py-2 pr-4">bool</td>
                            <td class="border-b border-line py-2 pr-4"><code class="kbd">false</code></td>
                            <td class="border-b border-line py-2">Adds the <code class="kbd">active</code> class
                                (selected state, e.g. in button groups)</td>
                        </tr>
                        <tr>
                            <td class="border-b border-line py-2 pr-4 text-ink"><code class="kbd">badge</code></td>
                            <td class="border-b border-line py-2 pr-4">slot</td>
                            <td class="border-b border-line py-2 pr-4">—</td>
                            <td class="border-b border-line py-2">Floating content rendered as a direct button child (e.g.
                                a count badge), positioned over the top-right corner</td>
                        </tr>
                        <tr>
                            <td class="border-b border-line py-2 pr-4 text-ink"><code class="kbd">slot</code></td>
                            <td class="border-b border-line py-2 pr-4">slot</td>
                            <td class="border-b border-line py-2 pr-4">—</td>
                            <td class="border-b border-line py-2">Button label / content</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h4 class="text-sm font-semibold text-ink mb-2 mt-6">Button group props</h4>
            <div class="overflow-x-auto">
                <table class="w-full border-collapse text-sm">
                    <thead>
                        <tr class="text-left text-ink-3">
                            <th class="border-b border-line py-2 pr-4 font-medium">Prop</th>
                            <th class="border-b border-line py-2 pr-4 font-medium">Type</th>
                            <th class="border-b border-line py-2 pr-4 font-medium">Default</th>
                            <th class="border-b border-line py-2 font-medium">Description</th>
                        </tr>
                    </thead>
                    <tbody class="text-ink-2">
                        <tr>
                            <td class="border-b border-line py-2 pr-4 text-ink"><code class="kbd">variant</code></td>
                            <td class="border-b border-line py-2 pr-4">string</td>
                            <td class="border-b border-line py-2 pr-4">—</td>
                            <td class="border-b border-line py-2">Accepted but ignored — set <code
                                    class="kbd">variant</code> on each child button</td>
                        </tr>
                        <tr>
                            <td class="border-b border-line py-2 pr-4 text-ink"><code class="kbd">size</code></td>
                            <td class="border-b border-line py-2 pr-4">string</td>
                            <td class="border-b border-line py-2 pr-4">—</td>
                            <td class="border-b border-line py-2">Accepted but ignored — set <code
                                    class="kbd">size</code> on each child button</td>
                        </tr>
                        <tr>
                            <td class="border-b border-line py-2 pr-4 text-ink"><code class="kbd">slot</code></td>
                            <td class="border-b border-line py-2 pr-4">slot</td>
                            <td class="border-b border-line py-2 pr-4">—</td>
                            <td class="border-b border-line py-2">The child buttons</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </x-docs.demo>
    </section>
@endsection
