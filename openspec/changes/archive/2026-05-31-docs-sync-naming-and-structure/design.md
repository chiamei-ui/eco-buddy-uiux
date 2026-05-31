## Context

命名手冊（`ECOCO_naming_manual_v1_0_bilingual.xlsx`）是 ECO Buddy Rive 動畫系統的合約級規格文件，定義了 Rive 動畫師（Anastasiia）與前端工程師（@shangchian）之間的命名契約。目前此文件：

- 僅以 xlsx 形式存於 `ecoco-private/naming/`，無法在 git 中追蹤差異
- 無明確 Owner 與版本更動協議
- 前端工程師日常查閱需開 Excel

專案也缺少對所有成員可見的階段說明，新人加入無法快速判斷現在做到哪個 phase。

## Goals / Non-Goals

**Goals:**
- 建立可 git diff 的 NAMING.md，內容完全對應 xlsx v1.0
- 明確命名 Owner（窗口設計師主寫，前端確認技術格式）與版本升版協議
- 建立 ROADMAP.md 讓成員了解 P0B → P1 → 正式合約三個節點
- 補齊 README 的協作者資訊（@shangchian、Anastasiia 試作狀態）

**Non-Goals:**
- 不修改 xlsx 本身（維持為對外正式版）
- 不更動任何程式碼、不影響 Rive 動畫規格本身
- 不建立新的權限系統（ecoco-private 維持現有存取方式）

## Decisions

**① NAMING.md 放 `docs/design/`，不放 `ecoco-private/`**

理由：`docs/design/` 是 repo 成員日常查閱的設計規範區，與 DESIGN_SYSTEM.md、UI_SPEC.md 同層，易於被引用。xlsx 繼續保留於 `ecoco-private/` 作為對外發送的正式版本。

**② 版本升版協議寫入 NAMING.md 頂部**

任何版本異動需：版本號升、commit `[anim]`、書面通知 Anastasiia（由窗口設計師執行）。

| 類型 | 觸發條件 | 對外動作 |
|------|---------|---------|
| patch | 說明文字修正 | 不需通知外包 |
| minor | 新增 slot / event | 書面通知 Anastasiia + 等書面確認 |
| major | 骨架架構變動 | 視同合約異動，需重新議定 |

**③ ROADMAP.md 放 `docs/product/`**

ROADMAP 屬於產品層，與 USER_FLOW.md 同層。內容維持精簡：三個節點 + 每個節點的交付範疇 + 現況標記。

## Risks / Trade-offs

- xlsx 與 NAMING.md 可能不同步 → 每次更動 xlsx 時需同步更新 NAMING.md（由 Owner 負責）
- ROADMAP.md 若未即時更新會造成誤導 → 寫明「本文件由 PM 維護，不定期更新」作為免責說明

## Open Questions

- README 的協作者欄位：要不要列外包（Anastasiia）？她不在 repo，但屬於協作方。→ 建議列，標注「外包，不進 repo」
