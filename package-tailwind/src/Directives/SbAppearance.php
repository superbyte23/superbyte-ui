<?php

namespace SuperbyteUi\Directives;

class SbAppearance
{
    public static function render(): string
    {
        $appearance = (array) config('superbyte-ui.appearance', []);

        $key = (string) ($appearance['theme_key'] ?? 'grid_admin_theme');
        $default = (string) ($appearance['default_theme'] ?? 'dark');

        $prefs = json_encode([
            'key' => $key,
            'theme' => in_array($default, ['light', 'dark', 'system'], true) ? $default : 'dark',
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

        $script = self::read('../../resources/js/pre-paint.js');

        // Pre-paint must run before first paint: always emitted inline.
        return '<script data-sb-appearance data-navigate-once>window.SuperbyteUiPrefs = '.$prefs.';</script>'
            .'<script data-sb-pre-paint data-navigate-once>'
            .$script
            .'</script>';
    }

    protected static function read(string $relative): string
    {
        $path = __DIR__.'/'.$relative;

        return is_file($path) ? file_get_contents($path) : '';
    }
}
