## ADDED Requirements

### Requirement: Phase 3 門號贈禮
系統 SHALL 在 Phase 3 允許用戶以手機門號指定收禮者，不建立好友系統。

#### Scenario: 已註冊門號
- **WHEN** 送禮者輸入已註冊門號並確認贈送
- **THEN** 系統進入贈禮確認與庫存轉移流程

#### Scenario: 未註冊門號
- **WHEN** 送禮者輸入未註冊門號
- **THEN** 系統提供 SMS 或 LINE 邀請連結，不顯示「查無此人」且不建立暫存禮物

### Requirement: 贈禮零和轉移
食物與可贈道具 SHALL 以原子交易從送禮者庫存扣除並增加至收禮者庫存，系統不得額外增發。

#### Scenario: 贈禮成功
- **WHEN** 送禮者庫存足夠且交易確認成功
- **THEN** 同一交易扣除送禮者數量並增加收禮者相同數量

#### Scenario: 庫存不足
- **WHEN** 送禮者確認時庫存不足
- **THEN** 交易失敗且雙方庫存均不變

### Requirement: IAP 商品不可贈送
平台 IAP 商品、entitlement 與課金內容 SHALL NOT 出現在可贈送清單。

#### Scenario: 建立可贈送清單
- **WHEN** 系統載入送禮者持有物
- **THEN** 清單排除裝扮、稀有食物、道具禮包及其他 IAP 課金商品

### Requirement: 受贈來源分帳
後端 SHALL 保存食物與 HP 的取得來源；受贈來源不得計入月底收藏等級的實體獎勵資格。

#### Scenario: 受贈食物被餵食
- **WHEN** 用戶餵食來源為受贈的食物
- **THEN** Buddy 正常獲得體力，但該體力不增加自身回收所得的實體獎勵資格計數

#### Scenario: 自身回收食物被餵食
- **WHEN** 用戶餵食來源為自身回收所得
- **THEN** 系統依正式規則更新可計入實體獎勵資格的來源帳本

### Requirement: 收禮通知與反應
收禮成功後 SHALL 由一般模式通知中心通知收禮者，並在進入遊戲後提供 Buddy 收禮反應。

#### Scenario: 收禮通知
- **WHEN** 贈禮交易完成
- **THEN** 收禮者收到「OOO 送禮物給你囉，快來跟 Buddy 一起玩吧！」通知

#### Scenario: 收禮後進入遊戲
- **WHEN** 收禮者從通知進入遊戲
- **THEN** 系統顯示收到的物品並觸發專屬 Buddy 反應；額外心情值由後台設定值決定
