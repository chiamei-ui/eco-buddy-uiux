## ADDED Requirements

### Requirement: 食物欄存量上限
P1 食物欄每格 SHALL 顯示累積存量 Badge，上限為 12 個；每次餵食扣 1，歸零後需重新回收補充。

#### Scenario: 存量達上限
- **WHEN** 某食物格存量達 12
- **THEN** 該格 Badge 顯示「12」，後續同種類回收不再累積進該格（受配額制限制）

#### Scenario: 餵食扣減
- **WHEN** 用戶從食物欄拖曳食物至 Buddy 完成餵食
- **THEN** 該格 Badge 數量 -1

### Requirement: 觸碰角色互動
P1 SHALL 支援直接點擊 Buddy 觸發心情 +1，每日上限 10 次。

#### Scenario: 每日上限內點擊
- **WHEN** 當日點擊 Buddy 次數 < 10
- **THEN** 心情值 +1 且播放點擊反應動畫（歪頭 / 跳一下 / 揮手 → 自動回 Idle）

#### Scenario: 達上限後點擊
- **WHEN** 當日點擊 Buddy 次數 ≥ 10
- **THEN** 點擊反應動畫照常播放，心情值不再增加

### Requirement: 食物配額制顯示
P1 食物欄 SHALL 反映「每種食物每週上限 5 個、週三 12:00 重置」的配額制；配額用完僅加精神不產生食物。

#### Scenario: 週三 12:00 重置
- **WHEN** 當前時間跨過週三 12:00
- **THEN** 各食物配額計數歸零，食物欄回到可累積狀態

#### Scenario: 下週食物預告顯示時機
- **WHEN** 當前時間 ≥ 週日 12:00
- **THEN** P1 食物欄區域 SHALL 提供入口顯示下週食物種類預告

### Requirement: 道具欄 Sub-Tab 與管理入口
P1 SHALL 提供「食物欄 / 玩具箱 / 換衣間」三個 Sub-Tab；玩具箱顯示可拖曳道具，並提供「管理 ›」按鈕進入 P9 道具背包；換衣間顯示裝扮管理（詳見 wardrobe-tab-ui spec）。Tab 列字體縮小至 13px、padding 改為 `5px 12px` 以容納三個 tab。

#### Scenario: 拖曳道具至 Buddy
- **WHEN** 用戶從玩具箱拖曳道具至 Buddy
- **THEN** 觸發原地使用動畫並更新對應屬性（心情 / 潔淨 / 體力）

#### Scenario: 進入背包管理
- **WHEN** 用戶點擊「管理 ›」
- **THEN** 跳轉至 P9 道具背包

#### Scenario: 三個 Tab 並排顯示
- **WHEN** P1 載入
- **THEN** dock-tabs 顯示三個 tab：食物欄、玩具箱、換衣間，文字不換行不截斷

### Requirement: 免費道具入口
P1 右上角 SHALL 顯示免費道具按鈕，附橘色數字 Badge 顯示今日剩餘次數（上限 5 次），點擊後彈出底部 Sheet → P6 廣告流程。

#### Scenario: 顯示今日剩餘次數
- **WHEN** P1 載入
- **THEN** Badge 顯示「今日剩餘次數 / 5」之數字

#### Scenario: 次數用完
- **WHEN** 今日剩餘次數 = 0
- **THEN** Badge 顯示 0 且按鈕進入禁用樣式（或彈出「明日再來」提示）
