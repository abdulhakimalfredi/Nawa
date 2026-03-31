<?php 

use App\Http\Controllers\TopicController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MeetingController;
use App\Http\Controllers\ManagerController;
use App\Http\Controllers\LessonSummaryController;
use App\Http\Controllers\GoalController;
Route::get('/topics', [TopicController::class, 'index']); 
Route::Post('/register', [AuthController::class, 'register']); 
Route::Post('/login', [AuthController::class, 'login']); 
// Trainee Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function(Request $request) {
        return $request->user();
    });

    // ملخصات الدروس
    Route::post('/summaries', [LessonSummaryController::class, 'store']);
    Route::get('/my-summaries', [LessonSummaryController::class, 'myIndex']);

    // الأهداف
    Route::post('/goals', [GoalController::class, 'store']);
    Route::put('/goals/{id}', [GoalController::class, 'update']);
    Route::get('/my-goals', [GoalController::class, 'myIndex']);
});
    // Manger Routes
Route::post('/manager/login', [ManagerController::class, 'login']);
Route::middleware(['auth:sanctum', 'isManager'])->group(function () {
    Route::get('/manager/trainees', [ManagerController::class, 'trainees']);
    Route::get('/manager/trainees/{id}', [ManagerController::class, 'showTrainee']);
    Route::get('/manager/summaries', [LessonSummaryController::class, 'index']);
    Route::get('/manager/goals', [GoalController::class, 'index']);
});
// Meetings Routes
Route::middleware('auth:sanctum')->group(function () {
Route::get('/meetings', [MeetingController::class, 'index']);
Route::post('/meetings', [MeetingController::class, 'store']);
Route::put('/meetings/{meeting}', [MeetingController::class, 'update']);
Route::delete('/meetings/{meeting}', [MeetingController::class, 'destroy']);
Route::get('/manager/trainees/{id}/summaries', [LessonSummaryController::class, 'trainee']);
});