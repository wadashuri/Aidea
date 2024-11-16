import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { debounce } from "lodash";
import BlockNoteEditor from "@/Services/BlockNoteEditor";

export default function UpdateContentForm({ memo }) {
    const { data, setData, patch } = useForm({
        title: memo.data.title || '新規メモ',
        content: memo.data.content || null,
    });

    const [previousContentLength, setPreviousContentLength] = useState(0);

    const handleContentChange = (content) => {
        setPreviousContentLength(content.length);
        setData("content", JSON.stringify(content));
    };

    const handleContentBlur = debounce(() => {
        if (previousContentLength === JSON.parse(data.content).length) {
            patch(route("memo.update", { memoId: memo.data.id }), {
                preserveScroll: true,
                preserveState: true,
            });
        }
    }, 100);

    return (
        <BlockNoteEditor
            initialContent={memo ? JSON.parse(memo.data.content) : null}
            onChange={handleContentChange}
            onBlur={handleContentBlur}
        />
    );
}
