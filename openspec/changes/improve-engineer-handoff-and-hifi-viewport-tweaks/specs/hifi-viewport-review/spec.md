## ADDED Requirements

### Requirement: Hi-fi 原型需支援三種手機尺寸檢查
`reference/eco-buddy_hi-fi/index.html` 的 tweaks 區 SHALL 提供小、中、大三種手機尺寸切換，讓設計端可在同一個預覽入口檢查畫面差異。

#### Scenario: 切換標準尺寸
- **WHEN** 使用者在 tweaks 區選擇標準尺寸
- **THEN** hi-fi 手機框 SHALL 顯示 390 x 844 的主設計尺寸

#### Scenario: 切換小尺寸
- **WHEN** 使用者在 tweaks 區選擇小尺寸
- **THEN** hi-fi 手機框 SHALL 顯示 360 x 780 的檢查尺寸

#### Scenario: 切換大尺寸
- **WHEN** 使用者在 tweaks 區選擇大尺寸
- **THEN** hi-fi 手機框 SHALL 顯示 430 x 932 的檢查尺寸

### Requirement: 尺寸切換不得改變正式頁面邏輯
手機尺寸切換 SHALL 只作為 hi-fi review 工具，不得改變 Buddy 狀態、購買狀態、API mock 或頁面流程邏輯。

#### Scenario: 切換尺寸後保留目前頁面
- **WHEN** 使用者在任一頁切換手機尺寸
- **THEN** 系統 SHALL 保留目前頁面與 tweaks 狀態，只調整手機框尺寸
