## ADDED Requirements

### Requirement: 食物格與道具格 ℹ️ icon
P1 食物欄與玩具箱 Sub-Tab 的卡片 SHALL 在右上角顯示 ℹ️ icon（道具格優先顯示 ⏰ / ✕ 時，ℹ️ 隱藏），卡片本體移除效果值文字。

#### Scenario: 食物格 ℹ️ icon 顯示
- **WHEN** P1 食物欄載入
- **THEN** 每個食物格右上角顯示 ℹ️ icon，卡片本體僅顯示食物圖示 + 名稱 + 庫存 Badge，不顯示效果值文字

#### Scenario: 道具格 ℹ️ icon 顯示（正常狀態）
- **WHEN** 道具格有效期 >24h（或為永久類）
- **THEN** 道具格右上角顯示 ℹ️ icon

#### Scenario: 道具格時效優先（ℹ️ 隱藏）
- **WHEN** 道具格有效期 ≤24h 或已過期
- **THEN** 右上角顯示 ⏰ 或 ✕，ℹ️ icon 不顯示

### Requirement: ℹ️ 點擊彈出 Bottom Sheet
點擊 ℹ️ icon SHALL 彈出 Bottom Sheet 顯示該品項的完整效果值資訊，不觸發拖曳。效果值 SHALL 從 API 讀取，前端不得 hardcode 任何具體數字。

#### Scenario: 點擊食物格 ℹ️
- **WHEN** 用戶點擊食物格 ℹ️ icon
- **THEN** 底部 Sheet 顯示：食物大圖、食物名稱、效果值（體力 +`[API: food_hp_effect]`）、週配額資訊（剩餘數量 / 上限 `[API: food_weekly_quota]`）

#### Scenario: 點擊道具格 ℹ️
- **WHEN** 用戶點擊道具格 ℹ️ icon
- **THEN** 底部 Sheet 顯示：道具大圖、道具名稱、效果值組合（各屬性 +`[API: tool_<stat>_effect]`）、有效期資訊（免費 `[API: tool_free_expire_hours]`h / 付費 `[API: tool_paid_expire_days]` 日 / 永久）

#### Scenario: ℹ️ 點擊不觸發拖曳
- **WHEN** 用戶點擊 ℹ️ icon
- **THEN** 僅彈出 Bottom Sheet，不觸發格子的拖曳起始事件

#### Scenario: Sheet 關閉
- **WHEN** 用戶點擊 Sheet 外區域或下滑關閉
- **THEN** Bottom Sheet 收起，回到 P1 正常狀態

### Requirement: Bottom Sheet 效果值數值來源
Bottom Sheet 效果值 SHALL 從後端 API response 動態帶入，前端不得 hardcode 任何數值。

#### Scenario: API 欄位對照
- **WHEN** Bottom Sheet 渲染道具效果值
- **THEN** SHALL 讀取以下 API 欄位（各道具獨立設定）：
  - 逗貓棒：`tool_cat_wand_mood_effect`
  - 小球：`tool_ball_mood_effect`
  - 梳子：`tool_brush_clean_effect`、`tool_brush_mood_effect`
  - 零食：`tool_snack_hp_effect`、`tool_snack_mood_effect`

#### Scenario: 效果值更新自動反映
- **WHEN** 後台更新某道具的效果值
- **THEN** Bottom Sheet 顯示的數值 SHALL 在下次 API 請求後自動更新，不需前端發版
