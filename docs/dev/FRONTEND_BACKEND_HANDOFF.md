# ECO Buddy 前後端與設計素材交接任務清單

**日期**：2026-06-05  
**狀態**：hi-fi 與動態數值規格已可交付工程評估  
**關聯 change**：`hifi-no-hardcode-dynamic-values`  
**用途**：協助前端、後端、設計素材負責人快速確認各自任務與應查閱的規格文件。

---

## 0. 共同閱讀順序

所有角色開始前，先依照下列順序確認文件，避免只看單一文件造成規格落差。

| 順序 | 文件 | 用途 |
|---|---|---|
| 1 | `docs/decisions/CURRENT.md` | PM 最新定案；若文件衝突，以此為最高優先 |
| 2 | `docs/design/DESIGN_SYSTEM.md` | 色彩、字體、元件、禁用詞、Buddy 呈現規則 |
| 3 | `docs/design/UI_SPEC.md` | 頁面 UI、互動、狀態、CTA、動態數值標注 |
| 4 | `docs/design/GAME_MECHANICS.md` | 遊戲數值、後台設定、掉落與狀態邏輯 |
| 5 | `docs/product/USER_FLOW.md` | 使用者流程、頁面跳轉、核心 loop |

---

## 1. 前端工程師任務

### 1.1 頁面與共用元件

| 任務 | 頁面 / 元件 | 對應規格 |
|---|---|---|
| 建立主頁面框架 | P1 夥伴首頁、P2b 回收結果、P4 商店、P5 今日陪伴、P6 廣告開箱、P9 道具背包、P12 補充站結果 | `UI_SPEC.md` 各頁章節、`USER_FLOW.md` |
| 建立共用元件 | Buddy 顯示區、狀態條、食物格、道具格、Bottom Sheet、商品卡、訂單卡、空狀態 | `UI_SPEC.md`、`DESIGN_SYSTEM.md` |
| 套用視覺規範 | 主色、字體、圓角、卡片、CTA、禁用詞檢查 | `DESIGN_SYSTEM.md` |
| 判斷 Buddy 呈現 | Buddy 是主角，但不強制每頁出現；若壓縮重要資訊，以畫面資訊層級優先 | `DESIGN_SYSTEM.md`、`UI_SPEC.md` |

### 1.2 動態數值與 API 串接

| 任務 | 前端處理方式 | 對應規格 |
|---|---|---|
| 餐袋整袋上限 | 使用 `food_bag_max_count`，不可寫死 12 | `UI_SPEC.md` 動態數值規則 |
| 食物效果值 | 使用 `food_hp_effect` 或後端回傳的食物效果欄位 | `UI_SPEC.md` P1 Bottom Sheet、動態數值規則 |
| 食物週配額 | 使用 `food_weekly_quota` | `UI_SPEC.md` P1 Bottom Sheet |
| Buddy 點擊互動 | 使用 `tap_mood_gain`、`tap_daily_limit` | `UI_SPEC.md` P1 觸碰互動、`GAME_MECHANICS.md` |
| 玩具效果值 | 使用 `tool_mood_effect_range` 欄位 | `UI_SPEC.md` P1 / P9、動態數值規則 |
| 道具有效期 | 使用 `tool_warn_threshold_hours`、`tool_free_expire_hours`；付費玩具為永久持有規則 | `UI_SPEC.md` P1 / P9 |
| 廣告開箱結果 | 前端只送 request、播放動畫、顯示後端回傳結果，不做機率抽取 | `UI_SPEC.md` P6、`GAME_MECHANICS.md` |
| IAP 商品價格 | 使用 App Store / Google Play SDK 回傳的本地化價格，不寫死 NT$ 金額 | `UI_SPEC.md` P4、IAP SKU 清單 |

### 1.3 可先用 placeholder 的項目

| 項目 | 前端可先做 | 待設計補齊 |
|---|---|---|
| Buddy 角色動畫 | 固定尺寸 placeholder / 暫用靜態圖 | 正式 Rive 動畫 |
| 食物 icon | 固定尺寸 placeholder | 正式食物圖像 |
| 玩具 / 道具 icon | 固定尺寸 placeholder | 正式道具圖像 |
| 開箱動畫 | 暫用簡化轉場 | 正式開箱動畫 |

> placeholder 必須保留正式素材預計尺寸，避免日後換圖造成跑版。

### 1.4 2026-07-22 hi-fi 視覺同步項目

前端切版時請同步以下 prototype 決策：

| 項目 | 前端實作重點 | 對應規格 |
|---|---|---|
| P1 Sub-Tab | 餐袋 / 玩具箱 / 換衣間 inactive tab 為透明底；active tab 才用橘色膠囊 | `UI_SPEC.md` P1 Sub-Tab 視覺 |
| P1 餐袋容量文字 | 右上角 `餐袋 current/limit` 使用 13px、font-weight 500，不做高強調 | `UI_SPEC.md` P1 Sub-Tab 視覺 |
| P4 商品卡 | 食物 / 玩具 / 裝扮 / 禮包卡片寬度一致；禮包 title / desc 字級與行距跟玩具卡片一致，不裁切標題 | `UI_SPEC.md` P4 商品卡片 |
| P4 購買數量 | 初始不顯示「最多可買 N」；加到 `maxQuantity` 才顯示紅字「已達購買上限」 | `UI_SPEC.md` P4 購買確認 |
| P4 裝扮 Phase 1 | disabled「即將開放」按鈕放在價格下一列右側 | `UI_SPEC.md` P4 商品卡片 |
| System Toast | 中性 toast 使用深灰底白字，不用白底黑字 | `UI_SPEC.md` 錯誤提示原則 |
| 文案例外 | `ECOCO 點數／點數` 可出現；P1「掃描條碼」與 P8 FAQ 可為精準理解保留原詞 | `DESIGN_SYSTEM.md` |

---

## 2. 後端工程師任務

### 2.1 API 與資料欄位

| 任務 | 後端需提供 | 對應規格 |
|---|---|---|
| Buddy 狀態資料 | 體力、潔淨、心情目前值與更新結果 | `GAME_MECHANICS.md`、`UI_SPEC.md` P1 |
| 食物庫存 | 食物種類、庫存數、每格上限、週配額、效果值 | `UI_SPEC.md` P1、動態數值規則 |
| 道具庫存 | 道具 ID、名稱、類型、效果值、有效期、剩餘時間、過期狀態 | `UI_SPEC.md` P1 / P9 |
| Buddy 點擊互動 | 本日點擊次數、每日上限、是否可增加心情、更新後心情值 | `GAME_MECHANICS.md`、`UI_SPEC.md` P1 |
| 掃碼結果 | machine type、投入 / 消費資料、回饋結果、食物入庫結果 | `USER_FLOW.md` P2 / P2b / P12、`UI_SPEC.md` |
| 廣告開箱 | 後端抽取結果並回傳道具 ID，不讓前端持有機率表 | `UI_SPEC.md` P6、`GAME_MECHANICS.md` |
| 商店商品 | 商品 ID、分類、價格來源、庫存、狀態、購買限制、是否可購買 | `UI_SPEC.md` P4 |
| IAP 驗證 | 平台交易驗證、entitlement 入庫、訂單 / 交易 ID | `UI_SPEC.md` P4、`CURRENT.md` |

### 2.2 後台可調設定

| 設定項目 | 說明 | 對應規格 |
|---|---|---|
| `food_bag_max_count` | 餐袋整袋總量上限 | `UI_SPEC.md` 動態數值規則 |
| `food_weekly_quota` | 每種食物每週上限 | `UI_SPEC.md` 動態數值規則 |
| `food_hp_effect` | 食物體力效果值 | `UI_SPEC.md`、`GAME_MECHANICS.md` |
| `tool_mood_effect_range` | 各玩具心情效果區間 | `UI_SPEC.md`、`GAME_MECHANICS.md` |
| `tap_mood_gain` | 點擊 Buddy 每次增加心情值 | `GAME_MECHANICS.md` |
| `tap_daily_limit` | 點擊 Buddy 每日上限 | `GAME_MECHANICS.md` |
| `tool_warn_threshold_hours` | 道具即將過期警示閾值 | `UI_SPEC.md` P1 / P9 |
| `tool_free_expire_hours` | 免費道具有效期 | `UI_SPEC.md` P6 / P9 |
| 廣告開箱掉落設定 | 機率、保底、掉落池由後端 / 後台處理 | `GAME_MECHANICS.md` |
| 商店商品上下架 | 商品狀態、庫存、購買限制 | `UI_SPEC.md` P4 |

---

## 3. 設計素材任務

| 任務 | 交付內容 | 對應規格 |
|---|---|---|
| Buddy 角色動畫 | Rive 檔、狀態機、輸入參數、觸發事件 | `docs/animation/ANIMATION_BRIEF.md`、`docs/animation/NAMING.md` |
| 餵食動畫 | P1 原地播放，餵食後觸發狀態更新與可能變身判斷 | `UI_SPEC.md` P2b / P1 餵食、`USER_FLOW.md` |
| 點擊反應動畫 | 點擊 Buddy 後歪頭 / 跳一下 / 揮手等反應 | `UI_SPEC.md` P1 觸碰互動 |
| 變身過場 | 白光、縮放、粒子、overlay 結束後回到指定頁面狀態 | `UI_SPEC.md` 變身動畫章節 |
| 食物 icon | 當週食物圖像，需符合固定尺寸與狀態顯示；稀有食物已退役 | `UI_SPEC.md` P1 食物欄 |
| 玩具 / 道具 icon | 逗貓棒、小球、梳子、零食等道具圖像 | `UI_SPEC.md` P1 / P9 |
| 開箱圖像 / 動畫 | 廣告開箱結果呈現與獎勵圖像 | `UI_SPEC.md` P6 |

> **P5 今日陪伴**：不需要陪伴項目專屬圖像或 icon。P5 僅沿用獎勵物品（食物）的既有縮圖，不另行製作陪伴任務圖示。新增陪伴項目時不需要新素材交付。

---

## 4. PM / UI 設計確認事項

| 確認事項 | 目的 | 對應規格 |
|---|---|---|
| 動態數值欄位是否完整 | 確認前端沒有需要自行推測的數字 | `UI_SPEC.md` 動態數值規則 |
| P4 商店封測 / 正式狀態 | 確認哪些商品顯示、哪些先關閉 | `CURRENT.md`、`UI_SPEC.md` P4 |
| IAP SKU 清單 | 確認月票、禮包、裝扮 SKU 命名 | `UI_SPEC.md` IAP SKU 清單 |
| 素材優先順序 | 決定哪些圖像 / 動畫會影響前端上線節奏 | `ANIMATION_BRIEF.md`、`UI_SPEC.md` |
| 禁用詞檢查 | 避免用戶可見 UI 出現功能語言或工程語言 | `DESIGN_SYSTEM.md`、`COPY_TABLE.md` |

---

## 5. 建議開發順序

1. 前端先以 mock data 完成 P1、P2b、P4、P5、P6、P9、P12 的畫面與互動。
2. 後端先定 API response schema，特別是 `UI_SPEC.md` 動態數值規則列出的欄位。
3. 前後端先串 P1 食物 / 道具 / Buddy 狀態，再串 P2b / P12 掃碼結果。
4. P6 廣告開箱與 P4 商店金流另開串接排程，避免阻塞核心互動。
5. 設計素材可分批交付，前端先用固定尺寸 placeholder，正式素材到位後替換。

---

## 6. 從 onboarding 移入的既有待辦

以下任務原本分散在 `docs/onboarding/`，現統一歸到 `docs/dev/` 管理。onboarding 文件只保留上手導覽，不再放開發待辦。

來源：`openspec/changes/p4-shop-phase-rollout`（P4 商店分階段上線）

### 6.1 前端工程師

- [ ] **7.3** ~~禮包 Tab CTA 點擊跳轉藍新網頁付款~~（**已廢棄 #33**：App 內數位禮包改走 platform-iap；若禮包內容含 App 內數位道具／食物，CTA 觸發 StoreKit / Play Billing，不跳轉藍新）
- [ ] **7.4** 裝扮 Tab CTA 點擊觸發平台 IAP（StoreKit / Play Billing）；設備判斷副標（App Store / Google Play）
- [ ] **12.3** review `openspec/changes/p4-shop-phase-rollout/specs/` 四份規格的可實作性，回報給 `@chiamei-ui`

### 6.2 後端工程師

- [ ] **7.1** 串接藍新 NewebPay（callback、對帳）
- [ ] **7.2** 串接 Apple StoreKit / Google Play Billing（裝扮 IAP entitlement 驗證）
- [ ] **7.6** 訂單資料模型須儲存 `cashChannel`、`payMethod`、`gatewayOrderId`（藍新）、`platformTransactionId`（IAP）；成功頁與訂單紀錄共用同一筆，不得各自產生
- [ ] **7.7** Phase 2 上線前客訴視角 UAT：取消付款、付款逾時、付款成功未入庫、重複購買防呆、退款查詢（藍新找 ECOCO 客服；IAP 找 App Store / Google Play）
- [ ] **10.1** feature flag 介接 `shopPhase`，前端 fetch 一次後快取至 session
- [ ] **10.2** 緊急回滾測試：Phase 2 → Phase 1，禮包與裝扮 Tab 回 Coming Soon，進行中的交易不受影響

### 6.3 PM

- [ ] **12.2** review `openspec/changes/archive/2026-06-03-p4-shop-phase-rollout/proposal.md` 與 `design.md`
- [ ] **12.4** 於 `docs/decisions/CURRENT.md` 寫入 #26 / #27 / #28 / #29

### 6.4 窗口設計師（動畫對接）

- [ ] **11.1** 在 `docs/animation/NAMING.md` S1-S6 插槽標注 Phase 1 hero 裝扮款（彩虹光暈、循環王冠等）

---

## 7. IAP SKU 上架追蹤（#33 定案，2026-06-23）

### 7A. IAP 商品清單與送審狀態

> 每項 App 內數位商品須逐項建立 SKU 並送審，前端只對平台已通過審核的 SKU 開啟購買 CTA。

| SKU ID | 商品名稱 | Apple 送審狀態 | Google 送審狀態 | 工程負責人 | PM 負責人 |
|--------|---------|----------------|-----------------|------------|-----------|
| `eco_pass_monthly` | 月度通行證 | ⏳ 待建立 | ⏳ 待建立 | — | — |
| `sprint_pack_199` | 月底衝刺禮包 | ⏳ 待建立 | ⏳ 待建立 | — | — |
| `tool_bundle_*` | 道具禮包（各款） | ⏳ 待 PM 確認清單 | ⏳ 待 PM 確認清單 | — | — |
| 裝扮各款 | — | ⏳ 待 28.3 分批排程 | ⏳ 待 28.3 分批排程 | — | — |
| `[IAP SKU: change_pack_10]` | 更換次數包 10 次（偶爾想換一下） | ⏳ 待建立 | ⏳ 待建立 | — | — |
| `[IAP SKU: change_pack_50]` | 更換次數包 50 次（換到滿意為止） | ⏳ 待建立 | ⏳ 待建立 | — | — |

### 7B. 工程前端任務（IAP）

- [ ] **7B.1** 食物商品卡僅支援 ECOCO 點數，不讀取 IAP SKU
- [ ] **7B.2** 道具禮包商品卡讀取 `[IAP SKU: tool_bundle_*]` 平台本地化價格
- [ ] **7B.3** 確認商品 data `cashChannel` 正確標注（App 內數位商品 `'platform-iap'`，非 `'newebpay'`）
- [ ] **7B.4** SKU 查詢失敗時商品 CTA disabled，不顯示任何 hardcode 備援金額
- [ ] **7B.5** 更換次數包商品卡讀取 `[IAP SKU: change_pack_10]` / `[IAP SKU: change_pack_50]` 平台本地化價格

### 7C. 工程後端任務（IAP）

- [ ] **7C.1** 後端 entitlement 驗證涵蓋道具禮包 / 裝扮 / 狀態禮包的 IAP 交易；食物排除 IAP
- [ ] **7C.2** 訂單資料模型 `cashChannel` 欄位正確記錄 `'platform-iap'` vs `'newebpay'`，不混用
- [ ] **7C.3** IAP SKU 清單由後台管理，前端 fetch 後顯示，不寫死商品清單
- [ ] **7C.4** 更換次數包 IAP entitlement 驗證：`change_pack_10` 購買成功 → 永久增加 `swap_count` 餘額 10；`change_pack_50` → 增加 50；次數不過期、不受月底重置影響
- [ ] **7C.5** 訂單歷史正確記錄更換次數包訂單（`cashChannel: 'platform-iap'`），可在 P4 購買紀錄「現金」Tab 查閱

---

## 8. Phase 3 贈禮工程任務（#32 方向確認，Phase 3 才實作）

> ⚠️ 以下任務 Phase 1 不開發，列出供架構規劃用，避免後續重工。

### 8A. 後端（Phase 3）

- [ ] **8A.1** 門號查詢 API：輸入手機門號，回傳是否已註冊（不暴露個人資料）
- [ ] **8A.2** 原子庫存轉移 API：同一交易扣除送禮者 N 個並增加收禮者 N 個，失敗時雙方均不變
- [ ] **8A.3** acquisition_source 欄位：區分 `self_recycle` 與 `gifted`，月底實體獎勵只計 `self_recycle`
- [ ] **8A.4** 收禮通知：透過一般模式通知中心發送「OOO 送禮物給你囉，快來跟 Buddy 一起玩吧！」
- [ ] **8A.5** 未註冊門號邀請：產生 SMS / LINE 邀請連結，不建立暫存禮物

### 8B. 前端（Phase 3）

- [ ] **8B.1** 贈禮入口 UI（品項選擇 → 門號輸入 → 確認頁）
- [ ] **8B.2** 可贈送清單排除 IAP 商品、裝扮 entitlement
- [ ] **8B.3** 收禮 Buddy 反應動畫（詳細動畫細節待 Phase 3 確認）
- [ ] **8B.4** 收禮額外心情值讀取後台設定值，不寫死

### 8C. Phase 3 待確認事項（不得自行設定數字）

- [ ] 每日 / 每週贈送次數上限
- [ ] 單次贈送數量上限
- [ ] 收禮額外心情值

---

## 9. 群組通知建議文字

大家好，ECO Buddy 的 hi-fi 與「動態數值不可 hardcode」規格已整理完成，目前可以進入前後端工程評估與實作拆工。

我已整理一份交接任務文件：`docs/dev/FRONTEND_BACKEND_HANDOFF.md`。裡面已分成前端、後端、設計素材、PM / UI 確認事項，並標註每一項任務應該對照哪份規格文件。

目前前端可以先依 `DESIGN_SYSTEM.md` + `UI_SPEC.md` 開始切版與 mock data 實作；後端請先確認 `GAME_MECHANICS.md` 與 `UI_SPEC.md` 動態數值規則中的 API 欄位。角色動畫、食物 / 玩具 icon 會由設計端後續補正式素材，前端可先用固定尺寸 placeholder，避免卡住頁面開發。P5 今日陪伴列表不需要專屬 icon，沿用既有食物縮圖即可。

請大家先看交接文件確認自己的負責範圍，有規格衝突時以 `docs/decisions/CURRENT.md` 為最高優先。
