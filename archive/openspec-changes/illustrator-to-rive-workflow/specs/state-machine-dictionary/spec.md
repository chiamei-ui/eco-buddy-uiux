## ADDED Requirements

### Requirement: State Machine 命名詞典文件
專案 SHALL 維護一份 Rive State Machine 的命名詞典，定義所有 inputs、outputs 的名稱、型別與允許值，作為設計師與工程師的共用單一真理。

#### Scenario: 設計師建立新角色 Rive 檔
- **WHEN** 設計師在 Rive 中建立 State Machine inputs
- **THEN** 所有 input 名稱 MUST 與命名詞典完全一致（含大小寫），不得自行定義新名稱

#### Scenario: 工程師串接前端程式碼
- **WHEN** 工程師參照命名詞典撰寫控制程式碼
- **THEN** 程式碼可直接套用於任何遵守詞典的 `.riv` 檔，無需逐一確認 input 名稱

### Requirement: 命名詞典版本控管
命名詞典 SHALL 有明確的版本號，任何新增或修改 SHALL 經過設計端與工程端雙方確認後才能更新。

#### Scenario: 新增 input 名稱
- **WHEN** 新功能需要新的 State Machine input
- **THEN** 新名稱需在詞典文件中登記，並標記版本號與新增原因，現有 `.riv` 檔不受影響

#### Scenario: 修改現有 input 名稱（Breaking Change）
- **WHEN** 需要重新命名現有 input
- **THEN** 詞典文件 MUST 標記為 Breaking Change，並列出受影響的所有 `.riv` 檔與對應的工程修改範圍
