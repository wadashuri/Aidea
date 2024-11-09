import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';

export default function Memo({ memo }) {
    const [title, setTitle] = useState(memo.data.title || '新規メモ');
    const [content, setContent] = useState(memo.data.content || 'メモがありません');

    // TODO: useFormフックを使うように修正
    const handleBlur = () => {
        Inertia.patch(route('memo.update', {
            memoId : memo.data.id,
            title,
            content
        }));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    <input
                        type="text"
                        className="text-xl font-semibold leading-tight text-gray-800 w-full p-2 border border-gray-300 rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={handleBlur}
                    />
                </h2>
            }
        >
            <Head title="Memo" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                onBlur={handleBlur}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
