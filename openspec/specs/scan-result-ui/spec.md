## ADDED Requirements

### Requirement: 統一掃碼頁（P2）動態路由
P2 掃碼頁 SHALL 為遊戲模式內唯一的掃碼入口，依 QR Code 解析後的 `machine_type` 路由至 P2b（回收）或 P12（補充站）。

#### Scenario: 偵測為回收機台
- **WHEN** 用戶對準回收機台 QR Code 且後端回傳 `machine_type = recycling`
- **THEN** 頂部標示顯示「回收」並跳轉 P2b 回收結果頁

#### Scenario: 偵測為補充站
- **WHEN** 用戶對準補充站 QR Code 且後端回傳 `machine_type = refill`
- **THEN** 頂部標示顯示「補充站」並跳轉 P12 洗劑消費結果頁

#### Scenario: 解析失敗
- **WHEN** QR Code 解析失敗
- **THEN** 頁面顯示提示「無法辨識，請對準機台螢幕」且相機持續等待，不離開 P2

### Requirement: 回收結果頁（P2b）換算公式呈現
P2b SHALL 依下列公式顯示精神(HP)：杯子 +1/個、寶特瓶/鋁罐/牛奶瓶 +2/個、電池 1 號/2 號 +10/顆、其餘規格電池 +5/顆；退瓶不計算。

#### Scenario: 顯示換算明細
- **WHEN** 用戶完成掃碼且後端回傳投入物明細
- **THEN** P2b 依公式計算並顯示本次精神(HP)增量

#### Scenario: 換算說明摺疊區
- **WHEN** 用戶點擊「ℹ️ 換算說明」
- **THEN** 摺疊區展開並顯示公開公式表（投入物 → HP 對應）

### Requirement: 回收結果頁（P2b）配額狀態切換
P2b SHALL 依本週食物配額狀態切換顯示內容：配額未用完時顯示食物種類 + 數量 + HP + 雙 CTA；配額已用完時僅顯示 HP + 「本週食物已領完」+ 單 CTA。

#### Scenario: 配額未用完
- **WHEN** 本週該食物種類配額 < 5
- **THEN** 顯示「食物 +N」+ HP 增量，並提供「馬上餵 Buddy」「先放食物欄」兩個按鈕

#### Scenario: 配額已用完
- **WHEN** 本週該食物種類配額 = 5
- **THEN** 僅顯示 HP 增量 + 「本週食物已領完」提示 + 單一「完成」按鈕

#### Scenario: 下週食物預告
- **WHEN** 當前時間 ≥ 週日 12:00
- **THEN** P2b 底部常態顯示下週食物種類預告

### Requirement: 補充站結果頁（P12）換算公式呈現
P12 SHALL 依公式「每消費 NT$10 = 精神 +10 + 清爽 +10」顯示雙數值增量，並在底部加入換算說明摺疊區。

#### Scenario: 雙數值並排計數
- **WHEN** P12 開啟
- **THEN** 頁面下方並排顯示精神條（左）與清爽條（右），同步播放計數遞增動畫

#### Scenario: 進化判斷時序
- **WHEN** 計數遞增動畫尚未結束
- **THEN** 系統 SHALL NOT 觸發進化狀態判斷
- **AND** 動畫結束後才執行進化判斷

#### Scenario: 換算說明摺疊區
- **WHEN** 用戶點擊「ℹ️ 換算說明」
- **THEN** 摺疊區展開並顯示「NT$10 = +10 精神 + +10 清爽」公式

### Requirement: 補充站結果頁不呈現金流
P12 SHALL NOT 包含任何金流支付 UI，僅呈現「消費結果回饋」。

#### Scenario: 用戶在 P12 不會看到付款按鈕
- **WHEN** 用戶進入 P12
- **THEN** 頁面僅顯示數值增量、Buddy 動畫、返回按鈕，無付款 / 結帳元件
