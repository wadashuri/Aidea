<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Collection;

class MemoCollection extends ResourceCollection
{
    public static $wrap = 'items';

    /**
     * @param Request $request
     * @return Collection
     */
    public function toArray(Request $request): Collection
    {
        return $this->collection->map(function ($memo) {
            return [
                'id' => $memo['id'],
                'title' => $memo['title'],
                'content' => $memo['content'],
                'created_at' => $memo['created_at'],
                'updated_at' => $memo['updated_at'],
            ];
        });
    }
}