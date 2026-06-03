## Why

裝扮（cosmetic）是現金購買商品，與玩具箱同級需要獨立管理介面（穿上 / 脫下）。目前 P1 底部已有食物、玩具箱兩個 tab，是管理 Buddy 道具的自然場所；在此加入換衣間 tab 能讓裝扮操作與 Buddy 互動保持在同一個「Buddy 的家」場景，而非繞到帳號設定頁（P8）。

## What Changes

- P1 底部 tab 列新增第三個 tab「換衣間」（文字待 PM 最終定案，暫用此名）
- Tab 列排版調整：三個 tab 時字體縮小 / 高度微調，確保不擠壓
- 右上角掃碼按鈕與免費道具按鈕位置上移，避免與 tab 列重疊
- 換衣間 tab 內容：顯示 `state.ownedCosmetics` 列表，支援穿上 / 脫下（`EQUIP_COSMETIC`）；空狀態引導去商店
- Phase 1：換衣間 tab 顯示但內容為「即將推出，敬請期待」
- P8「我的裝扮」入口改為捷徑，路由到 P1 並預選 wardrobe tab；p8-wardrobe 獨立子頁面移除（功能整併）
- `onGoToWardrobe`（購買成功 Modal）路由改為 p1 wardrobe tab

## Capabilities

### New Capabilities
- `wardrobe-tab-ui`: P1 換衣間 tab — 裝扮列表、穿上 / 脫下操作、空狀態、Phase 1 Coming Soon

### Modified Capabilities
- `partner-home-ui`: P1 底部 tab 列新增第三 tab，按鈕位置上移，payload 增加 `wardrobeTab` 初始 tab 參數

## Impact

- `reference/eco-buddy_hi-fi/screens.jsx`：P1Home tab 邏輯、換衣間 tab 渲染、COSMETIC_CATALOG 引用
- `reference/eco-buddy_hi-fi/styles.css`：`.bottom-bar` / tab 列樣式調整，右上角按鈕 bottom offset
- `reference/eco-buddy_hi-fi/app.jsx`：`onGoToWardrobe` 路由、`p8-wardrobe` case 移除、p8 wardrobe 入口路由
- `reference/eco-buddy_hi-fi/screens.jsx` P8Profile：「我的裝扮」入口改捷徑路由
