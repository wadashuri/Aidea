import {
    useBlockNoteEditor,
    useComponentsContext,
    useEditorContentOrSelectionChange,
} from "@blocknote/react";
import "@blocknote/mantine/style.css";
import { useState } from "react";

export function AIEnhanceButton() {
    const editor = useBlockNoteEditor();

    const Components = useComponentsContext();

    const [isSelected, setIsSelected] = useState(
        editor.getActiveStyles().textColor === "blue" &&
            editor.getActiveStyles().backgroundColor === "blue"
    );

    useEditorContentOrSelectionChange(() => {
        setIsSelected(
            editor.getActiveStyles().textColor === "blue" &&
                editor.getActiveStyles().backgroundColor === "blue"
        );
    }, editor);

    return (
        <Components.FormattingToolbar.Button
            mainTooltip={"AIによる文章改善"}
            onClick={() => {
                // ここにボタンを押した時の処理を記述

                // 例: テキストの色と背景色を変更
                // editor.toggleStyles({
                //     textColor: "blue",
                //     backgroundColor: "blue",
                // });
            }}
            isSelected={isSelected}
        >
            文章を改善する
        </Components.FormattingToolbar.Button>
    );
}
