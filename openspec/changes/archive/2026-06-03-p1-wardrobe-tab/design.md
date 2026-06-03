## Context

P1Home 底部 dock 目前有兩個 tab（食物欄 / 玩具箱），tab 狀態由 `dockTab: 'food' | 'tools'` 管理。`.dock-shell` 固定在 `bottom: 69px`，`.dock` 高度為 `175px`，`.side-actions`（掃碼 + 免費道具）固定在 `bottom: 280px`。

`.dock-tabs` 使用 `width: fit-content`，新增第三個 tab 後寬度自然延伸，不會破版，但 tab 字體 14px + padding `5px 16px` 三個並排後可能超出左邊界。

`p8-wardrobe` 是本輪先前新增的獨立子頁面，功能與本次換衣間 tab 重疊，需一併移除。

## Goals / Non-Goals

**Goals:**
- P1 dock 新增 `wardrobe` tab，顯示 `state.ownedCosmetics`，支援穿上 / 脫下
- Phase 1 時 wardrobe tab 顯示「即將推出，敬請期待」佔位
- 購買成功後「去換裝」按鈕直跳 P1 wardrobe tab
- P8「我的裝扮」改為捷徑，路由到 P1 並自動切換到 wardrobe tab
- 移除 `p8-wardrobe` 獨立子頁面

**Non-Goals:**
- Tab 文字最終定案（PM 決定，暫用「換衣間」）
- 試穿 preview 動畫（P4 CosmeticDetailSheet 已有，不重複）
- 裝扮排序 / 分類功能

## Decisions

**1. 擴充 `dockTab` 狀態而非新增獨立 state**

`dockTab` 已有 `'food' | 'tools'`，直接加入 `'wardrobe'`，整個 dock 渲染邏輯對齊，不需要另一套開關。

**2. Deep-link via payload**

P1Home 的 `payload` 已有 `payload?.foodStored` 觸發自動切 tab 的先例。新增 `payload?.openWardrobe: true` → `useEffect` 內 `setDockTab('wardrobe')`。`onGoToWardrobe` 改為：
```js
setScreen('p1', { openWardrobe: true })
```
P8「我的裝扮」入口同樣路由到 `p1` 並傳 payload（需確認 app.jsx 的 `setScreen` 支援第二個參數 payload；現有路由已有此機制）。

**3. Tab 列字體縮小至 13px，padding 改為 `5px 12px`**

三個 tab 並排約需 270px，`.dock-tabs` 為 fit-content，不會超出 375px 手機寬，但視覺偏擠。縮小 padding 後約 240px，視覺尚可。字體 13px 與現有 `.dock-hint` 同級，不影響可讀性。
Alternative（全寬 flex）：改成 `width: 100%` + `display: flex; justify-content: space-around` 更整齊，但會改變目前食物/玩具箱的「左對齊小標籤」視覺語言，**風險較高，暫不採用**。

**4. `.side-actions` bottom 不調整**

`.dock` 高度固定 175px，dock-shell bottom 69px → dock 頂端約 `69 + 175 + tab bar ~36px ≈ 280px`，與 `.side-actions` bottom 280px 剛好切齊。加入第三個 tab 不改變高度，無需調整。若 wardrobe tab 內容需要更多高度（裝扮卡片超出 175px），則 dock 需 scroll，不調整外框高度。

**5. 移除 `p8-wardrobe` screen**

`case 'p8-wardrobe'`、`P8_SUBS` 中的 `p8-wardrobe`、`P8Wardrobe` 元件、export 全部移除。COSMETIC_CATALOG 保留在 screens.jsx 頂層（P1 wardrobe tab 仍需引用）。

## Risks / Trade-offs

- **OnboardingSpotlight 文案** → 第二步 spotlight 說「食物欄 & 玩具箱」，加 tab 後需更新文案為「食物欄、玩具箱、換衣間」。低風險，文字修改。
- **payload deep-link 時序** → `useEffect([payload])` 在 mount 後執行，若 payload 在 re-render 後變化可能觸發兩次。沿用現有 `payload?.foodStored` 同樣模式，風險已知且可接受。
- **Phase 1 wardrobe tab 入口可見但鎖定** → 使用者可能對灰色內容感到困惑。已決定與 P8 一致：顯示但呈現 Coming Soon 說明，符合「驚喜 > 完整」原則。

## Open Questions

- 換衣間 tab 最終文字：PM 定案後更新（目前暫用「換衣間」）
- dock 內裝扮卡片版型：目前沿用 p8-wardrobe 的 2-column grid；若 dock 高度 175px 放不下，改為橫向 scroll strip
