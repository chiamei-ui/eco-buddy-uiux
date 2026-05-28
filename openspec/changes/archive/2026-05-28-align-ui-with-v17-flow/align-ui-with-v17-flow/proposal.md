## Why

user-flow 從 v1.6 升至 v1.7，納入 2026-05-27 PM 決策包（#3/#4/#16/#17/#18/#19/#20/#21），hi-fi prototype（v37）的文案、Tab 標籤、換算說明與任務獎勵仍停留在舊規格，導致設計評審與工程移交時產生歧義。

## What Changes

- **Tab Bar 標籤**：「任務」→「陪伴」、「圖鑑」→「日誌」（維持兩字版面；底層 P5/P7 完整稱呼仍為「今日陪伴」「夥伴日誌」，僅 Tab 縮寫）（components.jsx + nav SVG 圖片）
- **P2b 回收結果頁**：標題文案、eyebrow 文案、Stats 列「ECOCO 點數」→「愛心」、CTA 按鈕文字對齊 UI_SPEC；新增 ℹ️ 換算說明摺疊區（#19 定案）
- **P2b 配額滿情境**：文案改用 Buddy 語言（移除「HP」工程語言）
- **P12 補充站結果頁**：新增 ℹ️ 換算說明摺疊區（NT$10 = 精神 +10 + 清爽 +10）
- **P5 今日陪伴**：標題「任務」→「今日陪伴」；任務文案改用 Buddy 語言；移除「點」獎勵（#21 定案）；移除 Phase 2 鎖定標籤（禁止露出工程語言）
- **P7 夥伴日誌**：標題「圖鑑」→「夥伴日誌」；確認年度+月度分區佈局符合 UI_SPEC v1.3

## Capabilities

### New Capabilities

- `recycle-result-info-panel`：P2b 換算說明摺疊區（ℹ️ 展開公式表，預設收合）
- `refill-result-info-panel`：P12 換算說明摺疊區（NT$10 換算公式，預設收合）

### Modified Capabilities

- `tab-bar-labels`：Tab 標籤文字從舊用語（任務/圖鑑）更新為 Buddy 語言（今日陪伴/夥伴日誌）；包含 SVG 圖片資產重新生成
- `p2b-recycle-result`：eyebrow、標題、Stats 文案、CTA 按鈕文字、配額滿情境文案全面對齊 UI_SPEC v1.3
- `p5-today-companion`：標題、任務文案、獎勵結構對齊 user-flow v1.7（移除點獎勵 #21、移除 Phase 2 標籤）
- `p7-buddy-journal`：標題標籤對齊，確認年度/月度佈局結構

## Impact

- `refrence/eco-buddy_hi-fi/components.jsx`（TabBar 元件）
- `refrence/eco-buddy_hi-fi/screens.jsx`（P2b、P5、P7）
- `refrence/eco-buddy_hi-fi/screens-d2.jsx`（P12）
- `refrence/eco-buddy_hi-fi/assets/nav/*.svg`（buddy / shop / mission / dex 四個 tab bar 狀態圖）
- 無破壞性 API 變更；純 hi-fi prototype 視覺/文案調整
