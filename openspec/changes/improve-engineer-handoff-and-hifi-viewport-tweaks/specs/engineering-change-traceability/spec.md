## ADDED Requirements

### Requirement: 工程影響變更需自動記錄
專案 SHALL 維護一份工程影響 changelog，當 commit 中包含會影響前端或後端實作判讀的 reference、規格、設計交付或動畫交付變更時，該 changelog MUST 自動新增一筆紀錄。

#### Scenario: Commit 命中工程實作範圍
- **WHEN** staged files 包含 `reference/eco-buddy_hi-fi/`、`docs/design/`、`docs/product/`、`docs/decisions/`、`docs/dev/`、`docs/onboarding/`、`docs/animation/`、`assets/` 或 `character/`
- **THEN** pre-commit hook SHALL 更新 `docs/dev/ENGINEERING_CHANGELOG.md` 並將該檔案加入 staged files

#### Scenario: Commit 未命中工程實作範圍
- **WHEN** staged files 只包含不影響工程實作的檔案
- **THEN** pre-commit hook SHALL NOT 更新工程影響 changelog

### Requirement: 工程影響紀錄需可被工程師閱讀
工程影響 changelog SHALL 以 Markdown 儲存在 repo 中，並且每筆自動紀錄 MUST 包含時間、觸發範圍與異動檔案清單。

#### Scenario: 工程師查看 GitHub
- **WHEN** 前端工程師在 GitHub 查看 `docs/dev/ENGINEERING_CHANGELOG.md`
- **THEN** 他 SHALL 能看到最近一次牽動實作範圍的檔案清單與 scope 分類
