import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

import { locales } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";

export default function Memo({ memo }) {

    const initialContent = memo.data.content ? JSON.parse(memo.data.content) : null;


    // エディタのインスタンスを作成し、初期化
    const editor = useCreateBlockNote({
        dictionary: locales.ja,  // 日本語化
        initialContent: initialContent,
    });

    // onBlurイベントで更新処理を実行
    const handleBlur = () => {
        patch(route('memo.update', { memoId: memo.data.id }), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    // useFormフックでフォームの状態を管理
    const { data, setData, patch } = useForm({
        title: memo.data.title || '新規メモ',
        content: memo.data.content || 'メモがありません',
    });

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    <input
                        type="text"
                        className="text-xl font-semibold leading-tight text-gray-800 w-full p-2 border border-gray-300 rounded"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
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
                            <BlockNoteView 
                                editor={editor}
                                // サイドメニューをクリックするとonBlurが発生してしまうため、暫定対応としてサイドバー無効化
                                // TODO: サイドメニューをクリックしてもonBlurが発生しないようにするか別の方法で対応する
                                sideMenu={false}
                                onChange={() => {
                                    setData("content", JSON.stringify(editor.document));
                                }}
                                onBlur={handleBlur}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
