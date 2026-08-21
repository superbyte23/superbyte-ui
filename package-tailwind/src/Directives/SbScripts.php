<?php

namespace SuperbyteUi\Directives;

class SbScripts
{
    public static function render(): string
    {
        $inline = (bool) (config('superbyte-ui.assets.inline') ?? true);

        if ($inline) {
            return '<script data-sb-scripts data-navigate-once>'
                .self::read('../../resources/js/superbyte.js')
                .'</script>';
        }

        return '<script src="'.asset('vendor/superbyte-ui/superbyte.js').'" data-navigate-once></script>';
    }

    protected static function read(string $relative): string
    {
        $path = __DIR__.'/'.$relative;

        return is_file($path) ? file_get_contents($path) : '';
    }
}
