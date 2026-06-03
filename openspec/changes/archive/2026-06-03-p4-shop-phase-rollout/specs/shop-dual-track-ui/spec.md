## MODIFIED Requirements

### Requirement: 商品卡片貨幣標示
每張商品卡片 SHALL 在卡片右上角以 Badge 標示貨幣種類、在價格區明確標示金額；cash 商品 SHALL 進一步以 `cashChannel` 區分金流路徑（藍新 NewebPay 或平台 IAP）。

**NOTE（2026-05-28）**：hi-fi 原型 P4 `shop-card` SHALL 於卡片右上 `position: absolute; top: 8; right: 8` 以 Badge 樣式顯示 `💎`（點數商品）或 `💳`（cash 商品），與下方價格文字一致；不得遺漏任一商品。

**NOTE（2026-06-02 / #26 #28）**：hi-fi 原型商品 data 結構 SHALL 為 cash 商品新增 `cashChannel: 'newebpay' | 'platform-iap'` 欄位；點數商品（`currency === 'heart'`）SHALL NOT 帶 `cashChannel`。

#### Scenario: 點數商品標示
- **WHEN** 商品 `currency === 'heart'`
- **THEN** 卡片右上 Badge 為 `💎`，價格文字格式為「icon-ecoco-point.svg + N」，顏色採主橘色 `#FF5000`

#### Scenario: 禮包 Tab cash 商品標示
- **WHEN** 商品 `currency === 'cash'` 且 `cashChannel === 'newebpay'`
- **THEN** 卡片右上 Badge 為 `💳`，價格文字格式為「NT$ N」，顏色採品牌藍 `#060E9F`；Phase 2 下卡片副標 SHALL 顯示「藍新 NewebPay」

#### Scenario: 裝扮 Tab cash 商品標示
- **WHEN** 商品 `currency === 'cash'` 且 `cashChannel === 'platform-iap'`
- **THEN** 卡片右上 Badge 為 `💳`，價格文字格式為「NT$ N」，顏色採品牌藍 `#060E9F`；Phase 2 下卡片副標 SHALL 依設備顯示 `App Store` 或 `Google Play`；SHALL NOT 顯示「藍新」字樣

### Requirement: 購買確認 Modal
點擊可購買卡片 SHALL 開啟購買確認 Modal；Modal 行為依商品 `currency` 與 `cashChannel` 欄位決定；點數區與兩條 cash 路徑流程互相獨立。

**NOTE（2026-05-28）**：hi-fi 原型現存 `ShopPurchaseModal` 在點數不足時自動將 `method` 切換為 `'cash'` 的行為 SHALL 移除；點數區商品點數不足時 SHALL 顯示「點數不足」alert，且 Modal 內無 cash 切換按鈕。

**NOTE（2026-06-02 / #26 #27）**：Phase 1（封測）下 cash 商品 Modal SHALL NOT 開啟；CTA 為 disabled。Phase 2 才出現含金流路徑的購買確認頁（規格見 `shop-phase-rollout`）。原「Apple Pay / Google Pay 選項」描述已過時，由 `cashChannel` 決定流程。

#### Scenario: 點數不足不自動切換
- **WHEN** 用戶嘗試購買 `currency === 'heart'` 商品但點數餘額不足
- **THEN** Modal 顯示「點數不足」alert 與引導文案（如「再去帶食物回家給 Buddy」），SHALL NOT 出現現金支付按鈕

#### Scenario: 禮包 cash 商品購買流程
- **WHEN** `shopPhase === 2` 且用戶於 `currency === 'cash' && cashChannel === 'newebpay'` 商品 Modal 點擊「確認購買」
- **THEN** SHALL 跳轉藍新 NewebPay 網頁付款流程，付款方式包含信用卡、超商代碼、LINE Pay

#### Scenario: 裝扮 cash 商品購買流程
- **WHEN** `shopPhase === 2` 且用戶於 `currency === 'cash' && cashChannel === 'platform-iap'` 商品 Modal 點擊「確認購買」
- **THEN** SHALL 觸發平台 IAP 流程（StoreKit / Play Billing），SHALL NOT 跳轉外部網頁

#### Scenario: Phase 1 cash 商品不開 Modal
- **WHEN** `shopPhase === 1` 且 cash 商品 CTA 被點擊
- **THEN** CTA 為 disabled 狀態、Modal SHALL NOT 開啟、SHALL NOT 觸發任何金流相關網路請求

#### Scenario: 點數確認購買
- **WHEN** 用戶於點數商品 Modal 點擊「確認」
- **THEN** 扣點數 → 道具加入 P9 背包 → P1 道具包 Badge 更新

#### Scenario: cash 確認購買成功
- **WHEN** `shopPhase === 2` 且 cash 商品金流回呼成功
- **THEN** 後端 entitlement 驗證 → 道具或裝扮入庫（道具進 P9、裝扮進 P8）→ 顯示訂單編號
