## ADDED Requirements

### Requirement: P7 詳情固定覆蓋 viewport
P7 年度收藏卡與本月狀態卡的詳情 overlay SHALL 固定覆蓋 App viewport，不得以 P7 可捲動內容高度或目前捲動位置作為定位基準。

#### Scenario: 捲動後開啟已解鎖卡片
- **WHEN** 用戶將 P7 捲動至任意位置後點擊已解鎖狀態卡
- **THEN** overlay 完整覆蓋 viewport，詳情彈窗置中且不隨背景內容位移

#### Scenario: 點擊年度收藏卡
- **WHEN** 用戶點擊已收藏的月份卡片
- **THEN** 年度詳情 overlay 完整覆蓋 viewport，顯示位置不受 P7 捲動位置影響

### Requirement: P7 詳情開啟時鎖住背景捲動
任一 P7 詳情 overlay 開啟期間，P7 背景 SHALL 禁止垂直捲動；關閉 overlay 後 SHALL 恢復捲動，並保留開啟前的位置。

#### Scenario: overlay 開啟期間滑動
- **WHEN** P7 詳情 overlay 已開啟且用戶在畫面上滑動
- **THEN** 背景內容保持原位，不發生捲動

#### Scenario: 關閉 overlay
- **WHEN** 用戶關閉 P7 詳情 overlay
- **THEN** P7 恢復可捲動，且停留在開啟詳情前的捲動位置
