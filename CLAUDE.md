# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ECO BUDDY** — 養成遊戲角色遊戲化 UI/UX 設計專案。聚焦各遊戲畫面（主頁、背包、商店等）的介面設計。

> 舊 Rive 動畫預覽工具計畫已封存至 `archive/rive-plan/`。

當前狀態：方向確認中。詳見 [implementation_plan.md](implementation_plan.md) 與 [task.md](task.md)。

## Commands

工作目錄在 `rive-previewer/`：

```bash
npm run dev       # Vite dev server (HMR)
npm run build     # tsc + vite build（會做型別檢查）
npm run lint      # ESLint flat config
npm run preview   # 預覽 production build
```

無獨立測試指令（目前專案無測試框架）。

## Architecture

```
eco-buddy/
├── rive-previewer/        # 主要 Web App（唯一含 package.json 的模組）
│   ├── src/
│   │   ├── main.tsx       # React root
│   │   └── App.tsx        # 根元件（目前為 boilerplate）
│   ├── vite.config.ts
│   └── eslint.config.js   # ESLint v9 flat config（非 .eslintrc）
├── openspec/              # Change management（用 /opsx:* 指令操作）
├── character/             # 設計師角色素材
├── ECOCO_DESIGN.md        # 品牌設計規範（所有 UI 工作的唯一依據）
├── implementation_plan.md # 4-phase 路線圖
└── task.md                # Phase 逐項任務清單
```

**Tech stack**: React 19 + TypeScript 6 (strict) + Vite 8 + 原生 CSS（無 Tailwind）。

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
