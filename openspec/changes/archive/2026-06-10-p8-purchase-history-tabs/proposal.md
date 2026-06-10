## Why

P8 購買紀錄頁（`p4-orders`）目前只列出現金（IAP）訂單，但 Phase 1 商店的主要貨幣是 ECOCO 點數——用戶以點數購買食物補給包、道具後，沒有任何消費紀錄可查，導致點數餘額變動來源不透明。需補齊 ECOCO 點數購買明細，並以 Tab 切換區隔兩種貨幣紀錄。

## What Changes

- 購買紀錄頁新增「ECOCO 點數」Tab，列出所有以點數購買的商品紀錄（商品名稱 / 扣款點數 / 時間戳）
- 原有現金列表改為「現金」Tab（IAP 訂單，結構不變）
- Phase 1 IAP 管線未就緒時，「現金」Tab 顯示空狀態，不影響點數 Tab 正常運作
- UI_SPEC.md P8 章節補上購買紀錄子頁面規格（Tab 結構、空狀態、卡片欄位）

## Capabilities

### New Capabilities
- `purchase-history-points-tab`：ECOCO 點數購買紀錄 Tab——列表、卡片欄位、空狀態規格

### Modified Capabilities
- `purchase-history-ui`：原僅限現金訂單的訂單列表頁，需改為雙 Tab 結構（點數 / 現金），並補充 UI_SPEC.md 規格段落

## Impact

- `docs/design/UI_SPEC.md`：P8 章節補購買紀錄子頁規格
- `openspec/specs/purchase-history-ui/spec.md`：新增雙 Tab 結構 requirement
- 前端：`p4-orders` 頁面加 Tab 元件 + 點數紀錄列表（讀 `state.pointsOrderHistory`）
- 後端：需提供 ECOCO 點數消費明細 API（商品名稱 / 扣款點數 / 時間戳）
