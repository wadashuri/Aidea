<?php
namespace App\UseCases\Memo\Ai;

use App\Services\OpenAi\ChatGpt;

class TextEnhanceUseCase
{
    /**
     * @param ChatGpt $chatGpt
     */
    public function __construct(
        private readonly ChatGpt $chatGpt,
    ) {
    }

    /**
     * @param string $content
     * @return string
     */
    public function execute(string $content): string
    {
        return $this->chatGpt->AiTextEnhance($content);
    }
}