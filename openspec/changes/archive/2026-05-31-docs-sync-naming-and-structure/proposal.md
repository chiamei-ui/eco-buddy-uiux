## Why

命名手冊（Naming Manual）目前只存在於 `ecoco-private/naming/` 的 Excel 檔，沒有 Markdown 版本、沒有明確的 Owner、沒有版本更動協議。同時，repo 缺少階段說明（Roadmap）與完整的協作者資訊，新成員加入時不知道現在做到哪個 phase、哪些人在協作。

## What Changes

- **新增** `docs/design/NAMING.md`：命名手冊的 Markdown 鏡像版，包含三大核心參數、10 個 Slot Boolean、22 個 Event Trigger、Owner 資訊與版本升版協議
- **新增** `docs/product/ROADMAP.md`：專案階段說明（P0B → P1 → 正式合約後），讓所有成員知道現在走到哪
- **更新** `docs/README.md`：補上前端工程師 @shangchian 帳號、補上協作者清單現況（Anastasiia 試作中）

## Capabilities

### New Capabilities

- `naming-manual`: 命名手冊 Markdown 版，含 Owner、版本協議、三大命名清單
- `project-roadmap`: 專案階段說明文件，P0B / P1 / 正式合約三個節點的範疇與現況

### Modified Capabilities

- （無規格層異動）

## Impact

- `docs/README.md`：協作者欄位補齊
- `docs/design/NAMING.md`：新增
- `docs/product/ROADMAP.md`：新增
- `ecoco-private/naming/` xlsx：不動，繼續作為對外正式版
