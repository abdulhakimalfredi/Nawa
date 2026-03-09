<?php

use Illuminate\Support\Facades\Route;
use App\http\Controllers\TopicController;


Route::get('/topics', [TopicController::class, 'index']); 
