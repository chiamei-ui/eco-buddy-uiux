# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

**ECO BUDDY** — ECOCO App 內的養成遊戲模式。玩家透過現實回收、補充站消費等行為養育 Buddy（虛擬角色），Buddy 有體力／潔淨／心情三個狀態值。

> 舊 Rive 動畫預覽工具計畫已封存至 `archive/rive-plan/`，程式碼封存至 `archive/rive-previewer/`。

當前狀態：UI/UX 設計階段。詳見 [docs/product/USER_FLOW.md](docs/product/USER_FLOW.md)。

## Architecture

完整目錄說明見 [@docs/README.md](docs/README.md)。

```
eco-buddy/
├── archive/      # 封存舊計畫，不引用
├── docs/         # 所有規格文件（README.md 為導覽入口）
├── openspec/     # change proposals & 規格
├── character/    # 角色素材，唯讀
├── reference/    # 外部參考，唯讀
└── assets/       # 設計資源
```

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

## Change Management

本專案使用 OpenSpec 管理變更，操作指令：

- `/opsx:propose` — 提出新 change
- `/opsx:apply` — 實作 change 中的任務
- `/opsx:archive` — 歸檔已完成的 change
- `/opsx:explore` — 探索 / 分析模式

**何時開 change**：任何會改動 `docs/` 規範或新增頁面流程的工作，先用 `/opsx:propose` 建 change。單純套版型修文案可直接動。