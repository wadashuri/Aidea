import { useForm } from "@inertiajs/react";
import BlockNoteEditor from "@/Services/BlockNote/BlockNoteEditor";

export default function UpdateContentForm({ memo }) {
    const { setData, patch } = useForm({
        title: memo.data.title || '新規メモ',
        content: memo.data.content || null,
    });

    const handleContentChange = (content) => {
        setData("content", JSON.stringify(content));
    };

    const handleContentBlur = (event) => {
        const clickedElement = event.relatedTarget;
        
        /**
        * エディター内のボタンをクリックして新しい要素を追加した場合は保存処理を行わない
        * TODO: もっと良い保存タイミングや保存処理があれば修正する
        */
        if(!clickedElement){
            patch(route("memo.update", { memoId: memo.data.id }), {
                preserveScroll: true,
                preserveState: true,
            });
        }
    };

    return (
        <BlockNoteEditor
            initialContent={memo ? JSON.parse(memo.data.content) : null}
            onChange={handleContentChange}
            onBlur={handleContentBlur}
        />
    );
}
