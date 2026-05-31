## ADDED Requirements

### Requirement: ROADMAP.md 存在於 docs/product/
`docs/product/ROADMAP.md` SHALL 存在，列出 ECO Buddy Rive 動畫系統的三個合作節點：Phase 0B（對齊期）、Phase 1（試作期）、正式合約（P2 以後），各含範疇說明與現況標記。

#### Scenario: 新成員了解專案目前進度
- **WHEN** 新加入的工程師或設計師開啟 ROADMAP.md
- **THEN** 能在 30 秒內判斷現在是哪個 phase、P1 的交付範疇是什麼、什麼時候進入正式合約

#### Scenario: 確認 P1 交付範疇
- **WHEN** 前端需要判斷某功能是否在 P1 範疇內
- **THEN** ROADMAP.md 清楚列出 P1 的交付範疇：骨架 + 三參數驅動 + Idle 循環

---

### Requirement: README 協作者資訊補齊
`docs/README.md` 的角色導覽表 SHALL 補上前端工程師帳號 `@shangchian`，並在動畫工作流區塊補上 Anastasiia（外包，試作中，不進 repo）的說明。

#### Scenario: 查詢前端工程師 GitHub 帳號
- **WHEN** 任何成員需要 tag 前端工程師
- **THEN** docs/README.md 已有 `@shangchian`，無需另行詢問
