## ADDED Requirements

### Requirement: 玩具 tab 管理頁快捷連結
P4 商店玩具 tab 在 Phase 2 時，SHALL 在 tab 內容區頂部右側顯示「查看我的玩具箱 ›」文字連結，點擊導向 `p9`（P9Bag 玩具管理頁）。

#### Scenario: 點擊查看玩具箱連結
- **WHEN** Phase 2、用戶在玩具 tab、點擊「查看我的玩具箱 ›」
- **THEN** 畫面導向 `p9`

#### Scenario: Phase 1 不顯示玩具連結
- **WHEN** `shopPhase < 2` 且用戶在玩具 tab
- **THEN** 不顯示管理頁連結

### Requirement: 裝扮 tab 管理頁快捷連結
P4 商店裝扮 tab 在 Phase 2 時，SHALL 在 tab 內容區頂部右側顯示「查看我的裝扮 ›」文字連結，點擊導向 `wardrobe-manage`。

#### Scenario: 點擊查看裝扮連結
- **WHEN** Phase 2、用戶在裝扮 tab、點擊「查看我的裝扮 ›」
- **THEN** 畫面導向 `wardrobe-manage`

#### Scenario: Phase 1 不顯示裝扮連結
- **WHEN** `shopPhase < 2` 且用戶在裝扮 tab
- **THEN** 不顯示管理頁連結
