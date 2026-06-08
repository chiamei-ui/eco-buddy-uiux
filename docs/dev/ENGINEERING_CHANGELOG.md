# Engineering Impact Changelog

這份文件記錄會影響前端或後端實作判讀的設計、reference、規格與素材變更。

用途：
- 讓前端工程師不用每次重新比對整包 `reference/`。
- 讓設計端每次調整 hi-fi 或規格時，GitHub 內都有可追蹤紀錄。
- 區分「畫面預覽變更」與「正式實作規則變更」。

自動更新：
- 啟用 hook：`git config core.hooksPath .githooks`
- commit 前若 staged files 命中工程範圍，`.githooks/pre-commit` 會自動補一筆紀錄。
- changelog 本身會被自動加入 staged files。

工程範圍：
- `reference/eco-buddy_hi-fi/`
- `docs/design/`
- `docs/product/`
- `docs/decisions/`
- `docs/dev/`
- `docs/onboarding/`
- `docs/animation/`
- `assets/`
- `character/`
- `.githooks/pre-commit`
- `scripts/update-engineering-changelog.ps1`

<!-- AUTO-ENTRIES -->
<!-- engineering-change:f4fd19027af4e51f -->
## 2026-06-08 17:46:15 +08:00

- Triggered scopes: handoff automation, onboarding handoff, hi-fi reference
- Files:
  - `.githooks/pre-commit` (handoff automation)
  - `docs/onboarding/FOR_FRONTEND.md` (onboarding handoff)
  - `reference/eco-buddy_hi-fi/app.jsx` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/styles.css` (hi-fi reference)
  - `scripts/update-engineering-changelog.ps1` (handoff automation)


