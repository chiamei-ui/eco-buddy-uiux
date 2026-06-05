## MODIFIED Requirements

### Requirement: P1 道具格時效視覺狀態
P1 玩具箱 Sub-Tab 的道具格 SHALL 依有效期剩餘時間呈現三種視覺狀態：正常、即將過期（≤`[API: tool_warn_threshold_hours]` 小時，預設參考值 24h）、已過期。有效期閾值 SHALL 來自 API，前端 SHALL NOT hardcode 數字 24。永久類道具不顯示任何時效 icon。

#### Scenario: 正常狀態（有效期 > 警告閾值）
- **WHEN** 道具有效期剩餘 > `[API: tool_warn_threshold_hours]`（或為永久類）
- **THEN** 卡片右上角不顯示任何時效 icon，僅顯示 ℹ️ icon

#### Scenario: 即將過期（有效期 ≤ 警告閾值）
- **WHEN** 道具有效期剩餘 ≤ `[API: tool_warn_threshold_hours]` 且 >0
- **THEN** 卡片右上角顯示橘色 ⏰ icon（取代 ℹ️ 位置），卡片本體無其他視覺變化

#### Scenario: 點擊即將過期道具格
- **WHEN** 用戶點擊有效期 ≤ `[API: tool_warn_threshold_hours]` 的道具格
- **THEN** Buddy 對話泡泡顯示「這個快消失了！今天要用掉喔 ⏰」

#### Scenario: 點擊正常道具格
- **WHEN** 用戶點擊有效期 > `[API: tool_warn_threshold_hours]` 的道具格
- **THEN** Buddy 對話泡泡顯示「拖到我身上，記得今天就用掉喔！」

### Requirement: 道具有效期來源
道具有效期數值（免費道具 N 小時、付費道具 N 日）SHALL 從 API 欄位讀取，前端不得 hardcode「24 小時」或「7 日」等具體數字。

#### Scenario: 免費道具有效期
- **WHEN** 廣告開箱獲得免費道具後存入玩具箱
- **THEN** 有效期倒數起始值 SHALL 讀取 `[API: tool_free_expire_hours]`，不寫死 24

#### Scenario: 付費道具有效期
- **WHEN** 商店購買付費道具後存入玩具箱
- **THEN** 有效期倒數起始值 SHALL 讀取 `[API: tool_paid_expire_days]`，不寫死 7
