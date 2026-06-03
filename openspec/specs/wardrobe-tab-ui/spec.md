## ADDED Requirements

### Requirement: 換衣間 Tab 顯示
P1 dock 底部 SHALL 新增「換衣間」tab（第三個），與食物欄、玩具箱並排。

#### Scenario: Tab 存在
- **WHEN** P1 載入
- **THEN** dock-tabs 顯示三個 tab：食物欄、玩具箱、換衣間

#### Scenario: 切換至換衣間
- **WHEN** 用戶點擊「換衣間」tab
- **THEN** dock 內容切換為裝扮列表，active 狀態移至換衣間 tab

### Requirement: 換衣間裝扮列表
換衣間 tab SHALL 顯示 `state.ownedCosmetics` 中所有已擁有裝扮，以 2-column 格線排列，每張卡片顯示 emoji、名稱、描述、穿上 / 脫下按鈕。

#### Scenario: 有裝扮時顯示列表
- **WHEN** `state.ownedCosmetics.length > 0`
- **THEN** 每件裝扮顯示為卡片，卡片包含 emoji、名稱、描述

#### Scenario: 穿上裝扮
- **WHEN** 用戶點擊某裝扮卡片的「穿上」按鈕
- **THEN** dispatch `EQUIP_COSMETIC` 帶該 id，卡片顯示「穿著中」badge，按鈕變為「脫下」

#### Scenario: 脫下裝扮
- **WHEN** 用戶點擊「穿著中」裝扮的「脫下」按鈕
- **THEN** dispatch `EQUIP_COSMETIC` 帶 `null`，badge 消失

### Requirement: 換衣間空狀態
當 `state.ownedCosmetics` 為空時，換衣間 tab SHALL 顯示引導前往商店的空狀態。

#### Scenario: 無裝扮時空狀態
- **WHEN** 換衣間 tab 啟動且 `state.ownedCosmetics.length === 0`
- **THEN** 顯示說明文字與「去商店」按鈕，點擊跳轉 P4

### Requirement: Phase 1 換衣間 Coming Soon
Phase 1（`tweaks.shopPhase < 2`）時，換衣間 tab SHALL 仍可點擊但內容顯示「即將推出，敬請期待」佔位，不顯示裝扮列表。

#### Scenario: Phase 1 換衣間內容
- **WHEN** `tweaks.shopPhase < 2` 且用戶切換到換衣間 tab
- **THEN** 顯示「即將推出，敬請期待」說明，不渲染裝扮卡片

### Requirement: Deep-link 開啟換衣間 Tab
P1Home SHALL 支援 `payload.openWardrobe: true` 自動切換到換衣間 tab，供購買成功後跳轉使用。

#### Scenario: 購買成功後跳轉
- **WHEN** 購買裝扮成功後點擊「去換裝」
- **THEN** 跳轉 P1 並自動切換到換衣間 tab（非停在食物欄）
