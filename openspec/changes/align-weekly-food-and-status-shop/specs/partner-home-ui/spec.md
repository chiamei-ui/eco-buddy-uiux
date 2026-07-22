## MODIFIED Requirements

### Requirement: 食物欄存量上限
P1「Buddy 的餐袋」SHALL 顯示單一當週食物的存量 Badge；該食物的回收、商店與今日陪伴取得數 SHALL 共用 `[API: weekly_food_quota_count]`，上限為 `[API: weekly_food_quota_limit]`（目前定案值 5）。整袋月度存量 SHALL 不超過 `[API: monthly_food_bag_limit]`（目前定案值 12）。前端 SHALL 從 API／排程資料讀取食物與上限，不得依來源分成獨立庫存格。

#### Scenario: 三來源共用週配額
- **WHEN** 使用者透過回收、商店或今日陪伴取得當週食物
- **THEN** 同一個 `[API: weekly_food_quota_count]` 增加，且 P1 Badge 顯示實際餐袋存量

#### Scenario: 週配額達上限
- **WHEN** 當週食物計數達 `[API: weekly_food_quota_limit]`
- **THEN** P1 不再增加當週食物存量，且不顯示另一個來源可另外取得的食物格

#### Scenario: 月度整袋達上限
- **WHEN** 餐袋總存量達 `[API: monthly_food_bag_limit]`
- **THEN** P1 不再接受任何種類的食物入袋，並保留既有庫存供餵食

#### Scenario: 餵食扣減
- **WHEN** 用戶從餐袋拖曳當週食物至 Buddy 完成餵食
- **THEN** 餐袋存量 -1，且本週已取得計數不因此回退

### Requirement: P1 下週食物預告欄（#31）
P1 Buddy 的餐袋 SHALL 在預告時段顯示下週食物預告，並且只顯示種類、不顯示數量、不提供加入餐袋或購買入口。預告時段與內容 SHALL 由排程資料決定。

#### Scenario: 預告時段有排程資料
- **WHEN** 當前時間位於預告時段且後端提供下週食物排程
- **THEN** P1 顯示下週食物種類預告，不顯示個人配額數量

#### Scenario: 預告不可提前取得
- **WHEN** 使用者查看下週食物預告
- **THEN** 畫面不提供餵食、購買、加入餐袋或其他提前取得操作

#### Scenario: 無有效排程資料
- **WHEN** 預告時段內後端無法提供下週食物種類
- **THEN** P1 隱藏預告欄位或顯示安全空狀態，前端 SHALL NOT 自行推算食物種類

### Requirement: 食物配額制顯示
P1 餐袋 SHALL 反映每週三 12:00 重置當週食物取得計數、月底角色輪替時清空整袋的規則。食物不設獨立效期。

#### Scenario: 週三 12:00 重置
- **WHEN** 當前時間跨過週三 12:00
- **THEN** 當週食物取得計數歸零，既有餐袋存量不因週重置而清空

#### Scenario: 月底角色輪替
- **WHEN** 月底結算完成並進入新角色週期
- **THEN** 餐袋所有食物存量歸零，不影響玩具或裝扮庫存
