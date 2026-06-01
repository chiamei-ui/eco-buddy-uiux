## ADDED Requirements

### Requirement: 禮包專屬 tab 存在
P4 商店 Tab Bar SHALL 包含一個 id 為 `package`、label 為「禮包」的頁籤，顯示所有 IAP 方案商品。

#### Scenario: 禮包 tab 正常顯示
- **WHEN** 用戶進入 P4 商店
- **THEN** Tab Bar SHALL 顯示「禮包」頁籤，且點擊後顯示禮包商品列表

#### Scenario: 禮包 tab 有商品才顯示
- **WHEN** `items.package` 陣列非空
- **THEN** 「禮包」tab 出現在 Tab Bar 中

### Requirement: IAP 商品歸屬禮包 tab
月底衝刺禮包與月度通行證 SHALL 僅出現在「禮包」tab 的 cash-strip，不出現在其他 tab。

#### Scenario: 食物 tab 不含 IAP 商品
- **WHEN** 用戶切換至「食物」tab
- **THEN** cash-strip SHALL NOT 顯示月底衝刺禮包或月度通行證

#### Scenario: 禮包 tab 包含 IAP 商品
- **WHEN** 用戶切換至「禮包」tab
- **THEN** cash-strip SHALL 顯示月度通行證，月底期間額外顯示月底衝刺禮包

### Requirement: 月底倒數 badge 顯示在禮包 tab chip
於每月 22–28 日（原型以 tweaks.shopSprint 模擬），「禮包」tab chip SHALL 顯示黃色倒數天數 badge（格式：`N天`）。

#### Scenario: 月底期間 badge 出現
- **WHEN** `isSprintPeriod === true`
- **THEN** 「禮包」tab chip 右上顯示黃底黑字倒數 badge，文字為 `{daysLeft}天`

#### Scenario: 非月底期間 badge 不顯示
- **WHEN** `isSprintPeriod === false`
- **THEN** 「禮包」tab chip SHALL NOT 顯示任何 badge

### Requirement: 禮包 tab 的 cash-strip 卡片互動
禮包 tab 內的商品卡片 SHALL 遵循與其他 tab cash-strip 相同的互動規則，包含詳情 sheet 與已購狀態。

#### Scenario: 點擊有詳情的禮包商品
- **WHEN** 用戶點擊含 `contents` 或 `benefits` 的禮包卡片且尚未購買
- **THEN** ProductDetailSheet SHALL 開啟顯示商品完整內容

#### Scenario: 已購商品不可再點擊
- **WHEN** 商品對應 `state.sprintPurchased` 或 `state.hasPass` 為 true
- **THEN** 卡片顯示已購狀態（✓ 本月已領 / ✓ 啟用中），且 onClick 無效
