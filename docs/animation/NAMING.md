# ECO Buddy 命名手冊 Naming Manual

**版本 / Version**: v1.2  
**對應 xlsx**: `ecoco-private/naming/ECOCO_naming_manual_v1_2_bilingual_20260716.xlsx`  
**Owner**: 窗口設計師 @idahsueh-cmd（主寫）/ 前端工程師 @shangchian（技術格式確認）  
**Commit prefix**: `[anim]`

---

## 版本升版協議

| 類型 | 觸發條件 | 對外動作 |
|------|---------|---------|
| patch | 說明文字修正，不影響命名 | 不需通知外包 |
| minor | 新增 slot / event 名稱 | 書面通知 Anastasiia + 等書面確認後方可升版 |
| major | 骨架架構變動、命名規則根本性異動 | 視同合約異動，需重新議定 |

> 任何新增命名需求，須先取得甲方書面確認，外包不得自行命名。

---

## 使用規則（摘自 xlsx）

1. 所有命名必須完全符合本文件，包含大小寫與底線，不得自行修改
2. 交付 `.rev` 檔前，須對照本文件截圖驗證 Rive 內部命名
3. 任何命名問題或新增變數需求，須事先書面確認，不得自行命名
4. Rive Runtime 串接、後端數值驅動與事件監聽，由甲方工程師實作

---

## 一、Core Parameters 核心屬性參數

| 參數名稱 | 類型 | 值域 | 說明 |
|---------|------|------|------|
| `hp_level` | Number | 0–100 | 控制角色體型縮放 |
| `clean_level` | Number | 0–100 | 控制角色清潔外觀 |
| `mood_level` | Number | 0–100 | 驅動臉部表情（三段 State Machine 離散切換，禁止 1D Blend Axis 線性映射） |

### hp_level 三段規格

| 段位 | 值域 | 視覺規格 |
|------|------|---------|
| 低階 | 0–30 | 扁薄下沉，低能量輪廓，消瘦纖細 |
| 中階 | 31–65 | 標準基準比例，清潔正常 |
| 高階 | 66–100 | 視覺量感約為 mid 基準之 105–115%，姿態挺立，圓潤飽滿 |

### clean_level 三段規格

| 段位 | 值域 | 視覺規格 |
|------|------|---------|
| 低階 | 0–30 | 佈滿髒污粒子 + 色彩飽和度 −40%（低階內部線性過渡：level=0 為 −40%，level=30 為 0%；此為本專案唯一允許的 1D 連續映射例外） |
| 中階 | 31–65 | 霧面乾淨材質，色彩完整還原 |
| 高階 | 66–100 | 輕透光材質，晶透折射；發光光暈 + 漂浮粒子 |

### mood_level 三段規格

| 段位 | 值域 | 視覺規格 |
|------|------|---------|
| 低階 | 0–30 | 眉毛下垂、嘴角向下、姿態下沉 |
| 中階 | 31–65 | 中性表情、規律眨眼、細微律動 |
| 高階 | 66–100 | 瞳孔放大、嘴角上揚、愛心粒子 |

> 3×3×3 = 27 種基礎型態。後端串接與 Rive Runtime 呼叫由甲方工程師實作。

### 架構鎖定項目（RFP §3.7）

以下項目跨月度鎖定，月度合約不得更名、新增或移除：

| 項目 | 說明 |
|------|------|
| `BuddyMachine` | State Machine 名稱固定，不得改名 |
| `hp_level` / `clean_level` / `mood_level` | 三個必要 input 名稱固定，不得更名 |
| `ev_*` trigger | 所有事件埋點名稱鎖定，不得新增或改名（見第三節） |
| `morph_01`–`morph_27` | Rive SM 內部型態對應，**非**後端傳入的 input，不出現於後端 API |

---

## 二、Slot Booleans 配件插槽

### 裝飾配件（S1–S6）｜可疊加，不取代本體外觀

| 插槽 | Boolean 變數名 | 配件名稱 | 中文 |
|------|--------------|---------|------|
| S1 | `has_armor` | Tech Armor | 科技護甲 |
| S2 | `has_halo` | Rainbow Halo | 彩虹光暈 ※（背後圓形光圈，非頭頂，RFP v1.4 修訂） |
| S3 | `has_laurel` | Laurel Wreath | 月桂花環 |
| S4 | `has_disco` | Disco Ball | 迪斯可球 |
| S5 | `has_dark` | Dark Core | 黑暗核心 |
| S6 | `has_cycle_crown` | Cycle Crown | 循環王冠 ※ |

### Skin Override（S7–S10）｜特殊型態觸發時自動啟用，取代本體外觀

| 插槽 | Boolean 變數名 | 配件名稱 | 中文 |
|------|--------------|---------|------|
| S7 | `has_overfed` | Overfed Overlay | 過飽疊加層 |
| S8 | `has_frenzy` | Frenzy Overlay | 狂熱疊加層 ※※（RFP v1.4 改版） |
| S9 | `has_bottle` | PET Bottle Overlay | PET 瓶疊加層 |
| S10 | `has_golden` | Golden Overlay | 黃金疊加層 |

#### S2 ※ 視覺規格與 FX3 共存規則（RFP v1.4 §5.1）

**視覺**：背後圓形彩虹漸層光圈，環繞於角色**背後**（非頭頂）。此為 RFP v1.4 修訂項目 —— 前版（v1.3 及以前）位置定義為頭頂，外包若已依舊版位置製作，須主動書面通知修改。

**FX3 共存規則**：當角色處於 **#27 或 #36**（clean 高階 + `has_halo=true`）：S2 彩虹光環**取代** FX3 柔和白色光暈，避免雙層光環疊加。其他 clean 高階型態（#09、#18、#24 等）：FX3 正常顯示。

#### S8 ※※ 視覺規格（RFP v1.4 §5.1 改版）

**視覺**（v1.4 定案，取代舊版「毛髮豎立＋頭頂冒白煙」）：全身電流弧光；愛心形眼睛；**雙手 Click Ripple 光圈**；**手部透明動態殘影**。電流弧光、Click Ripple 光圈與手部殘影須為向量路徑；全數由既有 `has_frenzy` 觸發顯示，不新增 FX、event 或 input。此為明顯重做項目，外包若已依舊版動作邏輯製作，須主動書面通知修改。

#### S6 ※ 四條責任規則（Rive 與後端職責劃分）

| 條 | 主體 | 規則 |
|---|---|---|
| (a) Rive 自驅 | Rive | `has_cycle_crown` 由 `false→true` 之瞬間，Rive 自動將 `has_halo` 設為 `true` |
| (b) 後端責任 | 後端 | 送出 `has_cycle_crown=false` 時，**必須**一併明確指定 `has_halo` 目標值（true 或 false）；Rive 在 `has_cycle_crown` 由 `true→false` 時**不自動處理** `has_halo` |
| (c) Override 優先 | 後端 | 任何時點後端傳入之 `has_halo` 值，優先於 (a) 條 Rive 自驅值 |
| (d) 月底結算 | 後端 | 統一重置所有 `has_*` 為 `false`；送 `has_cycle_crown=false` 同時將 `has_halo` 一併重置，符合 (b) 條「明確指定」要求 |

> 詳細連動規則及 #27→#36 切換例外見 [CHARACTER_TYPES.md §三](CHARACTER_TYPES.md)。

#### §5.2 成就型插槽互斥規則（RFP §5.2）

**互斥族群**：`has_overfed`（#28）、`has_laurel`（#29）、`has_frenzy`（#30）、`has_bottle`（#31）、`has_armor`（#32）、`has_dark`（#33）、`has_disco`（#34）、`has_golden`（#35）

- 任一時刻至多 **1 個**互斥族群成員為 `true`；切換時 old→`false` 與 new→`true` 須於**同一 tick** 完成
- **例外**：`has_halo`（S2）與 `has_cycle_crown`（S6）不在互斥族群，得同時與任一互斥成員並存

**fail-safe 最高優先**：`has_dark=true`（S5 #33 壞滅核心）一經觸發：
- 強制所有互斥族群成員為 `false`
- 3.6 元素、S1–S10 插槽視覺、`has_halo`、`has_cycle_crown` 顯示一律強制為 `false`
- 僅顯示 S5 暗黑核心取代視覺，且**鎖定至月底**（期間用戶養成數值後端正常累積，Rive 視覺強制顯示 #33）

---

## 三、Event Triggers 事件埋點

| 事件名稱 | 動作群組 | 觸發時機 | 音效 |
|---------|---------|---------|------|
| `ev_eat_gulp` | 餵食 | 食物進入口中、開始吞嚥時 | 吞嚥音（Q 彈感）；音效依每週食物週期變化 |
| `ev_eat_chew` | 餵食 | 咀嚼動畫期間 | 咀嚼音（0.4–0.6s）；稀有食物 W4 已退役，不需稀有版音效 |
| `ev_scan_start` | 清潔 | 品牌橘色掃描光束從頂部開始時 | 科技掃描音效 |
| `ev_dirt_pop` | 清潔 | 髒污粒子從毛髮剝落散開時 | 灰塵爆裂音 |
| `ev_scan_end` | 清潔 | 最終掃描影格、清潔確認完成時 | 無；後端可監聽確認清潔屬性已更新 |
| `ev_pet_react` | 觸摸 | 角色對觸摸做出反應時 | 角色音 / 環境音；音調依心情段位變化 |
| `ev_pet_jump` | 觸摸 | 高心情撒嬌 / 跳躍動作時 | 輕盈跳躍音 |
| `ev_item_open` | 道具使用 | 禮盒開啟、閃光出現時 | 開箱閃光音 |
| `ev_item_react` | 道具使用 | 角色與道具互動開始時 | 依道具種類變化 |
| `ev_ad_charge` | 廣告獎勵 | 充能粒子環繞角色時 | 充能上升音 |
| `ev_ad_glow` | 廣告獎勵 | 角色發光結束時 | 光暈閃爍音 |
| `ev_decay_start` | 每日衰減 | 角色顫抖收縮動畫開始時 | 顫抖音；登入時播放 |
| `ev_decay_look` | 每日衰減 | 角色以悲傷表情望向鏡頭時 | 輕嘆氣音 |
| `ev_decay_end` | 每日衰減 | 衰減動畫結束、新 Idle 開始前 | 無；後端可監聽確認衰減數值已寫入 |
| `ev_evolve_start` | 進化 | 白光包裹角色（第 0 影格）時 | 上升音起始 |
| `ev_evolve_burst` | 進化 | 品牌色粒子爆發（動畫約 1.0s 處） | 成就爆發音（1–2s） |
| `ev_gold_burst` | 退役保留名 | 原 W4 稀有食物事件；W4 已由 PM #41.6 移除，未來若轉用到其他狀態需另開動畫變更 | 不作為食物流程必要音效 |
| `ev_spawn_hatch` | 每月發放 | 角色從蛋孵化或從光中現身時 | 孵化音；每月 1 日首次登入觸發，直接接 Idle |
| `ev_farewell_start` | 每月結束 | 揮手告別動畫開始時 | 溫馨告別音；月末最後一天觸發 |
| `ev_farewell_end` | 每月結束 | 告別動畫完全結束（約 2.0s 處） | 無；後端可監聽觸發歸檔與下月預告推播 |
| `ev_collapse_start` | 崩塌 | 黑色裂紋從四肢蔓延至全身時 | 裂縫蔓延低頻音；三大屬性同時歸零後首次登入觸發 |
| `ev_collapse_end` | 崩塌 | 紅眼亮起、崩塌型態完成時 | 深沉衝擊音；接入型態 #33 Idle |

> 所有事件埋點必須與 Rive Editor 關鍵影格同步。音效播放整合由甲方工程師實作；外包只需確保事件名稱與本表完全一致。
> ⚠️ **效力註記（2026-07-29）**：`ev_gold_burst` 標為「退役保留名」屬 PM #41.6 決議。依 RFP §3.7(a-3)，`ev_*` 命名於首版鎖定、不得新增或改名，**該名稱仍為 22 個鎖定 trigger 之一，乙方仍須埋入**；合約修訂完成前不得視為已免除。詳見 [ANIMATION_BRIEF.md](ANIMATION_BRIEF.md) 檔頭效力註記。

---

## 備注

- **xlsx 正式版位置**：`ecoco-private/naming/ECOCO_naming_manual_v1_2_bilingual_20260716.xlsx`（對外發送用，合約驗收以此版本為準）
- **通知外包**：任何影響外包工作的命名異動，由**窗口設計師**以正式 email 通知 Anastasiia，等書面確認後方可進入正式建構
- **準據語言**：中英雙語並列，以中文版為準

---

## 四、State-Specific Visual Elements 狀態專屬視覺元素

> 對應 RFP §3.6 及 4.1 附表 B。命名格式：`state_<NN>_<type>_<descriptor>`；type 限 `prop` / `decor` / `decal` / `mark`。  
> 元素由 Rive State Machine 依當前基礎狀態自動控制顯示／隱藏，**不使用 `has_*` Boolean，後端不傳值**。  
> #14 為預設基準狀態，無 3.6 元素，不計入 26 個狀態項目。  
> 主命名為 Phase 0B-2 對齊建議；最終命名須雙方書面確認。  
> RFP v1.4（2026-07-16）已定案下列項目，表中以「RFP v1.4 新增／已鎖定」標註：#05／#11／#13／#16／#23／#27 新增固定命名；#15／#18／#20／#22／#23／#27 由原「二選一」鎖定為單一方案。若外包已依舊版（v1.3 以前）製作對應素材，須主動書面通知修改。

| # | 狀態標籤 ZH / EN | 主命名 element_naming | type | 骨架附著位置 | 備註 |
|---|---|---|---|---|---|
| #01 | 瀕危史萊姆 / Endangered Slime | `state_01_decal_slime_drip` | decal | body_edge（身體邊緣） | 與 FX2a 髒污粒子並存 |
| #02 | 髒髒小可憐 / Dirty Pitiful | `state_02_mark_fly` | mark | head_top_or_side（頭部上方或側邊） | 海龜首版避開帽子位置；月度新角色依相同骨架下對應附著節點與身形比例決定位置 |
| #03 | 樂觀泥巴球 / Optimistic Mudball | `state_03_decal_mud_splash` | decal | body_surface（身體表面） | 與 FX2a 髒污粒子、FX1 愛心粒子並存 |
| #04 | 憂鬱紙片人 / Melancholy Paperman | `state_04_decal_paper_fold` | decal | body_surface（身體表面） | — |
| #05 | 標準初生嬰 / Standard Newborn | `state_05_prop_bib` | prop | chest（胸前） | 小圍兜；紅帽與圍兜均保留 |
| #05 | 標準初生嬰 / Standard Newborn | `state_05_prop_bonnet` | prop | head_top（頭頂） | 白色帽套，套於既有紅帽外側（RFP v1.4 新增） |
| #06 | 迷你啦啦隊 / Mini Cheerleader | `state_06_prop_pompom` | prop | hands_LR（雙手） | 左右手各一；子圖層命名：`state_06_prop_pompom_L`、`state_06_prop_pompom_R` |
| #07 | 易碎玻璃心 / Fragile Glass Heart | `state_07_decor_cracked_heart` | decor | chest（胸前） | 與 FX3 發光光暈並存 |
| #08 | 靜謐水晶 / Tranquil Crystal | `state_08_decor_crystal_facet` | decor | body_surface（身體表面） | 與 FX3 發光光暈並存 |
| #09 | 閃耀精靈 / Sparkling Sprite | `state_09_decor_star` | decor | head_side（頭部側邊） | 海龜首版避開帽子中心；與 FX3 發光光暈、FX7 星燦粒子並存（FX7 取代 FX1） |
| #10 | 暴躁泥獸 / Grumpy Mudbeast | `state_10_decor_anger` | decor | character_detail（角色細節） | 彈性全面表達；子圖層由乙方於 Phase 0B-2 時提交；子圖層命名：`state_10_decor_anger_<descriptor>` |
| #11 | 迷茫拾荒者 / Lost Scavenger | `state_11_prop_salvage_bag` | prop | side（側邊） | 與 FX2a 髒污粒子並存 |
| #11 | 迷茫拾荒者 / Lost Scavenger | `state_11_mark_confusion` | mark | head_surround（頭部周圍） | 固定問號／混亂符號組，固定圖層，非粒子、無獨立循環（RFP v1.4 新增） |
| #12 | 樂天泥巴客 / Cheerful Mudfellow | `state_12_decor_scarf` | decor | neck（脖子） | 與 FX2a 髒污粒子、FX1 愛心粒子並存 |
| #13 | 鬧脾氣市民 / Cranky Citizen | `state_13_decor_tie` | decor | neck_front_center（脖子前方中央） | 歪斜小領帶 |
| #13 | 鬧脾氣市民 / Cranky Citizen | `state_13_mark_anger` | mark | head_and_feet（頭部與腳邊） | 固定怒筋＋左右蒸氣＋腳邊跺腳線，同一組固定圖層，非粒子、無獨立循環；子圖層：`state_13_mark_anger_vein`、`state_13_mark_anger_steam_L`、`state_13_mark_anger_steam_R`、`state_13_mark_anger_stomp_L`、`state_13_mark_anger_stomp_R`（RFP v1.4 新增） |
| #14 | 環保初心 / Eco Initiate | — | — | — | 預設基準狀態，無 3.6 元素 |
| #15 | 快樂小幫手 / Happy Helper | `state_15_prop_tool_kit` | prop | side（側邊） | **已鎖定**：固定採工具包方案，不提供手套選項（RFP v1.4 定案） |
| #16 | 傲嬌貴族 / Haughty Noble | `state_16_decor_bowtie` | decor | neck_front_center（脖子前方中央） | 蝴蝶結；位置與 #25 頸部環繞區隔 |
| #16 | 傲嬌貴族 / Haughty Noble | `state_16_prop_throne` | prop | behind_body（角色後方） | 紅金王座，固定背景道具，依骨架附著、無獨立動畫循環（RFP v1.4 新增） |
| #17 | 優雅守護者 / Elegant Guardian | `state_17_decor_shield` | decor | chest（胸前） | 與 FX3 發光光暈並存；位置避免與 #06 雙手道具衝突 |
| #18 | 科技大使 / Tech Ambassador | `state_18_decor_hologram` | decor | chest（胸前） | **已鎖定**：胸前全息 e 浮雕貼花（品牌 e 標誌）；與 FX3 發光光暈、FX1 愛心粒子並存；浮雕風格以區隔 #27 領袖徽章視覺；e 標誌僅為道具美術細節，不建立獨立 Slot 或 input（RFP v1.4 定案） |
| #19 | 臃腫污染源 / Bloated Polluter | `state_19_decal_pollution` | decal | body_surface（身體表面） | 彈性全面表達；子圖層由乙方於 Phase 0B-2 時提交；子圖層命名：`state_19_decal_pollution_<descriptor>` |
| #20 | 遲緩巨漢 / Sluggish Giant | `state_20_prop_towel` | prop | shoulder（肩膀） | **已鎖定**：固定採毛巾方案，不提供腳環選項（RFP v1.4 定案） |
| #21 | 樂天胖達 / Cheerful Chubby | `state_21_decor_belt` | decor | waist（腰部） | 與 FX2a 髒污粒子、FX5 汗珠粒子、FX1 愛心粒子並存 |
| #22 | 悶悶不樂巨球 / Sulky Sphere | `state_22_decor_raincloud` | decor | head_top（頭部上方） | **已鎖定**：固定含黃色閃電（同一組 decor）；海龜首版置於帽子上方；月度新角色依相同骨架下對應附著節點與身形比例決定位置；閃電為固定圖層，不拆分為粒子、獨立動畫或新 FX（RFP v1.4 定案） |
| #23 | 溫和巨獸 / Gentle Behemoth | `state_23_decor_flower_bird` | decor | shoulder（肩膀） | **已鎖定**：首版定案採花朵，不採小鳥（RFP v1.4 定案） |
| #23 | 溫和巨獸 / Gentle Behemoth | `state_23_decor_cape` | decor | shoulders_back（肩背） | 白色短披風，固定圖層（RFP v1.4 新增） |
| #23 | 溫和巨獸 / Gentle Behemoth | `state_23_mark_sunburst` | mark | behind_body（角色後方） | 頭後放射背板，固定 mark 圖層，不新增 FX（RFP v1.4 新增） |
| #24 | 彈力大福 / Bouncy Daifuku | `state_24_decal_sugar_dust` | decal | body_surface（身體表面） | 與 FX1 愛心粒子並存 |
| #25 | 悲傷神獸 / Sorrowful Beast | `state_25_decor_neck_ornament` | decor | neck_around（脖子環繞） | 與 FX3 發光光暈、FX6 發光眼淚粒子並存 |
| #26 | 沉睡巨像 / Sleeping Titan | `state_26_mark_z` | mark | head_top（頭部上方） | 海龜首版紅帽不取代，置於帽子上方；月度新角色依相同骨架下對應附著節點與身形比例決定位置 |
| #27 | ECOCO 領袖 / ECOCO Leader | `state_27_decor_leader_badge` | decor | chest（胸前） | **已鎖定**：固定採徽章＋披風雙件式，不提供斜背肩帶選項；與 FX1 愛心粒子並存；S2 彩虹光環依 §9.1 規格取代 FX3（RFP v1.4 定案） |
| #27 | ECOCO 領袖 / ECOCO Leader | `state_27_decor_leader_cape` | decor | shoulders_back（肩背） | 紅色領袖披風，固定圖層（RFP v1.4 新增） |
| #27 | ECOCO 領袖 / ECOCO Leader | `state_27_decor_leader_circle` | decor | underfoot（腳下） | 腳下循環魔法陣，固定圖層；#36 觸發時由 S6 循環之冠的 ECOCO 六角能量圈**升級取代（非疊加）**（RFP v1.4 新增） |

> 最終命名須雙方書面確認後方可進入正式建構。視覺規格詳見 [CHARACTER_TYPES.md §五](CHARACTER_TYPES.md)。
