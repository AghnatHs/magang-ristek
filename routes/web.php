<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\KomnewsController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/komnews', [KomnewsController::class, 'index']);

Route::get('/komnews/category/{category:slug}', [CategoryController::class, 'index']);

Route::get('/komnews/{komnews:slug}', [KomnewsController::class, 'show']);
