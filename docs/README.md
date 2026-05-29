# ECO Buddy Docs

## 我是誰，我該看什麼

| 角色 | 必讀（順序） | 補充 |
|------|-------------|------|
| **PM / CEO** | [decisions/CURRENT.md](decisions/CURRENT.md) → [briefs/UI_REDESIGN_BRIEF.md](briefs/UI_REDESIGN_BRIEF.md) | — |
| **前端工程師** | [design/DESIGN_SYSTEM.md](design/DESIGN_SYSTEM.md) → [design/UI_SPEC.md](design/UI_SPEC.md) | [design/GAME_MECHANICS.md](design/GAME_MECHANICS.md) |
| **設計師** | [decisions/CURRENT.md](decisions/CURRENT.md) → [design/DESIGN_SYSTEM.md](design/DESIGN_SYSTEM.md) | [design/COPY_TABLE.md](design/COPY_TABLE.md) |
| **動畫師** | [animation/ANIMATION_BRIEF.md](animation/ANIMATION_BRIEF.md) → [animation/ANIMATION_LIST.md](animation/ANIMATION_LIST.md) | — |

---

## 文件優先順序（衝突時）

1. [decisions/CURRENT.md](decisions/CURRENT.md) — PM 最新定案，最高優先
2. [design/DESIGN_SYSTEM.md](design/DESIGN_SYSTEM.md) — 視覺規範（色彩、字型、元件）
3. [design/UI_SPEC.md](design/UI_SPEC.md) — 各頁面詳細規格
4. [product/USER_FLOW.md](product/USER_FLOW.md) — 使用者流程

---

## 目錄說明

| 目錄 | 內容 | 誰會動到 |
|------|------|---------|
| `decisions/` | PM 所有定案決策 | PM |
| `design/` | 設計系統、頁面規格、文案規則、**GAME_MECHANICS.md（所有數值）** | 設計師、前端、後端 |
| `product/` | 使用者流程、對話文案、FAQ | PM、設計師 |
| `animation/` | 動畫需求清單與發案規格 | 動畫師 |
| `briefs/` | PM 核心原則與改版方向 | PM、設計師 |
| `archive/` | 歷史版本，只讀不改 | — |

---

## 已知注意事項

- [briefs/UI_REDESIGN_BRIEF.md](briefs/UI_REDESIGN_BRIEF.md) 的貨幣禁區有過時說明（「改 Buddy 幣/愛心」）；以 [decisions/CURRENT.md](decisions/CURRENT.md) #16+#17 為準：ECOCO 點數保留不改名
- [archive/](archive/) 下的文件皆為歷史版本，不作為任何工作依據
- 色彩數值的唯一來源是 [design/DESIGN_SYSTEM.md](design/DESIGN_SYSTEM.md)，其他文件的色彩章節為說明性補充
- 三維數值名稱已於 2026-05-29 更新為 **體力 / 潔淨 / 心情**（舊名稱：精神 / 清爽 / 心情）
- 所有遊戲數值（換算規則、道具效果、衰減）集中在 [design/GAME_MECHANICS.md](design/GAME_MECHANICS.md)
