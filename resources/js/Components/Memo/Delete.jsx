import React from 'react';
import DeleteLogo from '@/Components/DeleteLogo';
import { useForm } from '@inertiajs/react';

export default function DeleteMemo() {

    const { 
        delete: destroy,    
    } = useForm({});

    return (
        <DeleteLogo
        className="size-6"
        onClick={() => destroy(route('memos.destroy', { memoId: route().params.memoId }))}
        />
    );
}