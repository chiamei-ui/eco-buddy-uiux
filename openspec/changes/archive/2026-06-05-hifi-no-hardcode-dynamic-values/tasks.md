## 1. 規格文件補充（docs/design/UI_SPEC.md）

- [x] 1.1 在 `UI_SPEC.md` 新增「動態數值規則」章節，列出所有不得 hardcode 的欄位清單與 `[API: <field>]` 標注格式說明
- [x] 1.2 補充 P1 食物欄「存量上限 Badge」標注：`[API: food_slot_max_count]`
- [x] 1.3 補充 P1 觸碰互動標注：`[API: tap_mood_gain]`、`[API: tap_daily_limit]`
- [x] 1.4 補充 P1 / P9 道具效果值標注：各道具對應 API 欄位（`tool_cat_wand_mood_effect` 等）
- [x] 1.5 補充 P1 道具有效期閾值標注：`[API: tool_warn_threshold_hours]`、`[API: tool_free_expire_hours]`、`[API: tool_paid_expire_days]`
- [x] 1.6 補充 P6 廣告開箱說明：掉落結果由後端回傳，前端不持有機率表
- [x] 1.7 補充 P4 IAP 商品定價標注：`[IAP SKU: eco_pass_monthly]`、`[IAP SKU: sprint_pack_199]`，並說明前端讀取平台 SDK 本地化價格

## 2. 後端 API 欄位確認（與後端工程師對齊）

- [x] 2.1 確認後端 API 已提供或計劃提供以下欄位，並記錄在 `UI_SPEC.md` 動態數值章節：
  - `food_slot_max_count`（食物格上限）
  - `food_weekly_quota`（每週食物配額）
  - `food_hp_effect`（食物體力效果）
  - `tool_*_effect`（各道具各屬性效果）
  - `tap_mood_gain`、`tap_daily_limit`（觸碰機制）
  - `tool_warn_threshold_hours`、`tool_free_expire_hours`、`tool_paid_expire_days`（有效期）
- [x] 2.2 確認廣告開箱 API 設計：後端執行掉落抽取並回傳道具 ID，前端無需機率計算
- [x] 2.3 確認 IAP SKU ID 清單：月底衝刺禮包（`sprint_pack_199`）、月度通行證（`eco_pass_monthly`）、裝扮各款 SKU

## 3. hi-fi 原型標注更新（reference/eco-buddy_hi-fi/）

- [x] 3.1 在 `dialogues.jsx` 的 `toolEffectMap` / `gainMap` 加上 TODO 注解，標明這些數值上線版須從 API 讀取
- [x] 3.2 在 P6 開獎說明文字（「24 小時內使用」）加上 TODO 注解：有效期來自 `[API: tool_free_expire_hours]`
- [x] 3.3 在 P4 商店 IAP 商品 data 的金額欄位加上 TODO 注解：價格讀取平台 SKU
- [x] 3.4 確認 P4 商店程式碼中無 hardcode 廣告掉落機率（40%/30%/20%/10%），若有則加 TODO 注解

## 4. GAME_MECHANICS.md 同步

- [x] 4.1 在 `GAME_MECHANICS.md` §7（廣告開箱掉落機率）加上標注：「後端執行，前端不持有；以下機率為後台設定參考值，非前端常數」
- [x] 4.2 在 §4（觸碰角色）加上標注：「心情 +1 / 每日上限 10 次為後台可調數值，見 `[API: tap_*]`」
