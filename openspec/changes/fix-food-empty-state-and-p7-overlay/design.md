## Context

P1 的食物資料以固定格位呈現，現況庫存歸零時只移除 Badge，食物圖像與名稱仍保留。P7 本身是 `overflow-y:auto` 的捲動容器，但詳情 overlay 使用 `position:absolute`，因此遮罩座標跟隨 P7 內容而非 App viewport。

## Goals / Non-Goals

**Goals:**

- 讓零庫存格明確呈現為空，不誤導用戶仍有該食物。
- P7 詳情固定覆蓋 viewport，開啟時背景不可滾動。
- 關閉詳情後保留使用者原本的 P7 捲動位置。

**Non-Goals:**

- 不變更食物種類、週配額、跨月保存或後端資料結構。
- 不決定裝扮跨角色共用、禮包 CMS 欄位或月底食物清除規則。

## Decisions

1. 零庫存沿用既有食物格 DOM，只切換為 `empty` 樣式並顯示空餐盤圖示與「空餐盤」。
   - 原因：不改 state schema、不新增卡片元件，現有拖曳防呆可直接沿用。
   - 放棄「顯示下週食物」：下週排程屬另一套營運資料，零庫存不代表該格應立即換成下週內容。

2. P7 overlay 透過 React portal 掛到 `.iphone-screen`，並以 `position:absolute` 覆蓋 App viewport。
   - 原因：overlay 脫離 P7 捲動容器後不再跟隨內容位移，同時不會誤蓋原型工作區的側欄與 Tweaks。

3. 詳情開啟時以 P7 根節點 class 切換 `overflow:hidden`。
   - 原因：捲動容器就是 `.screen.p7`，鎖該節點可保留 `scrollTop`，關閉時不需手動還原座標。

## Risks / Trade-offs

- [Risk] 正式 App 的 viewport 根節點名稱可能不同於 hi-fi 的 `.iphone-screen` → 工程實作時改掛到既有 App shell / modal root，並在真機驗證安全區。
- [Trade-off] 空餐盤不顯示原食物名稱 → 用戶無法從空格回想剛吃完的品項，但避免「看起來還能吃」的誤導更重要。
