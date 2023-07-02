<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CommentController;

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

//Posts Api's-----------------------------------------------------------------------------------------------------
Route::apiResource('posts',\App\Http\Controllers\API\PostController::class);
Route::get('/posts/user/{user_id}', [\App\Http\Controllers\API\PostController::class, 'getByUserId']);
Route::get('/posts/category/{category_id}', [\App\Http\Controllers\API\PostController::class, 'getByCategoryId']);

//Categories Api's-----------------------------------------------------------------------------------------------------
Route::apiResource('categories',\App\Http\Controllers\API\CategoryController::class);
