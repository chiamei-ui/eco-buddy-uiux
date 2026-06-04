## Why

Phase 2 商店上線後，玩具 tab 只有點數商品，缺少現金道具選項；玩具與裝扮兩個 tab 也沒有導向各自管理頁的入口，用戶購買後必須回 P1 dock 才能管理。同時 P8 購買紀錄的禮包訂單缺乏細節，用戶無法確認自己購買了什麼。

## What Changes

- **P4 玩具 tab**：Phase 2 新增現金商品專區（橫式 cash-strip 卡片），加入帶 `currency:'cash'` 的限定道具商品（如逗貓棒禮盒、限定玩具包）
- **P4 玩具 tab**：Phase 2 時在 tab 頂部加「查看我的玩具箱 ›」右對齊連結，點擊導向 `p9`
- **P4 裝扮 tab**：Phase 2 時在 tab 頂部加「查看我的裝扮 ›」右對齊連結，點擊導向 `wardrobe-manage`
- **P4Orders（P8 購買紀錄）**：禮包類型訂單支援點擊展開 accordion，顯示該禮包的 contents / benefits 內容物清單

## Capabilities

### New Capabilities

- `shop-tools-cash-section`: P4 玩具 tab 的 Phase 2 現金商品專區（橫式卡片 strip + 商品資料）
- `shop-tab-management-links`: P4 玩具與裝扮 tab 內的管理頁快捷連結
- `order-package-detail`: P4Orders 禮包訂單展開細節 accordion

### Modified Capabilities

- `shop-dual-track-ui`: 玩具 tab 新增現金商品軌道，原點數軌道不變
- `purchase-history-ui`: 禮包訂單列表新增可展開行為

## Impact

- `reference/eco-buddy_hi-fi/screens.jsx`：P4Shop 玩具 tab 資料與 JSX、P4Orders accordion 邏輯
- `reference/eco-buddy_hi-fi/styles.css`：accordion 展開動畫 CSS（若現有 cash-strip 已足夠則最小改動）
- 不影響後端 API；所有資料來自既有 `SHOP_IAP_CONFIG` 與 `orderHistory` state
