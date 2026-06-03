## MODIFIED Requirements

### Requirement: IAP 商品歸屬禮包 tab
月底衝刺禮包與月度通行證 SHALL 僅出現在「禮包」tab 的 cash-strip，不出現在其他 tab；禮包 Tab 之 cash 商品 SHALL 走藍新 NewebPay 網頁付款（`cashChannel === 'newebpay'`），SHALL NOT 走平台 IAP（裝扮 Tab 路徑）。

#### Scenario: 食物 tab 不含 IAP 商品
- **WHEN** 用戶切換至「食物」tab
- **THEN** cash-strip SHALL NOT 顯示月底衝刺禮包或月度通行證

#### Scenario: 禮包 tab 包含 IAP 商品
- **WHEN** 用戶切換至「禮包」tab
- **THEN** cash-strip SHALL 顯示月度通行證，月底期間額外顯示月底衝刺禮包

#### Scenario: 禮包商品金流路徑
- **WHEN** 禮包 Tab 任一 cash 商品被渲染
- **THEN** 商品 data `cashChannel === 'newebpay'`；Phase 2 下購買流程跳轉藍新 NewebPay 網頁付款

#### Scenario: 禮包 tab 不含裝扮商品
- **WHEN** 用戶切換至「禮包」tab
- **THEN** SHALL NOT 顯示永久穿戴裝扮款（裝扮歸屬 `shop-cosmetic-tab`）；通行證解鎖之稀有裝飾為通行證權益、不於本 Tab 單獨販售

## ADDED Requirements

### Requirement: 禮包 Tab Phase 1 Coming Soon 狀態
Phase 1（封測）下，禮包 Tab SHALL 採 Coming Soon 樣式；Tab 可點入、商品卡正常呈現、CTA disabled、Tab 頂部顯示提示文。Phase 2 才開放實際購買。

#### Scenario: Phase 1 Tab 可點入
- **WHEN** `shopPhase === 1` 且用戶點擊禮包 Tab chip
- **THEN** Tab 內容區 SHALL 正常切換顯示，SHALL NOT 整顆 Tab disabled

#### Scenario: Phase 1 商品卡內容正常顯示
- **WHEN** `shopPhase === 1` 且禮包商品卡渲染
- **THEN** 卡片 SHALL 顯示圖、名稱、價格（NT$N）、加成說明；月度通行證商品卡 SHALL 仍含權益描述

#### Scenario: Phase 1 CTA disabled
- **WHEN** `shopPhase === 1` 且用戶點擊禮包商品卡 CTA
- **THEN** CTA 為 disabled 狀態、文字標「即將開放」、SHALL NOT 開啟購買 Modal、SHALL NOT 觸發任何金流請求

#### Scenario: Phase 1 Tab 頂部提示文
- **WHEN** `shopPhase === 1` 且用戶切至禮包 Tab
- **THEN** Tab 內容區頂部 SHALL 顯示一行提示文「付費道具即將推出，敬請期待」（文案可由 PM 調整）

#### Scenario: Phase 1 月底倒數 badge 行為不變
- **WHEN** `shopPhase === 1` 且 `isSprintPeriod === true`
- **THEN** 禮包 Tab chip 仍顯示倒數 badge；但月底衝刺禮包卡片 CTA disabled（受 Phase 1 規則覆蓋）

### Requirement: 禮包 Tab Phase 2 上線
Phase 2 下，禮包 Tab SHALL 移除 Coming Soon 樣式、CTA 轉為可購買，並依 `shop-phase-rollout` 之 Phase 2 前置 UI 完成購買確認頁、退款聲明、訂單編號、error state。

#### Scenario: Phase 2 CTA 可購買
- **WHEN** `shopPhase === 2` 且禮包商品未售罄
- **THEN** CTA 文字為「購買」或對應行動文案、可點擊開啟購買確認頁

#### Scenario: Phase 2 移除頂部提示文
- **WHEN** `shopPhase === 2` 且用戶切至禮包 Tab
- **THEN** Tab 內容區頂部 SHALL NOT 顯示「付費道具即將推出」提示文
