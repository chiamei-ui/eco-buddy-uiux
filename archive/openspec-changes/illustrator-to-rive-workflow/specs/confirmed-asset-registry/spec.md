## ADDED Requirements

### Requirement: 設計師確認並登錄已驗證素材
預覽器 SHALL 提供「確認登錄」功能，讓設計師在驗證通過後，將角色型態、動態或裝備標記為「設計端已確認」，並自動寫入 `registry/` 結構化索引。

#### Scenario: 登錄已確認的角色型態
- **WHEN** 設計師在預覽器中驗證某型態無誤，點擊「確認登錄」
- **THEN** 系統在 `registry/characters/<name>/spec.json` 建立或更新記錄，包含型態編號、名稱、對應 `.riv` 檔路徑、確認日期

#### Scenario: 重複登錄同一型態
- **WHEN** 設計師再次登錄已存在的型態
- **THEN** 系統提示「已存在，是否覆蓋？」，確認後更新記錄並保留舊版快照

### Requirement: Registry 結構化索引
`registry/` 目錄 SHALL 依類別分目錄組織，並提供人類可讀的 Markdown 說明與機器可讀的 JSON 索引。

#### Scenario: 查詢已確認素材清單
- **WHEN** 設計師或工程師執行 `npm run registry:list`
- **THEN** 終端機輸出所有已確認素材的清單，包含類別、名稱、確認日期、對應檔案路徑

#### Scenario: 新角色開發參照範本
- **WHEN** 設計師開發新角色，需要參照已確認的裝備規格
- **THEN** 可在 `registry/accessories/<name>/spec.md` 找到對應的圖層結構、命名規則、Z-index 設定記錄

### Requirement: Registry 作為工程交付的參照基準
`registry/` 中的已確認素材 SHALL 作為工程師實作前端邏輯的規格依據，確保設計與工程對齊。

#### Scenario: 工程師查閱型態規格
- **WHEN** 工程師需要實作特定型態的觸發邏輯
- **THEN** 可在 `registry/characters/<name>/spec.json` 找到對應的 State Machine input 值組合與觸發條件
