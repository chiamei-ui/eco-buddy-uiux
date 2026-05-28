## MODIFIED Requirements

### Requirement: 商店雙軌制分區
P4 商店 SHALL 分為「愛心（ECOCO 點數）消費區」與「真實金流 IAP 區」兩個分區，點數與現金不互換、不互買。

**MODIFIED**：hi-fi 原型商品 data 結構 SHALL 為每個商品加 `currency: 'heart' | 'cash'` 欄位以標明所屬分區；同一商品 SHALL NOT 同時持有兩種貨幣價格。

#### Scenario: 愛心區商品內容
- **WHEN** 用戶查看愛心消費區
- **THEN** 該區僅包含基礎食物補給包、一般道具（逗貓棒 / 小球 / 梳子 / 零食）、清潔用品，且每項商品 data `currency` 為 `'heart'`

#### Scenario: IAP 區商品內容
- **WHEN** 用戶查看真實金流 IAP 區
- **THEN** 該區僅包含月底衝刺禮包 NT$199、月度通行證 NT$149、稀有限定裝飾、圖鑑加速 / 特殊道具，且每項商品 data `currency` 為 `'cash'`

#### Scenario: 點數與現金不互換
- **WHEN** 用戶嘗試以愛心購買 IAP 區商品（或反之）
- **THEN** 系統 SHALL NOT 允許該交易

### Requirement: 商品卡片貨幣標示
每張商品卡片 SHALL 在價格區明確標示「💎 愛心」或「💳 NT$」。

**MODIFIED**：hi-fi 原型 P4 `shop-card` SHALL 於卡片右上以 Badge 樣式顯示 `💎` 或 `💳`，與下方價格文字一致；不得遺漏任一商品。

#### Scenario: 愛心商品標示
- **WHEN** 商品 `currency === 'heart'`
- **THEN** 卡片右上 Badge 為 `💎`，價格文字格式為「💎 N」，顏色採主橘色 `#FF5000`

#### Scenario: IAP 商品標示
- **WHEN** 商品 `currency === 'cash'`
- **THEN** 卡片右上 Badge 為 `💳`，價格文字格式為「NT$ N」，顏色採品牌藍 `#060E9F`

### Requirement: 售罄商品狀態
售罄商品卡片 SHALL 以半透明灰底 + 「Buddy 已經吃過了」標籤呈現且不可點擊。

**MODIFIED**：hi-fi 原型現存 `oos-overlay` 文案「暫時缺貨」SHALL 改為「Buddy 已經吃過了」。

#### Scenario: 售罄文案
- **WHEN** 商品 `soldOut === true`
- **THEN** 卡片 overlay 顯示「Buddy 已經吃過了」，不顯示「暫時缺貨」「售罄」「Sold Out」等中性 / 工程語言

#### Scenario: 售罄商品互動
- **WHEN** 用戶點擊售罄卡片
- **THEN** 卡片無響應，不開啟購買 Modal

### Requirement: 購買確認 Modal
點擊可購買卡片 SHALL 開啟底部 Sheet 形式的購買確認 Modal；愛心不足時 Modal 高亮提示愛心不足。

**MODIFIED**：hi-fi 原型現存 `ShopPurchaseModal` 在愛心不足時自動將 `method` 切換為 `'cash'` 的行為 SHALL 移除；點數區商品愛心不足時 SHALL 顯示「愛心不足」alert，且 Modal 內無 cash 切換按鈕。

#### Scenario: 愛心不足不自動切換
- **WHEN** 用戶嘗試購買愛心區商品但餘額不足
- **THEN** Modal 顯示「愛心不足」alert 與引導文案（如「再去帶食物回家給 Buddy」），SHALL NOT 出現現金支付按鈕

#### Scenario: IAP 商品購買流程
- **WHEN** 用戶於 IAP 商品 Modal 點擊「確認購買」
- **THEN** Modal 顯示 Apple Pay / Google Pay 選項，不顯示愛心餘額

#### Scenario: Modal 內禁用「ECOCO 點數」字樣
- **WHEN** 購買 Modal 任一狀態
- **THEN** 文案使用「愛心」「NT$」，SHALL NOT 出現「ECOCO 點數」「點數」

### Requirement: 愛心餘額與來源
P4 右上 SHALL 顯示愛心餘額；點擊展開底部 Sheet 顯示來源明細（回收次數、補充站消費、任務獎勵）。

**MODIFIED**：hi-fi 原型 `points-pill` SHALL 顯示 `💎 {N}` 樣式，移除 `icon-ecoco-point.svg`；`PointsSourceSheet` 標題 SHALL 為「愛心來源」，內部三列 label SHALL 對齊 Buddy 語言（「帶食物回家累積」「補充站消費累積」「今日陪伴累積」）。

#### Scenario: 餘額顯示樣式
- **WHEN** P4 Header 載入
- **THEN** 右側顯示 `💎 {愛心數}`，無 ECOCO point svg icon

#### Scenario: 來源 Sheet 文案
- **WHEN** 用戶點擊愛心餘額展開 Sheet
- **THEN** 標題為「愛心來源」，三列 label 採 Buddy 語言，無「點數」字樣
