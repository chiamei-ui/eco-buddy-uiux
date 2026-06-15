## 1. 映射表（單一事實來源，先改）

- [x] 1.1 [CLAUDE.md:112](CLAUDE.md#L112) 文案轉換規則「回收 / 掃碼 → 帶食物回家 / 給 Buddy」改為「→ 帶禮物回家 / 給 Buddy」
- [x] 1.2 [AGENTS.md:66](AGENTS.md#L66) 同步同一條映射
- [x] 1.3 [docs/design/DESIGN_SYSTEM.md:44](docs/design/DESIGN_SYSTEM.md#L44) 「回收 / 掃碼 → 帶食物回家」改為「→ 帶禮物回家」
- [x] 1.4 [docs/design/COPY_TABLE.md](docs/design/COPY_TABLE.md) 更新 L14 / L225 / L238 取得行為映射為「帶禮物回家」，並新增「禮物（行為）vs 食物（資源）」邊界說明條目

## 2. 規格文件（docs/）

- [x] 2.1 [docs/design/UI_SPEC.md:110](docs/design/UI_SPEC.md#L110) 食物欄空狀態對話改「帶禮物回家」且不誤導（對齊 dialogues foodEmpty）
- [x] 2.2 UI_SPEC.md L282 / L408 / L508 / L704 取得行為語境「帶食物回家」改「帶禮物回家」（注：hi-fi P2b 實際無 `RECYCLE COMPLETE` eyebrow，spec 與原型本就有出入，屬本 change 範圍外）
- [x] 2.3 [docs/product/USER_FLOW.md:378](docs/product/USER_FLOW.md#L378) 週任務「帶食物回家 10 次」改「帶禮物回家 10 次」
- [x] 2.4 [docs/product/FAQ.md](docs/product/FAQ.md) 逐句判讀 L11/17/29/73/80：取得行為改「帶禮物回家」；L36/39/42 等指「食物資源/配額」語境保留「食物」

## 3. hi-fi 原型（reference/eco-buddy_hi-fi/）

- [x] 3.1 [dialogues.jsx:6](reference/eco-buddy_hi-fi/dialogues.jsx#L6) hp.high 改「今天帶禮物回家，我整個活起來了！💪」
- [x] 3.2 [dialogues.jsx:8](reference/eco-buddy_hi-fi/dialogues.jsx#L8) hp.low 改「快沒力了！帶禮物回家給我補能量 😫」
- [x] 3.3 [dialogues.jsx:24](reference/eco-buddy_hi-fi/dialogues.jsx#L24) foodEmpty 改「沒東西吃了 😢 去帶禮物回家，說不定有好吃的！🍖」（D2 不誤導）
- [x] 3.4 [screens.jsx:12](reference/eco-buddy_hi-fi/screens.jsx#L12) P2b 標題「帶食物回家 📦」改「帶禮物回家 📦」
- [x] 3.5 [screens.jsx:481](reference/eco-buddy_hi-fi/screens.jsx#L481) 提示「帶食物回家可補充餐袋…」改「帶禮物回家…」
- [x] 3.6 [screens.jsx:1622](reference/eco-buddy_hi-fi/screens.jsx#L1622) 今日陪伴 title「帶食物回家」改「帶禮物回家」
- [x] 3.7 [screens.jsx:1417](reference/eco-buddy_hi-fi/screens.jsx#L1417) 「再去帶食物回家給 Buddy」改「再去帶禮物回家給 Buddy」
- [x] 3.8 screens.jsx FAQ L2474/L2496/L2502 取得行為語境改「帶禮物回家」；L2480/L2481/L2482 已用「帶東西回家」（食物資源語境）無需改
- [x] 3.9 [app.jsx:235](reference/eco-buddy_hi-fi/app.jsx#L235) P2b label「帶食物回家結果」改「帶禮物回家結果」
- [x] 3.10 確認 screens.jsx:1566 / 2043 已是「帶禮物回家」無需改；全檔 grep 已無殘留取得行為語境的「帶食物回家」
- [x] 3.11 遞增 [index.html](reference/eco-buddy_hi-fi/index.html) 版本號 116→117（快取破壞）

## 4. 測試與驗收

- [x] 4.1 查 tests/ 無斷言「帶食物回家」字串，無需同步
- [x] 4.2 `npx playwright test`：26 passed。另有 5 個失敗（P2b/P12 loop 閉環、P6 立即使用、P2b/P12 #19 ℹ Modal）經 stash 驗證為 **HEAD 既有失敗、與本 change 無關**（源於近期 P2b/P12 design commit，如 cfc7f44 改 P2b 按鈕為「完成」）
- [x] 4.3 全庫 grep「帶食物回家」：僅殘留於唯讀 openspec/changes/archive、待歸檔時更新的 openspec/specs/（terminology-rename / scan-result-ui / shop-dual-track-ui / daily-companion-ui）、歷史 diff 文件 COPY_DIFF_HIFI.md，及本 change 自身文件；無取得行為殘留於現用 UI / docs
- [ ] 4.4 本機 `npx serve` 開 P2b / P1 / 今日陪伴 / FAQ 目視確認（需人工執行）
