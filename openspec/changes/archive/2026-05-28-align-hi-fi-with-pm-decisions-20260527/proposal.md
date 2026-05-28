## Why

`align-ui-with-v17-flow` 已對齊 Tab Bar、P2b、P12、P5、P7 文案，但完整審計 hi-fi 原型後，仍有多處違反現行已通過的 `shop-dual-track-ui`、`item-effects-ui`、`terminology-rename` 規格：P4 商店無雙軌制 Badge 與 IAP 商品、道具效果數值未更新（仍是舊 +3/+6/+8/+10）、多處露出「HP / 潔淨 / ECOCO 點數 / Phase 2 / SDK 接管 / 即將推出」禁用詞、ShopPurchaseModal 愛心不足時自動切現金（違反「不互換」規則）。設計評審前須一次清理乾淨。

## What Changes

- **P4 商品 data 結構**：加入 `currency: 'heart' | 'cash'` 欄位；新增 IAP 區商品（月底衝刺禮包 NT$199、月度通行證 NT$149、稀有限定裝飾）
- **P4 商品卡片**：右上加 💎 愛心 / 💳 NT$ Badge；售罄文案「暫時缺貨」→「Buddy 已經吃過了」；移除「即將推出」字樣
- **P4 Header**：`points-pill` 改為 💎 愛心顯示，移除「ECOCO 點數」icon
- **P4 ShopPurchaseModal**：愛心不足時顯示「愛心不足」alert，**不再**自動切換 cash；移除「ECOCO 點數」字樣
- **道具效果數值**：P4 / P6 / P9b 描述全面對齊 #3 定案（逗貓棒/小球 心情+15；梳子 清爽+15 心情+10；零食 精神+15 心情+15）
- **三維屬性命名**：screens.jsx（P2b、P3、P4、P8、P9）、screens-d2.jsx（P12）所有 HP→精神、潔淨→清爽
- **dialogues.jsx**：對話中「回收」字眼改 Buddy 語言（「帶食物回家」）
- **app.jsx**：推播文案 HP 低 / 潔淨低改為 Buddy 語言
- **P6 廣告**：「SDK 接管 · 15 秒後可跳過」改為中性倒數文案

## Capabilities

### New Capabilities

（無 — 本 change 為實作已通過規格，不引入新能力）

### Modified Capabilities

- `shop-dual-track-ui`：補充 hi-fi 實作落差 — 商品 data 加 currency 欄、IAP 區商品上架、Modal 不自動切現金、Header 改愛心顯示
- `item-effects-ui`：hi-fi 原型 P4 道具描述與 P6 廣告效果文字對齊已定案數值
- `terminology-rename`：清除 hi-fi 原型殘餘禁用詞（HP / 潔淨 / ECOCO 點數 / Phase 2 / SDK 接管 / 即將推出 / 回收）

## Impact

- `refrence/eco-buddy_hi-fi/screens.jsx`（P2b、P3、P4 + ShopPurchaseModal + ShopSuccessModal + PointsSourceSheet、P6、P8、P9）
- `refrence/eco-buddy_hi-fi/screens-d2.jsx`（P12）
- `refrence/eco-buddy_hi-fi/dialogues.jsx`
- `refrence/eco-buddy_hi-fi/app.jsx`（推播文案、reducer 文案）
- 無破壞性 API 變更；純 hi-fi prototype 視覺 / 文案 / 商品結構調整
- IAP SDK 串接不在本 change 範圍（資安 review 後另案）
- 點數消費單日上限、P11 次數包定價不在範圍
