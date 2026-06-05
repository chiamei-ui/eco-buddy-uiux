## Why

`docs/animation/NAMING.md` 與 `ecoco-private/naming/ECOCO_naming_manual_v1_0_bilingual.xlsx` 是同一份規範的兩個版本，但對比後發現有 8 個配件中文名稱不一致、2 個插槽缺少關鍵細節、且 `ANIMATION_BRIEF.md` 的交付格式說明有錯誤（`.riv` 誤稱為原始檔）。xlsx 是對外合約依據，NAMING.md 是 repo 工作版本，兩者不同步會造成驗收爭議。

## What Changes

- **NAMING.md** — 更新 S1–S9 共 8 個配件中文名稱，對齊 xlsx 正本
- **NAMING.md** — 補充 S2（`has_halo`）FX3/S2 共存規則
- **NAMING.md** — 補充 S6（`has_cycle_crown`）與 `has_halo` 自驅邏輯 (a)(b)(c)(d)
- **ANIMATION_BRIEF.md** — 修正第 168 行：將 `.riv` 原始檔說明改為 `.rev`（原始編輯檔）+ `.riv`（Runtime 輸出，給前端）

## Capabilities

### New Capabilities

無

### Modified Capabilities

- `naming-manual`：配件插槽中文名稱更正、S2/S6 補充細節規則

## Impact

- `docs/animation/NAMING.md`：內容更新（不影響技術命名，Boolean 變數名與事件名均不變）
- `docs/animation/ANIMATION_BRIEF.md`：第 168 行交付格式說明修正
- 對外影響：修正後與 xlsx 合約版本一致，Anastasiia 驗收依據更清楚
