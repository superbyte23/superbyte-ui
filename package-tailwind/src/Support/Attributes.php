<?php

namespace SuperbyteUi\Support;

use Illuminate\Support\Arr;
use Illuminate\View\ComponentAttributeBag;

class Attributes
{
    /**
     * Split an attribute bag into a wrapper bag and an inner bag.
     *
     * Keys listed in $wrapperKeys (default: 'class') stay on the wrapper element;
     * everything else (wire:model, x-model, name, type, disabled, autofocus, ...)
     * is forwarded to the inner element.
     *
     * @return array{wrapper: ComponentAttributeBag, inner: ComponentAttributeBag}
     */
    public static function split(ComponentAttributeBag $attributes, string|array $wrapperKeys = ['class']): array
    {
        $wrapperKeys = Arr::wrap($wrapperKeys);

        return [
            'wrapper' => new ComponentAttributeBag($attributes->only($wrapperKeys)->getAttributes()),
            'inner' => new ComponentAttributeBag($attributes->except($wrapperKeys)->getAttributes()),
        ];
    }

    /**
     * Merge a set of component classes with the consumer's own `class`
     * attribute using Tailwind conflict resolution (consumer classes win).
     */
    public static function mergeClass(ComponentAttributeBag $attributes, string ...$classes): ComponentAttributeBag
    {
        $all = array_merge($classes, [(string) $attributes->get('class')]);

        return $attributes->class(ClassMerge::merge(...$all));
    }
}
