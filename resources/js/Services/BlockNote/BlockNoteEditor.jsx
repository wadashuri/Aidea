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
    let editor;

    try {
        // エディタを初期化
        editor = useCreateBlockNote({
            dictionary: locales.ja,
            initialContent,
        });
    } catch (error) {
        console.error("エディタの初期化中にエラーが発生しました:", error);
        return (
            <div className="max-w-lg mx-auto my-8 text-center">
                <h2 className="text-lg font-semibold">エラーが発生しました</h2>
                <p className="mt-2">エディタの編集中に問題が発生しました。</p>
                <p className="mt-1">再読み込みを行ってください。</p>
                <button
                    className="mt-4 px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-100"
                    onClick={() => window.location.reload()}
                >
                    再読み込み
                </button>
            </div>
        );
    }

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
