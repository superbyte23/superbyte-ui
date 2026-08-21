<?php

namespace SuperbyteUi;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;
use SuperbyteUi\Directives\SbAppearance;
use SuperbyteUi\Directives\SbScripts;
use SuperbyteUi\Directives\SbStyles;

class SuperbyteUiServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->mergeConfigFrom(__DIR__.'/../config/superbyte-ui.php', 'superbyte-ui');

        $this->loadViewsFrom(__DIR__.'/../resources/views', 'superbyte-ui');

        $this->registerComponentNamespace();
        $this->registerTagCompiler();
        $this->registerDirectives();
        $this->registerPublishing();
    }

    protected function registerTagCompiler(): void
    {
        $prefix = (string) ($this->app['config']['superbyte-ui.prefix'] ?? 'sb');

        $compiler = new SuperbyteTagCompiler(
            app('blade.compiler')->getClassComponentAliases(),
            app('blade.compiler')->getClassComponentNamespaces(),
            app('blade.compiler'),
            $prefix,
        );

        app('blade.compiler')->precompiler(static function ($input) use ($compiler) {
            return $compiler->compile($input);
        });
    }

    protected function registerComponentNamespace(): void
    {
        $prefix = (string) ($this->app['config']['superbyte-ui.prefix'] ?? 'sb');

        // Published overrides win when present (php artisan vendor:publish --tag=superbyte-ui-views).
        if (is_dir(resource_path('views/vendor/superbyte-ui/components'))) {
            $this->loadViewsFrom(resource_path('views/vendor/superbyte-ui'), 'superbyte-ui-override');
            Blade::anonymousComponentNamespace('superbyte-ui-override::components', $prefix);
        } else {
            Blade::anonymousComponentNamespace('superbyte-ui::components', $prefix);
        }
    }

    protected function registerDirectives(): void
    {
        Blade::directive('sbAppearance', static function () {
            return '<?php echo \SuperbyteUi\Directives\SbAppearance::render(); ?>';
        });

        Blade::directive('sbStyles', static function () {
            return '<?php echo \SuperbyteUi\Directives\SbStyles::render(); ?>';
        });

        Blade::directive('sbScripts', static function () {
            return '<?php echo \SuperbyteUi\Directives\SbScripts::render(); ?>';
        });
    }

    protected function registerPublishing(): void
    {
        $this->publishes([
            __DIR__.'/../config/superbyte-ui.php' => $this->app->configPath('superbyte-ui.php'),
        ], 'superbyte-ui-config');

        $this->publishes([
            __DIR__.'/../resources/views/components' => resource_path('views/vendor/superbyte-ui/components'),
        ], 'superbyte-ui-views');

        $this->publishes([
            __DIR__.'/../resources/css/tokens-static.css' => public_path('vendor/superbyte-ui/superbyte.css'),
            __DIR__.'/../resources/js/pre-paint.js' => public_path('vendor/superbyte-ui/pre-paint.js'),
            __DIR__.'/../resources/js/superbyte.js' => public_path('vendor/superbyte-ui/superbyte.js'),
            __DIR__.'/../resources/fonts' => public_path('vendor/superbyte-ui/fonts'),
        ], 'superbyte-ui-assets');

        $this->publishes([
            __DIR__.'/../resources/css/superbyte-ui.css' => resource_path('css/vendor/superbyte-ui/superbyte-ui.css'),
            __DIR__.'/../resources/css/tokens.css' => resource_path('css/vendor/superbyte-ui/tokens.css'),
            __DIR__.'/../resources/css/fonts.css' => resource_path('css/vendor/superbyte-ui/fonts.css'),
            __DIR__.'/../resources/fonts' => resource_path('css/vendor/superbyte-ui/fonts'),
        ], 'superbyte-ui-css');
    }
}
