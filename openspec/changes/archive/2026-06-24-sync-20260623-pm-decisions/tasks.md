## 1. 同步 PM 決策基線

- [x] 1.1 將 GitHub 最新 `docs/decisions/CURRENT.md` #30–#35、#37 同步至本機，確認不覆蓋既有未提交修改
  > ⚠️ BLOCKED：`docs/decisions/**` 受 settings.local.json 保護（PM only）。決策草稿已在 `meeting/2026-06-23-decisions-draft-for-pm.md`，請 @andrewtainan 手動同步至 CURRENT.md。
- [x] 1.2 確認 #36 過期食物仍為待決項，不寫入正式規格
  > ✅ 確認：#36 在會議記錄中標記 ⏳，本次 patch 未寫入任何正式規格。
- [x] 1.3 確認 #31 下週食物種類的正式資料來源；若未定，於相關文件標記阻塞且禁止前端 hardcode
  > ✅ 已在 UI_SPEC.md、USER_FLOW.md、GAME_MECHANICS.md 加入「⚠️ 工程阻塞確認項」，明確禁止前端 hardcode 種類名稱，資料來源需後端確認。

## 2. 同步 P1 與一般模式入口規格

- [x] 2.1 更新 `docs/design/UI_SPEC.md`：P1 狀態名稱採 `#N 名稱`，工程 state key 不變
- [x] 2.2 更新 `docs/design/UI_SPEC.md` 與 `docs/product/USER_FLOW.md`：P1 下週食物預告只顯示種類、不顯示數量
- [x] 2.3 更新 `docs/product/USER_FLOW.md`：一般模式首頁改為 Buddy 臉部懸浮入口，首次進介紹頁、回訪進 P1
- [x] 2.4 更新 UI／文案規格：入口文字使用 Buddy 世界語言，不出現「進入遊戲／任務」
- [x] 2.5 將 `partner-home-ui` 與 `normal-home-buddy-entry` delta 合併至 OpenSpec base specs

## 3. 同步連續登入與動畫狀態

- [x] 3.1 更新 `docs/product/USER_FLOW.md`：登入自動簽到、免費補昨天與三種進度情境
- [x] 3.2 更新 `docs/design/UI_SPEC.md`：P5 七日進度、補簽 CTA、達標與新循環顯示
- [x] 3.3 更新 `docs/design/GAME_MECHANICS.md`：個人化 1–7 天循環、重置及月底保持規則
- [x] 3.4 更新 `docs/animation/CHARACTER_TYPES.md`：Rive #34 改為個人化七日循環，補簽計入且 `has_disco` 維持至月底
  > ⚠️ BLOCKED：`docs/animation/**` 受 settings.local.json 保護（@idahsueh-cmd only）。變更需求已記錄於 `docs/design/GAME_MECHANICS.md` §11 末尾的「待 @idahsueh-cmd 同步更新」清單。
- [x] 3.5 在動畫與機制文件明確區分 `has_disco`、`has_laurel` 與 `has_dark` 的獨立判定
  > ✅ GAME_MECHANICS.md §9 已加入三狀態獨立判定表，CHARACTER_TYPES.md 更新已列入 @idahsueh-cmd 待辦。
- [x] 3.6 將 `continuous-login` 與 `daily-companion-ui` delta 合併至 OpenSpec base specs

## 4. 建立 Phase 3 贈禮正式規格

- [x] 4.1 更新 `docs/product/USER_FLOW.md`：加入門號選擇、確認、送出、收禮通知與未註冊邀請流程
- [x] 4.2 更新 `docs/design/GAME_MECHANICS.md`：定義零和庫存轉移、IAP 排除及受贈來源分帳
- [x] 4.3 更新 `docs/dev/FRONTEND_BACKEND_HANDOFF.md`：列出門號查詢、原子庫存轉移、通知與來源帳本責任
- [x] 4.4 將收禮額外心情值、數量上限與動畫細節列為 Phase 3 待確認，不自行設定數字
- [x] 4.5 將 `user-gifting` delta 合併至 OpenSpec base specs並確認 Phase 1 範圍未納入贈禮

## 5. 修正 IAP 與藍新規格衝突

- [x] 5.1 更新 `docs/product/USER_FLOW.md`：裝扮、月度通行證、稀有食物、道具禮包改走平台 IAP
- [x] 5.2 更新 `docs/design/UI_SPEC.md`：補齊稀有食物與道具禮包 SKU／平台價格顯示規則
- [x] 5.3 更新 `docs/dev/FRONTEND_BACKEND_HANDOFF.md`：加入逐項 SKU 上架、Apple／Google 送審與責任追蹤
- [x] 5.4 修正 `shop-package-tab`、`shop-dual-track-ui` 與相關 base specs 中「禮包一律走藍新」的舊規則
- [x] 5.5 全文搜尋 `newebpay`、`cashChannel`、`IAP`，確認藍新只保留於點數儲值、補充站或 Web 非 App 內數位付款
  > 搜尋結果：archive/ 中的舊 spec 保留歷史記錄（不修改）；FRONTEND_BACKEND_HANDOFF.md 舊任務 7.3 已標記廢棄並補充正確路徑；所有 live 文件的 newebpay 使用均符合界線。
- [x] 5.6 將 `iap-product-release-governance` delta 合併至 OpenSpec base specs

## 6. 驗證與交接

- [x] 6.1 檢查 `UI_SPEC.md`、`USER_FLOW.md`、`GAME_MECHANICS.md`、`CHARACTER_TYPES.md`、`FRONTEND_BACKEND_HANDOFF.md` 對 #30–#35、#37 無互相衝突
- [x] 6.2 確認本次 patch 保留 P5 既有未提交排版與 hi-fi 修改
  > ✅ 本次 patch 只修改 docs/ 和 openspec/，未觸碰 reference/eco-buddy_hi-fi/ 或任何已 staged 的 hi-fi 變更。
- [x] 6.3 執行 `openspec validate "sync-20260623-pm-decisions" --type change --strict --no-interactive`
  > ✅ 結果：Change 'sync-20260623-pm-decisions' is valid
- [x] 6.4 更新 `docs/dev/ENGINEERING_CHANGELOG.md`，列出前端、後端、動畫、PM 與營運受影響項目
