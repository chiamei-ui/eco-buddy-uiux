## ADDED Requirements

### Requirement: P5 七日登入進度
P5 Header SHALL 顯示個人化第 1–7 天登入進度與派對動物達標狀態，不以自然週曆呈現。

#### Scenario: 循環進行中
- **WHEN** 用戶七日循環尚未達標
- **THEN** P5 顯示目前位於第 N 天及距第 7 天的進度

#### Scenario: 本月已達標
- **WHEN** `has_disco=true`
- **THEN** P5 顯示本月已解鎖派對動物，七日進度仍可顯示新循環

### Requirement: P5 補簽 CTA
P5 SHALL 僅在昨天可補簽時顯示免費補簽 CTA。

#### Scenario: 昨天可補簽
- **WHEN** 昨天缺少簽到且不存在更早的不可補缺口
- **THEN** P5 顯示「補簽」CTA，且不得顯示價格或道具需求

#### Scenario: 無可補日期
- **WHEN** 昨天已簽到或缺口早於昨天
- **THEN** P5 不顯示可操作的補簽 CTA

### Requirement: P5 補簽結果即時更新
補簽成功後 P5 SHALL 立即刷新進度與達標狀態。

#### Scenario: 補簽完成七日
- **WHEN** 補簽成功使七日條件達標
- **THEN** P5 立即顯示第 7 天完成並呈現派對動物解鎖回饋
