<?php

namespace App\Livewire\Docs;

use Livewire\Component;

class ButtonsDemo extends Component
{
    public int $count = 0;

    public function increment(): void
    {
        $this->count++;
    }

    public function save(): void
    {
        sleep(1);
    }

    public function resetCount(): void
    {
        $this->count = 0;
    }

    public function render()
    {
        return view('livewire.docs.buttons-demo');
    }
}
