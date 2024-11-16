import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from "react";
import { locales } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { debounce } from 'lodash';

export default function Memo({ memo }) {
    const [beforeLength, setBeforeLength] = useState(0);
    const initialContent = memo.data.content ? JSON.parse(memo.data.content) : null;

    // エディタのインスタンスを作成し、初期化
    const editor = useCreateBlockNote({
        dictionary: locales.ja,  // 日本語化
        initialContent: initialContent,
    });

    // onBlurイベントで更新処理を実行
    const handleBlur = debounce(() => {

        // 暫定対応としてコンテンツの行数で更新するか判断
        // TODO : LocalStorageなどを使いリアルタイム更新を実現するように修正
        if (beforeLength === editor.document.length) {
            patch(route('memo.update', { memoId: memo.data.id }), {
                preserveScroll: true,
                preserveState: true,
            });
        }
    }, 1000);

    // useFormフックでフォームの状態を管理
    const { data, setData, patch } = useForm({
        title: memo.data.title || '新規メモ',
        content: memo.data.content || 'メモがありません',
    });

    const onChange = () => {
        setBeforeLength(editor.document.length);
        setData("content", JSON.stringify(editor.document));
    };

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
                                onChange={onChange}
                                theme='light'
                                onBlur={handleBlur}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
