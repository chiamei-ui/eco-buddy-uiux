## MODIFIED Requirements

### Requirement: 食物配額制顯示
P1 食物欄 SHALL 反映「食物由回收取得、受後台設定上限限制」的規則；名稱「食物欄」目前為內部代稱，最終用戶可見名稱 SHALL 由 PM 另行定名。食物格數量與上限 SHALL 依 API 回傳，不得由前端自行推算。

**MODIFIED**：2026-06-08 決策標記「食物欄」名稱待調整，並將食物取得規則改為 N 個資收物 = N 個食物、受後台上限限制。

#### Scenario: 食物欄名稱待定
- **WHEN** 文件或設計稿提到 P1 食物欄
- **THEN** SHALL 標註該名稱為內部代稱或待 PM 定名，不得把「食物欄」視為最終用戶文案

#### Scenario: 回收後食物入帳
- **WHEN** P2b 回傳本次新增食物數量
- **THEN** P1 食物欄 SHALL 依 API 結果更新食物格 Badge

#### Scenario: 食物達上限
- **WHEN** 某食物已達後台設定上限
- **THEN** P1 食物欄 SHALL 顯示上限狀態，後續回收不再增加該食物 Badge

### Requirement: P2b 返回後潔淨增量動畫
P1 SHALL 支援從 P2b 返回時顯示潔淨增量動畫，動畫文字為「+N 潔淨」，位置應靠近 Buddy 或潔淨狀態條。

#### Scenario: 顯示潔淨增量動畫
- **WHEN** P1 接收到 P2b 返回 payload 的 `clean_delta`
- **THEN** P1 SHALL 播放「+N 潔淨」動畫

#### Scenario: 無潔淨增量
- **WHEN** `clean_delta` 為 0 或不存在
- **THEN** P1 SHALL NOT 播放潔淨增量動畫
