## Requirements

### Requirement: 玩具 tab 現金商品專區
P4 商店玩具 tab 在 Phase 2（`isPhase2 === true`）時，SHALL 在點數商品 section 之前顯示現金商品專區，使用橫式 `cash-strip` 滑動卡片佈局。現金商品使用 `currency:'cash'`、`cashChannel:'platform-iap'`，Phase 1 時此區塊不顯示。

#### Scenario: Phase 2 顯示玩具現金商品
- **WHEN** `shopPhase >= 2` 且用戶切換到玩具 tab
- **THEN** 玩具 tab 頂部出現「現金商品」標籤與橫向滑動卡片列

#### Scenario: Phase 1 不顯示玩具現金商品
- **WHEN** `shopPhase < 2` 且用戶切換到玩具 tab
- **THEN** 玩具 tab 只顯示點數商品，無現金商品區塊

#### Scenario: 現金玩具商品點擊購買
- **WHEN** 用戶點擊現金玩具商品卡片
- **THEN** 觸發 `setPurchasing(item)`，開啟 `ShopPurchaseModal`
