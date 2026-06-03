## MODIFIED Requirements

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
