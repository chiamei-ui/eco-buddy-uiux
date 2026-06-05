## ADDED Requirements

### Requirement: CHARACTER_TYPES.md 存在於 docs/animation/
`docs/animation/CHARACTER_TYPES.md` SHALL 存在，內容完整對應 RFP v1.0 §4，涵蓋全部 36 種 Buddy 型態規格（27 基礎型態 + 9 特殊隱藏型態）與 has_halo / has_cycle_crown 連動邏輯。

#### Scenario: 前端查閱型態驅動規格
- **WHEN** 前端工程師查閱某個 Buddy 型態的觸發條件
- **THEN** 可在 CHARACTER_TYPES.md 找到對應型態編號、狀態標籤組合、外觀描述，無需開啟 docx

#### Scenario: 動畫師確認型態覆蓋率
- **WHEN** 外包動畫師需確認 Phase 2 需製作幾種型態
- **THEN** CHARACTER_TYPES.md 列出完整 27 種基礎型態清單，每種含型態 ID、名稱、體型、外觀重點

---

### Requirement: 27 種基礎型態完整列表
文件 SHALL 包含 #01–#27 全部基礎型態，每條記錄包含：型態 ID、中文名稱、狀態標籤（hp/clean/mood 三段組合）、體型、外觀/動作重點。

#### Scenario: 依型態 ID 查找
- **WHEN** 任何人用 Ctrl+F 搜尋型態 ID（如 `#14`）
- **THEN** 可直接定位到對應型態的完整規格行

---

### Requirement: 9 種特殊隱藏型態含解鎖條件
文件 SHALL 包含 #28–#36 特殊隱藏型態，每條記錄包含：型態 ID、中文名稱、解鎖條件（後端 has_* 欄位名稱）、外觀特徵。

#### Scenario: 後端對齊解鎖欄位
- **WHEN** 後端工程師確認需要提供哪些 Boolean 欄位
- **THEN** 特殊型態表格中可直接查到每個型態對應的 has_* 欄位名稱

---

### Requirement: has_halo / has_cycle_crown 連動邏輯記錄
文件 SHALL 包含一節說明 has_halo / has_cycle_crown 連動規則，包含：#27 進入條件、has_halo=true 時如何觸發 #36 切換例外、月底重置邏輯。

#### Scenario: 前端串接特殊型態切換
- **WHEN** 前端工程師實作 has_halo=true 時的型態切換邏輯
- **THEN** CHARACTER_TYPES.md 中有明確說明 #27→#36 的切換條件與 Rive vs 後端責任劃分
