## Why

2026-06-08 會議把「回收後結果」與「食物效果」重新定義：P2b 目前資訊過重、缺少遊戲感，且舊規格仍把回收、食物、體力、潔淨混在一起。需要同步 PM 決策、使用者流程、UI 規格與工程規格，避免前端依舊版「固定食物效果 +10/+15」或「投瓶/投電池同頁混合顯示」實作。

## What Changes

- 補齊 2026-06-08 PM 決策提案：每條決策都要標示牽動畫面與調整部分，作為未來會議紀錄格式。
- P1「食物欄」名稱列為待 PM 定名；文件暫保留內部定位，避免工程與設計稿失去對照。
- P2b 改為更有遊戲感的結果頁：大字顯示本次回收總量，數據細節縮小放旁邊或摺疊說明。
- P2b 不得同時顯示投瓶數與投電池數；收瓶機與電池機是不同機台情境。
- 回收後立即結算潔淨值；食物依後台上限發放，超額時不產生食物但仍顯示潔淨結算。
- 食物產出為 N 個資收物 = N 個食物（受後台上限限制）；同一種食物每次餵食體力效果為 +1~5 random，由後端決定並回傳。
- P2b 返回 P1 時需顯示「+? 潔淨」動畫效果。

## Capabilities

### New Capabilities
- `decision-impact-traceability`: 會議決策紀錄必須列出牽動畫面與調整部分。

### Modified Capabilities
- `scan-result-ui`: P2b 結果頁資訊架構、機台互斥顯示、潔淨/食物結算與返回 P1 動畫行為調整。
- `partner-home-ui`: P1 食物欄名稱待定狀態與 P2b 返回後潔淨動畫入口。
- `item-info-sheet-ui`: 食物效果由固定值改為後端回傳的 +1~5 random 結果/範圍呈現。
- `dynamic-values-spec`: 食物上限、產出比例、餵食 random 效果與潔淨結算改由後端/後台控制。

## Impact

- 文件：`docs/decisions/CURRENT.md`, `docs/product/USER_FLOW.md`, `docs/design/UI_SPEC.md`, `docs/design/GAME_MECHANICS.md`, `docs/product/FAQ.md`
- 前端：P1 食物欄/食物格、P2b 回收結果頁、P2b → P1 返回動畫
- 後端/API：回收結果 payload 需區分機台類型、回收總量、細項、食物發放數、食物上限、潔淨增量；餵食 API 需回傳本次 random 體力增量
- CMS/後台：食物發放上限與換算比例需可設定
