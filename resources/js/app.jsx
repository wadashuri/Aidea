import './bootstrap';
import Alpine from 'alpinejs';
import React from "react";
import { createRoot } from "react-dom/client";
import ExampleComponent from "./components/ExampleComponent";

// Alpine.jsの初期化
window.Alpine = Alpine;
Alpine.start();

// Reactコンポーネントのレンダリング
const container = document.getElementById("example");
if (container) {
    const root = createRoot(container);
    root.render(<ExampleComponent />);
}
