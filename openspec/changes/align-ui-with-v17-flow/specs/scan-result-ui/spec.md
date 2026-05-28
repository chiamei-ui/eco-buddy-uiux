## MODIFIED Requirements

### Requirement: 回收結果頁（P2b）換算公式呈現
P2b SHALL 依下列公式顯示精神(HP)：杯子 +1/個、寶特瓶/鋁罐/牛奶瓶 +2/個、電池 1 號/2 號 +10/顆、其餘規格電池 +5/顆；退瓶不計算。

**MODIFIED**：P2b 頁面 eyebrow、標題、Stats 文案、CTA 按鈕必須使用以下精確字串（對齊 UI_SPEC v1.3）：
- eyebrow：`RECYCLE COMPLETE · 帶食物回家`
- 主標題：`Buddy 收到禮物了！`
- Stats 列第三項：`+N 愛心`（不得出現「ECOCO 點數」）
- CTA 主要按鈕：`馬上餵 Buddy`
- CTA 次要按鈕：`先放食物欄`

#### Scenario: eyebrow 文案正確
- **WHEN** 用戶進入 P2b
- **THEN** eyebrow 顯示「RECYCLE COMPLETE · 帶食物回家」，不出現「回收掃碼」

#### Scenario: 標題文案正確
- **WHEN** 用戶進入 P2b
- **THEN** 主標題為「Buddy 收到禮物了！」，不出現「本次回收成功！」

#### Scenario: Stats 顯示愛心
- **WHEN** P2b 顯示本次回收統計
- **THEN** 第三欄標籤為「愛心」，不出現「ECOCO 點數」

#### Scenario: CTA 按鈕文案
- **WHEN** 配額未用完，P2b 顯示雙 CTA
- **THEN** 主按鈕文字為「馬上餵 Buddy」，次要按鈕為「先放食物欄」

#### Scenario: 換算說明摺疊區
- **WHEN** 用戶點擊「ℹ️ 換算說明 ›」
- **THEN** 摺疊區展開顯示完整公式表，點擊再次收合

### Requirement: 回收結果頁（P2b）配額狀態切換
P2b SHALL 依本週食物配額狀態切換顯示內容：配額未用完時顯示食物種類 + 數量 + HP + 雙 CTA；配額已用完時僅顯示 HP + 「本週食物已領完」+ 單 CTA。

**MODIFIED**：配額已用完情境的文案 SHALL 使用 Buddy 語言，不露出「HP」工程詞。

#### Scenario: 配額未用完
- **WHEN** 本週該食物種類配額 < 5
- **THEN** 顯示「食物 +N」+ 精神增量，並提供「馬上餵 Buddy」「先放食物欄」兩個按鈕

#### Scenario: 配額已用完
- **WHEN** 本週該食物種類配額 = 5
- **THEN** 顯示「本週食物已領完」提示 + 精神增量說明，使用 Buddy 語言（如「Buddy 的精神 +N！」），不出現裸露的「HP」

#### Scenario: 下週食物預告
- **WHEN** 當前時間 ≥ 週日 12:00
- **THEN** P2b 底部常態顯示下週食物種類預告

### Requirement: 補充站結果頁（P12）換算公式呈現
P12 SHALL 依公式「每消費 NT$10 = 精神 +10 + 清爽 +10」顯示雙數值增量，並在底部加入換算說明摺疊區。

**MODIFIED**：增加「ℹ️ 換算說明」摺疊元件規格，預設收合，主內容區不得有「金流」「費用」等詞。

#### Scenario: 雙數值並排計數
- **WHEN** P12 開啟
- **THEN** 頁面下方並排顯示精神條（左）與清爽條（右），同步播放計數遞增動畫

#### Scenario: 進化判斷時序
- **WHEN** 計數遞增動畫尚未結束
- **THEN** 系統 SHALL NOT 觸發進化狀態判斷；動畫結束後才執行判斷

#### Scenario: 換算說明摺疊區
- **WHEN** 用戶點擊「ℹ️ 換算說明 ›」
- **THEN** 摺疊區展開顯示「NT$10 = +10 精神 + +10 清爽」，點擊再次收合

### Requirement: 補充站結果頁不呈現金流
P12 SHALL NOT 包含任何金流支付 UI，僅呈現「消費結果回饋」。主內容區 SHALL NOT 出現「金流」「費用」「付款」字串。

#### Scenario: P12 不含付款元件
- **WHEN** 用戶進入 P12
- **THEN** 頁面僅顯示數值增量、Buddy 動畫、ℹ️ 換算說明、返回按鈕，無付款 / 結帳元件
