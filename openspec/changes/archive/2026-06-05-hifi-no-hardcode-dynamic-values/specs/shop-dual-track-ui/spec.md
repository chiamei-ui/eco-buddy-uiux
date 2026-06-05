## ADDED Requirements

### Requirement: IAP 商品定價讀取平台本地化價格
P4 商店 IAP 區（`cashChannel === 'platform-iap'`）的商品卡片 SHALL 從 App Store / Google Play 平台 SDK 讀取本地化價格字串，前端 SHALL NOT hardcode 任何金額數字（如 NT$199、NT$149）。

#### Scenario: 平台 SDK 查詢成功
- **WHEN** P4 商店 IAP 區商品卡片渲染，且平台 SDK 回傳對應 SKU 的本地化價格
- **THEN** 價格文字顯示平台回傳字串（如「NT$199」），Badge 格式為 `💳 [IAP SKU: sprint_pack_199]`

#### Scenario: 月度通行證定價
- **WHEN** 月度通行證商品卡片渲染
- **THEN** 價格讀取 `[IAP SKU: eco_pass_monthly]`，不以前端常數 NT$149 顯示

#### Scenario: 月底衝刺禮包定價
- **WHEN** 月底衝刺禮包商品卡片渲染（每月 22–28 日）
- **THEN** 價格讀取 `[IAP SKU: sprint_pack_199]`，不以前端常數 NT$199 顯示

#### Scenario: 裝扮商品定價
- **WHEN** 裝扮 Tab IAP 商品卡片渲染
- **THEN** 每件裝扮以獨立 SKU ID 查詢定價，價格區間 NT$60–199 為運營參考值，前端不寫死

#### Scenario: SKU 查詢失敗
- **WHEN** 平台 SDK 未回傳對應 SKU 資訊
- **THEN** 商品卡片價格區顯示載入中狀態，SHALL NOT 顯示任何 hardcode 金額
