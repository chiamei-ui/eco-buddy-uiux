## Context

hi-fi 原型（`reference/eco-buddy_hi-fi/`）目前以純前端 React + 靜態 mock 資料呈現所有畫面，不串接真實 API。訂單資料在購買成功 modal 以 `Date.now()` 生成一次性編號後即丟失，用戶無法事後查詢。

現行狀態：
- `DEFAULT_STATE` 無 `orderHistory` 欄位
- P8「我的」GAME 區塊共 6 個入口，無購買紀錄
- 購買成功 modal（`BuySuccessModal`）僅顯示訂單號，無後續動作

本設計僅針對 hi-fi 原型，所有資料為 mock；不涉及後端 API 設計。

## Goals / Non-Goals

**Goals:**
- P8 新增「購買紀錄」入口，讓用戶能進入訂單列表頁
- 新增 `P4Orders` 訂單列表頁，顯示禮包與通行證歷史紀錄
- 購買成功後 mock 一筆訂單寫入 `state.orderHistory`
- 購買成功 modal 新增「查看訂單」捷徑
- 裝扮（IAP）訂單不列入，頁面底部提示用戶至系統查詢

**Non-Goals:**
- 真實 API 串接或資料持久化
- 退款流程 UI
- 裝扮訂單的管理（由 App Store / Google Play 處理）
- 分頁 / 無限捲動（mock 資料筆數固定）

## Decisions

### 1. orderHistory 存入 app state（reducer）
訂單列表資料放在 `stateReducer` 統一管理。購買成功時 dispatch `PURCHASE_CASH` action 同步 push 一筆訂單到 `state.orderHistory`。

**替代方案考慮**：用獨立 `useState` 在 P4Shop 內管理 → 跨頁（P4Orders）無法取得，放棄。

### 2. 裝扮訂單完全排除，僅放提示文字
裝扮的退款與訂單查詢屬於平台責任（Apple/Google TOS），App 不應複製管理，避免混淆用戶責任歸屬。列表頁底部放一行灰色說明文字即可。

### 3. 路由命名 `p4-orders`
訂單頁從 P4 商店脈絡衍生，沿用 `p4-` prefix 保持語意一致；同時可從 P8 入口進入，與商店本身解耦。

### 4. mock 訂單資料預填在 DEFAULT_STATE
`DEFAULT_STATE.orderHistory` 預填 2–3 筆不同狀態的 mock 訂單，讓列表頁在 Phase 1 就有內容可展示，不需等 Phase 2 購買流程完整。

## Risks / Trade-offs

- [Risk] 購買成功 modal 加按鈕後版面擁擠 → 用次要文字連結而非主要按鈕，維持視覺重心在「返回」
- [Risk] `p4-orders` 路由需要在 `app.jsx` router 加入 → 影響範圍小，僅 switch case 新增一條
