# ECO Buddy 月度合約規格 Monthly Contract Specifications

**版本 / Version**：v1.0  
**更新日期**：2026-06-05  
**Owner**：窗口設計師 @idahsueh-cmd  
**資料來源**：RFP v1.4（`specs/ECOCO_RFP_EcoBuddy_v1_4_20260716.docx`）§2.3、§11
**適用對象**：窗口設計師、外包動畫師、PM

> **⚠ 本文件適用範圍**：適用於「獨立月度合約」，不屬於 Phase 0–4 首版合約範圍。月度合約非每月固定簽署，僅於甲方有執行需求時，雙方另行簽署單次月度專案合約。

---

## 一、月度交付素材規格 Monthly Asset Delivery Specifications

> RFP §2.3 完整轉錄。

| 素材項目 Asset Item | 數量/月 Qty/Month | 備註 Notes |
|---|---|---|
| 角色骨架外觀設計（.rev）/ Character skeleton appearance design (.rev) | 1 套 / 1 set | 新角色外觀；狀態機、插槽、命名規範須與初版完全一致 / New character appearance; state machine, slots, and naming must match initial version exactly |
| 食物圖示 Food Icons | 4 張（W1–W4）/ 4 images (W1–W4) | 向量格式（SVG）；W4 稀有食物須附金色軌跡掉落動畫 / Vector SVG; W4 rare food must include gold trail drop animation |
| 週期餵食音效 Weekly Feeding SFX | 沿用首版 / Reuse from initial version | 音效於首版 Phase 4 一次交付，後續每月不重新製作；若需更換須另行報價。月底告別音效亦固定沿用首版，不隨每月角色調整重製。 |
| 月初登場動畫 Monthly Spawn Animation | 1 組 / 1 set | 首次登入時播放；動畫表現依當月角色設計調整 / Played on first login; animation adjusted per monthly character design |
| 月底告別動畫 Monthly Farewell Animation | 1 組 / 1 set | 揮手告別→走入圖鑑相框；月底最後一日觸發 / Wave farewell → enter gallery frame; triggered on last day of month |

> ※ 每月素材之交付時程節點與驗收細節，由甲乙雙方於該次月度獨立合約中另行約定。命名規範不符者於月度合約驗收時視為未完成交付。
> ⚠️ **效力註記（2026-07-29 註記）**：本表為 RFP §2.3 完整轉錄；實際月度交付以雙方另行簽署的單次月度合約為準；PM 內部決議不得自行改寫本 mirror 或已簽約定。W4 稀有食物之產品排程調整屬甲方內部決議，不改變乙方依現行 binding RFP v1.4 之交付義務——`ev_gold_burst` 與 FX4 仍為鎖定命名與必要交付項。詳見 [ANIMATION_BRIEF.md](ANIMATION_BRIEF.md) 檔頭效力註記。

---

## 二、首版設計對月度循環之約束 Design Constraints for Monthly Cycle

> RFP §11 完整轉錄。

乙方於首版（Phase 0B–Phase 4）所建構之骨架、命名規範、Rive 設定，將作為後續所有月度循環角色之共用基礎。首版交付物須具備下列特性：

### 1. 骨架可月度 Skin 替換

保留外觀替換點，使新月度角色僅需替換 Skin 圖層即可套用相同狀態機與插槽邏輯，**不需重新建構狀態機**。

### 2. 音效一次交付，月度沿用

首版 Phase 4 交付之 22 支音效素材包（含 `ev_spawn_hatch`、`ev_farewell_start/end`）為月度合約既定資源；若特定月度需新增或更換音效，另行報價，**不屬月度標準交付範圍**。

### 3. 命名手冊版本鎖

月度合約適用之命名手冊版本，以**該月度合約簽署當日之最新發行版**為準。

- 月度合約執行期間之版本更新，僅適用後續新簽月度合約，**不溯及本次月度合約**
- 版本變更須於該次月度合約附件中明確記載
- 參照：[NAMING.md](NAMING.md)

### 4. Rive Editor 版本鎖

月度合約適用之 Rive Editor 版本，以首版開發合約 Phase 0B 對齊期間以書面確認之版本為基準。

- 月度合約執行期間因 Rive Editor 強制升級導致之相容性問題，責任歸屬依首版開發合約 §7 保固條款處理
- 如雙方合意採用較新版本，須於該次月度合約附件中明確記載，並由乙方確認新版本對既有骨架無相容性影響

---

## 三、時區與延遲原則 Time Zone and Delay Principle

- 所有截止時間一律以**台灣時區 UTC+8** 為準
- 動畫師當地國定假日**不得**作為延遲交付之理由
- 如需調整，須提前 **7 個工作日**以書面（含電子郵件）告知並獲甲方書面確認
- 具體日曆日期由甲乙雙方於各月度合約附件中另行明列

---

*Based on RFP v1.4 — 2026-07-16。如 RFP 有修訂，本文件同步更新並記錄異動。*
