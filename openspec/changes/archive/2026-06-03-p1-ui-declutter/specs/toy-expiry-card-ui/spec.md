## ADDED Requirements

### Requirement: P1 道具格時效視覺狀態
P1 玩具箱 Sub-Tab 的道具格 SHALL 依有效期剩餘時間呈現三種視覺狀態：正常、即將過期（≤24h）、已過期。永久類道具不顯示任何時效 icon。

#### Scenario: 正常狀態（有效期 >24h）
- **WHEN** 道具有效期剩餘 >24h（或為永久類）
- **THEN** 卡片右上角不顯示任何時效 icon，僅顯示 ℹ️ icon

#### Scenario: 即將過期（有效期 ≤24h）
- **WHEN** 道具有效期剩餘 ≤24h 且 >0
- **THEN** 卡片右上角顯示橘色 ⏰ icon（取代 ℹ️ 位置），卡片本體無其他視覺變化

#### Scenario: 點擊即將過期道具格
- **WHEN** 用戶點擊有效期 ≤24h 的道具格
- **THEN** Buddy 對話泡泡顯示「這個快消失了！今天要用掉喔 ⏰」

#### Scenario: 點擊正常道具格
- **WHEN** 用戶點擊有效期 >24h 的道具格
- **THEN** Buddy 對話泡泡顯示「拖到我身上，記得今天就用掉喔！」

### Requirement: P1 道具格已過期視覺與互動
道具有效期到期後，P1 道具格 SHALL 呈現灰化過期狀態，禁止拖曳，並於 24h 後自動移除。

#### Scenario: 已過期卡片視覺
- **WHEN** 道具有效期已到期
- **THEN** 卡片灰化（`opacity: 0.4`）+ 名稱顯示刪除線 + 右上角顯示 ✕ icon（取代 ⏰ / ℹ️）

#### Scenario: 點擊已過期道具格
- **WHEN** 用戶點擊已過期道具格
- **THEN** Buddy 對話泡泡顯示「嗚… 這個不見了 😔」，不觸發任何操作

#### Scenario: 禁止拖曳已過期道具
- **WHEN** 用戶嘗試拖曳已過期道具格至 Buddy
- **THEN** 拖曳事件不觸發，視覺無回應

#### Scenario: 過期後 24h 自動移除
- **WHEN** 道具過期後已超過 24 小時
- **THEN** 該道具格從 P1 玩具箱 Sub-Tab 靜默移除，不顯示任何通知

### Requirement: 三態 icon 互斥規則
P1 道具格右上角 icon SHALL 依狀態互斥顯示，優先級為：✕ > ⏰ > ℹ️。

#### Scenario: icon 優先級
- **WHEN** 道具同時滿足多個狀態條件（如已過期）
- **THEN** 僅顯示最高優先級 icon（✕），不堆疊多個 icon
