## MODIFIED Requirements

### Requirement: 食物欄存量上限
P1 食物欄每格 SHALL 顯示累積存量 Badge，上限值 SHALL 從 API 欄位 `[API: food_slot_max_count]` 讀取（預設參考值 12）；每次餵食扣 1，歸零後需重新回收補充。前端 SHALL NOT hardcode 數字 12。庫存歸零時，該格 SHALL 顯示中性空餐盤狀態，不得繼續顯示原食物圖像、原食物名稱或數量 Badge。

#### Scenario: 存量達上限
- **WHEN** 某食物格存量達 `[API: food_slot_max_count]` 上限
- **THEN** 該格 Badge 顯示上限數值，後續同種類回收不再累積進該格（受配額制限制）

#### Scenario: 餵食扣減
- **WHEN** 用戶從食物欄拖曳食物至 Buddy 完成餵食
- **THEN** 該格 Badge 數量 -1

#### Scenario: 最後一個食物吃完
- **WHEN** 用戶完成餵食後該格庫存由 1 變為 0
- **THEN** 該格改顯示空餐盤圖示與「空餐盤」，且不顯示剛吃完的食物圖像、名稱或 Badge
