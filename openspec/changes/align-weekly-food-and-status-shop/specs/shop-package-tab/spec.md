## MODIFIED Requirements

### Requirement: IAP 商品歸屬禮包 tab（更新 #26/#27/#33）
禮包 tab SHALL 顯示合併計價的禮包商品與狀態禮包；每個可售禮包都需要 ECOCO 點數與 `cashChannel === 'platform-iap'` 的現金部分。禮包不得含有額外食物、食物週配額加量或可繞過餐袋規則的權益。

#### Scenario: 禮包 tab 顯示方案商品
- **WHEN** 用戶切換至「禮包」tab
- **THEN** 顯示可售禮包與狀態禮包，並在每張卡片顯示點數加平台 IAP 的兩項成本

#### Scenario: 禮包不提供食物例外
- **WHEN** 禮包商品資料準備渲染
- **THEN** 商品內容不得包含食物、額外食物配額或任何可繞過當週食物共用配額的權益

#### Scenario: App 內禮包金流路徑
- **WHEN** 用戶完成禮包付款確認
- **THEN** 系統同時扣除 ECOCO 點數並觸發 StoreKit 或 Play Billing，成功後才寫入 entitlement
