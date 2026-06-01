## ADDED Requirements

### Requirement: 商店雙軌制分區
P4 商店 SHALL 分為「ECOCO 點數消費區」與「真實金流 IAP 區」兩個分區，點數與現金不互換、不互買。

**NOTE（2026-05-28）**：hi-fi 原型商品 data 結構 SHALL 為每個商品加 `currency: 'heart' | 'cash'` 欄位以標明所屬分區；同一商品 SHALL NOT 同時持有兩種貨幣價格。

#### Scenario: 愛心區商品內容
- **WHEN** 用戶查看 ECOCO 點數消費區
- **THEN** 該區僅包含基礎食物補給包、一般道具（逗貓棒 / 小球 / 梳子 / 零食）、清潔用品，且每項商品 data `currency` 為 `'heart'`

#### Scenario: IAP 區商品內容
- **WHEN** 用戶查看真實金流 IAP 區
- **THEN** 該區僅包含月底衝刺禮包 NT$199、月度通行證 NT$149、稀有限定裝飾、圖鑑加速 / 特殊道具，且每項商品 data `currency` 為 `'cash'`，並出現在「禮包」tab

#### Scenario: 點數與現金不互換
- **WHEN** 用戶嘗試以點數購買 IAP 區商品（或反之）
- **THEN** 系統 SHALL NOT 允許該交易

### Requirement: 商品卡片貨幣標示
每張商品卡片 SHALL 在卡片右上角以 Badge 標示貨幣種類、在價格區明確標示金額。

**NOTE（2026-05-28）**：hi-fi 原型 P4 `shop-card` SHALL 於卡片右上 `position: absolute; top: 8; right: 8` 以 Badge 樣式顯示 `💎`（點數商品）或 `💳`（IAP 商品），與下方價格文字一致；不得遺漏任一商品。

#### Scenario: 點數商品標示
- **WHEN** 商品 `currency === 'heart'`
- **THEN** 卡片右上 Badge 為 `💎`，價格文字格式為「icon-ecoco-point.svg + N」，顏色採主橘色 `#FF5000`

#### Scenario: IAP 商品標示
- **WHEN** 商品 `currency === 'cash'`
- **THEN** 卡片右上 Badge 為 `💳`，價格文字格式為「NT$ N」，顏色採品牌藍 `#060E9F`

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
點擊可購買卡片 SHALL 開啟購買確認 Modal；Modal 行為依商品 `currency` 欄位決定，點數與現金流程完全獨立。

**NOTE（2026-05-28）**：hi-fi 原型現存 `ShopPurchaseModal` 在點數不足時自動將 `method` 切換為 `'cash'` 的行為 SHALL 移除；點數區商品點數不足時 SHALL 顯示「點數不足」alert，且 Modal 內無 cash 切換按鈕。

#### Scenario: 點數不足不自動切換
- **WHEN** 用戶嘗試購買 `currency === 'heart'` 商品但點數餘額不足
- **THEN** Modal 顯示「點數不足」alert 與引導文案（如「再去帶食物回家給 Buddy」），SHALL NOT 出現現金支付按鈕

#### Scenario: IAP 商品購買流程
- **WHEN** 用戶於 `currency === 'cash'` 商品 Modal 點擊「確認購買」
- **THEN** Modal 顯示 Apple Pay / Google Pay 選項，不顯示點數餘額

#### Scenario: 確認購買
- **WHEN** 用戶於 Modal 點擊「確認」
- **THEN** 扣款（點數或 IAP）→ 道具加入 P9 背包 → P1 道具包 Badge 更新
