## ADDED Requirements

### Requirement: 結果頁標題分層入場
P2b 與 P12 的結果頁標題 SHALL 依序呈現中央光暈、旋轉放射光、標題字與星星，且兩頁使用一致的主要節奏。

#### Scenario: 一般動態偏好
- **WHEN** 使用者進入 P2b 或 P12 結果頁
- **THEN** 中央光暈先跳出，放射光接續旋轉展開，標題字再跳出，最後星星錯落出現

### Requirement: 動態完成狀態穩定
結果頁標題動畫 MUST 在主要演出結束後維持完整、清晰且不持續旋轉的靜態狀態。

#### Scenario: 入場動畫播放完成
- **WHEN** 標題入場動畫完成
- **THEN** 光暈、放射光、標題字與星星全部維持可見，標題與放射光停止移動

### Requirement: 減少動態效果
結果頁標題 MUST 尊重作業系統的減少動態效果偏好。

#### Scenario: 使用者要求減少動態
- **WHEN** `prefers-reduced-motion` 設為 `reduce`
- **THEN** 所有標題分層直接顯示完成狀態，不播放跳出或旋轉動畫
