## REMOVED Requirements

### Requirement: P1 用戶問候列
**Reason**: 靜態文字佔用畫面空間，Buddy 情感由對話泡泡承載，問候列與其功能重複。
**Migration**: 直接刪除問候列 DOM 節點，佈局由 Header 直接銜接屬性圓形 Icon 列，無需替代元件。

## MODIFIED Requirements

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

## ADDED Requirements

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
