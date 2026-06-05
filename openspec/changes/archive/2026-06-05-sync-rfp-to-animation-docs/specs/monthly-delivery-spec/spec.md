## ADDED Requirements

### Requirement: MONTHLY_SPEC.md 存在於 docs/animation/
`docs/animation/MONTHLY_SPEC.md` SHALL 存在，內容完整對應 RFP v1.0 §2.3 與 §11，涵蓋月度合約逐月交付素材規格與月度循環骨架相容性約束。

#### Scenario: 月度合約開始前對齊交付物
- **WHEN** 簽署月度合約前進行規格對齊
- **THEN** MONTHLY_SPEC.md 列出每月應交付的素材項目（角色骨架 .rev、食物 icon、月初/月底動畫），雙方可直接用此文件確認範疇

#### Scenario: 新月度動畫師使用文件
- **WHEN** 月度合約更換動畫師
- **THEN** MONTHLY_SPEC.md 的骨架相容性約束章節說明前一輪的骨架命名規則，新動畫師可直接沿用

---

### Requirement: 逐月交付素材項目表
文件 SHALL 包含每個月度合約的標準交付清單，含：角色骨架 .rev 原始檔、每月 4 種食物 icon（.svg）、月初誕生動畫、月底結算動畫；並標注哪些為必交付、哪些為條件交付。

#### Scenario: 驗收清單核對
- **WHEN** 窗口設計師驗收月度交付物
- **THEN** MONTHLY_SPEC.md 的交付清單可作為逐項核對依據，不遺漏任何項目

---

### Requirement: 月度骨架相容性約束
文件 SHALL 包含月度循環對首版骨架的設計約束，包含：圖層命名一致性要求（須對應 NAMING.md v1.0）、新月度型態不得修改既有 Artboard 結構、月度驗收前須執行命名規範對照截圖。

#### Scenario: 月度二與月度一骨架相容
- **WHEN** 月度二動畫師交付 .rev 檔
- **THEN** 前端工程師可用同一套命名規則串接，不需改動 Runtime 程式碼
