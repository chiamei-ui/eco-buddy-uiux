## Context

hi-fi prototype 位於 `refrence/eco-buddy_hi-fi/`，以 React（Babel 直接轉譯，無建置步驟）在瀏覽器中執行。Tab Bar 依賴預先生成的 SVG 圖片（`assets/nav/{buddy|shop|mission|dex}.svg`），每張圖片代表一個 Tab 被選中的狀態，由 `components.jsx` 的 `TabBar` 元件根據 `active` 狀態切換。

目前需對齊的規格：
- `docs/UI_SPEC.md` v1.3（Tab 順序、文案、ℹ️ 換算說明）
- `docs/user-flow.md` v1.7（P5 任務結構、P7 標籤）
- `CLAUDE.md` 文案轉換規則（禁止露出功能語言、工程語言）

## Goals / Non-Goals

**Goals:**
- 所有可見文字符合 Buddy 語言規範（CLAUDE.md 轉換表）
- Tab Bar 標籤與 SVG 圖片同步更新
- P2b / P12 新增 ℹ️ 換算說明摺疊區，符合 #19 定案
- P5 移除「點」獎勵文字，符合 #21 定案
- P5 隱藏週/月任務鎖定態（不露出「Phase 2」「即將開放」）

**Non-Goals:**
- 不修改 P1、P3、P4、P6、P8、P9、P9b、P10、P11 等其他畫面
- 不改變任何路由邏輯或 dispatch 行為
- 不替換 Tab Bar 的 SVG 圖片方案（維持現有 image-swap 機制）
- 不改動動畫、拖曳邏輯或 tweaks panel

## Decisions

### D1：Tab Bar SVG — 設計師於 Illustrator 重匯
驗證後發現現有 nav SVG 的中文字已全部 outline 為 `<path>`，無 `<text>` 也無嵌入字體，故無法用文字編輯器直接改字。改由設計師回到原 .ai 檔將「任務 / 圖鑑」改為「陪伴 / 日誌」後重新輸出四個 SVG（buddy / shop / mission / dex），覆蓋 `refrence/eco-buddy_hi-fi/assets/nav/` 內檔案。

**狀態（2026-05-28）**：四個 SVG 已由設計師更新覆蓋完成。

**Tab 標籤兩字決策**：與 user-flow / UI_SPEC 的全名（今日陪伴 / 夥伴日誌）不一致，但 Tab Bar 版面緊湊，維持兩字可避免文字截斷與字元縮放。P5、P7 頁面內部標題仍使用全名。

替代方案：改成純 CSS/HTML Tab Bar — 成本高、影響廣，不在本次範圍。

### D2：ℹ️ 換算說明摺疊 — React 本地 state `useState`
在 P2b 和 P12 元件各加一個 `showInfo` boolean state，點擊 `ℹ️ 換算說明 ›` 切換顯示/隱藏公式表。使用 inline style 控制 display，不引入動畫。

### D3：P5 週/月 Tab 鎖定態移除
直接將 `phase2: true` 屬性從 `tabs` 陣列移除，並刪除對應的鎖定邏輯與「Phase 2」標籤渲染。改為讓 週/月 tab 點擊後顯示「即將推出」以外的佔位內容（空白或友善提示），或直接讓 tab 可點但顯示空列表。

> 決策：顯示友善空狀態（「本週陪伴任務，敬請期待！」）而非鎖定 UI，符合「鼓勵 > 命令」原則。

## Risks / Trade-offs

- **SVG 文字 outline 不可程式化修改**：經驗證 nav SVG 中文字已 outline 為 path，無法用文字編輯器修改 → 已改由設計師於 Illustrator 重匯，2026-05-28 完成覆蓋。
- **P5 週/月空狀態**：移除鎖定後須補充佔位文案，避免空白畫面。→ 設計預設友善文案即可。
- **Tab 兩字 vs 規格全名落差**：Tab Bar 用「陪伴」「日誌」二字，但 user-flow / UI_SPEC 規範為「今日陪伴」「夥伴日誌」。→ P5、P7 頁面內標題仍用全名，僅 Tab 縮寫；後續若 UI_SPEC 修訂，Tab 縮寫規則需補登於 spec。
