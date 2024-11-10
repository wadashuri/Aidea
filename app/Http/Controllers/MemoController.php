<?php

namespace App\Http\Controllers;

use App\UseCases\Memo\IndexUseCase;
use App\UseCases\Memo\ShowUseCase;
use App\UseCases\Memo\StoreUseCase;
use App\UseCases\Memo\UpdateUseCase;
use App\UseCases\Memo\DeleteUseCase;
use App\Http\Resources\MemoCollection;
use App\Http\Resources\MemoResource;
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
     * @param int $memoId
     * @param ShowUseCase $useCase
     * @return \Inertia\Response
     */
    public function show(int $memoId, ShowUseCase $useCase): Response
    {
        return Inertia::render('Memo/Show',[
            'memo' => new MemoResource($useCase->execute($memoId)),
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
     * @param int $memoId
     * @param MemoUpdateRequest $request
     * @param UpdateUseCase $useCase
     */
    public function update(int $memoId, MemoUpdateRequest $request, UpdateUseCase $useCase): void
    {
        $useCase->execute($memoId, $request->validated());
    }

    /**
     * メモ削除
     * @param int $memoId
     * @param DeleteUseCase $useCase
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(int $memoId, DeleteUseCase $useCase): \Illuminate\Http\RedirectResponse
    {
        $useCase->execute($memoId);
        return Redirect::route('dashboard');
    }
}
