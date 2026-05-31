## Context

本 change 為純文件修正，無程式碼或架構異動。涉及三類問題：

1. **術語漂移**：CURRENT.md #23（2026-05-29）定案三維屬性新命名（體力/潔淨/心情），但多個文件仍使用舊名或中間版本
2. **文件缺口**：ANIMATION_LIST.md 人員欄空白、ANIMATION_BRIEF.md 聯絡資訊未填、CLAUDE.md 的 Architecture 未列新增的 NAMING.md / ROADMAP.md
3. **規格矛盾**：`specs/terminology-rename/spec.md` 的三維屬性 requirement 仍以舊命名（精神/清爽）定義，與 CURRENT.md 衝突

**利害關係人**：
- 窗口設計師（@idahsueh-cmd）：對接外包時使用 ANIMATION_BRIEF.md
- 前端（@shangchian）：以 CLAUDE.md 為工作規範
- 外包 Anastasiia：已簽試用合約（2026-05-27），目前 P1 進行中；技術參數名稱（`hp_level` 等）不受影響

## Goals / Non-Goals

**Goals:**
- 讓所有文件的三維屬性術語統一為 CURRENT.md #23 定案的「體力 / 潔淨 / 心情」
- 補齊 ANIMATION_LIST.md 人員欄（窗口設計師 + 外包動畫師）
- 修正 ANIMATION_BRIEF.md 的 `.rev` typo → `.riv`，填入業主聯絡資訊
- 更新 CLAUDE.md Architecture 補入 NAMING.md / ROADMAP.md
- 修正 `terminology-rename` spec，使其規格與 CURRENT.md 一致
- 補齊 docs/README.md 窗口設計師必讀欄

**Non-Goals:**
- 不修改 NAMING.md 的技術參數名稱（`hp_level` / `clean_level` / `mood_level` 保持原樣，#23 不影響 Rive 技術命名）
- 不填入 ANIMATION_BRIEF.md 的圖檔佔位符（IP 正稿 / 羊駝範例圖需要實際圖檔，超出本 change 範圍）
- 不改動 `specs/terminology-rename/` 以外的其他規格文件（其他規格的術語更新由個別 spec owner 負責）

## Decisions

**D1：術語更新範圍限於文件層，不碰技術命名**

NAMING.md 定義的 Rive 參數名稱（`hp_level` 等）是已簽合約的驗收基準（ROADMAP.md B-7），不在本 change 範圍內。UI 層文案用「體力」，技術層仍用 `hp_level`，兩者分層獨立。

**D2：ANIMATION_BRIEF.md 聯絡資訊填入窗口設計師**

Brief 是對外發案文件，業主窗口 = @idahsueh-cmd（Ida Hsueh / ida.hsueh@ecoco.xyz）。Anastasiia 已在試用合約中，此填入為補完歸檔用。

**D3：`terminology-rename` spec 採 MODIFIED 模式更新**

舊規格（精神/清爽）僅需在原 spec 中標記 MODIFIED，加入新命名的 requirement；禁用詞清單同步新增「精神」「清爽」（避免舊名殘留）。不建新 spec，維持單一 spec 的命名歷史。

## Risks / Trade-offs

- **[風險] Anastasiia 看到術語變更感到困惑** → 窗口設計師在下次溝通中口頭說明：Brief 文案用「體力」，但 Rive 技術參數 `hp_level` 名稱不變，工作無需調整
- **[風險] `terminology-rename` spec 改動影響已實作的 hi-fi** → 三維屬性 UI 標籤改名為「體力/潔淨」對前端而言是文字替換，非結構變動；影響面可控

## Open Questions

- ANIMATION_BRIEF.md 的圖檔佔位符（IP 正稿 / 羊駝範例圖）何時填入？→ 由窗口設計師在取得圖檔後另行更新，不 block 本 change
