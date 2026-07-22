## MODIFIED Requirements

### Requirement: App 內數位商品逐項建立 SKU
裝扮、付費玩具、禮包與狀態禮包等 App 內數位商品 SHALL 在 App Store Connect 與 Google Play Console 逐項建立商品並送審。稀有食物不再是可建立的 IAP 商品類別。

#### Scenario: 新增 IAP 商品
- **WHEN** PM 確認一項新的付費玩具、禮包或狀態禮包
- **THEN** 上線排程包含 Apple 與 Google 的 SKU 建立、送審狀態與預計可售日期

#### Scenario: 狀態禮包上架
- **WHEN** PM 完成狀態禮包的可售狀態清單、點數成本與價格決策
- **THEN** 每個可售禮包建立對應 SKU，且前端只對平台回傳可售資料開啟 CTA

## REMOVED Requirements

### Requirement: 稀有食物 IAP 例外
**Reason**: 稀有食物與 W4 特例已退役；食物只可用 ECOCO 點數取得，且必須併入當週共用配額。

**Migration**: 下架 `rare_food_*` SKU 與前端食物 IAP 入口；既有食物商品改為當週食物的點數購買流程，並由共用配額驗證。
