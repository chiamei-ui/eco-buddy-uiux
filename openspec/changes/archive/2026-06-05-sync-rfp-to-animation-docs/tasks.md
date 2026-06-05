## 1. 準備：讀取 RFP 原始資料

- [ ] 1.1 用 pandoc 轉換完整 RFP docx 為純文字，確認可讀取（`ecoco-private/specs/ECOCO_RFP_EcoBuddy_v1_0_20260515.docx`）
- [ ] 1.2 確認 RFP §4、§5、§6.2、§7、§8.2、§9.1、§2.3、§11、附件驗收表 C/D/E 各節內容完整可擷取

## 2. 新增 CHARACTER_TYPES.md

- [ ] 2.1 建立 `docs/animation/CHARACTER_TYPES.md`，加入標頭（標題、Owner、Based on RFP v1.0、最後更新日）
- [ ] 2.2 從 RFP §4.1 轉錄 #01–#27 基礎型態完整表格（型態 ID、中文名、狀態標籤、體型、外觀/動作重點）
- [ ] 2.3 從 RFP §4.2 轉錄 #28–#36 特殊隱藏型態清單（含解鎖條件、has_* 欄位名）
- [ ] 2.4 從 RFP §4 表尾轉錄 has_halo / has_cycle_crown 連動規則（#27→#36 切換例外、月底重置）
- [ ] 2.5 確認型態 ID 可用 Ctrl+F 搜尋定位（每行以 `#NN` 開頭）

## 3. 新增 MONTHLY_SPEC.md

- [ ] 3.1 建立 `docs/animation/MONTHLY_SPEC.md`，加入標頭（標題、Owner、Based on RFP v1.0）
- [ ] 3.2 從 RFP §2.3 轉錄月度合約逐月交付素材項目表（骨架 .rev、食物 icon ×4、月初/月底動畫）
- [ ] 3.3 從 RFP §11 轉錄月度骨架相容性約束（命名一致性、不修改既有 Artboard 結構、驗收截圖要求）

## 4. 更新 ANIMATION_BRIEF.md

- [ ] 4.1 在 ANIMATION_BRIEF.md 新增「§六 動作事件規格」章節，從 RFP §6.2 轉錄 10 大動作事件（觸發條件、屬性影響值、動畫時長、Rive vs 後端責任）
- [ ] 4.2 在 ANIMATION_BRIEF.md 更新效能規範章節，補入 RFP §8.2 完整壓力測試規格（記憶體 ≤15MB、高頻觸發 1min×20 次、多視圖適配）
- [ ] 4.3 在 ANIMATION_BRIEF.md 新增「§七 音效規格」章節，從 RFP §7 轉錄格式規格（MP3、44.1kHz、時長範圍）與商業授權憑證要求（台灣+全球）
- [ ] 4.4 在 ANIMATION_BRIEF.md 驗收表附件補入 C 組（插槽驗收 C-1 至 C-7）、D 組（動作事件驗收 D-1 至 D-6）、E 組（音效驗收 E-1 至 E-3）

## 5. 更新 ANIMATION_LIST.md

- [ ] 5.1 在 ANIMATION_LIST.md 新增「Phase 2–4 交付物總覽」章節，列出 Phase 2（27 型態 + 事件 + 埋點）、Phase 3（特殊型態 + 插槽 + 粒子）、Phase 4（效能 + 音效 + 驗收）的完整交付項
- [ ] 5.2 從 RFP §9.1 轉錄粒子效果 FX1–FX7 規格（FX1 愛心、FX2a/b 髒污/清潔、FX3 發光光暈、FX4 金色、FX5 汗珠、FX6 發光眼淚、FX7 星漾），含適用型態與特例說明

## 6. 更新 NAMING.md

- [ ] 6.1 在 NAMING.md Slot Booleans 章節 S2 項目補入 FX3 共存規則說明
- [ ] 6.2 在 NAMING.md Slot Booleans 章節 S6 項目補入四條 Rive 自驅邏輯責任規則（(a)(b)(c)(d)）

## 7. 驗收

- [ ] 7.1 確認五個文件（CHARACTER_TYPES.md、MONTHLY_SPEC.md、ANIMATION_BRIEF.md、ANIMATION_LIST.md、NAMING.md）皆可正常開啟且內容與 RFP 原文一致
- [ ] 7.2 commit 所有新增/更新文件，使用 `[anim]` prefix
