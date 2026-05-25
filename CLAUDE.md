# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ECO BUDDY** — 養成遊戲角色遊戲化 UI/UX 設計專案。聚焦各遊戲畫面（主頁、背包、商店等）的介面設計。

> 舊 Rive 動畫預覽工具計畫已封存至 `archive/rive-plan/`，程式碼封存至 `archive/rive-previewer/`。

當前狀態：UI/UX 設計階段。詳見 [implementation_plan.md](implementation_plan.md) 與 [task.md](task.md)。

## Architecture

```
eco-buddy/
├── archive/
│   ├── rive-plan/         # 封存：舊 Rive 預覽工具計畫
│   └── rive-previewer/    # 封存：舊 Rive 預覽工具程式碼
├── openspec/              # Change management（用 /opsx:* 指令操作）
├── character/             # 設計師角色素材
├── assets/                # 設計資源
├── ECOCO_DESIGN.md        # 品牌設計規範（所有 UI 工作的唯一依據）
├── implementation_plan.md # 4-phase 路線圖
├── task.md                # Phase 逐項任務清單
└── user-flow.md           # 使用者流程圖（v1.5）
```

## Design System

所有 UI 必須遵循 [ECOCO_DESIGN.md](ECOCO_DESIGN.md)，關鍵約束：

- **禁止使用漸層**
- 主色：`#FF5000`（orange）、`#060E9F`（blue）、背景 `#F7F9FC`
- 字體：Noto Sans TC（中文優先）、Inter（英數）
- 按鈕：CTA 用 `rounded-full`，容器用 `rounded-2xl`
- 卡片：`bg-white rounded-2xl border shadow-sm` + hover lift

## Change Management

本專案使用 OpenSpec 管理變更，操作指令：

- `/opsx:propose` — 提出新 change
- `/opsx:apply` — 實作 change 中的任務
- `/opsx:archive` — 歸檔已完成的 change
- `/opsx:explore` — 探索 / 分析模式
