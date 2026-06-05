## Why

Hi-Fi 原型中多處遊戲數值直接寫死在 UI（道具效果、食物效果、廣告掉落機率、道具有效期、IAP 定價），但這些數值依 PM 決策（#24、#25）均需由後台動態設定。若前端不修正，後台改值後 UI 不會跟著更新，將造成顯示數值與實際邏輯不一致，且每次調整都需要前端發版。

## What Changes

- 在 `UI_SPEC.md` 補充「動態數值規則」章節，列出所有禁止前端 hardcode 的數值欄位
- 在 hi-fi 原型各頁對應數值位置加上 `[API]` 標注（以 spec 方式說明，不修改原型程式碼）
- 釐清廣告掉落機率與保底邏輯由後端計算還是前端執行，明訂 spec
- 補充 IAP 定價顯示規則：前端讀取 App Store / Google Play 回傳的本地化價格，不寫死 NT$

## Capabilities

### New Capabilities

- `dynamic-values-spec`: 定義哪些遊戲數值屬於「動態數值」（從後端 API 讀取），前端 UI 僅顯示不計算，並列出所有對應的 API 欄位名稱與 UI 顯示位置

### Modified Capabilities

- `partner-home-ui`: P1 食物欄 badge 數量上限（每格 12）來源需標注為後台數值，非前端常數
- `item-info-sheet-ui`: 道具效果值顯示由 hardcode 改為 API 讀取標注
- `shop-dual-track-ui`: IAP 商品定價顯示規則補充（讀取平台本地化價格）
- `toy-expiry-card-ui`: 道具有效期顯示來源標注

## Impact

- `docs/design/UI_SPEC.md`：補充「動態數值規則」章節
- hi-fi 原型實作時：道具效果、食物效果、廣告機率、有效期、IAP 定價等欄位不得 hardcode，改從 API response 讀取
- 後端 API：需確認已提供這些欄位（或列出待補欄位）
- 不影響視覺設計、動畫、文案體系
