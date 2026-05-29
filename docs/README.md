# ECO Buddy Docs

## 我是誰，我該看什麼

| 角色 | 必讀（順序） | 補充 |
|------|-------------|------|
| **PM / CEO** | [decisions/CURRENT.md](decisions/CURRENT.md) → [briefs/UI_REDESIGN_BRIEF.md](briefs/UI_REDESIGN_BRIEF.md) | — |
| **前端工程師** | [design/DESIGN_SYSTEM.md](design/DESIGN_SYSTEM.md) → [design/UI_SPEC.md](design/UI_SPEC.md) | [design/GAME_MECHANICS.md](design/GAME_MECHANICS.md) |
| **設計師** | [decisions/CURRENT.md](decisions/CURRENT.md) → [design/DESIGN_SYSTEM.md](design/DESIGN_SYSTEM.md) | [design/COPY_TABLE.md](design/COPY_TABLE.md) |
| **動畫師** | [animation/ANIMATION_BRIEF.md](animation/ANIMATION_BRIEF.md) → [animation/ANIMATION_LIST.md](animation/ANIMATION_LIST.md) | — |

---

## 文件優先順序（衝突時）

1. [decisions/CURRENT.md](decisions/CURRENT.md) — PM 最新定案，最高優先
2. [design/DESIGN_SYSTEM.md](design/DESIGN_SYSTEM.md) — 視覺規範（色彩、字型、元件）
3. [design/UI_SPEC.md](design/UI_SPEC.md) — 各頁面詳細規格
4. [product/USER_FLOW.md](product/USER_FLOW.md) — 使用者流程

---

## 目錄說明

| 目錄 | 內容 | 誰會動到 |
|------|------|---------|
| `decisions/` | PM 所有定案決策 | PM |
| `design/` | 設計系統、頁面規格、文案規則、**GAME_MECHANICS.md（所有數值）** | 設計師、前端、後端 |
| `product/` | 使用者流程、對話文案、FAQ | PM、設計師 |
| `animation/` | 動畫需求清單與發案規格 | 動畫師 |
| `briefs/` | PM 核心原則與改版方向 | PM、設計師 |
| `archive/` | 歷史版本，只讀不改 | — |

---

## Commit message 約定

每個 commit 第一個字決定誰要看：

| Prefix | 意義 | 收件對象 |
|--------|------|---------|
| `[pm]` | PM 決策變動 | 所有人必看 |
| `[design]` | 視覺 / 規範變動 | 前端、設計師 |
| `[copy]` | 文案變動 | 前端、設計師 |
| `[flow]` | 使用者流程變動 | 全員 |
| `[anim]` | 動畫需求 / 交付變動 | 窗口設計師、前端 |
| `[code]` | 程式碼變動 | 工程師 |
| `[chore]` | 雜事整理 | 不用特別看 |

範例：`[pm] 定案 #25 食物效果值由後台設定`

---

## 動畫外包協作

**進 repo 的角色**：PM、UI/UX 設計師（你）、前端、後端、窗口設計師（對接外包用）
**不進 repo**：外包 Rive 動畫師

### 動畫工作流

1. PM 定案動畫需求 → 寫進 [decisions/CURRENT.md](decisions/CURRENT.md)
2. 窗口設計師更新 [animation/ANIMATION_BRIEF.md](animation/ANIMATION_BRIEF.md) 與 [animation/ANIMATION_LIST.md](animation/ANIMATION_LIST.md)（含交付狀態追蹤表）
3. 窗口設計師把規格匯出給外包（GitHub 連結 / PDF / LINE 截圖）— 外包沒有 GitHub 帳號
4. 外包交付 .riv 檔 → 窗口設計師驗收
5. 窗口設計師上傳檔案：
   - < 5MB → `assets/animations/` 進 git
   - ≥ 5MB → 雲端（Google Drive），repo 只記連結
6. 窗口設計師 commit 用 `[anim]` prefix，前端工程師收 email 通知 → `git pull` 取檔案

### 重要原則

- PM 改動決策時 → 窗口設計師判斷是否影響動畫 → 主動傳訊息給外包，**外包不會自己看 repo**
- 交付追蹤表是窗口設計師的工作台，PM 一眼看進度

---

## 已知注意事項

- [briefs/UI_REDESIGN_BRIEF.md](briefs/UI_REDESIGN_BRIEF.md) 的貨幣禁區有過時說明（「改 Buddy 幣/愛心」）；以 [decisions/CURRENT.md](decisions/CURRENT.md) #16+#17 為準：ECOCO 點數保留不改名
- [archive/](archive/) 下的文件皆為歷史版本，不作為任何工作依據
- 色彩數值的唯一來源是 [design/DESIGN_SYSTEM.md](design/DESIGN_SYSTEM.md)，其他文件的色彩章節為說明性補充
- 三維數值名稱已於 2026-05-29 更新為 **體力 / 潔淨 / 心情**（舊名稱：精神 / 清爽 / 心情）
- 所有遊戲數值（換算規則、道具效果、衰減）集中在 [design/GAME_MECHANICS.md](design/GAME_MECHANICS.md)
- CODEOWNERS 設定在 `.github/CODEOWNERS`，目前 username 為佔位符，請各成員確認後填入實際帳號
