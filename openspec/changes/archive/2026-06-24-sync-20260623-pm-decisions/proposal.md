## Why

2026-06-23 的 PM 決策 #30–#35、#37 已寫入 `docs/decisions/CURRENT.md`，但正式 UI、流程、動畫與商店規格仍保留舊規則或缺少可實作定義。若不先同步，前端、後端與設計可能依互相衝突的登入週期、金流路徑與入口流程繼續開發。

## What Changes

- P1 狀態名稱顯示 Rive 流水編號，並補上「下週食物預告」的顯示規則。
- P5 改為登入自動簽到，支援免費補昨天，採個人化 1–7 天循環並定義重置、派對動物與壞滅核心的邊界。
- 新增 Phase 3 門號贈禮規格：零和庫存轉移、IAP 商品排除、未註冊門號邀請，以及受贈 HP 不計入實體獎勵資格。
- 一般模式首頁新增 Buddy 臉部懸浮入口，區分首次進入介紹頁與回訪直達 P1。
- 調整 IAP 商品範圍與交付責任，將裝扮、稀有食物、道具禮包納入平台商品逐一上架與驗證。
- 修正現有「禮包一律走藍新」的規格衝突；App 內數位商品依 PM 決策改走 Apple / Google 平台 IAP。
- 將仍未定義的數值與視覺細節保留為後續設計／工程任務，不在本 change 自行發明規則。

## Capabilities

### New Capabilities

- `continuous-login`: 定義自動簽到、補昨天、七日循環、重置與派對動物狀態規則。
- `user-gifting`: 定義 Phase 3 以門號贈送食物／道具、庫存轉移、邀請與資格分帳。
- `normal-home-buddy-entry`: 定義一般模式首頁 Buddy 懸浮入口、後台顯示設定與首次／回訪路由。
- `iap-product-release-governance`: 定義平台 IAP 商品範圍、逐項上架、責任追蹤與上線前檢核。

### Modified Capabilities

- `partner-home-ui`: P1 狀態名稱加入編號，並新增下週食物預告欄位。
- `daily-companion-ui`: P5 顯示七日登入進度、補簽 CTA 與派對動物達標狀態。
- `shop-dual-track-ui`: App 內數位商品的金流分類新增稀有食物與道具禮包，並改以平台 IAP 為準。
- `shop-package-tab`: 移除「禮包一律走藍新」假設，依商品是否為 App 內數位內容決定平台 IAP 路徑。

## Impact

- 文件：`docs/design/UI_SPEC.md`、`docs/product/USER_FLOW.md`、`docs/design/GAME_MECHANICS.md`、`docs/animation/CHARACTER_TYPES.md`、`docs/dev/FRONTEND_BACKEND_HANDOFF.md`。
- 前端：P1、P5、一般模式首頁入口、商店商品資料與通知跳轉。
- 後端：簽到／補簽狀態、`has_disco` 判定、贈禮庫存轉移、來源分帳、門號查詢與邀請、IAP entitlement 驗證。
- 後台／營運：Buddy 入口顯示條件、食物排程資料、IAP SKU 與商店上架追蹤。
- 設計／動畫：狀態編號、P5 登入進度、收禮反應動畫與入口 icon 狀態。
