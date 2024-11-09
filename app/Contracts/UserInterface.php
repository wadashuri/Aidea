<?php

namespace App\Contracts;

interface UserInterface
{
    /**
     * ログインユーザーを取得
     * @return array 万が一ログインユーザーが取得できない場合は空配列を返す
     */
    public function getLoginUser(): array;
}