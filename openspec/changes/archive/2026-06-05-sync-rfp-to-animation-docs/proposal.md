## Why

完整 RFP（`ecoco-private/specs/ECOCO_RFP_EcoBuddy_v1_0_20260515.docx`）涵蓋 Phase 1–4 全部規格，但 `docs/animation/` 目前只完整記錄 Phase 1 範圍；Phase 2–4 的型態規格、動作事件、粒子效果、月度交付規格完全缺漏。正式合約（Phase 2–4）即將啟動，前端工程師與外包動畫師需要可直接對應的文件依據，否則協作無法對齊。

## What Changes

- **新增** `docs/animation/CHARACTER_TYPES.md` — 36 種型態完整規格（27 基礎 + 9 特殊隱藏）、`has_halo` / `has_cycle_crown` 連動邏輯
- **新增** `docs/animation/MONTHLY_SPEC.md` — 月度合約逐月交付素材規格、月度循環骨架相容性約束（RFP §2.3、§11）
- **更新** `docs/animation/ANIMATION_BRIEF.md` — 補入 10 大動作事件詳細規格（RFP §6.2）、完整壓力測試規格（RFP §8.2）、音效格式與商業授權要求（RFP §7）、驗收表 C/D/E 組（附件）
- **更新** `docs/animation/ANIMATION_LIST.md` — 補入 Phase 2–4 交付物清單、粒子效果 FX1–FX7 規格（RFP §9.1）
- **更新** `docs/animation/NAMING.md` — 補入 S2/S6 插槽四條責任規則連動邏輯（RFP §5）

## Capabilities

### New Capabilities

- `character-types`: 36 種 Buddy 型態完整規格，含解鎖條件、has_halo/has_cycle_crown 連動規則；外包動畫師與前端串接的共同依據
- `monthly-delivery-spec`: 月度合約每月交付素材項目表與骨架相容性約束；月度循環合約開始前的設計對齊基礎

### Modified Capabilities

- `naming-manual`: 補入 S2/S6 插槽連動邏輯四條責任規則（Rive 自驅 vs 後端責任 vs override 優先順序 vs 月底重置）

## Impact

- 影響範圍：`docs/animation/`（窗口設計師 write domain）
- 不影響：`docs/design/`、`docs/decisions/`、`docs/product/`、任何程式碼
- 依賴：需讀取 `ecoco-private/specs/ECOCO_RFP_EcoBuddy_v1_0_20260515.docx` 作為唯一資料來源
- 前置條件：無（可立即執行）
