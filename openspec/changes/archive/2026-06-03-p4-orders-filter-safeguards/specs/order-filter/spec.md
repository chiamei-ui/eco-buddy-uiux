## ADDED Requirements

### Requirement: 訂單列表頁提供狀態篩選列
`p4-orders` 頁面標題下方 SHALL 顯示狀態篩選 Chip 列，選項為：全部 / 已完成 / 處理中 / 失敗。預設選中「全部」。

#### Scenario: 預設顯示全部訂單
- **WHEN** 用戶進入 `p4-orders` 頁面
- **THEN** 篩選列 SHALL 預設選中「全部」，列表顯示所有訂單

#### Scenario: 選擇狀態篩選
- **WHEN** 用戶點擊「已完成」、「處理中」或「失敗」Chip
- **THEN** 列表 SHALL 只顯示對應 `status` 的訂單，被選中的 Chip SHALL 呈現強調樣式（橘底白字）

#### Scenario: 切換回全部
- **WHEN** 用戶點擊「全部」Chip
- **THEN** 列表 SHALL 恢復顯示所有訂單

### Requirement: 篩選後無符合訂單時顯示對應空狀態
當篩選結果為空時，SHALL 顯示針對該篩選的提示文字（而非通用空狀態）。

#### Scenario: 篩選「失敗」無結果
- **WHEN** 用戶篩選「失敗」且無失敗訂單
- **THEN** SHALL 顯示「太好了，沒有失敗的訂單！」

#### Scenario: 篩選「處理中」無結果
- **WHEN** 用戶篩選「處理中」且無處理中訂單
- **THEN** SHALL 顯示「目前沒有處理中的訂單」

#### Scenario: 篩選「已完成」無結果
- **WHEN** 用戶篩選「已完成」且無已完成訂單
- **THEN** SHALL 顯示「還沒有完成的購買」
