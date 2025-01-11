<?php

namespace App\Http\Controllers;

use App\Http\Requests\Memo\Ai\TextEnhanceRequest;
use App\UseCases\Memo\Ai\TextEnhanceUseCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class AiTextEnhanceController extends Controller
{
    /**
     * Aiによる文章改善
     * 
     * @param TextEnhanceRequest $request
     * @param TextEnhanceUseCase $useCase
     * @return JsonResponse
     */
    public function __invoke(TextEnhanceRequest $request, TextEnhanceUseCase $useCase): JsonResponse
    {
        return response()->json([
            'enhanced_text' => $useCase->execute($request->validated()['content']),
            Response::HTTP_OK
        ]);
    }
}
