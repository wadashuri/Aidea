import { useBlockNoteEditor, useComponentsContext } from "@blocknote/react";
import "@blocknote/mantine/style.css";
import Modal from "@/Components/Modal";
import { useState } from "react";
import axios from "axios"; // AI API 呼び出しに使用
import BlockNoteEditor from "@/Services/BlockNote/BlockNoteEditor";

/**
 * INFO: コードは汚いが機能作成まで完了した
 * TODO: リファクタリングをしっかりと進めた上で、masterにマージする
 */
export function AIEnhanceButton() {
    const editor = useBlockNoteEditor();
    const Components = useComponentsContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalText, setModalText] = useState(""); // モーダルに表示するテキスト
    const [loading, setLoading] = useState(false); // ローディング状態
    const [error, setError] = useState(null); // エラーメッセージ

    // モーダルを閉じる
    const handleModalClose = () => {
        setIsModalOpen(false);
        setError(null); // エラーメッセージをリセット
    };

    // "置き換える" ボタンを押した際の処理
    const handleYesClick = () => {
        if (modalText) {
            // 再帰的にすべてのブロックを更新する関数
            const updateBlockAndChildren = (block) => {
                // 親ブロックを更新
                editor.updateBlock(block.id, {
                    content: block.content[0].text,
                });
    
                // 子ブロックが存在する場合、それらを再帰的に処理
                if (block.children && block.children.length > 0) {
                    block.children.forEach((childBlock) => updateBlockAndChildren(childBlock));
                }
            };
    
            // modalText 内のすべてのブロックに対して再帰処理を実行
            modalText.forEach((block) => {
                updateBlockAndChildren(block);
            });
        }
        handleModalClose();
    };

    // モーダルを開く処理
    const handleOpenModal = async () => {
        const selectedBlocks = editor.getSelection().blocks; // 選択されたテキスト
        if (!selectedBlocks || selectedBlocks.length === 0) {
            setError("文章が選択されていません。");
            return;
        }

        const hierarchicalBlocks = rebuildHierarchy(selectedBlocks);

        setLoading(true); // ローディング開始
        setError(null); // エラーメッセージをリセット

        try {
            setIsModalOpen(true); // モーダルを開く

            // AI API を呼び出して文章を改善
            const response = await axios.post("/memo/ai/text_enhance", {
                content: JSON.stringify(hierarchicalBlocks),
            });

            // 改善された文章をセット
            console.log(JSON.parse(response.data.enhanced_text));
            setModalText(JSON.parse(response.data.enhanced_text));
        } catch (err) {
            console.error("AI Enhance Error:", err);
            setError("文章の改善に失敗しました。もう一度お試しください。");
        } finally {
            setLoading(false); // ローディング終了
        }
    };

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
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </Modal>
        </>
    );
}
