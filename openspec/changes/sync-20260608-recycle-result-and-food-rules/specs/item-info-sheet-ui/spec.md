## MODIFIED Requirements

### Requirement: ℹ️ 點擊彈出 Bottom Sheet
點擊 ℹ️ icon SHALL 彈出 Bottom Sheet 顯示該品項的完整效果值資訊，不觸發拖曳。食物效果 SHALL 顯示為「每次餵食體力 +1~5（由系統決定）」或後端回傳的等價區間/說明；前端不得 hardcode 固定 +10/+15。

**MODIFIED**：2026-06-08 決策將同一食物的餵食效果改為每次 +1~5 random。

#### Scenario: 點擊食物格 ℹ️
- **WHEN** 用戶點擊食物格 ℹ️ icon
- **THEN** 底部 Sheet 顯示：食物大圖、食物名稱、效果值範圍（體力 +1~5 或 `[API: food_hp_random_range]`）、上限/存量資訊

#### Scenario: 點擊道具格 ℹ️
- **WHEN** 用戶點擊道具格 ℹ️ icon
- **THEN** 底部 Sheet 顯示：道具大圖、道具名稱、效果值組合（各屬性 +`[API: tool_<stat>_effect]`）、有效期資訊（免費 `[API: tool_free_expire_hours]`h / 付費 `[API: tool_paid_expire_days]` 日 / 永久）

#### Scenario: ℹ️ 點擊不觸發拖曳
- **WHEN** 用戶點擊 ℹ️ icon
- **THEN** 僅彈出 Bottom Sheet，不觸發格子的拖曳起始事件

#### Scenario: Sheet 關閉
- **WHEN** 用戶點擊 Sheet 外區域或下滑關閉
- **THEN** Bottom Sheet 收起，回到 P1 正常狀態
