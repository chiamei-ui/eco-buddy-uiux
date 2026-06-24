## MODIFIED Requirements

### Requirement: IAP 商品歸屬禮包 tab
月底衝刺禮包、月度通行證與道具禮包 SHALL 顯示於「禮包」tab；商品金流路徑 SHALL 依內容性質決定。App 內提供或消耗的數位內容 SHALL 使用 `cashChannel === 'platform-iap'`，不得一律指定藍新。

#### Scenario: 食物 tab 不含一般禮包
- **WHEN** 用戶切換至「食物」tab
- **THEN** 不顯示月底衝刺禮包、月度通行證或道具禮包；可獨立販售的稀有食物依商品分類顯示

#### Scenario: 禮包 tab 顯示方案商品
- **WHEN** 用戶切換至「禮包」tab
- **THEN** 顯示月度通行證與道具禮包，月底期間額外顯示月底衝刺禮包

#### Scenario: App 內禮包金流路徑
- **WHEN** 禮包內容為 App 內數位道具、食物、權益或裝扮
- **THEN** 商品 data 使用 `cashChannel === 'platform-iap'` 並觸發 StoreKit 或 Play Billing

#### Scenario: 禮包 tab 不含單件裝扮
- **WHEN** 用戶切換至「禮包」tab
- **THEN** 不顯示單件永久穿戴裝扮；單件裝扮仍歸屬裝扮 Tab
