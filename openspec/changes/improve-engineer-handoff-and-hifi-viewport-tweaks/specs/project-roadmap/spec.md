## ADDED Requirements

### Requirement: 前端交付入口需說明 reference 讀法
前端 onboarding 文件 SHALL 說明 `reference/eco-buddy_hi-fi/index.html` 是預覽入口，正式實作仍需對照 `screens.jsx`、`components.jsx`、`styles.css` 與 `docs/` 規格文件。

#### Scenario: 前端工程師下載 reference
- **WHEN** 前端工程師只拿到 `reference/`
- **THEN** onboarding 文件 SHALL 指引他回到 repo 規格文件確認正式文案、動態數值與 API 邊界

### Requirement: 前端交付入口需說明 hook 啟用方式
前端 onboarding 文件 SHALL 說明如何啟用 repo 內 tracked git hook，避免工程影響 changelog 沒有被自動更新。

#### Scenario: 新 clone repo
- **WHEN** 協作者新 clone repo
- **THEN** onboarding 文件 SHALL 提供 `git config core.hooksPath .githooks` 指令
