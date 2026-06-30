## Requirements

### Requirement: 商店雙軌制分區
P4 商店 SHALL 分為「ECOCO 點數消費區」與「真實金流 IAP 區」兩個分區，點數與現金不互換、不互買。

**NOTE（2026-05-28）**：hi-fi 原型商品 data 結構 SHALL 為每個商品加 `currency: 'heart' | 'cash'` 欄位以標明所屬分區；同一商品 SHALL NOT 同時持有兩種貨幣價格。

**NOTE（2026-06-04）**：玩具 tab 在 Phase 2 亦可包含 `currency:'cash'` 的現金道具商品，使用 `cash-strip` 橫式卡片呈現，置於點數商品 section 之前。IAP 區商品不限於禮包 tab。

#### Scenario: 點數區商品內容
- **WHEN** 用戶查看 ECOCO 點數消費區
- **THEN** 該區僅包含基礎食物補給包、一般道具（逗貓棒 / 小球 / 梳子 / 零食）、清潔用品，且每項商品 data `currency` 為 `'heart'`

#### Scenario: IAP 區商品內容（更新 #26/#27/#33）
- **WHEN** 用戶查看真實金流 IAP 區
- **THEN** 該區包含裝扮（永久穿戴）、月度通行證、**稀有食物**、**道具禮包**、**更換次數禮包**、月底衝刺禮包，以及 Phase 2 玩具現金商品；每項商品 data `currency` 為 `'cash'`
- **AND** App 內數位商品 `cashChannel` SHALL 為 `'platform-iap'`；ECOCO 點數儲值等非 App 內數位服務 `cashChannel` 為 `'newebpay'`

#### Scenario: 點數與現金不互換
- **WHEN** 用戶嘗試以點數購買 IAP 區商品（或反之）
- **THEN** 系統 SHALL NOT 允許該交易

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

### Requirement: 月底衝刺禮包置頂
P4 SHALL 於每月 22–28 日在**「禮包」tab** 顯示月底衝刺禮包，並於「禮包」tab chip 上附倒數天數 badge。

**NOTE（p4-shop-package-tab）**：置頂語意改為「禮包 tab 內顯示」，tab chip 上顯示倒數 badge 作為月底期間的視覺提示，取代原「商店頂部橫幅」定義。

#### Scenario: 進入置頂期
- **WHEN** 當前日期介於每月 22–28 日（原型以 `isSprintPeriod` 模擬）
- **THEN** 月底衝刺禮包出現在「禮包」tab cash-strip，且「禮包」tab chip 右上顯示倒數天數 badge

#### Scenario: 離開置頂期
- **WHEN** 當前日期不在 22–28 日
- **THEN** 月底衝刺禮包不出現在「禮包」tab，tab chip 也無 badge

### Requirement: 點數餘額與來源
P4 右上 SHALL 顯示 ECOCO 點數餘額（icon-ecoco-point.svg + 數字）；點擊展開底部 Sheet 顯示來源明細。

**NOTE（2026-05-28）**：`points-pill` 維持 `icon-ecoco-point.svg` 圖示，不改為 💎 文字；`PointsSourceSheet` 三列 label 採 Buddy 語言（「帶食物回家累積」「補充站消費累積」「今日陪伴累積」）。

#### Scenario: 查看點數來源
- **WHEN** 用戶點擊點數餘額
- **THEN** 底部 Sheet 展開並列出三類來源，label 採 Buddy 世界語言

### Requirement: 售罄商品狀態
售罄商品卡片 SHALL 以半透明灰底 + 「Buddy 已經吃過了」標籤呈現且不可點擊。

#### Scenario: 售罄文案
- **WHEN** 商品 `soldOut === true`
- **THEN** 卡片 overlay 顯示「Buddy 已經吃過了」，SHALL NOT 出現「暫時缺貨」「售罄」「Sold Out」等文字

#### Scenario: 售罄商品互動
- **WHEN** 用戶點擊售罄卡片
- **THEN** 卡片無響應，不開啟購買 Modal

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
