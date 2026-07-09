# 揭曉頁動態規格（P2b / P12 / P6）

> 對象：前端工程師（@shangchian）
> 目的：把三個「揭曉／開箱」畫面的整頁進場動態，逐層、逐毫秒交付，讓 production 前端可 1:1 還原 hi-fi 原型。
> 唯一事實來源：hi-fi 原型 [reference/eco-buddy_hi-fi/styles.css](../../reference/eco-buddy_hi-fi/styles.css) 與三個標題 SVG。本文件為導讀＋數值彙整，數值以 styles.css 為準。

---

## 0. 三個前提（先讀）

1. **標題動畫「自帶」在 SVG 檔內**：三畫面標題都是單一動畫 SVG，光暈／光芒／中文字／星四層動畫寫在 SVG 內部的 `<style>`，載入即自動播放一次，**不受頁面 JS/CSS 控制**。前端只要把 SVG 當 `<img>` 放進去，choreography 就跑。三檔：
   - P2b → [assets/p2b-title.svg](../../reference/eco-buddy_hi-fi/assets/p2b-title.svg)
   - P12 → [assets/p12-title.svg](../../reference/eco-buddy_hi-fi/assets/p12-title.svg)
   - P6 → [assets/p6/p6-title.svg](../../reference/eco-buddy_hi-fi/assets/p6/p6-title.svg)
2. **頁面層動畫在 styles.css**：龜／玩具／獎勵卡／效果列的進場，由頁面 CSS 控制（下面各表）。
3. **數值一律讀 API，勿寫死**：文中 `+99`、`8~15`、廣告 15 秒、開箱結果等都是 demo 值。體力／潔淨／點數、道具效果、廣告時長、開箱掉落一律讀後端欄位（見 [CLAUDE.md 動態數值規則] 與 [GAME_MECHANICS.md](GAME_MECHANICS.md)）。**開箱機率抽取在後端，前端只送 request、播動畫、顯示結果。**

時間軸原點 `t=0` = 該畫面（或該 step）掛載當下。所有 `delay/dur` 單位 ms。

---

## 1. 共用標題動畫（三畫面一致）

三個標題 SVG 用**同一組**四層規格（P6 已於 2026-07-09 統一比照 P2b/P12）。此段動畫在 SVG 內部，時間軸相對於「SVG 載入時」＝畫面 `t=0`。

| 順序 | 層 | keyframe | dur | delay | easing | 起訖(ms) |
|---|---|---|---|---|---|---|
| 1 | 光暈 glow | `resultGlowIn` | 520 | 40 | `cubic-bezier(.16,1,.3,1)` | 40–560 |
| 2 | 光芒 rays | `resultRaysIn` | 720 | 130 | `cubic-bezier(.16,1,.3,1)` | 130–850 |
| 3 | 中文標題 title | `resultTitleIn` | 520 | 430 | `cubic-bezier(.18,1.25,.32,1)` | 430–950 |
| 4 | 星 stars | `resultStarIn` | 420 | 720 | `cubic-bezier(.18,1.45,.32,1)` | 720–1140 |

**差異**：
- P2b / P12 的星是**逐顆錯開**（base 720ms，分批 780 / 840 / 900ms），星較有律動。
- P6 的星是**整叢一起 pop**（單一 720ms delay）。若要 P6 也逐顆錯開，改 `p6-title.svg` 內 `<style>` 的 `.p6t-stars` 為逐 path 動畫即可。

keyframe 定義見 §5。

---

## 2. P2b · 感謝贈禮（收瓶機結果頁）

畫面元件：[screens.jsx `P2bResult`](../../reference/eco-buddy_hi-fi/screens.jsx#L792)。內容＝食物（熱狗堡，+體力）＋潔淨。

| 順序 | 元素 | class | keyframe | dur | delay | easing | 起訖(ms) |
|---|---|---|---|---|---|---|---|
| — | 整頁進場 | `.screen.p2b` | `slide-up` | 400 | 0 | `cubic-bezier(.16,1,.3,1)` | 0–400 |
| 1 | 標題（SVG 內建四層） | `.rs-title` | 見 §1 | — | — | — | 40–1140 |
| 2 | Buddy（龜） | `.rs-turtle` | `result-buddy-pop` | 720 | 180 | `cubic-bezier(.2,.9,.25,1.2)` | 180–900 |
| 3 | 獎勵卡 1（食物 / 潔淨） | `.rpc` | `reward-card-glow` | 1000 | 680 | `ease-out` | 680–1680 |
| 4 | 獎勵卡 2 | `.rpc:nth-child(2)` | `reward-card-glow` | 1000 | 800 | `ease-out` | 800–1800 |
| 5 | 配額提示（滿額時） | `.rp-quota-note` | `fade-in` | 400 | 1500 | `ease-out` | 1500–1900 |

備註：
- `.result-scene` 內的 `.rs-rays` / `.rs-stars`（HTML 的 6 顆 `✦`）在原型是 `display:none`，**標題所有裝飾都來自 SVG**，前端不用另做 HTML 星。
- `.rp-info-row`（「謝謝你帶來 N 份禮物」）**無獨立動畫**，隨整頁 `slide-up` 一起上來。
- 滿配額（`quotaFull`）時只出一張潔淨卡（`.rp-cards--single`），並顯示 `.rp-quota-note`。
- 三帳本要分開顯示：卡片明列「體力 +N」「潔淨 +N」，不可併成單一數字。

---

## 3. P12 · 補充感謝（補充站消費結果頁）

畫面元件：[screens-d2.jsx `P12RefillResult`](../../reference/eco-buddy_hi-fi/screens-d2.jsx#L17)。內容＝體力＋潔淨（來自補充站消費）。動畫層與 P2b **完全相同**，差別只在內容與一個 phase：

| 順序 | 元素 | class | keyframe | dur | delay | easing | 起訖(ms) |
|---|---|---|---|---|---|---|---|
| — | 整頁進場 | `.screen.p12` | `slide-up` | 400 | 0 | `cubic-bezier(.16,1,.3,1)` | 0–400 |
| 1 | 標題（SVG 內建四層） | `.rs-title` | 見 §1 | — | — | — | 40–1140 |
| 2 | Buddy（龜） | `.rs-turtle` | `result-buddy-pop` | 720 | 180 | `cubic-bezier(.2,.9,.25,1.2)` | 180–900 |
| 3 | 獎勵卡 1（體力） | `.rpc.rpc--hp` | `reward-card-glow` | 1000 | 680 | `ease-out` | 680–1680 |
| 4 | 獎勵卡 2（潔淨） | `.rpc.rpc--clean` | `reward-card-glow` | 1000 | 800 | `ease-out` | 800–1800 |

phase 機制（`P12RefillResult` 內）：
- 掛載即 `dispatch(REFILL_RESULT)`，`phase` 由 `'counting'` 於 **1600ms** 後切 `'done'`（作為變身等後續判斷的時間點）。
- 無 `.rp-quota-note`。

---

## 4. P6 · 獲得玩具囉（看廣告開箱）

畫面元件：[screens.jsx `P6Ads`](../../reference/eco-buddy_hi-fi/screens.jsx#L2035)。兩個 step。

### Step 1 — 廣告

| 元素 | class | 行為 |
|---|---|---|
| 廣告版位 | `.p6 .ad-screen` / `.ad-mock` | 無進場動畫，純播放 |
| 倒數 | （JS `setInterval` 1s） | demo 15 秒遞減；**正式版時長由廣告 SDK 決定** |
| 跳過 / 領取 | `.skip` → `.skip.ready` | 倒數歸零後變 `.ready` 可點，觸發開箱並進 step 2 |

**正式版**：開箱結果（掉落哪個玩具、保底）走後端 API，前端不持有機率表、不做抽取。原型內的機率／保底僅為 demo（見 `P6Ads` 內 TODO 註解）。

### Step 2 — 揭曉

`t=0` = 進入 step 2 當下。

| 順序 | 元素 | class | keyframe | dur | delay | easing | 起訖(ms) |
|---|---|---|---|---|---|---|---|
| — | 整頁進場 | `.p6-reward-screen` | `slide-up` | 400 | 0 | `cubic-bezier(.16,1,.3,1)` | 0–400 |
| — | 背景 | `.p6-burst-bg` | 無動畫（純黑 `#000`） | — | — | — | — |
| 1 | 標題（SVG 內建四層） | `.p6-title` | 見 §1 | — | — | — | 40–1140 |
| 2 | 玩具圖 | `.p6-toy-img` | `p6-toy-pop` | 720 | 350 | `cubic-bezier(.2,.9,.25,1.2)` | 350–1070 |
| 3 | 底部容器 | `.p6-reward-bottom` | `p6-bottom-in` | 500 | 650 | （預設 ease） | 650–1150 |
| 4 | 效果列（含金光暈） | `.p6-effect-row` | `p6-effect-row-in` | 820 | 680 | `ease-out` | 680–1500 |

備註：玩具圖帶 `drop-shadow(0 0 20px rgba(0,0,0,.5))`、`margin-top:-70px` 上疊到標題區。效果列文案「和 buddy 玩 +😊 N」的 N 讀 `tool_*_effect`。

---

## 5. Keyframe 與 easing 完整定義（附錄）

### 5.1 標題 SVG 內建（三檔一致，寫在各 `*-title.svg` 的 `<style>`）

```css
@keyframes resultGlowIn {
  0%{opacity:0;transform:scale(.15);}
  62%{opacity:.65;transform:scale(1.12);}
  100%{opacity:.5;transform:scale(1);}
}
@keyframes resultRaysIn {
  0%{opacity:0;transform:rotate(-42deg) scale(.12);}
  68%{opacity:1;transform:rotate(8deg) scale(1.08);}
  100%{opacity:1;transform:rotate(0deg) scale(1);}
}
@keyframes resultTitleIn {
  0%{opacity:0;transform:translateY(12px) scale(.58);}
  68%{opacity:1;transform:translateY(-3px) scale(1.08);}
  100%{opacity:1;transform:translateY(0) scale(1);}
}
@keyframes resultStarIn {
  0%{opacity:0;transform:rotate(-22deg) scale(0);}
  72%{opacity:1;transform:rotate(8deg) scale(1.25);}
  100%{opacity:1;transform:rotate(0deg) scale(1);}
}
```
> SVG 內動畫層以 `transform-box:view-box; transform-origin:161.5px 159.5px`（畫布中心）為錨點，四層一起朝中心彈出。canvas = 323×319。

### 5.2 頁面層（[styles.css](../../reference/eco-buddy_hi-fi/styles.css)）

```css
/* 整頁進場（P2b/P12/P6 step2 共用） — styles.css:515 */
@keyframes slide-up{from{transform:translateY(100%);}to{transform:translateY(0);}}

/* P2b/P12 龜 — styles.css:615 */
@keyframes result-buddy-pop{
  0%{opacity:0;transform:translateY(90px) scale(.68);}
  62%{opacity:1;transform:translateY(-12px) scale(1.05);}
  82%{transform:translateY(5px) scale(.98);}
  100%{opacity:1;transform:translateY(0) scale(1);}
}

/* P2b/P12 獎勵卡 — styles.css:621 */
@keyframes reward-card-glow{
  0%{opacity:0;transform:translateY(12px) scale(.96);box-shadow:0 0 0 rgba(255,80,0,0);}
  45%{opacity:1;transform:translateY(0) scale(1.02);box-shadow:0 0 22px 7px rgba(255,146,58,.72);}
  100%{opacity:1;transform:translateY(0) scale(1);box-shadow:0 0 12px 3px rgba(255,80,0,.34);}
}

/* 通用淡入（P2b 配額提示等） — styles.css:716 */
@keyframes fade-in{from{opacity:0;}to{opacity:1;}}

/* P6 玩具 — styles.css:786 */
@keyframes p6-toy-pop{
  0%{opacity:0;transform:translateY(60px) scale(.68);}
  62%{opacity:1;transform:translateY(-10px) scale(1.08);}
  82%{transform:translateY(4px) scale(.98);}
  100%{opacity:1;transform:translateY(0) scale(1);}
}

/* P6 底部容器 — styles.css:797 */
@keyframes p6-bottom-in{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}

/* P6 效果列 — styles.css:814 */
@keyframes p6-effect-row-in{
  0%{opacity:0;transform:translateY(12px) scale(.96);box-shadow:0 0 0 rgba(255,206,0,0);}
  55%{opacity:1;transform:translateY(0) scale(1.02);box-shadow:0 0 20px rgba(255,206,0,.42);}
  100%{opacity:1;transform:translateY(0) scale(1);box-shadow:0 0 12px rgba(255,206,0,.24);}
}
```

---

## 6. 降級與實作注意

- **prefers-reduced-motion**：三個標題 SVG 內建 `@media (prefers-reduced-motion:reduce)`，關動畫、直接顯示最終態（光暈保留 `opacity:.5`）。頁面層 P2b/P12 亦有 `.rs-title,.rs-turtle,.rpc{animation:none;}`（[styles.css:626](../../reference/eco-buddy_hi-fi/styles.css#L626)）。production 請沿用：reduce 時不播進場、直接呈現。
- **動畫只播一次**：全部 `animation-fill-mode: both/forwards`，播完停在最終態；重進畫面才重播。
- **SVG 以 `<img>` 載入即可**，動畫會跑；不需 lottie/rive/任何 runtime。若改用 inline SVG 或加 CDN 快取，注意快取破壞（原型靠 `index.html` 的 `?v=` 版本號）。
- **三帳本分開顯示**：體力／潔淨／點數各自獨立，UI 明列，不可併算（見 [CLAUDE.md 三帳本界線]）。

---

*建立：2026-07-09 · write owner：UI/UX @chiamei-ui*
