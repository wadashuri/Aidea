<?php

namespace App\Http\Controllers;

use App\UseCases\MemoUseCase;
use App\UseCases\MemoShowUseCase;
use App\UseCases\MemoSaveUseCase;
use App\Http\Resources\MemoCollection;
use App\Http\Resources\MemoResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
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
            'memo' => new MemoResource($useCase->execute($request?->memoId)),
        ]); 
    }

    /**
     * メモ作成
     * @return void
     * @param MemoSaveUseCase $useCase
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(MemoSaveUseCase $useCase): \Illuminate\Http\RedirectResponse
    {
        $memo = $useCase->execute();
        return Redirect::route('memo.show', ['memoId' => $memo['id']]);
    }
}
