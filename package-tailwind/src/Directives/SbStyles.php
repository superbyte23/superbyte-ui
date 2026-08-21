<?php

namespace SuperbyteUi\Directives;

class SbStyles
{
    public static function render(): string
    {
        $inline = (bool) (config('superbyte-ui.assets.inline') ?? true);

        if ($inline) {
            return '<style data-sb-styles>'
                .self::read('../../resources/css/tokens-static.css')
                .'</style>';
        }

        return '<link rel="stylesheet" href="'.asset('vendor/superbyte-ui/superbyte.css').'">';
    }

    protected static function read(string $relative): string
    {
        $path = __DIR__.'/'.$relative;

        return is_file($path) ? file_get_contents($path) : '';
    }
}
