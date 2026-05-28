## ADDED Requirements

### Requirement: 商店雙軌制分區
P4 商店 SHALL 分為「愛心（ECOCO 點數）消費區」與「真實金流 IAP 區」兩個分區，點數與現金不互換、不互買。

#### Scenario: 愛心區商品內容
- **WHEN** 用戶查看愛心消費區
- **THEN** 該區僅包含基礎食物補給包、一般道具（逗貓棒 / 小球 / 梳子 / 零食）、清潔用品

#### Scenario: IAP 區商品內容
- **WHEN** 用戶查看真實金流 IAP 區
- **THEN** 該區僅包含月底衝刺禮包 NT$199、月度通行證 NT$149、稀有限定裝飾、圖鑑加速 / 特殊道具

#### Scenario: 點數與現金不互換
- **WHEN** 用戶嘗試以愛心購買 IAP 區商品（或反之）
- **THEN** 系統 SHALL NOT 允許該交易

### Requirement: 商品卡片貨幣標示
每張商品卡片 SHALL 在價格區明確標示「💎 愛心」或「💳 NT$」。

#### Scenario: 愛心商品標示
- **WHEN** 商品為愛心區商品
- **THEN** 卡片顯示「💎 N 愛心」價格樣式

#### Scenario: IAP 商品標示
- **WHEN** 商品為 IAP 區商品
- **THEN** 卡片顯示「💳 NT$N」價格樣式

### Requirement: 月底衝刺禮包置頂
P4 SHALL 於每月 22–28 日將月底衝刺禮包置頂顯示，並有倒數天數與樣式區隔。

#### Scenario: 進入置頂期
- **WHEN** 當前日期介於每月 22–28 日
- **THEN** 月底衝刺禮包卡片置於商店頂部，附倒數天數，視覺上與一般卡片區隔

#### Scenario: 離開置頂期
- **WHEN** 當前日期不在 22–28 日
- **THEN** 月底衝刺禮包不置頂

### Requirement: 愛心餘額與來源
P4 右上 SHALL 顯示愛心餘額；點擊展開底部 Sheet 顯示來源明細（回收次數、補充站消費、任務獎勵）。

#### Scenario: 查看愛心來源
- **WHEN** 用戶點擊愛心餘額
- **THEN** 底部 Sheet 展開並列出三類來源

### Requirement: 售罄商品狀態
售罄商品卡片 SHALL 以半透明灰底 + 「Buddy 已經吃過了」標籤呈現且不可點擊。

#### Scenario: 售罄商品互動
- **WHEN** 商品狀態為售罄且用戶點擊該卡片
- **THEN** 卡片無響應，不開啟購買 Modal

### Requirement: 購買確認 Modal
點擊可購買卡片 SHALL 開啟底部 Sheet 形式的購買確認 Modal；愛心不足時 Modal 自動高亮現金支付選項。

#### Scenario: 愛心不足
- **WHEN** 用戶嘗試購買愛心區商品但餘額不足
- **THEN** Modal 高亮提示愛心不足（不自動切換成現金支付，因雙軌不互換）

#### Scenario: 確認購買
- **WHEN** 用戶於 Modal 點擊「確認」
- **THEN** 扣款（愛心或 IAP）→ 道具加入 P9 背包 → P1 道具包 Badge 更新
