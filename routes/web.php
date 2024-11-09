<?php
use App\Http\Controllers;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::group(['controller' => Controllers\ProfileController::class], function () {
        Route::get('/profile', 'edit')->name('profile.edit');
        Route::patch('/profile', 'update')->name('profile.update');
        Route::delete('/profile', 'destroy')->name('profile.destroy');
    });

    Route::group(['controller' => Controllers\MemoController::class], function () {
        Route::get('/memo', 'index')->name('memo.index');
        Route::get('/memo/show', 'show')->name('memo.show');
        Route::post('/memo/store', 'store')->name('memo.store');
        Route::patch('/memo/update', 'update')->name('memo.update');
    });
});

require __DIR__.'/auth.php';
