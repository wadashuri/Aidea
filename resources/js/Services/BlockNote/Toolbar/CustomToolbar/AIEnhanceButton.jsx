import { useBlockNoteEditor, useComponentsContext } from "@blocknote/react";
import "@blocknote/mantine/style.css";
import Modal from "@/Components/Modal";
import { useState } from "react";
import axios from "axios";
import BlockNoteEditor from "@/Services/BlockNote/BlockNoteEditor";

export function AIEnhanceButton() {
    const editor = useBlockNoteEditor();
    const Components = useComponentsContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalText, setModalText] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleModalClose = () => {
        // モーダルを閉じる
        setIsModalOpen(false);
    };

    // "置き換える" ボタンを押した際の処理
    const handleYesClick = () => {
        if (!modalText) {
            handleModalClose();
            return;
        }

        // ブロックと子ブロックを再帰的に更新する関数
        const updateBlockAndChildren = (block) => {
            // 親ブロックを更新
            editor.updateBlock(block.id, {
                content: block.content[0].text,
            });

            // 子ブロックが存在する場合、再帰的に処理
            block.children?.forEach(updateBlockAndChildren);
        };

        // modalText 内のすべてのブロックに対して再帰処理を実行
        modalText.forEach(updateBlockAndChildren);
        handleModalClose();
    };

    // モーダルを開く際の処理
    const handleOpenModal = async () => {
        // 選択されたテキストブロックを取得
        const selectedBlocks = editor.getSelection().blocks;
        if (!selectedBlocks || selectedBlocks.length === 0) {
            console.log("文章が選択されていません。");
            return;
        }
        // 選択されたブロックの形式を再構築
        const hierarchicalBlocks = rebuildHierarchy(selectedBlocks);

        // ローディング開始
        setLoading(true);
        try {
            // モーダルを開く
            setIsModalOpen(true);

            const response = await axios.post("/memo/ai/text_enhance", {
                content: JSON.stringify(hierarchicalBlocks),
            });

            // 改善された文章をセット
            setModalText(JSON.parse(response.data.enhanced_text));
        } catch (err) {
            console.log(
                "文章の改善に失敗しました。もう一度お試しください。",
                err
            );
        } finally {
            // ローディング終了
            setLoading(false);
        }
    };

    /**
     * 選択されたブロックの形式を再構築
     * INFO: 子ブロックがなぜか親ブロックと同じ階層に存在するため、再構築が必要。
     * 選択されたブロックから重複する子ブロックを取り除き、正しい階層構造を構築。
     */
    const rebuildHierarchy = (selectedBlocks) => {
        const childBlockIds = selectedBlocks.flatMap((block) =>
            block.children.map((child) => child.id)
        );
        const filteredBlocks = selectedBlocks.filter(
            (block) => !childBlockIds.includes(block.id)
        );
        return filteredBlocks;
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
                    {loading ? (
                        <p>改善中...</p>
                    ) : (
                        <>
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
                        </>
                    )}
                </div>
            </Modal>
        </>
    );
}
