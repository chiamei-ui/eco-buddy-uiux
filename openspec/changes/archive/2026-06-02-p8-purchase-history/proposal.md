## Why

現金購買的禮包與通行證在完成交易後，用戶沒有任何地方可以查到訂單紀錄、確認狀態、或是在客服申訴時提供憑證。裝扮屬於平台 IAP，由 App Store / Google Play 管理；禮包與通行證透過應用層金流（藍新），必須由 App 自行保存並提供查詢入口。

## What Changes

- P8「我的」頁面 GAME 區塊新增「購買紀錄」列表入口
- 新增訂單列表頁（`P4-orders`），顯示禮包與通行證的歷史訂單
- 每筆訂單顯示：商品名稱、訂單編號、金額、購買日期、狀態（成功 / 處理中 / 失敗）
- 裝扮（IAP）不顯示在列表中，列表頁底部加一行引導文字，指示用戶至手機系統查詢裝扮訂單
- 購買成功 modal 的「關閉」按鈕旁新增「查看訂單」捷徑，直接跳轉訂單列表頁

## Capabilities

### New Capabilities

- `purchase-history-ui`: P8 入口 + 訂單列表頁的 UI，含空狀態、各種訂單狀態樣式、IAP 引導提示

### Modified Capabilities

- `shop-package-tab`: 購買成功 modal 新增「查看訂單」捷徑按鈕（需求層級變更）

## Impact

- `screens.jsx`：新增 `P4Orders` 元件、修改 P8 `featureGroups`、修改購買成功 modal
- `app.jsx`：`DEFAULT_STATE` 新增 `orderHistory` 陣列（mock 資料）、router 新增 `p4-orders` 路由
- `styles.css`：新增訂單列表頁與訂單卡片樣式
