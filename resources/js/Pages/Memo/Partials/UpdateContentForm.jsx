import { useForm } from "@inertiajs/react";
import BlockNoteEditor from "@/Services/BlockNoteEditor";

export default function UpdateContentForm({ memo }) {
    const { setData, patch } = useForm({
        title: memo.data.title || '新規メモ',
        content: memo.data.content || null,
    });

    const handleContentChange = (content) => {
        setData("content", JSON.stringify(content));
    };

    const handleContentBlur = () => {
        patch(route("memo.update", { memoId: memo.data.id }), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <BlockNoteEditor
            initialContent={memo ? JSON.parse(memo.data.content) : null}
            onChange={handleContentChange}
            onBlur={handleContentBlur}
        />
    );
}
