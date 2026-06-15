# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ECO BUDDY** — ECOCO App 內的養成遊戲模式。玩家透過現實回收、補充站消費等行為養育 Buddy（虛擬角色），Buddy 有體力／潔淨／心情三個狀態值。

> 舊 Rive 動畫預覽工具計畫已封存至 `archive/rive-plan/`，程式碼封存至 `archive/rive-previewer/`。

當前狀態：UI/UX 設計階段，產出為可互動 hi-fi 原型（`reference/eco-buddy_hi-fi/`），尚無正式 production app。詳見 [docs/product/USER_FLOW.md](docs/product/USER_FLOW.md)。

## Architecture

完整目錄說明見 [@docs/README.md](docs/README.md)。

```
eco-buddy/
├── archive/      # 封存舊計畫，不引用
├── docs/         # 所有規格文件（README.md 為導覽入口）
├── openspec/     # change proposals & 規格
├── character/    # 角色素材，唯讀
├── reference/
│   └── eco-buddy_hi-fi/  # ⭐ 唯一活躍程式碼：可互動 hi-fi 原型（React + Babel standalone）
├── tests/        # Playwright 驗證腳本（驗證 hi-fi 流程與遊戲邏輯）
├── scripts/      # 自動化腳本（pre-commit changelog 等）
└── assets/       # 設計資源
```

> 注意：`reference/eco-buddy_hi-fi/` 雖在 `reference/` 下，但**不是唯讀外部參考**——它是專案目前唯一活躍維護的程式碼，由 `[design]` commit 持續更新（write owner：UI/UX @chiamei-ui）。`reference/` 其餘內容才是唯讀參考。

## Commands

本專案無 build step——hi-fi 原型由瀏覽器端 Babel standalone 即時編譯 JSX。

| 動作 | 指令 |
|------|------|
| 本機預覽原型 | `npx serve reference/eco-buddy_hi-fi -p 3333` → 開 `http://localhost:3333` |
| 跑全部驗證 | `npx playwright test`（webServer 會自動 `serve` 在 :3333） |
| 跑單一測試 | `npx playwright test -g "Tab 順序"`（`-g` 配 test 標題關鍵字） |
| 看測試報告 | `npx playwright show-report` |
| 首次安裝 | `npm install && npx playwright install chromium` |

- Playwright 設定見 [playwright.config.js](playwright.config.js)：viewport 鎖 iPhone 15 Pro（390×844），baseURL `:3333`。
- 測試斷言**直接綁定 PM 定案**（如 #22 廢除「立即使用」、三維名稱體力/潔淨/心情、商店雙軌 #16/#17、禁用詞掃描）。改動原型若動到這些行為，先確認對應決策，再同步測試。
- Tab 順序（`夥伴/商店/今日陪伴/夥伴日誌`）hi-fi 與 USER_FLOW §B 已於 2026-06-10 對齊。

### Git hooks（已透過 `core.hooksPath .githooks` 啟用）

- [.githooks/pre-commit](.githooks/pre-commit) → 跑 [scripts/update-engineering-changelog.ps1](scripts/update-engineering-changelog.ps1)：偵測 staged 的 design/product/decision/hi-fi/asset 變更，自動 append 一筆到 [docs/dev/ENGINEERING_CHANGELOG.md](docs/dev/ENGINEERING_CHANGELOG.md) 並 `git add`。需要 PowerShell（`pwsh` 或 `powershell.exe`）。
- 若 clone 後 hook 沒生效：`git config core.hooksPath .githooks`。

## hi-fi 原型架構

`reference/eco-buddy_hi-fi/` 是無打包的單頁 React App，[index.html](reference/eco-buddy_hi-fi/index.html) 用 `<script type="text/babel">` 依序載入 JSX（全域 scope，**非 ES module**，檔案間靠全域變數共享，無 import/export）：

| 檔案 | 內容 |
|------|------|
| `app.jsx` | `DEFAULT_STATE` + `stateReducer`（useReducer 單一狀態樹）、`SCREENS` 畫面清單、`TAB_ORDER`、`<App>` 路由（`screen` state + `setScreen(id, payload)`）、左側 `ScreenNav` 開發導覽 |
| `screens.jsx` | 主要畫面元件（P1Home、P2Scan、P2bResult、P4Shop、P5Missions…），最大檔 |
| `screens-d2.jsx` | 延伸畫面元件 |
| `components.jsx` | 共用元件 |
| `dialogues.jsx` | Buddy 對話文案 |
| `tweaks-panel.jsx` | 開發用即時調參面板（`tweaks` 物件，含 `shopPhase` 等 gate 開關） |

關鍵架構點：

- **狀態集中於 `stateReducer`**：FEED / USE_TOOL / COLLECT_BATCH / REFILL_RESULT / BUY / LOCK_DEX 等 action。三帳本（體力/潔淨/ECOCO 點數）在 reducer 中各自獨立計算，勿合併。
- **畫面以 code 標示**（P0、P1、P2b、P12…），`SCREENS` 陣列為單一來源；測試靠 `ScreenNav` 的 code 跳轉。
- **快取破壞機制**：`index.html` 每個 JSX 引用帶 `?v=NNN`。編輯任一 hi-fi JSX 後，**必須遞增該版本號**才能在瀏覽器看到變更（`.claude/bump-hifi-version.ps1` 為自動遞增 hook，靠本機 `settings.local.json` 註冊；若未啟用需手動改 `index.html` 的 `v=`）。
- **無 fallback**：reducer 與元件遵循全域規範，不寫預設值降級；遊戲數值最終需讀 API（見下方動態數值規則），原型中的數字僅為 demo。

## 文件優先順序（衝突時）

1. `docs/decisions/CURRENT.md` — PM 最新定案，最高優先
2. `docs/design/DESIGN_SYSTEM.md` — 視覺規範（色彩唯一來源）
3. `docs/design/UI_SPEC.md` — 頁面規格
4. `docs/product/USER_FLOW.md` — 流程

`docs/archive/` 下所有文件皆為舊版，僅供歷史參考。

## Design System

所有 UI 必須遵循 [docs/design/DESIGN_SYSTEM.md](docs/design/DESIGN_SYSTEM.md)，關鍵約束：

- **Buddy 必須出現在每一頁**（全身／縮圖／對話泡泡至少一種）
- **禁止功能語言**：「回收、投遞、掃描、任務、KPI」不得出現在用戶可見文字
- **禁止工程師語言**：「Phase、Sprint、Milestone、SDK、TBD、TODO、即將推出」不得露出在用戶可見 UI（dev comment 可用）
- HP → 體力；潔淨度 → 潔淨；進化 → 變身
- 主色：`#FF5000`（橘）、`#060E9F`（藍）；頁面底色：`#FAE0B8`（奶油膚）
- 字體：Noto Sans TC（中文優先）
- 按鈕：CTA 用 `rounded-full`，容器用 `rounded-2xl`
- 卡片：`bg-white rounded-2xl shadow-sm`（奶油底上不需邊框）

## Brief 核心原則（2026-05-27 PM 定稿）

> 完整 Brief：[docs/briefs/UI_REDESIGN_BRIEF.md](docs/briefs/UI_REDESIGN_BRIEF.md)

1. **Buddy 是一個生命，不是一個 App** — 判斷準則：這個設計會讓 Buddy 更像活著嗎？
2. **動機是「對 Buddy 好」，不是「完成任務」** — 所有功能語言翻譯成 Buddy 世界語言
3. **環保是結果，不是訴求** — 不教育、不說教、不喊口號
4. **每一頁都要有 Buddy** — 角落縮圖、一句對話、一個眨眼都算
5. **鼓勵 ＞ 命令；陪伴 ＞ 提醒** — Buddy 說「想念你」，不說「要求你」
6. **情緒 ＞ 資訊** — 少三個數據，多一個表情
7. **ECOCO 是 Buddy 的世界，不是廠商** — 用戶感覺「在 Buddy 的家」
8. **驚喜 ＞ 完整** — 每天打開要有一點沒想到

## 文案轉換規則

| 功能語言 | Buddy 世界語言 |
|---------|--------------|
| 回收 / 掃碼 | 帶禮物回家 / 給 Buddy |
| 任務 | 今日陪伴 |
| 點數 | 點數（保留，不改為愛心）|
| HP | 體力 |
| 潔淨度 | 潔淨 |
| 進化 | 變身 |
| 角色 / 寵物 | Buddy |
| 完成 | 一起做到 |
| 圖鑑 | 夥伴日誌 |

> 完整對照表：[docs/design/COPY_TABLE.md](docs/design/COPY_TABLE.md)

## 動態數值規則（工程必讀）

所有遊戲數值**禁止寫死（hardcode）**於前端，必須讀取 API 欄位：

| 欄位名 | 說明 |
|--------|------|
| `food_slot_max_count` | 食物格庫存上限（勿寫死 12） |
| `food_hp_effect` | 食物體力效果值 |
| `food_weekly_quota` | 食物週配額（勿寫死 5） |
| `tap_mood_gain` / `tap_daily_limit` | 觸碰角色心情增量 / 每日上限 |
| `tool_*_effect` | 道具效果值 |
| `tool_warn_threshold_hours` / `tool_free_expire_hours` / `tool_paid_expire_days` | 道具有效期 |
| IAP 商品價格 | 讀取 App Store / Google Play SDK 回傳，不寫死 NT$ 金額 |

廣告開箱：前端只送 request、播放動畫、顯示後端結果，**不在前端做機率抽取**。

## 三帳本界線（工程 / 設計必讀）

體力、潔淨、ECOCO 點數為三條**互不相通**的帳，同一投瓶 / 消費動作並行產出，但各自獨立計算、獨立顯示：

- **體力**：遊戲屬性 0–100，餵食養成用
- **潔淨**：遊戲屬性 0–100，外觀養成用
- **ECOCO 點數**：真實貨幣餘額，商店消費用（雙軌制 #16/#17）

規則：退瓶 `-1 潔淨` 不扣體力、不動點數。UI 須明寫「體力 +2 ・ 潔淨 +2」，不可併成單一「+2」。點數與現金不互換、不互買。

## 關鍵 PM 定案（影響日常 UI 工作）

詳細數值見 `docs/decisions/CURRENT.md`，以下為常用速查：

- **觸碰角色**：心情 +1／次，每日上限 10 次（#2）
- **食物週配額**：每種食物每週 5 個，週三 12:00 重置；超額投瓶僅加體力 / 潔淨，不產食物（#20）
- **食物效果**：普通食物體力 +10，稀有（W4）體力 +15；食物只加體力（#25）
- **P3 餵食頁已廢除**（#22）：取得食物 / 道具後無「馬上使用」快捷，唯一入口為 P1 食物欄拖曳
- **商店雙軌**：ECOCO 點數區 vs IAP 現金區，商品明確標示「💎 點數」或「💳 NT$」；不發任何遊戲幣（#16/#17）
- **裝扮 Tab Phase 1**：Tab 顯示但商品 disabled（「即將開放」），IAP 管線就緒後才轉上線（#28）
- **金流服務商**：藍新 NewebPay（非綠界）；App 內數位商品須走 Apple/Google IAP，不得以藍新收款（#26/#27）
- **衰減規則**：每日 -5%（24h 結算），推播閾值 <30%，每維度每日最多 1 次（#4）
- **推播**：統一由一般模式通知中心發出，點擊直跳遊戲模式（#18）

## Change Management

本專案使用 OpenSpec 管理變更：

```
openspec/
├── changes/
│   ├── active/      # 進行中的 change（目前無）
│   └── archive/     # 已完成歸檔的 change
└── specs/           # 當前有效規格（各 change 的最新版）
```

操作指令：

- `/opsx:propose` — 提出新 change
- `/opsx:apply` — 實作 change 中的任務
- `/opsx:archive` — 歸檔已完成的 change
- `/opsx:explore` — 探索 / 分析模式

**何時開 change**：任何會改動 `docs/` 規範或新增頁面流程的工作，先用 `/opsx:propose` 建 change。單純套版型修文案可直接動。