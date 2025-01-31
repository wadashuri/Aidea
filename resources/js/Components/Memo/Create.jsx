import React from 'react';
import MemoLogo from '@/Components/MemoLogo';
import { useForm } from '@inertiajs/react';

export default function CreateMemo() {
    // useFormフックでフォームの状態と送信処理を管理
    const { post } = useForm();

    const handleCreateMemo = () => {
        post(route('memos.store'));
    };

    return (
        <MemoLogo 
            className="size-6" 
            onClick={handleCreateMemo}
        />
    );
}