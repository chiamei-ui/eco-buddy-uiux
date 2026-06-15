## Why

現況「帶食物回家」一詞同時指涉兩件不同的事：**投瓶取得行為**（必得體力＋潔淨、有機會換到食物）與**有限資源「食物」**（食物欄、餵食、週配額 #20）。這在機制上是假的——超額投瓶不再產食物（#20），「帶食物回家」卻暗示必有食物。reference 原型已半套漂移：點數來源寫「帶禮物回家累積」、P2b eyebrow 寫「給 Buddy 的禮物」，但按鈕／任務／FAQ 仍用「帶食物回家」，造成命名混用。

## What Changes

- 將指涉**投瓶取得行為**的用語，全站由「帶食物回家」統一改為「帶禮物回家」。
- 明確保留「食物」一詞用於**資源本身**：食物欄、餵食、週配額、食物效果值。禮物（行為）≠ 食物（資源）。
- 更新文案映射來源：CLAUDE.md / AGENTS.md / DESIGN_SYSTEM.md / COPY_TABLE.md 的「回收 / 掃碼 → 帶食物回家」改為「→ 帶禮物回家」。
- 同步 user-visible 文案：dialogues.jsx（hp high/low、foodEmpty）、screens.jsx（P2b 標題、今日陪伴、提示）、app.jsx（P2b label）、UI_SPEC.md、USER_FLOW.md、FAQ.md。
- `foodEmpty` 對話改寫避免「禮物＝必有食物」誤導（如「去帶禮物回家，說不定有好吃的！🍖」）。

## Capabilities

### New Capabilities
（無）

### Modified Capabilities
- `terminology-rename`: 「功能語言轉換」requirement 中「回收 → 帶食物回家」映射改為「回收 → 帶禮物回家」；新增「禮物 vs 食物」邊界規則（行為用禮物、資源用食物）。

## Impact

- **文件規範**：CLAUDE.md、AGENTS.md、docs/design/{DESIGN_SYSTEM,COPY_TABLE,UI_SPEC}.md、docs/product/{USER_FLOW,FAQ}.md
- **hi-fi 原型**：reference/eco-buddy_hi-fi/{dialogues,screens,app}.jsx（編輯後須遞增 index.html 的 `?v=` 版本號）
- **測試**：tests/ 若有斷言「帶食物回家」字串需同步；禁用詞掃描不受影響（禮物非禁用詞）
- **非影響**：食物欄／餵食／週配額／食物效果等「資源」語境維持「食物」；ECOCO 點數命名不動；三帳本計算不變
