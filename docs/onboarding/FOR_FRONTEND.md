# 30 秒上手指南 — 給前端工程師（@shangchian）

## 你要先知道

`reference/eco-buddy_hi-fi/index.html` 是 **hi-fi 預覽入口**，不是正式前端架構。

設計端目前會用這個檔案驗證畫面；你實作時請把它當成「可互動設計稿」，再對照 `docs/` 裡的正式規格。

## 如何開 hi-fi 預覽

建議用本機 HTTP server，不要直接用 `file://` 開。

```powershell
cd reference/eco-buddy_hi-fi
python -m http.server 8000
```

瀏覽器開：

```text
http://localhost:8000
```

## reference 怎麼讀

| 你要找的東西 | 看這裡 |
| --- | --- |
| 預覽入口 | `reference/eco-buddy_hi-fi/index.html` |
| 色彩 token、尺寸、間距、手機框 | `reference/eco-buddy_hi-fi/styles.css` |
| 共用 UI 元件 | `reference/eco-buddy_hi-fi/components.jsx` |
| 各頁畫面與互動 | `reference/eco-buddy_hi-fi/screens.jsx` / `screens-d2.jsx` |
| Buddy 對話文案 | `reference/eco-buddy_hi-fi/dialogues.jsx` |
| 原型控制面板 | `reference/eco-buddy_hi-fi/app.jsx` 的 `InlineTweaks` |

目前 hi-fi 主設計尺寸是 `390 x 844`。Tweaks 內另有小 / 中 / 大三種手機框，用來檢查不同螢幕高度與寬度下的差異。

## 正式規格優先順序

若 `reference/` 與文件衝突，請依下列順序判斷：

1. `docs/decisions/CURRENT.md` — PM 最新定案
2. `docs/design/DESIGN_SYSTEM.md` — 視覺規範、色彩、禁用詞
3. `docs/design/UI_SPEC.md` — 各頁 UI 與動態數值標註
4. `docs/design/GAME_MECHANICS.md` — 數值規則與前後端責任
5. `docs/product/USER_FLOW.md` — 使用者流程

不要引用 `docs/archive/` 或 `archive/` 作為正式實作依據。

## 不要從 hi-fi hardcode 的東西

hi-fi 內有些內容只是 demo：

- 食物 / 道具效果數值
- 廣告開箱機率與保底
- 商品價格
- 點數、庫存、訂單資料
- 後台可調參數

正式版請依 `UI_SPEC.md` 內的 `[API: ...]` 與 `[IAP SKU: ...]` 標註串接，不要把 demo 數字寫死在前端。

## 工程影響 changelog

repo 內有自動 changelog，用來記錄會牽動工程實作的 reference、規格、素材與設計交付變更：

```text
docs/dev/ENGINEERING_CHANGELOG.md
```

新 clone repo 後請啟用 tracked hook：

```powershell
git config core.hooksPath .githooks
```

之後只要 commit 前 staged files 命中工程範圍，pre-commit hook 會自動更新 changelog 並一起 stage。

## 工程範圍

以下檔案或資料夾變更，通常會影響工程實作：

- `reference/eco-buddy_hi-fi/`
- `docs/design/`
- `docs/product/`
- `docs/decisions/`
- `docs/dev/`
- `docs/animation/`
- `assets/`
- `character/`

## 建議實作順序

1. 先用 `index.html` 看整體互動與視覺狀態。
2. 讀 `screens.jsx` 找到對應頁面結構。
3. 讀 `components.jsx` 找共用元件拆法。
4. 讀 `styles.css` 抽出 token、間距與尺寸規則。
5. 回到 `UI_SPEC.md` 和 `GAME_MECHANICS.md` 確認正式資料來源。
6. 用 mock data 完成 P1、P2b、P4、P5、P6、P9、P12。
7. 等後端 API / IAP / Rive 到位後替換 demo 資料。

## 驗收尺寸

每次調整 mobile UI，至少檢查：

- 小尺寸：`360 x 780`
- 主尺寸：`390 x 844`
- 大尺寸：`430 x 932`

驗收重點：

- Buddy 每頁都看得到
- 底部 tab bar 和主要 CTA 沒有被切掉
- 文字不爆版、不互相遮擋
- sheet / dock 不蓋住主要內容
- 大尺寸只是更舒展，不要變成另一套 layout
