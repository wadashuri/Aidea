import { useBlockNoteEditor, useComponentsContext } from "@blocknote/react";
import "@blocknote/mantine/style.css";
import Modal from "@/Components/Modal";
import { useState } from "react";
import BlockNoteEditor from "@/Services/BlockNote/BlockNoteEditor";

export function AIEnhanceButton() {
    const editor = useBlockNoteEditor();
    const Components = useComponentsContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalText, setModalText] = useState(); // モーダルに渡すテキストを管理

    // モーダルを閉じる
    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    // "置き換える" ボタンを押した際の処理
    const handleYesClick = () => {
        // TODO: AIで文章を改善した結果をエディターに反映
        editor.insertInlineContent(editor.getSelection().blocks);
        handleModalClose();
    };

    // モーダルを開く処理
    const handleOpenModal = () => {
        // TODO: AIによる文章改善処理した結果をuseStateで管理するように修正
        //       改善された文章をモーダルに表示するように修正
        console.log(editor.getSelection().blocks);
        setModalText(editor.getSelection().blocks);
        setIsModalOpen(true);
    };

    return (
        <>
            <Components.FormattingToolbar.Button
                mainTooltip="AIによる文章改善"
                onClick={handleOpenModal} // モーダルを開く
            >
                文章を改善する
            </Components.FormattingToolbar.Button>

            {/* モーダルコンポーネント */}
            <Modal show={isModalOpen} onClose={handleModalClose} maxWidth="sm">
                <div className="p-4">
                    <BlockNoteEditor initialContent={modalText} />
                    <div className="mt-4 flex justify-end gap-2">
                        <button
                            className="btn-secondary"
                            onClick={handleModalClose}
                        >
                            キャンセル
                        </button>
                        <button
                            className="btn-primary"
                            onClick={handleYesClick}
                        >
                            置き換える
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
