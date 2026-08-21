<?php

namespace SuperbyteUi\Tests\Fixtures;

use Livewire\Component;

class ContactForm extends Component
{
    public string $name = '';

    public string $email = '';

    public function save(): void
    {
        $this->validate([
            'name' => ['required'],
            'email' => ['required', 'email'],
        ]);
    }

    public function render()
    {
        return <<<'BLADE'
            <form wire:submit="save">
                <sb:input wire:model="name" label="Name" />
                <sb:input wire:model="email" type="email" label="Email" />
                <sb:button type="submit">Save</sb:button>
            </form>
        BLADE;
    }
}
