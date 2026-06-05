## Purpose

定義玩具從商店購買或廣告抽取後進入 P1 道具包 Sub-Tab 的入場動態，讓用戶明確感受到新玩具已成功放入玩具箱，並以 Buddy 世界語言提供情感回饋。

## Requirements

### Requirement: 商店購買玩具後道具包入場動態
用戶在 P4 商店確認購買道具後返回 P1 時，P1 道具包 Sub-Tab SHALL 自動聚焦並展示新卡入場動態，持續至用戶互動或 3 秒後自動消失。

#### Scenario: 購買確認後自動切換 Sub-Tab
- **WHEN** 用戶在 P4 購買道具確認後跳轉回 P1
- **THEN** P1 底部 dock 自動切換至「道具包」Sub-Tab（不論用戶離開前 dock 停在哪個 tab）

#### Scenario: 新增道具格橘色光暈脈衝
- **WHEN** P1 道具包 Sub-Tab 因購買跳轉而自動展示
- **THEN** 本次新增的道具格外框顯示橘色光暈脈衝（`ring-pulse`：`#FF5000` box-shadow 從 0 → 6px → 0，循環 2 次，單次 0.75s ease-out），持續約 1.5s 後回正常態

#### Scenario: 購買成功 Buddy 泡泡
- **WHEN** 道具包 Sub-Tab 因購買跳轉而自動展示
- **THEN** Buddy 對話泡泡顯示「新玩具到家了！快拖給我玩～🎉」，10 秒後自動消失，可點 ✕ 提早關閉

#### Scenario: 泡泡與脈衝時序
- **WHEN** P1 掛載且 payload 含 `toolStored.source = 'shop'`
- **THEN** Sub-Tab 切換後 120ms 才顯示 Buddy 泡泡（避免切換動畫未完成即出現）；脈衝動畫與 Sub-Tab 切換同步啟動

### Requirement: 廣告抽取玩具後道具包入場動態
用戶完成「看 Buddy 收禮物」任務（廣告抽取）取得道具後返回 P1 時，P1 道具包 Sub-Tab SHALL 自動聚焦並展示新卡入場動態。

#### Scenario: 廣告抽取後自動切換 Sub-Tab
- **WHEN** 廣告抽取道具成功，獎勵寫入 state 後
- **THEN** P1 底部 dock 自動切換至「道具包」Sub-Tab

#### Scenario: 廣告抽取新增道具格光暈脈衝
- **WHEN** P1 道具包 Sub-Tab 因廣告抽取跳轉而自動展示
- **THEN** 本次新增的道具格外框顯示橘色光暈脈衝（與購買入場動態相同規格）

#### Scenario: 廣告抽取 Buddy 泡泡
- **WHEN** 道具包 Sub-Tab 因廣告抽取而自動展示
- **THEN** Buddy 對話泡泡顯示「Buddy 收到新玩具了，超開心！✨」，10 秒後自動消失，可點 ✕ 提早關閉

### Requirement: payload 傳遞規格
P4 購買確認與廣告抽取成功後，跳轉 P1 時 SHALL 透過 `payload.toolStored` 傳遞入場動態所需資訊。

#### Scenario: 商店購買 payload 格式
- **WHEN** P4 購買確認成功，呼叫 `setScreen('p1', payload)`
- **THEN** payload 包含 `toolStored: { ids: string[], source: 'shop' }`，其中 `ids` 為本次新增道具格的 id 陣列

#### Scenario: 廣告抽取 payload 格式
- **WHEN** 廣告抽取道具成功，回到 P1
- **THEN** payload 包含 `toolStored: { ids: string[], source: 'ad' }`

#### Scenario: 無 payload 時不觸發動態
- **WHEN** 用戶直接開啟 P1（無 `payload.toolStored`）
- **THEN** 道具包 Sub-Tab 不自動切換、不觸發光暈脈衝、不顯示特殊 Buddy 泡泡

### Requirement: 入場動態與食物欄動態共用 CSS
道具格入場動態 SHALL 複用現有 `ring-pulse` 與 `badge-pop` CSS keyframes，不新增重複動畫定義。

#### Scenario: 道具格 pulsing class 套用
- **WHEN** `toolPulsingIds` Set 包含該道具格 id
- **THEN** 道具格 DOM 加上 `pulsing` class，觸發 `ring-pulse` 動畫（與食物格 `.food-cell.pulsing` 相同樣式）

#### Scenario: 脈衝結束後清除 class
- **WHEN** 距入場動態啟動已過 2500ms（或用戶與畫面互動）
- **THEN** `toolPulsingIds` 清空，道具格回到正常態（無 `pulsing` class）
