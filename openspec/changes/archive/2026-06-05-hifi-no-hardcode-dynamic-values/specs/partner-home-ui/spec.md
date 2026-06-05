## MODIFIED Requirements

### Requirement: 食物欄存量上限
P1 食物欄每格 SHALL 顯示累積存量 Badge，上限值 SHALL 從 API 欄位 `[API: food_slot_max_count]` 讀取（預設參考值 12）；每次餵食扣 1，歸零後需重新回收補充。前端 SHALL NOT hardcode 數字 12。

#### Scenario: 存量達上限
- **WHEN** 某食物格存量達 `[API: food_slot_max_count]` 上限
- **THEN** 該格 Badge 顯示上限數值，後續同種類回收不再累積進該格（受配額制限制）

#### Scenario: 餵食扣減
- **WHEN** 用戶從食物欄拖曳食物至 Buddy 完成餵食
- **THEN** 該格 Badge 數量 -1

### Requirement: 觸碰角色互動
P1 SHALL 支援直接點擊 Buddy 觸發心情值增加，每次增加量 `[API: tap_mood_gain]`（預設參考值 1），每日上限 `[API: tap_daily_limit]` 次（預設參考值 10）。前端 SHALL NOT hardcode 這兩個數字。

#### Scenario: 每日上限內點擊
- **WHEN** 當日點擊 Buddy 次數 < `[API: tap_daily_limit]`
- **THEN** 心情值 +`[API: tap_mood_gain]` 且播放點擊反應動畫（歪頭 / 跳一下 / 揮手 → 自動回 Idle）

#### Scenario: 達上限後點擊
- **WHEN** 當日點擊 Buddy 次數 ≥ `[API: tap_daily_limit]`
- **THEN** 點擊反應動畫照常播放，心情值不再增加
