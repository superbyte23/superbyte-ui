<?php

namespace SuperbyteUi\Tests;

use Livewire\LivewireServiceProvider;
use Orchestra\Testbench\TestCase as BaseTestCase;
use SuperbyteUi\SuperbyteUiServiceProvider;

abstract class TestCase extends BaseTestCase
{
    protected function getPackageProviders($app): array
    {
        return [
            SuperbyteUiServiceProvider::class,
            LivewireServiceProvider::class,
        ];
    }
}
