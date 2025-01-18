import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import BlockNoteEditor from "@/Services/BlockNote/BlockNoteEditor";
import { useIndexedDB } from "@/Hooks/UseIndexedDB";

export default function UpdateContentForm({ memo }) {
    const { IndexDBContent, saveIndexDBData, deleteIndexDBData, loading } = useIndexedDB(memo.data.id);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const { setData, patch } = useForm({
        title: memo.data.title || '新規メモ',
        content: memo.data.content || null,
    });

    useEffect(() => {
        if (!loading) {
            setIsInitialLoading(false);
        }
    }, [loading]);

    // エディターの内容が変更された時の処理
    const handleContentChange = (content) => {
        // フォームにデータをセット
        setData("content", JSON.stringify(content));

        // IndexDBにデータを保存
        saveIndexDBData(memo.data.title, JSON.stringify(content));
    };

    const handleContentBlur = (event) => {
        /**
         * エディター外の要素がクリックされていない場合のみ処理
         * INFO: +ボタンでブロックを追加する際に保存処理が走るのを防ぐ
         */
        const clickedElement = event.relatedTarget;
        if(!clickedElement){
            patch(route("memo.update", { memoId: memo.data.id }), {
                preserveScroll: true,
                preserveState: true,
            });
            deleteIndexDBData(memo.data.id);
        }
    };

    // 初回ローディング中は何も表示しない
    if (isInitialLoading) {
        return <div></div>;
    }

    return (
        <BlockNoteEditor
            initialContent={IndexDBContent ? JSON.parse(IndexDBContent) : JSON.parse(memo.data.content)}
            onChange={handleContentChange}
            onBlur={handleContentBlur}
        />
    );
}
