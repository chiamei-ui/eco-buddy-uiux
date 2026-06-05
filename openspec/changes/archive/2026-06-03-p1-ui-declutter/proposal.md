## Why

P1 首頁畫面資訊密度過高：問候文字、Sub-Tab 副標、卡片效果值同時曝光，導致用戶視覺負擔大；此外道具卡片的時效視覺狀態（⏰ 警示、過期灰化）在 P1 層級從未定義，為規格缺口。右上角用戶頭像沒有可點擊視覺線索，用戶不知道那是入口。

## What Changes

- **移除** P1 用戶問候列（整行刪除，含任何歡迎文句）
- **移除** 食物欄 Sub-Tab 副標文字「每週限量食物！拖曳餵食 Buddy 吧」
- **移除** 道具包 Sub-Tab 副標文字「拖到角色身上即可使用 · 24 小時內有效（免費道具）」
- **新增** P1 道具格點擊時的 Buddy 泡泡文案（含拖曳提示與時效提醒）
- **新增** P1 道具格時效視覺規格：有效期 ≤24h 顯示橘色 ⏰ icon；已過期顯示灰化 + ✕ icon + 禁止拖曳
- **新增** 食物格與道具格 ℹ️ icon，點擊彈出 Bottom Sheet 顯示效果值（卡片本體移除效果值文字）
- **修改** Header 右上角用戶頭像加橘色 2px border + 右下角 ⚙ overlay icon，強化可點擊視覺線索

## Capabilities

### New Capabilities

- `toy-expiry-card-ui`：P1 道具格時效視覺狀態規格（⏰ icon、過期灰化、Buddy 泡泡文案）— 現有規格缺口
- `item-info-sheet-ui`：食物格與道具格 ℹ️ icon 與 Bottom Sheet 效果值彈窗規格

### Modified Capabilities

- `partner-home-ui`：移除問候列、移除 Sub-Tab 副標、Header 頭像加可點擊視覺線索

## Impact

- `docs/design/UI_SPEC.md` §P1 — 佈局結構、食物欄 Sub-Tab、道具包 Sub-Tab、Header 說明
- `docs/product/STAT_DIALOGUE.md` §P1 — 補充道具格點擊觸發的 Buddy 泡泡文案
- 前端：P1 頁面移除兩處文字節點；道具格新增 ⏰ / ✕ icon 條件渲染；新增 ℹ️ icon + Bottom Sheet 元件
