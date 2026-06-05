# 30 秒上手指南 — 給後端工程師

## 你的角色
你負責 API、資料庫、後台設定介面。前端 / 動畫呈現不歸你。

## 你要看的檔案（依重要度排序）

| 檔案 | 內容 | 為什麼重要 |
|------|------|-----------|
| `docs/design/GAME_MECHANICS.md` | **所有數值** | 你的 API 與後台都圍繞這些跑 |
| `docs/decisions/CURRENT.md` | PM 最新定案 | 決策變動會影響資料模型 |
| `docs/product/USER_FLOW.md` | 使用者流程 | 知道 API 在哪個流程被呼叫 |

**你絕對不用看**：`docs/design/UI_SPEC.md`（UI 細節）、`docs/animation/`、`reference/`。

## 關鍵：後台必須能設定的數值

`docs/design/GAME_MECHANICS.md` 第 6 節已明示：

> **道具 / 食物效果數值由後台設定，前端不寫死。**

請優先設計**可後台設定**的資料模型，至少包含：

- 各道具的三維數值效果（體力 / 潔淨 / 心情）
- 各食物的三維數值效果
- 每週配發的食物種類（行銷部手動排程）
- 回收物換算規則（雖然 #3 v2 已定案，但可能再調整）

## 怎麼操作（推薦：Cursor 或 Claude Code）

1. 裝 [Cursor](https://cursor.com) 或 [Claude Code](https://claude.ai/code)
2. clone repo：
   ```
   git clone https://github.com/chiamei-ui/eco-buddy-uiux.git
   ```
3. 叫 AI：「讀 docs/design/GAME_MECHANICS.md 與 docs/decisions/CURRENT.md，幫我設計 ECO Buddy 的資料模型與後台 API」

## commit / push 流程

- 改 code → AI commit 用 `[code]` 開頭
- 動到資料模型 / API 規格時，請額外更新 GAME_MECHANICS.md，並標明 API endpoint
- 不用開 PR，master 直接 push

## 你需要做的一次性設定

1. 把你的 GitHub username 告訴 `@chiamei-ui`，加進 Collaborators
2. 進 [repo 頁面](https://github.com/chiamei-ui/eco-buddy-uiux)
3. 右上角點 **Watch** → 選 **All Activity**

## 你跟前端的接口

- 前端透過 API 拿數值（不 hardcode）
- 後台管理介面由你做（哪位行銷 / PM 可登入要先確認）
- 推播通知系統（USER_FLOW.md A 節有定義觸發條件）由你串接

## 遇到不確定的事

LINE 標 `@chiamei-ui`（UI/UX）或 `@andrewtainan`（PM）。
看到 `[pm]` commit 時，務必點進去看，避免做完才發現決策變了。

---

## 任務清單在哪裡

開發待辦已統一移到 `docs/dev/FRONTEND_BACKEND_HANDOFF.md`。

這份 onboarding 只作為 30 秒上手導覽；實際任務、負責角色與對應規格請看 dev 文件。
