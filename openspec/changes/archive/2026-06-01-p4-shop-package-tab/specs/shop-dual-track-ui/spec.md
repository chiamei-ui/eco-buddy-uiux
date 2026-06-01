## MODIFIED Requirements

### Requirement: IAP 區商品內容
IAP 區商品 SHALL 顯示於「禮包」tab，而非食物 tab 的 cash-strip。

**NOTE（此次變更）**：月底衝刺禮包與月度通行證從 `items.food` 移至 `items.package`；food tab 的 cash-strip 不再顯示任何 IAP 商品。

#### Scenario: IAP 區商品內容
- **WHEN** 用戶查看真實金流 IAP 區
- **THEN** 該區僅包含月底衝刺禮包 NT$199、月度通行證 NT$149、稀有限定裝飾、圖鑑加速 / 特殊道具，且每項商品 data `currency` 為 `'cash'`，並出現在「禮包」tab

### Requirement: 月底衝刺禮包置頂
P4 SHALL 於每月 22–28 日在**「禮包」tab** 顯示月底衝刺禮包，並於「禮包」tab chip 上附倒數天數 badge。

**NOTE（此次變更）**：置頂語意改為「禮包 tab 內顯示」，tab chip 上顯示倒數 badge 作為月底期間的視覺提示，取代原「商店頂部橫幅」定義。

#### Scenario: 進入置頂期
- **WHEN** 當前日期介於每月 22–28 日（原型以 `isSprintPeriod` 模擬）
- **THEN** 月底衝刺禮包出現在「禮包」tab cash-strip，且「禮包」tab chip 右上顯示倒數天數 badge

#### Scenario: 離開置頂期
- **WHEN** 當前日期不在 22–28 日
- **THEN** 月底衝刺禮包不出現在「禮包」tab，tab chip 也無 badge
