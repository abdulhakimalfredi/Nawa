<?php

use Illuminate\Http\Request;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MeetingController;
use App\Http\Controllers\ManagerController;
use App\Http\Controllers\LessonSummaryController;
use App\Http\Controllers\GoalController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/topics', [TopicController::class, 'index']);

    // Trainee Routes
    Route::post('/summaries', [LessonSummaryController::class, 'store']);
    Route::get('/my-summaries', [LessonSummaryController::class, 'myIndex']);

    Route::post('/goals', [GoalController::class, 'store']);
    Route::put('/goals/{id}', [GoalController::class, 'update']);
    Route::get('/my-goals', [GoalController::class, 'myIndex']);

    // Meetings Routes
    Route::get('/meetings', [MeetingController::class, 'index']);
    Route::post('/meetings', [MeetingController::class, 'store']);
    Route::put('/meetings/{meeting}', [MeetingController::class, 'update']);
    Route::delete('/meetings/{meeting}', [MeetingController::class, 'destroy']);

    // Manager Routes
    Route::middleware('isManager')->group(function () {
        Route::get('/manager/trainees', [ManagerController::class, 'trainees']);
        Route::get('/manager/trainees/{id}', [ManagerController::class, 'showTrainee']);
        Route::get('/manager/trainees/{id}/summaries', [LessonSummaryController::class, 'trainee']);
        Route::get('/manager/summaries', [LessonSummaryController::class, 'index']);
        Route::get('/manager/goals', [GoalController::class, 'index']);
    });
});
