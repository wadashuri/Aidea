<?php

namespace App\Http\Controllers;

use App\UseCases\MemoIndexUseCase;
use App\UseCases\MemoShowUseCase;
use App\UseCases\MemoStoreUseCase;
use App\UseCases\MemoUpdateUseCase;
use App\UseCases\MemoDeleteUseCase;
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
     * @param MemoIndexUseCase $useCase
     * @return MemoCollection
     */
    public function index(MemoIndexUseCase $useCase): MemoCollection
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
    public function store(MemoStoreUseCase $useCase): \Illuminate\Http\RedirectResponse
    {
        $memo = $useCase->execute();
        return Redirect::route('memo.show', ['memoId' => $memo['id']]);
    }

    /**
     * メモ更新
     * @param Request $request
     * @param MemoUpdateUseCase $useCase
     */
    public function update(MemoUpdateRequest $request, MemoUpdateUseCase $useCase): void
    {
        $useCase->execute($request->validated());
    }

    /**
     * メモ削除
     * @param Request $request
     * @param MemoDeleteUseCase $useCase
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request, MemoDeleteUseCase $useCase): \Illuminate\Http\RedirectResponse
    {
        $useCase->execute($request?->memoId);
        return Redirect::route('dashboard');
    }
}
