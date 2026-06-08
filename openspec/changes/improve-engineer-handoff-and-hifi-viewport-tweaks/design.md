## Context

目前設計端主要透過 `reference/eco-buddy_hi-fi/index.html` 驗證畫面，前端工程師則已下載 `reference/` 開始實作。這種方式可以快速對齊視覺，但有兩個缺口：

- `reference/` 的更新不一定會明確告知哪些變更會影響前端實作。
- hi-fi 原型固定在 390 x 844 手機框，設計端無法在同一入口快速檢查小尺寸與大尺寸的版面差異。

## Goals / Non-Goals

**Goals:**
- 讓工程影響變更自動留下 GitHub 可追蹤紀錄。
- 讓設計端在 hi-fi tweaks 內一鍵切換 360 / 390 / 430 三種手機尺寸。
- 保持原本 `index.html` 驗證流程，不要求前端改變實作技術棧。

**Non-Goals:**
- 不把 hi-fi 原型改成完整 responsive app。
- 不定義正式前端 app 的 RWD implementation。
- 不把 mock data、demo 機率或 demo 價格視為正式 API 規格。

## Decisions

1. 使用 tracked `.githooks/pre-commit` 加 PowerShell script 產生 changelog。
   - 理由：Git hooks 本身不會跟著 repo 自動安裝，但 tracked `.githooks` 可進 GitHub，搭配 `core.hooksPath` 後團隊可共用。
   - 替代方案：只用人工填 changelog。缺點是容易漏記，尤其 reference 小改動很多。

2. changelog 放在 `docs/dev/ENGINEERING_CHANGELOG.md`。
   - 理由：這份紀錄是設計與前端交接用，不是產品給使用者看的 release note。
   - 替代方案：放根目錄 `CHANGELOG.md`。缺點是容易和正式產品版本紀錄混淆。

3. 尺寸切換只改外層 iPhone frame，不改頁面內部 layout 邏輯。
   - 理由：這次目標是快速驗收差異，而不是替正式 app 寫 RWD。
   - 替代方案：全面把 prototype 改成 responsive。風險較高，會牽動大量既有固定定位與 demo 互動。

## Risks / Trade-offs

- [Risk] Git hook 不會自動在所有 clone 中啟用 → Mitigation：文件明確要求執行 `git config core.hooksPath .githooks`，本次也會在目前 checkout 設定。
- [Risk] hook 只能在 commit 前更新，無法在每次存檔時更新 → Mitigation：GitHub 需要的是 commit 內的可追蹤紀錄，pre-commit 是最穩定的低維護成本選擇。
- [Risk] 小尺寸只改外框可能暴露既有 overflow 問題 → Mitigation：這正是此工具要提早發現的差異；不在本 change 中強行修所有畫面。
