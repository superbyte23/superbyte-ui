<?php

use Illuminate\View\ComponentAttributeBag;
use SuperbyteUi\Support\Attributes;
use SuperbyteUi\Support\ClassMerge;

it('splits class onto the wrapper and behavior onto the inner', function () {
    $bag = new ComponentAttributeBag([
        'class' => 'my-class',
        'wire:model' => 'email',
        'name' => 'email',
        'disabled' => 'disabled',
    ]);

    $split = Attributes::split($bag);

    expect($split['wrapper']->get('class'))->toBe('my-class');
    expect($split['wrapper']->get('wire:model'))->toBeNull();
    expect($split['inner']->get('wire:model'))->toBe('email');
    expect($split['inner']->get('name'))->toBe('email');
    expect($split['inner']->get('disabled'))->toBe('disabled');
    expect($split['inner']->get('class'))->toBeNull();
});

it('allows extra wrapper keys', function () {
    $bag = new ComponentAttributeBag([
        'class' => 'wrapper-class',
        'id' => 'inner-id',
        'autofocus' => 'autofocus',
    ]);

    $split = Attributes::split($bag, ['class', 'id']);

    expect($split['wrapper']->get('class'))->toBe('wrapper-class');
    expect($split['wrapper']->get('id'))->toBe('inner-id');
    expect($split['inner']->get('autofocus'))->toBe('autofocus');
});

it('mergeClass merges component classes with the consumer class', function () {
    $bag = new ComponentAttributeBag(['class' => 'mb-3 w-50', 'id' => 'email']);

    $merged = Attributes::mergeClass($bag, 'form-control');

    expect($merged->get('id'))->toBe('email');
    expect($merged->get('class'))->toContain('form-control');
    expect($merged->get('class'))->toContain('mb-3');
    expect($merged->get('class'))->toContain('w-50');
    expect(ClassMerge::merge($merged->get('class'), 'form-control'))->toContain('form-control');
});
