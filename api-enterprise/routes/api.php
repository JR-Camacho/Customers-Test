<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\PhoneController;
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

// Customer routes
Route::get('/customers', [CustomerController::class, 'index']);
Route::get('/customers/{id}', [CustomerController::class, 'show']);
Route::post('/customers', [CustomerController::class, 'store']);
Route::put('/customers', [CustomerController::class, 'update']);
Route::delete('/customers/{id}', [CustomerController::class, 'destroy']);

// Address routes
Route::get('/addresses/{id}', [AddressController::class, 'show']);
Route::post('/addresses', [AddressController::class, 'store']);
Route::put('/addresses', [AddressController::class, 'update']);
Route::delete('/addresses/{id}', [AddressController::class, 'destroy']);

// Phone routes
Route::get('/phones/{id}', [PhoneController::class, 'show']);
Route::post('/phones', [PhoneController::class, 'store']);
Route::put('/phones', [PhoneController::class, 'update']);
Route::delete('/phones/{id}', [PhoneController::class, 'destroy']);


