## 1. P4 商店 — 商品 data 結構雙軌化

- [x] 1.1 `screens.jsx` `P4Shop.items`：為每個商品加 `currency: 'heart'` 欄位（食物 / 道具現有商品）
- [x] 1.2 `screens.jsx` `P4Shop.items.food` 新增 IAP 區商品 `{ id:'sprint-pack', emoji:'🎁', name:'月底衝刺禮包', desc:'限時限量豪華組', price:199, currency:'cash' }`
- [x] 1.3 `screens.jsx` `P4Shop.items` 新增 IAP `monthly-pass`：`{ id:'monthly-pass', emoji:'🎫', name:'月度通行證', desc:'30 天進階陪伴', price:149, currency:'cash' }`
- [x] 1.4 `screens.jsx` `P4Shop.items` 新增 IAP 稀有限定裝飾範例 1–2 件（`currency:'cash'`，price 暫填，待設計補圖）
- [x] 1.5 移除 `cats` 陣列中 `decor` / `music` 的 `phase2: true` 屬性與所有 Phase 2 渲染分支（含 L579 `{c.phase2 && …}`）；若該 Tab 暫無商品則整個 Tab 隱藏
- [x] 1.6 移除既有 `decor` / `music` items 中 `locked: true` 的「即將推出」按鈕分支（L612），改為當 items 陣列為空時整個 grid 隱藏

## 2. P4 商店 — 卡片貨幣 Badge 與分區呈現

- [x] 2.1 `screens.jsx` `shop-card` 加入右上角 Badge：ECOCO 點數商品顯示 `icon-ecoco-point.svg`（16px）、cash 商品顯示 `💳`，採 absolute 定位於卡片右上 8/8，`zIndex: 2` 防止被 thumb 覆蓋（**2026-05-28 覆寫**：icon 改回 svg，不用 💎；修正 z-index 被 thumb 遮住問題）
- [x] 2.2 `screens.jsx` 卡片 `.price` 區依 `currency` 切換樣式：heart → icon+price（顏色 `#FF5000`）；cash → `NT$ {price}`（顏色 `#060E9F`）
- [x] 2.3 `screens.jsx` `P4Shop` 渲染商品 grid 前加入 Section 標題（`icon-ecoco-point.svg` + ECOCO 點數商品 / 💳 課金商品），各 Section 內以 `items[tab].filter(it => it.currency === ...)` 切分（**2026-05-28 覆寫**：標題改 ECOCO 點數，不叫愛心）
- [x] 2.4 `screens.jsx` `oos-overlay` 文案改為「暫無庫存」（**2026-05-28 覆寫**：「Buddy 已經吃過了」太長不直覺）

## 3. P4 商店 — Header 點數 pill 改愛心

- [x] 3.1 `screens.jsx` P4 Header `points-pill`（L570）：icon-ecoco-point.svg 維持
- [x] 3.2 `screens.jsx` `points-pill` `aria-label` 改為「ECOCO 點數來源」（**2026-05-28 覆寫**：不改「愛心來源」）
- [x] 3.3 `screens.jsx` `PointsSourceSheet` 標題改為「ECOCO 點數來源」（**2026-05-28 覆寫**：不改「愛心來源」）
- [x] 3.4 `screens.jsx` `PointsSourceSheet` 子標籤 `目前 ECOCO 點數`；三列 label 採 Buddy 語言（「帶食物回家累積」「補充站消費累積」「今日陪伴累積」）（**2026-05-28 覆寫**：不改「目前愛心」）

## 4. P4 商店 — ShopPurchaseModal 不自動切 cash

- [x] 4.1 `screens.jsx` `ShopPurchaseModal`（L648）：移除 `const [method, setMethod] = useState(insufficient ? 'cash' : 'points')`，改為依 `item.currency` 決定 method
- [x] 4.2 `screens.jsx` 愛心商品 Modal 在 `state.points < item.price` 時：不顯示 cash 切換按鈕；顯示 SystemAlert「愛心不足，無法完成購買」+ 副標「再去帶食物回家給 Buddy」+ 關閉按鈕
- [x] 4.3 `screens.jsx` cash 商品 Modal：顯示 Apple Pay / Google Pay 靜態選項（無實際串接），不顯示愛心餘額
- [x] 4.4 `screens.jsx` `ShopPurchaseModal` 內顯示「ECOCO 點數」（**2026-05-28 覆寫**：維持 ECOCO 點數，不改「愛心」）
- [x] 4.5 `screens.jsx` `ShopSuccessModal` 付款方式顯示「ECOCO 點數」；`剩餘 ECOCO 點數`（**2026-05-28 覆寫**：維持 ECOCO 點數名稱）

## 5. 道具效果數值對齊 #3 定案

- [x] 5.1 `screens.jsx` P4 `items.tool` 道具 `desc`：逗貓棒 `心情值 +8` → `心情 +15`
- [x] 5.2 `screens.jsx` P4 `items.tool` 道具 `desc`：梳子 `潔淨度 +10` → `清爽 +15、心情 +10`
- [x] 5.3 `screens.jsx` P4 `items.tool` 道具 `desc`：小球 `心情值 +6` → `心情 +15`
- [x] 5.4 `screens.jsx` P4 `items.tool` 道具 `desc`：零食 `HP +3` → `精神 +15、心情 +15`
- [x] 5.5 `screens.jsx` P6 廣告道具預覽：對應四項道具效果文案同步更新為上述數值
- [x] 5.6 `screens.jsx` P9b gainMap 及 P1 drop gainMap 舊文案：依道具種類同步更新
- [x] 5.7 `app.jsx` reducer `USE_TOOL` action：同步調整為新效果數值，支援雙效果

## 6. 三維屬性禁用詞清除（HP / 潔淨）

- [x] 6.1 `screens.jsx` P2b：`❤️ 小海龜 HP 預計補充` → `❤ Buddy 精神預計補充`（L453）
- [x] 6.2 `screens.jsx` P2b：`餵食 +8 HP / 份` → `每份讓 Buddy +8 精神`（L460）
- [x] 6.3 `screens.jsx` P2b / P1：所有 `+N HP` 替換為 `+N 精神`
- [x] 6.4 `screens.jsx` P3：`+15 HP` 替換為 `+15 精神`
- [x] 6.5 `screens.jsx` P4 道具 desc 內殘餘的 `HP`、`潔淨度`、`潔淨` 一併替換（與 5.1–5.4 同步）
- [x] 6.6 `screens.jsx` P8：`HP 78 · 潔淨 62` → `精神 78 · 清爽 62`
- [x] 6.7 `screens-d2.jsx` P12：所有 `HP` → `精神`、`潔淨` → `清爽`
- [x] 6.8 全文搜尋 `screens.jsx` / `screens-d2.jsx` / `dialogues.jsx` 中 `HP` / `潔淨` 字串，確認 0 命中 ✓

## 7. 對話與推播文案 Buddy 化

- [x] 7.1 `dialogues.jsx`：對話文案中「回收」等改為 Buddy 語言（「帶食物回家」）
- [x] 7.2 `app.jsx` 推播文案：精神低 → Buddy 第一人稱（「Buddy 想念你了…」）
- [x] 7.3 `app.jsx` 推播文案：清爽低 → Buddy 第一人稱（「Buddy 想洗個澡」）
- [x] 7.4 `app.jsx` 推播文案：心情低 → Buddy 第一人稱（「Buddy 有點寂寞」）
- [x] 7.5 確認 `app.jsx` 推播 title / body 中 0 命中「HP」「潔淨」字眼 ✓

## 8. 工程語言禁用清除

- [x] 8.1 `screens.jsx` P6 廣告倒數 `SDK 接管 · 15 秒後可跳過`（L939）改為「{N} 秒」中性倒數
- [x] 8.2 `screens.jsx` P4 商店 Tab 「Phase2」標籤連同 phase2 屬性整段移除（與 1.5 同步）
- [x] 8.3 `screens.jsx` 全頁面：確認 0 命中 ✓
- [x] 8.4 `screens-d2.jsx` 同上確認 0 命中 ✓
- [x] 8.5 `app.jsx` / `dialogues.jsx` 同上確認 0 命中 ✓

## 9. 驗收

- [ ] 9.1 瀏覽器開啟 `refrence/eco-buddy_hi-fi/index.html`，逐頁 P1 → P12 視覺檢查
- [ ] 9.2 P4 商店：確認食物 Tab 同時有 💎 愛心商品與 💳 課金商品（含月底衝刺禮包），卡片右上 Badge 正確
- [ ] 9.3 P4 商店：愛心餘額不足時點擊愛心商品 → 顯示「愛心不足」alert，無 cash 切換按鈕
- [ ] 9.4 P4 商店：點擊 IAP 商品 → Modal 顯示 Apple Pay / Google Pay，無愛心餘額
- [ ] 9.5 P4 商店：售罄商品 overlay 顯示「Buddy 已經吃過了」
- [ ] 9.6 P4 Header pill 顯示 icon-ecoco-point + 愛心數
- [ ] 9.7 P9 / P12 / P2b 屬性條與數值文案使用「精神 / 清爽 / 心情」
- [ ] 9.8 P6 廣告倒數無「SDK 接管」字樣
- [ ] 9.9 推播測試（觸發三維屬性低於 30%）：文案為 Buddy 第一人稱口吻
- [ ] 9.10 全 prototype JS 檔案 grep 確認禁用詞 0 命中 ✓（已於 8.3–8.5 驗證）
