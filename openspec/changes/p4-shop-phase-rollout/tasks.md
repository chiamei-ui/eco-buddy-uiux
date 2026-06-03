## 1. Spec 與資料結構

- [x] 1.1 確認 `openspec/specs/shop-dual-track-ui/spec.md` 之 MODIFIED 內容在 archive 時可完整覆蓋既有 Requirement 區塊（`商品卡片貨幣標示` 名稱匹配；`購買確認 Modal` 為新增，不衝突）
- [x] 1.2 確認 `openspec/specs/shop-package-tab/spec.md` 之 MODIFIED 與 ADDED 內容在 archive 時不破壞既有 Scenario（`IAP 商品歸屬禮包 tab` 名稱匹配；`禮包 Tab Phase 1 Coming Soon 狀態` 為 ADDED，無衝突）
- [x] 1.3 在 hi-fi 原型商品 data type 新增 `cashChannel: 'newebpay' | 'platform-iap'` 欄位（僅 cash 商品需要）
- [x] 1.4 在 hi-fi 原型 tweaks 新增 `shopPhase: 1 | 2`，預設 `1`，並在開發者面板提供切換器（沿用既有 `phase` tweak 改名為 `shopPhase`，P5/P7 引用同步遷移；deviation 註：spec 範圍為 P4，但 P5/P7 共用同一上線階段 flag）

## 2. 文案更新

- [x] 2.1 hi-fi 原型全域搜尋並替換「裝飾」→「裝扮」（含 Tab label、卡片 alt、開發者面板）
- [x] 2.2 新增 Coming Soon 提示文「付費道具即將推出，敬請期待」（hi-fi 無 i18n 層，inline 實作於 screens.jsx Coming Soon bar）
- [x] 2.3 新增 disabled CTA 文案「即將開放」（inline 實作於禮包/裝扮分頁 buy-btn）
- [x] 2.4 同步更新 `docs/design/COPY_TABLE.md` #34（已存在於 row 73，本任務僅驗證）

## 3. Tab Bar 與 Phase 1 樣式

- [x] 3.1 P4 Tab Bar 新增第三個 Tab，id 為 `cosmetic`、label「裝扮」（原 `decor` 改名）
- [x] 3.2 實作 Coming Soon 樣式組件：Tab 頂部提示文 bar（`!isPhase2 && tab === 'cosmetic'/'package'` 時顯示橘色 bar）
- [x] 3.3 實作商品卡 disabled CTA 樣式（灰底 `#E0E0E0` + 「即將開放」文字 + 無 onClick）
- [x] 3.4 禮包 Tab Phase 1：套用 Coming Soon 提示文 + disabled CTA
- [x] 3.5 裝扮 Tab Phase 1：套用 Coming Soon 提示文 + disabled CTA + 3 款 hero 卡片（星辰帽、水晶蝴蝶結、彩虹光暈）

## 4. 點數 Tab（Phase 1 即上線）

- [x] 4.1 驗證點數 Tab 在 Phase 1 仍正常顯示與購買，不受 Phase 切換影響（heartItems 渲染不檢查 isPhase2，food/tool tab 完全獨立）
- [x] 4.2 移除 hi-fi 原型 `ShopPurchaseModal` 點數不足時自動切 cash 的殘留邏輯（驗證後無此邏輯；現行顯示紅色 alert 且僅留取消按鈕）
- [x] 4.3 驗證點數不足時顯示「點數不足」alert，無 cash 切換按鈕（screens.jsx ShopPurchaseModal L1121-1125、L1169-1171 已符合）

## 5. 商品卡金流標示（兩條路徑）

- [x] 5.1 禮包 Tab cash 商品卡 Phase 2 顯示副標「藍新 NewebPay」
- [x] 5.2 裝扮 Tab cash 商品卡 Phase 2 依設備顯示「App Store」或「Google Play」副標（hi-fi 同時顯示兩平台；實際設備分流由前端 userAgent 決定，屬 7.4 範疇）
- [x] 5.3 驗證裝扮商品卡 SHALL NOT 出現「藍新」字樣或外部金流連結（grep 確認 cosmetic section 與 CosmeticDetailSheet 皆無「藍新」）

## 6. Phase 2 前置 UI（4 項必備）

- [x] 6.1 實作購買確認頁（含商品名、金額、金流路徑、確認/取消；ShopPurchaseModal 依 cashChannel 顯示「藍新 NewebPay」或「App Store/Google Play」）
- [x] 6.2 實作退款聲明（嵌入 ShopPurchaseModal 與 CosmeticDetailSheet；可點擊「退款政策」連結）
- [x] 6.3 實作訂單編號顯示（ShopSuccessModal cash 購買時顯示 ORD-xxxxxxxx 於成功頁）
- [x] 6.4 實作金流 error state（ShopPurchaseModal DEMO dropdown：用戶取消/付款逾時/驗證失敗/網路錯誤；選取後點確認購買顯示對應 toast）

## 7. Phase 2 金流串接

- [ ] 7.1 ⚠️ **BLOCKED（後端）** 後端串接藍新 NewebPay（callback、對帳）— 工時尚未估，需後端 @shangchian 與 PM 對齊後接手
- [ ] 7.2 ⚠️ **BLOCKED（後端）** 後端串接 Apple StoreKit / Google Play Billing（裝扮 IAP entitlement 驗證）
- [ ] 7.3 ⚠️ **BLOCKED（前端工程）** 前端禮包 Tab：CTA 點擊跳轉藍新網頁付款（hi-fi 僅模擬）
- [ ] 7.4 ⚠️ **BLOCKED（前端工程）** 前端裝扮 Tab：CTA 點擊觸發平台 IAP（StoreKit / Play Billing）；設備判斷副標（5.2 hi-fi 同時顯示兩平台）
- [ ] 7.5 ⚠️ **BLOCKED（人工）** 資安 review（依 ECOCO 資安規範，金流/認證/個資處理皆需資深工程師 review）
- [ ] 7.6 ⚠️ **BLOCKED（後端）** 訂單資料模型必須同時儲存 `cashChannel`、`payMethod`、`gatewayOrderId`（藍新）、`platformTransactionId`（IAP）；成功頁與訂單紀錄共用同一筆資料，不得各自產生
- [ ] 7.7 ⚠️ **BLOCKED（後端 + QA）** Phase 2 上線前「客訴視角 UAT」：取消付款、付款逾時、付款成功未入庫、重複購買防呆、退款查詢流程（藍新找 ECOCO 客服；平台 IAP 找 App Store / Google Play）

## 8. 裝扮 Tab 試穿／預覽

- [x] 8.1 實作裝扮商品詳情 Sheet（CosmeticDetailSheet：Buddy 預覽區、商品描述、試穿/購買 CTA）
- [x] 8.2 實作試穿動效（hi-fi：點「試穿看看」→ 裝扮 emoji 疊加在 Buddy 圖示；點「還原」移除；不觸發金流；關閉 Sheet 自動還原）
- [x] 8.3 Phase 1 下 CTA disabled，但靜態預覽圖仍顯示（cosmetic section：商品 emoji/名稱/desc 全顯示，僅 button 灰底 disabled）

## 9. 購買後流程

- [x] 9.1 禮包購買成功：ShopSuccessModal 顯示訂單編號（ORD-xxxxxxxx）+ 「去背包查看」→ setScreen('p9')；P1 badge 更新由 dispatch BUY 觸發（app state 管理）
- [x] 9.2 裝扮購買成功：ShopSuccessModal 裝扮商品顯示「去「我的」查看與換裝」CTA → setScreen('p8')
- [x] 9.3 驗證 P4 SHALL NOT 出現換裝管理 UI（grep「目前穿戴」「卸下」「換裝管理」：無結果）

## 10. Phase 切換與回滾

- [ ] 10.1 ⚠️ **BLOCKED（後端）** 後端 feature flag 介接 `shopPhase`，前端 fetch 一次後快取至 session
- [ ] 10.2 ⚠️ **BLOCKED（後端 + 測試）** 緊急回滾測試：Phase 2 → Phase 1，禮包與裝扮 Tab 回 Coming Soon，進行中的交易不受影響
- [x] 10.3 hi-fi 原型開發者面板可在 Phase 1 / 2 間切換以驗收兩態 UI（1.4 已完成）

## 11. 動畫資產對接（與 #29 連動但範圍外）

- [ ] 11.1 ⚠️ **BLOCKED（@idahsueh-cmd）** 通知 @idahsueh-cmd 在 `docs/animation/NAMING.md` S1–S6 插槽標注 Phase 1 hero 款（彩虹光暈、循環王冠等）
- [ ] 11.2 ⚠️ **BLOCKED（@chiamei-ui）** 確認 Phase 1 hero 款最終品項清單（2–3 款）；hi-fi 暫載：星辰帽、水晶蝴蝶結、彩虹光暈

## 12. Spec archive 前驗收

- [x] 12.1 `openspec validate p4-shop-phase-rollout` 通過
- [ ] 12.2 ⚠️ **BLOCKED（@andrewtainan）** PM review proposal.md / design.md
- [ ] 12.3 ⚠️ **BLOCKED（@shangchian）** 前端 review specs/ 四份規格的可實作性
- [ ] 12.4 ⚠️ **BLOCKED（@andrewtainan）** 提醒 PM 於 `docs/decisions/CURRENT.md` 寫入 #26 / #27 / #28 / #29
