## Requirements

### Requirement: 禮包訂單展開詳細內容
`p4-orders` 訂單列表中，商品為禮包或月度通行證類型的訂單（可透過 `order.name` 比對 `SHOP_IAP_CONFIG` 識別），SHALL 支援點擊展開 accordion 顯示商品內容物清單（`contents` 陣列）或權益清單（`benefits` 陣列）。展開時顯示向下箭頭，收合時顯示向右箭頭。無法比對到商品資料時，不顯示展開箭頭。

#### Scenario: 禮包訂單顯示展開箭頭
- **WHEN** 訂單可比對到 `SHOP_IAP_CONFIG` 中有 `contents` 或 `benefits` 的商品
- **THEN** 訂單卡片右側 SHALL 顯示展開箭頭（›）

#### Scenario: 點擊展開顯示內容物
- **WHEN** 用戶點擊有 `contents` 的禮包訂單（如衝刺禮包）
- **THEN** 卡片下方 SHALL 展開顯示內容物清單，每項含 emoji 與名稱

#### Scenario: 點擊展開顯示權益
- **WHEN** 用戶點擊有 `benefits` 的通行證訂單（如月度通行證）
- **THEN** 卡片下方 SHALL 展開顯示權益清單，每項含說明文字

#### Scenario: 再次點擊收合
- **WHEN** 用戶點擊已展開的禮包訂單
- **THEN** 詳細內容 SHALL 收合，箭頭恢復向右

#### Scenario: 無資料不顯示箭頭
- **WHEN** 訂單無法比對到 `SHOP_IAP_CONFIG` 或商品無 `contents`/`benefits`
- **THEN** 訂單卡片不顯示展開箭頭，行為與一般訂單相同
