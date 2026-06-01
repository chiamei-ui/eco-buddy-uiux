# Claude Code 角色權限範本

每個角色把對應的 `settings.local.json` 複製到自己 clone 下來的 repo：

```
.claude/settings.local.json
```

此檔**不進 git**（已在 `.gitignore`），只在你本機生效。內容是「禁止 AI 編輯不屬於你的目錄」。

## 角色對應

| 角色 | GitHub | 範本 | 可編輯目錄 |
|------|--------|------|-----------|
| PM | @andrewtainan | [pm.json](pm.json) | `docs/decisions/`、`docs/briefs/`、`docs/product/` |
| UI/UX 設計師 | @chiamei-ui | [uiux.json](uiux.json) | `docs/design/`、`docs/product/`、`openspec/`、根目錄文件 |
| 窗口設計師 | @idahsueh-cmd | [liaison.json](liaison.json) | `docs/animation/`、`assets/animations/` |
| 前端工程師 | @shangchian | [frontend.json](frontend.json) | 程式碼路徑（待加）；`docs/` 全唯讀 |
| 後端工程師 | （待加入） | [backend.json](backend.json) | 程式碼路徑（待加）；`docs/` 全唯讀 |

## 使用方式

1. 找到你的角色範本
2. 複製內容到 repo 根目錄的 `.claude/settings.local.json`（沒有就新建）
3. 重啟 Claude Code

## 共用禁區（所有角色）

`archive/`、`character/`、`reference/`、`assets/`（除自己負責的子目錄）為唯讀，已寫在共用層 `.claude/settings.json`，不必重複寫。

## 對應 PR 層

本地擋是禮貌（避免 AI 誤改），PR 層由 [.github/CODEOWNERS](../../../.github/CODEOWNERS) 把關（必須對應 owner approve 才能 merge）。兩層一起用。

## 其他 AI 工具

- Cursor：`.cursorignore`
- Codex CLI：`.codexignore`
- Gemini CLI：`.geminiignore`

格式略有不同，但概念一致：把別人的目錄列為禁區。範本暫未提供，需要時再補。
