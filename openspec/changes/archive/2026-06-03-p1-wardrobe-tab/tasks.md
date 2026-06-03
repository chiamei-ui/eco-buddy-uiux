## 1. 移除 p8-wardrobe 獨立子頁面

- [x] 1.1 screens.jsx：刪除 `P8Wardrobe` 元件整段
- [x] 1.2 screens.jsx：Export 區移除 `P8Wardrobe`
- [x] 1.3 app.jsx：移除 `case 'p8-wardrobe'` routing
- [x] 1.4 app.jsx：`P8_SUBS` 移除 `'p8-wardrobe'`

## 2. P1 dock-tabs 新增換衣間 Tab

- [x] 2.1 screens.jsx P1Home：`dockTab` 型別擴充為 `'food' | 'tools' | 'wardrobe'`（修改 useState 初始值說明 comment）
- [x] 2.2 screens.jsx P1Home：`useEffect([payload])` 加入 `if (payload?.openWardrobe) setDockTab('wardrobe')`
- [x] 2.3 screens.jsx P1Home：dock-tabs 新增第三個按鈕 `換衣間`（暫定文字，待 PM 定案）
- [x] 2.4 styles.css：`.dock-tab` font-size 改為 `13px`，padding 改為 `5px 12px`

## 3. 換衣間 Tab 內容渲染

- [x] 3.1 screens.jsx P1Home：`dockTab === 'wardrobe'` 區塊 — Phase 1（`!isPhase2`）顯示「即將推出，敬請期待」佔位
- [x] 3.2 screens.jsx P1Home：Phase 2 + `ownedItems.length === 0` 顯示空狀態（emoji + 說明 + 去商店按鈕）
- [x] 3.3 screens.jsx P1Home：Phase 2 + 有裝扮 → 2-column 卡片格線（emoji、名稱、描述、穿上 / 脫下按鈕），dispatch `EQUIP_COSMETIC`；dock 區域改為 `overflow-y: auto` 允許內部 scroll

## 4. 路由更新

- [x] 4.1 screens.jsx P4Shop：`onGoToWardrobe` 改為 `setScreen('p1', { openWardrobe: true })`（購買成功 Modal）
- [x] 4.2 screens.jsx P8Profile：「我的裝扮」Phase 2 的 `go` 從 `'p8-wardrobe'` 改為使用 `action` 呼叫 `setScreen('p1', { openWardrobe: true })`（需調整 menu-item 的 action 支援 payload）
- [x] 4.3 app.jsx `P8_SUBS`：確認 `'p8-wardrobe'` 已移除，無殘留

## 5. Tweaks Panel 清理

- [x] 5.1 app.jsx InlineTweaks：P8 tweaks 區塊移除「脫下裝扮」的 `EQUIP_COSMETIC` 快捷按鈕中提示文字已與 p8-wardrobe 無關，確認快捷按鈕行為仍正確（指向 state，不指向頁面）

## 6. Onboarding 文案更新

- [x] 6.1 screens.jsx OB_STEPS：第二步 spotlight 文字「食物欄 & 玩具箱」更新為「食物欄、玩具箱、換衣間」
