## 1. State 擴充

- [x] 1.1 在 `app.jsx` `DEFAULT_STATE` 新增 `orderHistory` 陣列，預填 2–3 筆不同狀態的 mock 訂單（success / pending / failed）
- [x] 1.2 在 `stateReducer` 新增 `PURCHASE_CASH` action：push 一筆 `{ id, name, price, date, status: 'success' }` 至 `orderHistory`

## 2. app.jsx 路由

- [x] 2.1 在 router switch 新增 `case 'p4-orders': return <P4Orders setScreen={setScreen} state={state} />;`

## 3. 新增 P4Orders 元件（screens.jsx）

- [x] 3.1 建立 `P4Orders` 元件，包含 NavBack（返回上一頁）與頁面標題「購買紀錄」
- [x] 3.2 實作訂單列表：map `state.orderHistory`，每筆渲染一張訂單卡片（商品名、訂單編號、NT$ 金額、日期、狀態標籤）
- [x] 3.3 實作狀態標籤色彩：`success` 綠色「已完成」、`pending` 橘色「處理中」、`failed` 灰色「失敗」
- [x] 3.4 實作空狀態：`orderHistory` 為空時顯示 emoji 插圖 + 「還沒有購買紀錄」文字
- [x] 3.5 頁面底部新增灰色小字：「裝扮類商品由 App Store / Google Play 管理，請至手機系統查詢訂單」

## 4. P8 我的頁面入口

- [x] 4.1 在 `P8Profile` `featureGroups` GAME 區塊新增入口：`{ icon: '🧾', label: '購買紀錄', sub: <最近訂單名稱 或 '尚無購買紀錄'>, go: 'p4-orders' }`

## 5. BuySuccessModal 修改

- [x] 5.1 在 `BuySuccessModal` 內，`isCash === true` 時，關閉按鈕下方新增「查看訂單 ›」文字連結
- [x] 5.2 點擊「查看訂單 ›」時：呼叫 `onClose()`，並 `setScreen('p4-orders')`（需將 `setScreen` 傳入 modal）
- [x] 5.3 確認 `isCash === false`（點數購買）時不顯示「查看訂單 ›」

## 6. 購買流程串接 PURCHASE_CASH

- [x] 6.1 在 P4Shop 購買確認邏輯（現金購買成功分支）dispatch `PURCHASE_CASH`，帶入商品名稱、金額、產生的 orderId

## 7. 樣式

- [x] 7.1 在 `styles.css` 新增 `.order-card` 卡片樣式（white bg、rounded-2xl、shadow-sm、padding）
- [x] 7.2 新增訂單狀態標籤色彩 class：`.order-status-success`、`.order-status-pending`、`.order-status-failed`
- [x] 7.3 新增空狀態容器樣式 `.order-empty`（置中、灰色文字）
