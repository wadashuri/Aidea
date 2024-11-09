<?php

namespace App\Contracts;

interface MemoInterface
{
    /**
     * メモ一覧を取得
     * @param int $loginUserId
     * @return array
     */
    public function getMemos(int $loginUserId): array;
}