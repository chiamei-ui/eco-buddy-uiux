## Context

ECO BUDDY 專案需要一套完整的設計師工作流，涵蓋從 Illustrator 素材製作到最終交付遊戲工程師的每個環節。目前 `rive-previewer` 僅是 Vite + React 空殼，缺乏 Rive 引擎整合、規範文件、素材登錄機制與交付流程。

現有工具鏈缺口：
1. 無圖層命名標準 → AI 轉換失敗率高
2. 無 State Machine 命名詞典 → 工程師每次都需重新對齊規格
3. 無設計驗證工具 → 素材問題到工程端才被發現
4. 無已確認素材的結構化記錄 → 開發新角色時無範本可循
5. 無自動化交付流程 → 全靠人工整理與溝通

## Goals / Non-Goals

**Goals:**
- 定義 Illustrator 圖層命名規範，讓 AI 轉換工具可直接讀取
- 建立 State Machine 命名詞典作為設計/工程共用的單一真理
- 實作 Rive 網頁預覽器：拖曳載入 `.riv`、切換 36 種型態、套用裝備、驗證 Z-index
- 建立「已確認素材登錄機制」：結構化記錄設計端驗證通過的型態、動態、裝備
- 實作 `/datameta-scan` 自動產出資產清單供工程師使用

**Non-Goals:**
- 不自動生成 `.riv` 動畫（AI to Rive 為 SOP 文件，非自動化工具）
- 不整合 Illustrator 插件（流程以文件規範 + 人工操作為主）
- 不建構後端服務（所有工具為本地靜態網頁或 CLI 腳本）

## Decisions

### 1. Rive 預覽器技術選型：`@rive-app/react-canvas`

選擇官方 React 套件而非直接使用 `@rive-app/webgl2`。
- **理由**：與現有 React 19 + Vite 技術棧相容，API 穩定，State Machine 控制介面完整。
- **替代方案考量**：原生 JS SDK 較彈性但需手動管理 canvas 生命週期，增加維護成本。

### 2. 素材登錄機制：JSON 索引 + Markdown 規格快照

已確認素材以 `registry/<category>/<name>/spec.json` 儲存結構化資料，搭配 `spec.md` 人類可讀說明。
- **理由**：JSON 可供腳本自動讀取產出清單；Markdown 讓設計師與工程師直接閱讀。
- **替代方案考量**：資料庫方案（SQLite）過重，純 Markdown 不易程式化解析。

### 3. `/datameta-scan` 實作方式：Node.js CLI 腳本

掃描 `registry/` 目錄，讀取所有 `spec.json`，產出 Markdown 資產清單（可另存為 Word）。
- **理由**：不依賴額外服務，設計師在終端機執行即可；Markdown 轉 Word 可用 Pandoc。
- **替代方案考量**：直接產 Word 需依賴 `docx` 套件，增加複雜度。

### 4. 工作流順序（設計師視角）

```
Illustrator 製作素材
  → 依圖層命名規範拆層
  → AI 輔助轉換為 .riv（參照 SOP）
  → 拖曳進 Rive 預覽器驗證
  → 驗證通過 → 登錄至 registry/
  → 執行 /datameta-scan → 產出交付清單
  → 交付 .riv + 清單給工程師
```

## Risks / Trade-offs

- **[Risk] AI to Rive 轉換品質不穩定** → Mitigation：SOP 文件明確規定驗收標準，預覽器作為品質關卡，不通過不登錄。
- **[Risk] 36 種型態的 State Machine inputs 因角色不同而異** → Mitigation：命名詞典定義固定的 input 名稱，所有角色強制遵守，預覽器依詞典產生控制 UI。
- **[Risk] registry/ 內容隨時間累積龐大** → Mitigation：按類別分目錄（`characters/`、`costumes/`、`accessories/`），並提供 CLI 查詢工具。
- **[Risk] Pandoc 未安裝導致 Word 產出失敗** → Mitigation：預設輸出 Markdown，Word 轉換為可選步驟，文件中說明安裝方式。

## Open Questions

- State Machine 命名詞典的初版 inputs 清單由誰定義（設計師或工程師）？建議召開一次跨部門對齊會議後再鎖定。
- `registry/` 是否需要版本控管（git）？建議納入，讓每次登錄都有 commit 記錄。
