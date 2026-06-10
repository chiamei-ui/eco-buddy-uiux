## MODIFIED Requirements

### Requirement: 訂單列表頁顯示禮包與通行證訂單
`p4-orders` 頁面 SHALL 包含雙 Tab 結構：「ECOCO 點數」Tab 與「現金」Tab。「現金」Tab SHALL 顯示所有以現金購買的禮包與通行證訂單，依購買時間降序排列（最新在前）。每筆訂單卡片 SHALL 顯示商品縮圖（`thumb` emoji）、商品名稱、訂單編號、金額（NT$）、付款方式（`payMethod`）、購買日期、狀態標籤。

禮包與通行證類型訂單（可透過 `order.name` 比對 `SHOP_IAP_CONFIG` 識別出有 `contents` 或 `benefits` 欄位者）SHALL 額外支援點擊展開 accordion，顯示商品內容物或權益清單。

#### Scenario: 有訂單時顯示列表
- **WHEN** `state.orderHistory` 陣列非空（或篩選後有結果）
- **THEN** 每筆訂單 SHALL 以卡片顯示：縮圖、商品名稱、訂單編號、金額（NT$）、付款方式、購買日期、狀態標籤

#### Scenario: 禮包訂單顯示展開控制項
- **WHEN** 訂單可比對到 `SHOP_IAP_CONFIG` 中有 `contents` 或 `benefits` 的商品
- **THEN** 卡片右側 SHALL 顯示展開箭頭（›），點擊後展開詳細內容

#### Scenario: 無訂單時顯示空狀態
- **WHEN** `state.orderHistory` 陣列為空且篩選為「全部」
- **THEN** 「現金」Tab SHALL 顯示空狀態插圖與文字「還沒有購買紀錄」

#### Scenario: Phase 1 IAP 未就緒時現金 Tab 顯示空狀態
- **WHEN** IAP 管線尚未上線，`state.orderHistory` 為空
- **THEN** 「現金」Tab SHALL 顯示空狀態（Tab 仍顯示，不隱藏）

#### Scenario: 訂單狀態標籤
- **WHEN** 訂單 `status` 為 `success`
- **THEN** 標籤 SHALL 顯示綠色「已完成」
- **WHEN** 訂單 `status` 為 `pending`
- **THEN** 標籤 SHALL 顯示橘色「處理中」
- **WHEN** 訂單 `status` 為 `failed`
- **THEN** 標籤 SHALL 顯示紅色「失敗」，卡片 SHALL 有紅色邊框

## ADDED Requirements

### Requirement: 雙 Tab 結構標籤文字
`p4-orders` 頁面頂部 SHALL 顯示兩個 Tab：「💎 ECOCO 點數」與「💳 現金」，以底線樣式標示當前選中 Tab。

#### Scenario: Tab 標籤正確顯示
- **WHEN** 用戶在 `p4-orders` 頁面
- **THEN** 頁面頂部 SHALL 顯示「💎 ECOCO 點數」與「💳 現金」兩個 Tab
- **THEN** 當前選中 Tab SHALL 以橘色底線或選中樣式標示
