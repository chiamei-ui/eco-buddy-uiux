## MODIFIED Requirements

### Requirement: 回收結果頁（P2b）配額狀態切換
P2b SHALL 依當週食物的共用配額顯示實際可獲得數量。配額未滿時，結果顯示當週食物、實際入袋數與潔淨結果；配額已滿時，不得產出食物，也不得增加超額體力。P2b SHALL 在預告時段只顯示下週食物種類，不提供提前取得入口。

#### Scenario: 配額未滿
- **WHEN** 當週食物的共用取得計數小於 `[API: weekly_food_quota_limit]` 且餐袋未滿
- **THEN** P2b 顯示實際獲得的當週食物種類與數量，完成後寫入同一個共用計數器

#### Scenario: 配額已滿
- **WHEN** 當週食物的共用取得計數已達 `[API: weekly_food_quota_limit]`
- **THEN** P2b 顯示「本週食物已領滿」，不得產出食物或增加超額體力

#### Scenario: 超額潔淨待決議
- **WHEN** 當週食物配額已滿且回收結果包含潔淨增量
- **THEN** 前端依後端明確回傳的潔淨結果呈現，MUST NOT 自行推導超額潔淨規則

#### Scenario: 下週食物預告
- **WHEN** 當前時間位於預告時段且有下週排程
- **THEN** P2b 顯示下週食物種類，且不提供加入餐袋或購買操作
