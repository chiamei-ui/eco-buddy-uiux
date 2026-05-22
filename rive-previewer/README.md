# ECO BUDDY — Rive 預覽器

設計師專用的輕量網頁工具，用於即時預覽與驗證 `.riv` 動畫檔及 State Machine 邏輯。

## 專案目標

- 拖曳載入 `.riv` 檔，即時渲染角色動畫
- 自動讀取並列舉 State Machine inputs，產生對應控制介面
- 支援 36 種角色型態切換（HP × 潔淨度 × 心情值）
- 支援裝備、配件的即時套用與切換
- 驗證 Z-index 層級正確性與視覺無破圖

## 技術棧

- React 19 + TypeScript
- Vite（開發與建置）
- `@rive-app/react-canvas`（Rive 引擎）

## 快速開始

```bash
npm install
npm run dev
```

## 相關文件

- [開發環境設定](docs/dev-setup.md) — ESLint、TypeScript、React Compiler 設定細節
- [實作計畫](../implementation_plan.md) — 四個 Phase 的任務規劃
- [任務清單](../task.md) — 目前進度追蹤
