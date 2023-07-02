<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\API\RateController;
use App\Http\Controllers\CommentController;

// use \App\Http\Controllers\API\RateController;
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



// Route::post('/rates', [RateController::class, 'store']);
Route::get('rates', [RateController::class, 'index']);
Route::get('rates/{rate}', [RateController::class, 'show']);
Route::post('rates', [RateController::class, 'store']);
Route::put('rates/{rate}', [RateController::class, 'update']);
Route::delete('rates/{rate}', [RateController::class, 'destroy']);

