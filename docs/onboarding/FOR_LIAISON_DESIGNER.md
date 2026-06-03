# 30 秒上手指南 — 給窗口設計師（@idahsueh-cmd）

## 你的角色
你是**外包 Rive 動畫師 ↔ 開發團隊**的翻譯層。外包不接觸 repo，你負責雙向傳遞。

## 你要看 / 寫的檔案

- 👀 看：`docs/decisions/CURRENT.md`（PM 決策，會影響動畫需求）
- ✍️ 寫：
  - `docs/animation/ANIMATION_LIST.md`（動畫需求清單 + 交付追蹤表）
  - `docs/animation/ANIMATION_BRIEF.md`（給外包的發案文件）

## 怎麼操作

**選項 A（推薦）**：用瀏覽器，不用裝任何東西
1. 打開 [Claude.ai](https://claude.ai)
2. 跟 AI 講：「幫我更新 GitHub repo `chiamei-ui/eco-buddy-uiux` 的 `docs/animation/ANIMATION_LIST.md`，把『01 瀕死邊緣 Idle』的交付狀態欄改為 ✅ 2026-06-01」
3. AI 會幫你 commit，message 用 `[anim]` 開頭

**選項 B**：本機操作（如果你想看整個 repo）
1. 裝 [Cursor](https://cursor.com) 或 [Claude Code](https://claude.ai/code)
2. `git clone https://github.com/chiamei-ui/eco-buddy-uiux.git`
3. 直接編輯 markdown 檔案，叫 AI 幫你 commit + push

## 你跟外包的工作流

```
1. PM 定案動畫需求 → 寫在 decisions/CURRENT.md（PM 自己寫）
2. 你判斷是否影響動畫：
   - 影響 → 更新 ANIMATION_BRIEF.md 與 ANIMATION_LIST.md
3. 把規格匯出給外包：
   - 簡單方式：截圖 + LINE 文字描述
   - 完整方式：把 ANIMATION_BRIEF.md 內容複製貼到 Google Doc 給外包
4. 外包交付 .riv 檔（雲端連結 / email）
5. 你驗收 → 上傳到 repo：
   - 檔案 < 5MB → 放進 `assets/animations/` 進 git
   - 檔案 ≥ 5MB → 放雲端（Google Drive），追蹤表填連結
6. 更新交付追蹤表（ANIMATION_LIST.md 底部那張表）
7. commit message 用 `[anim] 第 N 批動畫交付`
```

## 你需要做的一次性設定

1. 進 [repo 頁面](https://github.com/chiamei-ui/eco-buddy-uiux)
2. 右上角點 **Watch** → 選 **All Activity**
3. 收 email 通知所有 commit

## 關鍵原則

外包**不會自己看 repo**——他沒有帳號也沒有義務。
PM 改了影響動畫的決策時，**主動傳訊息給外包**，不要假設他會知道。

---

## 待辦清單

來源：`openspec/changes/p4-shop-phase-rollout`（P4 商店分階段上線）

- [ ] **11.1** 在 `docs/animation/NAMING.md` S1–S6 插槽標注 Phase 1 hero 裝扮款（彩虹光暈、循環王冠等）
