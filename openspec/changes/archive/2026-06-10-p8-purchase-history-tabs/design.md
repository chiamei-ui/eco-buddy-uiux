## Context

`p4-orders` 是從 P8「我的」進入的購買紀錄頁，目前只有現金（IAP）訂單列表（`state.orderHistory`）。Phase 1 IAP 管線尚未就緒，商店實際有交易量的是 ECOCO 點數消費。兩種貨幣的訂單資料來源、欄位格式、狀態機均不同，需分開管理。

## Goals / Non-Goals

**Goals:**
- `p4-orders` 頁新增雙 Tab（ECOCO 點數 / 現金），預設停在 ECOCO 點數 Tab
- 點數 Tab 列出 `state.pointsOrderHistory`，每筆顯示商品名稱、扣款點數、時間戳
- 現金 Tab 保持原有結構；Phase 1 IAP 未就緒時顯示空狀態
- UI_SPEC.md P8 章節補上子頁面規格

**Non-Goals:**
- 點數與現金訂單合併成單一列表
- 退款、申訴流程
- Phase 2 以後的訂單篩選 / 搜尋功能

## Decisions

### 1. 分 Tab 而非合併列表
兩種貨幣的欄位截然不同（點數無訂單編號、無付款方式；現金有 IAP 收據、狀態機），合併列表需要大量 conditional rendering 且對用戶閱讀不友善。分 Tab 可讓每個 Tab 的 schema 保持單純。

### 2. 預設 Tab = ECOCO 點數
Phase 1 現金訂單為空，預設停在有資料的 Tab，避免用戶首次進入看到空狀態。Phase 2 IAP 上線後視需求調整預設值。

### 3. 點數紀錄 store key = `state.pointsOrderHistory`
與現有 `state.orderHistory`（現金）對稱，不混用，後端 API 回傳後各自寫入。

### 4. Phase 1 現金 Tab 空狀態不隱藏 Tab
保留 Tab 可讓用戶知道「現金購買紀錄的位置在哪」，Phase 2 上線後無需改 UI 結構，只需填入資料。

## Risks / Trade-offs

- **後端 API 尚未規格化**：點數消費明細 API（欄位、分頁）需後端另行設計 → 前端先用 mock data，API 就緒後替換
- **Tab 預設值 Phase 2 需回頭調整**：屆時現金有資料，預設值需重新評估 → 在 `p4-orders` 以 feature flag 或 A/B 控制

## Open Questions

- 點數消費明細 API 分頁大小？（建議 20 筆/頁，有待後端確認）
- 點數 Tab 是否需要日期篩選（本月 / 全部）？Phase 1 先不做，資料量少時全列
