<?php
namespace App\UseCases;

use App\Contracts\UserInterface;
use App\Contracts\MemoInterface;

class MemoIndexUseCase
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