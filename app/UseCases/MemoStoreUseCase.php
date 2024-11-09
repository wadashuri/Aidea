<?php
namespace App\UseCases;

use App\Contracts\UserInterface;
use App\Contracts\MemoInterface;

class MemoStoreUseCase
{
    public function __construct(
        private readonly UserInterface $userRepository,
        private readonly MemoInterface $memoRepository,
    ) {
    }

    public function execute(): array
    {
        return $this->memoRepository->saveMemo(
            memoId: null,
            loginUserId: $this->userRepository->getLoginUser()['id'],
            title: null,
            content: null
        );
    }
}