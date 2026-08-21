<?php

namespace SuperbyteUi;

use Illuminate\View\Compilers\ComponentTagCompiler;

/**
 * Rewrites `<sb:component>` tags into the equivalent Laravel anonymous-component
 * directives, mirroring Laravel's built-in `x-` tag handling.
 *
 * Registered as a Blade precompiler in the service provider so it runs before
 * the stock component-tag pass. Supports opening, self-closing and closing tags.
 *
 * The tag patterns are verbatim copies of Laravel's ComponentTagCompiler patterns
 * (same double-quoted escaping), with the `x` prefix swapped for the configured
 * component prefix.
 */
class SuperbyteTagCompiler extends ComponentTagCompiler
{
    protected string $prefix;

    protected ?array $matches = null;

    public function __construct(array $aliases = [], array $namespaces = [], $blade = null, string $prefix = 'sb')
    {
        parent::__construct($aliases, $namespaces, $blade);

        $this->prefix = $prefix;
    }

    protected function componentExpression(): string
    {
        return $this->prefix.'::'.$this->matches[1];
    }

    protected function compileOpeningTags(string $value): string
    {
        $prefix = preg_quote($this->prefix, '/');

        $pattern = "/
            <
                \s*
                {$prefix}[\:]([\w\-\:\.]*)
                (?<attributes>
                    (?:
                        \s+
                        (?:
                            (?:
                                @(?:class)(\( (?: (?>[^()]+) | (?-1) )* \))
                            )
                            |
                            (?:
                                @(?:style)(\( (?: (?>[^()]+) | (?-1) )* \))
                            )
                            |
                            (?:
                                \{\{\s*\\\$attributes(?:[^}]+?)?\s*\}\}
                            )
                            |
                            (?:
                                (\:\\\$)(\w+)
                            )
                            |
                            (?:
                                [\w\-:.@%]+
                                (
                                    =
                                    (?:
                                        \\\"[^\\\"]*\\\"
                                        |
                                        \'[^\']*\'
                                        |
                                        [^\'\\\"=<>]+
                                    )
                                )?
                            )
                        )
                    )*
                    \s*
                )
                (?<![\/=\-])
            >
        /x";

        return preg_replace_callback($pattern, function (array $matches) {
            $this->matches = $matches;

            $attributes = $this->getAttributesFromAttributeString($matches['attributes']);

            return $this->componentString($this->componentExpression(), $attributes);
        }, $value);
    }

    protected function compileSelfClosingTags(string $value): string
    {
        $prefix = preg_quote($this->prefix, '/');

        $pattern = "/
            <
                \s*
                {$prefix}[\:]([\w\-\:\.]*)
                \s*
                (?<attributes>
                    (?:
                        \s+
                        (?:
                            (?:
                                @(?:class)(\( (?: (?>[^()]+) | (?-1) )* \))
                            )
                            |
                            (?:
                                @(?:style)(\( (?: (?>[^()]+) | (?-1) )* \))
                            )
                            |
                            (?:
                                \{\{\s*\\\$attributes(?:[^}]+?)?\s*\}\}
                            )
                            |
                            (?:
                                (\:\\\$)(\w+)
                            )
                            |
                            (?:
                                [\w\-:.@%]+
                                (
                                    =
                                    (?:
                                        \\\"[^\\\"]*\\\"
                                        |
                                        \'[^\']*\'
                                        |
                                        [^\'\\\"=<>]+
                                    )
                                )?
                            )
                        )
                    )*
                    \s*
                )
            \/>
        /x";

        return preg_replace_callback($pattern, function (array $matches) {
            $this->matches = $matches;

            $attributes = $this->getAttributesFromAttributeString($matches['attributes']);

            if (isset($attributes['slot'])) {
                $slot = $attributes['slot'];
                unset($attributes['slot']);

                return '@slot('.$slot.') '.$this->componentString($this->componentExpression(), $attributes)."\n@endComponentClass##END-COMPONENT-CLASS##".' @endslot';
            }

            return $this->componentString($this->componentExpression(), $attributes)."\n@endComponentClass##END-COMPONENT-CLASS##";
        }, $value);
    }

    protected function compileClosingTags(string $value): string
    {
        $prefix = preg_quote($this->prefix, '/');

        return preg_replace("/<\/\s*{$prefix}[\:][\w\-\:\.]*\s*>/", ' @endComponentClass##END-COMPONENT-CLASS##', $value);
    }
}
