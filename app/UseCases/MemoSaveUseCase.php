<?php
namespace App\UseCases;

use App\Contracts\UserInterface;
use App\Contracts\MemoInterface;

class MemoSaveUseCase
{
    public function __construct(
        private readonly UserInterface $userRepository,
        private readonly MemoInterface $memoRepository,
    ) {
    }

    public function execute()
    {
        return $this->memoRepository->saveMemo(
            memoId: null,
            loginUserId: $this->userRepository->getLoginUser()['id'],
            title: null,
            content: null
        );
    }
}