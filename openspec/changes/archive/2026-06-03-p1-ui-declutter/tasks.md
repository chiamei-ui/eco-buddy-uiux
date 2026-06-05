## 1. 規格文件更新

- [x] 1.1 `docs/design/UI_SPEC.md` §P1 佈局結構：移除「用戶問候」列，佈局由第 1 項（Header）直接銜接第 3 項（角色資訊列）
- [x] 1.2 `docs/design/UI_SPEC.md` §食物欄 Sub-Tab：移除副標文字「每週限量食物！拖曳餵食 Buddy 吧」的規格說明
- [x] 1.3 `docs/design/UI_SPEC.md` §道具包 Sub-Tab：移除副標文字「拖到角色身上即可使用 · 24 小時內有效（免費道具）」的規格說明
- [x] 1.4 `docs/design/UI_SPEC.md` §道具包 Sub-Tab：新增道具格點擊 Buddy 泡泡觸發規則（正常格、≤24h 格，對應文案）
- [x] 1.5 `docs/design/UI_SPEC.md` §道具包 Sub-Tab：新增道具格三態視覺規格（正常 / ≤24h ⏰ / 過期灰化 + ✕）與 24h 後自動移除規則
- [x] 1.6 `docs/design/UI_SPEC.md` §食物欄 Sub-Tab 與 §道具包 Sub-Tab：新增 ℹ️ icon 規格（卡片本體移除效果值文字，ℹ️ 點擊彈出 Bottom Sheet）
- [x] 1.7 `docs/design/UI_SPEC.md` §P1 Header：新增頭像橘色 2px border + 右下角 ⚙ overlay icon 規格
- [x] 1.8 `docs/product/STAT_DIALOGUE.md` §P1 道具互動：補充點擊道具格觸發的 Buddy 泡泡文案表格（正常、≤24h、已過期三種）

## 2. 食物格與道具格卡片收斂（UI 文件）

- [x] 2.1 `docs/design/UI_SPEC.md` 新增 ℹ️ Bottom Sheet 規格區塊：食物 Sheet 內容（大圖 + 名稱 + 效果值 + 週配額）
- [x] 2.2 `docs/design/UI_SPEC.md` 補充道具 Sheet 內容（大圖 + 名稱 + 效果值 + 有效期類型）
- [x] 2.3 `docs/design/UI_SPEC.md` 說明 ℹ️ 與 ⏰ / ✕ 互斥邏輯（三態 icon 優先級 ✕ > ⏰ > ℹ️）

## 3. 驗收確認

- [x] 3.1 確認 UI_SPEC.md §P1 佈局結構 list 不含問候列
- [x] 3.2 確認 UI_SPEC.md 食物欄與道具包 Sub-Tab 兩段都無副標文字規格
- [x] 3.3 確認 STAT_DIALOGUE.md 含三種道具格點擊情境文案
- [x] 3.4 確認 UI_SPEC.md 道具格三態（正常 / ⏰ / 過期）視覺狀態與互動規則完整
- [x] 3.5 確認 UI_SPEC.md 含 ℹ️ icon + Bottom Sheet 完整規格（食物 + 道具兩種內容）
- [x] 3.6 確認 UI_SPEC.md Header 頭像新增 border + ⚙ overlay 規格，且路由行為說明不變
