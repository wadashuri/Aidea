import { useBlockNoteEditor, useComponentsContext } from "@blocknote/react";
import "@blocknote/mantine/style.css";
import Modal from "@/Components/Modal";
import { useState } from "react";
import axios from "axios";
import BlockNoteEditor from "@/Services/BlockNote/BlockNoteEditor";

// TODO: 動いたがコードが汚すぎるのでリファクタリングする
export function AIEnhanceButton() {
    const editor = useBlockNoteEditor();
    const Components = useComponentsContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalText, setModalText] = useState(null);
    const [oldContent, setOldContent] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleModalClose = () => {
        // モーダルを閉じる
        setIsModalOpen(false);
    };

    // ブロックと子ブロックを再帰的に更新する関数
    const updateBlockAndChildren = (block, editor) => {
        // 親ブロックを更新
        editor.updateBlock(block.id, {
            content: block.content[0].text,
        });
    
        // 子ブロックが存在する場合、再帰的に処理
        block.children?.forEach((child) => updateBlockAndChildren(child, editor));
    };

    // ブロックと子ブロックを再帰的に更新する関数
    const updateBlockAndChildren2 = (key, value, editor) => {
        // 親ブロックを検索して更新
        if (editor[0].id === key) {
            editor[0].content[0].text = value;
        } else {
            console.error(`Block with ID ${key} not found.`);
        }
    
        // 子ブロックが存在する場合、再帰的に処理
        if (value.children) {
            Object.entries(value.children).forEach(([childKey, childValue]) =>
                updateBlockAndChildren2(childKey, childValue, editor)
            );
        }
    };

    /**
     * ブロックのIDをキー、内容を値とするオブジェクトを作成する関数
     * @param {Array} blocks - エディター内のブロック配列
     * @returns {Object} - ブロックIDをキー、文章内容を値とするオブジェクト
     */
    const mapBlocksToContent = (blocks) => {
        return blocks.reduce((acc, block) => {
            // 複数行テキストを結合して格納
            acc[block.id] = block.content.map((c) => c.text).join("\n");
            return acc;
        }, {});
    };
    
    // "置き換える" ボタンを押した際の処理
    const handleYesClick = () => {
        if (!modalText) {
            // TODO: ④昔のやつでupdateBlockAndChildrenを使って更新する

            handleModalClose();
            return;
        }
    
        // modalText 内のすべてのブロックに対して再帰処理を実行
        modalText.forEach((block) => updateBlockAndChildren(block, editor));
        handleModalClose();
    };

    // モーダルを開く際の処理
    const handleOpenModal = async () => {
        // 選択されたテキストブロックを取得
        const selectedBlocks = editor.getSelection().blocks;
        if (!selectedBlocks || selectedBlocks.length === 0) {
            return;
        }
        // 選択されたブロックの形式を再構築
        const hierarchicalBlocks1 = rebuildHierarchy(selectedBlocks);
        const hierarchicalBlocks = rebuildHierarchy(selectedBlocks);

        // ローディング開始
        setLoading(true);
        try {
            // モーダルを開く
            setIsModalOpen(true);

            // 昔の値をセット
            setOldContent(hierarchicalBlocks);

            const blockContentMap = mapBlocksToContent(editor.getSelection().blocks);

            const response = await axios.post("/memo/ai/text_enhance", {
                content: JSON.stringify(blockContentMap),
            });

            const enhancedText = JSON.parse(response.data.enhanced_text);

            Object.entries(enhancedText).forEach(([key, value]) => {
                updateBlockAndChildren2(key, value, hierarchicalBlocks);
            });
            console.log('正しくない', hierarchicalBlocks);

            if (hierarchicalBlocks) {
                // 改善された文章をセット
                setModalText(hierarchicalBlocks);
            } else {
                console.error("Unexpected data format:", editor);
                setError("改善結果のデータ形式が不正です。");
            }
        } catch (err) {
            console.error("AI Enhance Error:", err);
            setError("文章の改善に失敗しました。もう一度お試しください。");
        } finally {
            setLoading(false); // ローディング終了
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
                            <BlockNoteEditor initialContent={modalText ? modalText : null} />
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
