## Context

Hi-Fi 原型以 React JSX 實作，目前多個遊戲數值以常數形式直接出現在元件程式碼（`dialogues.jsx`、`screens.jsx`）或設計稿說明文字中：

- `toolEffectMap`：道具效果值（逗貓棒心情+15、梳子潔淨+15等）
- `gainMap`、food label：食物效果值（普通+10、稀有+15）
- P6 開獎說明：道具有效期「24 小時」
- P4 商店：IAP 商品價格「NT$199」、「NT$149」
- 廣告掉落機率表（40%/30%/20%/10%）與保底邏輯

PM 決策 #24 / #25 明確要求這些數值由後台設定，前端不寫死。目前 hi-fi 處於原型階段，此 change 的目標是在正式實作前建立規格，確保工程師拿到任務時就知道哪些欄位要讀 API、哪些可以常數。

## Goals / Non-Goals

**Goals:**
- 建立「動態數值 spec」，列出所有須從 API 讀取的欄位與對應 UI 位置
- 在受影響的現有 spec（`partner-home-ui`、`item-info-sheet-ui`、`shop-dual-track-ui`、`toy-expiry-card-ui`）補充動態數值標注規則
- 統一標注格式：UI 說明文字用 `[API: <field_name>]` 表示此值不得 hardcode

**Non-Goals:**
- 不定義後端 API schema 細節（由後端工程師另開文件）
- 不修改 hi-fi 原型程式碼（此 change 僅產出規格文件）
- 不涉及文案替換（精神→體力 等另有 change 處理）

## Decisions

### D1：標注格式統一使用 `[API: <field>]`

所有 UI spec 中動態數值一律用 `[API: <field>]` inline 標注，例如：
> 顯示「心情 +[API: tool_mood_effect]」

理由：比「TBD」更明確，工程師看到即知要對應 API 欄位；比長段說明更省空間、易 review。

### D2：廣告掉落機率與保底邏輯由後端執行，前端不持有機率表

選項 A（後端執行）：後端 API 直接回傳「本次開箱獲得道具 ID」，前端只負責顯示，不知道機率。  
選項 B（前端執行）：機率表 hardcode 在前端，後端只做驗證。

**採 A**。理由：
1. 機率是商業敏感數值，寫死在前端可被逆向工程
2. 保底邏輯（連3次未抽到零食→第4次必給）需要跨次狀態，前端持有狀態容易因重裝 app 重置
3. 後台調機率時不需前端發版

### D3：IAP 定價讀取平台本地化價格，不硬寫 NT$

App Store / Google Play 均提供 SKU 的本地化價格字串（如 `NT$199`）。前端透過平台 SDK 讀取後顯示，不在程式碼或 spec 中寫死數字。

UI spec 中標注為 `[IAP SKU: eco_pass_monthly]`，告知工程師對應的 SKU ID。

## Risks / Trade-offs

| 風險 | 緩解 |
|------|------|
| 後端 API 欄位尚未建立，前端無法實作 | spec 建立後同步給後端，列出待補欄位清單；前端先用 mock 值開發 |
| 廣告 SDK 可能提供開箱結果（不走自己後端） | 若廣告獎勵由廣告 SDK 決定，需確認 SDK 是否允許後台控制掉落；若不允許則 D2 需改為 B |
| IAP SKU 上架審核時間可能不可控 | Phase 1 採 #28 B 方案（Tab 顯示但 disabled），IAP 審核完才轉 A，不影響此 change 範疇 |
