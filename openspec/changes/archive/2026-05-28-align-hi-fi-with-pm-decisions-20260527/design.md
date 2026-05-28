## Context

`align-ui-with-v17-flow` 已修正 Tab Bar 與 P2b / P12 / P5 / P7 文案，但完整審計 hi-fi 原型（v37）後，仍有 30+ 處與 `shop-dual-track-ui`、`item-effects-ui`、`terminology-rename` 規格不一致。落差類型分為四類：(1) P4 商店尚未落實雙軌制資料結構與 IAP 商品；(2) 道具效果數值仍是舊版（+3/+6/+8/+10）未對齊 #3 定案；(3) 三維屬性命名（HP / 潔淨）與 ECOCO 點數舊用語遍佈多頁；(4) 工程語言（Phase 2 / 即將推出 / SDK 接管）未清除。本 change 為純前端 prototype 對齊，無 API / DB / 後端依賴。

## Goals / Non-Goals

**Goals:**
- P4 商店資料結構支援 `currency: 'heart' | 'cash'` 雙軌
- P4 商品卡片視覺區分愛心 / IAP 商品（Badge + 顏色）
- ShopPurchaseModal 行為符合「不互換」規則（不再自動切 cash）
- 道具效果數值（P4 / P6 / P9）一次對齊 #3 定案
- 全站禁用詞清零（HP / 潔淨 / ECOCO 點數 / Phase 2 / SDK 接管 / 即將推出 / 回收）
- 推播文案改 Buddy 第一人稱口吻

**Non-Goals:**
- IAP SDK 實際串接（Apple Pay / Google Pay 介面僅為靜態示意）
- 點數消費單日上限後端機制（PM 備註，UI 不變）
- P11 次數包定價最終定案（PM 後續另定）
- 道具有效期 Banner 警告與 6 小時前推播（屬 `item-effects-ui` 另一要求，本 change 不處理）

## Decisions

### D1：商品 data 結構新增 `currency` 欄位，而非另起兩個獨立陣列
為每個 item 加上 `currency: 'heart' | 'cash'`，price 仍為單一 number。

**為何不採方案 B（拆兩個陣列 `heartItems` / `cashItems`）**：
- hi-fi 既有 `items[tab]` 結構穩定，加欄比拆陣列改動少
- 渲染時用 `filter(it => it.currency === 'heart')` 仍可分區呈現
- 未來新增混合分類（如食物 Tab 內既有愛心包又有 IAP 大禮包）較有彈性

### D2：分區呈現用「Section 標題 + 卡片群組」，不開獨立 Tab
保留現有食物 / 道具 / 裝飾 / 音樂盒 Tab，每個 Tab 內以 Section 標題（💎 愛心商品 / 💳 課金商品）分組，符合 UI_SPEC.md L232 「橫向滾動 Tab 保留品類結構…不設雙軌入口 Tab」。

**為何不採方案 B（雙軌制當 Tab）**：
- 品類分組（食物 / 道具）對用戶導購比貨幣分組更直覺
- UI_SPEC 已明文採此分組方式

### D3：愛心不足採系統 alert（非 inline 紅字）
hi-fi 既有 `<SystemAlert>`（components.jsx:81，iOS-style，中性語氣）— P4 為無角色場景，照規格用系統 alert。文案：「愛心不足，無法完成購買」+ 副標「再去帶食物回家給 Buddy」。

**為何不 inline 紅字**：違反 UI_SPEC L244「愛心不足時 Modal 提示愛心不足，不自動切換現金選項」之「提示」性質；inline 紅字易被忽略，alert 強制阻斷符合「不互換」意圖。

### D4：locked / Phase 2 商品全面隱藏（不顯示「即將推出」）
裝飾 / 音樂盒 Tab 既然不上線，本 change 移除 `phase2: true` 屬性與對應 Tab，避免任何「Phase2」字樣露出。未來真正上線時，從 spec 新增正式商品 data 即可，無需保留 placeholder。

**為何不採「Buddy 還在準備中」文案**：避免暗示「等等就會有」造成用戶困惑；徹底隱藏更乾淨。

### D5：推播文案改 Buddy 第一人稱
`app.jsx` 推播文案維持 title / body 結構，但內容 Buddy 化：
- 精神低：「Buddy 想念你了」/「好像快沒精神…」
- 清爽低：「Buddy 想洗個澡」/「身上有點不舒服」
- 心情低：「Buddy 有點寂寞」/「想跟你玩」

對齊 `stat_dialogue_copy.md` 既有風格。

### D6：點數 icon 維持原 icon-ecoco-point.svg（撤回 💎 emoji 方案）
**2026-05-28 PM 評審覆寫**：卡片 Badge 與分區標題改回使用 `assets/icon-ecoco-point.svg`，不改為 💎 emoji。
原因：與其他頁面 icon 一致性，且 emoji 跨平台渲染差異大。

### D7：ECOCO 點數名稱不更名為「愛心」（撤回 terminology-rename 中點數部分）
**2026-05-28 PM 評審覆寫**：P4 商店及全站內「ECOCO 點數」維持原名，不改為「愛心」。用戶對「ECOCO 點數」有既有認知，貿然更名易造成混亂。
- 受影響範圍：P4 商品分區標題、購買 Modal、成功 Modal、點數來源 Sheet、P2 掃碼結果
- `currency: 'heart'` 資料欄位名稱保留（內部實作），僅 UI 顯示文案維持「ECOCO 點數」

## Risks / Trade-offs

- **[Risk] 既有 reducer 內若以 price 直接扣 points，IAP 商品 dispatch 會錯扣 ECOCO 點數** → Mitigation：`BUY` action 依 `item.currency` 分流，cash 商品不動 points 餘額；同時新增單元測試案例驗證
- **[Risk] 隱藏 Phase 2 Tab 後若 PM 想看到 placeholder 會找不到** → Mitigation：proposal 與 design.md 留紀錄；正式上線時依新 spec 加回

## Migration Plan

純前端 prototype 修改，無 migration。修改完成後：
1. 本地 `index.html` 開啟逐頁瀏覽（P1 → P12）驗證
2. 對 `screens.jsx` / `screens-d2.jsx` / `dialogues.jsx` / `app.jsx` 全文搜尋禁用詞（HP / 潔淨 / Phase 2 / 即將推出 / SDK 接管 / 回收），確認 0 命中（注意：ECOCO 點數為合法用詞，不在禁用清單）
3. 設計評審後同步 commit + tag `hi-fi-v38`

## Open Questions

- 月底衝刺禮包、月度通行證、稀有限定裝飾的視覺樣式 mock 由設計或工程暫填？→ 暫定工程以 emoji + 文字佔位，後續由設計補 mock asset
- P6 廣告倒數中性文案具體採「{N} 秒」還是「廣告進行中 · {N} 秒」？→ 暫採前者簡潔版，設計評審如有意見再調
