<?php
use App\Http\Controllers;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Top', [
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
    // プロフィール
    Route::group(['prefix' => 'profile','controller' => Controllers\ProfileController::class], function () {
        Route::get('/', 'edit')->name('profile.edit');
        Route::patch('/', 'update')->name('profile.update');
        Route::delete('/', 'destroy')->name('profile.destroy');
    });

    // メモ
    Route::group(['prefix' => 'memos','controller' => Controllers\MemoController::class], function () {
        Route::get('/', 'index')->name('memos.index');
        Route::get('/{memoId}', 'show')->name('memos.show');
        Route::post('/store', 'store')->name('memos.store');
        Route::patch('/{memoId}', 'update')->name('memos.update');
        Route::delete('/{memoId}', 'destroy')->name('memos.destroy');
    });

    // AI文章改善
    Route::post('memo/ai/text_enhance', Controllers\AiTextEnhanceController::class);
});

require __DIR__.'/auth.php';
