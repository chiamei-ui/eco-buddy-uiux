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
<!-- engineering-change:2b56fa7200ae17c5 -->
## 2026-06-12 14:30:10 +08:00

- Triggered scopes: hi-fi reference
- Files:
  - `reference/eco-buddy_hi-fi/index.html` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/screens.jsx` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/styles.css` (hi-fi reference)

<!-- engineering-change:64cfc2754cb14f4a -->
## 2026-06-10 16:12:47 +08:00

- Triggered scopes: hi-fi reference
- Files:
  - `reference/eco-buddy_hi-fi/assets/p12-title.svg` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/assets/p2b-title.svg` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/styles.css` (hi-fi reference)

<!-- engineering-change:6096d99a62db6568 -->
## 2026-06-10 11:13:07 +08:00

- Triggered scopes: product flow
- Files:
  - `docs/product/USER_FLOW.md` (product flow)

<!-- engineering-change:927921a323c8148f -->
## 2026-06-10 11:02:05 +08:00

- Triggered scopes: hi-fi reference
- Files:
  - `reference/eco-buddy_hi-fi/index.html` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/styles.css` (hi-fi reference)

<!-- engineering-change:8b49b546c21c20f5 -->
## 2026-06-10 10:47:26 +08:00

- Triggered scopes: hi-fi reference
- Files:
  - `reference/eco-buddy_hi-fi/app.jsx` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/index.html` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/screens.jsx` (hi-fi reference)

<!-- engineering-change:7d5362b4a51ebae1 -->
## 2026-06-10 10:39:01 +08:00

- Triggered scopes: design spec, hi-fi reference
- Files:
  - `docs/design/UI_SPEC.md` (design spec)
  - `reference/eco-buddy_hi-fi/app.jsx` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/index.html` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/screens.jsx` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/styles.css` (hi-fi reference)

<!-- engineering-change:36c45ea36a2032e7 -->
## 2026-06-09 15:52:54 +08:00

- Triggered scopes: design spec, hi-fi reference
- Files:
  - `docs/design/GAME_MECHANICS.md` (design spec)
  - `docs/design/UI_SPEC.md` (design spec)
  - `reference/eco-buddy_hi-fi/screens.jsx` (hi-fi reference)

<!-- engineering-change:1ec61537f7573dca -->
## 2026-06-09 15:40:57 +08:00

- Triggered scopes: hi-fi reference
- Files:
  - `reference/eco-buddy_hi-fi/screens.jsx` (hi-fi reference)

<!-- engineering-change:1bf571e0e353ec2c -->
## 2026-06-09 15:39:00 +08:00

- Triggered scopes: hi-fi reference
- Files:
  - `reference/eco-buddy_hi-fi/assets/icon-clean.svg` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/assets/icon-hp.svg` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/assets/icon-mood.svg` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/index.html` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/screens.jsx` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/screens-d2.jsx` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/styles.css` (hi-fi reference)

<!-- engineering-change:b231d8f6e1e7aad0 -->
## 2026-06-09 15:07:50 +08:00

- Triggered scopes: hi-fi reference
- Files:
  - `reference/eco-buddy_hi-fi/styles.css` (hi-fi reference)

<!-- engineering-change:f1d907a695a37bcf -->
## 2026-06-09 14:51:27 +08:00

- Triggered scopes: hi-fi reference
- Files:
  - `reference/eco-buddy_hi-fi/assets/p12-title.svg` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/assets/p2b-title.svg` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/index.html` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/screens.jsx` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/screens-d2.jsx` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/styles.css` (hi-fi reference)

<!-- engineering-change:d47ebb979a080452 -->
## 2026-06-09 14:40:50 +08:00

- Triggered scopes: design spec, product flow
- Files:
  - `docs/design/GAME_MECHANICS.md` (design spec)
  - `docs/design/UI_SPEC.md` (design spec)
  - `docs/product/USER_FLOW.md` (product flow)

<!-- engineering-change:f4fd19027af4e51f -->
## 2026-06-08 17:46:15 +08:00

- Triggered scopes: handoff automation, onboarding handoff, hi-fi reference
- Files:
  - `.githooks/pre-commit` (handoff automation)
  - `docs/onboarding/FOR_FRONTEND.md` (onboarding handoff)
  - `reference/eco-buddy_hi-fi/app.jsx` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/styles.css` (hi-fi reference)
  - `scripts/update-engineering-changelog.ps1` (handoff automation)














