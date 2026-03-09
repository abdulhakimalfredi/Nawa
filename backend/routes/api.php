<?php 

use App\Http\Controllers\TopicController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MeetingController;

Route::get('/topics', [TopicController::class, 'index']); 
Route::get('/user',function(Request $request){
    return $request->user();
})->middleware('auth:sanctum');
Route::Post('/register', [AuthController::class, 'register']); 
Route::Post('/login', [AuthController::class, 'login']); 

Route::get('/meetings', [MeetingController::class, 'index']);
Route::post('/meetings', [MeetingController::class, 'store']);
Route::put('/meetings/{meeting}', [MeetingController::class, 'update']);
Route::delete('/meetings/{meeting}', [MeetingController::class, 'destroy']);