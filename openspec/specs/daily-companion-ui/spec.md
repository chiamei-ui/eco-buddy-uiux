## MODIFIED Requirements

### Requirement: 今日陪伴 Tab 文案
底部 Tab 中原「任務」Tab SHALL 改為兩字標籤「陪伴」，P5 頁面內部 `<h2>` 標題 SHALL 採完整稱呼「今日陪伴」。

**MODIFIED**：Tab 標籤兩字、頁面內標題全名；兩處皆不得出現「任務」。

#### Scenario: Tab Bar 顯示
- **WHEN** 用戶查看底部 Tab Bar
- **THEN** 第三項 Tab 顯示「✅ 陪伴」，不出現「任務」

#### Scenario: P5 頁面標題
- **WHEN** 用戶進入 P5
- **THEN** 頁面 h2 標題為「今日陪伴」，不出現「任務」

### Requirement: 日常任務獎勵簡化
P5 日常任務 SHALL 採統一獎勵結構「食物 1 個 + 心情 +3」，即時發放，不發放愛心。

**MODIFIED**：任務卡片獎勵欄 SHALL NOT 出現「+N 點」「愛心 +N」字樣，僅顯示食物圖示 + 心情值。

任務文案 SHALL 使用 Buddy 語言：
- `每日簽到` → `來看看 Buddy`
- `完成 1 次回收掃碼` → `帶食物回家`
- `餵食 3 次` → `為 Buddy 準備一餐`
- `撫摸夥伴 5 次` → `摸摸 Buddy 5 次`
- `看 1 次廣告領道具` → `看 Buddy 收禮物`

#### Scenario: 任務文案 Buddy 語言
- **WHEN** 用戶查看 P5 日常任務列表
- **THEN** 任務標題使用上列 Buddy 語言對照，不出現「回收掃碼」「餵食」「撫摸」等功能語言

#### Scenario: 不顯示愛心獎勵
- **WHEN** 用戶查看 P5 任務卡片獎勵欄
- **THEN** 獎勵欄 SHALL NOT 出現「+N 點」「愛心 +N」字樣

#### Scenario: 完成每日任務發放獎勵
- **WHEN** 用戶完成任意每日任務
- **THEN** 立即發放食物 1 個 + 心情 +3，不發放愛心

### Requirement: 任務分類週期
P5 SHALL 依下列週期分類顯示任務：每日（23:59 重置）、本週（週次重置）、月度（月初重置）、成就（一次性）。

**MODIFIED**：P5 週/月 Tab 切換不得鎖定，顯示友善空狀態而非「Phase 2」佔位頁。

#### Scenario: 每日重置
- **WHEN** 跨過 23:59
- **THEN** 每日任務狀態歸零，可再次完成

#### Scenario: 本週/月度空狀態
- **WHEN** 用戶切換至「本週」或「月度」Tab
- **THEN** 顯示友善空狀態文案，不出現「Phase 2」「即將開放」「🔒」鎖定圖示
