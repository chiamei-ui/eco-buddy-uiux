## Requirements

### Requirement: P8 我的頁面有購買紀錄入口
P8「我的」頁面 GAME 區塊 SHALL 包含「購買紀錄」列表入口，點擊後導航至訂單列表頁（`p4-orders`）。

#### Scenario: 點擊購買紀錄入口
- **WHEN** 用戶在 P8「我的」頁面點擊「購買紀錄」
- **THEN** 應用 SHALL 導航至 `p4-orders` 訂單列表頁

#### Scenario: 入口顯示副標題
- **WHEN** 用戶查看 P8 GAME 區塊
- **THEN** 「購買紀錄」入口 SHALL 顯示最近一筆訂單的商品名稱作為副標題；若無紀錄則顯示「尚無購買紀錄」

### Requirement: 訂單列表頁顯示禮包與通行證訂單
`p4-orders` 頁面 SHALL 顯示所有以現金購買的禮包與通行證訂單，依購買時間降序排列（最新在前）。每筆訂單卡片 SHALL 顯示商品縮圖（`thumb` emoji）、商品名稱、訂單編號、金額（NT$）、付款方式（`payMethod`）、購買日期、狀態標籤。

禮包與通行證類型訂單（可透過 `order.name` 比對 `SHOP_IAP_CONFIG` 識別出有 `contents` 或 `benefits` 欄位者）SHALL 額外支援點擊展開 accordion，顯示商品內容物或權益清單。

#### Scenario: 有訂單時顯示列表
- **WHEN** `state.orderHistory` 陣列非空（或篩選後有結果）
- **THEN** 每筆訂單 SHALL 以卡片顯示：縮圖、商品名稱、訂單編號、金額（NT$）、付款方式、購買日期、狀態標籤

#### Scenario: 禮包訂單顯示展開控制項
- **WHEN** 訂單可比對到 `SHOP_IAP_CONFIG` 中有 `contents` 或 `benefits` 的商品
- **THEN** 卡片右側 SHALL 顯示展開箭頭（›），點擊後展開詳細內容

#### Scenario: 無訂單時顯示空狀態
- **WHEN** `state.orderHistory` 陣列為空且篩選為「全部」
- **THEN** 頁面 SHALL 顯示空狀態插圖與文字「還沒有購買紀錄」

#### Scenario: 訂單狀態標籤
- **WHEN** 訂單 `status` 為 `success`
- **THEN** 標籤 SHALL 顯示綠色「已完成」
- **WHEN** 訂單 `status` 為 `pending`
- **THEN** 標籤 SHALL 顯示橘色「處理中」
- **WHEN** 訂單 `status` 為 `failed`
- **THEN** 標籤 SHALL 顯示紅色「失敗」，卡片 SHALL 有紅色邊框

### Requirement: 失敗訂單顯示原因說明
`status === 'failed'` 的訂單卡片 SHALL 在明細列下方顯示失敗說明文字。

#### Scenario: 有 failReason 時顯示具體說明
- **WHEN** 訂單有 `failReason` 欄位值
- **THEN** 卡片 SHALL 顯示該 `failReason` 文字

#### Scenario: 無 failReason 時顯示通用說明
- **WHEN** 訂單無 `failReason` 欄位或值為空
- **THEN** 卡片 SHALL 顯示「付款未成功，請確認卡片資訊或聯繫您的銀行」

### Requirement: 失敗訂單客服連結帶入訂單編號
失敗訂單卡片的「聯繫客服」按鈕 SHALL 使用帶入訂單編號的 mailto 連結（`mailto:support@ecoco.xyz?subject=訂單問題 {order.id}`），讓客服可直接識別訂單。

#### Scenario: 點擊聯繫客服
- **WHEN** 用戶在失敗訂單卡片點擊「聯繫客服」
- **THEN** SHALL 開啟包含訂單編號的客服聯繫方式（mailto 或 in-app chat）

### Requirement: 訂單列表頁底部顯示裝扮 IAP 引導
`p4-orders` 頁面底部 SHALL 顯示一行說明文字，告知用戶裝扮類商品訂單請至手機系統（App Store / Google Play）查詢。

#### Scenario: 頁面底部固定顯示 IAP 引導
- **WHEN** 用戶在訂單列表頁（不論有無訂單）
- **THEN** 頁面底部 SHALL 顯示灰色小字：「裝扮類商品由 App Store / Google Play 管理，請至手機系統查詢訂單」

### Requirement: 購買成功 modal 新增查看訂單捷徑
現金購買成功後的 `BuySuccessModal` SHALL 在關閉按鈕下方新增「查看訂單」次要連結，點擊後關閉 modal 並導航至 `p4-orders`。

#### Scenario: 現金購買成功後可直接查看訂單
- **WHEN** 用戶完成現金商品購買，`BuySuccessModal` 顯示
- **THEN** modal SHALL 顯示「查看訂單 ›」文字連結
- **WHEN** 用戶點擊「查看訂單 ›」
- **THEN** modal SHALL 關閉，並導航至 `p4-orders`

#### Scenario: 點數購買不顯示查看訂單
- **WHEN** 用戶完成點數商品購買，`BuySuccessModal` 顯示（`isCash === false`）
- **THEN** modal SHALL NOT 顯示「查看訂單 ›」連結

### Requirement: 購買成功時寫入完整訂單資訊
完成現金購買後，`PURCHASE_CASH` action SHALL 將含 `thumb`、`payMethod` 的完整訂單物件寫入 `state.orderHistory`。

#### Scenario: 成功購買寫入完整訂單
- **WHEN** 用戶確認現金購買
- **THEN** `state.orderHistory` SHALL 新增一筆 `{ id, name, thumb, price, payMethod, date, status: 'success' }` 物件
