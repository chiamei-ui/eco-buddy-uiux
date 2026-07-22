## MODIFIED Requirements

### Requirement: 商店雙軌制分區
P4 SHALL 依商品類別使用以下付款規則：食物只使用 ECOCO 點數；玩具與禮包每項都使用 ECOCO 點數加平台 IAP 現金的合併計價；全站不得提供純現金商品。裝扮付款分類維持既有行為，直到 PM 完成待決議-4。

#### Scenario: 食物商品
- **WHEN** 用戶查看食物 tab
- **THEN** 只顯示當週食物，商品只包含 ECOCO 點數價格且不含現金付款

#### Scenario: 玩具或禮包商品
- **WHEN** 用戶查看玩具或禮包商品
- **THEN** 每張可售卡片同時顯示所需 ECOCO 點數與平台 IAP 現金價格，且不得拆成純點數或純現金的替代商品

#### Scenario: App 內數位商品付款路徑
- **WHEN** 玩具或禮包進入付款確認
- **THEN** ECOCO 點數由帳戶扣除，現金部分使用 `cashChannel === 'platform-iap'`；不得導向藍新 NewebPay

### Requirement: 商品卡片貨幣標示
每張食物卡 SHALL 明確顯示 ECOCO 點數；每張玩具與禮包卡 SHALL 並列顯示 ECOCO 點數與平台 IAP 現金價格。價格與可購買性 SHALL 讀取商品設定，前端不得用另一個來源替代其中一種付款。

#### Scenario: 合併計價商品標示
- **WHEN** 商品同時需要點數與現金
- **THEN** 卡片和確認頁都顯示兩項成本，且明確說明兩項皆為完成購買必要條件

#### Scenario: 食物週配額已滿
- **WHEN** 當週食物共用取得計數已達上限或餐袋已滿
- **THEN** 食物卡 CTA disabled，文案為「本週已領滿」，且不得開啟購買確認頁

### Requirement: 購買確認 Modal
點擊可購買商品 SHALL 開啟購買確認 Modal。食物只檢查 ECOCO 點數；玩具與禮包 MUST 同時檢查 ECOCO 點數餘額與平台 IAP 可售狀態，任一條件不符時不得完成購買。

#### Scenario: 合併付款成功
- **WHEN** 玩具或禮包的點數餘額足夠、平台商品可售且平台交易與 entitlement 驗證成功
- **THEN** 系統扣除點數、完成平台 IAP、寫入訂單結果，並將對應物品或解鎖結果入庫

#### Scenario: 點數不足
- **WHEN** 使用者的 ECOCO 點數不足以支付食物、玩具或禮包的點數部分
- **THEN** Modal 顯示點數不足，且不得只以現金完成該交易

#### Scenario: 平台商品不可售
- **WHEN** 玩具或禮包的 IAP SKU 未通過審核或無法取得商品資料
- **THEN** Modal 不得完成交易，且不得以點數單獨完成購買
