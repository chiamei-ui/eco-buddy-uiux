## Why

前端工程師已開始依 `reference/` 實作，但目前 hi-fi 原型缺少自動化工程影響紀錄，也缺少快速切換手機尺寸的驗收工具。需要把「設計調整是否會影響工程」記錄進 GitHub，並讓設計端在同一個 hi-fi 預覽入口檢查小、中、大手機尺寸。

## What Changes

- 新增工程影響 changelog，記錄會牽動前端實作的 reference、規格與設計交付變更。
- 新增 Git hook，當 staged files 命中工程師實作範圍時，自動更新並 stage 工程影響 changelog。
- 在 hi-fi 原型 tweaks 區新增三個手機尺寸切換按鈕，用於快速檢查 360、390、430 寬度下的畫面差異。
- 補充前端交付說明，讓工程師知道 `index.html` 是預覽入口，實作時仍需對照 `screens.jsx`、`components.jsx`、`styles.css` 與 `docs/` 規格。

## Capabilities

### New Capabilities
- `engineering-change-traceability`: 會影響工程實作的設計/reference/規格變更必須被記錄到工程影響 changelog。
- `hifi-viewport-review`: hi-fi 原型必須提供小、中、大三種手機尺寸切換，用於設計與前端共同驗收。

### Modified Capabilities
- `project-roadmap`: 前端交付入口需說明 `reference/` 的閱讀方式與 git hook 啟用方式。

## Impact

- 文件：`docs/dev/ENGINEERING_CHANGELOG.md`, `docs/onboarding/FOR_FRONTEND.md`
- 自動化：`.githooks/pre-commit`, `scripts/update-engineering-changelog.ps1`
- hi-fi：`reference/eco-buddy_hi-fi/app.jsx`, `reference/eco-buddy_hi-fi/styles.css`
- 本機設定：需設定 `git config core.hooksPath .githooks` 才會啟用 tracked hook。
