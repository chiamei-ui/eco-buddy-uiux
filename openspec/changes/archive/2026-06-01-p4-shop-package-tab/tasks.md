## 1. screens.jsx — 資料結構

- [x] 1.1 在 `items` 物件新增 `package` key，值為包含月度通行證的陣列（從 `SHOP_IAP_CONFIG.monthlyPass` 展開，套用 tweaks passPrice 覆蓋）
- [x] 1.2 月底期間（`isSprintPeriod`）將月底衝刺禮包（`SHOP_IAP_CONFIG.sprintPack`）加入 `items.package`，套用 tweaks sprintPrice / sprintDaysLeft 覆蓋
- [x] 1.3 從 `items.food` 移除 monthly-pass 和 sprint-pack 的展開行（清空 food tab 的 IAP 商品）

## 2. screens.jsx — Tab 定義

- [x] 2.1 在 `cats` 陣列末尾加入 `{ id: 'package', label: '禮包' }`
- [x] 2.2 確認 `visibleCats` 過濾邏輯（`items[c.id].length > 0`）能正確控制禮包 tab 的顯示 / 隱藏

## 3. screens.jsx — Tab chip badge

- [x] 3.1 修改 P4Shop return 的 tabs 渲染：為 `id === 'package'` 的 tab chip 加入 badge JSX（黃色小標，顯示 `{daysLeft}天`，僅 `isSprintPeriod` 時顯示）

## 4. styles.css — Tab badge 樣式

- [x] 4.1 新增 `.tab-chip-badge` 樣式：黃色（`#FFCE00`）背景、黑色文字、小圓角、絕對定位於 tab chip 右上角
- [x] 4.2 調整 `.p4 .tab-chip` 加入 `position: relative` 以定位 badge

## 5. 驗收確認

- [ ] 5.1 切換至「禮包」tab → 顯示月度通行證卡片（2-col grid，標題「現金商品」）
- [ ] 5.2 開啟 Tweaks「月底 22–28 日」→「禮包」tab chip 出現倒數 badge，衝刺禮包出現在禮包 tab
- [ ] 5.3 切換至「食物」tab → cash-strip 不顯示任何 IAP 商品
- [ ] 5.4 點擊禮包卡片 → ProductDetailSheet 正確顯示禮包內容 / 通行福利
- [ ] 5.5 購買後：卡片顯示已購狀態，tab badge 仍正確（sprint 倒數不因已購消失）
- [x] 5.6 更新 `index.html` 版本號（v=58 → v=59）

## 6. 禮包 tab 卡片改為 grid（用戶追加）

- [x] 6.1 禮包 tab 改用 `shop-grid` 2-col 版面，移除 cash-strip 橫向滑動
- [x] 6.2 grid 上方加灰色標題「現金商品」（同其他 cash-strip 標題樣式）
- [x] 6.3 新增 `.shop-card.purchased` CSS（opacity .72 + 灰底，對齊 `.cash-card.purchased`）
