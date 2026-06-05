## Requirements

### Requirement: 動態數值定義清單
系統 SHALL 維護一份「動態數值清單」，列出所有不得在前端 hardcode 的遊戲數值，以及對應的 API 欄位名稱與 UI 顯示位置。

#### Scenario: 道具效果值為動態數值
- **WHEN** 前端渲染道具效果值（逗貓棒心情值、梳子潔淨值、零食體力值等）
- **THEN** 數值 SHALL 來自 API response 欄位，前端程式碼不得包含任何具體數字常數

#### Scenario: 食物效果值為動態數值
- **WHEN** 前端渲染食物效果值（普通食物體力加成、稀有食物體力加成）
- **THEN** 數值 SHALL 來自 API response 欄位，前端程式碼不得包含任何具體數字常數

#### Scenario: 食物產出比例為動態數值
- **WHEN** 後端計算本次回收產生多少食物
- **THEN** 投瓶數與食物數的換算比例（預設 1:1）SHALL 由後台設定，前端僅顯示後端回傳的食物數量結果

### Requirement: 廣告掉落機率由後端執行
廣告開箱結果 SHALL 由後端決定並回傳，前端不持有機率表、不執行隨機抽取邏輯、不實作保底計數。

#### Scenario: 廣告開箱請求
- **WHEN** 用戶完成廣告觀看觸發開箱
- **THEN** 前端 SHALL 向後端發送開箱 API 請求，後端回傳本次獲得的道具 ID，前端僅負責顯示動畫與結果

#### Scenario: 前端無機率常數
- **WHEN** 審查前端程式碼
- **THEN** SHALL NOT 存在任何掉落機率數字（如 40%、30%）或保底計數邏輯（如「連 3 次未中」）

### Requirement: IAP 定價讀取平台本地化價格
App 內 IAP 商品定價 SHALL 從 App Store / Google Play 平台 SDK 讀取本地化價格字串，前端程式碼不得 hardcode 任何貨幣金額（如 NT$199）。

#### Scenario: 讀取平台價格
- **WHEN** P4 商店 IAP 區商品卡片渲染
- **THEN** 價格文字 SHALL 顯示平台 SDK 回傳的本地化價格（如「NT$199」、「$6.99」），不從前端常數讀取

#### Scenario: 平台 SKU 對應
- **WHEN** 前端向平台 SDK 查詢商品資訊
- **THEN** SHALL 以 SKU ID 作為查詢鍵（如 `eco_pass_monthly`、`sprint_pack_199`），不以金額字串作為識別

### Requirement: UI Spec 動態數值標注格式
`UI_SPEC.md` 及各 spec 文件中，凡是動態數值的展示位置 SHALL 以 `[API: <field_name>]` 標注，明確指出工程師應讀取的 API 欄位。IAP 商品定價位置 SHALL 以 `[IAP SKU: <sku_id>]` 標注。

#### Scenario: 道具效果值標注
- **WHEN** spec 文件描述道具效果值顯示格式
- **THEN** SHALL 使用格式：`心情 +[API: tool_mood_effect]` 而非 `心情 +15`

#### Scenario: IAP 定價標注
- **WHEN** spec 文件描述 IAP 商品價格顯示
- **THEN** SHALL 使用格式：`[IAP SKU: eco_pass_monthly]` 而非 `NT$149`
