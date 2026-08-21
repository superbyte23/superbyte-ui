<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::view('/docs', 'docs');

Route::view('/docs/introduction', 'docs.introduction');

Route::view('/docs/installation', 'docs.installation');

Route::view('/docs/theming', 'docs.theming');

Route::view('/docs/dark-mode', 'docs.dark-mode');

Route::view('/docs/patterns', 'docs.patterns');

Route::view('/docs/buttons', 'docs.buttons');

Route::view('/docs/colors', 'docs.colors');
