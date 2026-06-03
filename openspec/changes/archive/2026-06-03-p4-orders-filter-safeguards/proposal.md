## Why

購買紀錄頁目前一次列出所有訂單，沒有篩選機制；當現金交易失敗時，用戶只看到「失敗」標籤，缺乏足夠的說明與引導，容易升級為客訴。本次改版透過狀態篩選讓用戶快速定位問題訂單，並針對失敗訂單提供明確的後續說明，降低客服負荷。

## What Changes

- 新增狀態篩選列（全部 / 已完成 / 處理中 / 失敗）
- 失敗訂單卡片新增「為什麼失敗」展開說明區塊，依常見原因顯示提示文字
- 失敗訂單卡片「聯繫客服」改為帶入訂單編號的客服連結（pre-fill 訂單資訊）
- 空狀態（當前篩選無結果）顯示對應提示而非通用空狀態

## Capabilities

### New Capabilities

- `order-filter`: 購買紀錄狀態篩選列（全部 / 已完成 / 處理中 / 失敗）及對應空狀態

### Modified Capabilities

- `purchase-history-ui`: 失敗訂單說明區塊、客服連結帶入訂單資訊、依篩選篩選後的空狀態

## Impact

- `reference/eco-buddy_hi-fi/screens.jsx`：P4Orders 元件
- `reference/eco-buddy_hi-fi/styles.css`：篩選列、說明區塊樣式
- `reference/eco-buddy_hi-fi/app.jsx`：orderHistory mock 資料可增加 `failReason` 欄位
