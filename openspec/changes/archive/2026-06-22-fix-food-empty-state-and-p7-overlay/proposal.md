## Why

P1 食物吃完後仍保留原食物圖像，容易讓用戶誤以為還有庫存；P7 詳情 overlay 又定位在可滾動頁面內，開啟後背景仍可滾動，導致遮罩與彈窗跟著內容位移。兩者皆為目前 hi-fi 可直接排除的介面誤導與操作 bug。

## What Changes

- P1 食物庫存歸零後，卡片改顯示中性空餐盤，不再顯示剛吃完的食物圖像與名稱。
- 空餐盤仍保留原格位，不改動食物庫存、週配額或後端資料結構。
- P7 年度卡片與本月狀態卡開啟詳情時，overlay 固定覆蓋整個 App viewport。
- P7 詳情開啟期間鎖住背景頁面滾動；關閉後恢復原本捲動位置。

## Capabilities

### New Capabilities

- `p7-detail-overlay-ui`: P7 詳情 overlay 的 viewport 定位、背景捲動鎖定與關閉恢復。

### Modified Capabilities

- `partner-home-ui`: 食物庫存歸零後的卡片內容改為空餐盤狀態，不再保留原食物視覺。

## Impact

- `reference/eco-buddy_hi-fi/screens.jsx`
- `reference/eco-buddy_hi-fi/styles.css`
- `openspec/specs/partner-home-ui/spec.md`
- 無 API、資料庫、Rive 或新依賴變更。
