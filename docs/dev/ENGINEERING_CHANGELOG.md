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
<!-- engineering-change:abaf385480609089 -->
## 2026-07-13 14:25:39 +08:00

- Triggered scopes: PM decision
- Files:
  - `docs/decisions/CURRENT.md` (PM decision)

<!-- engineering-change:53267b5ba5077b77 -->
## 2026-07-09 15:36:04 +08:00

- Triggered scopes: design spec, hi-fi reference
- Files:
  - `docs/design/RESULT_SCREENS_MOTION_SPEC.md` (design spec)
  - `reference/eco-buddy_hi-fi/assets/p6/p6-title.svg` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/index.html` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/screens.jsx` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/styles.css` (hi-fi reference)

<!-- engineering-change:f421dc992b42ff55 -->
## 2026-07-08 09:14:27 +08:00

- Triggered scopes: hi-fi reference
- Files:
  - `reference/eco-buddy_hi-fi/app.jsx` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/components.jsx` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/dialogues.jsx` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/index.html` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/screens.jsx` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/styles.css` (hi-fi reference)

<!-- engineering-change:1618b684305c66e0 -->
## 2026-07-03 15:18:50 +08:00

- Triggered scopes: hi-fi reference
- Files:
  - `reference/eco-buddy_hi-fi/assets/p6/btn-info.svg` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/assets/p6/icon-mood.svg` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/assets/p6/title-group.svg` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/assets/p6/title-text.svg` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/assets/p6/toy1.png` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/index.html` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/screens.jsx` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/styles.css` (hi-fi reference)

<!-- engineering-change:702f4164494bcb8b -->
## 2026-07-03 14:17:54 +08:00

- Triggered scopes: hi-fi reference
- Files:
  - `reference/eco-buddy_hi-fi/assets/icon-src-mission.svg` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/assets/icon-src-recycle.svg` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/assets/icon-src-refill.svg` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/index.html` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/screens.jsx` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/styles.css` (hi-fi reference)

<!-- engineering-change:4841a3d0f1d8678d -->
## 2026-07-02 10:44:20 +08:00

- Triggered scopes: hi-fi reference
- Files:
  - `reference/eco-buddy_hi-fi/assets/btn/ads.svg` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/assets/btn/scan.svg` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/components.jsx` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/index.html` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/screens.jsx` (hi-fi reference)

<!-- engineering-change:1d5871b9dbeaa508 -->
## 2026-07-01 16:18:16 +08:00

- Triggered scopes: hi-fi reference
- Files:
  - `reference/eco-buddy_hi-fi/components.jsx` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/index.html` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/screens.jsx` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/screens-d2.jsx` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/styles.css` (hi-fi reference)

<!-- engineering-change:34821b69384328b9 -->
## 2026-07-01 16:12:33 +08:00

- Triggered scopes: hi-fi reference
- Files:
  - `reference/eco-buddy_hi-fi/app.jsx` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/components.jsx` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/index.html` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/screens.jsx` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/styles.css` (hi-fi reference)

<!-- engineering-change:cb55992205f3b6b1 -->
## 2026-06-30 10:06:47 +08:00

- Triggered scopes: design spec, engineering handoff, product flow, hi-fi reference
- Files:
  - `docs/design/COPY_DIFF_HIFI.md` (design spec)
  - `docs/design/COPY_TABLE.md` (design spec)
  - `docs/design/UI_SPEC.md` (design spec)
  - `docs/dev/FRONTEND_BACKEND_HANDOFF.md` (engineering handoff)
  - `docs/product/USER_FLOW.md` (product flow)
  - `reference/eco-buddy_hi-fi/app.jsx` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/index.html` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/screens.jsx` (hi-fi reference)

<!-- engineering-change:55c9274874e1e060 -->
## 2026-06-24 17:24:46 +08:00

- Triggered scopes: hi-fi reference
- Files:
  - `reference/eco-buddy_hi-fi/app.jsx` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/assets/p5-card-bg.svg` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/index.html` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/screens.jsx` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/styles.css` (hi-fi reference)

<!-- engineering-change:091ed510b604237d -->
## 2026-06-24 14:32:00 +08:00

- Triggered scopes: design spec, engineering handoff, product flow
- Files:
  - `docs/design/GAME_MECHANICS.md` (design spec)
  - `docs/design/UI_SPEC.md` (design spec)
  - `docs/dev/FRONTEND_BACKEND_HANDOFF.md` (engineering handoff)
  - `docs/product/USER_FLOW.md` (product flow)

<!-- engineering-change:sync-20260623-pm-decisions -->
## 2026-06-24 — sync-20260623-pm-decisions（#30–#35、#37 規格同步）

**變更類型**：規格文件同步（PM 決策 → 正式文件），不含 hi-fi 或程式碼。

### 前端受影響項目

| 項目 | 變更 | 關鍵規格 |
|------|------|---------|
| P1 角色資訊列 | 狀態名稱格式改為 `#N 狀態名稱`（如「#6 開心」） | `UI_SPEC.md` P1 佈局 #2 |
| P1 下週食物預告 | 只顯示食物種類，不顯示數量；資料來自後端 API（阻塞確認項）| `UI_SPEC.md` Buddy的餐袋 |
| P5 Header | 顯示個人化七日登入進度（非自然週），本月達標顯示派對動物 | `UI_SPEC.md` P5 |
| P5 補簽 CTA | 昨天未簽到時顯示免費「補簽昨天」，不顯示價格 | `UI_SPEC.md` P5 |
| P4 商店 IAP | 稀有食物 / 道具禮包的 `cashChannel` 改為 `'platform-iap'`（不走藍新） | `UI_SPEC.md` P4 商店雙軌制 |
| P4 IAP SKU | 稀有食物 / 道具禮包各款需獨立 SKU，CTA disabled until 平台審核通過 | `UI_SPEC.md` IAP SKU 清單 |
| 一般模式首頁 | 新增 Buddy 臉部懸浮入口（方向確認，設計細節待定） | `USER_FLOW.md` A2 |

### 後端受影響項目

| 項目 | 變更 | 關鍵規格 |
|------|------|---------|
| 簽到 API | 首次開啟 App 自動簽到；補昨天 API；回傳 `login_streak_progress` | `GAME_MECHANICS.md` §9 |
| `last_actual_app_open_at` | 補簽不得改寫此欄位；供 Rive #33 壞滅核心判定 | `GAME_MECHANICS.md` §9 |
| `has_disco` | 七日達標後鎖定至月底，進度重算不清除 | `GAME_MECHANICS.md` §9 |
| IAP entitlement | 擴充至稀有食物、道具禮包；訂單 `cashChannel` 記錄 `'platform-iap'` | `FRONTEND_BACKEND_HANDOFF.md` §7C |
| Phase 3 贈禮（預備） | acquisition_source 欄位設計；原子庫存轉移 API 規格 | `GAME_MECHANICS.md` §10、`FRONTEND_BACKEND_HANDOFF.md` §8A |
| 下週食物排程 API | 需確認欄位是否存在（阻塞確認項） | `UI_SPEC.md` Buddy的餐袋、`GAME_MECHANICS.md` §5 |

### 動畫受影響項目（待 @idahsueh-cmd 處理）

| 項目 | 變更 | 說明 |
|------|------|------|
| `CHARACTER_TYPES.md` #34 | 觸發條件：「連續 7 自然日」→「個人化七日循環」 | 已列入 GAME_MECHANICS.md §11 待辦 |
| `CHARACTER_TYPES.md` #34 | 補簽計入循環達標說明 | — |
| `CHARACTER_TYPES.md` has_disco | 月底保持規則補充 | — |
| `CHARACTER_TYPES.md` | has_disco / has_laurel / has_dark 獨立判定說明 | — |

### PM / 營運受影響項目

| 項目 | 說明 |
|------|------|
| CURRENT.md 同步 | 請 @andrewtainan 將 `meeting/2026-06-23-decisions-draft-for-pm.md` #30–#35、#37 補入 CURRENT.md |
| IAP SKU 清單 | 稀有食物 / 道具禮包各款 SKU ID 請 PM 確認後補入 `UI_SPEC.md` IAP SKU 清單 |
| 下週食物排程資料 | 確認後端排程欄位是否存在，填入 FRONTEND_BACKEND_HANDOFF.md §7A |
| #36 過期食物 | 仍為 ⏳ 待決，本次未寫入規格 |

- Triggered scopes: design, product, dev
- Files:
  - `docs/design/UI_SPEC.md` (design)
  - `docs/design/GAME_MECHANICS.md` (design)
  - `docs/product/USER_FLOW.md` (product)
  - `docs/dev/FRONTEND_BACKEND_HANDOFF.md` (dev)
  - `openspec/specs/partner-home-ui/spec.md`
  - `openspec/specs/daily-companion-ui/spec.md`
  - `openspec/specs/shop-package-tab/spec.md`
  - `openspec/specs/shop-dual-track-ui/spec.md`
  - `openspec/specs/continuous-login/spec.md` (new)
  - `openspec/specs/normal-home-buddy-entry/spec.md` (new)
  - `openspec/specs/user-gifting/spec.md` (new)
  - `openspec/specs/iap-product-release-governance/spec.md` (new)

<!-- engineering-change:2f589b5207986ab4 -->
## 2026-06-22 14:41:47 +08:00

- Triggered scopes: hi-fi reference
- Files:
  - `reference/eco-buddy_hi-fi/index.html` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/screens.jsx` (hi-fi reference)

<!-- engineering-change:c3e1c87181bc5a33 -->
## 2026-06-22 12:15:47 +08:00

- Triggered scopes: hi-fi reference
- Files:
  - `reference/eco-buddy_hi-fi/screens.jsx` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/styles.css` (hi-fi reference)

<!-- engineering-change:2f23361ec7b8f1a2 -->
## 2026-06-15 11:14:36 +08:00

- Triggered scopes: product flow
- Files:
  - `docs/product/STAT_DIALOGUE.md` (product flow)

<!-- engineering-change:c6760a380193f492 -->
## 2026-06-15 11:05:32 +08:00

- Triggered scopes: design spec, product flow, hi-fi reference
- Files:
  - `docs/design/COPY_TABLE.md` (design spec)
  - `docs/design/DESIGN_SYSTEM.md` (design spec)
  - `docs/design/UI_SPEC.md` (design spec)
  - `docs/product/FAQ.md` (product flow)
  - `docs/product/USER_FLOW.md` (product flow)
  - `reference/eco-buddy_hi-fi/app.jsx` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/dialogues.jsx` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/index.html` (hi-fi reference)
  - `reference/eco-buddy_hi-fi/screens.jsx` (hi-fi reference)

<!-- engineering-change:ded148cb931c8931 -->
## 2026-06-15 10:53:26 +08:00

- Triggered scopes: PM decision, design spec, engineering handoff
- Files:
  - `docs/decisions/CURRENT.md` (PM decision)
  - `docs/design/DESIGN_NOTES.md` (design spec)
  - `docs/design/DESIGN_SYSTEM.md` (design spec)
  - `docs/design/UI_SPEC.md` (design spec)
  - `docs/dev/FRONTEND_BACKEND_HANDOFF.md` (engineering handoff)

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






























