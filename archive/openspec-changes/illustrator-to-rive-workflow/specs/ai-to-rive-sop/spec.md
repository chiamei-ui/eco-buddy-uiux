## ADDED Requirements

### Requirement: Illustrator 圖層命名規範
設計師在 Illustrator 中製作素材時，SHALL 依照固定的圖層命名規則拆層，以確保 AI 轉換工具可正確識別各部位。

#### Scenario: 圖層命名符合規範
- **WHEN** 設計師依規範完成圖層命名並匯出 SVG
- **THEN** AI 轉換工具可無錯誤讀取所有部位圖層，並對應至 Rive 的 Bone/Shape 結構

#### Scenario: 圖層命名不符規範
- **WHEN** 圖層名稱未遵守命名規則（如含空格、使用中文）
- **THEN** 規範文件中的 Checklist 提示設計師修正，且不進入轉換流程

### Requirement: AI to Rive 轉換 SOP 文件
專案 SHALL 提供一份逐步操作的轉換 SOP，涵蓋從 Illustrator 匯出到 `.riv` 檔完成綁定的完整步驟。

#### Scenario: 設計師首次操作
- **WHEN** 設計師依照 SOP 文件操作，完成圖層命名、匯出、AI 轉換、Rive 綁定
- **THEN** 產出可在預覽器中正確播放的 `.riv` 檔

#### Scenario: SOP 驗收標準檢查
- **WHEN** 設計師完成轉換後，對照 SOP 中的驗收 Checklist
- **THEN** 所有必填項目均通過，才可進入預覽器驗證流程
