## 1. 資料模型擴充

- [x] 1.1 在 `app.jsx` 的 `orderHistory` mock 資料中，為失敗訂單加入 `failReason` 欄位範例值
- [x] 1.2 確認 `PURCHASE_CASH` reducer 已包含 `thumb` 與 `payMethod`（上輪已做，驗證即可）

## 2. 篩選列元件

- [x] 2.1 在 `P4Orders` 元件加入 `useState('all')` 管理 `activeFilter`
- [x] 2.2 在 h2 標題下方新增篩選 Chip 列（全部 / 已完成 / 處理中 / 失敗）
- [x] 2.3 根據 `activeFilter` 對 `orders` 進行過濾，傳入列表渲染
- [x] 2.4 在 `styles.css` 加入篩選 Chip 樣式（active 狀態橘底白字，與 P8-FAQ chip 一致）

## 3. 篩選後空狀態

- [x] 3.1 區分「全部且無訂單」與「篩選後無結果」兩種空狀態
- [x] 3.2 依 `activeFilter` 顯示對應文案（失敗→太好了沒有失敗的訂單、處理中→目前沒有處理中的訂單、已完成→還沒有完成的購買）

## 4. 失敗訂單說明區塊

- [x] 4.1 在失敗訂單卡片的明細列下方加入說明文字區塊
- [x] 4.2 若 `order.failReason` 有值則顯示，否則顯示通用說明文字
- [x] 4.3 在 `styles.css` 加入說明區塊樣式（淡紅底色，小字）

## 5. 客服連結帶入訂單編號

- [x] 5.1 將失敗卡片「聯繫客服」按鈕改為 `<a href="mailto:support@ecoco.xyz?subject=訂單問題%20{order.id}">` 樣式
- [x] 5.2 確保 `<a>` 套用與原 ghost button 相同的視覺樣式（`order-action-ghost`）
