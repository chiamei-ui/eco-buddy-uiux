## Context

PM 決策 #30–#35、#37 同時影響 P1、P5、一般模式首頁、動畫狀態、商店金流與未來 Phase 3 贈禮。現有規格分散於產品流程、UI、動畫、工程交接與 OpenSpec base specs，其中「禮包一律走藍新」及「連續 7 自然日」已與最新決策衝突。

本 change 先建立跨文件一致的可驗收契約，再由 apply 階段同步正式文件；不在 proposal 階段修改 hi-fi 或產品程式碼。

## Goals / Non-Goals

**Goals:**

- 讓 6/23 決策在 OpenSpec、正式文件與工程交接中使用同一套規則。
- 明確分離 Phase 1／近期同步與 Phase 3 贈禮，避免未來功能誤入當前上線範圍。
- 修正平台 IAP 與藍新金流的責任邊界。
- 將連續登入、補簽與 Rive 特殊狀態轉為可測試情境。
- 保留使用者現有未提交 UI／hi-fi 修改，不以本 change 覆蓋。

**Non-Goals:**

- 不實作簽到 API、贈禮 API、IAP 或首頁入口。
- 不決定 PM 尚未提供的收禮心情數值、贈送數量上限或動畫細節。
- 不把食物排程寫死在 App；#31 的資料責任需在 apply 前由 PM／工程確認。
- 不處理 #36 過期食物規則，因其仍未定案。

## Decisions

### 1. 以 capability 分域，不建立單一「6/23 大規格」

P1、P5、贈禮、首頁入口與 IAP 各自建立或更新 capability。這讓後續可分批 apply、測試與歸檔，也避免 Phase 3 贈禮阻塞近期 UI 文件同步。

替代方案是只更新 `CURRENT.md` 旁的單一 change，但會失去既有 base specs 的行為追蹤。

### 2. 簽到進度與實際登入紀錄分成兩個狀態

後端 MUST 分別維護：

- `login_streak_progress`：個人化 1–7 天循環，可受補簽與漏登重置影響。
- `last_actual_app_open_at`：實際開啟 App 的時間，供 Rive #33 壞滅核心判定。

因此補簽可修復七日進度，但不得偽造實際登入日，也不得改變 30 天未開啟 App 的判定。

### 3. `has_disco` 是當月保持的 entitlement

第 7 天達標後，後端將 `has_disco=true`，即使七日進度於次日回到第 1 天，該 Boolean 仍維持至月底統一重置。潔癖大師 `has_laurel` 依潔淨連續七日判定，兩者可由各自條件獨立計算，不互相取代。

### 4. 贈禮採庫存轉移與來源分帳

送出時以同一交易扣除送禮者庫存並增加收禮者庫存，不允許系統額外增發。後端 MUST 保留 acquisition source，至少區分自身回收與受贈來源，月底實體獎勵只計入自身回收所得。

未註冊門號不建立暫存庫存；改為產生 SMS／LINE 邀請。IAP entitlement 與課金商品不可進入贈禮清單。

### 5. App 內數位商品統一由平台 IAP 分類

`cashChannel` 不再由 Tab 決定，而由商品性質決定：

- App 內數位內容：`platform-iap`
- ECOCO 點數儲值、補充站或 Web 實體服務付款：`newebpay`

因此稀有食物、道具禮包、月度通行證與裝扮均走 Apple／Google 平台 IAP。每項可售商品使用獨立 SKU，價格由平台 SDK 取得。

### 6. 下週食物預告不在前端 hardcode 排程

#31 的「前端規則產生」解讀為前端負責顯示時機與呈現邏輯，不代表把營運食物種類寫進 App bundle。apply 前需確認資料來自現有後台排程、remote config 或版本化靜態設定；若無可用來源，文件 SHALL 標記為阻塞，不自行創造 API。

### 7. 文件同步與程式實作分開提交

apply 階段先更新 OpenSpec base specs 與正式文件，再另行處理 hi-fi／程式碼。`CURRENT.md` 的 PM commit 與 design 文件同步保持不同 domain，避免責任混淆。

## Risks / Trade-offs

- [#31 資料來源仍有語意矛盾] → apply 前列為明確確認項；禁止前端硬編碼營運排程。
- [IAP 舊規格散布多處] → tasks 要求全文搜尋 `newebpay`、`cashChannel`、`IAP` 並逐項驗證。
- [贈禮牽涉作弊與資格計算] → 規格要求原子轉移、來源分帳與 IAP 排除；詳細限額留 Phase 3。
- [本機已有未提交 UI_SPEC／handoff 修改] → apply 時採最小區塊 patch，不覆寫 P5 既有排版調整。
- [PM #34 與 Rive #34 編號相同] → 文件中一律加上「PM 決策」或「Rive 狀態」前綴。

## Migration Plan

1. 先同步遠端 `CURRENT.md`，確認 PM 決策 commit 不與本機修改衝突。
2. 更新 OpenSpec base specs，再同步 UI、流程、機制、動畫與交接文件。
3. 對商店規格執行舊金流全文檢查，確保 App 內數位商品不再指向藍新。
4. 對連續登入執行情境審查：連續成功、補昨天、漏兩天、月底重置、30 天未登入。
5. 贈禮維持 Phase 3 標記，不納入 Phase 1 開發清單。
6. 若需回滾，還原本 change 涉及的規格文件；不回滾 PM 的 `CURRENT.md` 決策記錄。

## Open Questions

- 下週食物種類的正式資料來源是既有後台排程、remote config，或版本化設定檔？
- 收禮額外心情值是多少，是否由後台設定？
- 稀有食物與道具禮包的正式 SKU 命名及首批上架清單為何？
- 一般模式首頁入口的後台設定 schema 由既有 CMS 擴充或另建 remote config？
