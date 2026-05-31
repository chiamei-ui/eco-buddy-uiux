## Why

CURRENT.md #23（2026-05-29）已定案將三維屬性從「精神 / 清爽 / 心情」更名為「體力 / 潔淨 / 心情」，但 `docs/animation/` 內的動畫文件、`CLAUDE.md`、`docs/README.md` 均未同步；`specs/terminology-rename/spec.md` 仍以舊命名為規格基準。此外 ANIMATION_BRIEF.md 存在 Rive 副檔名拼寫錯誤（`.rev` → `.riv`）、人員欄空白、聯絡資訊未填等維護缺口。本 change 將上述問題一次收攏，確保合約進行中的 Phase 1 Rive 動畫外包對接不受文件矛盾影響。

## What Changes

- `docs/animation/ANIMATION_BRIEF.md`
  - 全文「HP」改為「體力」（9 個狀態定義 + 正文 1 處，共約 10 處）
  - 全文副檔名 `.rev` 改為 `.riv`（3 處）
  - 業主窗口聯絡資訊填入：Ida Hsueh / ida.hsueh@ecoco.xyz
- `docs/animation/ANIMATION_LIST.md`
  - 窗口設計師填入 @idahsueh-cmd
  - 外包動畫師填入 Anastasiia（試用合約 2026-05-27 已簽）
- `CLAUDE.md`
  - Project Overview：精神／清爽 → 體力／潔淨
  - Design System 文案規則：HP→精神 / 潔淨度→清爽 → HP→體力 / 潔淨度→潔淨
  - 文案轉換規則表格：同步更新
  - Architecture：`docs/animation/` 節點補入 `NAMING.md` 與 `ROADMAP.md`
- `docs/README.md`
  - 窗口設計師必讀欄補入 `NAMING.md` → `ROADMAP.md`
- `openspec/specs/terminology-rename/spec.md`
  - **MODIFIED**：三維屬性對外文案規格從「精神 / 清爽 / 心情」更新為「體力 / 潔淨 / 心情」（依 CURRENT.md #23）

## Capabilities

### New Capabilities
<!-- 無新 capability -->

### Modified Capabilities
- `terminology-rename`：三維屬性用語規格從舊命名（精神/清爽/心情）更新為 #23 定案命名（體力/潔淨/心情）；同步更新禁用詞列表

## Impact

- 受影響文件：`docs/animation/ANIMATION_BRIEF.md`、`docs/animation/ANIMATION_LIST.md`、`CLAUDE.md`、`docs/README.md`、`openspec/specs/terminology-rename/spec.md`
- 無程式碼異動、無 API 異動
- 外包 Anastasiia 需在下次溝通時口頭告知：Brief 內 HP 已更名體力、副檔名為 `.riv`（實際工作影響極低，因 NAMING.md 技術參數名稱 `hp_level` 不變）
