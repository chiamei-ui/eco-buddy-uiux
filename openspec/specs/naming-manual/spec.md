## ADDED Requirements

### Requirement: NAMING.md 存在於 docs/animation/
`docs/animation/NAMING.md` SHALL 存在，內容完整對應 `ecoco-private/naming/ECOCO_naming_manual_v1_0_bilingual.xlsx` v1.0，包含核心參數、Slot Boolean、Event Trigger 三個命名清單。

#### Scenario: 前端查閱命名規格
- **WHEN** 前端工程師（@shangchian）查閱 Rive 串接命名
- **THEN** 可直接在 `docs/animation/NAMING.md` 找到完整命名清單，無需開啟 xlsx

#### Scenario: git diff 追蹤命名異動
- **WHEN** NAMING.md 有任何欄位被修改並 commit
- **THEN** git diff 可清楚顯示新增或移除的命名項目

---

### Requirement: 文件頂部標示 Owner 與版本協議
NAMING.md 頂部 SHALL 包含：目前版本號、Owner（窗口設計師主寫 / 前端確認技術格式）、版本升版協議（patch / minor / major 三級規則）。

#### Scenario: 版本升版流程清楚可查
- **WHEN** 任何人需要新增一個 Rive event 名稱
- **THEN** NAMING.md 頂部即可查到：需要 commit `[anim]`、書面通知 Anastasiia、等書面確認後方可升版

---

### Requirement: 三大命名清單完整
NAMING.md SHALL 包含三個章節：

1. **Core Parameters**：hp_level / clean_level / mood_level，各含類型、值域、Low/Mid/High 三段規格
2. **Slot Booleans**：S1–S10 十個配件插槽 Boolean 名稱，含配件中文名與英文名
3. **Event Triggers**：22 個 ev\_ 事件，含動作群組、觸發時機、音效說明

#### Scenario: 命名清單涵蓋所有現行項目
- **WHEN** 對照 xlsx v1.0 驗收
- **THEN** NAMING.md 的三個清單與 xlsx 內容完全一致，無遺漏
