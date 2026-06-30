## MODIFIED Requirements

### Requirement: IAP 商品歸屬禮包 tab（更新 #26/#27/#33）
月底衝刺禮包、月度通行證、道具禮包與更換次數禮包 SHALL 顯示於「禮包」tab；商品金流路徑 SHALL 依內容性質決定。App 內提供或消耗的數位內容 SHALL 使用 `cashChannel === 'platform-iap'`，不得一律指定藍新。

> ⚠️ **舊規則修正**：原「禮包 Tab cash 商品一律走藍新 NewebPay」已廢棄。藍新僅適用 ECOCO 點數儲值、補充站或 Web 非 App 內數位付款。

#### Scenario: 食物 tab 不含一般禮包
- **WHEN** 用戶切換至「食物」tab
- **THEN** cash-strip SHALL NOT 顯示月底衝刺禮包或月度通行證；可獨立販售的稀有食物依商品分類顯示

#### Scenario: 禮包 tab 顯示方案商品
- **WHEN** 用戶切換至「禮包」tab
- **THEN** 顯示月度通行證、道具禮包與更換次數禮包，月底期間額外顯示月底衝刺禮包

#### Scenario: App 內禮包金流路徑
- **WHEN** 禮包內容為 App 內數位道具、食物、權益、裝扮或更換次數
- **THEN** 商品 data 使用 `cashChannel === 'platform-iap'` 並觸發 StoreKit 或 Play Billing

#### Scenario: 禮包 tab 不含單件裝扮
- **WHEN** 用戶切換至「禮包」tab
- **THEN** SHALL NOT 顯示單件永久穿戴裝扮；單件裝扮仍歸屬裝扮 Tab

## ADDED Requirements

### Requirement: 更換次數禮包商品
P4「禮包」tab SHALL provide two change-count package products: a 10-change pack and a 50-change pack. Each product SHALL have its own product id and platform-IAP SKU, and successful purchase SHALL credit permanent change-count balance.

#### Scenario: 10-change pack is available
- **WHEN** P4「禮包」tab renders change-count pack products
- **THEN** a 10-change pack is shown with Buddy-world copy equivalent to "10 次｜偶爾想換一下"
- **AND** the product uses `currency === 'cash'`
- **AND** the product uses `cashChannel === 'platform-iap'`

#### Scenario: 50-change pack is available
- **WHEN** P4「禮包」tab renders change-count pack products
- **THEN** a 50-change pack is shown with Buddy-world copy equivalent to "50 次｜換到滿意為止"
- **AND** the product uses `currency === 'cash'`
- **AND** the product uses `cashChannel === 'platform-iap'`

#### Scenario: Change-count purchase credits balance
- **WHEN** a change-count pack platform-IAP purchase succeeds and entitlement validation passes
- **THEN** the user's remaining change-count balance increases by the purchased quantity
- **AND** the credited change count SHALL be permanent and SHALL NOT expire

### Requirement: 更換次數禮包 focused view
P4「禮包」tab SHALL support an entry state that focuses the change-count package area when users arrive from P10 or P7.

#### Scenario: Arrive from P10
- **WHEN** P4 receives navigation intent from P10 for change-count packs
- **THEN** P4 selects the `package` tab
- **AND** P4 scrolls to or filters to the change-count pack area
- **AND** the visible title or section label uses Buddy-world wording such as "多一點選擇"

#### Scenario: Arrive from P7
- **WHEN** P4 receives navigation intent from P7 for change-count packs
- **THEN** P4 selects the `package` tab
- **AND** P4 scrolls to or filters to the change-count pack area

