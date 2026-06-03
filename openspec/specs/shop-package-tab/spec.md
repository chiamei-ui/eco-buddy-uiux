## ADDED Requirements

### Requirement: 禮包專屬 tab 存在
P4 商店 Tab Bar SHALL 包含一個 id 為 `package`、label 為「禮包」的頁籤，顯示所有 IAP 方案商品。

#### Scenario: 禮包 tab 正常顯示
- **WHEN** 用戶進入 P4 商店
- **THEN** Tab Bar SHALL 顯示「禮包」頁籤，且點擊後顯示禮包商品列表

#### Scenario: 禮包 tab 有商品才顯示
- **WHEN** `items.package` 陣列非空
- **THEN** 「禮包」tab 出現在 Tab Bar 中

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

### Requirement: 月底倒數 badge 顯示在禮包 tab chip
於每月 22–28 日（原型以 tweaks.shopSprint 模擬），「禮包」tab chip SHALL 顯示黃色倒數天數 badge（格式：`N天`）。

#### Scenario: 月底期間 badge 出現
- **WHEN** `isSprintPeriod === true`
- **THEN** 「禮包」tab chip 右上顯示黃底黑字倒數 badge，文字為 `{daysLeft}天`

#### Scenario: 非月底期間 badge 不顯示
- **WHEN** `isSprintPeriod === false`
- **THEN** 「禮包」tab chip SHALL NOT 顯示任何 badge

### Requirement: 禮包 tab 的 cash-strip 卡片互動
禮包 tab 內的商品卡片 SHALL 遵循與其他 tab cash-strip 相同的互動規則，包含詳情 sheet 與已購狀態。購買成功後 SHALL dispatch `PURCHASE_CASH` action 將訂單寫入 `state.orderHistory`，並在 `BuySuccessModal` 顯示「查看訂單」捷徑。

#### Scenario: 點擊有詳情的禮包商品
- **WHEN** 用戶點擊含 `contents` 或 `benefits` 的禮包卡片且尚未購買
- **THEN** ProductDetailSheet SHALL 開啟顯示商品完整內容

#### Scenario: 已購商品不可再點擊
- **WHEN** 商品對應 `state.sprintPurchased` 或 `state.hasPass` 為 true
- **THEN** 卡片顯示已購狀態（✓ 本月已領 / ✓ 啟用中），且 onClick 無效

#### Scenario: 現金購買成功後訂單寫入歷史
- **WHEN** 用戶確認現金禮包購買且交易成功
- **THEN** `state.orderHistory` SHALL 新增對應訂單紀錄
- **THEN** `BuySuccessModal` SHALL 顯示「查看訂單 ›」文字連結

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
