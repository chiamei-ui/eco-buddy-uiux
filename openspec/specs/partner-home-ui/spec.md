## Purpose
P1 夥伴首頁 UI 規格——食物欄、道具欄、觸碰互動、Header 等元素的顯示與行為要求。

## Requirements

### Requirement: 食物欄存量上限
P1 食物欄每格 SHALL 顯示累積存量 Badge，上限值 SHALL 從 API 欄位 `[API: food_slot_max_count]` 讀取（預設參考值 12）；每次餵食扣 1，歸零後需重新回收補充。前端 SHALL NOT hardcode 數字 12。

#### Scenario: 存量達上限
- **WHEN** 某食物格存量達 `[API: food_slot_max_count]` 上限
- **THEN** 該格 Badge 顯示上限數值，後續同種類回收不再累積進該格（受配額制限制）

#### Scenario: 餵食扣減
- **WHEN** 用戶從食物欄拖曳食物至 Buddy 完成餵食
- **THEN** 該格 Badge 數量 -1

### Requirement: 觸碰角色互動
P1 SHALL 支援直接點擊 Buddy 觸發心情值增加，每次增加量 `[API: tap_mood_gain]`（預設參考值 1），每日上限 `[API: tap_daily_limit]` 次（預設參考值 10）。前端 SHALL NOT hardcode 這兩個數字。

#### Scenario: 每日上限內點擊
- **WHEN** 當日點擊 Buddy 次數 < `[API: tap_daily_limit]`
- **THEN** 心情值 +`[API: tap_mood_gain]` 且播放點擊反應動畫（歪頭 / 跳一下 / 揮手 → 自動回 Idle）

#### Scenario: 達上限後點擊
- **WHEN** 當日點擊 Buddy 次數 ≥ `[API: tap_daily_limit]`
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
P1 SHALL 提供「食物欄 / 玩具箱 / 換衣間」三個 Sub-Tab；玩具箱顯示可拖曳道具，並提供「管理 ›」按鈕進入 P9 道具背包；換衣間顯示裝扮管理（詳見 wardrobe-tab-ui spec）。Tab 列字體縮小至 13px、padding 改為 `5px 12px` 以容納三個 tab。Sub-Tab 不顯示任何副標文字，拖曳引導改由點擊格子時的 Buddy 對話泡泡提供。

#### Scenario: 拖曳道具至 Buddy
- **WHEN** 用戶從玩具箱拖曳道具至 Buddy
- **THEN** 觸發原地使用動畫並更新對應屬性（心情 / 潔淨 / 體力）

#### Scenario: 進入背包管理
- **WHEN** 用戶點擊「管理 ›」
- **THEN** 跳轉至 P9 道具背包

#### Scenario: 三個 Tab 並排顯示
- **WHEN** P1 載入
- **THEN** dock-tabs 顯示三個 tab：食物欄、玩具箱、換衣間，文字不換行不截斷

#### Scenario: Sub-Tab 無副標文字
- **WHEN** 用戶切換至食物欄或玩具箱 Sub-Tab
- **THEN** Sub-Tab 標題列下方不顯示任何說明性副標文字

### Requirement: Header 用戶頭像可點擊視覺線索
P1 Header 右上角用戶頭像 SHALL 顯示橘色 2px border 與右下角 ⚙ overlay icon，讓用戶辨識該元素可點擊，路由行為不變（點擊進入「我的」頁）。

#### Scenario: 頭像橘色 border 顯示
- **WHEN** P1 Header 載入
- **THEN** 用戶頭像圓形外框顯示 2px 橘色（`#FF5000`）border

#### Scenario: ⚙ overlay icon 顯示
- **WHEN** P1 Header 載入
- **THEN** 頭像右下角顯示 ⚙ 小 icon overlay（白底橘色，尺寸約 16px），不遮擋頭像主體

#### Scenario: 點擊頭像仍進入「我的」頁
- **WHEN** 用戶點擊頭像（含 border 區域）
- **THEN** 路由跳轉至「我的」頁，行為與修改前一致

### Requirement: 免費道具入口
P1 右上角 SHALL 顯示免費道具按鈕，附橘色數字 Badge 顯示今日剩餘次數（上限 5 次），點擊後彈出底部 Sheet → P6 廣告流程。

#### Scenario: 顯示今日剩餘次數
- **WHEN** P1 載入
- **THEN** Badge 顯示「今日剩餘次數 / 5」之數字

#### Scenario: 次數用完
- **WHEN** 今日剩餘次數 = 0
- **THEN** Badge 顯示 0 且按鈕進入禁用樣式（或彈出「明日再來」提示）
