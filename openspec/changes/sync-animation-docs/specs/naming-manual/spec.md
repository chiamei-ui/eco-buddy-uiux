## MODIFIED Requirements

### Requirement: 三大命名清單完整
NAMING.md SHALL 包含三個章節：

1. **Core Parameters**：hp_level / clean_level / mood_level，各含類型、值域、Low/Mid/High 三段規格
2. **Slot Booleans**：S1–S10 十個配件插槽 Boolean 名稱，含配件中文名與英文名；中文名稱須與 xlsx v1.0 完全一致；S2 須包含 FX3/S2 共存規則；S6 須包含 has_cycle_crown ↔ has_halo 自驅邏輯 (a)(b)(c)(d)
3. **Event Triggers**：22 個 ev\_ 事件，含動作群組、觸發時機、音效說明

#### Scenario: 命名清單涵蓋所有現行項目
- **WHEN** 對照 xlsx v1.0 驗收
- **THEN** NAMING.md 的三個清單與 xlsx 內容完全一致，無遺漏

#### Scenario: 配件插槽中文名稱對照 xlsx
- **WHEN** 對照 S1–S10 配件中文名稱
- **THEN** NAMING.md 與 xlsx 完全一致：S1 科技鎧甲、S2 彩虹光環、S3 月桂花環、S4 迪斯可燈球、S5 暗黑核心、S6 循環之冠、S7 暴食覆蓋層、S8 瘋狂點擊覆蓋層、S9 寶特瓶覆蓋層、S10 黃金覆蓋層

#### Scenario: S2 FX3/S6 共存規則可查
- **WHEN** 前端工程師查閱 S2 has_halo 規格
- **THEN** NAMING.md 含 FX3/S2 共存說明：#27 或 #36 期間 S2 取代 FX3 柔和白色光暈，不得雙層疊加

#### Scenario: S6 自驅邏輯可查
- **WHEN** 前端工程師查閱 S6 has_cycle_crown 規格
- **THEN** NAMING.md 含四條自驅邏輯：(a) Rive 自驅 has_halo；(b) 後端責任；(c) Override 優先順序；(d) 月底結算規則
