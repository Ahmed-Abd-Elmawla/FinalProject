<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PremiumPostsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('comments', [CommentController::class, 'index']);
Route::post('comments', [CommentController::class, 'store']);
Route::get('comments/{comment}', [CommentController::class, 'show']);
Route::put('comments/{comment}', [CommentController::class, 'update']);
Route::delete('comments/{comment}', [CommentController::class, 'destroy']);


Route::apiResource('posts',\App\Http\Controllers\API\PostController::class);



Route::get('/posts/{post}/premium', [PremiumPostsController::class, 'show'])->name('posts.premium.show');
Route::post('/posts/{post}/premium', [PremiumPostsController::class, 'store'])->name('posts.premium.store');
Route::put('/posts/{post}/premium', [PremiumPostsController::class, 'update'])->name('posts.premium.update');
Route::delete('/posts/{post}/premium', [PremiumPostsController::class, 'destroy'])->name('posts.premium.destroy');