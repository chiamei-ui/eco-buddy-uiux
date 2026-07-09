# ECO Buddy 角色型態規格 Character Type Specifications

**版本 / Version**：v1.2  
**更新日期**：2026-07-02  
**Owner**：窗口設計師 @idahsueh-cmd  
**資料來源**：RFP v1.2（`ecoco-private/specs/ECOCO_RFP_EcoBuddy_v1_2_20260702.docx`）§4、§5  
**適用對象**：前端工程師（@shangchian）、外包動畫師（Anastasiia）

> 本文件為 RFP §4 完整轉錄。型態 ID 以 `#NN` 格式標注，可直接 Ctrl+F 搜尋。

---

## 一、基礎型態 #01–#27 Base States

三維度（hp / clean / mood）各分低（L：0–30）、中（M：31–65）、高（H：66–100）三段，共 3×3×3 = 27 種基礎型態。

| # | 組合 Combo | 狀態標籤 ZH / EN | 體型 Body | 外觀 Appearance | 表情動作 Expression |
|---|---|---|---|---|---|
| #01 | 低-低-低 / L-L-L | 瀕危史萊姆 / Endangered Slime | 乾癟下沉 / Gaunt, low-energy | 沾滿泥濘，灰暗 / Covered in mud, dark | 閉眼哭泣，瑟瑟發抖 / Eyes closed crying, trembling |
| #02 | 低-低-中 / L-L-M | 髒髒小可憐 / Dirty Little Wretch | 乾癟，不規則 / Gaunt, irregular | 帶有污漬斑點 / Stained spots | 睜大眼發呆，偶爾流口水 / Wide-eyed daze, occasional drool |
| #03 | 低-低-高 / L-L-H | 樂觀泥巴球 / Optimistic Mud Ball | 乾癟，跳躍感 / Gaunt, bouncy | 粗糙無光澤 / Rough, matte | 傻笑，手舞足蹈，愛心粒子 / Goofy grin, flailing, heart particles |
| #04 | 低-中-低 / L-M-L | 憂鬱紙片人 / Depressed Paper Doll | 瘦弱如紙片 / Paper-thin | 霧面基礎材質 / Basic matte material | 皺眉，嘆氣，肩膀下垂 / Frowning, sighing, drooping shoulders |
| #05 | 低-中-中 / L-M-M | 標準初生嬰 / Standard Newborn | 瘦小但完整 / Small but complete | 乾淨霧面 / Clean matte | 眼神平靜，規律眨眼 / Calm gaze, regular blinking |
| #06 | 低-中-高 / L-M-H | 迷你啦啦隊 / Mini Cheerleader | 嬌小，動作大 / Petite, expressive | 乾淨明亮 / Clean and bright | 開心揮手，充滿活力 / Happy waving, full of energy |
| #07 | 低-高-低 / L-H-L | 易碎玻璃心 / Fragile Glass Heart | 瘦削下沉 / Slender, low-energy | 晶瑩剔透折射光 / Crystal-clear refracting light | 眉頭深鎖，小心翼翼 / Furrowed brow, cautious |
| #08 | 低-高-中 / L-H-M | 靜謐水晶 / Quiet Crystal | 嬌小精緻 / Delicate, petite | 散發柔和白色光芒 / Emitting soft white glow | 閉目養神，細微呼吸律動 / Eyes closed, subtle breathing rhythm |
| #09 | 低-高-高 / L-H-H | 閃耀精靈 / Radiant Sprite | 嬌小，動作靈活 / Petite, nimble | 自帶高光與星漾粒子（FX7，取代 FX1）/ Built-in highlight and FX7 star particles (replaces FX1) | 雙眼發亮，快速原地旋轉 / Eyes sparkling, rapid spin-in-place |
| #10 | 中-低-低 / M-L-L | 暴躁泥獸 / Raging Mud Beast | 適中略沉重 / Medium, slightly heavy | 大面積髒污混濁 / Large-area dirt, murky | 齜牙裂嘴，跺腳 / Baring teeth, stomping |
| #11 | 中-低-中 / M-L-M | 迷茫拾荒者 / Confused Scavenger | 體型標準 / Standard size | 局部灰塵暗沉 / Partial dust, dim | 左右張望，抓頭 / Looking around, scratching head |
| #12 | 中-低-高 / M-L-H | 樂天泥巴客 / Carefree Mud Traveler | 標準 100% / Standard 100% | 泥巴如裝飾紋路 / Mud as decorative pattern | 憨笑，拍打肚子 / Chuckling, belly-patting |
| #13 | 中-中-低 / M-M-L | 鬧脾氣市民 / Sulky Citizen | 比例標準 / Standard proportions | 乾淨簡約科技材質 / Clean minimalist tech material | 雙手抱胸，撇嘴 / Arms crossed, pouting |
| #14 | 中-中-中 / M-M-M | **【預設】環保初心 / [Default] Eco-Mindset** | 標準俐落 / Standard, clean | 乾淨霧面高質感 / Clean matte, high-quality | 平靜呼吸，溫和微笑 / Calm breathing, gentle smile |
| #15 | 中-中-高 / M-M-H | 快樂小幫手 / Happy Helper | 標準，活潑 / Standard, lively | 乾淨色彩飽和 / Clean, saturated colors | 咧嘴大笑，原地轉圈 / Beaming smile, spinning in place |
| #16 | 中-高-低 / M-H-L | 傲嬌貴族 / Tsundere Noble | 標準 100% / Standard 100% | 表面光滑金屬反射 / Smooth metallic reflection | 閉眼轉頭，高姿態 / Eyes closed, head turned, aloof |
| #17 | 中-高-中 / M-H-M | 優雅守護者 / Elegant Guardian | 標準 100% / Standard 100% | 半透明微光流動 / Semi-transparent glowing shimmer | 溫柔注視，從容微笑 / Gentle gaze, composed smile |
| #18 | 中-高-高 / M-H-H | 科技大使 / Tech Ambassador | 標準 100% / Standard 100% | 全息投影質感 / Holographic projection texture | 充滿自信，發送愛心 / Full of confidence, sending hearts |
| #19 | 高-低-低 / H-L-L | 臃腫污染源 / Bloated Pollution Source | 巨大，底部拖泥 / Massive, trailing mud | 佈滿黑色油污 / Covered in black oil stains | 眼神凶狠，低沉吼叫 / Fierce glare, low growl |
| #20 | 高-低-中 / H-L-M | 遲緩巨漢 / Sluggish Giant | 巨大圓滾滾 / Massive and round | 沾滿灰塵粗糙 / Dusty and rough | 眼神平靜，緩慢點頭 / Calm gaze, slow nod |
| #21 | 高-低-高 / H-L-H | 樂天胖達 / Carefree Chubster | 巨大有彈性 / Massive and elastic | 髒污明顯，汗珠粒子（FX5）/ Visible grime, FX5 sweat-drop particles | 捧腹大笑，地上打滾 / Belly-laughing, rolling on the ground |
| #22 | 高-中-低 / H-M-L | 悶悶不樂巨球 / Gloomy Giant Ball | 圓潤坐地 / Round, seated | 乾淨霧面，色調偏冷 / Clean matte, cool tones | 嘟嘴，賴坐不走 / Pouting, stubbornly sitting |
| #23 | 高-中-中 / H-M-M | 溫和巨獸 / Gentle Giant | 體積龐大穩定 / Massive and stable | 乾淨亮面品牌色 / Clean glossy brand color | 沉穩深呼吸，點頭 / Steady deep breathing, nodding |
| #24 | 高-中-高 / H-M-H | 彈力大福 / Bouncy Mochi | 極度圓潤麻糬 / Extremely round, mochi-like | 乾淨彈性光澤 / Clean elastic sheen | 開心彈跳，Q 彈震動 / Happy bouncing, jelly-like trembling |
| #25 | 高-高-低 / H-H-L | 悲傷神獸 / Sorrowing Divine Beast | 巨大且莊嚴 / Massive and majestic | 發光光暈（白色）/ Glowing halo (white) | 眉頭深鎖，低頭，發光眼淚（FX6）/ Furrowed brow, head down, FX6 glowing tears |
| #26 | 高-高-中 / H-H-M | 沉睡巨像 / Slumbering Colossus | 雄偉穩如泰山 / Majestic and immovable | 完美珍珠光澤 / Perfect pearl luster | 半瞇瞌睡眼，緩慢深沉呼吸 / Drowsy half-closed eyes, slow deep breathing |
| #27 | 高-高-高 / H-H-H | **【頂規】ECOCO 領袖 / [Peak] ECOCO Leader** | 飽滿圓潤完美 / Full, round, perfect | 散發彩虹漸層全息光芒；自動開啟 S2（has_halo）/ Rainbow gradient holographic glow; auto-enables S2 (has_halo) | 耀眼自信，華麗登場 / Dazzling confidence, grand entrance |

> **#27 觸發條件**：三維度需同時在高階（66–100）才觸發。後端確認累計滿值天數 ≥ 7 天後方切換至 #36「循環之神」。

---

## 二、特殊隱藏型態 #28–#36 Special Hidden States

後端依解鎖條件判定後主動寫入 Rive State Machine 對應 Boolean。Rive 端**僅依 has_* 值顯示視覺**，不負責解鎖條件判定。

| # | 解鎖條件 | 狀態標籤 ZH / EN | 解鎖門檻說明 | 自動啟用插槽 |
|---|---|---|---|---|
| #28 | HP ≥ 95 且當週餵食 ≥ 5 次 | 暴食過載者 / Overfed Overload | hp_level ≥ 95，同週觸發餵食 ≥ 5 次 | S7（`has_overfed`） |
| #29 | 潔淨度連續 7 天 ≥ 90 | 潔癖大師 / Neatness Master | 連續 7 自然日 clean_level ≥ 90 | S3（`has_laurel`） |
| #30 | 心情 ≥ 95 且點擊達上限 | 瘋狂點擊狂 / Click Maniac | mood_level ≥ 95 且當日觸摸達上限（20 次） | S8（`has_frenzy`） |
| #31 | 累計回收寶特瓶 ≥ 500 | 寶特瓶國王 / PET Bottle King | 後端累計達標後推送解鎖 | S9（`has_bottle`） |
| #32 | 累計回收電池 ≥ 200 | 電能機甲 / Energy Mech | 後端累計達標後推送解鎖 | S1（`has_armor`） |
| #33 | 三大屬性同時歸零（hp=0、clean=0、mood=0）後首次登入 | （懲罰）壞滅核心 / Corruption Core | 三大屬性同時歸零後首次登入觸發；後端須於屬性全歸零時停止衰減結算（以 0 為下限）；`has_dark=true` 強制鎖定至月底，期間用戶養成行為由後端正常累積但 Rive 視覺強制顯示 #33 | S5（`has_dark`） |
| #34 | 連續登入 ≥ 7 天 | 派對動物 / Party Animal | 個人化連續 7 天登入（不綁自然日）；補簽計入連續達標（PM #34/#35） | S4（`has_disco`） |
| #35 | 首次完成任意金額 IAP 儲值 | 黃金暴發戶 / Golden Nouveau Riche | 任一 IAP 交易完成後自動解鎖 | S10（`has_golden`） |
| #36 | 三維度同時達滿值且累計 ≥ 7 天 | **【傳說】循環之神 / [Legend] Cycle God** | 三者同時達 100，後端累計達滿值天數 ≥ 7 天；每日結算，不需連續；累計天數於月底結算時歸零，不跨月延續 | 後端送 `has_cycle_crown=true` |

---

## 三、has_halo / has_cycle_crown 連動規則

> RFP §4.1 表尾備註完整轉錄。

### #27 與 has_halo

- **進入 #27**：後端同步將 `has_halo` 設為 `true`（S2 彩虹光環顯示）
- **離開 #27**（一般情況）：後端同步將 `has_halo` 設為 `false`

### #27 → #36 切換例外

當角色由 #27 切換至 #36（後端同步送 `has_cycle_crown=true`）：

- 後端**不應**同步送 `has_halo=false`
- `has_halo=true` 得以維持，因為此切換點後端不傳 `has_halo=false`
- S6 的 `(a)` 條自驅機制（見下方）在此情境下為 no-op（has_halo 已為 true），並非「持續維持」機制
- 本例外**覆寫**「離開 #27 時將 has_halo 設為 false」之通用規則

### S6 循環之冠四條責任規則

| 條 | 主體 | 規則 |
|---|---|---|
| (a) Rive 自驅 | Rive | `has_cycle_crown` 由 `false→true` 之瞬間，Rive 自動將 `has_halo` 設為 `true` |
| (b) 後端責任 | 後端 | 送出 `has_cycle_crown=false` 時，必須一併明確指定 `has_halo` 目標值（true 或 false）；Rive 在 `has_cycle_crown` 由 `true→false` 切換時**不自動處理** `has_halo` |
| (c) Override 優先 | 後端 | 任何時點後端傳入之 `has_halo` 值（含與 `has_cycle_crown` 同時傳入者），優先於 (a) 條 Rive 自驅值 |
| (d) 月底結算 | 後端 | 後端統一將所有 `has_*` 重置為 `false`；送 `has_cycle_crown=false` 同時將 `has_halo` 一併重置為 `false`，符合 (b) 條「明確指定」要求，無須另行單獨傳送 |

### 月底結算重置清單

後端月底結算後須重置以下所有插槽為 `false`，三大屬性重置為 `50`：

`has_halo`、`has_cycle_crown`、`has_armor`、`has_laurel`、`has_disco`、`has_dark`、`has_overfed`、`has_frenzy`、`has_bottle`、`has_golden`

---

## 四、FX3 / S2 共存規則

當角色處於 **#27 或 #36**（clean 高階 + `has_halo=true`）：
- **S2 彩虹光環取代 FX3 柔和白色光暈**，避免雙層光環疊加

其他 clean 高階型態（如 #09、#18、#24）：FX3 依 [ANIMATION_LIST.md](ANIMATION_LIST.md) §FX3 規格**正常顯示**。

---

---

## 五、§3.6 狀態專屬視覺元素規則 State-Specific Visual Element Rules

> RFP §3.6 完整轉錄。命名清單見 [NAMING.md §四](NAMING.md)。

**（a）定義**：基礎狀態（#01–#27）各含狀態專屬視覺元素，為該狀態之視覺身份記號；由 Rive State Machine 依 hp_level／clean_level／mood_level 解析後之當前基礎狀態控制顯示／隱藏。**不屬配件插槽（S1–S10）類別，不使用 `has_*` Boolean，後端不傳值。**

**（b）跨月度沿用**：
- **b-1 預設沿用**：視覺素材預設沿用首版美術（形狀、色彩、材質、細節）；月度設計師依當月角色身形比例與相同骨架下對應附著節點進行位置與縮放調整
- **b-2 月度合約彈性**：若月度角色風格不適合直接沿用，得於月度合約附件另行約定局部重繪或替換；惟不得新增後端 input、不得變更 State Machine、不得改變 26 個狀態項目數量

月度替換時，3.6 元素視覺應呈現「角色持有／穿戴／攜帶」之自然狀態。

**（c）覆蓋優先序**：`has_dark=true`（#33 壞滅核心）啟用時，所有 3.6 元素強制隱藏；`has_halo`／`has_cycle_crown` 不影響 3.6 元素顯示。

**（e）命名規範**：`state_<NN>_<type>_<descriptor>`；type 限 `prop` / `decor` / `decal` / `mark`。

**（f）圖層拆分**：
- d-1 類（需甲方確認）：須於 Phase 0B-2 前提交拆分計畫，由甲方書面確認
- d-2 類（乙方自行處理）：外觀不影響驗收條件者，Contractor 可自行決定圖層細節

**（g）動畫性質**：3.6 元素附著骨架律動（隨本體動作自然跟隨），**不得有獨立循環動畫**。

---

## 六、§3.7 月度替換架構鎖定規則 Monthly Replacement Architecture Lock

月度替換僅得更換 Skin（視覺素材層），不得變更控制層邏輯。首版建立後鎖定項目：

| 條 | 鎖定項目 | 規則 |
|---|---|---|
| a-1 | `BuddyMachine` | State Machine 名稱固定，不得改名 |
| a-2 | `hp_level` / `clean_level` / `mood_level` | 三大核心 input，範圍 0–100，不得新增或改名 |
| a-3 | `ev_*` trigger | 首版鎖定，月度不得新增或改名 |
| a-4 | Timeline／Animation Node 骨幹 | 沿用首版，僅允許月度素材對應之葉層命名調整 |

**（b）`morph_01`~`morph_27`**：Rive 內部視覺／Skin 對應命名，用於編輯階段辨識當前基礎狀態，**不是後端 input**；後端不傳送，狀態解析由 State Machine 依 hp_level／clean_level／mood_level 內部運算完成。

**（c）Pivot／Bounds／Draw Order 安全範圍**：首版確立各狀態之 pivot 錨點、bounds 邊界與 draw order 為基準；月度替換不得：
- c-1 造成 pivot 錨點跳動導致動作起訖位置錯位
- c-2 造成 bounds 超出安全範圍，導致 App 端裁切或遮擋錯位
- c-3 改變關鍵層 draw order（如 S5 暗黑核心遮擋鏡頭前元素）

安全範圍以首版 Phase 0B-2 確認之 pivot／bounds／draw order 規格表為準。

**（d）月度合約驗收繼受**：技術驗收須繼受 C-P2-2（骨架附著律動）、C-P2-3（狀態切換轉場）、C-P2-6（pivot／bounds／draw order 安全範圍）之檢核原則。各次月度合約得補充專屬驗收項目，但不得取消上述繼受項目。

---

## 七、§5.2 成就型特殊插槽互斥規則 Achievement-Type Special Slot Mutual Exclusivity

**（a）互斥族群定義**：成就型特殊插槽（#28–#36 系列，實作於 S1–S6 相關插槽），除下列例外，任一時刻至多 **1 個** `has_*=true`。

**（b）互斥族群成員**：

`has_overfed`（#28）、`has_laurel`（#29）、`has_frenzy`（#30）、`has_bottle`（#31）、`has_armor`（#32）、`has_dark`（#33）、`has_disco`（#34）、`has_golden`（#35）

同族群內任一 `has_*=true` 時，其他族群成員一律為 `false`。

**（c）非互斥成員**：`has_halo`（隨 #27／#36）、`has_cycle_crown`（隨 #36）不受本規則約束，得同時與族群內任一 `has_*=true` 並存；並存時之 3.6 元素覆蓋規則依 §3.6(c) 辦理。

**（d）狀態更新時序**：由 has_A→`false` 切換為 has_B→`true` 時，須於**同一 tick** 完成，避免中間態產生兩個 `has_*=true` 之非法組合。

**（e）fail-safe 最高優先** — `has_dark=true`（#33 壞滅核心）觸發後：
- 強制所有互斥族群成員為 `false`
- 3.6 元素、S1–S10 插槽視覺、`has_halo`、`has_cycle_crown` 顯示一律強制為 `false`
- 僅顯示 S5 暗黑核心取代視覺
- `has_dark=true` **鎖定至月底**；期間用戶養成數值後端正常累積，Rive 視覺強制顯示 #33

---

*Based on RFP v1.2 — 2026-07-02。如 RFP 有修訂，本文件同步更新並記錄異動。*
