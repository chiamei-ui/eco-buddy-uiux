## 1. OpenSpec Artifacts

- [x] 1.1 建立 proposal/design/specs/tasks，定義工程影響 changelog 與 hi-fi 三尺寸切換。

## 2. 工程影響 Changelog 與 Hook

- [x] 2.1 新增 `docs/dev/ENGINEERING_CHANGELOG.md`，說明用途、scope 與自動紀錄格式。
- [x] 2.2 新增 `scripts/update-engineering-changelog.ps1`，依 staged files 判斷是否更新 changelog。
- [x] 2.3 新增 `.githooks/pre-commit` 呼叫 changelog script，並設定本機 `core.hooksPath`。

## 3. 前端交付文件

- [x] 3.1 更新 `docs/onboarding/FOR_FRONTEND.md`，補充 reference 讀法、localhost 驗證與 hook 啟用方式。

## 4. Hi-fi 三尺寸切換

- [x] 4.1 在 `reference/eco-buddy_hi-fi/app.jsx` 加入 viewport size tweak 狀態與三尺寸按鈕。
- [x] 4.2 在 `reference/eco-buddy_hi-fi/styles.css` 支援小、中、大 iPhone frame 尺寸。

## 5. 驗證

- [x] 5.1 執行 `openspec validate improve-engineer-handoff-and-hifi-viewport-tweaks --strict`。
- [x] 5.2 驗證 changelog hook script 在命中與未命中工程範圍時的行為。
- [x] 5.3 以本機 HTTP server 或 DOM 檢查確認三尺寸按鈕會改變 `.iphone` 尺寸。
