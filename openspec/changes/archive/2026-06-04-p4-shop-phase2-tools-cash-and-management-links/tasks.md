## 1. P4 玩具 tab — 現金商品資料

- [x] 1.1 在 `screens.jsx` P4Shop `items.tool` 陣列新增 2 筆現金商品：`{ id: 'feather-deluxe', emoji: '🪶', name: '限定逗貓棒禮盒', desc: '心情 +30 · 限定', price: 99, currency: 'cash', cashChannel: 'platform-iap' }` 與 `{ id: 'brush-deluxe', emoji: '🪮', name: '豪華梳子組', desc: '潔淨 +30、心情 +20 · 限定', price: 149, currency: 'cash', cashChannel: 'platform-iap' }`
- [x] 1.2 確認玩具 tab 的 `cash-strip` 渲染邏輯（line 1264–1302）不排除 `tool` tab（目前只排除 `package` / `cosmetic`），若正確則無需修改

## 2. P4 玩具 tab — 現金商品 Phase Gate

- [x] 2.1 將玩具 tab 現金商品以 `isPhase2` 控制：在 `items.tool` 中現金商品加入條件，Phase 1 時不出現（可用 spread：`...(isPhase2 ? [cashToolItems] : [])`）

## 3. P4 玩具 / 裝扮 tab — 管理頁快捷連結

- [x] 3.1 在玩具 tab JSX 內容頂部（點數商品 section 標題列同層）右側加入「查看我的玩具箱 ›」連結，`isPhase2` 時才渲染，`onClick={() => setScreen('p9')}`
- [x] 3.2 在裝扮 tab JSX 頂部（`限定裝扮` 標題列同層）右側加入「查看我的裝扮 ›」連結，`isPhase2` 時才渲染，`onClick={() => setScreen('wardrobe-manage')}`
- [x] 3.3 連結樣式：`fontSize:11, fontWeight:700, color:'var(--ecoco-blue)', background:'none', border:'none', cursor:'pointer', padding:0`，與 P1 dock 的「管理 ›」一致

## 4. P4Orders — 禮包訂單展開 accordion

- [x] 4.1 在 `screens.jsx` 找到 `SHOP_IAP_CONFIG`（月度通行證 `benefits`、衝刺禮包 `contents`），確認欄位結構
- [x] 4.2 在 `P4Orders` 加入 `expandedOrderId` state（`useState(null)`）
- [x] 4.3 寫 `getPackageDetail(orderName)` helper：以 `orderName` 比對 `SHOP_IAP_CONFIG` 各商品 `name`（用 `includes`），回傳 `{ type: 'contents'|'benefits', items: [] }` 或 `null`
- [x] 4.4 在訂單卡片右側：若 `getPackageDetail(order.name)` 非 null，顯示展開箭頭按鈕（`expandedOrderId === order.id ? '˅' : '›'`），點擊 toggle `expandedOrderId`
- [x] 4.5 在訂單卡片下方加入 accordion 展開區塊：`expandedOrderId === order.id` 時渲染 `contents` 或 `benefits` 清單，每項顯示 emoji + 名稱 / 說明
- [x] 4.6 在 `styles.css` 加入 `.order-detail-panel` 樣式：`padding: 10px 16px; background: #F8F8F8; border-radius: 0 0 12px 12px; font-size:12px; display:flex; flex-direction:column; gap:4px`

## 5. 驗收確認

- [x] 5.1 Phase 1 模式（`shopPhase=1`）：玩具 tab 只有點數商品、無管理連結；裝扮 tab 無管理連結
- [x] 5.2 Phase 2 模式（`shopPhase=2`）：玩具 tab 出現現金商品 strip + 管理連結；裝扮 tab 出現管理連結
- [x] 5.3 P4Orders：月度通行證訂單展開顯示 benefits；衝刺禮包訂單展開顯示 contents；一般食物訂單無展開箭頭
