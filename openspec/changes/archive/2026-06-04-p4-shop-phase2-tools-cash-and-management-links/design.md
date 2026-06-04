## Context

P4Shop 使用 `items[tab]` 資料物件驅動渲染，商品帶 `currency:'heart'` 走點數 grid，帶 `currency:'cash'` 走 `cash-strip` 橫向滑動卡片。`cash-strip` / `cash-card` CSS 已存在，目前玩具 tab 只有點數商品。Phase gate 由 `isPhase2 = (tweaks?.shopPhase ?? 1) >= 2` 控制。

P4Orders 以 `orderHistory` 陣列渲染訂單列表，每筆 order 包含 `name / thumb / price / payMethod / date / status`，但不含商品細節（contents/benefits）。禮包商品細節存在 `SHOP_IAP_CONFIG` 裡。

## Goals / Non-Goals

**Goals:**
- 玩具 tab Phase 2 加現金商品（橫式 cash-strip），資料來自 `items.tool` 新增項目
- 玩具 / 裝扮 tab 各自有「查看管理頁」快捷連結（Phase 2 限定）
- P4Orders 禮包訂單可展開 accordion 顯示 contents / benefits

**Non-Goals:**
- 不修改現有點數商品邏輯
- 不新增後端 API 或 state 欄位
- 不動 `SHOP_IAP_CONFIG` 結構，只讀取現有 `contents` / `benefits` 欄位

## Decisions

**D1：管理頁連結放置位置**
放在各 tab 內容區頂部（點數商品 section 標題列右側），而非 tab chip 上。
理由：tab chip 空間有限且已有 badge；頂部連結視覺上更自然，與 P1 dock「管理 ›」保持一致語言。

**D2：accordion 細節資料來源**
P4Orders 訂單 row 展開時，以 `order.name` 比對 `SHOP_IAP_CONFIG` 查對應商品，取其 `contents` 或 `benefits`。不在 `orderHistory` 存副本，避免資料冗餘。
理由：`SHOP_IAP_CONFIG` 是 static const，比對成本可忽略；如未來商品內容改變，只需改一處。

**D3：accordion 動畫**
用 CSS `max-height` transition（0 → auto 用 JS 設定 px）而非 `display:none`，確保動畫流暢且不需新增套件。

**D4：現金玩具商品命名**
在 `items.tool` 新增 2 筆示範商品（限定逗貓棒禮盒、豪華梳子組），帶 `currency:'cash'`、`cashChannel:'platform-iap'`，Phase 2 才顯示。

## Risks / Trade-offs

- **accordion 比對失效**：若 `order.name` 與 `SHOP_IAP_CONFIG` 的 `name` 不完全一致（例如含「×N」），比對會 miss → 緩解：改用 `order.itemId`（若有）或做 includes 比對，找不到則不顯示展開箭頭
- **玩具現金商品尚無真實 IAP**：Phase 2 開放前僅為 demo，UI 顯示「即將開放」按鈕已有 disabled 機制可重用
