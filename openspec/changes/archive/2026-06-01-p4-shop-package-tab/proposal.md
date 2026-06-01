## Why

P4 商店的月底衝刺禮包與月度通行證目前放在「食物」tab 的橫向卡片列，語意錯置——IAP 方案商品與消耗性食物混在一起，用戶難以主動尋找，月度通行證也缺少固定可見的入口。將 IAP 方案獨立為「禮包」tab，可讓購買路徑更清晰，也為未來擴展更多付費方案預留空間。

## What Changes

- **新增「禮包」tab**：P4 商店 Tab Bar 加入第五個頁籤（食物 / 道具 / 裝飾 / 音樂盒 / **禮包**）
- **移出 food items**：月底衝刺禮包、月度通行證從 `items.food` 陣列移至 `items.package`
- **月底倒數 badge**：22–28 日期間，「禮包」tab chip 上顯示倒數天數徽章（如 `6天`，黃色）
- **保留 ProductDetailSheet**：點擊禮包卡片仍開啟詳情 bottom sheet，再進入購買流程
- **已購狀態**：購買後卡片顯示 `✓ 啟用中 / ✓ 本月已領`，不可重複點擊
- **SHOP_IAP_CONFIG 不動**：商品資料仍從模組級 config 讀取，不寫死

## Capabilities

### New Capabilities

- `shop-package-tab`: P4 商店「禮包」獨立 tab，含 IAP 卡片展示、月底倒數 badge、已購狀態管理

### Modified Capabilities

- `shop-dual-track-ui`: 商店雙軌制 UI — Tab 結構從 4 個擴展為 5 個，IAP 商品歸屬 tab 改變

## Impact

- `reference/eco-buddy_hi-fi/screens.jsx`：P4Shop items 資料結構、tab 定義、cash-strip 渲染
- `reference/eco-buddy_hi-fi/styles.css`：「禮包」tab badge 樣式（月底倒數）
- `reference/eco-buddy_hi-fi/app.jsx`：無需改動（tweaks 已支援）
