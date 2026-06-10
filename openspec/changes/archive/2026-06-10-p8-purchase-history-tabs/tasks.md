## 1. 規格書更新

- [x] 1.1 在 UI_SPEC.md P8 章節補入購買紀錄子頁面規格（Tab 結構、雙 Tab 標籤、預設 Tab、卡片欄位、空狀態文案）
- [x] 1.2 確認 UI_SPEC.md P4 商店的 ECOCO 點數餘額 Sheet 說明與本頁面入口一致（Header 右上 `💎 {點數} >` 不直接進購買紀錄，維持現有行為）

## 2. Store / 狀態層

- [x] 2.1 新增 `state.pointsOrderHistory` 陣列（結構：`{ id, name, thumb, pointsCost, date }`）
- [x] 2.2 新增 `PURCHASE_POINTS` action，購買成功後將點數訂單寫入 `state.pointsOrderHistory`

## 3. 購買紀錄頁（`p4-orders`）UI

- [x] 3.1 頁面頂部加入雙 Tab 元件：「💎 ECOCO 點數」／「💳 現金」，預設選中 ECOCO 點數
- [x] 3.2 實作 ECOCO 點數 Tab：列表讀取 `state.pointsOrderHistory`，每筆顯示縮圖、商品名稱、`-N 💎`、日期時間
- [x] 3.3 實作 ECOCO 點數 Tab 空狀態：插圖 + 「還沒有點數消費紀錄」文字
- [x] 3.4 現有現金訂單列表移入「現金」Tab（結構不變），Phase 1 IAP 未就緒時顯示空狀態（Tab 仍顯示）

## 4. 購買成功 Modal 調整

- [x] 4.1 確認 `BuySuccessModal`：點數購買（`isCash === false`）不顯示「查看訂單 ›」連結（維持現有行為）
- [x] 4.2 確認現金購買成功後「查看訂單 ›」導航至 `p4-orders` 並停在「現金」Tab

## 5. 驗收

- [x] 5.1 點數購買後，ECOCO 點數 Tab 出現新紀錄卡片，欄位齊全
- [x] 5.2 Phase 1 現金 Tab 顯示空狀態，Tab 本身可見
- [x] 5.3 進入頁面預設停在 ECOCO 點數 Tab
- [x] 5.4 UI_SPEC.md 已補齊購買紀錄子頁面規格段落
