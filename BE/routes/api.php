<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('users', [\App\Http\Controllers\API\UserController::class, 'index']);
Route::get('users/{user:id}', [\App\Http\Controllers\API\UserController::class, 'show']);
Route::post('register', [\App\Http\Controllers\API\RegisterController::class, 'register']);
Route::post('login', [\App\Http\Controllers\API\LoginController::class, 'login']);

Route::middleware('auth:api')->group( function () {
    Route::resource('products', ProductController::class);
});

