/* ECO BUDDY · 角色對話框文案範本 (from stat_dialogue_copy.md) */

const DIALOGUES = {
  // 三維屬性 (state: high / mid / low)
  hp: {
    high: '今天帶食物回家，我整個活起來了！💪',
    mid:  '有點累… 去補充站補個能量吧？',
    low:  '快沒力了！帶食物回家給我補能量 😫',
  },
  clean: {
    high: '香噴噴✨ 補充站果然是我的秘密武器！',
    mid:  '最近好像沒去補充站… 有點黏黏的感覺',
    low:  '臭臭警報 🚨 快帶我去補充站沖一沖！',
  },
  mood: {
    high: '今天跟你互動超多，心花怒放 🌸',
    mid:  '還好啦… 可以多陪我玩嗎？',
    low:  '嗚… 好久沒理我了，超失落 😞',
  },

  // 角色錯誤操作（P1 / P3 / P6 / P9 等含角色畫面）
  err: {
    foodTap:     '把食物拖到我身上餵我吧！🍖',
    foodEmpty:   '沒東西吃了 😢 去帶食物回家給我！',
    foodLocked:  '這個還沒解鎖，再努力一下！🔒',
    foodFull:    '放不下了！先把現有的吃掉再說 🍖',
    hpMax:       '我超飽的！先讓我消化一下嘛 🫃',
    cleanMax:    '我已經超乾淨了！不用再洗啦 ✨',
    moodMax:     '我現在開心到爆！今天不需要廣告 🎉',
    adsDaily:    '今天玩太多了！明天再來找我 🌙',
    adsLoad:     '廣告跑丟了… 等等再試試？',
    adsSkip:     '欸你沒看完耶！看完才有獎勵喔 👀',
    bagEmpty:    '背包空空的… 去廣告抽一個？🎁',
    toolExpire:  '有玩具快過期了，快拿給 Buddy 玩吧 ~',
    toolExpired: '嗚… 道具不見了 😔 下次要記得用',
    foodStored:  '幫我存好了！等你準備好再給我～ 🍖',
    toolStored: {
      shop: '新玩具到家了！快拖給我玩～🎉',
      ad:   'Buddy 收到新玩具了，超開心！✨',
    },
  },

  // P2 掃碼 / P4 商店：畫面無角色，改用標準系統 UI（toast / alert），文案中性。
  sys: {
    p2: {
      qrBlur:    '無法辨識 QR Code，請靠近後重新掃描',
      qrExpired: 'QR Code 已過期，請重新至機台取碼',
      qrUsed:    '此 QR Code 已使用，無法重複掃描',
      camDenied: '請至系統設定開啟相機權限',
      netFail:   '網路連線失敗，請確認連線後再試',
    },
    p4: {
      pointsLow: 'ECOCO 點數不足，無法完成購買',
      payFail:   '付款失敗，請再試一次',
    },
  },

  // 特殊狀態
  special: {
    legendary: '我…我變神了嗎？！✨🌈 謝謝你！',
    dying:     '快…快救我… 我快不行了 😵',
    return3d:  '你終於來了！我等好久了 😭',
    return7d:  '…你還記得我嗎？',
  },

  // 月末
  monthEnd: {
    autoPick:  '你太忙了吧！我幫你選了最棒的我 😤',
    lastDay:   '今天是最後機會！快來幫我選！⏰',
    lockWarn:  '改了要花更換次數喔，確定嗎？🤔',
  },

  // 新手引導
  onboarding: {
    firstFeed: '我等你好久了！快把食物拖過來嘛～',
  },

  // 觸摸（撫摸）反應 — 角色性格反應
  touch: [
    '呵呵～癢癢的！',
    '欸欸別亂摸啦 😊',
    '繼續～舒服～',
    '嘿嘿你最好了！',
  ],
};

// helper: 依數值取得 high/mid/low
const statLevel = (v) => v >= 70 ? 'high' : v >= 30 ? 'mid' : 'low';

// helper: 依狀態組合對話
const statDialogue = (kind, value) => DIALOGUES[kind][statLevel(value)];

// helper: 隨機觸摸反應
const touchDialogue = () => DIALOGUES.touch[Math.floor(Math.random()*DIALOGUES.touch.length)];

// helper: 特殊狀態檢查（傳說 / 瀕死）
const specialState = (stats) => {
  if (stats.hp >= 90 && stats.clean >= 90 && stats.mood >= 90) return 'legendary';
  if (stats.hp < 30 && stats.clean < 30 && stats.mood < 30) return 'dying';
  return null;
};

Object.assign(window, { DIALOGUES, statLevel, statDialogue, touchDialogue, specialState });
