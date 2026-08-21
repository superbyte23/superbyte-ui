<?php

use Livewire\Livewire;
use SuperbyteUi\Tests\Fixtures\ContactForm;

it('forwards wire:model onto the native inputs', function () {
    Livewire::test(ContactForm::class)
        ->assertSeeHtml('wire:model="name"')
        ->assertSeeHtml('wire:model="email"')
        ->assertSeeHtml('name="email"')
        ->assertSeeHtml('<label');
});

it('renders livewire validation errors into sb:error', function () {
    Livewire::test(ContactForm::class)
        ->set('name', '')
        ->set('email', 'not-an-email')
        ->call('save')
        ->assertHasErrors(['name' => 'required'])
        ->assertHasErrors(['email' => 'email'])
        ->assertSee('The email field must be a valid email address.')
        ->assertSeeHtml('role="alert"');
});

it('marks invalid controls with the is-invalid class', function () {
    Livewire::test(ContactForm::class)
        ->set('name', '')
        ->set('email', 'not-an-email')
        ->call('save')
        ->assertSeeHtml('is-invalid');
});

it('persists values through the component', function () {
    Livewire::test(ContactForm::class)
        ->set('name', 'Jane')
        ->set('email', 'jane@example.com')
        ->call('save')
        ->assertHasNoErrors()
        ->assertSet('name', 'Jane')
        ->assertSet('email', 'jane@example.com');
});
