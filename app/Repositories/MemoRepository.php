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
            ->latest()->get()?->toArray() ?? [];
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
            'id',
            'title',
            'content',
            'created_at',
            'updated_at',
            )
            ->where('user_id', $loginUserId)
            ->where('id', $memoId)
            ->first()?->toArray() ?? [];
    }

    /**
     * メモを作成
     * @param int|null $memoId
     * @param int $loginUserId
     * @param string|null $title
     * @param string|null $content
     * @return array
     */
    public function saveMemo(int|null $memoId, int $loginUserId, string|null $title, string|null $content): array
    {
        return Memo::query()->updateOrCreate(
            [
                'id' => $memoId,
                'user_id' => $loginUserId,
            ],
            [
                'user_id' => $loginUserId,
                'title' => $title,
                'content' => $content
            ]
            )?->toArray() ?? [];
    }
}
