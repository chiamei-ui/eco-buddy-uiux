## MODIFIED Requirements

### Requirement: 三維屬性對外文案
全站對用戶可見的三維屬性 SHALL 統一使用「精神」「清爽」「心情」，禁止露出「HP」「潔淨度」等舊用語。

**MODIFIED**：hi-fi 原型尚有 P2b（`HP 預計補充`、`+8 HP / 份`）、P3、P4（道具 desc）、P8（`HP 78 · 潔淨 62`）、P9（`潔淨 +10`）、P12（`HP`、`潔淨`）、`app.jsx` 推播文案（`HP 低`、`潔淨低`）違反此規。所有露出 SHALL 改為 Buddy 世界語言。

#### Scenario: 屬性條標籤
- **WHEN** P1 / P2b / P12 / P9b 等任何頁面顯示屬性條
- **THEN** 標籤文字為「精神」「清爽」「心情」

#### Scenario: 禁用詞檢查
- **WHEN** 任何對用戶可見的 UI 文字（含推播 title / body）
- **THEN** SHALL NOT 出現「HP」「潔淨度」「潔淨」「Hit Point」等舊用語

#### Scenario: 推播文案 Buddy 化
- **WHEN** 三維屬性低於 30% 觸發推播
- **THEN** 文案以 Buddy 第一人稱口吻表達（如「Buddy 想念你了」「Buddy 想洗個澡」），不使用屬性原名

### Requirement: 功能語言轉換
全站 SHALL 依 `docs/pm_decisions_20260527/ECO_Buddy_文案對照表.md` 規則替換功能語言為 Buddy 世界語言（回收 → 帶食物回家 / 給 Buddy；點數 → 愛心；進化 → 變身；角色 / 寵物 → Buddy；完成 → 一起做到）。

**MODIFIED**：hi-fi 原型 `dialogues.jsx` 多處對話含「回收」字眼、`screens.jsx` P4 商店 Header 「ECOCO 點數」與 `points-pill` icon、`ShopPurchaseModal` 與 `ShopSuccessModal` 內「ECOCO 點數」標籤、`PointsSourceSheet` 標題「點數來源明細」皆違反此規。

#### Scenario: 商店點數文案
- **WHEN** P4 任一位置顯示貨幣標籤（Header / Modal / Sheet）
- **THEN** 使用「愛心」而非「ECOCO 點數」「點數」「point」

#### Scenario: 對話文案
- **WHEN** Buddy 對話框 / 系統提示出現舊功能動詞
- **THEN** SHALL NOT 出現「回收」「掃描」「投遞」等字眼，改用 Buddy 世界語言

### Requirement: 工程師語言禁用
全站對用戶可見文案 SHALL NOT 出現「Phase 2」「即將推出」「SDK 接管」「TODO」「Coming soon」等工程師語言。

**MODIFIED**：hi-fi 原型 P4 商品 `locked` 狀態按鈕「即將推出」、P6 廣告倒數「SDK 接管 · 15 秒後可跳過」、P4 商店 Tab 「Phase2」小標、P10 / P11 部分 Phase 2 區塊文字皆違反此規。

#### Scenario: P4 locked 商品呈現
- **WHEN** 商品屬於 Phase 2+ 範圍（如裝飾、音樂盒）
- **THEN** SHALL NOT 顯示「即將推出」「Phase 2」「Phase2」字樣；採以下其一處理：(a) 商品自當期商品清單隱藏；(b) 以「Buddy 還在準備中」等 Buddy 語言友善文案替代

#### Scenario: P6 廣告倒數文案
- **WHEN** P6 廣告倒數計時中
- **THEN** 文案為中性倒數（如「{N} 秒」「廣告進行中 · {N} 秒」），SHALL NOT 出現「SDK 接管」「SDK」「廣告 SDK」

#### Scenario: 全文搜尋禁用詞
- **WHEN** 對 `screens.jsx` / `screens-d2.jsx` / `dialogues.jsx` / `app.jsx` 進行用戶可見字串搜尋
- **THEN** 找不到「Phase 2」「Phase2」「即將推出」「即將開放」「SDK 接管」「Coming soon」「TODO」（注解除外）
