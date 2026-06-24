## Purpose
定義一般模式首頁 Buddy 懸浮入口：顯示條件、素材模式、首次／回訪路由與入口文案規則。

## Requirements

### Requirement: 一般模式首頁 Buddy 懸浮入口
一般模式首頁 SHALL 顯示可由後台控制的懸浮圓形入口，主視覺使用當月 Buddy 臉部。

#### Scenario: 入口啟用
- **WHEN** 後台設定符合顯示條件
- **THEN** 一般模式首頁顯示 Buddy 臉部圓形懸浮入口

#### Scenario: 入口停用
- **WHEN** 後台關閉入口或用戶不符合觸發條件
- **THEN** 一般模式首頁不顯示該入口

### Requirement: 入口素材模式可設定
後台 SHALL 支援當月 Buddy 臉部靜態、極輕量 loop 與 GIF 備選三種模式，前端依設定渲染。

#### Scenario: 當月 Buddy 模式
- **WHEN** 後台選擇當月 Buddy 臉部模式
- **THEN** 入口隨當月角色設定更新，不要求額外製作獨立入口角色

#### Scenario: GIF 備選模式
- **WHEN** 後台選擇 GIF 模式且素材有效
- **THEN** 前端顯示指定 GIF；素材載入失敗時回退當月 Buddy 靜態臉部

### Requirement: 首次與回訪路由
入口 SHALL 依用戶是否完成遊戲介紹決定跳轉目標。

#### Scenario: 首次進入
- **WHEN** 用戶尚未完成遊戲介紹並點擊入口
- **THEN** 跳轉遊戲介紹頁

#### Scenario: 回訪進入
- **WHEN** 用戶已完成遊戲介紹並點擊入口
- **THEN** 直接跳轉 P1 夥伴首頁

### Requirement: 入口文案使用 Buddy 世界語言
入口可見文案 SHALL 使用陪伴語氣，不得使用「進入遊戲」或「任務」。

#### Scenario: 顯示入口提示
- **WHEN** 入口需要搭配提示文字
- **THEN** 使用如「Buddy 在等你」的文案，不顯示禁用功能語言
