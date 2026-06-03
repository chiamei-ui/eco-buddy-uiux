## Context

購買紀錄頁（`p4-orders`）目前以純列表呈現所有訂單，沒有篩選能力。現金交易失敗時只有標籤，沒有說明和引導，導致用戶不知道下一步，容易產生客訴。

目前 `orderHistory` 資料模型：`{ id, name, thumb, price, payMethod, date, status }`
現有失敗後續行動（上一輪已加）：「聯繫客服」→ p8-faq、「重新購買」→ p4。

本次在這基礎上新增篩選和失敗說明。

## Goals / Non-Goals

**Goals:**
- 篩選列讓用戶可快速聚焦特定狀態訂單
- 失敗訂單顯示人性化的失敗原因說明（不顯示技術錯誤碼）
- 客服連結帶入訂單編號，減少客服往返確認

**Non-Goals:**
- 日期區間篩選（訂單量小，狀態篩選已足夠）
- 真實客服系統串接（hi-fi 只模擬連結）
- 後端 API 串接（hi-fi 使用 mock state）

## Decisions

### 篩選列採用 Chip 而非 Dropdown
訂單狀態只有三種（成功 / 處理中 / 失敗），Chip 列可一眼看見所有選項且單次點擊完成，Dropdown 多一層互動。與 P8-FAQ 的分類 Chip 視覺一致。

### 失敗原因存放於 `failReason` 欄位（可選）
資料模型加一個可選的 `failReason: string` 欄位。若有值則在卡片展開顯示；若無值顯示通用說明「付款未成功，請確認卡片資訊或聯繫您的銀行」。不強制後端傳入，確保相容性。

### 客服連結格式：`mailto:` 帶入訂單編號
hi-fi 用 `mailto:support@ecoco.xyz?subject=訂單問題%20${order.id}` 模擬。實際 App 可替換為 LINE 客服或 in-app chat deeplink，不影響 spec 行為。

### 篩選狀態存在 local state（非 URL/global state）
此頁是 modal-style 子頁，不需要 URL 持久化。`useState` 管理 activeFilter 即可。

## Risks / Trade-offs

- `failReason` 為可選欄位 → 若後端未傳，顯示通用說明；不會出現空白區塊
- 篩選後空狀態需要針對每種篩選有不同文案，否則體驗割裂 → 在 spec 中明確定義三種空狀態文案
