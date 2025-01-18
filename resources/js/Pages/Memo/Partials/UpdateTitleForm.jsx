import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import TextInput from '@/Components/TextInput';
import { useIndexedDB } from "@/Hooks/UseIndexedDB";

export default function UpdateTitleForm({ memo }) {
    const { IndexDBTitle, saveIndexDBData, deleteIndexDBData, loading } = useIndexedDB(memo.data.id);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const { data, setData, patch } = useForm({
        title: memo.data.title || '新規メモ',
        content: memo.data.content || null,
    });

    useEffect(() => {
        if (!loading) {
            setIsInitialLoading(false);
        }
    }, [loading]);

    // エディターの内容が変更された時の処理
    const handleContentChange = (e) => {
        // フォームにデータをセット
        setData("title", e.target.value)

        // IndexDBにデータを保存
        saveIndexDBData(e.target.value, null);
    };

    const handleTitleBlur = () => {
        patch(route('memo.update', { memoId: memo.data.id }), {
            preserveScroll: true,
            preserveState: true,
        });
        deleteIndexDBData(memo.data.id);
    };

    // 初回ローディング中は何も表示しない
    if (isInitialLoading) {
        return <div></div>;
    }


    return (
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
            <TextInput
                type="text"
                className="text-xl border-none focus:ring-0 font-semibold leading-tight text-gray-800 w-full p-2 border border-gray-300 rounded"
                value={IndexDBTitle ? IndexDBTitle : data.title}
                onChange={handleContentChange}
                onBlur={handleTitleBlur}
            />
        </h2>
    );
}