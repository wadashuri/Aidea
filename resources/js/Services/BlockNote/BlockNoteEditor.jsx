import { locales } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import BaseToolbar from "./Toolbar/BaseToolbar";
import {
    FormattingToolbarController,
    useCreateBlockNote,
  } from "@blocknote/react";

export default function BlockNoteEditor({ initialContent, onChange, onBlur }) {
    const editor = useCreateBlockNote({
        dictionary: locales.ja,
        initialContent,
    });

    return (
        <BlockNoteView
            editor={editor}
            theme="light"
            onChange={() => onChange(editor.document)}
            onBlur={onBlur}
            formattingToolbar={false}
        >
        <FormattingToolbarController formattingToolbar={() => <BaseToolbar />}/>
        </BlockNoteView>
    );
}
