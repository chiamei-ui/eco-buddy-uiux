## Context

食物欄已有完整的入場動態系統：`pulsingIds`（Set）驅動 `pulsing` class，CSS `ring-pulse` 動畫 + `badge-pop` 動畫，透過 `payload.foodStored` 在 P1 的 `useEffect` 觸發。玩具箱目前完全無對應機制。

現有程式碼關鍵路徑：
- `pulsingIds` state（`Set<id>`）存於 P1 component
- `payload.foodStored` → 切換 dockTab、設定 pulsingIds、顯示 Buddy 泡泡
- CSS：`ring-pulse`（box-shadow 脈衝）、`badge-pop`（scale 彈跳），定義於 `styles.css:354–365`

觸發入口有兩個：
1. **商店購買**：P4 確認購買後跳回 P1，需帶 `payload.toolStored`
2. **廣告抽取**：今日陪伴任務「看 Buddy 收禮物」完成後，同樣需帶 `payload.toolStored`

## Goals / Non-Goals

**Goals:**
- 玩具購買 / 廣告抽取成功後，P1 自動切換至道具包 Sub-Tab
- 新增的道具格觸發 `ring-pulse` 光暈脈衝（與食物欄設計語言一致）
- Buddy 泡泡顯示對應文案，10 秒後自動消失

**Non-Goals:**
- 不重新設計 `ring-pulse` / `badge-pop` 動畫本身（直接複用現有 CSS）
- 不處理批量購買多種玩具的分批動態（此版本一次一種）
- 不改變 P4 → P1 的頁面跳轉機制（沿用現有 `setScreen` + `payload` 模式）

## Decisions

### D1：複用 `pulsingIds` 模式，不獨立建 toolPulsingIds

食物的 `pulsingIds` 是 `Set<foodId>`，道具格有獨立 id 結構（`tools` array）。可以共用一個 `pulsingIds` Set 只要確保 id 命名空間不衝突（食物 id 以 `f-` 開頭、道具 id 以 `t-` 開頭），或各自建獨立 state。

**決定：建立獨立 `toolPulsingIds`**
Why：食物脈衝與道具脈衝可能同時發生（例如掃碼食物後立刻在商店買玩具），獨立 Set 避免狀態互相干擾，也更易閱讀。

### D2：觸發方式沿用 `payload` 模式

`payload.foodStored` 已驗證可靠——在 P1 component 掛載時讀取一次，觸發後 2.5s 清除。道具入場沿用相同模式：`payload.toolStored = { ids: string[] }`（帶入新增道具的 id 陣列）。

### D3：Buddy 泡泡文案區分購買 vs 廣告抽取

| 來源 | 文案 |
|------|------|
| 商店購買（點數） | 「新玩具到家了！快拖給我玩～🎉」 |
| 廣告抽取 | 「Buddy 收到新玩具了，超開心！✨」 |

透過 `payload.toolStored.source`（`'shop'` \| `'ad'`）判斷。

## Risks / Trade-offs

- **[Risk] 道具 id 碰撞**：若後台 tools array id 與 food id 格式相同，共用 Set 會有問題。→ Mitigation：採 D1 獨立 `toolPulsingIds` 消除風險。
- **[Risk] P4 購買完成後 payload 傳遞時機**：若 P4 purchase 是非同步（API call），需確保成功 callback 才帶 `toolStored`，不在 UI 樂觀更新時帶入。→ Mitigation：hi-fi 原型目前為同步模擬，此 risk 留給正式工程實作時處理，hi-fi 直接觸發。
- **[Trade-off] 複用 CSS 不新增 class**：道具格沿用 `.food-cell.pulsing`，但道具格的 DOM class 結構需與食物格一致。若未來道具格重構，需同步更新動畫 class。

## Open Questions

- 廣告抽取流程目前在 hi-fi 中是否有對應 screen / state？（若無，此 change 僅定義規格，hi-fi 實作在對應 screen 完成後補上）
- `tools` array 的 id 欄位格式是否已定義（需與 `toolPulsingIds` Set 一致）？
