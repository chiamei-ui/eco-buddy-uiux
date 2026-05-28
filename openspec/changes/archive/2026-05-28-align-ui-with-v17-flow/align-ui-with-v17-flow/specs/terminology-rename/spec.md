## MODIFIED Requirements

### Requirement: 底部 Tab 文案
底部 Tab Bar SHALL 以兩字精簡標籤顯示：「🐾 夥伴」「🛒 商店」「✅ 陪伴」「📖 日誌」。P5、P7 頁面內部標題 SHALL 維持完整稱呼「今日陪伴」「夥伴日誌」。

**MODIFIED**：Tab Bar 文字維持兩字版面，包含 hi-fi prototype 中底部 Tab SVG 圖片資產的文字節點，必須與 aria-label 同步更新；頁面內 h2 標題使用全名。

#### Scenario: Tab 文字精簡為兩字
- **WHEN** 用戶查看底部 Tab Bar
- **THEN** Tab 文字精確為「夥伴」「商店」「陪伴」「日誌」，不出現「任務」「圖鑑」「今日陪伴」「夥伴日誌」

#### Scenario: SVG 資產文字同步
- **WHEN** hi-fi prototype 載入任意 Tab 狀態 SVG（buddy / shop / mission / dex）
- **THEN** SVG 中第三 Tab 顯示「陪伴」，第四 Tab 顯示「日誌」

#### Scenario: aria-label 採全名
- **WHEN** TabBar 元件渲染
- **THEN** 對應按鈕的 aria-label 分別為「今日陪伴」與「夥伴日誌」（無障礙朗讀使用全名）

#### Scenario: 頁面內標題仍用全名
- **WHEN** 用戶進入 P5 或 P7
- **THEN** 頁面 h2 顯示「今日陪伴」「夥伴日誌」全名

### Requirement: 工程師語言禁用
全站對用戶可見文案 SHALL NOT 出現「Phase 2」「即將推出」「SDK 接管」「TODO」「Coming soon」等工程師語言。

**MODIFIED**：hi-fi P5 Tab 鎖定區塊的「Phase 2 即將開放」佔位文案 SHALL 移除或替換為 Buddy 語言友善提示。

#### Scenario: P5 週/月任務空狀態
- **WHEN** 用戶切換至本週或月度任務 Tab
- **THEN** 頁面 SHALL NOT 出現「Phase 2」「即將開放」字樣，顯示友善空狀態文案（如「本週陪伴任務，敬請期待！」）

#### Scenario: 禁用詞全域檢查
- **WHEN** 任何對用戶可見的 UI 文字
- **THEN** SHALL NOT 出現「HP」「潔淨度」「Phase 2」「即將推出」「SDK 接管」
