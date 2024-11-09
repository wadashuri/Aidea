<?php

namespace App\Repositories;

use App\Contracts\MemoInterface;
use App\Models\Memo;

class MemoRepository implements MemoInterface
{
    /**
     * メモ一覧を取得
     * @param int $loginUserId
     * @return array
     */
    public function getMemos(int $loginUserId): array
    {
        return Memo::select(
            'id',
            'title',
            )
            ->where('user_id', $loginUserId)
            ->get()?->toArray() ?? [];
    }

    /**
     * メモを取得
     * @param int $loginUserId
     * @param string $memoId
     * @return array
     */
    public function getMemo(int $loginUserId, string $memoId): array
    {
        return Memo::select(
            'title',
            'content',
            )
            ->where('user_id', $loginUserId)
            ->where('id', $memoId)
            ->first()?->toArray() ?? [];
    }
}
