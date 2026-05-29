# 30 秒上手指南 — 給前端工程師（@shangchian）

## 你的角色
你拿 PM × 設計師的成果做實作。文件已經幫你整理好，不用問「要看哪份」。

## 你要看的檔案（依重要度排序）

| 檔案 | 內容 | 什麼時候看 |
|------|------|----------|
| `docs/design/DESIGN_SYSTEM.md` | 色彩、字體、按鈕、卡片規範 | 寫 component 前 |
| `docs/design/UI_SPEC.md` | 各頁面詳細規格（P1–P12） | 實作頁面時 |
| `docs/design/GAME_MECHANICS.md` | 所有數值（換算、衰減、道具效果） | 寫遊戲邏輯時 |
| `docs/product/USER_FLOW.md` | 使用者流程圖 | 不確定流程時 |
| `docs/decisions/CURRENT.md` | PM 最新定案 | 收到 `[pm]` commit 通知時 |

**你絕對不用看**：`docs/archive/`、`reference/`、`openspec/changes/archive/`。

## 怎麼操作（推薦：Cursor 或 Claude Code）

1. 裝 [Cursor](https://cursor.com)（內建 AI，最像 VS Code）或 [Claude Code](https://claude.ai/code)
2. clone repo（在終端機跑一次就好）：
   ```
   git clone https://github.com/chiamei-ui/eco-buddy-uiux.git
   ```
3. 開資料夾後，叫 AI：「讀 docs/design/DESIGN_SYSTEM.md 與 UI_SPEC.md，幫我用 React + Tailwind 實作 P1 夥伴首頁」

AI 會自動跨檔案閱讀，不用你手動切換。

## 改 code 後的流程

1. 改完 code → 叫 AI：「幫我 commit，message 用 `[code]` 開頭」
2. AI commit 後叫它 push（或 AI 會自動）
3. 不用開 PR（master 直接 push），但**動到別人正在改的檔案前先 pull**

## 你需要做的一次性設定

1. 進 [repo 頁面](https://github.com/chiamei-ui/eco-buddy-uiux)
2. 右上角點 **Watch** → 選 **All Activity**
3. 收 email 通知所有 commit

## 收到通知時怎麼判斷要不要看

| Commit prefix | 你要不要看 |
|--------------|-----------|
| `[pm]` | ✅ 必看（決策可能影響你已寫的 code） |
| `[design]` `[copy]` | ✅ 必看（視覺/文案變動） |
| `[flow]` | ✅ 必看（流程變動） |
| `[anim]` | 🔶 看一下檔案位置（你之後要載入 .riv） |
| `[code]` | 🔶 看一下（如果是後端 commit，可能影響你的 API 串接） |
| `[chore]` | ❌ 不用 |

## 遇到衝突 / 文件不一致

直接在 LINE 群組丟訊息 + 貼 GitHub 連結，標 `@chiamei-ui`（UI 設計師）或 `@andrewtainan`（PM）。
不要自己猜。
