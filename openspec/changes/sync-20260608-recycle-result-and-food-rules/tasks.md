## 1. PM 決策與會議格式

- [x] 1.1 在 `docs/decisions/CURRENT.md` 新增 2026-06-08 PM 補齊提案，逐條列出牽動畫面與調整部分。
- [x] 1.2 標註 P1「食物欄」為內部代稱，最終名稱待 PM 定名。

## 2. 規格文件同步

- [x] 2.1 更新 `docs/product/USER_FLOW.md` 的 P1/P2b 流程、食物取得、潔淨結算與 P2b → P1 動畫。
- [x] 2.2 更新 `docs/design/UI_SPEC.md` 的 P2b 視覺層級、機台互斥、食物上限、餵食 random 效果與 UAT checklist。
- [x] 2.3 更新 `docs/design/GAME_MECHANICS.md` 的回收/食物/潔淨/體力責任邊界。
- [x] 2.4 更新 `docs/product/FAQ.md` 的使用者說明，避免殘留固定 +10/+15 食物效果。

## 3. 驗證

- [x] 3.1 執行 `openspec validate sync-20260608-recycle-result-and-food-rules --strict`。
- [x] 3.2 搜尋文件中是否仍有 P2b 回收直接加 HP/體力、食物固定 +10/+15、P2b 同時顯示投瓶與投電池的矛盾描述。
