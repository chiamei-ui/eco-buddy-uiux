## Context

NAMING.md 是 repo 內部工作版本，xlsx 是對外合約正本。兩者本應同步，但 NAMING.md 在建立時有 8 個配件中文名稱未與 xlsx 對齊，且 xlsx 後續新增的 S2/S6 細節規則未回補進 NAMING.md。ANIMATION_BRIEF.md 則有獨立的格式說明錯誤（`.riv`/`.rev` 混淆）。

修改對象：純文件（Markdown），無程式碼異動。

## Goals / Non-Goals

**Goals:**
- NAMING.md 所有中文名稱與 xlsx 完全一致
- S2/S6 插槽補入 xlsx 的完整細節規則
- ANIMATION_BRIEF.md 交付格式正確區分 `.rev`（原始編輯檔）與 `.riv`（Runtime 輸出）

**Non-Goals:**
- 不改動任何 Boolean 變數名、事件名（技術命名正確，不動）
- 不改動 xlsx 本身（需手動在 Excel 修正 `.rev` 拼寫，不在此 change 範圍）
- 不重構文件結構（ANIMATION_LIST / ROADMAP 的結構調整另開 change）

## Decisions

**以 xlsx 為唯一真實來源（Single Source of Truth）**
NAMING.md 是 xlsx 的 repo 鏡像版本。遇到衝突時，以 xlsx 為準更新 NAMING.md，不反向修改 xlsx（xlsx 要手動改，且 xlsx 有雙語格式，改動成本較高）。

**ANIMATION_BRIEF.md 交付格式改法**
原第 168 行只有一行，改為兩行：
- `.rev` 原始編輯檔（Rive Editor 可開啟，設計師交付）
- `.riv` Runtime 輸出檔（給前端工程師串接）

## Risks / Trade-offs

- [風險] Anastasiia 已收到舊版 BRIEF → 緩解：本次修正不影響任何技術規格，只修正說明文字；如有需要再通知她
- [風險] xlsx 的 `.rev` 拼寫錯誤仍存在 → 緩解：記錄為手動待辦，由窗口設計師自行開 Excel 修正第 2 條使用規則
