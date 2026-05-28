## ADDED Requirements

### Requirement: 三維屬性對外文案
全站對用戶可見的三維屬性 SHALL 統一使用「精神」「清爽」「心情」，禁止露出「HP」「潔淨度」等舊用語。

#### Scenario: 屬性條標籤
- **WHEN** P1 / P2b / P12 / P9b 等任何頁面顯示屬性條
- **THEN** 標籤文字為「精神」「清爽」「心情」

#### Scenario: 禁用詞檢查
- **WHEN** 任何對用戶可見的 UI 文字
- **THEN** SHALL NOT 出現「HP」「潔淨度」「Hit Point」等舊用語

### Requirement: 底部 Tab 文案
底部 Tab Bar SHALL 顯示「🐾 夥伴」「🛒 商店」「📖 夥伴日誌」「✅ 今日陪伴」四項。

#### Scenario: Tab 文字
- **WHEN** 用戶查看底部 Tab Bar
- **THEN** Tab 文字精確為「夥伴」「商店」「夥伴日誌」「今日陪伴」

#### Scenario: 禁用舊文案
- **WHEN** 底部 Tab Bar 載入
- **THEN** SHALL NOT 出現「任務」「圖鑑」字樣

### Requirement: 功能語言轉換
全站 SHALL 依 `docs/pm_decisions_20260527/ECO_Buddy_文案對照表.md` 規則替換功能語言為 Buddy 世界語言（回收 → 帶食物回家 / 給 Buddy；點數 → 愛心；進化 → 變身；角色 / 寵物 → Buddy；完成 → 一起做到）。

#### Scenario: 商店點數文案
- **WHEN** P4 顯示點數
- **THEN** 使用「愛心」而非「ECOCO 點數」「點數」

#### Scenario: 掃碼動作文案
- **WHEN** 任何位置提及「回收」「掃描」等功能動作
- **THEN** 改用 Buddy 世界語言（如「帶食物回家給 Buddy」）

#### Scenario: 進化文案
- **WHEN** Buddy 狀態改變時的提示
- **THEN** 使用「變身」而非「進化」

### Requirement: 工程師語言禁用
全站對用戶可見文案 SHALL NOT 出現「Phase 2」「即將推出」「SDK 接管」「TODO」「Coming soon」等工程師語言。

#### Scenario: 未開放功能呈現
- **WHEN** 某功能屬於 Phase 2+ 範圍
- **THEN** UI 上不露出，或以 Buddy 世界語言包裝（如「Buddy 還在準備中」）
