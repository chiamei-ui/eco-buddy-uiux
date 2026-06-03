## Context

P4 商店 hi-fi 原型目前僅有「正式上線」單一狀態，包含點數 Tab、禮包 Tab、購買 Modal 假裝有金流；資料結構 `currency: 'heart' | 'cash'`。PM 2026-06-02 定案分兩階段：封測 B（Coming Soon）→ 正式 A（真實金流），且新增「裝扮」Tab（取代 hi-fi 暫用「裝飾」），裝扮走平台 IAP（Apple/Google）、禮包走藍新 NewebPay 網頁付款——同一頁面內出現兩條金流路徑。

利害關係人：前端（@shangchian）、後端、UI/UX（@chiamei-ui）、PM（@andrewtainan）、資安。

## Goals / Non-Goals

**Goals:**
- 規格層明確區分 Phase 1（封測）/ Phase 2（正式上線）行為，使前端可依規格實作封測版且 Phase 2 升級時不需重寫
- 規格層明確區分「藍新 NewebPay 網頁付款」（禮包）與「平台 IAP」（裝扮）兩條金流路徑，避免 iOS 審核風險
- 商店僅負責購買，換裝管理放 P8，規格層必須明示界線

**Non-Goals:**
- 不定義各 hero 裝扮款的視覺細節（屬 [design]，由 UI/UX 出設計稿）
- 不定義藍新 NewebPay 後端 callback / 對帳細節（屬後端規格）
- 不定義 P8 換裝管理 UI（屬 P8 規格）
- 不寫入 `docs/decisions/CURRENT.md`（PM 權限隔離，由 PM 另行寫入）
- 不調整變身動畫規格（#29 與 P4 無關）

## Decisions

### D1: 用 `phase: 1 | 2` 控制 Tab／Modal 行為，而非建兩份規格
- 選 A：在每個 Requirement 內描述 Phase 1 / Phase 2 差異（Scenario 分組）
- 選 B：另開 `p4-shop-phase1` / `p4-shop-phase2` 兩支規格
- **採 A**。封測→正式是時間軸上的狀態切換，規格本體不變、只是欄位 `phase` 不同；分兩份會在 Phase 2 上線時造成 spec 取捨混亂。

### D2: 新增 `phase` 為原型 tweak / 後端 feature flag
- 在 hi-fi 原型加 `tweaks.shopPhase: 1 | 2`，前端依此切換 Coming Soon 樣式
- Phase 2 前置（金流串接、4 項 UI、資安 review）完成後，由後端 feature flag 統一翻轉
- 不採「上線即刪除 Phase 1 程式碼」——保留切換能力以便緊急回滾

### D3: 兩條金流路徑必須以 Badge / 文字明示區分
- 禮包 Tab cash 商品：`💳 NT$N`（藍新 NewebPay）
- 裝扮 Tab cash 商品：`💳 NT$N`（平台 IAP，依設備顯示 App Store / Google Play）
- 不採「統一 Badge」——iOS 審核會擋外部金流連結出現在 IAP 商品頁

### D4: Phase 1 禮包／裝扮 Tab 必須可點入
- 選 A：Tab 整顆 disabled（不可點）
- 選 B：Tab 可點入、商品卡正常顯示、僅 CTA disabled
- **採 B（PM 指示）**。對外可揭露付費道具機制為賣點，且工程量與「全隱藏」幾乎相同。

### D5: 移除 hi-fi 原型現存「點數不足自動切 cash」行為
- 已在 `shop-dual-track-ui` 規範移除，但 hi-fi 原型仍可能殘留——本 change 的 tasks 必須驗證
- 雙軌制下點數區與現金區的金流路徑不同（藍新 vs 平台 IAP），自動切換在工程上不可行

### D6: 通行證稀有裝飾與商店裝扮 Tab 互斥
- 通行證解鎖款不出現在裝扮 Tab；裝扮 Tab 商品不可由通行證取得
- 在 `shop-cosmetic-tab` 與 `shop-package-tab` 都加 Scenario 明示互斥
- 理由：通行證權益描述（#16）需保留差異化誘因

## Risks / Trade-offs

- [Phase 1 → Phase 2 切換時遺漏 4 項 UI（購買確認頁／退款聲明／訂單編號／error state）] → 規格層列為 Phase 2 前置 Requirement，tasks.md 列為驗收項
- [iOS 審核擋藍新付款連結出現在裝扮 Tab] → 規格層強制裝扮走平台 IAP，前端不得在裝扮商品卡顯示「藍新」字樣或外部連結
- [封測對外揭露含付費道具，但實際無法購買，造成用戶不滿] → Tab 頂部明示「即將開放」，PM 已決議可接受
- [hi-fi 原型 `currency` 欄位只有 `heart | cash` 兩值，無法區分藍新 vs 平台 IAP] → 新增 `cashChannel: 'newebpay' | 'platform-iap'` 欄位（僅 cash 商品需要）
- [Phase 2 上線前若藍新串接延遲，封測 B 無法轉 A] → 規格不設硬性切換日期，由後端 feature flag 控制；但 PM 指示「非無限期 fast-follow」，需在驗收項中列為 must-have

## Migration Plan

1. 規格層先寫入 Phase 1 / Phase 2 雙階段 Requirement（本 change）
2. hi-fi 原型加 `tweaks.shopPhase` 切換器，預設 `1`
3. 前端依規格實作 Phase 1（封測）：Tab Bar 三 Tab、Coming Soon 樣式、點數 Tab 正常購買
4. 後端 / 設計師同步準備 Phase 2 前置（藍新串接、4 項 UI、平台 IAP entitlement、資安 review）
5. Phase 2 前置驗收完成後，feature flag 翻轉，移除 Coming Soon 樣式
6. 回滾策略：若 Phase 2 發現重大問題，feature flag 翻回 1，付費商品變回 Coming Soon

## Open Questions

- 藍新 NewebPay 串接工時尚未估出（PM 已要求工程估）——影響 Phase 2 上線時程
- 裝扮 Tab 之平台 IAP 商品在退款／退費聲明的文案版本是否需與禮包 Tab 分開（兩條路徑退款流程不同）
- Phase 1 hero 裝扮款的最終品項（彩虹光暈、循環王冠）需 @chiamei-ui 確認後寫入 `animation/NAMING.md`
