## MODIFIED Requirements

### Requirement: 道具效果數值
P9b 道具使用動畫 SHALL 依下列效果更新屬性：逗貓棒 心情 +15；小球 心情 +15；梳子 清爽 +15 + 心情 +10；零食 精神 +15 + 心情 +15。

**MODIFIED**：hi-fi 原型 P4 商店道具卡片 `desc` 文字、P6 廣告道具預覽效果、P9 道具背包效果敘述 SHALL 與本要求一致；現存舊數值（逗貓棒 +8 / 小球 +6 / 梳子 潔淨 +10 / 零食 HP +3）SHALL 全面更新。

#### Scenario: 使用逗貓棒
- **WHEN** 用戶使用逗貓棒
- **THEN** 播放「跳躍抓取」Rive State 並更新心情 +15

#### Scenario: 使用小球
- **WHEN** 用戶使用小球
- **THEN** 播放「UseItem」Rive State 並更新心情 +15

#### Scenario: 使用梳子
- **WHEN** 用戶使用梳子
- **THEN** 播放「Clean」Rive State 並更新清爽 +15、心情 +10

#### Scenario: 使用零食
- **WHEN** 用戶使用零食
- **THEN** 播放「Feed」Rive State 並更新精神 +15、心情 +15

#### Scenario: P4 商店商品描述對齊
- **WHEN** 用戶查看 P4 商店道具卡片 `desc`
- **THEN** 文字精確為「心情 +15」「心情 +15」「清爽 +15、心情 +10」「精神 +15、心情 +15」，SHALL NOT 出現舊數值或「HP」「潔淨」字樣

#### Scenario: P6 廣告道具預覽對齊
- **WHEN** 用戶於 P6 看廣告領道具的預覽
- **THEN** 顯示效果數值與上述四項一致
