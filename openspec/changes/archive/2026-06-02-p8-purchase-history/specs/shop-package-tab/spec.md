## MODIFIED Requirements

### Requirement: 禮包 tab 的 cash-strip 卡片互動
禮包 tab 內的商品卡片 SHALL 遵循與其他 tab cash-strip 相同的互動規則，包含詳情 sheet 與已購狀態。購買成功後 SHALL dispatch `PURCHASE_CASH` action 將訂單寫入 `state.orderHistory`，並在 `BuySuccessModal` 顯示「查看訂單」捷徑。

#### Scenario: 點擊有詳情的禮包商品
- **WHEN** 用戶點擊含 `contents` 或 `benefits` 的禮包卡片且尚未購買
- **THEN** ProductDetailSheet SHALL 開啟顯示商品完整內容

#### Scenario: 已購商品不可再點擊
- **WHEN** 商品對應 `state.sprintPurchased` 或 `state.hasPass` 為 true
- **THEN** 卡片顯示已購狀態（✓ 本月已領 / ✓ 啟用中），且 onClick 無效

#### Scenario: 現金購買成功後訂單寫入歷史
- **WHEN** 用戶確認現金禮包購買且交易成功
- **THEN** `state.orderHistory` SHALL 新增對應訂單紀錄
- **THEN** `BuySuccessModal` SHALL 顯示「查看訂單 ›」文字連結
