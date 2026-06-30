## MODIFIED Requirements

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
