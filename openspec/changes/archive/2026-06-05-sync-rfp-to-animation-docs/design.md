## Context

完整 RFP（`ECOCO_RFP_EcoBuddy_v1_0_20260515.docx`）為 Eco Buddy 動畫外包的唯一技術規格來源，涵蓋 Phase 1–4。`docs/animation/` 目前只完整呈現 Phase 1 內容；Phase 2–4 的 36 種型態規格、10 大動作事件、FX 粒子效果、月度交付素材表等核心規格尚未轉錄。

正式合約（Phase 2–4）即將啟動，前端工程師（@shangchian）與外包動畫師（Anastasiia）都需要可直接查閱的文件。目前 RFP 是 docx 私有檔，外包不能直接閱讀，窗口設計師需負責將規格轉成 git-managed markdown。

Write domain：`docs/animation/`（owner：@idahsueh-cmd）。

## Goals / Non-Goals

**Goals:**
- 將 RFP §2.3、§4、§5（連動邏輯）、§6.2、§7、§8.2、§9.1、§11、附件驗收表 C/D/E 全部轉錄進 `docs/animation/` markdown 檔
- 建立 `CHARACTER_TYPES.md`、`MONTHLY_SPEC.md` 兩個新文件
- 更新 `ANIMATION_BRIEF.md`、`ANIMATION_LIST.md`、`NAMING.md` 補齊缺漏章節
- 完成後，任何協作者無需開啟 docx 即可取得完整規格

**Non-Goals:**
- 不修改 `docs/design/`、`docs/decisions/`、`docs/product/` 任何文件
- 不更改 RFP 內容或重新詮釋規格；本 change 是轉錄，不是設計
- 不觸碰程式碼

## Decisions

**D1：新型態規格建新檔 `CHARACTER_TYPES.md`，不塞進 ANIMATION_BRIEF.md**
- 36 種型態規格含型態標籤、體型描述、外觀細節、解鎖條件，完整展開超過 300 行
- 塞進 BRIEF 會使單一檔案失去可讀性，且型態規格有獨立查閱需求（前端串接、PM 確認型態覆蓋率）
- 替代方案：BRIEF 加摺疊 detail 區塊 → 但 markdown 無法 grep，放棄

**D2：月度交付規格建新檔 `MONTHLY_SPEC.md`**
- 月度合約是週期性合約，每一輪月度有自己的交付清單，與 Phase 1–4 的一次性規格性質不同
- 放進 ANIMATION_LIST 會混淆 Phase 交付物 vs 月度交付物的邊界
- 此檔在月度合約簽署後會持續更新（每月追加紀錄），需要獨立生命週期

**D3：直接轉錄 RFP 內容，不摘要**
- 外包無法讀 docx；摘要可能遺漏細節導致後期爭議
- 轉錄完整後由窗口設計師確認與原文一致，確保「docs = 合約」

## Risks / Trade-offs

- **[風險] RFP 簽約後可能有小幅修正** → 緩解：每份新文件標頭標注 `Based on RFP v1.0`，修正時同步更新並留 changelog 記錄
- **[風險] CHARACTER_TYPES.md 龐大，維護成本高** → 緩解：型態規格以型態編號索引，格式標準化，前端可用 grep 快速查找
- **[取捨] 轉錄而非摘要** → 優：合約一致性高；劣：文件較長 → 以可讀性 > 精簡性為原則
