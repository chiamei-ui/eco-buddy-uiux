## Context

hi-fi 原型（`reference/eco-buddy_hi-fi/`）是純前端 React + Babel 靜態原型，無後端、無 bundler。P4Shop 使用本地 `items` 物件驅動 Tab 內容，cash-strip 橫向渲染 `currency === 'cash'` 的項目。

現況：月底衝刺禮包、月度通行證放在 `items.food`，語意不符。Tab Bar 有 4 個類別（食物 / 道具 / 裝飾 / 音樂盒）。商品資料統一由模組級 `SHOP_IAP_CONFIG` 提供。

## Goals / Non-Goals

**Goals:**
- 新增第五個 tab `package`（禮包），IAP 商品移入此 tab
- 月底期間（22–28 日）tab chip 上顯示倒數天數 badge
- 維持既有 cash-strip 卡片 UI 與 ProductDetailSheet 流程
- 維持 `SHOP_IAP_CONFIG` 作為唯一商品資料來源

**Non-Goals:**
- 不修改 app.jsx state/reducer
- 不新增任何 IAP 商品種類或改變定價邏輯
- 不異動 ProductDetailSheet、ShopPurchaseModal、ShopSuccessModal 元件

## Decisions

### D1：tab id 命名為 `package`

`items` 物件新增 `package` key，cats 陣列加入 `{ id: 'package', label: '禮包' }`。cash-strip 邏輯不變，`items['package']` 只包含 cash 商品，不會出現 points 區塊。

替代方案：命名為 `plan`（方案）— 放棄，`package` 在商業語境更直覺，與禮包文案一致。

### D2：tab badge 用 inline style + state 計算，不另加 class

倒數天數 badge 直接在 tab chip 的 JSX 裡渲染，讀取 `isSprintPeriod && tweaks?.sprintDaysLeft ?? 6`。樣式簡單（黃底黑字小圓角），不值得為此新增 CSS class。

替代方案：加 `.tab-chip-badge` CSS class — 放棄，保持最小改動。

### D3：food tab 移除 IAP 商品後，cash-strip 不顯示（食物全為 heart 幣）

`items.food` 移除 monthly-pass 和 sprint-pack 後，food tab 的 `cashItems` 陣列為空，cash-strip 自動不渲染（現有邏輯：`if (!cashItems.length) return null`）。不需要額外處理。

## Risks / Trade-offs

- **發現率略降**：IAP 商品需切換到禮包 tab 才可見。→ 月底 badge 和 Tweaks「月底模式」toggle 可在 demo 中補足曝光。
- **音樂盒 tab 仍為空**：`items.music = []`，visibleCats 過濾掉空 tab，不影響顯示。禮包 tab 有內容，會正常出現。
