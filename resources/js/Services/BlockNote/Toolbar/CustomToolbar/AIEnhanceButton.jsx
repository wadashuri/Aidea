import { useBlockNoteEditor, useComponentsContext } from "@blocknote/react";
import "@blocknote/mantine/style.css";
import Modal from "@/Components/Modal";
import { useState } from "react";
import axios from "axios"; // AI API 呼び出しに使用
import BlockNoteEditor from "@/Services/BlockNote/BlockNoteEditor";

    /**
     * 一旦動くところまで作成
     * TODO: ・コードのブラッシュアップ
     *       ・インデントが勝手についてしまう問題を解決
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
            editor.insertInlineContent(modalText); // 改善された文章を挿入
        }
        handleModalClose();
    };

    // モーダルを開く処理
    const handleOpenModal = async () => {
        const selectedText = editor.getSelection().blocks; // 選択されたテキスト
        if (!selectedText || selectedText.length === 0) {
            setError("文章が選択されていません。");
            return;
        }

        setLoading(true); // ローディング開始
        setError(null); // エラーメッセージをリセット

        try {
            // AI API を呼び出して文章を改善
            const response = await axios.post("/memo/ai_text_enhance", {
                text: selectedText, // テキストを文字列に変換して送信
            });

            // 改善された文章をセット
            setModalText(JSON.parse(response.data.enhanced_text));
            setIsModalOpen(true); // モーダルを開く
        } catch (err) {
            console.error("AI Enhance Error:", err);
            setError("文章の改善に失敗しました。もう一度お試しください。");
        } finally {
            setLoading(false); // ローディング終了
        }
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
