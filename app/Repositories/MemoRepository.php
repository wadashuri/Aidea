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
            'content',
            'created_at',
            'updated_at'
            )
            ->where('user_id', $loginUserId)
            ->get()?->toArray() ?? [];
    }
}
