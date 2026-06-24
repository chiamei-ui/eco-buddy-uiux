## ADDED Requirements

### Requirement: 登入自動簽到
系統 SHALL 在用戶當日首次實際開啟 App 時自動完成當日簽到，不要求用戶手動領取。

#### Scenario: 當日首次登入
- **WHEN** 用戶在一個曆日內首次實際開啟 App
- **THEN** 系統自動記錄當日簽到並更新七日進度

#### Scenario: 當日重複登入
- **WHEN** 用戶於同一曆日再次開啟 App
- **THEN** 系統維持既有當日簽到，不重複增加進度

### Requirement: 免費補昨天
P5 SHALL 允許用戶免費補簽昨天，補簽不設累計次數上限，但 SHALL NOT 補簽前天或更早日期。

#### Scenario: 昨天漏登可補簽
- **WHEN** 用戶今天登入且昨天沒有簽到紀錄
- **THEN** P5 顯示補簽 CTA，完成後昨天記錄補齊且七日進度即時更新

#### Scenario: 更早日期不可補簽
- **WHEN** 用戶存在前天或更早的缺口
- **THEN** 系統不提供該日期補簽操作

### Requirement: 個人化七日循環
連續登入 SHALL 採個人化第 1–7 天循環，不綁自然週；第 7 天達標後次日進度回到第 1 天。

#### Scenario: 完成七日循環
- **WHEN** 用戶第 1–7 天均有有效簽到
- **THEN** 第 7 天達標並觸發 Rive 派對動物狀態，下一個有效登入日從第 1 天重新計算

#### Scenario: 漏一天後補昨天
- **WHEN** 用戶僅漏昨天且今天完成補簽
- **THEN** 七日進度不中斷

#### Scenario: 漏兩天以上
- **WHEN** 用戶登入時存在無法補簽的較早缺口
- **THEN** 舊進度廢棄，當日登入記為新循環第 1 天

### Requirement: 派對動物維持至月底
七日達標後 `has_disco` SHALL 維持為 `true` 至月底結算，不因七日進度重置或後續漏登而取消。

#### Scenario: 第八天進度重算
- **WHEN** 用戶已於本月達成七日循環且進度回到第 1 天
- **THEN** `has_disco` 仍維持為 `true`

#### Scenario: 月底重置
- **WHEN** 後端執行月底特殊狀態結算
- **THEN** `has_disco` 重置為 `false`

### Requirement: 簽到與其他 Rive 狀態分離
簽到進度 SHALL 與潔癖大師及壞滅核心的判定分離；補簽不得改寫實際開啟 App 的日期。

#### Scenario: 潔癖大師獨立判定
- **WHEN** 用戶達成派對動物但未達潔淨連續七日門檻
- **THEN** 系統只啟用 `has_disco`，不自動啟用 `has_laurel`

#### Scenario: 壞滅核心依實際未登入判定
- **WHEN** 簽到進度因漏登重置，但用戶仍有實際開啟 App
- **THEN** 該次重置不計為 Rive #33 的 30 天未登入
