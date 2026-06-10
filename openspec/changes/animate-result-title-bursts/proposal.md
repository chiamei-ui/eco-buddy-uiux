## Why

P2b 與 P12 的結果頁標題目前只有整張圖片縮放進場，既有的放射光與星星沒有形成分層演出，完成回饋的驚喜感不足。需要讓兩頁共用一致、短促且可降級的慶祝動態。

## What Changes

- 將 P2b、P12 標題 SVG 拆成光暈、放射光、標題字、星星四個動畫階段。
- 入場順序統一為：光暈跳出、放射光旋轉展開、標題字跳出、星星錯落跳出。
- 保留現有 SVG 與 `<img>` 使用方式，不新增動畫 runtime。
- 支援 `prefers-reduced-motion`，使用者要求減少動態時直接呈現完成狀態。

## Capabilities

### New Capabilities
- `result-title-burst-animation`: 定義結果頁標題的分層入場順序、節奏與減少動態效果行為。

### Modified Capabilities

## Impact

- `reference/eco-buddy_hi-fi/assets/p2b-title.svg`
- `reference/eco-buddy_hi-fi/assets/p12-title.svg`
- `reference/eco-buddy_hi-fi/styles.css`
- 不影響 API、資料結構、Rive 角色動畫或正式 App runtime。
