<?php
namespace App\UseCases\Memo;

use App\Contracts\UserInterface;
use App\Contracts\MemoInterface;

class UpdateUseCase
{
    public function __construct(
        private readonly UserInterface $userRepository,
        private readonly MemoInterface $memoRepository,
    ) {
    }

    public function execute(array $params): array
    {
        return $this->memoRepository->saveMemo(
            memoId: $params['memoId'],
            loginUserId: $this->userRepository->getLoginUser()['id'],
            title: $params['title'],
            content: json_encode($params['content']),
        );
    }
}