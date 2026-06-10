## ADDED Requirements

### Requirement: ECOCO 點數購買紀錄 Tab 顯示消費明細
`p4-orders` 頁面 SHALL 包含「ECOCO 點數」Tab，列出所有以 ECOCO 點數購買的商品紀錄，依購買時間降序排列（最新在前）。每筆紀錄卡片 SHALL 顯示商品縮圖（`thumb` emoji）、商品名稱、扣款點數（`-N 點`）、購買日期時間。

#### Scenario: 有點數訂單時顯示列表
- **WHEN** `state.pointsOrderHistory` 陣列非空
- **THEN** 每筆紀錄 SHALL 以卡片顯示：商品縮圖、商品名稱、扣款點數（`-N 💎`）、購買日期時間

#### Scenario: 無點數訂單時顯示空狀態
- **WHEN** `state.pointsOrderHistory` 陣列為空
- **THEN** 頁面 SHALL 顯示空狀態插圖與文字「還沒有點數消費紀錄」

### Requirement: 點數購買成功後寫入點數訂單紀錄
完成 ECOCO 點數購買後，`PURCHASE_POINTS` action SHALL 將含商品資訊的完整紀錄物件寫入 `state.pointsOrderHistory`。

#### Scenario: 成功購買寫入點數訂單
- **WHEN** 用戶確認點數商品購買
- **THEN** `state.pointsOrderHistory` SHALL 新增一筆 `{ id, name, thumb, pointsCost, date }` 物件

### Requirement: 點數 Tab 為 Phase 1 預設 Tab
`p4-orders` 頁面 SHALL 預設顯示「ECOCO 點數」Tab（Phase 1）。

#### Scenario: 進入頁面預設停在點數 Tab
- **WHEN** 用戶從 P8 進入 `p4-orders`
- **THEN** 頁面 SHALL 預設停在「ECOCO 點數」Tab，不停在「現金」Tab
