<?php

use App\Http\Controllers\userController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
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

//route to show post images
Route::get('/post_images/{filename}', function ($filename) {
    $path = storage_path('../public/post_images/' . $filename);
    if (!File::exists($path)) {
        abort(404);
    }
    return response()->file($path);
});



//route to get categories images
Route::get('/categories_images/{filename}', function ($filename) {
    $path = storage_path('../public/categories_images/' . $filename);
    if (!File::exists($path)) {
        abort(404);
    }
    return response()->file($path);
});


//route to get users images
Route::get('/users_images/{filename}', function ($filename) {
    $path = storage_path('../public/users_images/' . $filename);
    if (!File::exists($path)) {
        abort(404);
    }
    return response()->file($path);
});




