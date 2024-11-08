<?php

namespace App\Http\Controllers;

use App\UseCases\MemoUseCase;
use App\Http\Resources\MemoCollection;

class MemoController extends Controller
{
    /**
     * メモ一覧取得
     * @param MemoUseCase $useCase
     * @return MemoCollection
     */
    public function index(MemoUseCase $useCase): MemoCollection
    {
        return new MemoCollection($useCase->execute());
    }
}
