import './bootstrap';
import Alpine from 'alpinejs';
import React from "react";
import { createRoot } from "react-dom/client";
import BlockNote from "./components/Services/BlockNote/Editor";
import MemoIndex from "./components/Pages/Memo/index";

// Alpine.jsの初期化
window.Alpine = Alpine;
Alpine.start();

// 共通のレンダリング関数
function renderComponent(elementId, Component) {
    const element = document.getElementById(elementId);
    if (element) {
        const root = createRoot(element);
        root.render(<Component />);
    }
}

// 各コンポーネントのレンダリング
renderComponent("blockNote", BlockNote);
renderComponent("memoIndex", MemoIndex);
