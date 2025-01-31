import { useBlockNoteEditor, useComponentsContext } from "@blocknote/react";
import "@blocknote/mantine/style.css";
import Modal from "@/Components/Modal";
import { useState } from "react";
import axios from "axios";
import BlockNoteEditor from "@/Services/BlockNote/BlockNoteEditor";

// AIによる文章改善処理
export function AIEnhanceButton() {
    const editor = useBlockNoteEditor();
    const Components = useComponentsContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalText, setModalText] = useState(null);
    const [loading, setLoading] = useState(false);

    // モーダルが開いた際の処理
    const handleOpenModal = async () => {
        const selectedBlocks = editor.getSelection().blocks;
        if (!selectedBlocks || selectedBlocks.length === 0) return;

        // 階層を再構築し、親ブロックのみを取得
        const parentBlocks = filterParentBlocks(selectedBlocks);

        setLoading(true);
        try {
            setIsModalOpen(true);

            // AIが処理しやすいようにkeyとvalueの形式に変換し文章改善リクエスト
            const blockContentMap = convertBlocksToContentMap(selectedBlocks);
            const response = await axios.post("/memo/ai/text_enhance", {
                content: JSON.stringify(blockContentMap),
            });

            // 受け取ったデータをモーダルに表示する形式に変換
            const enhancedText = JSON.parse(response.data.enhanced_text);
            updateBlocksRecursively(parentBlocks, enhancedText);

            setModalText(parentBlocks);
        } catch (err) {
            console.error("AI Enhance Error:", err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * 選択したブロックのうち、親ブロックのみを抽出する
     * @param {Array} blocks
     * @returns {Array} 親ブロックのみのリスト
     */
    const filterParentBlocks = (blocks) => {
        const childIds = blocks.flatMap((block) => block.children.map((child) => child.id));
        return blocks.filter((block) => !childIds.includes(block.id));
    };

    /**
     * ブロックをAIが処理しやすい形に変換する
     * @param {Array} blocks
     * @returns {Object} ブロックIDをキーにしたテキストオブジェクト
     */
    const convertBlocksToContentMap = (blocks) => {
        return blocks.reduce((acc, block) => {
            acc[block.id] = block.content.map((c) => c.text).join("\n");
            return acc;
        }, {});
    };

    /**
     * 指定されたブロックとその子ブロックを再帰的に更新する
     * @param {Array} blocks
     * @param {Object} updatedTextMap
     */
    const updateBlocksRecursively = (blocks, updatedTextMap) => {
        blocks.forEach((block) => {
            if (updatedTextMap[block.id]) {
                block.content[0].text = updatedTextMap[block.id];
            }
            block.children?.forEach((child) => updateBlocksRecursively([child], updatedTextMap));
        });
    };

    // "置き換える" ボタンの処理
    const handleYesClick = () => {
        if (!modalText) {
            handleModalClose();
            return;
        }

        modalText.forEach((block) => applyUpdatedBlocks(block));
        handleModalClose();
    };

    /**
     * エディタに更新されたブロックを適用する
     * @param {Object} block
     */
    const applyUpdatedBlocks = (block) => {
        editor.updateBlock(block.id, { content: block.content[0].text });
        block.children?.forEach((child) => applyUpdatedBlocks(child));
    };

    // モーダルを閉じる
    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Components.FormattingToolbar.Button mainTooltip="AIによる文章改善" onClick={handleOpenModal}>
                文章を改善する
            </Components.FormattingToolbar.Button>

            {/* モーダルコンポーネント */}
            <Modal show={isModalOpen} onClose={handleModalClose} maxWidth="sm">
                <div className="p-4">
                    {loading ? (
                        <p>改善中...</p>
                    ) : (
                        <>
                            <BlockNoteEditor initialContent={modalText ?? null} />
                            <div className="mt-4 flex justify-end gap-2">
                                <button className="btn-secondary" onClick={handleModalClose}>
                                    キャンセル
                                </button>
                                <button className="btn-primary" onClick={handleYesClick}>
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
