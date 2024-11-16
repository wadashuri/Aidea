import { locales } from "@blocknote/core";
import { Head, useForm } from "@inertiajs/react";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useState, useEffect } from "react";
import { debounce } from "lodash";

export default function UpdateContentForm({ memo }) {
    const { data, setData, patch } = useForm({
        title: memo.data.title || "新規メモ",
        content: memo.data.content || "メモがありません",
    });
    const [beforeLength, setBeforeLength] = useState(0);
    const editor = useCreateBlockNote({
        dictionary: locales.ja,
        initialContent: memo ? JSON.parse(memo.data.content) : null,
    });

    const handleContentChange = () => {
        setBeforeLength(editor.document.length);
        setData("content", JSON.stringify(editor.document));
    };

    const handleContentBlur = debounce(() => {
        if (beforeLength === editor.document.length) {
            patch(route("memo.update", { memoId: memo.data.id }), {
                preserveScroll: true,
                preserveState: true,
            });
        }
    }, 100);

    return (
        <BlockNoteView
            editor={editor}
            theme="light"
            onChange={handleContentChange}
            onBlur={handleContentBlur}
        />
    );
}
