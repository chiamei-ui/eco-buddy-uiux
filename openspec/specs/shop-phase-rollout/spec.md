### Requirement: 商店階段狀態切換
P4 商店 SHALL 以 `shopPhase: 1 | 2` 控制 UI 行為；hi-fi 原型 SHALL 以 `tweaks.shopPhase` 模擬，預設值為 `1`（封測）。Phase 2 切換 SHALL 由後端 feature flag 控制，前端不允許在 UI 層直接切換。

#### Scenario: Phase 1 預設
- **WHEN** 用戶於封測階段進入 P4
- **THEN** `shopPhase === 1`，點數 Tab 正常上線、禮包 Tab 與裝扮 Tab 為 Coming Soon 樣式

#### Scenario: Phase 2 上線
- **WHEN** 後端 feature flag 翻轉至 Phase 2
- **THEN** `shopPhase === 2`，禮包 Tab 與裝扮 Tab 移除 Coming Soon、CTA 轉為可購買

#### Scenario: 緊急回滾
- **WHEN** Phase 2 上線後出現重大問題、feature flag 翻回 `1`
- **THEN** 禮包 Tab 與裝扮 Tab 回到 Coming Soon 樣式，正在進行的金流交易不受影響（後端處理）

### Requirement: Coming Soon 樣式
Phase 1 下，禮包 Tab 與裝扮 Tab SHALL 顯示 Coming Soon 樣式；Tab 本身可點入、商品卡照常呈現、僅 CTA 與金流互動禁用。

#### Scenario: Tab 頂部提示文
- **WHEN** `shopPhase === 1` 且用戶切至禮包 Tab 或裝扮 Tab
- **THEN** Tab 內容區頂部 SHALL 顯示一行提示文「付費道具即將推出，敬請期待」（文案可由 PM 調整）

#### Scenario: 商品卡 CTA disabled
- **WHEN** `shopPhase === 1` 且商品為 cash 商品
- **THEN** 商品卡 CTA 按鈕 SHALL 為 disabled 狀態、文字標「即將開放」，且 onClick 無響應

#### Scenario: 商品卡內容照常顯示
- **WHEN** `shopPhase === 1` 且商品為 cash 商品
- **THEN** 商品卡 SHALL 照常顯示圖、名稱、價格（NT$N）、加成說明，不可隱藏

#### Scenario: 不串金流 SDK
- **WHEN** `shopPhase === 1`
- **THEN** 前端 SHALL NOT 載入藍新 NewebPay SDK 或平台 IAP SDK；點擊 disabled CTA SHALL NOT 觸發任何金流相關網路請求

### Requirement: Phase 2 前置 UI
Phase 2 上線前 SHALL 完成下列 4 項 UI；4 項缺一不可轉 Phase 2。

#### Scenario: 購買確認頁
- **WHEN** `shopPhase === 2` 且用戶點擊可購買 cash 商品 CTA
- **THEN** SHALL 開啟購買確認頁，顯示商品名稱、金額、金流路徑（藍新 NewebPay 或平台 IAP）、確認與取消按鈕

#### Scenario: 退款聲明
- **WHEN** `shopPhase === 2` 且用戶於購買確認頁
- **THEN** 確認頁 SHALL 包含退款聲明文字或可點擊連結至完整退款政策

#### Scenario: 訂單編號
- **WHEN** `shopPhase === 2` 且金流交易完成
- **THEN** 系統 SHALL 顯示訂單編號於成功頁與電子收據

#### Scenario: error state
- **WHEN** `shopPhase === 2` 且金流交易失敗（取消、超時、驗證失敗、網路錯誤）
- **THEN** SHALL 顯示對應 error state，含失敗原因、客服聯絡方式、重試入口
