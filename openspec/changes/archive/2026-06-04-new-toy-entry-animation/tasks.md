## 1. State 與 payload 機制

- [x] 1.1 在 P1 component 新增 `toolPulsingIds` state（`useState(new Set())`）
- [x] 1.2 在 P1 的 `useEffect` 讀取 `payload.toolStored`，觸發時設定 `toolPulsingIds`、切換 dockTab 至 `'tools'`、2500ms 後清空
- [x] 1.3 依 `payload.toolStored.source` 選擇 Buddy 泡泡文案（`'shop'` vs `'ad'`），120ms delay 後呼叫 `showBubble`

## 2. 道具格渲染更新

- [x] 2.1 確認道具格 DOM 已有 `food-cell` class（或等效），可直接套用 `pulsing` class；若無則補齊
- [x] 2.2 在道具格渲染處傳入 `pulsing={toolPulsingIds.has(tool.id)}` prop，並在 DOM 加上 `pulsing` class 判斷

## 3. P4 商店購買流程接線

- [x] 3.1 P4 購買確認按鈕（點數版）成功後呼叫 `setScreen('p1', { toolStored: { ids: [購買道具id], source: 'shop' } })`
- [x] 3.2 確認 P4 → P1 跳轉後 state 已更新（新道具已寫入 `state.tools`）

## 4. 廣告抽取流程接線

- [x] 4.1 廣告道具抽取成功後呼叫 `setScreen('p1', { toolStored: { ids: [抽到道具id], source: 'ad' } })`（如廣告抽取邏輯尚未在 hi-fi 實作，標注 TODO 留待對應 screen 完成後補上）

## 5. 文案更新

- [x] 5.1 在 `dialogues.jsx` 補充商店購買文案：`toolStored.shop = '新玩具到家了！快拖給我玩～🎉'`
- [x] 5.2 在 `dialogues.jsx` 補充廣告抽取文案：`toolStored.ad = 'Buddy 收到新玩具了，超開心！✨'`

## 6. 驗收測試

- [x] 6.1 P4 購買道具確認 → 返回 P1，確認道具包 Sub-Tab 自動切換、新道具格有橘色光暈脈衝、Buddy 泡泡出現且文案正確
- [x] 6.2 脈衝 2 次後（約 1.5s）自動消失，3 秒後泡泡仍在（10 秒後自動消失）
- [x] 6.3 直接開啟 P1（無 payload）時，道具包 Sub-Tab 不自動切換、無脈衝動畫
- [x] 6.4 食物入場動態（`payload.foodStored`）與道具入場動態（`payload.toolStored`）可同時觸發而不互相干擾
