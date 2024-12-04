<?php

namespace App\Services\OpenAi;

use Illuminate\Support\Facades\Http;

class ChatGpt
{
    protected $apiKey;

    public function __construct()
    {
        $this->apiKey = config('services.openai.key');
    }

    public function AiTextEnhance(string $prompt): string
    {
        // ChatGPT APIのエンドポイントURL
        $url = "https://api.openai.com/v1/chat/completions";

        // ヘッダー
        $headers = array(
            "Content-Type" => "application/json",
            "Authorization" => "Bearer $this->apiKey"
        );

        // パラメータ
        $data = array(
            "model" => "gpt-3.5-turbo",
            "messages" => [
                [
                    "role" => "system",
                    "content" => "あなたはJSONフォーマットを扱うアシスタントです。以下のJSON形式を保持しながら、文章をより簡潔で自然かつ上品な表現に改善し、結果を必ず同じJSON形式で返してください。"
                ],
                [
                    "role" => "user",
                    "content" => $prompt
                ]
            ]
        );

        $response = Http::withHeaders($headers)->post($url, $data);

        if ($response->json('error')) {
            // エラー
            return $response->json('error')['message'];
        }

        return $response->json('choices')[0]['message']['content'];
    }
}
