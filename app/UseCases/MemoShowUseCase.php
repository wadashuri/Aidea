<?php
namespace App\UseCases;

use App\Contracts\UserInterface;
use App\Contracts\MemoInterface;

class MemoShowUseCase
{
    public function __construct(
        private readonly UserInterface $userRepository,
        private readonly MemoInterface $memoRepository,
    ) {
    }

    public function execute(string $memoId)
    {
        $loginUser = $this->userRepository->getLoginUser();
        return $this->memoRepository->getMemo($loginUser['id'], $memoId);
    }
}