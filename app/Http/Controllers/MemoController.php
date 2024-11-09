<?php

namespace App\Http\Controllers;

use App\UseCases\MemoUseCase;
use App\UseCases\MemoShowUseCase;
use App\Http\Resources\MemoCollection;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

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

    /**
     * メモ詳細取得
     * @param Request $request
     * @param MemoShowUseCase $useCase
     * @return \Inertia\Response
     */
    public function show(Request $request, MemoShowUseCase $useCase): Response
    {
        return Inertia::render('Memo/Show',[
            'memo' => $useCase->execute($request->memoId ?? ''),
        ]); 
    }
}
