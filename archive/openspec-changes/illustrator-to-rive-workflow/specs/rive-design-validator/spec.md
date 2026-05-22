## ADDED Requirements

### Requirement: 拖曳載入 `.riv` 檔
預覽器 SHALL 支援設計師將 `.riv` 檔拖曳至網頁，即時渲染動畫，無需安裝任何軟體。

#### Scenario: 成功載入有效的 .riv 檔
- **WHEN** 設計師拖曳一個合法的 `.riv` 檔至預覽器
- **THEN** 動畫在 2 秒內開始播放，並顯示該檔案的 State Machine inputs 清單

#### Scenario: 載入無效檔案
- **WHEN** 設計師拖曳非 `.riv` 格式的檔案
- **THEN** 預覽器顯示明確的錯誤訊息，不崩潰

### Requirement: 36 種角色型態切換
預覽器 SHALL 提供 HP × 潔淨度 × 心情值的三維切換介面，讓設計師即時預覽對應型態。

#### Scenario: 切換型態
- **WHEN** 設計師調整 HP（高/標/低）、潔淨度（高/標/低）、心情值（MAX/高/標/低）
- **THEN** Rive State Machine 接收對應 input 值，角色動畫即時切換至對應型態，無需重新載入

#### Scenario: 顯示當前型態資訊
- **WHEN** 設計師切換到某個型態組合
- **THEN** 介面顯示對應的型態編號（01–36）與型態名稱（如「傳說英雄」）

### Requirement: 裝備與配件套用
預覽器 SHALL 支援載入額外的裝備/配件 `.riv` 或圖層，疊加於角色之上，讓設計師驗證視覺組合。

#### Scenario: 套用裝備
- **WHEN** 設計師選擇一個裝備配件
- **THEN** 裝備疊加顯示於角色上，Z-index 層級正確，無破圖

#### Scenario: Z-index 驗證失敗
- **WHEN** 裝備與角色部位的 Z-index 發生衝突（如帽子被身體蓋住）
- **THEN** 預覽器高亮顯示衝突區域，並提示設計師調整圖層順序

### Requirement: 動畫狀態播放控制
預覽器 SHALL 提供播放、暫停、速度調整控制，讓設計師逐格檢查動畫。

#### Scenario: 暫停與逐格檢查
- **WHEN** 設計師點擊暫停並使用逐格按鈕
- **THEN** 動畫停在當前幀，每次點擊前進一幀
