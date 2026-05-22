## Why

目前專案定位僅為「Rive 預覽器」，無法涵蓋設計師從 Illustrator 素材製作到交付工程師的完整流程。缺乏標準化的圖層命名規範、State Machine 命名詞典與自動化打包交付機制，且沒有機制記錄「已設計師確認」的角色型態、動態與裝備，導致後續開發新角色時無跡可循，設計與工程之間需要大量人工溝通與反覆修正。

## What Changes

- 將專案重新定位為「UI 設計師完整工作流工具鏈」，而非單一預覽器
- 新增 Illustrator 圖層命名規範文件與驗證工具
- 新增 Rive State Machine 命名詞典（單一真理來源）
- 新增從 AI 生成素材到 Rive 綁定的半自動化 SOP
- 擴充 Rive 預覽器為「設計驗證工具」（支援 36 種型態、裝備套用、Z-index 驗證）
- 新增「已確認素材登錄機制」：設計師在預覽器驗證通過後，可將角色型態、動態、裝備標記為「確認完成」，並自動建立結構化索引，作為後續角色開發的範本與參考基準
- 新增交付打包流程：自動產出設計資產清單（Word 圖鑑）供工程師參考
- **BREAKING**：`rive-previewer` 專案目標與 README 需全面更新

## Capabilities

### New Capabilities

- `ai-to-rive-sop`: 從 Illustrator 向量稿經 AI 輔助轉換為 `.riv` 檔的標準作業流程文件與圖層命名規範
- `state-machine-dictionary`: Rive State Machine inputs/outputs 命名詞典，作為設計與工程共用的單一真理
- `rive-design-validator`: 設計師用 Rive 網頁預覽器，支援拖曳載入、36 種型態切換、裝備配件套用、Z-index 驗證
- `confirmed-asset-registry`: 設計端驗證通過後的素材登錄機制，記錄已確認的角色型態、動態、裝備規格，作為後續角色開發的參考基準與範本庫
- `asset-delivery-pipeline`: 素材驗證完成後的交付打包流程，自動產出資產清單（`/datameta-scan` SOP）

### Modified Capabilities

（無現有 spec，不適用）

## Impact

- `rive-previewer/`：從 Vite 空殼擴充為完整設計驗證工具
- 新增 `docs/` 規範文件目錄（圖層命名、命名詞典）
- 新增 `registry/` 目錄：儲存已確認的角色型態、動態、裝備索引與規格快照
- 新增 `scripts/` 自動化腳本目錄（datameta-scan）
- 依賴新增：`@rive-app/react-canvas`
- 工程師交付格式：標準化 `.riv` + 資產清單，無需額外溝通規格
- 後續新角色開發可直接參照 `registry/` 中已確認的範本，確保一致性
