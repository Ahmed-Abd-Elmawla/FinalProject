<?php

use App\Http\Controllers\Api\UserController;
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


Route::post('register',[UserController::class,'register']);
Route::post('login',[UserController::class,'login']);

Route::get('comments', [CommentController::class, 'index']);
Route::post('comments', [CommentController::class, 'store']);
Route::get('comments/{comment}', [CommentController::class, 'show']);
Route::put('comments/{comment}', [CommentController::class, 'update']);
Route::delete('comments/{comment}', [CommentController::class, 'destroy']);

//Posts Api's-----------------------------------------------------------------------------------------------------
Route::apiResource('posts',\App\Http\Controllers\API\PostController::class);
Route::get('/posts/user/{user_id}', [\App\Http\Controllers\API\PostController::class, 'getByUserId']);
Route::get('/posts/category/{category_id}', [\App\Http\Controllers\API\PostController::class, 'getByCategoryId']);
Route::post('/posts/status/{post}', [\App\Http\Controllers\API\PostController::class, 'updateStatus']);
Route::get('/posts/status/{status}', [\App\Http\Controllers\API\PostController::class, 'getByStatus']);


//Categories Api's-----------------------------------------------------------------------------------------------------
Route::apiResource('categories',\App\Http\Controllers\API\CategoryController::class);

//Contacts Api's-----------------------------------------------------------------------------------------------------
Route::apiResource('contacts',\App\Http\Controllers\API\ContactController::class);
Route::post('mail',[\App\Http\Controllers\API\ContactController::class,'sendEmail']);
