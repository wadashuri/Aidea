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

    /**
     * メモを作成
     * @param int|null $memoId
     * @param int $loginUserId
     * @param string|null $title
     * @param string|null $content
     * @return array
     */
    public function saveMemo(int|null $memoId, int $loginUserId, string|null $title, string|null $content): array;

    /**
     * メモを削除
     * @param int $memoId
     * @param string $loginUserId
     * @return void
     */
    public function deleteMemo(int $memoId, string $loginUserId): void;
}