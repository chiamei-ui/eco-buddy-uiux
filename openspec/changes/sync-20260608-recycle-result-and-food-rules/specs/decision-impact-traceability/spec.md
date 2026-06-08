## ADDED Requirements

### Requirement: 會議決策需標示畫面影響
每次新增 PM 決策或會議決策調整時，決策記錄 SHALL 明確列出「牽動畫面」與「調整部分」，讓設計、前端、後端可直接判斷需要同步的文件與實作範圍。

#### Scenario: 新增會議決策
- **WHEN** `docs/decisions/CURRENT.md` 新增一批會議決策
- **THEN** 每條決策 SHALL 包含牽動畫面與調整部分，不得只列口頭結論

#### Scenario: 文件同步
- **WHEN** 某條決策牽動 P1、P2b 或其他畫面
- **THEN** 對應的 `USER_FLOW.md`、`UI_SPEC.md` 或機制文件 SHALL 同步標註該決策來源
