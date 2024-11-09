<?php

namespace App\Http\Controllers;

use App\UseCases\Memo\IndexUseCase;
use App\UseCases\Memo\ShowUseCase;
use App\UseCases\Memo\StoreUseCase;
use App\UseCases\Memo\UpdateUseCase;
use App\UseCases\Memo\DeleteUseCase;
use App\Http\Resources\MemoCollection;
use App\Http\Resources\MemoResource;
use Illuminate\Http\Request;
use App\Http\Requests\MemoUpdateRequest;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class MemoController extends Controller
{
    /**
     * メモ一覧取得
     * @param IndexUseCase $useCase
     * @return MemoCollection
     */
    public function index(IndexUseCase $useCase): MemoCollection
    {
        return new MemoCollection($useCase->execute());
    }

    /**
     * メモ詳細取得
     * @param Request $request
     * @param ShowUseCase $useCase
     * @return \Inertia\Response
     */
    public function show(Request $request, ShowUseCase $useCase): Response
    {
        return Inertia::render('Memo/Show',[
            'memo' => new MemoResource($useCase->execute($request?->memoId)),
        ]); 
    }

    /**
     * メモ作成
     * @return void
     * @param StoreUseCase $useCase
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreUseCase $useCase): \Illuminate\Http\RedirectResponse
    {
        $memo = $useCase->execute();
        return Redirect::route('memo.show', ['memoId' => $memo['id']]);
    }

    /**
     * メモ更新
     * @param MemoUpdateRequest $request
     * @param UpdateUseCase $useCase
     */
    public function update(MemoUpdateRequest $request, UpdateUseCase $useCase): void
    {
        $useCase->execute($request->validated());
    }

    /**
     * メモ削除
     * @param Request $request
     * @param DeleteUseCase $useCase
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request, DeleteUseCase $useCase): \Illuminate\Http\RedirectResponse
    {
        $useCase->execute($request?->memoId);
        return Redirect::route('dashboard');
    }
}
