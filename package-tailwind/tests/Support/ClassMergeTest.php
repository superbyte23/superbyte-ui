<?php

use SuperbyteUi\Support\ClassMerge;

it('deduplicates exact duplicates', function () {
    expect(ClassMerge::merge('px-4', 'px-4'))->toBe('px-4');
});

it('keeps distinct classes in order', function () {
    expect(ClassMerge::merge('btn btn-primary', 'btn-sm'))->toBe('btn btn-primary btn-sm');
});

it('keeps different design-system variants (both kept, last wins in CSS)', function () {
    expect(ClassMerge::merge('btn-primary', 'btn-danger'))->toBe('btn-primary btn-danger');
});

it('resolves spacing conflicts, last wins', function () {
    expect(ClassMerge::merge('p-4', 'p-2'))->toBe('p-2');
    expect(ClassMerge::merge('px-4', 'px-2', 'mb-3'))->toBe('px-2 mb-3');
    expect(ClassMerge::merge('m-4', 'm-0'))->toBe('m-0');
    expect(ClassMerge::merge('gap-4', 'gap-2'))->toBe('gap-2');
});

it('resolves sizing conflicts, last wins', function () {
    expect(ClassMerge::merge('w-64', 'w-full'))->toBe('w-full');
    expect(ClassMerge::merge('max-w-lg', 'max-w-xl'))->toBe('max-w-xl');
    expect(ClassMerge::merge('h-8', 'h-10'))->toBe('h-10');
});

it('resolves text-size and text-color conflicts', function () {
    expect(ClassMerge::merge('text-sm', 'text-lg'))->toBe('text-lg');
    expect(ClassMerge::merge('text-red-500', 'text-blue-500'))->toBe('text-blue-500');
    expect(ClassMerge::merge('text-(--text2)', 'text-(--danger)'))->toBe('text-(--danger)');
});

it('resolves background and border color conflicts', function () {
    expect(ClassMerge::merge('bg-red-500', 'bg-green-500'))->toBe('bg-green-500');
    expect(ClassMerge::merge('bg-(--surface)', 'bg-(--accent)'))->toBe('bg-(--accent)');
    expect(ClassMerge::merge('border-red-500', 'border-blue-500'))->toBe('border-blue-500');
});

it('resolves layout and visibility conflicts', function () {
    expect(ClassMerge::merge('block', 'hidden'))->toBe('hidden');
    expect(ClassMerge::merge('flex', 'inline-flex'))->toBe('inline-flex');
    expect(ClassMerge::merge('items-center', 'items-start'))->toBe('items-start');
    expect(ClassMerge::merge('justify-center', 'justify-between'))->toBe('justify-between');
});

it('resolves rounded, border-width and shadow conflicts', function () {
    expect(ClassMerge::merge('rounded', 'rounded-full'))->toBe('rounded-full');
    expect(ClassMerge::merge('border', 'border-2'))->toBe('border-2');
    expect(ClassMerge::merge('shadow', 'shadow-lg'))->toBe('shadow-lg');
});

it('resolves font-weight conflicts', function () {
    expect(ClassMerge::merge('font-medium', 'font-bold'))->toBe('font-bold');
});

it('respects arbitrary variants as separate groups', function () {
    expect(ClassMerge::merge('p-4', 'md:p-4'))->toBe('p-4 md:p-4');
    expect(ClassMerge::merge('hover:p-4', 'hover:p-2'))->toBe('hover:p-2');
    expect(ClassMerge::merge('dark:bg-red-500', 'dark:bg-blue-500'))->toBe('dark:bg-blue-500');
    expect(ClassMerge::merge('md:block', 'md:hidden'))->toBe('md:hidden');
});

it('deduplicates across many lists', function () {
    expect(ClassMerge::merge(['form-control', 'mb-3'], 'form-control', ''))->toBe('form-control mb-3');
});

it('ignores empty strings and non-strings', function () {
    expect(ClassMerge::merge(['a', ''], 'b', [null]))->toBe('a b');
});

it('accepts arrays and empty strings', function () {
    expect(ClassMerge::merge(['a', ''], 'b'))->toBe('a b');
});
