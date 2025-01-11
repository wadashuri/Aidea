<?php

namespace App\Http\Controllers;

use App\UseCases\Memo\IndexUseCase;
use App\UseCases\Memo\ShowUseCase;
use App\UseCases\Memo\StoreUseCase;
use App\UseCases\Memo\UpdateUseCase;
use App\UseCases\Memo\DeleteUseCase;
use App\Http\Resources\MemoCollection;
use App\Http\Resources\MemoResource;
use App\Http\Requests\Memo\UpdateRequest;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;
use Illuminate\Http\RedirectResponse;

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
     * @return SymfonyResponse
     */
    public function store(StoreUseCase $useCase): SymfonyResponse
    {
        $memo = $useCase->execute();
        return Inertia::location(route('memo.show', ['memoId' => $memo['id']]));
    }

    /**
     * メモ更新
     * @param int $memoId
     * @param UpdateRequest $request
     * @param UpdateUseCase $useCase
     * @return void
     */
    public function update(int $memoId, UpdateRequest $request, UpdateUseCase $useCase): void
    {
        $useCase->execute($memoId, $request->validated());
    }

    /**
     * メモ削除
     * @param int $memoId
     * @param DeleteUseCase $useCase
     * @return RedirectResponse
     */
    public function destroy(int $memoId, DeleteUseCase $useCase): RedirectResponse
    {
        $useCase->execute($memoId);
        return Redirect::route('dashboard');
    }
}
