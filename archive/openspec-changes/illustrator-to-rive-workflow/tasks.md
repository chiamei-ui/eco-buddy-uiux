## 1. 規範文件建立

- [ ] 1.1 撰寫 Illustrator 圖層命名規範文件（`docs/ai-to-rive-sop.md`），含命名規則、禁止項目與驗收 Checklist
- [ ] 1.2 撰寫 Rive State Machine 命名詞典初版（`docs/state-machine-dictionary.md`），定義所有 inputs 名稱、型別、允許值與版本號
- [ ] 1.3 與工程師對齊命名詞典，鎖定 v1.0 版本
- [ ] 1.4 更新 `rive-previewer/README.md`，反映完整工作流定位（已部分完成）

## 2. Rive 預覽器核心功能

- [ ] 2.1 安裝 `@rive-app/react-canvas` 依賴
- [ ] 2.2 實作拖曳載入 `.riv` 檔功能，錯誤格式需顯示明確提示
- [ ] 2.3 實作 State Machine inputs 自動讀取，動態產生控制 UI
- [ ] 2.4 實作 36 種型態切換介面（HP × 潔淨度 × 心情值三軸選擇器），顯示型態編號與名稱
- [ ] 2.5 實作動畫播放控制（播放/暫停/速度調整/逐格）

## 3. 裝備套用與 Z-index 驗證

- [ ] 3.1 實作裝備/配件載入介面（支援多個 `.riv` 或圖層疊加）
- [ ] 3.2 實作 Z-index 衝突偵測，高亮顯示衝突區域並提示設計師
- [ ] 3.3 提供 Z-index 層級順序的視覺化清單

## 4. 已確認素材登錄機制

- [ ] 4.1 建立 `registry/` 目錄結構（`characters/`、`costumes/`、`accessories/`）
- [ ] 4.2 定義 `spec.json` 結構（型態編號、名稱、`.riv` 路徑、State Machine input 值、確認日期）
- [ ] 4.3 在預覽器中實作「確認登錄」按鈕，驗證通過後寫入 `registry/`
- [ ] 4.4 實作重複登錄時的覆蓋確認提示，並保留舊版快照
- [ ] 4.5 實作 `npm run registry:list` CLI 指令，輸出所有已確認素材清單

## 5. 自動化交付流程

- [ ] 5.1 實作 `scripts/datameta-scan.js`，掃描 `registry/` 產出 `output/asset-manifest.md`
- [ ] 5.2 實作 `npm run datameta-scan` 指令，含空目錄警告
- [ ] 5.3 實作 `scripts/delivery-pack.js`，將已確認素材打包至 `delivery/<date>/` 並壓縮
- [ ] 5.4 實作 `npm run delivery:pack` 指令，含完整性驗證（列出缺少 `.riv` 的素材）

## 6. 驗證與文件

- [ ] 6.1 使用測試 `.riv` 檔完整測試預覽器的 36 種型態切換、裝備套用、Z-index 驗證
- [ ] 6.2 執行端對端工作流測試：Illustrator → SOP → 預覽器 → 登錄 → datameta-scan → delivery-pack
- [ ] 6.3 補充 `docs/workflow-guide.md`，說明設計師完整操作流程（含截圖）
- [ ] 6.4 補充 `docs/engineer-handoff.md`，說明工程師如何閱讀交付包與資產清單
