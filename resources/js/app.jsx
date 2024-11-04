import './bootstrap';
import Alpine from 'alpinejs';
import React from "react";
import { createRoot } from "react-dom/client";
import BlockNote from "./components/BlockNote/Editor";

// Alpine.jsの初期化
window.Alpine = Alpine;
Alpine.start();

// Reactコンポーネントのレンダリング
const blockNoteId = document.getElementById("blockNote");
if (blockNoteId) {
    const root = createRoot(blockNoteId);
    root.render(<BlockNote />);
}
