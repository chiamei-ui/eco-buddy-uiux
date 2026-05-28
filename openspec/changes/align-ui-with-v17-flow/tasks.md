## 1. Tab Bar 標籤更新

- [x] 1.1 編輯 `refrence/eco-buddy_hi-fi/assets/nav/buddy.svg`：將第三 Tab 文字「任務」改為「陪伴」，第四 Tab 文字「圖鑑」改為「日誌」（維持兩字版面）
- [x] 1.2 編輯 `refrence/eco-buddy_hi-fi/assets/nav/shop.svg`：同上，更新第三/四 Tab 文字為「陪伴」「日誌」
- [x] 1.3 編輯 `refrence/eco-buddy_hi-fi/assets/nav/mission.svg`：同上，更新第三/四 Tab 文字為「陪伴」「日誌」
- [x] 1.4 編輯 `refrence/eco-buddy_hi-fi/assets/nav/dex.svg`：同上，更新第三/四 Tab 文字為「陪伴」「日誌」
- [ ] 1.5 更新 `components.jsx` `TabBar` 元件的 `aria-label`：「任務」→「今日陪伴」，「圖鑑」→「夥伴日誌」（aria-label 用全名以利無障礙朗讀）
- [ ] 1.6 目視確認四個 SVG 文字未截斷、字型正常

## 2. P2b 回收結果頁文案對齊

- [ ] 2.1 `screens.jsx` P2bResult：eyebrow 改為 `RECYCLE COMPLETE · 帶食物回家`
- [ ] 2.2 P2bResult：主標題改為 `Buddy 收到禮物了！`
- [ ] 2.3 P2bResult：Stats 第三欄「ECOCO 點數」→「愛心」
- [ ] 2.4 P2bResult：CTA 主要按鈕 `立即餵食` → `馬上餵 Buddy`
- [ ] 2.5 P2bResult：CTA 次要按鈕 `存入食物欄` → `先放食物欄`
- [ ] 2.6 P2bResult：配額已用完情境文案改用 Buddy 語言（移除裸露的「HP」，改為「Buddy 的精神 +N！」）
- [ ] 2.7 P2bResult：新增 `showInfo` useState，預設 `false`
- [ ] 2.8 P2bResult：在 CTA 上方加入 `ℹ️ 換算說明 ›` 按鈕，點擊切換 `showInfo`
- [ ] 2.9 P2bResult：`showInfo` 為 true 時展開換算公式表（杯子 +1、寶特瓶/鋁罐/牛奶瓶 +2、電池 1號/2號 +10、其餘電池 +5）

## 3. P12 補充站結果頁換算說明

- [ ] 3.1 `screens-d2.jsx` P12RefillResult：確認主內容區不含「金流」「費用」字串，若有則移除
- [ ] 3.2 P12RefillResult：新增 `showInfo` useState，預設 `false`
- [ ] 3.3 P12RefillResult：在返回按鈕上方加入 `ℹ️ 換算說明 ›` 按鈕，點擊切換 `showInfo`
- [ ] 3.4 P12RefillResult：`showInfo` 為 true 時展開公式「NT$10 = +10 精神 + +10 清爽」

## 4. P5 今日陪伴文案與結構

- [ ] 4.1 `screens.jsx` P5Missions：`<h2>任務</h2>` → `<h2>今日陪伴</h2>`
- [ ] 4.2 P5Missions：`tabs` 陣列移除 `phase2: true` 屬性，讓週/月 Tab 可正常點擊
- [ ] 4.3 P5Missions：移除所有「Phase 2」「即將開放」相關渲染邏輯與樣式
- [ ] 4.4 P5Missions：週/月 Tab 內容改為友善空狀態（如「本週陪伴任務，敬請期待！」而非鎖定 UI）
- [ ] 4.5 P5Missions：daily missions 文案更新 — `每日簽到` → `來看看 Buddy`
- [ ] 4.6 P5Missions：`完成 1 次回收掃碼` → `帶食物回家`
- [ ] 4.7 P5Missions：`餵食 3 次` → `為 Buddy 準備一餐`
- [ ] 4.8 P5Missions：`撫摸夥伴 5 次` → `摸摸 Buddy 5 次`
- [ ] 4.9 P5Missions：`看 1 次廣告領道具` → `看 Buddy 收禮物`
- [ ] 4.10 P5Missions：任務卡片 `reward` 欄位移除「+N 點」字串，調整為食物圖示 + 心情值格式（如 `🌭 ×1 · 心情 +3`）

## 5. P7 夥伴日誌標題

- [ ] 5.1 `screens.jsx` P7Dex：找到頁面 Header 標題「圖鑑」並改為「夥伴日誌」
- [ ] 5.2 確認年度藍卡區與本月解鎖區標籤符合 UI_SPEC v1.3（上半年度 / 下半本月）

## 6. 驗收

- [ ] 6.1 瀏覽器開啟 `refrence/eco-buddy_hi-fi/index.html`，確認 Tab Bar 顯示「陪伴」「日誌」兩字標籤（P5/P7 頁面內 h2 仍為「今日陪伴」「夥伴日誌」全名）
- [ ] 6.2 切換至 P2b，確認 eyebrow、標題、Stats、CTA 文案皆正確；點擊 ℹ️ 換算說明可展開收合
- [ ] 6.3 切換至 P12，確認換算說明可展開收合；主內容區無「金流」字樣
- [ ] 6.4 切換至 P5，確認頁面 h2「今日陪伴」、任務 Buddy 語言、獎勵無「點」字樣、週/月 Tab 無鎖定 UI
- [ ] 6.5 切換至 P7，確認頁面標題「夥伴日誌」
