<?php

use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\API\RateController;
use Illuminate\Support\Facades\File;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/post_images/{filename}', function ($filename) {
    $path = storage_path('../public/post_images/' . $filename);
    if (!File::exists($path)) {
        abort(404);
    }
    return response()->file($path);
});
