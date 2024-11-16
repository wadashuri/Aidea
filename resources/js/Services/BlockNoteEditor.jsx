import { locales } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";

export default function BlockNoteEditor({ initialContent, onChange, onBlur }) {
    const editor = useCreateBlockNote({
        dictionary: locales.ja,
        initialContent,
    });

    return (
        <BlockNoteView
            editor={editor}
            theme="light"
            onBlur={onBlur}
            onChange={() => onChange(editor.document)}
        />
    );
}