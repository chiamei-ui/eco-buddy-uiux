## ADDED Requirements

### Requirement: P1 狀態名稱顯示流水編號
P1 角色資訊列 SHALL 以 `#N 狀態名稱` 格式顯示 Buddy 狀態，編號對應 Rive 狀態規格；工程 state key 不變。

#### Scenario: 顯示一般狀態
- **WHEN** P1 收到可識別的 Buddy 狀態編號與名稱
- **THEN** 角色資訊列顯示例如「#6 開心」的文字

#### Scenario: 狀態編號缺失
- **WHEN** 狀態資料缺少有效 Rive 編號
- **THEN** 前端顯示狀態名稱並記錄資料異常，不自行猜測編號

### Requirement: P1 下週食物預告欄
P1 Buddy 的餐袋 SHALL 提供下週食物預告欄，只顯示食物種類，不顯示數量。

#### Scenario: 預告時段
- **WHEN** 當前時間進入週日 12:00 至週三 12:00 的預告時段且有下週排程資料
- **THEN** P1 顯示下週食物種類預告

#### Scenario: 無有效排程
- **WHEN** 預告時段內無法取得有效的下週食物種類
- **THEN** P1 不自行推測食物種類，顯示安全空狀態或隱藏預告內容

#### Scenario: 不顯示數量
- **WHEN** P1 顯示下週食物預告
- **THEN** 預告只包含種類資訊，不顯示預計可得數量或個人配額
