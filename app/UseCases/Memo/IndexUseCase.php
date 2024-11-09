<?php
namespace App\UseCases\Memo;

use App\Contracts\UserInterface;
use App\Contracts\MemoInterface;

class IndexUseCase
{
    public function __construct(
        private readonly UserInterface $userRepository,
        private readonly MemoInterface $memoRepository,
    ) {
    }

    public function execute()
    {
        $loginUser = $this->userRepository->getLoginUser();
        return $this->memoRepository->getMemos($loginUser['id']);
    }
}