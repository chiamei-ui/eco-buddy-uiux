## Why

食物欄在「先放食物欄」返回 P1 時有完整的入場動態規格（`ring-pulse` + Badge pop + Buddy 泡泡），但玩具（道具）從商店購買完成後進入玩具箱，完全沒有對應的動態規格。這造成購買體驗的空洞感，用戶不確定玩具是否成功放入玩具箱，且缺乏 Buddy 世界語言的情感回饋。

## What Changes

- 定義玩具購買成功後的 P1 道具包 Sub-Tab 入場動態（新卡光暈脈衝 + Badge pop + Buddy 泡泡）
- 定義從 P4 商店購買玩具確認後的跳轉流程（返回 P1 並自動切換到道具包 Sub-Tab）
- 補充道具格「廣告抽取」（今日陪伴任務獎勵）的入場動態觸發規格
- 確保動態規格與食物欄 `ring-pulse` 設計語言一致

## Capabilities

### New Capabilities

- `toy-entry-animation-ui`：玩具卡片入場動態規格——從商店購買或廣告抽取後，道具格的視覺動態、Buddy 泡泡文案、Sub-Tab 自動聚焦行為

### Modified Capabilities

（無，現有 `toy-expiry-card-ui` 只涉及三態視覺狀態，不涉及入場動態）

## Impact

- [reference/eco-buddy_hi-fi/screens.jsx](../../../reference/eco-buddy_hi-fi/screens.jsx)：P1 道具包 Sub-Tab 渲染邏輯，需加入入場動態觸發條件與動畫 class
- [reference/eco-buddy_hi-fi/styles.css](../../../reference/eco-buddy_hi-fi/styles.css)：補充 `ring-pulse` class（若食物欄已定義則共用）
- [docs/design/UI_SPEC.md](../../../docs/design/UI_SPEC.md)：道具包 Sub-Tab 段落補充入場動態規格表格