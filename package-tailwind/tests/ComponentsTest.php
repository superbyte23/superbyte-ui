<?php

use Illuminate\Support\Facades\Blade;

it('renders a primary button with merged classes', function () {
    $html = Blade::render('<sb:button class="w-50">Save</sb:button>');

    expect($html)->toContain('<button');
    expect($html)->toContain('type="button"');
    expect($html)->toContain('btn');
    expect($html)->toContain('btn-primary');
    expect($html)->toContain('w-50');
    expect($html)->toContain('>Save</span>');
});

it('renders a button with icons and kbd hint', function () {
    $html = Blade::render('<sb:button icon="plus" icon:trailing="arrow-right" kbd="⌘S">Save</sb:button>');

    expect($html)->toContain('<svg');
    expect($html)->toContain('arrow-right');
    expect($html)->toContain('⌘S');
});

it('honours variant and size', function () {
    $html = Blade::render('<sb:button variant="danger" size="lg">Delete</sb:button>');

    expect($html)->toContain('btn-danger');
    expect($html)->toContain('btn-lg');
});

it('renders a ghost button', function () {
    $html = Blade::render('<sb:button variant="ghost">Cancel</sb:button>');

    expect($html)->toContain('btn-ghost');
});

it('renders icons by name and alias', function () {
    expect(Blade::render('<sb:icon name="check" />'))->toContain('<svg');
    expect(Blade::render('<sb:icon name="search" />'))->toContain('<svg');
    expect(Blade::render('<sb:icon name="does-not-exist" />'))->toBe('');
});

it('renders badge variants', function () {
    $html = Blade::render('<sb:badge variant="danger">Delete</sb:badge>');

    expect($html)->toContain('badge');
    expect($html)->toContain('text-(--danger)');
    expect($html)->toContain('>Delete</span>');
});

it('renders card with header and footer', function () {
    $html = Blade::render(<<<'BLADE'
        <sb:card>
            <sb:card.header title="Settings" description="Prefs">
                <sb:button size="sm">Edit</sb:button>
            </sb:card.header>
            <p>Body</p>
            <sb:card.footer>
                <sb:button size="sm">Save</sb:button>
            </sb:card.footer>
        </sb:card>
    BLADE);

    expect($html)->toContain('card');
    expect($html)->toContain('Settings');
    expect($html)->toContain('Prefs');
    expect($html)->toContain('Body');
    expect($html)->toContain('>Save</span>');
});

it('renders heading levels', function () {
    expect(Blade::render('<sb:heading level="h1">Hello</sb:heading>'))->toContain('<h1');
    expect(Blade::render('<sb:heading level="h3">Hello</sb:heading>'))->toContain('<h3');
    expect(Blade::render('<sb:heading as="div">Hello</sb:heading>'))->toContain('<div');
    expect(Blade::render('<sb:heading level="h1">Hello</sb:heading>'))->toContain('text-3xl');
});

it('renders skeleton with multiple lines', function () {
    $html = Blade::render('<sb:skeleton :lines="3" />');

    expect(substr_count($html, 'skeleton'))->toBe(3);
});

it('renders avatar fallback with initials', function () {
    $html = Blade::render('<sb:avatar initials="SB" size="lg" />');

    expect($html)->toContain('SB');
    expect($html)->toContain('rounded-full');
});

it('renders tooltip and kbd', function () {
    $html = Blade::render('<sb:tooltip text="Copied"><sb:button>Copy</sb:button></sb:tooltip>');

    expect($html)->toContain('data-bs-toggle="tooltip"');
    expect($html)->toContain('data-bs-title="Copied"');
    expect($html)->toContain('Copied');

    expect(Blade::render('<sb:kbd>⌘K</sb:kbd>'))->toContain('<kbd');
});

it('renders a button group', function () {
    $html = Blade::render('<sb:button.group><sb:button>One</sb:button><sb:button>Two</sb:button></sb:button.group>');

    expect($html)->toContain('role="group"');
    expect($html)->toContain('>One</span>');
    expect($html)->toContain('>Two</span>');
});

it('renders a joined button group with flush, equal-height buttons', function () {
    $html = Blade::render('<sb:button.group variant="ghost"><sb:button variant="ghost">A</sb:button><sb:button variant="ghost">B</sb:button></sb:button.group>');

    expect($html)->toContain('inline-flex');
    expect($html)->toContain('items-stretch');
    expect($html)->toContain('[&amp;&gt;*+*]:-ms-px');
    expect($html)->toContain('rounded-s-none');
    expect($html)->toContain('rounded-e-none');
    expect($html)->not->toContain('variant="ghost"');
});

it('stacks the active member of a group above its neighbours', function () {
    $html = Blade::render('<sb:button.group><sb:button variant="ghost">A</sb:button><sb:button variant="ghost" active>B</sb:button></sb:button.group>');

    expect($html)->toContain('[&amp;&gt;*]:relative');
    expect($html)->toContain('[&amp;&gt;*+*]:-ms-px');
    expect($html)->toContain('[&amp;&gt;*.active]:z-[1]');
    expect($html)->toContain('[&amp;&gt;*:hover]:z-[1]');
    expect($html)->toContain('[&amp;&gt;*:focus-visible]:z-[1]');
    expect($html)->toContain('[&amp;&gt;*:active]:z-[1]');
});

it('maps the active attribute to the active class', function () {
    $html = Blade::render('<sb:button active>Save</sb:button>');
    $ghost = Blade::render('<sb:button variant="ghost" active>Day</sb:button>');
    $outline = Blade::render('<sb:button variant="outline" active>1</sb:button>');

    expect($html)->toContain('active');
    expect($ghost)->toContain('btn-ghost active');
    expect($outline)->toContain('btn-outline-secondary active');
});

it('renders a square icon-only button', function () {
    $html = Blade::render('<sb:button variant="ghost" icon="trash" aria-label="Delete" square></sb:button>');

    expect($html)->toContain('btn-square');
    expect($html)->toContain('btn-ghost');
    expect($html)->toContain('aria-label="Delete"');
});

it('omits the empty slot wrapper for icon-only buttons', function () {
    $html = Blade::render('<sb:button variant="ghost" icon="trash" square></sb:button>');

    expect($html)->toContain('lucide-trash-2') // sanity: icon present
        ->and($html)->not->toContain('<span class="inline-flex items-center gap-2"></span>');
});

it('renders a badge slot as a direct (unwrapped) child', function () {
    $html = Blade::render('<sb:button variant="ghost" icon="bell" square><x-slot name="badge"><span class="ping">3</span></x-slot></sb:button>');

    expect($html)->toContain('btn-square')
        ->and($html)->toContain('<span class="ping">3</span>')
        ->and($html)->toMatch('/<button[^>]*>.*?<span class="ping">3<\/span>\s*<\/button>/s')
        ->and($html)->not->toContain('inline-flex items-center gap-2');
});

it('renders the slot wrapper as display:contents so absolute badges do not shift the icon', function () {
    $html = Blade::render('<sb:button variant="ghost" icon="bell" square><span class="ping">3</span></sb:button>');

    expect($html)->toContain('<span class="contents"><span class="ping">3</span></span>')
        ->and($html)->not->toContain('inline-flex items-center gap-2');
});

it('renders input shorthand with label and error slot', function () {
    $html = Blade::render('<sb:input name="email" label="Email" wire:model="email" type="email" />');

    expect($html)->toContain('<label');
    expect($html)->toContain('Email');
    expect($html)->toContain('for="email"');
    expect($html)->toContain('<input');
    expect($html)->toContain('class="form-control');
    expect($html)->toContain('name="email"');
    expect($html)->toContain('type="email"');
    expect($html)->toContain('wire:model="email"');
});

it('renders a bare input when no name or label', function () {
    $html = Blade::render('<sb:input wire:model="query" placeholder="Search..." />');

    expect($html)->toContain('<input');
    expect($html)->toContain('wire:model="query"');
    expect($html)->not->toContain('<label');
});

it('forwards the consumer class onto the native input', function () {
    $html = Blade::render('<sb:input name="q" class="bg-(--surface-2)" />');

    expect($html)->toContain('bg-(--surface-2)');
    expect($html)->toContain('form-control');
});

it('marks the control invalid when an error is present', function () {
    $html = Blade::render('<sb:input name="email" label="Email" error="Invalid" />');

    expect($html)->toContain('is-invalid');
    expect($html)->toContain('Invalid');
});

it('renders shorthand and long-form equivalently', function () {
    $short = Blade::render('<sb:input name="email" label="Email" wire:model="email" />');
    $long = Blade::render('<sb:field><sb:label for="email">Email</sb:label><sb:input wire:model="email" name="email" /><sb:error name="email" /></sb:field>');

    expect($short)->toContain('Email');
    expect($long)->toContain('Email');
    expect($short)->toContain('wire:model="email"');
    expect($long)->toContain('wire:model="email"');
});

it('renders textarea, select, checkbox and switch', function () {
    expect(Blade::render('<sb:textarea name="bio" label="Bio" />'))->toContain('<textarea');

    $select = Blade::render('<sb:select name="role"><option>Admin</option></sb:select>');
    expect($select)->toContain('<select');
    expect($select)->toContain('form-select');
    expect($select)->toContain('<option>Admin</option>');

    $checkbox = Blade::render('<sb:checkbox name="terms" wire:model="terms">Accept</sb:checkbox>');
    expect($checkbox)->toContain('type="checkbox"');
    expect($checkbox)->toContain('form-check-input');
    expect($checkbox)->toContain('wire:model="terms"');
    expect($checkbox)->toContain('<label');

    $switch = Blade::render('<sb:switch>Enable</sb:switch>');
    expect($switch)->toContain('form-switch');
    expect($switch)->toContain('role="switch"');
});

it('renders checkbox and radio groups', function () {
    $html = Blade::render(<<<'BLADE'
        <sb:checkbox.group>
            <sb:checkbox name="a" wire:model="a">A</sb:checkbox>
            <sb:checkbox name="b" wire:model="b">B</sb:checkbox>
        </sb:checkbox.group>
    BLADE);

    expect($html)->toContain('role="group"');
    expect($html)->toContain('wire:model="a"');
    expect($html)->toContain('wire:model="b"');

    $radios = Blade::render('<sb:radio.group><sb:radio name="color" value="red" wire:model="color">Red</sb:radio></sb:radio.group>');
    expect($radios)->toContain('role="radiogroup"');
    expect($radios)->toContain('type="radio"');
    expect($radios)->toContain('value="red"');
});

it('renders file upload', function () {
    $html = Blade::render('<sb:file-upload name="doc" hint="PDF up to 10MB" />');

    expect($html)->toContain('type="file"');
    expect($html)->toContain('name="doc"');
    expect($html)->toContain('data-sb-upload');
    expect($html)->toContain('dropzone');
    expect($html)->toContain('Drop files here');
});

it('renders text and separator', function () {
    expect(Blade::render('<sb:text>Body</sb:text>'))->toContain('Body');

    expect(Blade::render('<sb:separator />'))->toContain('role="separator"');
    expect(Blade::render('<sb:separator label="Or" />'))->toContain('Or');
});

it('renders brand and avatar with image', function () {
    $brand = Blade::render('<sb:brand name="Superbyte"><sb:icon name="gift" /></sb:brand>');
    expect($brand)->toContain('Superbyte');
    expect($brand)->toContain('<svg');

    $avatar = Blade::render('<sb:avatar src="/img/user.jpg" alt="Admin" />');
    expect($avatar)->toContain('<img');
    expect($avatar)->toContain('src="/img/user.jpg"');
    expect($avatar)->toContain('alt="Admin"');
});

it('renders a modal with title, body and footer', function () {
    $html = Blade::render(<<<'BLADE'
        <sb:modal title="Confirm" icon="circle-alert">
            Are you sure?
            <x-slot:footer>
                <sb:button variant="outline" data-bs-dismiss="modal">Cancel</sb:button>
                <sb:button>Delete</sb:button>
            </x-slot:footer>
        </sb:modal>
    BLADE);

    expect($html)->toContain('modal');
    expect($html)->toContain('role="dialog"');
    expect($html)->toContain('aria-modal="true"');
    expect($html)->toContain('Confirm');
    expect($html)->toContain('Are you sure?');
    expect($html)->toContain('modal-footer');
    expect($html)->toContain('data-bs-dismiss="modal"');
});

it('renders a dropdown with menu', function () {
    $html = Blade::render(<<<'BLADE'
        <sb:dropdown label="Actions">
            <button class="dropdown-item" type="button">Edit</button>
            <button class="dropdown-item text-danger" type="button">Delete</button>
        </sb:dropdown>
    BLADE);

    expect($html)->toContain('dropdown');
    expect($html)->toContain('data-bs-toggle="dropdown"');
    expect($html)->toContain('dropdown-menu');
    expect($html)->toContain('>Edit</button>');
});

it('renders an alert', function () {
    $html = Blade::render('<sb:alert variant="danger" title="Oops">Something broke.</sb:alert>');

    expect($html)->toContain('alert-danger');
    expect($html)->toContain('alert-heading');
    expect($html)->toContain('Oops');
    expect($html)->toContain('Something broke.');
});

it('renders a toast', function () {
    $html = Blade::render('<sb:toast type="success">Saved</sb:toast>');

    expect($html)->toContain('toast-custom');
    expect($html)->toContain('success');
    expect($html)->toContain('Saved');
});
