<?php
namespace App\UseCases\Memo;

use App\Contracts\UserInterface;
use App\Contracts\MemoInterface;

class DeleteUseCase
{
    public function __construct(
        private readonly UserInterface $userRepository,
        private readonly MemoInterface $memoRepository,
    ) {
    }

    public function execute(string|null $memoId): void
    {
        $loginUser = $this->userRepository->getLoginUser();
        $this->memoRepository->deleteMemo($memoId, $loginUser['id']);
    }
}