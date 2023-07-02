<?php

use App\Http\Controllers\userController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\API\RateController;
use Illuminate\Support\Facades\File;


Route::get('/', function () {

    return view('home');
})->middleware(['check','verified']);


Auth::routes([
    'verify'=>true
]);

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/user',[userController::class,'index'])->name('user');
 

//     return view('welcome');
// });

Route::get('/post_images/{filename}', function ($filename) {
    $path = storage_path('../public/post_images/' . $filename);
    if (!File::exists($path)) {
        abort(404);
    }
    return response()->file($path);
});

