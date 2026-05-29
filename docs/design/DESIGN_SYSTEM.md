# ECO Buddy Design System

> 這份文件是 ECO Buddy 遊戲模式的 UI 設計規範，專為 AI coding agent 設計。
> **This file is the single source of truth for all ECO Buddy UI work.**

---

## 0. Brief 核心（最高優先）

**ECO Buddy 是一個有生命的夥伴，不是一個 App。**

每個設計決策都問：「這個設計會讓 Buddy 更像活著嗎？」

### 8 條設計原則
1. Buddy 是一個生命，不是一個 App
2. 動機是「對 Buddy 好」，不是「完成任務」
3. 環保是結果，不是訴求——不教育、不說教
4. **每一頁都要有 Buddy**（全身／縮圖／對話泡泡至少一種）
5. 鼓勵 ＞ 命令；陪伴 ＞ 提醒
6. 情緒 ＞ 資訊（少三個數據，多一個表情）
7. ECOCO 是 Buddy 的世界，不是廠商
8. 驚喜 ＞ 完整（每天打開要有一點沒想到）

### 絕對禁區（UI 文字）
- 「回收、投遞、掃描、任務、KPI」— 不得出現在用戶可見處
- 「Phase 2、即將推出、SDK 接管、Coming soon、TODO」— 工程師語言不外露
- 「HP」「潔淨度」直接露出 — 改用「體力」「潔淨」
- 「精神」「清爽」（舊版名稱）— 全站替換為「體力」「潔淨」
- 法律免責語句出現在主視覺區

### 文案替換規則（強制）

下列為全站強制替換對照，UI 設計稿、規格文件、程式碼字串均適用：

| 禁用詞（舊） | 替換詞（新） | 備注 |
|-------------|------------|------|
| HP | 體力 | 屬性條標籤、推播文案、結果頁均適用 |
| 精神（舊版）| 體力 | 全站替換 |
| 潔淨度 | 潔淨 | 包含進度條標籤、道具效果描述 |
| 清爽（舊版）| 潔淨 | 全站替換 |
| 任務（Tab） | 今日陪伴 | 僅限 Tab Bar 文案；任務卡標題可保留「任務」描述語 |
| 圖鑑 | 夥伴日誌 | Tab Bar、頁面標題均適用 |
| 進化 | 變身 | Buddy 狀態改變的所有文案 |
| 回收 / 掃碼 | 帶食物回家 / 給 Buddy | 用戶可見文字（按鈕、標題、提示）|
| 點數 | 點數（保留）| ECOCO 點數維持原名，不改為「愛心」|
| 心情值 | 心情 | 屬性條與對話文案 |
| 角色 / 寵物 | Buddy | 對外文案一律稱呼「Buddy」|
| 圖鑑 | 夥伴日誌 | — |
| 完成（任務領取） | 一起做到 | CTA 按鈕文案 |
| 屬性 | 狀態 | 對外文案 |

### 工程師語言黑名單（禁止出現在任何用戶可見文字）

- `Phase 2` / `Phase2` / `Phase 1`
- `SDK 接管` / `SDK`
- `即將推出` / `Coming soon` / `敬請期待`
- `TODO` / `TBD`（程式碼外不得出現）
- `API` / `後端` / `資料庫`（說明文案禁用）

若功能屬 Phase 2+ 範圍，UI 上不顯示，或以 Buddy 世界語言包裝（如「Buddy 還在準備中」）。

---

## 1. Visual Theme & Atmosphere

ECO Buddy 的視覺語言是「**溫暖的生命世界**」— 柔和、有溫度、像一個有故事的家。

- **氣氛**：可愛但不幼稚；溫暖但不俗氣；中文排版優先
- **底色**：奶油膚（`#FAE0B8`），不是冷白
- **禁止使用**：純白大面積底、冷色系工具感設計、多種主色競爭
- **Buddy 優先**：ECOCO Logo 不放大，Buddy 是主角

---

## 2. Color Palette

### Brand Colors（品牌色）
```
主色   #FF5000   → 主要 CTA、強調色
副色   #060E9F   → Header 深色區、圖鑑類
強調   #FFCE00   → 倒數、成就、警示
海藍   #0076A9   → 補充站場景
霧藍灰 #8EB8C9   → 次要資訊、夜間背景
```

### Background System（底色系統）
```
主底（頁面）  #FAE0B8   → 奶油膚，大面積底色
次底         #FFF5E6   → 淡奶油，次要區塊
卡片底       #FFFFFF   → 僅卡片內，不大面積使用
```
> **禁止用 `#F7F9FC` 或純白做頁面底色**

### Attribute Colors（屬性色 / 三大狀態值）
```
體力  #FF5A5F   暖紅  ❤️
潔淨  #4A90E2   水藍  💧
心情  #FFC940   暖黃  😊
```

### Text Colors
```
Text (primary):    #1A1A1A
Text (secondary):  #4B5563
Text (muted):      #6B7280
Text (placeholder):#9CA3AF
```

### Color Usage Rules
- `#FF5000` 只用於：主要 CTA、強調、品牌錨點
- `#060E9F` 只用於：次要 CTA、圖鑑類、資訊圖示
- 警示用 `#FFCE00`，**禁用警示紅 `#FF0000`**
- 橘色與藍色不在同一元件上競爭注意力
- ECOCO Logo 不放大，Buddy 是主角

---

## 3. Typography

### Font Family
```
Primary: "Noto Sans TC", "system-ui", sans-serif
```
繁體中文優先，所有介面文字均使用 Noto Sans TC。

### Weight Hierarchy（字重階層）
```
font-black (900) → 主標題、英雄標題、按鈕 CTA、卡片標題
font-bold  (700) → 小標、標籤、導覽項目、說明標題
font-medium(500) → 內文說明
font-mono        → AI prompt 程式碼片段（等寬字型）
```

### Size & Tracking（尺寸與字距）
```
Hero h1:         text-5xl / text-6xl + font-black + tracking-tight
Section h2:      text-xl + font-black + tracking-tight
Panel title:     text-lg + font-black + tracking-tight
Label (micro):   text-[10px] + font-bold + tracking-widest + uppercase
Body text:       text-sm + font-medium + leading-relaxed
Search input:    text-lg + font-bold
Button CTA:      text-[15px] + font-bold
Badge text:      text-[10px] / text-[13px] + font-bold + uppercase
```

### Chinese Typography Rules
- 標題不加標點符號結尾
- 英文/數字混排時，英文用 uppercase + tracking-wide 增強辨識
- 中英混排標題：中文在前，英文縮寫用括號 `(ALL)` 標注

---

## 4. Component Styling

### Buttons（按鈕）

**Primary CTA（橘色）**
```
bg-[#FF5000] text-white font-bold rounded-full
px-5 py-2 (small) | py-3.5 px-4 (full-width)
shadow-[0_4px_16px_rgba(255,80,0,0.3)]
hover:bg-[#E64800] hover:scale-105 transition-all
```

**Secondary CTA（藍色）**
```
bg-[#060E9F] text-white font-bold rounded-full
hover:bg-[#FF5000] → hover 時切換為橘色
shadow-lg transition-all hover:-translate-y-0.5
```

**Ghost / Utility Button**
```
text-[#6B7280] hover:text-[#1A1A1A]
hover:bg-[#F0F3F7] rounded-full transition-colors
```

**Disabled / Done State**
```
bg-green-500 cursor-default text-white rounded-full
```

**Danger（受限資源）**
```
bg-red-600 hover:bg-red-700 text-white rounded-full
```

### Input / Search Bar
```
外框: border-[4px] border-[#FF5000]
形狀: rounded-[40px] (collapsed) → rounded-[24px] (expanded)
背景: bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]
內距: px-6 py-3 md:py-4
input: text-lg font-bold bg-transparent outline-none
placeholder: text-[#9CA3AF]
```

### Cards（素材卡片）
```
背景: bg-white
圓角: rounded-2xl 或 rounded-xl
邊框: border border-[#E5E7EB]
陰影: shadow-sm → hover:shadow-md
Hover: scale-105 transition-all duration-200
```

### Badges / Tags
```
Category badge:  bg-[#F0F3F7] text-[#060E9F] rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest
Format badge:    bg-[#F0F3F7] text-[#1A1A1A] rounded px-2 py-0.5 text-xs font-black uppercase
Hashtag:         bg-[#F7F9FC] border border-[#E5E7EB] text-[#6B7280] rounded text-[10px] font-bold
Campaign badge:  bg-orange-50 text-[#FF5000] border border-orange-200 rounded-lg
Usage scenario:  bg-blue-50 text-[#060E9F] border border-blue-100 rounded-lg
Restricted:      bg-red-50 text-red-600 rounded-lg
```

### Sidebar / Panel
```
位置: fixed right-0 inset-y-0
寬度: w-full md:w-[420px]
背景: bg-white
邊框: border-l border-[#E5E7EB]
陰影: shadow-[0_10px_40px_-10px_rgba(0,0,0,0.12)]
遮罩: bg-[#1A1A1A]/20 backdrop-blur-sm (overlay)
動畫: transform transition-transform duration-300 ease-in-out
```

### Info Block / Code Preview
```
外框: bg-[#F7F9FC] border border-[#E5E7EB] rounded-2xl p-4
程式碼區: bg-white border border-[#E5E7EB] rounded-xl p-3
文字: text-xs text-[#4B5563] font-mono leading-relaxed
```

### Header / Navbar
```
bg-white shadow-sm border-b border-[#E5E7EB]
sticky top-0 z-50
高度: h-16
Logo + 標題分隔線: border-l-2 border-[#E5E7EB] pl-3 ml-3
標題: text-xl font-black tracking-tighter uppercase
```

---

## 5. Layout & Spacing

### Container
```
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
```

### Grid（卡片網格）
```
Responsive: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
Gap: gap-4 或 gap-6
```

### Section Spacing
```
Hero:    pt-20 pb-28 (較大留白)
Section: py-10 md:py-16
內部卡片: p-5 或 p-6
行距:    space-y-5 (panel 內容)
```

### Z-Index Layers
```
Sticky header:   z-50
Search dropdown: z-40
Overlay mask:    z-40
Sidebar panel:   z-50
Floating button: z-30
```

---

## 6. Depth & Shadow System

```
微陰影（卡片）:   shadow-sm
中陰影（hover）:  shadow-md
Panel 陰影:      shadow-[0_10px_40px_-10px_rgba(0,0,0,0.12)]
搜尋框陰影:      shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]
橘色發光:        shadow-[0_4px_16px_rgba(255,80,0,0.3)]
底部 bar 陰影:   shadow-[0_-4px_16px_rgba(0,0,0,0.04)]
```

Hero 遮罩層級：
```
<div style="background-image: url(...)">  → bg-black base
  <div class="absolute inset-0 bg-black/35 z-0" />  → 35% 遮罩
  <div class="relative z-10">內容</div>
```

---

## 7. Design Guardrails & Anti-Patterns

### 絕對禁止（UI 視覺）
- **不要用漸層色** — 背景、按鈕一律純色，不用 bg-gradient-*（主按鈕僅允許純色）
- **不要用純白大面積底** — 頁面底色一律 `#FAE0B8`（奶油膚）
- **不要讓 Buddy 缺席任何一頁** — 每頁至少有縮圖、對話泡泡或表情其中一種
- **不要讓品牌色互相競爭** — 一個區塊只用一種主色作為強調
- **不要用警示紅 #FF0000** — 警示用 `#FFCE00` 橘黃系
- **不要用銳利直角卡片** — 圓角是視覺語言
- **不要讓 ECOCO Logo 比 Buddy 更搶眼**
- **不要用 Tailwind 預設藍色 (blue-500/600)** — 用 `#060E9F`
- **不要用 Tailwind 預設橘色 (orange-500)** — 用 `#FF5000`
- **不要省略繁體中文字型** — font-family 必須包含 "Noto Sans TC"
- **不要用系統 emoji（🔥💎📊⏰）** — Icon 全部自製，扁平+微立體風格

### 絕對禁止（UI 文字）
- 「回收、投遞、掃描、任務、KPI」不得出現在用戶可見文字
- 「Phase 2、即將推出、SDK 接管」工程師語言不外露
- 法律免責語句出現在主視覺區（移至頁面底部 8px 灰字）

### 設計守則
- 按鈕 CTA 一律 `rounded-full`；容器、卡片用 `rounded-xl` 或 `rounded-2xl`
- 只有一個「最重要的行動」用橘色，次要用藍色或 ghost 樣式
- Hover 狀態必須有回饋：scale、color change、或 shadow change，至少一種
- 空狀態（Empty State）必須有 Buddy 插圖 + 情感文案，不能只放灰字

### Buddy 在各頁的存在（必達）
| 頁面 | Buddy 出現方式 |
|------|--------------|
| 主畫面 | 全身、待機動畫、對話泡泡 |
| 回收完成頁 | 慶祝動畫（跳起來接食物） |
| 補充站完成頁 | Buddy 洗澡 / 變身動畫 |
| 商店 | 角落縮圖看著商品（50×50） |
| 任務頁 | Header 右側 Buddy 半身 |
| 夥伴日誌（圖鑑） | 每張卡片中央 Buddy 小圖 |
| 道具頁 | Buddy 等待表情（空狀態填補） |
| 個人主頁 | 頂部 Buddy 半身陪伴 |

---

## 8. Responsive Behavior

### Breakpoints（沿用 Tailwind 預設）
```
sm:  640px  → 卡片 2 欄、sidebar 全寬 → 固定寬度
md:  768px  → sidebar 固定 420px、Hero 字型放大
lg:  1024px → 卡片 3 欄、導覽完整顯示
xl:  1280px → 卡片 4 欄
```

### Mobile Considerations
- 搜尋框在 mobile 佔滿寬度，border radius 動態切換
- Sidebar 在 mobile 全螢幕 (`w-full`)，md 以上才固定 420px
- 格式篩選按鈕可橫向滑動 (`overflow-x-auto scrollbar-hide`)
- Hero 文字在 mobile 縮小 (`text-5xl`)，desktop 放大 (`md:text-6xl`)

---

## 9. Agent Prompt Guide

### 快速啟動 Prompt
```
請依照 ECOCO_DESIGN.md 建構 ECO Buddy UI。
頁面底色 #FAE0B8（奶油膚），主色 #FF5000（橘），次色 #060E9F（藍），字型 Noto Sans TC。
卡片 bg-white rounded-2xl shadow-sm，按鈕 CTA rounded-full。
每頁必須有 Buddy 的視覺存在（全身、縮圖、或對話泡泡）。
所有面向用戶的文字禁用「回收、投遞、掃描、任務、點數」，改用 Buddy 世界語言。
不要使用任何漸層色。
```

### 建立新頁面
```
使用 ECOCO_DESIGN.md 建立 [頁面描述]。
- 頁面背景: bg-[#FAE0B8]（奶油膚，不是白色）
- 卡片: bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.06)]
- 主要 CTA: bg-[#FF5000] text-white rounded-full font-bold
- 次要 CTA: bg-[#060E9F] text-white rounded-full font-bold
- 字型: "Noto Sans TC"
- Buddy 存在感: 右上角縮圖或底部對話泡泡（必填）
- 禁止漸層色
```

### 建立卡片元件
```
依照 ECOCO_DESIGN.md 建立卡片：
bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.06)]
hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 transition-all duration-200
標題: font-bold text-[#1A1A1A] text-lg
說明: text-sm text-[#4B5563]
```

### 建立 Buddy 對話泡泡
```
形狀: rounded-2xl + 三角指向 Buddy
底色: bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]
文字: text-sm text-[#333333]
出現時機: 停在主畫面 3 秒後 / 屬性低於 30% / 進入新頁面
```

### 色彩速查
```
頁面底色   #FAE0B8  奶油膚（大面積）
次底      #FFF5E6  淡奶油（次要區塊）
卡片      #FFFFFF  白（僅卡片內）
主色 CTA  #FF5000  橘
副色      #060E9F  藍
強調      #FFCE00  黃（倒數/成就）
精神(HP)  #FF5A5F  暖紅
清爽      #4A90E2  水藍
心情      #FFC940  暖黃
主文      #1A1A1A
次文      #4B5563
```
