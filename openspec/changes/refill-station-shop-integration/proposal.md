## Why

補充站消費是 HP 和潔淨度兩個核心數值的唯一現實驅動行為，但目前 UI 只規劃了收瓶機掃碼的觸發流程（P2/P2b），補充站從掃碼到 HP+潔淨度上升的完整畫面完全缺失；P4 商店也僅有高層概念描述，缺乏可執行的 wireframe 設計規格，兩個購買路徑都無法交付給設計師實作。

## What Changes

- **新增** 補充站 QR Code 掃碼觸發頁（P2c）— 對應收瓶機的 P2
- **新增** 補充站洗劑選購頁（P12）— 顯示可選洗劑品項、容量、點數/價格
- **新增** 購買確認 Modal（P12b）— 點數扣除或 Apple/Google Pay 確認
- **新增** 購買完成結果頁（P12c）— HP ↑ + 潔淨度 ↑ 數值回饋動畫
- **細化** P4 商店頁完整設計規格 — 分類 Tab、道具卡、購買 Modal、點數來源彈窗
- **對齊** user-flow.md §J 數值來源表：補充站消費同時驅動 HP 和潔淨度

## Capabilities

### New Capabilities
- `refill-station-flow`: 補充站掃碼觸發 → 洗劑選購 → 購買確認 → HP+潔淨度上升的完整 UI 流程（P2c → P12 → P12b → P12c）
- `shop-purchase-flow`: P4 商店詳細設計規格 — 道具卡 grid、分類 Tab、購買確認 Modal、點數來源彈窗、月底衝刺禮包置頂

### Modified Capabilities
<!-- 無現有 spec 需要變更 -->

## Impact

- **user-flow.md** §D（現實行為 Loop）需補充「補充站消費」分支，對齊收瓶機 QR Code 流程
- **user-flow.md** §G（P4 商店）由概念升格為完整設計規格
- **P4 商店** 需確認洗劑類目是否納入商店分類 Tab，或作為獨立補充站路徑
- 不影響 Phase 1 已確認的動畫採購範圍（補充站 UI 為靜態畫面設計）
