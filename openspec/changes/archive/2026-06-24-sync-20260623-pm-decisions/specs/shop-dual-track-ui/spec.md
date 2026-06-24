## MODIFIED Requirements

### Requirement: 商店雙軌制分區
P4 商店 SHALL 分為「ECOCO 點數消費區」與「真實金流 IAP 區」兩個分區，點數與現金不互換、不互買。App 內數位商品包含裝扮、月度通行證、稀有食物與道具禮包，均 SHALL 使用 `currency: 'cash'` 與 `cashChannel: 'platform-iap'`；藍新僅用於非 App 內數位商品的 ECOCO 點數儲值、補充站或 Web 付款。

#### Scenario: 點數區商品內容
- **WHEN** 用戶查看 ECOCO 點數消費區
- **THEN** 該區僅包含以 ECOCO 點數購買的基礎食物補給包、一般道具與清潔用品，商品 `currency` 為 `'heart'`

#### Scenario: 平台 IAP 商品內容
- **WHEN** 用戶查看 App 內數位商品
- **THEN** 裝扮、月度通行證、稀有食物與道具禮包的 `currency` 為 `'cash'` 且 `cashChannel` 為 `'platform-iap'`

#### Scenario: 點數與現金不互換
- **WHEN** 用戶嘗試以點數購買平台 IAP 商品或以現金購買點數商品
- **THEN** 系統 SHALL NOT 允許該交易

### Requirement: 商品卡片貨幣標示
每張商品卡片 SHALL 在卡片右上角標示貨幣種類；cash 商品 SHALL 依商品性質使用 `cashChannel`。App 內數位商品 SHALL 顯示 App Store 或 Google Play 的平台資訊與本地化價格，不得顯示藍新。

#### Scenario: 點數商品標示
- **WHEN** 商品 `currency === 'heart'`
- **THEN** 卡片顯示 ECOCO 點數 icon 與點數價格

#### Scenario: App 內數位商品標示
- **WHEN** 商品 `currency === 'cash' && cashChannel === 'platform-iap'`
- **THEN** 卡片顯示平台 SDK 回傳的本地化價格，並依設備顯示 App Store 或 Google Play

#### Scenario: 非 App 內服務使用藍新
- **WHEN** 商品屬 ECOCO 點數儲值、補充站或 Web 服務且 `cashChannel === 'newebpay'`
- **THEN** 付款流程可顯示藍新資訊，但該商品不得偽裝成 App 內數位商品

### Requirement: 購買確認 Modal
點擊可購買卡片 SHALL 開啟與商品 `currency`、`cashChannel` 一致的確認流程。App 內數位商品 SHALL 觸發平台 IAP，不得跳轉藍新網頁。

#### Scenario: 點數不足不自動切換
- **WHEN** 用戶購買點數商品但餘額不足
- **THEN** 顯示點數不足提示，SHALL NOT 提供現金替代付款

#### Scenario: App 內數位商品購買
- **WHEN** 可售的 `platform-iap` 商品被確認購買
- **THEN** 觸發 StoreKit 或 Play Billing，交易成功後由後端驗證 entitlement

#### Scenario: Phase 1 未開放商品
- **WHEN** 商品尚未通過平台審核或功能旗標未開放
- **THEN** CTA 不可購買且不得觸發任何金流請求

### Requirement: IAP 商品定價讀取平台本地化價格
所有 `cashChannel === 'platform-iap'` 的裝扮、月度通行證、稀有食物與道具禮包 SHALL 以獨立 SKU 從 App Store / Google Play SDK 讀取本地化價格，前端不得 hardcode 金額。

#### Scenario: 平台 SKU 查詢成功
- **WHEN** 平台回傳指定 SKU 的有效商品資料
- **THEN** 商品卡顯示平台本地化價格

#### Scenario: 平台 SKU 查詢失敗
- **WHEN** 平台未回傳指定 SKU
- **THEN** 商品不可購買且不顯示 hardcode 備援價格
