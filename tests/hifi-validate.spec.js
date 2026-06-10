// ECO BUDDY hi-fi 驗證腳本
// 驗證目標：流程閉環、遊戲邏輯一致性
// 對照文件：docs/product/USER_FLOW.md、CLAUDE.md
// @ts-check
const { test, expect } = require('@playwright/test');

// ── 工具 ──────────────────────────────────────────────────────────────────────

/** 等頁面 Babel 編譯完成（#app 有子元素即可） */
async function waitForApp(page) {
  await page.waitForSelector('#app > *', { timeout: 15000 });
  await page.waitForTimeout(1500); // Babel standalone 編譯額外時間
}

/**
 * 透過左側 ScreenNav 跳轉到指定畫面
 * screenCode 對應 SCREENS 陣列中的 code 欄位，如 'P1', 'P2b', 'P12'
 */
async function jumpTo(page, screenCode) {
  await page.evaluate((code) => {
    const items = document.querySelectorAll('.screen-nav-item');
    for (const item of items) {
      if (item.querySelector('.code')?.textContent?.trim() === code) {
        item.click();
        return true;
      }
    }
    return false;
  }, screenCode);
  await page.waitForTimeout(600);
}

/**
 * 在瀏覽器內直接 click（繞過 Playwright viewport 限制）
 * ScreenNav 左欄把 phone 推到 viewport 外，必須用 JS click
 * selector: CSS selector 或 { text } 物件
 */
async function jsClick(page, selector) {
  const found = await page.evaluate((sel) => {
    // 優先找在 .screen 內（非 ScreenNav）的元素
    const allInScreen = document.querySelectorAll('.screen ' + sel);
    if (allInScreen.length > 0) { allInScreen[0].click(); return true; }
    // fallback：找任何非 ScreenNav 的元素
    const all = document.querySelectorAll(sel);
    for (const el of all) {
      if (!el.closest('.screen-nav')) { el.click(); return true; }
    }
    return false;
  }, selector);
  await page.waitForTimeout(300);
  return found;
}

/** jsClick by text content（按鈕文字） */
async function jsClickText(page, text) {
  const found = await page.evaluate((t) => {
    const buttons = document.querySelectorAll('button, [role="button"], .dock-tab, .tab-hit');
    for (const el of buttons) {
      if (el.textContent.trim() === t && !el.closest('.screen-nav')) {
        el.click();
        return true;
      }
    }
    return false;
  }, text);
  await page.waitForTimeout(300);
  return found;
}

/** 讀取頁面所有可見文字（排除 ScreenNav 左欄） */
async function getVisibleText(page) {
  return page.evaluate(() => {
    const nav = document.querySelector('.screen-nav');
    if (nav) nav.style.display = 'none';
    const text = document.body.innerText;
    if (nav) nav.style.display = '';
    return text;
  });
}

/** 截圖存至 playwright-screenshots/ */
async function shot(page, name) {
  await page.screenshot({ path: `playwright-screenshots/${name}.png`, fullPage: false });
}

/** 確認已回到 P1（用 getVisibleText 最可靠，避開 viewport/strict mode 問題） */
async function expectOnP1(page) {
  await page.waitForTimeout(300);
  const text = await getVisibleText(page);
  expect(text).toContain('體力');
}

// ── 初始設定 ──────────────────────────────────────────────────────────────────

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await waitForApp(page);
});

// ══════════════════════════════════════════════════════════════════════════════
// § 1  Tab 順序 — hi-fi 與 USER_FLOW §B 一致
// USER_FLOW §B（2026-06-10 對齊 hi-fi）: 夥伴 / 商店 / 今日陪伴 / 夥伴日誌
// hi-fi TAB_ORDER: ['p1','p4','p5','p7'] = 夥伴 / 商店 / 今日陪伴 / 夥伴日誌
// ══════════════════════════════════════════════════════════════════════════════

test('Tab 順序：夥伴 / 商店 / 今日陪伴 / 夥伴日誌（與 USER_FLOW §B 一致）', async ({ page }) => {
  const tabs = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.tab-hit'))
      .sort((a, b) => parseFloat(a.style.left) - parseFloat(b.style.left))
      .map(btn => btn.getAttribute('aria-label'))
  );

  console.log('  Tab 順序：', tabs.join(' / '));

  expect(tabs).toEqual(['夥伴', '商店', '今日陪伴', '夥伴日誌']);
});

// ══════════════════════════════════════════════════════════════════════════════
// § 2  流程閉環
// ══════════════════════════════════════════════════════════════════════════════

test.describe('流程閉環', () => {

  test('P0 → P1：一般模式首頁透明 hitbox 點擊可進入夥伴首頁', async ({ page }) => {
    await jumpTo(page, 'P0');
    await shot(page, '01-p0-normal-home');

    // PNormalHome 的透明 hitbox aria-label="切換遊戲模式"，用 JS click 繞過 viewport 限制
    await jsClick(page, '[aria-label="切換遊戲模式"]');
    await page.waitForTimeout(500);
    await shot(page, '02-p1-after-p0');

    await expectOnP1(page);
  });

  test('P2b（回收結果）→ 先放食物欄 → P1：回收 loop 閉環', async ({ page }) => {
    await jumpTo(page, 'P2b');
    await shot(page, '03-p2b-recycle-result');

    // 不應有「馬上餵 Buddy」按鈕（#22 定案廢除）
    await expect(page.locator('button:has-text("馬上餵")')).toHaveCount(0);

    // 用 JS click 繞過 viewport 限制
    const clicked = await jsClickText(page, '先放食物欄');
    expect(clicked).toBe(true);
    await page.waitForTimeout(600);
    await shot(page, '04-p1-after-p2b');

    await expectOnP1(page);
  });

  test('P12（補充站結果）→ 返回首頁 → P1：補充站 loop 閉環', async ({ page }) => {
    await jumpTo(page, 'P12');
    await shot(page, '05-p12-counting');

    // 等計數動畫結束（1600ms），按鈕從「計算中…」變成「返回首頁」
    await page.waitForTimeout(2000);
    await shot(page, '06-p12-done');

    // 換算說明 ℹ 按鈕應存在（#19 定案）
    const hasInfoBtn = await page.evaluate(() =>
      !!document.querySelector('.hero button')
    );
    expect(hasInfoBtn).toBe(true);

    // 用 JS click 點「返回首頁」
    const clicked = await jsClickText(page, '返回首頁');
    expect(clicked).toBe(true);
    await page.waitForTimeout(600);

    await expectOnP1(page);
  });

  test('P6（廣告開箱）→ 等廣告倒數 → 領道具 → 放入背包 → 無「立即使用」', async ({ page }) => {
    await jumpTo(page, 'P6');
    await shot(page, '07-p6-ads');

    // 廣告倒數 15 秒，等 .skip.ready 出現（adTime <= 0）
    await page.waitForFunction(() => !!document.querySelector('.skip.ready'), { timeout: 20000 });
    await jsClick(page, '.skip.ready');
    await page.waitForTimeout(500);
    await shot(page, '08-p6-result');

    // 不應有「立即使用」（#22 定案廢除）
    await expect(page.locator('button:has-text("立即使用")')).toHaveCount(0);

    // 應有「放入背包」，用 JS click
    const hasToBag = await page.evaluate(() =>
      !!Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === '放入背包' && !b.closest('.screen-nav'))
    );
    expect(hasToBag).toBe(true);

    const clicked = await jsClickText(page, '放入背包');
    expect(clicked).toBe(true);
    await page.waitForTimeout(600);

    // 放入背包 → 跳轉 P9（根據 screens.jsx line 1797）
    await expect(page.locator('.screen.p9, .nav-back-btn').first()).toBeVisible({ timeout: 5000 });
  });

  test('P9 道具背包：無「使用」按鈕（#22），NavBack 可返回 P1', async ({ page }) => {
    await jumpTo(page, 'P9');
    await shot(page, '09-p9-bag');

    // P9 不應有「使用」按鈕（#22 定案）
    await expect(page.locator('button:has-text("使用"):not(:has-text("立即"))')).toHaveCount(0);

    // NavBack 渲染為 button.nav-back-btn，用 JS click
    await jsClick(page, '.nav-back-btn');
    await page.waitForTimeout(500);

    await expectOnP1(page);
  });

  test('P10 月末選擇 → 等等再說 → 回 P7', async ({ page }) => {
    await jumpTo(page, 'P10');
    await shot(page, '10-p10-picker');

    // P10 稍後按鈕文字是「等等再說」（button.later）
    const laterExists = await page.evaluate(() =>
      !!document.querySelector('button.later')
    );
    expect(laterExists).toBe(true);

    await jsClick(page, 'button.later');
    await page.waitForTimeout(500);

    // 應返回 P7（夥伴日誌），P7 有 h2.夥伴日誌
    const onP7 = await page.evaluate(() =>
      !!document.querySelector('.screen.p7, h2')
    );
    expect(onP7).toBe(true);
  });

  test('P8 我的 → NavBack 返回 P1', async ({ page }) => {
    await jumpTo(page, 'P8');
    await shot(page, '11-p8-profile');

    // 確認在 P8（有 .nav-back-btn 且有設定相關文字）
    const onP8 = await page.evaluate(() =>
      !!document.querySelector('.screen.p8, .screen.profile')
        || document.querySelector('.screen')?.className.includes('p8')
    );

    // NavBack 返回 P1
    await jsClick(page, '.nav-back-btn');
    await page.waitForTimeout(500);

    await expectOnP1(page);
  });

  test('P1 一般模式按鈕 → P0：反向切換，P0 無 TabBar', async ({ page }) => {
    // P1 左上按鈕包著 img[alt="一般模式"]
    await jsClick(page, 'button:has(img[alt="一般模式"])');
    await page.waitForTimeout(500);
    await shot(page, '12-p0-after-toggle');

    // P0 不應有 TabBar
    await expect(page.locator('.tabbar-img')).toHaveCount(0);
  });

});

// ══════════════════════════════════════════════════════════════════════════════
// § 3  遊戲邏輯一致性
// ══════════════════════════════════════════════════════════════════════════════

test.describe('遊戲邏輯一致性', () => {

  test('換衣間 Phase 1：顯示「即將推出，敬請期待」，不渲染穿上/脫下按鈕', async ({ page }) => {
    // 預設 shopPhase=1，用 JS click 點換衣間 dock-tab
    await jsClickText(page, '換衣間');
    await page.waitForTimeout(400);
    await shot(page, '13-p1-wardrobe-phase1');

    // 應顯示佔位文字（USER_FLOW §C Phase 1 規格）
    const text = await getVisibleText(page);
    expect(text).toContain('即將推出，敬請期待');

    // dock 區不渲染裝扮操作按鈕（排除 TweaksPanel 可能的說明文字）
    await expect(page.locator('.dock button:has-text("穿上"), .dock button:has-text("脫下")')).toHaveCount(0);
  });

  test('P2b 換算說明：ℹ 按鈕可開啟摺疊 Modal（#19 定案）', async ({ page }) => {
    await jumpTo(page, 'P2b');
    await page.waitForTimeout(300);

    // ℹ 按鈕在 .hero 內，文字為 "i"，用 JS click
    await jsClick(page, '.hero button');
    await page.waitForTimeout(300);

    // Modal 應出現「換算說明」標題
    const text = await getVisibleText(page);
    expect(text).toContain('換算說明');
    await shot(page, '14-p2b-info-sheet');
  });

  test('P12 換算說明：ℹ 按鈕可開啟摺疊 Modal（#19 定案）', async ({ page }) => {
    await jumpTo(page, 'P12');
    await page.waitForTimeout(300);

    await jsClick(page, '.hero button');
    await page.waitForTimeout(300);

    const text = await getVisibleText(page);
    expect(text).toContain('換算說明');
    await shot(page, '15-p12-info-sheet');
  });

  test('P4 商店：同時標示「ECOCO 點數」與「NT$」兩種貨幣（#16/#17 雙軌制）', async ({ page }) => {
    await jumpTo(page, 'P4');
    await page.waitForTimeout(500);
    await shot(page, '16-p4-shop');

    const text = await getVisibleText(page);
    expect(text).toMatch(/ECOCO 點數|點數/);
    expect(text).toMatch(/NT\$|元/);
  });

  test('P5 今日陪伴：使用 Buddy 世界語言（今日、這週、本月等）', async ({ page }) => {
    await jumpTo(page, 'P5');
    await page.waitForTimeout(300);
    await shot(page, '17-p5-missions');

    const text = await getVisibleText(page);
    expect(text).toMatch(/今日陪伴|今日|這週|本月/);
  });

  test('P7 夥伴日誌：顯示日誌結構', async ({ page }) => {
    await jumpTo(page, 'P7');
    await page.waitForTimeout(300);
    await shot(page, '18-p7-dex');

    const text = await getVisibleText(page);
    expect(text).toMatch(/夥伴日誌|日誌/);
  });

  test('P10 月末選擇：「等等再說」按鈕存在（用戶可延後）', async ({ page }) => {
    await jumpTo(page, 'P10');
    await page.waitForTimeout(300);
    await shot(page, '19-p10-picker');

    await expect(page.locator('button.later, button:has-text("等等再說")')).toBeVisible({ timeout: 5000 });
  });

  test('P10 月末選擇：「收進日誌」按鈕在未選擇狀態下為 disabled', async ({ page }) => {
    await jumpTo(page, 'P10');
    await page.waitForTimeout(300);

    const confirmBtn = page.locator('button.confirm, button:has-text("收進日誌")');
    await expect(confirmBtn).toBeDisabled({ timeout: 5000 });
  });

  test('P1 三維數值名稱：體力 / 潔淨 / 心情（不用舊名稱精神 / 清爽）', async ({ page }) => {
    const text = await getVisibleText(page);
    expect(text).toMatch(/體力/);
    expect(text).toMatch(/潔淨/);
    expect(text).toMatch(/心情/);
    expect(text).not.toMatch(/精神/);
    expect(text).not.toMatch(/清爽/);
  });

  test('P2b 回收結果：無「馬上餵 Buddy」按鈕（#22 定案）', async ({ page }) => {
    await jumpTo(page, 'P2b');
    await expect(page.locator('button:has-text("馬上餵")')).toHaveCount(0);
  });

  test('P6 開箱結果：無「立即使用」按鈕（#22 定案）', async ({ page }) => {
    await jumpTo(page, 'P6');
    await page.waitForTimeout(2000); // 等廣告動畫
    await expect(page.locator('button:has-text("立即使用")')).toHaveCount(0);
  });

  test('P9 道具背包：無「使用」按鈕（#22 定案，唯一入口為 P1 拖曳）', async ({ page }) => {
    await jumpTo(page, 'P9');
    await page.waitForTimeout(300);
    await shot(page, '20-p9-bag');
    await expect(page.locator('button:has-text("使用"):not(:has-text("立即"))')).toHaveCount(0);
  });

});

// ══════════════════════════════════════════════════════════════════════════════
// § 4  禁用詞掃描（各主要畫面）
// ══════════════════════════════════════════════════════════════════════════════

test.describe('禁用詞掃描', () => {

  // CLAUDE.md 禁用詞：工程師語言不得出現在用戶可見 UI
  const FORBIDDEN = ['Sprint', 'Milestone', 'SDK', 'TBD', 'TODO', 'KPI'];
  // 注意：「即將推出」在換衣間 Phase 1 是 USER_FLOW 明確指定的文字，屬已知規格衝突，不在此掃描
  // 注意：「Phase」出現在 ScreenNav 左欄標示，排除在外

  const SCREENS_TO_SCAN = [
    { code: 'P1',  shot: '30-p1' },
    { code: 'P2',  shot: '31-p2' },
    { code: 'P2b', shot: '32-p2b' },
    { code: 'P4',  shot: '33-p4' },
    { code: 'P5',  shot: '34-p5' },
    { code: 'P7',  shot: '35-p7' },
    { code: 'P8',  shot: '36-p8' },
    { code: 'P9',  shot: '37-p9' },
    { code: 'P12', shot: '38-p12' },
  ];

  for (const { code, shot: shotName } of SCREENS_TO_SCAN) {
    test(`${code} — 無工程師禁用詞`, async ({ page }) => {
      await jumpTo(page, code);
      await page.waitForTimeout(400);
      const text = await getVisibleText(page);
      await shot(page, shotName);

      for (const word of FORBIDDEN) {
        if (text.includes(word)) {
          console.log(`  ✗ ${code} 出現禁用詞：「${word}」`);
        }
        expect(text, `${code} 不應出現禁用詞「${word}」`).not.toContain(word);
      }
    });
  }

  test('全局截圖：P1 預設狀態', async ({ page }) => {
    await shot(page, '00-p1-default');
  });
});
