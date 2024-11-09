<?php

namespace App\Repositories;

use App\Contracts\UserInterface;

class UserRepository implements UserInterface
{
    /**
     * ログインユーザーを取得
     * @return array 万が一ログインユーザーが取得できない場合は空配列を返す
     */
    public function getLoginUser(): array
    {
        /** @var User | null $loginUser */
        $loginUser = auth()->guard('web')->user();

        return match ($loginUser) {
            null => [],
            default => $loginUser->toArray()
        };
    }
}