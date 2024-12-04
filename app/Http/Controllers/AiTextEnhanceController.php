<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AiTextEnhanceController extends Controller
{
    /**
     * Aiによる文章改善
     * TODO: ・バリデーションを追加する
     *       ・useCaseとResourceファイルを追加する
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke(Request $request)
    {
        return response()->json([
            'enhanced_text' => app(\App\Services\OpenAi\ChatGpt::class)->AiTextEnhance(json_encode($request->text)),
        ]);
    }
}
