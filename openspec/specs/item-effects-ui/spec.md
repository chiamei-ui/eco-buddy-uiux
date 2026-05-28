## ADDED Requirements

### Requirement: 道具效果數值
P9b 道具使用動畫 SHALL 依下列效果更新屬性：逗貓棒 心情 +15；小球 心情 +15；梳子 清爽 +15 + 心情 +10；零食 精神 +15 + 心情 +15。

**NOTE（2026-05-28）**：hi-fi 原型 P4 商店道具卡片 `desc` 文字、P6 廣告道具預覽效果敘述 SHALL 與本要求一致；舊數值（逗貓棒 +8 / 小球 +6 / 梳子 潔淨 +10 / 零食 HP +3）已全面更新。

#### Scenario: 使用逗貓棒
- **WHEN** 用戶使用逗貓棒
- **THEN** 播放「跳躍抓取」Rive State 並更新心情 +15

#### Scenario: 使用小球
- **WHEN** 用戶使用小球
- **THEN** 播放「UseItem」Rive State 並更新心情 +15

#### Scenario: 使用梳子
- **WHEN** 用戶使用梳子
- **THEN** 播放「Clean」Rive State 並更新清爽 +15、心情 +10

#### Scenario: 使用零食
- **WHEN** 用戶使用零食
- **THEN** 播放「Feed」Rive State 並更新精神 +15、心情 +15

#### Scenario: P4 商店商品描述對齊
- **WHEN** 用戶查看 P4 商店道具卡片 `desc`
- **THEN** 文字精確為「心情 +15」「心情 +15」「清爽 +15、心情 +10」「精神 +15、心情 +15」，SHALL NOT 出現舊數值或「HP」「潔淨」字樣

#### Scenario: P6 廣告道具預覽對齊
- **WHEN** 用戶於 P6 看廣告領道具的預覽
- **THEN** 顯示效果數值與上述四項一致

### Requirement: 道具有效期顯示
P9 道具背包 SHALL 依來源顯示有效期：免費道具 24 小時（當日 23:59 消失）；付費消耗類 7 日（可帶到下個月）；付費永久類無限次（綁定帳號）。

#### Scenario: 顯示有效期 Badge
- **WHEN** 用戶查看 P9 道具卡片
- **THEN** 卡片顯示對應有效期資訊

#### Scenario: 過期前 6 小時警告
- **WHEN** 道具距離過期 ≤ 6 小時
- **THEN** P9 顯示 Banner 警告，且觸發推播提醒

### Requirement: 使用後流程
P9b 動畫結束後 SHALL 將道具數量 -1 並返回 P9 或 P1。

#### Scenario: 使用完成
- **WHEN** P9b 動畫完成
- **THEN** 道具庫存 -1 且依進入路徑返回對應頁

### Requirement: 空背包狀態
P9 為空時 SHALL 提供兩個入口：看廣告抽（→ P6）與去商店逛（→ P4）。

#### Scenario: 背包為空
- **WHEN** 用戶背包無任何道具
- **THEN** 顯示空狀態畫面 + 兩個 CTA
