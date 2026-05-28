## ADDED Requirements

### Requirement: 今日陪伴 Tab 文案
底部 Tab 中原「任務」Tab SHALL 改為「今日陪伴」，對應頁面為 P5。

#### Scenario: Tab Bar 顯示
- **WHEN** 用戶查看底部 Tab Bar
- **THEN** 第四項 Tab 顯示「✅ 今日陪伴」而非「任務」

### Requirement: 日常任務獎勵簡化
P5 日常任務 SHALL 採統一獎勵結構「食物 1 個 + 心情 +3」，即時發放，不發放愛心。

#### Scenario: 完成每日任務
- **WHEN** 用戶完成「來看看 Buddy」「為 Buddy 準備一餐」「摸摸 Buddy 5 次」「看 Buddy 收禮物」任一項
- **THEN** 立即發放食物 1 個 + 心情 +3，不發放愛心

#### Scenario: 不顯示愛心獎勵
- **WHEN** 用戶查看 P5 日常任務卡片
- **THEN** 獎勵欄 SHALL NOT 出現「愛心 +N」字樣

### Requirement: 任務分類週期
P5 SHALL 依下列週期分類顯示任務：每日（23:59 重置）、本週（週次重置）、月度（月初重置）、成就（一次性）。

#### Scenario: 每日重置
- **WHEN** 跨過 23:59
- **THEN** 每日任務狀態歸零，可再次完成

#### Scenario: 成就任務獎勵
- **WHEN** 用戶達成成就里程碑
- **THEN** 發放限定道具或夥伴日誌解鎖（非食物 + 心情）

### Requirement: 連續登入連擊
P5 頂部 SHALL 顯示連續登入連擊狀態，每日 +1 連擊獎勵。

#### Scenario: 顯示連擊數
- **WHEN** P5 載入
- **THEN** 頂部顯示當前連續登入天數
