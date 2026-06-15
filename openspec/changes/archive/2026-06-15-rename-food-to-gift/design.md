## Context

「帶食物回家」是 2026-05-28 terminology-rename change 定的「回收/掃碼」對外文案。當時把取得行為與食物資源綁在同一詞，但 #20 週配額機制下「超額投瓶不產食物」，使這詞在邊界情境失真。reference 原型已自發漂移：

- 用「禮物」：點數來源 [screens.jsx:1566](reference/eco-buddy_hi-fi/screens.jsx#L1566)、點數明細 [screens.jsx:2043](reference/eco-buddy_hi-fi/screens.jsx#L2043)、P2b eyebrow（COPY_TABLE.md:36「BUDDY GIFT · 給 Buddy 的禮物」）
- 用「食物」：P2b 標題 [screens.jsx:12](reference/eco-buddy_hi-fi/screens.jsx#L12)、今日陪伴 [screens.jsx:1622](reference/eco-buddy_hi-fi/screens.jsx#L1622)、dialogues.jsx、FAQ、多數 spec

本 change 收斂為單一規則：行為＝禮物，資源＝食物。

## Goals / Non-Goals

**Goals:**
- 取得行為文案全站統一為「帶禮物回家」
- 建立可長期遵循的「禮物 vs 食物」邊界規則，寫進 COPY_TABLE.md 與 CLAUDE.md/DESIGN_SYSTEM.md 映射表
- 收斂 reference 既有的食物/禮物混用

**Non-Goals:**
- 不改「食物」資源語境（食物欄、餵食、週配額、食物效果值）
- 不動 ECOCO 點數命名（#16/#17）
- 不改三帳本計算邏輯與任何遊戲數值
- 不改 P2 掃碼系統 toast 的中性語氣（無角色場景）

## Decisions

**D1：以「語境」而非「字串」判斷替換。** 不能對「食物」做全域取代——只有指涉「投瓶取得這個行為」時才換。判準：句子在講「動作/來源/累積次數」→ 禮物；在講「吃的東西/欄位/配額/效果」→ 食物。逐處人工判讀，不寫 sed 批次。

**D2：foodEmpty 對話改寫，避免語意倒退。** 直接把 dialogues.jsx:24「去帶食物回家給我」換成「去帶禮物回家給我」會暗示「禮物＝必有食物」，與 #20 矛盾。改為「去帶禮物回家，說不定有好吃的！🍖」保留鼓勵又不誤導。替代方案：保留「食物」字——否決，因該句重點是引導取得行為。

**D3：映射表為單一事實來源。** 先改 COPY_TABLE.md / CLAUDE.md / AGENTS.md / DESIGN_SYSTEM.md 的映射規則，其餘文件與原型依此對齊，避免日後再漂移。

**D4：hi-fi 編輯後遞增 `?v=`。** 依 CLAUDE.md 快取破壞機制，動到 dialogues/screens/app.jsx 後必須 bump index.html 版本號。

## Risks / Trade-offs

- [誤把資源語境也改成禮物] → 依 D1 判準逐處判讀；spec 第三個 scenario 明列保留語境供 review 對照。
- [遺漏散落文案，造成又一次半套混用] → tasks 以前述 grep 清單為基準逐檔勾稽；完成後重跑 grep「帶食物回家」確認僅剩資源語境。
- [openspec archive 既有 spec 也含舊字串] → archive 為歷史紀錄，唯讀不改（docs/README.md 全員唯讀原則）。
- [測試斷言綁定舊字串] → 改原型前先查 tests/，同步更新斷言。

## Migration Plan

1. 改映射表（COPY_TABLE / CLAUDE / AGENTS / DESIGN_SYSTEM）
2. 改 docs 文案（UI_SPEC / USER_FLOW / FAQ）
3. 改 hi-fi 原型（dialogues / screens / app）+ bump `?v=`
4. 查並更新 tests/ 斷言
5. 重跑 grep 驗收：「帶食物回家」應僅出現在資源語境或唯讀 archive

回滾：單一 commit 範圍，`git revert` 即可。
