## ADDED Requirements

### Requirement: App 內數位商品逐項建立 SKU
裝扮、稀有食物、道具禮包與其他 App 內數位商品 SHALL 在 App Store Connect 與 Google Play Console 逐項建立商品並送審。

#### Scenario: 新增 IAP 商品
- **WHEN** PM 確認一項新的 App 內數位商品
- **THEN** 上線排程包含 Apple 與 Google 的 SKU 建立、送審狀態與預計可售日期

### Requirement: IAP 上架責任可追蹤
每項 IAP 商品 SHALL 指定工程追蹤人與 PM 商店後台負責人，不得以團隊共用責任取代。

#### Scenario: 商品進入開發排程
- **WHEN** IAP 商品被排入版本
- **THEN** 交付清單記錄 SKU、平台狀態、工程追蹤人與 PM 負責人

### Requirement: 未通過平台審核不得開賣
前端 SHALL 只對平台回傳有效商品資料且後台允許販售的 SKU 開啟購買 CTA。

#### Scenario: SKU 尚未通過審核
- **WHEN** 任一平台無法取得有效商品資料
- **THEN** 該平台商品 CTA 維持不可購買，不顯示 hardcode 價格

#### Scenario: SKU 可售
- **WHEN** 平台回傳有效商品與本地化價格且後台已啟用
- **THEN** 前端才開啟購買 CTA

### Requirement: 稀有食物 IAP 例外
稀有食物可作為 PM 核可的 HP 課金例外，商品限制 SHALL 由平台商品設定與後端 entitlement 共同驗證，前端不得自行判定。

#### Scenario: 稀有食物購買
- **WHEN** 用戶購買核可的稀有食物 SKU
- **THEN** 後端驗證平台交易與限購條件後才入庫
