## MODIFIED Requirements

### Requirement: 回收結果頁（P2b）換算公式呈現
P2b SHALL 以本次回收總量作為主視覺，使用大字顯示總件數，並以小字、資訊列或摺疊區呈現數據細節與換算說明。P2b SHALL 顯示本次立即結算的潔淨增量與實際獲得食物數量；體力增量 SHALL NOT 在回收當下直接結算，體力由後續 P1 餵食食物時依後端回傳結果增加。

**MODIFIED**：2026-06-08 決策要求 P2b 增加遊戲感並降低資訊複雜度；主畫面顯示回收總量，細節降層。

#### Scenario: 大字顯示回收總量
- **WHEN** 用戶進入 P2b
- **THEN** 主視覺 SHALL 以大字顯示本次回收總量，例如「帶回 6 件」

#### Scenario: 細節降層顯示
- **WHEN** P2b 顯示機台回傳細節
- **THEN** 投入品項、公式、食物上限等細節 SHALL 以較小字級、旁註或摺疊區顯示，不得與主總量同層搶焦點

#### Scenario: 潔淨當下結算
- **WHEN** 回收成功完成
- **THEN** P2b SHALL 顯示本次潔淨增量，並在使用者離開 P2b 前完成結算

#### Scenario: 體力不在回收當下結算
- **WHEN** 回收成功完成但使用者尚未餵食
- **THEN** P2b SHALL NOT 顯示回收直接增加體力的結果；體力增量 SHALL 於 P1 餵食後顯示

### Requirement: 回收結果頁（P2b）機台類型互斥
P2b SHALL 依機台類型顯示單一資料模式：收瓶機只顯示投瓶/退瓶相關資訊，電池機只顯示投電池相關資訊。P2b SHALL NOT 在同一次結果中同時顯示投瓶數與投電池數。

#### Scenario: 收瓶機結果
- **WHEN** `machine_type` 為收瓶機
- **THEN** P2b SHALL 顯示投瓶/退瓶相關細節，並隱藏投電池數

#### Scenario: 電池機結果
- **WHEN** `machine_type` 為電池機
- **THEN** P2b SHALL 顯示投電池相關細節，並隱藏投瓶數與退瓶數

#### Scenario: 混合資料異常
- **WHEN** API 同時回傳投瓶數與投電池數
- **THEN** P2b SHALL 顯示資料異常狀態或要求重新整理，不得自行合併兩種機台結果

### Requirement: 回收結果頁（P2b）配額狀態切換
P2b SHALL 依後台食物上限與本次回收總量顯示本次實際獲得的食物數量。未達上限時，N 個資收物 SHALL 產生 N 個食物；達上限後，超額部分 SHALL 不產生食物，但潔淨仍須當下結算。

**MODIFIED**：2026-06-08 決策要求「食物有限量、潔淨值必得、當下結算」；配額用完時不再描述為體力仍計入。

#### Scenario: 食物未達上限
- **WHEN** 本次回收後仍未達後台設定的食物上限
- **THEN** P2b SHALL 顯示本次獲得食物數量，且數量等於本次資收物件數

#### Scenario: 食物達上限
- **WHEN** 本次回收會超過後台設定的食物上限
- **THEN** P2b SHALL 顯示實際入帳食物數量與上限提示，超額部分不產生食物

#### Scenario: 食物已滿仍結算潔淨
- **WHEN** 食物已達上限且本次沒有新增食物
- **THEN** P2b SHALL 仍顯示並結算本次潔淨增量

### Requirement: P2b 返回 P1 潔淨動畫
P2b 返回 P1 時，P1 SHALL 顯示本次潔淨增量動畫，格式為「+N 潔淨」，並讓使用者感覺 Buddy 狀態已被照顧。

#### Scenario: 返回 P1 顯示潔淨增量
- **WHEN** 用戶從 P2b 點擊 CTA 返回 P1
- **THEN** P1 SHALL 在 Buddy 或狀態條附近播放「+N 潔淨」動畫

#### Scenario: 食物與潔淨動畫同時存在
- **WHEN** 本次回收同時新增食物與潔淨
- **THEN** P1 SHALL 同時允許食物格 Badge/光暈動畫與「+N 潔淨」動畫存在，且兩者不得互相遮擋
