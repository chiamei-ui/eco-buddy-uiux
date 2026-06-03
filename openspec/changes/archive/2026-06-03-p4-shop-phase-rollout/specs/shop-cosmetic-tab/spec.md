## ADDED Requirements

### Requirement: 裝扮專屬 Tab 存在
P4 商店 Tab Bar SHALL 包含一個 id 為 `cosmetic`、label 為「裝扮」的頁籤，顯示所有 App 內數位裝扮商品。文案 SHALL 為「裝扮」，SHALL NOT 使用「裝飾」「Decoration」「Cosmetic」等其他譯名。

#### Scenario: 三 Tab 共存
- **WHEN** 用戶進入 P4 商店
- **THEN** Tab Bar SHALL 顯示三個 Tab：「食物 / 道具」(點數)、「禮包」、「裝扮」

#### Scenario: 文案統一
- **WHEN** 任一 UI 出現此 Tab 標題
- **THEN** 文字 SHALL 為「裝扮」；hi-fi 原型現存「裝飾」字串 SHALL 替換

### Requirement: 裝扮 Tab 商品歸屬
裝扮 Tab SHALL 僅包含永久穿戴數位商品（如彩虹光暈、循環王冠等 S1–S6 插槽款），SHALL NOT 包含消耗道具、食物、月度通行證或月底衝刺禮包。

#### Scenario: 裝扮商品 currency 與 channel
- **WHEN** 商品出現在裝扮 Tab
- **THEN** 商品 data `currency === 'cash'` 且 `cashChannel === 'platform-iap'`

#### Scenario: 通行證限定款不出現在裝扮 Tab
- **WHEN** 商品為通行證解鎖之稀有裝飾
- **THEN** 該商品 SHALL NOT 出現在裝扮 Tab；裝扮 Tab 商品 SHALL NOT 可由通行證取得（兩條取得路徑互斥）

### Requirement: 裝扮 Tab 走平台 IAP
裝扮 Tab 之 cash 商品 SHALL 走 Apple / Google 平台 IAP，SHALL NOT 以藍新 NewebPay 或其他第三方金流收款；商品卡與購買流程 SHALL NOT 顯示「藍新」字樣或外部金流連結。

#### Scenario: 商品卡金流標示
- **WHEN** `shopPhase === 2` 且裝扮商品卡渲染
- **THEN** 卡片貨幣 Badge 為 `💳`、價格文字為 `NT$N`，並依設備標示 `App Store` 或 `Google Play`

#### Scenario: 購買確認頁金流路徑
- **WHEN** `shopPhase === 2` 且用戶點擊裝扮商品 CTA
- **THEN** 購買確認頁 SHALL 觸發平台 IAP 流程（StoreKit / Play Billing），SHALL NOT 跳出網頁付款

### Requirement: 裝扮價格區間與 hero 錨點
裝扮 Tab 商品價格 SHALL 落在 NT$60–199 區間；hero 款 SHALL 以 NT$99 或 NT$129 為定價錨點。

#### Scenario: 價格區間驗證
- **WHEN** 任一裝扮商品上架
- **THEN** 商品價格 SHALL >= 60 且 <= 199

#### Scenario: hero 款定價
- **WHEN** 商品標記為 `tier === 'hero'`
- **THEN** 商品價格 SHALL 為 99 或 129

### Requirement: 試穿／預覽
Phase 2 下，裝扮商品卡 SHALL 提供購買前的試穿／預覽入口；用戶 SHALL 可於確認購買前看到 Buddy 穿戴效果。

#### Scenario: 預覽入口
- **WHEN** `shopPhase === 2` 且用戶點擊裝扮商品卡
- **THEN** SHALL 開啟詳情 Sheet，含 Buddy 預覽動畫或靜態圖、商品描述、CTA「試穿」與「購買」

#### Scenario: 試穿不扣款
- **WHEN** 用戶點擊「試穿」
- **THEN** Buddy 預覽區即時套用該裝扮、SHALL NOT 觸發任何金流請求；返回時還原

#### Scenario: Phase 1 不提供試穿
- **WHEN** `shopPhase === 1`
- **THEN** 商品卡可顯示靜態預覽圖，但 CTA disabled、不開啟試穿動畫

### Requirement: 商店不負責換裝
P4 商店 SHALL 僅負責裝扮購買；購買完成後 SHALL 引導用戶至 P8「我的」進行換裝管理，P4 內 SHALL NOT 提供「立即穿戴」或換裝清單功能。

#### Scenario: 購買成功後引導
- **WHEN** `shopPhase === 2` 且裝扮購買成功
- **THEN** 成功頁 SHALL 顯示「到 P8 我的查看與換裝」CTA，點擊跳轉 P8 換裝管理頁

#### Scenario: P4 內無換裝功能
- **WHEN** 用戶於 P4 任何 Tab
- **THEN** SHALL NOT 出現「目前穿戴」「切換裝扮」「卸下」等換裝管理 UI

### Requirement: Phase 1 hero 款預載
Phase 1 下，裝扮 Tab SHALL 預載 2–3 款 hero 卡片（建議彩虹光暈、循環王冠優先），其餘 S1–S6 插槽 SHALL 留空或標記為「敬請期待」。

#### Scenario: Phase 1 卡片數量
- **WHEN** `shopPhase === 1` 且用戶進入裝扮 Tab
- **THEN** Tab 內 SHALL 顯示 2–3 張 hero 卡片，所有卡片 CTA 為 disabled「即將開放」

#### Scenario: 後續月度更新
- **WHEN** `shopPhase === 2` 且運營排程加入新裝扮款
- **THEN** S1–S6 插槽 SHALL 依排程逐月填入；通行證限定款不進此 Tab
