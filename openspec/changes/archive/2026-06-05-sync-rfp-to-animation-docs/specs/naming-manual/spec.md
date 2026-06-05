## MODIFIED Requirements

### Requirement: 三大命名清單完整
NAMING.md SHALL 包含四個章節：

1. **Core Parameters**：hp_level / clean_level / mood_level，各含類型、值域、Low/Mid/High 三段規格
2. **Slot Booleans**：S1–S10 十個配件插槽 Boolean 名稱，含配件中文名、英文名，以及 S2 / S6 的連動責任規則
3. **Event Triggers**：22 個 ev\_ 事件，含動作群組、觸發時機、音效說明
4. **插槽連動責任規則（S2 / S6 專項）**：S2 FX3 共存規則、S6 Rive 自驅邏輯四條責任劃分（(a)(b)(c)(d)）

#### Scenario: 前端查閱命名規格
- **WHEN** 前端工程師（@shangchian）查閱 Rive 串接命名
- **THEN** 可直接在 `docs/animation/NAMING.md` 找到完整命名清單，無需開啟 xlsx

#### Scenario: git diff 追蹤命名異動
- **WHEN** NAMING.md 有任何欄位被修改並 commit
- **THEN** git diff 可清楚顯示新增或移除的命名項目

#### Scenario: 前端實作 S6 插槽邏輯
- **WHEN** 前端工程師實作 S6（循環王冠）插槽的顯示邏輯
- **THEN** NAMING.md §S6 連動責任規則清楚標示哪些行為由 Rive 自驅、哪些需後端設值，四條規則 (a)(b)(c)(d) 各自列明
