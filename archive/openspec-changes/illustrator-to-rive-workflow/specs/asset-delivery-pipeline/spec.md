## ADDED Requirements

### Requirement: `/datameta-scan` 自動掃描並產出資產清單
專案 SHALL 提供 `npm run datameta-scan` 指令，自動掃描 `registry/` 目錄，產出結構化的資產清單 Markdown 文件。

#### Scenario: 執行掃描產出清單
- **WHEN** 設計師執行 `npm run datameta-scan`
- **THEN** 腳本掃描所有 `registry/**/*.json`，產出 `output/asset-manifest.md`，包含所有已確認素材的完整清單與規格摘要

#### Scenario: 無已確認素材時執行
- **WHEN** `registry/` 目錄為空或無有效 JSON 時執行掃描
- **THEN** 腳本輸出警告「尚無已確認素材」，不產生空文件

### Requirement: 交付包組成
交付給工程師的素材包 SHALL 包含：已確認的 `.riv` 檔、資產清單 Markdown、State Machine 命名詞典的當前版本。

#### Scenario: 準備交付包
- **WHEN** 設計師執行 `npm run delivery:pack`
- **THEN** 腳本將 `registry/` 中所有已確認素材的 `.riv` 檔、`output/asset-manifest.md` 與命名詞典複製至 `delivery/<date>/` 目錄，並壓縮為 zip

#### Scenario: 交付包完整性驗證
- **WHEN** 交付包產生後
- **THEN** 腳本輸出每個素材的狀態（已確認/缺少 .riv 檔），若有缺失則警告並列出清單，不自動排除

### Requirement: 資產清單包含工程師所需的技術資訊
資產清單 SHALL 包含每個素材的：名稱、類別、對應 `.riv` 路徑、State Machine input 值、Z-index 層級順序、確認日期。

#### Scenario: 工程師使用清單實作
- **WHEN** 工程師閱讀資產清單
- **THEN** 不需額外詢問設計師，即可根據清單中的 State Machine input 值實作對應的觸發邏輯
