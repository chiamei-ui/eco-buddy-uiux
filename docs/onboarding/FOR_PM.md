# 30 秒上手指南 — 給 PM（@andrewtainan）

## 你的角色
你是這個 repo 的**決策來源**。其他人改的是「依據你的決策做的事」。

## 你要看 / 寫的檔案
- 👀 看：`docs/briefs/UI_REDESIGN_BRIEF.md`（你自己的 8 條核心原則，需要時回顧）
- ✍️ 寫：`docs/decisions/CURRENT.md`（**你唯一要寫的檔案**）

其他所有 docs/ 內容都是「依據你的決策衍生」，你不用主動更新。

## 怎麼操作（不用裝任何東西）

1. 打開瀏覽器 → [Claude.ai](https://claude.ai) 或 [ChatGPT](https://chat.openai.com)
2. 把以下這段話複製貼上（替換決策內容）：

> 幫我把這個決策寫進 GitHub repo `chiamei-ui/eco-buddy-uiux` 的 `docs/decisions/CURRENT.md`，commit message 用 `[pm] 定案 #編號 主題` 格式。
>
> 決策內容：
> （這裡寫你的決策，例如：#25 食物效果值由後台設定，前端不寫死）

> 每條決策請補：
> - 牽動畫面：（例如 P1 夥伴首頁 / P2b 回收結果頁）
> - 調整部分：（例如 Tab 文案 / 結果頁主視覺 / 後端回傳欄位）
> - 待補資料：（若還沒定案，例如名稱待調整、數值待後台設定）

3. AI 會幫你寫完並 commit。完成後 GitHub 會發 email 通知所有人。

## 你需要做的一次性設定

1. 進 [repo 頁面](https://github.com/chiamei-ui/eco-buddy-uiux)
2. 右上角點 **Watch** → 選 **All Activity**
3. 之後任何 commit 你都會收到 email

## 我希望你養成的習慣

當有人 commit 後，你會收到 email。如果是 `[pm]` 開頭的決策 commit：
- 點進 GitHub 連結
- 在 commit 頁面下方按 👍 reaction
- 代表「我看過了，沒問題」

這一步讓其他人知道：**你確認過這個決策，不會中途反悔**。

---

## 任務清單在哪裡

開發待辦已統一移到 `docs/dev/FRONTEND_BACKEND_HANDOFF.md`。

這份 onboarding 只作為 30 秒上手導覽；實際任務、負責角色與對應規格請看 dev 文件。
