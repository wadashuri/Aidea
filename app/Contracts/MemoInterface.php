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

    /**
     * メモを取得
     * @param int $loginUserId
     * @param string $memoId
     * @return array
     */
    public function getMemo(int $loginUserId, string $memoId): array;
}