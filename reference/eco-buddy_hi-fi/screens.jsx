/* ECO BUDDY · All game-mode screens */

/* ═══════════════ Onboarding Spotlight Overlay ═══════════════ */
const OB_STEPS = [
  { refKey: 'turtleWrapRef', pad: 24, radius: 99,
    title: '本月夥伴✨',            text: '點一下，看牠會怎麼反應' },
  { refKey: 'statRowRef',    pad: 6, padRight: 22, padBottom: 16, radius: 14,
    title: '體力・潔淨・心情',      text: '點圖示看夥伴目前的狀態' },
  { refKey: 'modeBtnRef',    pad: 8,  radius: 20, textRight: true,
    title: '切換一般模式',          text: '點這裡可以回到 ECOCO 的一般功能' },
  { refKey: 'scanBtnRef',    pad: 8,  radius: 24, textRight: true,
    title: '帶禮物回家 📦',         text: '投瓶後對準機台螢幕條碼，就有機會換到食物哦！' },
  { refKey: 'adsBtnRef',     pad: 8,  radius: 24, textRight: true,
    title: '免費玩具 🎁',           text: '看廣告領玩具，每天最多 5 次' },
  { refKey: 'dockTabsRef',   pad: 6,  radius: 16,
    title: 'Buddy 的餐袋、玩具箱、換衣間', text: '切換查看食物、道具和裝扮，拖到夥伴身上使用' },
  { refKey: 'tabbarRef',     pad: 4,  radius: 12,
    title: '四大功能',              text: '快來探索遊戲中的每個小驚喜吧！' },
];

const OnboardingSpotlight = ({ step, refs, onNext, onSkip }) => {
  const containerRef = useRef(null);
  const [hl, setHl] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const s = OB_STEPS[step];
    const cR = containerRef.current.getBoundingClientRect();
    let targetEl = refs[s.refKey]?.current;
    if (!targetEl && s.refKey === 'tabbarRef') {
      targetEl = document.querySelector('.tabbar-img');
    }
    if (!targetEl) return;
    const tR = targetEl.getBoundingClientRect();
    const pT = s.padTop    ?? s.pad;
    const pR = s.padRight  ?? s.pad;
    const pB = s.padBottom ?? s.pad;
    const pL = s.padLeft   ?? s.pad;
    setHl({
      top:  tR.top  - cR.top  - pT,
      left: tR.left - cR.left - pL,
      w: tR.width  + pL + pR,
      h: tR.height + pT + pB,
      r: s.radius,
      cH: cR.height,
      cW: cR.width,
    });
  }, [step]);

  const cur = OB_STEPS[step];
  const isLast = step === OB_STEPS.length - 1;

  if (!hl) return <div ref={containerRef} style={{ position: 'absolute', inset: 0, zIndex: 9999, pointerEvents: 'none' }} />;

  const descBelow = (hl.top + hl.h / 2) < hl.cH * 0.55;

  // Arrow: from text area edge → spotlight edge
  const isRight = !!cur.textRight;
  const hlCx = hl.left + hl.w / 2;
  // arrow tip: nearest edge of spotlight (bottom or top)
  const arrowTipY  = descBelow ? hl.top + hl.h + 3   : hl.top - 3;
  // arrow base: offset from tip, shifted right when textRight
  const arrowBaseY = descBelow ? hl.top + hl.h + 52  : hl.top - 52;
  const arrowTipX  = Math.max(32, Math.min(hl.cW - 32, isRight ? hl.left + hl.w * 0.7 : hlCx - 10));
  const arrowBaseX = isRight
    ? Math.min(hl.cW - 22, arrowTipX + (descBelow ? 28 : 20))
    : arrowTipX + (descBelow ? 18 : -14);
  const ctrlX = (arrowTipX + arrowBaseX) / 2 + (isRight ? 20 : descBelow ? 22 : -22);
  const ctrlY = (arrowTipY + arrowBaseY) / 2;
  // arrowhead direction
  const dx = arrowTipX - ctrlX, dy = arrowTipY - ctrlY;
  const len = Math.sqrt(dx*dx + dy*dy) || 1;
  const nx = dx/len, ny = dy/len;
  const sz = 9;
  const ah1x = arrowTipX - nx*sz + ny*sz*0.55, ah1y = arrowTipY - ny*sz - nx*sz*0.55;
  const ah2x = arrowTipX - nx*sz - ny*sz*0.55, ah2y = arrowTipY - ny*sz + nx*sz*0.55;

  return (
    <div ref={containerRef} style={{ position: 'absolute', inset: 0, zIndex: 9999, pointerEvents: 'none' }}>
      {/* Rounded-corner spotlight via box-shadow */}
      <div style={{
        position: 'absolute',
        top: hl.top, left: hl.left, width: hl.w, height: hl.h,
        borderRadius: hl.r,
        boxShadow: '0 0 0 9999px rgba(0,0,0,0.78)',
        border: '2px solid rgba(255,255,255,0.45)',
        outline: '4px solid rgba(255,255,255,0.1)',
      }} />

      {/* Hand-drawn arrow SVG */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}>
        <path d={`M ${arrowBaseX} ${arrowBaseY} Q ${ctrlX} ${ctrlY} ${arrowTipX} ${arrowTipY}`}
          stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.85" />
        <path d={`M ${ah1x} ${ah1y} L ${arrowTipX} ${arrowTipY} L ${ah2x} ${ah2y}`}
          stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
      </svg>

      {/* Text + 下一步 button — near spotlight */}
      <div style={{
        position: 'absolute',
        left: 20, right: 20,
        ...(descBelow ? { top: hl.top + hl.h + 56 } : { bottom: hl.cH - hl.top + 56 }),
        pointerEvents: 'auto',
      }}>
        <div style={{ fontWeight: 800, fontSize: 20, color: '#fff', lineHeight: 1.3, textShadow: '0 1px 6px rgba(0,0,0,0.3)', textAlign: isRight ? 'right' : 'left' }}>
          {cur.title}
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.82)', marginTop: 6, lineHeight: 1.6, textAlign: isRight ? 'right' : 'left' }}>
          {cur.text}
        </div>
        <div style={{ display: 'flex', justifyContent: isRight ? 'flex-end' : 'flex-start', marginTop: 16 }}>
          <button onClick={onNext} style={{
            background: '#FF5000', color: '#fff', border: 'none',
            borderRadius: 999, padding: '9px 22px', fontWeight: 700, fontSize: 14, cursor: 'pointer',
          }}>
            {isLast ? '知道了！' : '下一步 →'}
          </button>
        </div>
      </div>

      {/* Progress dots + 跳過 — above tabbar when spotlight is near bottom */}
      <div style={{
        position: 'absolute',
        bottom: hl.top + hl.h > hl.cH * 0.7 ? hl.cH - hl.top + 12 : 28,
        left: 20, right: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        pointerEvents: 'auto',
      }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {OB_STEPS.map((_, i) => (
            <div key={i} style={{
              width: i === step ? 20 : 6, height: 6, borderRadius: 3,
              background: i === step ? '#FF5000' : 'rgba(255,255,255,0.3)',
              transition: 'width .2s',
            }} />
          ))}
        </div>
        {!isLast && (
          <button onClick={onSkip} style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}>
            跳過
          </button>
        )}
      </div>
    </div>
  );
};

/* ═══════════════ P1 · Buddy Home ═══════════════ */
const P1Home = ({ state, dispatch, setScreen, dragManager, payload, showTutorial, onTutorialDone, tweaks = {} }) => {
  const [dockTab, setDockTab] = useState(
    payload?.toolStored ? 'tools' : payload?.openWardrobe ? 'wardrobe' : 'food'
  ); // food | tools | wardrobe
  const [touched, setTouched] = useState(false);
  const [eating, setEating] = useState(false);
  const [bubble, setBubble] = useState(null); // {text, error}
  const [showEvolve, setShowEvolve] = useState(false);
  const [p6SheetOpen, setP6SheetOpen] = useState(false);
  const [dockInfoOpen, setDockInfoOpen] = useState(false);
  const [ambientVisible, setAmbientVisible] = useState(true);
  const [ambientDismissing, setAmbientDismissing] = useState(false);
  const [pulsingIds, setPulsingIds] = useState(new Set());
  const [toolPulsingIds, setToolPulsingIds] = useState(
    () => payload?.toolStored ? new Set(payload.toolStored.ids || []) : new Set()
  );
  const [tutorialStep, setTutorialStep] = useState(showTutorial ? 0 : -1);
  const turtleRef = useRef(null);
  const turtleWrapRef = useRef(null);
  const statRowRef = useRef(null);
  const modeBtnRef = useRef(null);
  const scanBtnRef = useRef(null);
  const adsBtnRef = useRef(null);
  const dockTabsRef = useRef(null);
  const dockRef = useRef(null);
  const valueRiseRef = useRef([]);
  const [valueRises, setValueRises] = useState([]);

  const handleTutorialNext = () => {
    if (tutorialStep < OB_STEPS.length - 1) {
      setTutorialStep(t => t + 1);
    } else {
      setTutorialStep(-1);
      if (onTutorialDone) onTutorialDone();
      // 新手引導結束 → Buddy 主動開口，引導第一次餵食
      setTimeout(() => showBubble({ text: DIALOGUES.onboarding.firstFeed, error: false }), 400);
    }
  };
  const handleTutorialSkip = () => {
    setTutorialStep(-1);
    if (onTutorialDone) onTutorialDone();
    // 跳過引導時同樣觸發餵食提示
    setTimeout(() => showBubble({ text: DIALOGUES.onboarding.firstFeed, error: false }), 400);
  };

  useEffect(() => {
    if (payload?.autoFeed) {
      setEating(true);
      showBubble({ text: '好好吃！謝謝你～', error: false });
      setTimeout(() => setEating(false), 1500);
    }
    if (payload?.openWardrobe) {
      setDockTab('wardrobe');
    }
    if (payload?.foodStored) {
      setDockTab('food');
      // pulse all unlocked food cells that have stock after COLLECT_BATCH
      const ids = new Set(state.food.filter(f => f.state !== 'locked' && f.stock > 0).map(f => f.id));
      setPulsingIds(ids);
      setTimeout(() => setPulsingIds(new Set()), 2500);
      // show bubble after a 120ms delay so the tab switch settles first
      setTimeout(() => showBubble({ text: DIALOGUES.err.foodStored, error: false }), 120);
    }
    if (payload?.toolStored) {
      setTimeout(() => setToolPulsingIds(new Set()), 2500);
      const msg = payload.toolStored.source === 'shop'
        ? DIALOGUES.err.toolStored.shop
        : DIALOGUES.err.toolStored.ad;
      setTimeout(() => showBubble({ text: msg, error: false }), 120);
    }
    if (payload?.cleanGain) {
      setTimeout(() => {
        const wrap = turtleWrapRef.current;
        const pos = wrap ? { x: wrap.offsetWidth * 0.55, y: wrap.offsetHeight * 0.25 } : null;
        addRise(`+${payload.cleanGain}`, pos, '#4A90E2', 'assets/icon-clean.svg');
      }, 300);
    }
    const t = setTimeout(() => dismissAmbient(), 10000);
    return () => clearTimeout(t);
  }, []);

  // tap turtle = touch reaction，每次心情 +1，每日上限 10（#2）
  const TOUCH_DAILY_CAP = 10;
  const [touchCount, setTouchCount] = useState(0);
  const handleTurtleTap = (e) => {
    setTouched(true);
    const special = specialState(state.stats);
    const overCap = touchCount >= TOUCH_DAILY_CAP;
    if (!overCap && special !== 'dying') {
      dispatch({ type: 'TOUCH' });
      setTouchCount(c => c + 1);
      const rect = e?.currentTarget?.getBoundingClientRect();
      const pos = rect ? { x: rect.width * 0.55, y: rect.height * 0.25 } : null;
      addRise('+1', pos, '#FFB000', 'assets/icon-mood.svg');
    }
    const text = special === 'legendary' ? DIALOGUES.special.legendary
               : special === 'dying'     ? DIALOGUES.special.dying
               : overCap                 ? '今天已經摸夠多次了～明天再來！'
               : touchDialogue();
    showBubble({ text, error: special === 'dying' });
    setTimeout(() => setTouched(false), 1000);
  };

  const dismissAmbient = () => {
    setAmbientDismissing(true);
    setTimeout(() => setAmbientVisible(false), 250);
  };

  const showBubble = (b, ms = 10000) => {
    setBubble(b);
    setTimeout(() => setBubble(null), ms);
  };

  // tap stat pip → show stat value + dialogue
  const STAT_LABELS = { hp: '體力', clean: '潔淨', mood: '心情' };
  const handleStatTap = (kind) => {
    const value = state.stats[kind];
    showBubble({ text: `${STAT_LABELS[kind]} ${value}%　${statDialogue(kind, value)}`, error: statLevel(value)==='low' });
  };

  // drop handler — applies food/item effect or shows error
  const onDrop = (payload, pos) => {
    if (!payload) return;
    if (payload.kind === 'food') {
      if (payload.stock <= 0) {
        showBubble({ text: DIALOGUES.err.foodEmpty, error: true });
        return;
      }
      if (state.stats.hp >= 100) {
        showBubble({ text: DIALOGUES.err.hpMax, error: true });
        return;
      }
      // good drop → feeding mini animation in place
      setEating(true);
      dispatch({ type: 'FEED', food: payload.id, hpGain: 5 });
      addRise('+5', pos, '#FF5A5F', 'assets/icon-hp.svg');
      showBubble({ text: '好好吃！謝謝你～', error: false });
      setTimeout(() => {
        setEating(false);
        if (tweaks.p1Evolve) setShowEvolve(true);
      }, 1500);
    } else if (payload.kind === 'tool') {
      const tool = payload.id;
      // tool max-stat guards
      if (state.stats.mood >= 100) {
        showBubble({ text: DIALOGUES.err.moodMax, error: true });
        return;
      }
      // drop tool item → use animation；雙效果道具序列浮起兩個 rise
      setEating(true);
      dispatch({ type: 'USE_TOOL', tool });
      const gainSeq = {
        feather: [{ txt: '+15', color: '#FFB000', icon: 'assets/icon-mood.svg' }],
        brush:   [{ txt: '+10', color: '#FFB000', icon: 'assets/icon-mood.svg' }],
        ball:    [{ txt: '+15', color: '#FFB000', icon: 'assets/icon-mood.svg' }],
        snack:   [{ txt: '+15', color: '#FFB000', icon: 'assets/icon-mood.svg' }],
      }[tool] || [{ txt: '+5', color: '#FFB000' }];
      gainSeq.forEach((g, i) => setTimeout(() => addRise(g.txt, pos, g.color, g.icon), i * 250));
      showBubble({ text: '好玩好玩！', error: false });
      setTimeout(() => setEating(false), 1500);
    } else if (payload.kind === 'locked') {
      showBubble({ text: DIALOGUES.err.foodLocked, error: true });
    } else if (payload.kind === 'wrong') {
      showBubble({ text: '這不是吃的喔！', error: true });
    }
  };

  const addRise = (txt, pos, color, icon) => {
    const id = Math.random();
    setValueRises((prev) => [...prev, { id, txt, top: pos?.y || 280, left: pos?.x || 180, color, icon }]);
    setTimeout(() => setValueRises((prev) => prev.filter((v) => v.id !== id)), 2000);
  };

  const wardrobeIsPhase2 = (tweaks?.shopPhase ?? 1) >= 2;
  const wardrobeOwnedItems = COSMETIC_CATALOG.filter(c => (state.ownedCosmetics || []).includes(c.id));
  const wardrobeHasItems = wardrobeIsPhase2 && wardrobeOwnedItems.length > 0;
  const dockScrollable = dockTab === 'food' || (dockTab === 'wardrobe' && wardrobeHasItems) || (dockTab === 'tools' && state.tools.length > 4);
  const rawFoodBagCount = state.food.reduce((sum, food) => sum + food.stock, 0);
  const foodBagCount = tweaks?.p1BagFull ? state.foodQuota.bagLimit : rawFoodBagCount;
  const displayFood = (() => {
    if (!tweaks?.p1BagFull) return state.food;
    const fillAmount = Math.max(0, state.foodQuota.bagLimit - rawFoodBagCount);
    if (!fillAmount) return state.food;
    const targetIndex = state.food.findIndex(food => food.current);
    const fallbackIndex = state.food.findIndex(food => food.source !== 'shop');
    const updateIndex = targetIndex >= 0 ? targetIndex : fallbackIndex;
    return state.food.map((food, index) => index === updateIndex ? { ...food, stock: food.stock + fillAmount, state: 'has' } : food);
  })();
  const visibleFood = displayFood.filter(f => f.stock > 0);

  return (
    <div className="screen p1">
      {showEvolve && <EvolveOverlay onDone={() => setShowEvolve(false)} />}
      <StatusBar />
      <div className="p1-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src="assets/logo-ecobuddy.svg" alt="ecoBUDDY" className="ecobuddy-logo" />
          <button ref={modeBtnRef} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }} onClick={() => setScreen('p0')}>
            <img src="assets/btn/normal-mode.svg" alt="一般模式" height="26" draggable="false" />
          </button>
        </div>
        <AvatarButton onClick={() => setScreen('p8')} />
      </div>

      <div className="charinfo">
        <span className="name" style={{ fontWeight: "700" }}>海龜</span>
        <div className="charinfo-divider"></div>
        <div className="meta" style={{ color: "rgb(51, 51, 51)" }}>
          <b>6月的 Buddy</b>
          狀態：日常待機
        </div>
      </div>
      <div className="stat-row">
        <div ref={statRowRef} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <StatPip kind="hp" value={state.stats.hp} onClick={()=>handleStatTap('hp')} />
          <StatPip kind="clean" value={state.stats.clean} onClick={()=>handleStatTap('clean')} />
          <StatPip kind="mood" value={state.stats.mood} onClick={()=>handleStatTap('mood')} />
        </div>
      </div>

      <div className="turtle-stage" ref={turtleRef}
      data-drop-target="turtle"
      onPointerEnter={() => dragManager.setHover('turtle')}
      onPointerLeave={() => dragManager.setHover(null)}>

        {!bubble && ambientVisible &&
        <div className={`ambient-bubble${ambientDismissing?' dismissing':''}`} onClick={dismissAmbient}>
          月底了，<br />來選擇你的夥伴吧
          <button className="ambient-close" onClick={dismissAmbient} aria-label="關閉">✕</button>
        </div>
        }

        {bubble &&
        <SpeechBubble
          text={bubble.text}
          error={bubble.error}
          onClose={() => setBubble(null)}
          style={{ top: 14, left: 'auto', right: 18 }} />

        }

        <div className={`turtle-wrap`} ref={turtleWrapRef} style={{ position: 'relative' }}>
          <TurtleImg
            className={`${touched ? 'touched' : ''} ${eating ? 'eating' : ''} ${dragManager.hover === 'turtle' ? 'dragover' : ''}`}
            onClick={handleTurtleTap}
            data-turtle="true" />
          
          {valueRises.map((v) =>
          <ValueRise key={v.id} value={v.txt} icon={v.icon} color={v.color} top={v.top} left={v.left} />
          )}
        </div>

        <div className="side-actions">
          <button ref={scanBtnRef} className="side-action tap-area" onClick={() => setScreen('p2')}>
            <ScanBtnIcon />
          </button>
          <div style={{ position: 'relative' }}>
            <button ref={adsBtnRef} className="side-action tap-area" onClick={() => setP6SheetOpen(true)}>
              <AdsBtnIcon />
            </button>
            {state.adRemaining > 0 && (
              <span style={{
                position: 'absolute', top: 0, right: 0,
                background: 'var(--ecoco-orange)', color: '#fff',
                fontSize: 11, fontWeight: 800, minWidth: 20, height: 20,
                borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid rgba(255,255,255,0.5)', fontFamily: 'var(--font-en)', zIndex: 6, pointerEvents: 'none',
              }}>{state.adRemaining}</span>
            )}
          </div>
        </div>
      </div>

      <div className="dock-shell" ref={dockRef}>
        <div className="dock-tabs" ref={dockTabsRef}>
          <button className={`dock-tab ${dockTab === 'food' ? 'active' : ''}`} onClick={() => setDockTab('food')}>餐袋</button>
          <button className={`dock-tab ${dockTab === 'tools' ? 'active' : ''}`} onClick={() => setDockTab('tools')}>玩具箱</button>
          <button className={`dock-tab ${dockTab === 'wardrobe' ? 'active' : ''}`} onClick={() => setDockTab('wardrobe')}>換衣間</button>
        </div>
        <div className={`dock ${dockScrollable ? 'dock-scrollable' : ''}`} style={dockScrollable ? { overflowY: 'auto', paddingBottom: '44px' } : {}}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:10, marginBottom:10 }}>
            {dockTab !== 'wardrobe' && (
              <button onClick={() => setDockInfoOpen(true)} style={{ display:'flex', alignItems:'center', gap:4, background:'none', border:'none', padding:0, cursor:'pointer' }}>
                <img src="assets/btn/icon-_info.svg" alt="" width="17" height="17" draggable="false" style={{ display:'block' }} />
                <span style={{ fontSize:11, fontWeight:700, color:'var(--ecoco-blue)', lineHeight:1 }}>效果說明</span>
              </button>
            )}
            {dockTab === 'food' && (
              <span className="food-bag-count">餐袋 {foodBagCount}/{state.foodQuota.bagLimit}</span>
            )}
            {dockTab === 'tools' && (
              <button onClick={() => setScreen('p9')} style={{ fontSize:11, fontWeight:700, color:'var(--ecoco-blue)', background:'none', border:'none', cursor:'pointer', padding:0 }}>管理 ›</button>
            )}
            {dockTab === 'wardrobe' && (tweaks?.shopPhase ?? 1) >= 2 && (
              <button onClick={() => setScreen('wardrobe-manage')} style={{ fontSize:11, fontWeight:700, color:'var(--ecoco-blue)', background:'none', border:'none', cursor:'pointer', padding:0 }}>管理 ›</button>
            )}
          </div>
        {dockTab === 'food' ? <>
          <div className="dock-grid food-grid">
            {visibleFood.map(f => <FoodCell key={f.id} food={f} dragManager={dragManager} onDrop={onDrop} showBubble={showBubble} pulsing={pulsingIds.has(f.id)} />)}
            <FoodCell
              key="next-week-preview"
              food={{
                id: 'next-week-preview',
                name: state.foodQuota.nextFood,
                emoji: state.foodQuota.nextFoodEmoji,
                stock: 0,
                state: 'locked',
              }}
              dragManager={dragManager}
              onDrop={onDrop}
              showBubble={showBubble}
            />
          </div>
        </> : dockTab === 'tools' ? <>
          <div className="dock-grid">
            {(() => {
              const activeTools = state.tools.filter(t => !(t.hoursLeft != null && t.hoursLeft <= 0));
              return activeTools.length ? activeTools.map((t) =>
                <ToolCell key={t.id} tool={t} dragManager={dragManager} onDrop={onDrop} showBubble={showBubble} dispatch={dispatch} pulsing={toolPulsingIds.has(t.id)} />
              ) : (
                <div style={{ gridColumn: '1/-1', padding: '18px', textAlign: 'center', color: '#888', fontSize: 13 }}>
                  還沒有道具～<br />
                  <button onClick={() => setP6SheetOpen(true)} style={{ marginTop: 8, background: 'var(--ecoco-orange)', color: '#fff', padding: '8px 18px', borderRadius: 999, fontWeight: 700, fontSize: 12 }}>看廣告領取</button>
                </div>
              );
            })()}
          </div>
        </> : (() => {
          const equipped = state.equippedCosmetic;
          const isPhase2 = wardrobeIsPhase2;
          const ownedItems = wardrobeOwnedItems;
          if (!isPhase2) return (
            <div style={{ padding: '32px 18px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#222', marginBottom: 8 }}>即將推出，敬請期待</div>
              <div style={{ fontSize: 12, color: '#888', lineHeight: 1.6 }}>正式版上線後，在商店購買的裝扮<br />會出現在這裡</div>
            </div>
          );
          if (ownedItems.length === 0) return (
            <div style={{ padding: '6px 18px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#222', marginBottom: 8 }}>還沒有裝扮</div>
              <div style={{ fontSize: 12, color: '#888', marginBottom: 16 }}>去商店逛逛，幫 Buddy 找件喜歡的衣服</div>
              <button onClick={() => setScreen('p4', { tab: 'cosmetic' })} style={{ background: 'var(--ecoco-orange)', color: '#fff', border: 'none', borderRadius: 999, padding: '10px 24px', fontWeight: 800, fontSize: 13, cursor: 'pointer' }}>去商店</button>
            </div>
          );
          return (
            <div className="dock-grid">
              {ownedItems.map(item => (
                <WardrobeCell key={item.id} item={item} equipped={equipped} dispatch={dispatch} />
              ))}
            </div>
          );
        })()}
        </div>
      </div>
      {dockInfoOpen && (
        <ItemInfoSheet onClose={() => setDockInfoOpen(false)}>
          {dockTab === 'food' ? (
            <div>
              <div style={{ fontSize:17, fontWeight:900, marginBottom:10 }}>Buddy 的餐袋說明</div>
              <div style={{ fontSize:13, color:'#444', lineHeight:1.7, marginBottom:12 }}>
                <div>• 拖曳食物到 Buddy 身上即可餵食</div>
                <div>• 每次餵食讓 Buddy 體力 +1~5（每次不同）</div>
                <div>• 當週食物由帶禮物回家、商店與今日陪伴共用每週配額</div>
                <div>• 週三 12:00 重置當週配額；月底回收與今日陪伴食物會清空</div>
                <div>• 商店購買的食物會保留到下個月</div>
                <div>• 數量 ≤ 2 時卡片變淡，提醒快用完</div>
              </div>
              <div style={{ background:'#FFF3E0', borderRadius:12, padding:'10px 14px', fontSize:12, color:'#7A4800' }}>
                帶禮物回家可補充餐袋，配額用完後當週不再增加
              </div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize:17, fontWeight:900, marginBottom:10 }}>玩具箱說明</div>
              <div style={{ fontSize:13, color:'#444', lineHeight:1.7, marginBottom:12 }}>
                <div>• 拖曳道具到 Buddy 身上即可使用</div>
                <div>• 免費道具（看廣告領取）有效期 24h</div>
                <div>• 購買道具永久持有，不會過期</div>
                <div>• 剩餘 ≤ 6h 時卡片會變橘色提醒，快給 Buddy 玩掉！</div>
                <div>• 過期道具無法使用，24h 後自動移除</div>
              </div>
              <div style={{ background:'#FFF3E0', borderRadius:12, padding:'10px 14px', fontSize:12, color:'#7A4800' }}>
                點擊「管理 ›」可進入完整道具背包
              </div>
            </div>
          )}
        </ItemInfoSheet>
      )}
      {p6SheetOpen && (
        <div className="sheet-backdrop" onClick={() => setP6SheetOpen(false)}>
          <div className="sheet-panel" onClick={e => e.stopPropagation()}>
            <div className="sheet-grip" />
            <h3 style={{ fontSize: 18, fontWeight: 900, textAlign: 'center', marginBottom: 6 }}>免費玩具</h3>
            <div style={{ textAlign: 'center', color: 'var(--gray-text)', fontSize: 13, marginBottom: 12 }}>
              {state.adRemaining > 0
                ? `今日剩 ${state.adRemaining} 次 · 觀看 30 秒影片即可獲得`
                : DIALOGUES.err.adsDaily}
            </div>
            <div className="pity-bar" style={{ marginBottom: 6 }}>
              {[0, 1, 2, 3].map((i) =>
                <div key={i} className={`seg ${i < (state.pity || 0) ? 'fill' : ''}`}></div>
              )}
            </div>
            <div style={{ textAlign: 'center', color: 'var(--gray-text)', fontSize: 11, marginBottom: 20 }}>連 3 次未抽到零食 → 第 4 次必給</div>
            {state.adRemaining > 0 && (
              <button className="btn-primary" style={{ width: '100%' }}
                onClick={() => { setP6SheetOpen(false); setScreen('p6'); }}>
                觀看影片
              </button>
            )}
            <button className="btn-ghost" style={{ width: '100%', marginTop: 8 }}
              onClick={() => setP6SheetOpen(false)}>
              取消
            </button>
          </div>
        </div>
      )}
      {tutorialStep >= 0 && (
        <OnboardingSpotlight
          step={tutorialStep}
          refs={{ turtleWrapRef, statRowRef, modeBtnRef, scanBtnRef, adsBtnRef, dockTabsRef, dockRef }}
          onNext={handleTutorialNext}
          onSkip={handleTutorialSkip}
        />
      )}
    </div>);

};

// TODO [上線版] 以下效果區間為 hi-fi 原型佔位文案（#40），正式版由後端回傳實際值：
// feather: tool_cat_wand_mood_effect / brush: tool_brush_mood_effect
// ball: tool_ball_mood_effect / snack: tool_snack_mood_effect
const toolEffectMap = {
  feather: { label: '心情 +8~15' },
  brush:   { label: '心情 +8~15' },
  ball:    { label: '心情 +8~15' },
  snack:   { label: '心情 +8~15' },
};

/* ── 食物/道具 ℹ️ Bottom Sheet ── */
const ItemInfoSheet = ({ onClose, children }) => (
  <div className="sheet-backdrop" onClick={onClose} style={{ zIndex: 200 }}>
    <div className="sheet-panel" onClick={e => e.stopPropagation()}>
      <div className="sheet-grip" />
      <div style={{ padding: '8px 20px 16px' }}>{children}</div>
      <button className="btn-ghost" style={{ width: 'calc(100% - 40px)', margin: '0 20px 12px' }} onClick={onClose}>關閉</button>
    </div>
  </div>
);

/* food cell with drag */
const FoodCell = ({ food, dragManager, onDrop, showBubble, pulsing }) => {
  const cellRef = useRef(null);
  const handlePointerDown = (e) => {
    if (food.stock <= 0) {
      showBubble({ text: DIALOGUES.err.foodEmpty, error: true });
      return;
    }
    const startX = e.clientX, startY = e.clientY;
    const onMove = (me) => {
      if (Math.abs(me.clientX - startX) > 6 || Math.abs(me.clientY - startY) > 6) {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
        dragManager.startDrag(e, { kind: 'food', id: food.id, stock: food.stock, emoji: food.emoji }, onDrop);
      }
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      showBubble({ text: DIALOGUES.err.foodTap });
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };
  const isEmpty = food.state !== 'locked' && food.stock <= 0;
  const sourceCls = food.source === 'shop' ? ' shop-food' : '';
  const cls = `${food.state === 'locked' ? 'locked preview-food' : isEmpty ? 'empty' : food.stock <= 2 ? 'low' : 'has-stock'}${sourceCls}`;
  return (
    <div className="food-slot">
      <div ref={cellRef} className={`food-cell ${cls}${pulsing ? ' pulsing' : ''}`} onPointerDown={food.state === 'locked' ? undefined : handlePointerDown}>
        {food.state === 'locked'
          ? <Glyph value={food.emoji} alt={food.name} className="emoji food-preview-emoji" />
          : isEmpty
            ? <span className="empty-plate" aria-hidden="true">🍽️</span>
          : <>
              <Glyph value={food.emoji} alt={food.name} className="emoji" />
              {food.source === 'shop' && (
                <span className="shop-badge" aria-label="商店購買">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 10.2 5.1 4h13.8l1.1 6.2c-.2 1.5-1.5 2.7-3 2.7-1 0-1.9-.5-2.5-1.2-.6.7-1.5 1.2-2.5 1.2s-1.9-.5-2.5-1.2c-.6.7-1.5 1.2-2.5 1.2-1.5 0-2.8-1.2-3-2.7ZM6 14h12v6H6v-6Zm2 1.8v2.4h8v-2.4H8Z" />
                  </svg>
                </span>
              )}
              {food.stock > 0 && <span className="badge">{food.stock}</span>}
            </>
        }
      </div>
      <div className="food-label">
        <span className="name">{food.state === 'locked' ? '下週預告' : isEmpty ? '空餐盤' : food.name}</span>
      </div>
    </div>);
};

const ToolCell = ({ tool, dragManager, onDrop, showBubble, dispatch, pulsing }) => {
  const expired = tool.hoursLeft != null && tool.hoursLeft <= 0;
  const warn    = !expired && tool.hoursLeft != null && tool.hoursLeft <= 6;

  const clearNew = () => tool.isNew && dispatch?.({ type: 'CLEAR_NEW_TOOL', id: tool.id });

  const handlePointerDown = (e) => {
    clearNew();
    if (expired) {
      showBubble?.({ text: '嗚… 這個不見了' });
      return;
    }
    const startX = e.clientX, startY = e.clientY;
    const onMove = (me) => {
      if (Math.abs(me.clientX - startX) > 6 || Math.abs(me.clientY - startY) > 6) {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
        dragManager.startDrag(e, { kind: 'tool', id: tool.id, emoji: tool.emoji }, onDrop);
      }
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      showBubble?.({ text: warn ? '這個快消失了！今天要用掉喔' : '拖到我身上，記得今天就用掉喔！' });
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  return (
    <div className="food-slot">
      <div
        className={`food-cell has-stock${pulsing ? ' pulsing' : ''}`}
        onPointerDown={handlePointerDown}
        style={{ position:'relative', opacity: expired ? 0.4 : 1, cursor: expired ? 'default' : 'grab' }}
      >
        <Glyph value={tool.emoji} alt={tool.name} className="emoji" />
        {tool.count > 1 && <span className="badge">{tool.count}</span>}
        {expired && (
          <span style={{ position:'absolute', top:3, right:4, fontSize:13, lineHeight:1, color:'#666', pointerEvents:'none', fontWeight:700 }}>✕</span>
        )}
      </div>
      <div className="food-label">
        <span className="name" style={expired ? { textDecoration:'line-through', color:'#aaa' } : {}}>{tool.name}</span>
      </div>
    </div>);
};


/* ═══════════════ P2 · Scan camera (統一掃碼：收瓶機 / 補充站) ═══════════════ */
const P2Scan = ({ setScreen, dispatch, tweaks = {}, setTweak = () => {} }) => {
  const demoType = tweaks.p2DemoType || 'recycle';
  const errKind = tweaks.p2ErrKind || null;
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (errKind) {
      // 模擬辨識後彈出系統 toast；停留於掃描畫面，不路由
      const t = setTimeout(() => {
        setToast(DIALOGUES.sys.p2[errKind]);
      }, 900);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      if (demoType === 'refill') setScreen('p12', { session: window.REFILL_SESSION });
      else setScreen('p2b');
    }, 2400);
    return () => clearTimeout(t);
  }, [setScreen, demoType, errKind]);

  return (
    <div className="screen p2">
      <StatusBar light />

      <SystemToast text={toast} onClose={() => setToast(null)} bottom />

      <NavBack onClick={() => setScreen('p1')} light />
      <div className="camera">
        <h1 className="p2-title">掃描條碼</h1>
        <p className="p2-hint">將機台螢幕 QR Code 對準框內</p>
        <div className="qr-frame">
          <span className="c3"></span><span className="c4"></span>
          {/* fake QR */}
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <rect width="100" height="100" fill="#fff" />
            <g fill="#1a1a1a">
              <rect x="10" y="10" width="22" height="22" />
              <rect x="14" y="14" width="14" height="14" fill="#fff" />
              <rect x="18" y="18" width="6" height="6" fill="#1a1a1a" />
              <rect x="68" y="10" width="22" height="22" />
              <rect x="72" y="14" width="14" height="14" fill="#fff" />
              <rect x="76" y="18" width="6" height="6" fill="#1a1a1a" />
              <rect x="10" y="68" width="22" height="22" />
              <rect x="14" y="72" width="14" height="14" fill="#fff" />
              <rect x="18" y="76" width="6" height="6" fill="#1a1a1a" />
              {Array.from({ length: 60 }).map((_, i) => {
                const x = 35 + i * 7 % 50;const y = 35 + Math.floor(i * 7 / 50) * 5;
                return <rect key={i} x={x} y={y} width="3" height="3" />;
              })}
              <rect x="40" y="40" width="22" height="22" fill="#fff" />
              <text x="51" y="55" fontSize="11" fontWeight="900" fill="#FF5000" textAnchor="middle" fontFamily="'Noto Sans TC',sans-serif">e</text>
            </g>
          </svg>
          <div className="scan-line"></div>
        </div>
        <div className="p2-scanning-status">
          {errKind
            ? '請重新對準'
            : <>辨識中<span className="scan-dots"><span>.</span><span>.</span><span>.</span></span></>
          }
        </div>
      </div>
    </div>);

};

/* ═══════════════ EvolveOverlay · 變身過場（演示用，實際動畫由動畫師執行）═══════════════ */
const EvolveOverlay = ({ onDone, newFormName = '夏日龜 ☀️' }) => {
  const [phase, setPhase] = useState('flash'); // flash | reveal | hold
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'), 450);
    const t2 = setTimeout(() => setPhase('hold'), 950);
    return () => [t1, t2].forEach(clearTimeout);
  }, []);

  return (
    <div className="evolve-overlay">
      {phase === 'flash' && <div className="p3-flash" />}
      <div className="evolve-buddy-wrap">
        <TurtleImg
          className={phase !== 'flash' ? 'evolving' : ''}
          style={{ width: 190, opacity: phase === 'flash' ? 0 : 1, transition: 'opacity 0.1s' }}
        />
        {phase === 'hold' && (
          <SpeechBubble text="我有新的樣子了！" style={{ top: -68, right: -54 }} />
        )}
      </div>
      <div className="evolve-text" style={{ opacity: phase === 'flash' ? 0 : 1 }}>
        <div className="evolve-headline">Buddy 變身了！</div>
        <div className="evolve-form">{newFormName}</div>
      </div>
      {phase === 'hold' && (
        <div className="evolve-actions">
          <button className={`evolve-save${saved ? ' saved' : ''}`} onClick={() => setSaved(true)} aria-label={saved ? '已儲存圖卡' : '儲存變身圖卡'}>
            <svg className="evolve-save-icon" viewBox="0 0 24 24" aria-hidden="true">
              {saved ? (
                <path d="M9.2 16.6 4.9 12.3l-1.4 1.4 5.7 5.7L20.8 7.8l-1.4-1.4z" />
              ) : (
                <path d="M5 20h14v-2H5v2Zm7-16v9.2l3.6-3.6L17 11l-6 6-6-6 1.4-1.4 3.6 3.6V4h2Z" />
              )}
            </svg>
          </button>
          <button className="evolve-confirm" onClick={onDone}>確認</button>
        </div>
      )}
    </div>
  );
};

/* ═══════════════ P2b · 回收結果頁（滿版）═══════════════ */
const P2bResult = ({ setScreen, dispatch, state, tweaks = {}, setTweak = () => {} }) => {
  const food = state.food.find(item => item.current) || state.food.find(item => item.source === 'earned') || state.food[0];
  const quotaFull = tweaks.p2bQuotaFull || state.foodQuota.weeklyCount >= state.foodQuota.weeklyLimit ||
    state.food.reduce((sum, item) => sum + item.stock, 0) >= state.foodQuota.bagLimit;
  const willEvolve = tweaks.p2bEvolve || false;
  const [showInfo, setShowInfo] = useState(false);
  const [showEvolve, setShowEvolve] = useState(false);
  const evolveNavRef = React.useRef(null);

  const ITEM_COUNT = 999;
  const HP_GAIN = 99;
  const CLEAN_GAIN = 99;
  const POINTS_GAIN = 18;

  const navigate = (navFn) => {
    if (willEvolve) { evolveNavRef.current = navFn; setShowEvolve(true); }
    else navFn();
  };

  const handleDone = () => {
    dispatch({ type: 'COLLECT_BATCH', quotaFull, hpGain: quotaFull ? 0 : HP_GAIN, cleanGain: CLEAN_GAIN, pointsGain: POINTS_GAIN });
    navigate(() => setScreen('p1', { ...(quotaFull ? {} : { foodStored: true }), cleanGain: CLEAN_GAIN }));
  };

  return (
    <div className="screen p2b">
      {showEvolve && <EvolveOverlay onDone={() => { setShowEvolve(false); evolveNavRef.current?.(); }} />}
      <StatusBar />
      {showInfo && (
        <div onClick={() => setShowInfo(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 20, padding: '24px 22px', width: '78%', maxWidth: 300 }}>
            <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 12, color: '#1a1a1a' }}>換算說明</div>
            <div style={{ fontSize: 13, lineHeight: 1.85, color: '#555' }}>
              <div style={{ fontWeight: 700, color: '#1a1a1a', marginBottom: 2 }}>體力</div>
              <div style={{ marginBottom: 6 }}>帶回家的食物先進餐袋，拖給 Buddy 吃才增加體力（每次 +1~5）。</div>
              <div style={{ fontWeight: 700, color: '#1a1a1a', marginBottom: 2 }}>潔淨（收瓶機）</div>
              <div>投入 → 潔淨 +2 / 個</div>
              <div style={{ marginBottom: 6 }}>退瓶 → 潔淨 -1 / 個</div>
              <div style={{ fontWeight: 700, color: '#1a1a1a', marginBottom: 2 }}>潔淨（電池機）</div>
              <div>投入 → 潔淨 +5 / 顆</div>
              <div style={{ marginBottom: 4 }}>退電池 → 潔淨 -1 / 顆</div>
              <div style={{ fontSize: 11, color: '#888', lineHeight: 1.5 }}>
                潔淨淨值不為負，≤0 顯示 0。
              </div>
              <div style={{ fontSize: 11, color: '#888', marginTop: 4, lineHeight: 1.5 }}>
                註：體力 / 潔淨 / ECOCO 點數為三條獨立帳本；本頁只顯示潔淨結算，體力在餵食時入帳。
              </div>
            </div>
            <button onClick={() => setShowInfo(false)} style={{ marginTop: 18, width: '100%', padding: '10px 0', borderRadius: 99, background: '#FF5000', color: '#fff', border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>知道了</button>
          </div>
        </div>
      )}
      <div className="result-scene">
        <div className="rs-rays" />
        <div className="rs-stars">
          <span className="rs-star s1">✦</span>
          <span className="rs-star s2">✦</span>
          <span className="rs-star s3">✦</span>
          <span className="rs-star s4">✦</span>
          <span className="rs-star s5">✦</span>
          <span className="rs-star s6">✦</span>
        </div>
        <img src="assets/p2b-title.svg" className="rs-title" alt="" />
        <div className="rs-turtle">
          <TurtleImg style={{ width: 160, position: 'relative', zIndex: 1 }} />
          <div className="rs-spotlight" />
        </div>
      </div>
      <div className="result-panel">
        <div className="rp-info-row" onClick={() => setShowInfo(true)}>
          <span>謝謝你帶來</span>
          <span className="rp-count">{ITEM_COUNT}</span>
          <span>份禮物！</span>
          <span className="rp-info-btn">i</span>
        </div>
        <div className={`rp-cards${quotaFull ? ' rp-cards--single' : ''}`}>
          {!quotaFull && (
            <div className="rpc rpc--food">
              <div className="rpc-icon-bg"><Glyph value={food.emoji} alt={food.name} className="rpc-food-icon" /></div>
              <div className="rpc-right">
                <div className="rpc-label">{food.name}</div>
                <div className="rpc-val">+1</div>
              </div>
            </div>
          )}
          <div className="rpc rpc--clean">
            <div className="rpc-icon-bg">
              <img src="assets/icon-clean.svg" alt="" />
            </div>
            <div className="rpc-right">
              <div className="rpc-label">潔淨</div>
              <div className="rpc-val">+{CLEAN_GAIN}</div>
            </div>
          </div>
        </div>
        {quotaFull && (
          <div className="rp-quota-note">本週食物都收齊啦，下週再一起加油吧！</div>
        )}
        <div className="footer">
          <button className="btn-primary" onClick={handleDone}>{quotaFull ? '完成' : '存進餐袋'}</button>
        </div>
      </div>
    </div>
  );
};

/* P3 餵食動畫頁已依 #22（2026-05-29）廢除：餵食改在 P1 原地播放。
   殘留路由與側欄入口同步移除。 */

/* ----- P4 IAP Config (模擬後台 CMS/API 設定，前端不寫死任何商品內容) ----- */
// TODO [上線版] price 欄位須向平台 SDK 查詢本地化價格；不顯示此處 hardcode 的數字。
const SHOP_IAP_CONFIG = {
  changePack10: {
    // TODO [上線版] price 讀取平台 SDK [IAP SKU: change_pack_10]，不 hardcode
    id: 'change-pack-10', emoji: '🎫', name: '10 次｜偶爾想換一下', iapPrice: 99, pointsCost: 90,
    payment: 'hybrid', cashChannel: 'platform-iap', type: 'change-count',
    qty: 10, desc: '想換掉日誌裡的 Buddy 時用', thumb: '🎫',
    ribbon: null, featured: false,
  },
  changePack50: {
    // TODO [上線版] price 讀取平台 SDK [IAP SKU: change_pack_50]，不 hardcode
    id: 'change-pack-50', emoji: '🎫', name: '50 次｜換到滿意為止', iapPrice: 299, pointsCost: 260,
    payment: 'hybrid', cashChannel: 'platform-iap', type: 'change-count',
    qty: 50, desc: '換到滿意為止', thumb: '🎫',
    ribbon: '最划算', featured: true,
  },
  statusPackOne: {
    id: 'status-pack-one', emoji: '🎁', name: '小禮包', iapPrice: 39, pointsCost: 120,
    payment: 'hybrid', cashChannel: 'platform-iap', category: 'status-package',
    statusRange: { min: 1, max: 27, label: '角色狀態' },
    desc: '盲盒開出 #1–27 狀態之一',
    benefits: [
      { emoji: '🎲', name: '#1–27 狀態盲盒', sub: '購買後隨機開出一個角色狀態' },
      { emoji: '📖', name: '夥伴日誌收藏', sub: '抽中後立即解鎖收藏' },
    ],
  },
  statusPackTwo: {
    id: 'status-pack-two', emoji: '🎁', name: '大禮包', iapPrice: 99, pointsCost: 520,
    payment: 'hybrid', cashChannel: 'platform-iap', category: 'status-package',
    statusRange: { min: 28, max: 36, label: '特殊狀態' },
    desc: '盲盒開出 #28–36 特殊狀態之一',
    benefits: [
      { emoji: '✨', name: '#28–36 特殊狀態盲盒', sub: '購買後隨機開出一個特殊狀態' },
      { emoji: '📖', name: '夥伴日誌收藏', sub: '抽中後立即解鎖收藏' },
    ],
  },
};

/* ----- P4 helper: CosmeticDetailModal (裝扮商品詳情 + 試穿 — 彈窗) ----- */
const CosmeticDetailSheet = ({ item, isPhase2, isOwned, onClose, onBuy }) => {
  const [tryingOn, setTryingOn] = useState(false);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 24, width: '100%', maxWidth: 340,
        animation: 'slide-up .35s cubic-bezier(.16,1,.3,1)',
        overflow: 'hidden',
      }}>

        {/* 試穿 Buddy 預覽區 — 大尺寸 */}
        <div style={{
          background: 'linear-gradient(160deg,#FFF0DC,#FAE0B8)',
          padding: '32px 0 20px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        }}>
          <div style={{ fontSize: 110, position: 'relative', lineHeight: 1 }}>
            🐢
            {tryingOn && (
              <div style={{
                position: 'absolute', top: -14, right: -18,
                fontSize: 48,
              }}>{item.emoji}</div>
            )}
          </div>
          <div style={{ fontSize: 13, color: '#A06030', fontWeight: 700, marginTop: 10 }}>
            {tryingOn ? `正在試穿「${item.name}」` : 'Buddy 預覽'}
          </div>
          <button
            onClick={() => setTryingOn(v => !v)}
            style={{
              marginTop: 6, fontSize: 13, fontWeight: 700,
              background: tryingOn ? '#FFEFE0' : '#FFF',
              color: tryingOn ? '#FF5000' : '#666',
              border: `1px solid ${tryingOn ? '#FF5000' : '#DDD'}`,
              borderRadius: 999, padding: '7px 22px', cursor: 'pointer',
            }}>
            {tryingOn ? '還原' : '試穿看看'}
          </button>
        </div>

        {/* 商品資訊 */}
        <div style={{ padding: '16px 20px 20px' }}>
          <div className="product-detail-head" style={{ marginBottom: 12 }}>
            <div className="d-icon"><Glyph value={item.emoji} alt={item.name} /></div>
            <div>
              <h3>{item.name}</h3>
              <div className="d-sub">{item.desc}</div>
            </div>
          </div>
          <div style={{ fontSize: 11, color: '#AAA', marginBottom: 16, lineHeight: 1.5 }}>
            購買即視為同意
            <span style={{ color: '#060E9F', textDecoration: 'underline' }}>退款政策</span>
            。裝扮退款請洽平台客服。
          </div>
          <div className="product-detail-footer">
            <div className="price-tag">
              {item.pointsCost ? <><img src="assets/icon-ecoco-point.svg" alt="" />{item.pointsCost} ＋ </> : null}
              NT$ {item.iapPrice ?? item.price}
            </div>
            {isOwned ? (
              <button className="buy-cta" disabled style={{ background: '#E8F9EE', color: '#22A55C', cursor: 'default' }}>✓ 已擁有</button>
            ) : isPhase2 ? (
              <button className="buy-cta" onClick={() => onBuy(item)}>確認購買</button>
            ) : (
              <button className="buy-cta" disabled style={{ background: '#E0E0E0', color: '#999', cursor: 'default' }}>即將開放</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ----- P4 helper: ProductDetailSheet (商品詳情 bottom sheet) ----- */
const ProductDetailSheet = ({ item, onClose, onBuy }) => {
  useModalScrollLock();
  const rows = item.benefits || item.contents || [];
  const sectionTitle = item.category === 'status-package' ? '盲盒內容' : '禮包內容';
  return ReactDOM.createPortal((
    <div className="sheet-backdrop product-sheet-backdrop" onClick={onClose}>
      <div className="sheet-panel scrollable product-detail-inner" onClick={e => e.stopPropagation()}>
        <div className="sheet-grip" />
        <div className="product-detail-head">
          <div className="d-icon"><Glyph value={item.emoji} alt={item.name} /></div>
          <div>
            <h3>{item.name}</h3>
            <div className="d-sub">{item.desc}</div>
          </div>
        </div>
        <div className="product-detail-section">
          <div className="product-detail-section-title">{sectionTitle}</div>
          {rows.map((row, i) => (
            <div key={i} className="detail-item-row">
              <div className="di-icon"><Glyph value={row.emoji} alt={row.name} /></div>
              <div className="di-body">
                <div className="di-name">{row.name}</div>
                <div className="di-sub">{row.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="product-detail-footer">
          <div className="price-tag">
            {item.pointsCost ? <><img src="assets/icon-ecoco-point.svg" alt="" />{item.pointsCost} ＋ </> : null}
            NT$ {item.iapPrice ?? item.price}
          </div>
          <button className="buy-cta" onClick={() => onBuy(item)}>確認購買</button>
        </div>
      </div>
    </div>
  ), document.querySelector('.iphone-screen'));
};

/* ───── Cosmetic catalogue (shared by P4Shop + P1Home wardrobe tab) ───── */
const COSMETIC_CATALOG = [
  { id: 'star-hat',     emoji: '⭐', name: '星辰帽',     desc: '限定裝扮 · 閃閃發光',       pointsCost: 30, iapPrice: 299, price: 299 },
  { id: 'crystal-bow',  emoji: '🎀', name: '水晶蝴蝶結', desc: '限定裝扮 · 精緻優雅',       pointsCost: 25, iapPrice: 249, price: 249 },
  { id: 'rainbow-halo', emoji: '🌈', name: '彩虹光暈',   desc: 'Phase 1 預覽款 · 閃耀登場', pointsCost: 20, iapPrice: 199, price: 199 },
];

const useModalScrollLock = () => {
  useEffect(() => {
    const screen = document.querySelector('.screen.p4');
    const prevScreenOverflowY = screen?.style.overflowY;
    const prevBodyOverflow = document.body.style.overflow;
    if (screen) screen.style.overflowY = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      if (screen) screen.style.overflowY = prevScreenOverflowY;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, []);
};

const pickStatusPackReward = (item, dexStates = []) => {
  if (!item.statusRange) return null;
  const codeNumber = item.statusRange.min + Math.floor(Math.random() * (item.statusRange.max - item.statusRange.min + 1));
  const code = String(codeNumber).padStart(2, '0');
  const existing = dexStates.find(s => s.code === code);
  return {
    code,
    name: existing?.name ?? dexTypeName(code),
  };
};

const WardrobeCell = ({ item, equipped, dispatch }) => {
  const isEquipped = equipped === item.id;
  return (
    <div className="food-slot">
      <div
        className="food-cell has-stock"
        onClick={() => dispatch({ type: 'EQUIP_COSMETIC', id: isEquipped ? null : item.id })}
        style={{ position:'relative', cursor:'pointer', outline: isEquipped ? '2px solid var(--ecoco-orange)' : 'none', outlineOffset:'-2px' }}
      >
        <span className="emoji">{item.emoji}</span>
        {isEquipped && (
          <span style={{ position:'absolute', top:3, right:4, background:'var(--ecoco-orange)', color:'#fff', fontSize:9, fontWeight:800, borderRadius:999, padding:'2px 5px', lineHeight:1, pointerEvents:'none' }}>穿著中</span>
        )}
      </div>
      <div className="food-label">
        <span className="name">{item.name}</span>
      </div>
    </div>
  );
};

/* ═══════════════ P4 · Shop ═══════════════ */
const P4Shop = ({ setScreen, state, dispatch, tweaks, payload }) => {
  const [tab, setTab] = useState(payload?.tab ?? 'food');
  const [purchasing, setPurchasing] = useState(null);
  const [successItem, setSuccessItem] = useState(null);
  const [detailItem, setDetailItem] = useState(null);
  const [cosmeticDetail, setCosmeticDetail] = useState(null);
  const isSprintPeriod = tweaks?.shopSprint ?? false;
  const isPhase2 = (tweaks?.shopPhase ?? 1) >= 2;
  const changeSectionRef = useRef(null);
  const weeklyFoodPrice = 50;
  const currentFood = state.food.find(item => item.current) || state.food.find(item => item.source === 'earned') || state.food[0];
  const foodBagCount = state.food.reduce((sum, food) => sum + food.stock, 0);
  const foodRemainingWeekly = Math.max(0, state.foodQuota.weeklyLimit - state.foodQuota.weeklyCount);
  const foodRemainingBag = Math.max(0, state.foodQuota.bagLimit - foodBagCount);
  const foodRemainingByPoints = Math.floor(state.points / weeklyFoodPrice);
  const maxFoodBuy = tweaks?.p4FoodQuotaFull ? 0 : Math.max(0, Math.min(foodRemainingWeekly, foodRemainingBag, foodRemainingByPoints));
  useEffect(() => {
    if (payload?.focus === 'change-count-packs' && changeSectionRef.current) {
      setTimeout(() => changeSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
    }
  }, []);

  const cats = [
  { id: 'food', label: '食物' },
  { id: 'tool', label: '玩具' },
  { id: 'cosmetic', label: '裝扮' },
  { id: 'music', label: '氣氛' },
  { id: 'package', label: '禮包' }];

  const items = {
    food: [
    { id: 'weekly-food', emoji: currentFood.emoji, name: `${currentFood.name} ×1`, desc: '加入 Buddy 的餐袋', pointsCost: weeklyFoodPrice, unitPointsCost: weeklyFoodPrice, payment: 'points', category: 'food', maxQuantity: maxFoodBuy, soldOut: maxFoodBuy <= 0 },
    ],

    package: [
    { ...SHOP_IAP_CONFIG.statusPackOne },
    { ...SHOP_IAP_CONFIG.statusPackTwo },
    { ...SHOP_IAP_CONFIG.changePack10 },
    { ...SHOP_IAP_CONFIG.changePack50 },
    ],

    tool: [
    { id: 'feather', emoji: 'assets/toy/ecobuddy-toy____逗貓棒.webp', name: '逗貓棒', desc: '心情 +8~15', pointsCost: 30, iapPrice: 39, payment: 'hybrid', cashChannel: 'platform-iap', category: 'tool' },
    { id: 'brush', emoji: 'assets/toy/ecobuddy-toy____梳子.webp', name: '梳子', desc: '心情 +8~15', pointsCost: 35, iapPrice: 49, payment: 'hybrid', cashChannel: 'platform-iap', category: 'tool' },
    { id: 'ball', emoji: 'assets/toy/ecobuddy-toy____皮球.webp', name: '小球', desc: '心情 +8~15', pointsCost: 25, iapPrice: 39, payment: 'hybrid', cashChannel: 'platform-iap', category: 'tool' },
    { id: 'snack', emoji: 'assets/food/ecobuddy-food___洋芋片.webp', name: '零食', desc: '心情 +8~15', pointsCost: 20, iapPrice: 29, payment: 'hybrid', cashChannel: 'platform-iap', category: 'tool' }],

    cosmetic: COSMETIC_CATALOG.map(c => ({ ...c, payment: 'hybrid', cashChannel: 'platform-iap', category: 'cosmetic' })),

    music: []

  };
  const visibleCats = cats.filter(c => (items[c.id] || []).length > 0);
  const renderPrice = (it) => (
    <b className="shop-price">
      {it.pointsCost ? <><img src="assets/icon-ecoco-point.svg" alt="" width="14" height="14" />{it.pointsCost}</> : null}
      {it.payment === 'hybrid' ? <> ＋ NT$ {it.iapPrice}</> : null}
      {it.payment === 'cash' ? <>NT$ {it.price}</> : null}
    </b>
  );

  return (
    <div className="screen p4">
      <StatusBar />
      <div className="p4-sticky-top">
        <div className="header">
          <h2>商店</h2>
          <div className="points-pill" aria-label="ECOCO 點數">
            <img src="assets/icon-ecoco-point.svg" alt="" width="18" height="18" />
            <span>{state.points.toLocaleString()}</span>
          </div>
        </div>
        <div className="tabs">
          {visibleCats.map((c) =>
          <button key={c.id} className={`tab-chip ${tab === c.id ? 'active' : ''}`} onClick={() => setTab(c.id)}>
              {c.label}
            </button>
          )}
        </div>
      </div>


{/* 禮包分頁 */}
      {(() => {
        if (tab !== 'package') return null;
        const allPkg = items['package'] || [];
        const regularPkgs = allPkg.filter(it => it.type !== 'change-count');
        const changePkgs  = allPkg.filter(it => it.type === 'change-count');
        const isFocused   = payload?.focus === 'change-count-packs';

        const renderPkgCard = (it) => {
          const hasDetail = !!(it.contents || it.benefits);
          const isBought = false;
          const canBuy = isPhase2 && !isBought;
          return (
            <div key={it.id} className={`shop-card shop-card--hybrid package-card${isBought ? ' purchased' : ''}`}
              onClick={canBuy ? () => hasDetail ? setDetailItem(it) : setPurchasing(it) : undefined}
              style={{ cursor: canBuy ? 'pointer' : 'default' }}>
              <div className="thumb"><Glyph value={it.emoji} alt={it.name} /></div>
              <h4>{it.name}</h4>
              <div className="desc">{it.desc}</div>
              <div className="price">
                {isBought ? (
                  <span style={{ fontWeight: 800, color: '#22A55C', fontSize: 12 }}>
                    ✓ 本月已領
                  </span>
                ) : (
                  <>
                    {renderPrice(it)}
                    <button className="buy-btn" disabled={!canBuy}
                      onClick={(e) => { e.stopPropagation(); if (isPhase2) { hasDetail ? setDetailItem(it) : setPurchasing(it); } }}>
                      {!isPhase2 ? '即將開放' : hasDetail ? '查看' : '帶回家'}
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        };

        return (
          <div>
            {/* 狀態禮包 */}
            {regularPkgs.length > 0 && (
              <div style={isFocused ? { opacity: 0.6 } : {}}>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#888', letterSpacing: '.04em', padding: '10px 18px 4px' }}>狀態禮包</div>
                <div className="shop-grid">{regularPkgs.map(renderPkgCard)}</div>
              </div>
            )}

            {/* 多一點選擇：更換次數包 */}
            {changePkgs.length > 0 && (
              <div ref={changeSectionRef} style={isFocused ? { scrollMarginTop: 80 } : {}}>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 18px 4px',
                }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#888', letterSpacing: '.04em' }}>更換次數包</span>
                  <span style={{ fontSize: 11, color: '#AAA' }}>機會永遠有效</span>
                </div>
                <div className="shop-grid">{changePkgs.map(it => {
                  const canBuy = isPhase2;
                  return (
                    <div key={it.id} className={`shop-card shop-card--hybrid package-card${it.featured ? ' featured-pack' : ''}`}
                      onClick={canBuy ? () => setPurchasing(it) : undefined}
                      style={{ cursor: canBuy ? 'pointer' : 'default', position: 'relative' }}>
                      {it.ribbon && (
                        <div style={{
                          position: 'absolute', top: 0, right: 0,
                          background: 'var(--ecoco-orange)', color: '#fff',
                          fontSize: 10, fontWeight: 800, padding: '3px 8px',
                          borderRadius: '0 12px 0 8px', zIndex: 1,
                        }}>{it.ribbon}</div>
                      )}
                      <div className="thumb"><Glyph value={it.emoji} alt={it.name} /></div>
                      <h4>{it.name}</h4>
                      <div className="desc">{it.desc}</div>
                      <div className="price">
                        {renderPrice(it)}
                        <button className="buy-btn" disabled={!isPhase2}
                          onClick={(e) => { e.stopPropagation(); if (isPhase2) setPurchasing(it); }}>
                          {!isPhase2 ? '即將開放' : '帶回家'}
                        </button>
                      </div>
                    </div>
                  );
                })}</div>
              </div>
            )}
          </div>
        );
      })()}

{/* 裝扮分頁 — 2-column grid，Phase 1 disabled CTA */}
      {(() => {
        if (tab !== 'cosmetic') return null;
        const cosItems = items['cosmetic'] || [];
        return (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 18px 4px' }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#888', letterSpacing: '.04em' }}>
                {isPhase2 ? '限定裝扮' : '即將上架'}
              </span>
              {isPhase2 && (
                <button onClick={() => setScreen('wardrobe-manage')} style={{ fontSize: 11, fontWeight: 700, color: 'var(--ecoco-blue)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>查看我的裝扮 ›</button>
              )}
            </div>
            <div className="shop-grid">
              {cosItems.map(it => {
                const isBought = state.ownedCosmetics?.includes(it.id);
                return (
                  <div key={it.id} className={`shop-card${isBought ? ' purchased' : ''}`}
                    onClick={() => setCosmeticDetail(it)}
                    style={{ cursor: 'pointer' }}>
                    <div className="thumb"><Glyph value={it.emoji} alt={it.name} /></div>
                    <h4>{it.name}</h4>
                    <div className="desc">{it.desc}</div>
                    <div className={`price${!isPhase2 ? ' price--cosmetic-locked' : ''}`}>
                      {isBought ? (
                        <span style={{ fontWeight: 800, color: '#22A55C', fontSize: 12 }}>✓ 已擁有</span>
                      ) : (
                        <>
                          {renderPrice(it)}
                          <button className="buy-btn" disabled={!isPhase2}
                            onClick={(e) => { e.stopPropagation(); setCosmeticDetail(it); }}
                            style={!isPhase2 ? { background: '#E0E0E0', color: '#999', cursor: 'default' } : {}}>
                            {!isPhase2 ? '即將開放' : '查看'}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* 點數商品 — 2-column grid */}
      {(() => {
        if (tab === 'package') return null;
        const pricedItems = (items[tab] || []).filter(it => it.payment === 'points' || it.payment === 'hybrid');
        if (!pricedItems.length) return null;
        return (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 18px 4px' }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#888', letterSpacing: '.04em' }}>{tab === 'food' ? '點數商品' : '點數＋平台付款'}</span>
              {tab === 'tool' && !isPhase2 && <button onClick={() => setScreen('p9')} style={{ fontSize: 11, fontWeight: 700, color: 'var(--ecoco-blue)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>查看我的玩具箱 ›</button>}
            </div>
            <div className="shop-grid">
              {pricedItems.map(it => (
                <div key={it.id} className={`shop-card payment-${it.payment} ${it.soldOut ? 'sold-out' : ''}`}>
                  <div className="thumb"><Glyph value={it.emoji} alt={it.name} /></div>
                  <h4>{it.name}</h4>
                  <div className="desc">{it.desc}</div>
                  <div className="price">
                    {renderPrice(it)}
                    <button className="buy-btn" disabled={it.soldOut || (it.payment === 'hybrid' && !isPhase2)} onClick={() => !it.soldOut && (it.payment !== 'hybrid' || isPhase2) && setPurchasing(it)}>
                      {it.soldOut ? '本週已領滿' : it.payment === 'hybrid' && !isPhase2 ? '尚未開放' : '購買'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {detailItem &&
        <ProductDetailSheet
          item={detailItem}
          onClose={() => setDetailItem(null)}
          onBuy={(item) => { setDetailItem(null); setPurchasing(item); }}
        />
      }

      {cosmeticDetail &&
        <CosmeticDetailSheet
          item={cosmeticDetail}
          isPhase2={isPhase2}
          isOwned={state.ownedCosmetics?.includes(cosmeticDetail.id)}
          onClose={() => setCosmeticDetail(null)}
          onBuy={(item) => { setCosmeticDetail(null); setPurchasing(item); }}
        />
      }

      {purchasing &&
        <ShopPurchaseModal
          item={purchasing}
          state={state}
          onClose={() => setPurchasing(null)}
          onConfirm={(method, quantity = 1) => {
            const rewardState = purchasing.category === 'status-package'
              ? pickStatusPackReward(purchasing, state.dexStates)
              : null;
            const pointsCost = (purchasing.unitPointsCost || purchasing.pointsCost || 0) * quantity;
            const item = { ...purchasing, quantity, pointsCost, ...(rewardState ? { rewardState } : {}) };
            dispatch({ type: 'BUY', item });
            let orderId = null;
            if (method === 'cash' || method === 'hybrid') {
              orderId = `ORD-${String(Date.now()).slice(-8)}`;
              const thumbMap = { '通行證': '🎫', '禮包': '🎁', '衝刺': '🎁' };
              const thumb = item.thumb ?? Object.entries(thumbMap).find(([k]) => item.name.includes(k))?.[1] ?? '🛍️';
              dispatch({ type: 'PURCHASE_CASH', id: orderId, name: item.name, thumb, price: item.iapPrice ?? item.price, payMethod: 'Apple / Google Pay', date: new Date().toISOString().slice(0, 10) });
            }
            if (method === 'points' || method === 'hybrid') {
              const pointsOrderId = `PTS-${String(Date.now()).slice(-8)}`;
              const now = new Date();
              const dateStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
              dispatch({ type: 'PURCHASE_POINTS', id: pointsOrderId, name: quantity > 1 ? `${item.name} ×${quantity}` : item.name, thumb: item.emoji ?? '🛍️', pointsCost: item.pointsCost, date: dateStr });
              orderId = orderId ?? pointsOrderId;
            }
            setPurchasing(null);
            setSuccessItem({ ...item, paidWith: method, orderId });
          }}
        />
      }

      {successItem &&
        <ShopSuccessModal
          item={successItem}
          state={state}
          onClose={() => setSuccessItem(null)}
          onGoToBag={() => {
            const item = successItem;
            setSuccessItem(null);
            const isFood = item?.id === 'weekly-food';
            const isTool = item?.category === 'tool';
            if (item && item.type === 'change-count') {
              setScreen('p10');
            } else if (isTool) {
              setScreen('p1', { toolStored: { ids: [item.id], source: 'shop' } });
            } else if (isFood) {
              setScreen('p1', { foodStored: true });
            } else {
              setScreen('p9');
            }
          }}
          onGoToWardrobe={() => { setSuccessItem(null); setScreen('p1', { openWardrobe: true }); }}
          onGoToManage={() => { setSuccessItem(null); setScreen('wardrobe-manage'); }}
          setScreen={setScreen}
        />
      }
    </div>);

};

/* ----- P4 helper: 購買確認 Modal ----- */
const DEMO_ERRORS = [
  { id: 'none',    label: '正常（成功）' },
  { id: 'cancel',  label: '用戶取消付款' },
  { id: 'timeout', label: '付款逾時' },
  { id: 'verify',  label: '驗證失敗' },
  { id: 'network', label: '網路錯誤' },
];
const ERROR_MESSAGES = {
  cancel:  '付款已取消',
  timeout: '付款逾時，請重試',
  verify:  '付款驗證失敗，請聯繫客服',
  network: '網路不穩定，請檢查連線後重試',
};
const ShopPurchaseModal = ({ item, state, onClose, onConfirm }) => {
  useModalScrollLock();
  const isCash = item.payment === 'cash';
  const isHybrid = item.payment === 'hybrid';
  const isIAP = item.cashChannel === 'platform-iap';
  const maxQuantity = item.maxQuantity || 1;
  const [quantity, setQuantity] = useState(1);
  const pointsCost = (item.unitPointsCost || item.pointsCost || 0) * quantity;
  const insufficient = (item.payment === 'points' || isHybrid) && state.points < pointsCost;
  const [demoError, setDemoError] = useState('none');
  const [toast, setToast] = useState(null);

  const handleConfirm = () => {
    if (demoError !== 'none') {
      setToast(ERROR_MESSAGES[demoError]);
      return;
    }
    onConfirm(isHybrid ? 'hybrid' : isCash ? 'cash' : 'points', quantity);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="preview"><Glyph value={item.emoji} alt={item.name} /></div>
        <h3>{item.name}</h3>
        <p>{item.desc}</p>

        {item.category === 'food' && (
          <div className="quantity-row">
            <span>購買數量</span>
            <div className="quantity-stepper">
              <button disabled={quantity <= 1} onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
              <b>{quantity}</b>
              <button disabled={quantity >= maxQuantity} onClick={() => setQuantity(q => Math.min(maxQuantity, q + 1))}>＋</button>
            </div>
            {quantity >= maxQuantity && <small className="quantity-limit-note">已達購買上限</small>}
          </div>
        )}

        {/* 付款方式 */}
        {!isCash && insufficient ? (
          <div style={{ background: '#FFF3F0', borderRadius: 12, padding: '14px 16px', marginBottom: 14 }}>
            <div style={{ fontWeight: 800, color: '#D9382A', fontSize: 15, marginBottom: 4 }}>ECOCO 點數不足，無法完成購買</div>
            <div style={{ fontSize: 13, color: '#888' }}>再去帶禮物回家給 Buddy</div>
          </div>
        ) : isHybrid ? (
          <>
            <div className="pay-row active" style={{ marginBottom: 8 }}>
              <span className="lhs"><img src="assets/icon-ecoco-point.svg" alt="" width="18" height="18" />ECOCO</span>
              <span className="rhs point-price">- <img src="assets/icon-ecoco-point.svg" alt="" width="14" height="14" />{pointsCost}</span>
            </div>
            <div className="pay-row active" style={{ marginBottom: 14 }}>
              <span className="lhs">🍎 App Store / Google Play</span>
              <span className="rhs">NT$ {item.iapPrice}</span>
            </div>
          </>
        ) : !isCash ? (
          <div className="pay-row active" style={{ marginBottom: 14 }}>
            <span className="lhs">
              <img src="assets/icon-ecoco-point.svg" alt="" width="18" height="18" />
              ECOCO 點數
              <span style={{ color: 'var(--ecoco-orange)', marginLeft: 4 }}>✓</span>
            </span>
            <span className="rhs point-price">- <img src="assets/icon-ecoco-point.svg" alt="" width="14" height="14" />{pointsCost}</span>
          </div>
        ) : isIAP ? (
          <div className="pay-row active" style={{ marginBottom: 14 }}>
            <span className="lhs">🍎 App Store / Google Play <span style={{ color: 'var(--ecoco-orange)', marginLeft: 4 }}>✓</span></span>
            <span className="rhs">NT$ {item.price}</span>
          </div>
        ) : null}

        {/* 退款聲明 */}
        {(isCash || isHybrid) && (
          <div style={{ fontSize: 11, color: '#AAA', marginBottom: 12, lineHeight: 1.5 }}>
            購買即視為同意
            <span style={{ color: '#060E9F', textDecoration: 'underline', cursor: 'pointer' }}>退款政策</span>
            。數位商品一經購買恕不退款，{isIAP ? '退款請洽 App Store / Google Play 客服' : '如有問題請聯繫 ECOCO 客服'}。
          </div>
        )}

        {/* DEMO error selector */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 10, color: '#BBB', marginBottom: 4, letterSpacing: '.06em' }}>DEMO · 模擬錯誤情境</div>
          <select value={demoError} onChange={e => setDemoError(e.target.value)}
            style={{ fontSize: 12, border: '1px solid #ddd', borderRadius: 8, padding: '4px 8px', width: '100%', color: '#666' }}>
            {DEMO_ERRORS.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
          </select>
        </div>

        <div className="modal-actions">
          <button onClick={onClose} style={{ background: 'var(--gray-light)', color: '#666' }}>取消</button>
          {!insufficient && (
            <button onClick={handleConfirm} style={{ background: 'var(--ecoco-orange)', color: '#fff' }}>確認購買</button>
          )}
        </div>
      </div>

      <SystemToast text={toast} onClose={() => setToast(null)} bottom />
    </div>
  );
};

/* ----- P4 helper: 購買成功 Modal ----- */
const ShopSuccessModal = ({ item, state, onClose, onGoToBag, onGoToWardrobe, onGoToManage, setScreen }) => {
  useModalScrollLock();
  const isCash = item.paidWith === 'cash';
  const isHybrid = item.paidWith === 'hybrid';
  const isChangeCount = item.type === 'change-count';
  const isStatusPack = item.category === 'status-package';
  const isCosmetic = item.cashChannel === 'platform-iap' && item.category !== 'tool' && !isChangeCount && !isStatusPack;
  const orderId = item.orderId ?? null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center', position: 'relative' }}>
        <button onClick={onClose} style={{ position:'absolute', top:12, left:12, background:'none', border:'none', padding:'4px 8px', cursor:'pointer', fontSize:13, fontWeight:700, color:'#555', lineHeight:1, display:'flex', alignItems:'center', gap:2 }}>‹ 返回</button>
        <div style={{ fontSize: 56, marginBottom: 4, lineHeight: 1 }}><Glyph value={item.emoji} alt={item.name} /></div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          background: '#E8F9EE', color: '#1A7A46', borderRadius: 999,
          padding: '4px 14px', fontSize: 12, fontWeight: 800, marginBottom: 12,
        }}>✓ 購買成功</div>
        <h3 style={{ fontSize: 17, fontWeight: 900, marginBottom: 4 }}>{item.name}</h3>
        <p style={{ fontSize: 13, color: '#888', marginBottom: 16 }}>{item.desc}</p>
        <div style={{
          background: '#F7F9FC', borderRadius: 12, padding: '12px 16px',
          fontSize: 13, marginBottom: 20,
          display: 'flex', flexDirection: 'column', gap: 6,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555' }}>
            <span>付款方式</span>
            <span style={{ fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              {isHybrid
                ? <><img src="assets/icon-ecoco-point.svg" alt="" width="14" height="14" />ECOCO ＋ 🍎 App Store</>
                : !isCash
                  ? <><img src="assets/icon-ecoco-point.svg" alt="" width="14" height="14" />ECOCO</>
                  : '🍎 App Store / Google Play'}
            </span>
          </div>
          {!isCash && (
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555' }}>
              <span>剩餘 ECOCO 點數</span>
              <span style={{ fontWeight: 800, color: 'var(--ecoco-orange)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <img src="assets/icon-ecoco-point.svg" alt="" width="14" height="14" />
                {state.points.toLocaleString()}
              </span>
            </div>
          )}
          {isChangeCount && (
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555' }}>
              <span>可用更換次數</span>
              <span style={{ fontWeight: 800, color: 'var(--ecoco-orange)' }}>{state.swapLeft} 次</span>
            </div>
          )}
          {isStatusPack && item.rewardState && (
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555' }}>
              <span>抽中狀態</span>
              <span style={{ fontWeight: 800, color: 'var(--ecoco-orange)' }}>#{item.rewardState.code} {item.rewardState.name}</span>
            </div>
          )}
          {orderId && (
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555' }}>
              <span>訂單編號</span>
              <span style={{ fontWeight: 700, fontFamily: 'var(--font-en)', fontSize: 12 }}>{orderId}</span>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {item.id === 'monthly-pass' ? (
            <button onClick={onClose} style={{
              flex: 1, background: 'var(--ecoco-orange)', color: '#fff',
              border: 'none', borderRadius: 999, padding: '13px 0',
              fontWeight: 800, fontSize: 14, cursor: 'pointer',
            }}>好的，繼續</button>
          ) : isCosmetic ? (
            <>
              <button onClick={onGoToWardrobe} style={{
                flex: 1, background: 'var(--gray-light)', color: '#555',
                border: 'none', borderRadius: 999, padding: '13px 0',
                fontWeight: 700, fontSize: 14, cursor: 'pointer',
              }}>前往換裝</button>
              <button onClick={onGoToManage} style={{
                flex: 1, background: 'var(--ecoco-orange)', color: '#fff',
                border: 'none', borderRadius: 999, padding: '13px 0',
                fontWeight: 800, fontSize: 14, cursor: 'pointer',
              }}>管理裝扮</button>
            </>
          ) : isChangeCount ? (
            <>
              <button onClick={onGoToBag} style={{
                flex: 1, background: 'var(--ecoco-orange)', color: '#fff',
                border: 'none', borderRadius: 999, padding: '13px 0',
                fontWeight: 800, fontSize: 14, cursor: 'pointer',
              }}>去換 Buddy ›</button>
              <button onClick={onClose} style={{
                flex: 1, background: 'var(--gray-light)', color: '#555',
                border: 'none', borderRadius: 999, padding: '13px 0',
                fontWeight: 700, fontSize: 14, cursor: 'pointer',
              }}>繼續逛</button>
            </>
          ) : isStatusPack ? (
            <>
              <button onClick={() => { onClose(); setScreen('p7', { evolveCode: item.rewardState?.code }); }} style={{
                flex: 1, background: 'var(--ecoco-orange)', color: '#fff',
                border: 'none', borderRadius: 999, padding: '13px 0',
                fontWeight: 800, fontSize: 14, cursor: 'pointer',
              }}>查看日誌</button>
              <button onClick={onClose} style={{
                flex: 1, background: 'var(--gray-light)', color: '#555',
                border: 'none', borderRadius: 999, padding: '13px 0',
                fontWeight: 700, fontSize: 14, cursor: 'pointer',
              }}>繼續逛</button>
            </>
          ) : (
            <>
              <button onClick={onGoToBag} style={{
                flex: 1, background: 'var(--ecoco-orange)', color: '#fff',
                border: 'none', borderRadius: 999, padding: '13px 0',
                fontWeight: 800, fontSize: 14, cursor: 'pointer',
              }}>去背包查看</button>
              <button onClick={onClose} style={{
                flex: 1, background: 'var(--gray-light)', color: '#555',
                border: 'none', borderRadius: 999, padding: '13px 0',
                fontWeight: 700, fontSize: 14, cursor: 'pointer',
              }}>繼續逛</button>
            </>
          )}
        </div>
        {(isCash || isHybrid) && (
          <button
            onClick={() => { onClose(); setScreen('p4-orders', { defaultTab: 'cash' }); }}
            style={{ marginTop: 10, background: 'none', border: 'none', color: '#888', fontSize: 13, cursor: 'pointer', textDecoration: 'underline' }}
          >查看訂單 ›</button>
        )}
      </div>
    </div>
  );
};

/* ═══════════════ P5 · Missions ═══════════════ */
const CheckinCard = ({ scenario, onMakeupSuccess }) => {
  const [madeup, setMadeup] = useState(false);

  const sc = scenario || 'normal';
  const isMakeup = sc === 'makeup';
  const showMakeupBtn = isMakeup && !madeup;

  let subtitle, dayCount;
  if (sc === 'normal') {
    subtitle = '連續紀錄維持中！再登入 5 天即可觸發特殊狀態！';
    dayCount = '2/7';
  } else if (sc === 'streak7') {
    subtitle = '恭喜你成功觸發特殊狀態！明天也要來見Buddy唷';
    dayCount = '7/7';
  } else if (sc === 'makeup') {
    subtitle = '昨日未登入！趕緊補簽到才有機會獲得特殊狀態！';
    dayCount = madeup ? '4/7' : '3/7';
  } else {
    subtitle = '全新的一輪陪伴！連續七天來找buddy會有小驚喜';
    dayCount = '1/7';
  }

  const handleMakeup = () => {
    setMadeup(true);
    onMakeupSuccess?.();
  };

  const renderBar = () => {
    // makeup: day1,2 filled; day3 missed (idx 2); day4 today filled (idx 3)
    // after makeup: day3 also filled
    const filledSet = new Set(
      sc === 'normal'   ? [0,1] :
      sc === 'streak7'  ? [0,1,2,3,4,5,6] :
      sc === 'makeup'   ? (madeup ? [0,1,2,3] : [0,1,3]) :
      [0]
    );
    const missedIdx = (sc === 'makeup' && !madeup) ? 2 : -1;

    return (
      <div style={{ flex: 1, display: 'flex', gap: 4, minWidth: 0 }}>
        {Array.from({ length: 7 }, (_, i) => {
          const isMissed = i === missedIdx;
          const bg = isMissed ? 'rgba(255,255,255,0.25)' : filledSet.has(i) ? '#ffce00' : 'rgba(255,255,255,0.2)';
          return (
            <div key={i} style={{
              flex: 1, height: 14, borderRadius: 4, background: bg,
              border: isMissed ? '1.5px dashed rgba(255,255,255,0.5)' : 'none',
            }} />
          );
        })}
      </div>
    );
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <img
        src="assets/p5-card-bg.svg"
        style={{ display: 'block', width: '100%', height: 'auto' }}
        alt=""
      />

      {showMakeupBtn ? (
        <button
          className="makeup-btn"
          onClick={handleMakeup}
          style={{
            position: 'absolute', top: 'calc(6 / 116 * 100%)', right: 'calc(8 / 370 * 100%)', zIndex: 2,
            height: 24, background: '#ff5000', border: '1px solid rgba(255,255,255,0.75)', color: '#fff',
            fontSize: 12, fontWeight: 500, padding: '0 10px', borderRadius: 14,
          }}
        >免費補簽到</button>
      ) : (
        <button
          disabled
          style={{
            position: 'absolute', top: 'calc(6 / 116 * 100%)', right: 'calc(8 / 370 * 100%)', zIndex: 2,
            height: 24, background: '#f7f9fc', border: '1px solid #ff5000', color: '#ff5000',
            fontSize: 12, fontWeight: 500, padding: '0 10px', borderRadius: 14, cursor: 'default',
          }}
        >今日已簽到</button>
      )}

      {/* Content centered over SVG */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '12px 20px',
      }}>
        <div style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>7日覺醒任務</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          {renderBar()}
          <span style={{ color: '#fff', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0 }}>{dayCount}</span>
        </div>
        <p style={{ color: '#f7f9fc', fontSize: 12, fontWeight: 500, letterSpacing: '0.48px', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {isMakeup && madeup ? '補簽成功！連續紀錄完美維持！' : subtitle}
        </p>
      </div>
    </div>
  );
};

const P5Missions = ({ setScreen, state, dispatch, tweaks }) => {
  const [tab, setTab] = useState('daily');
  const [toast, setToast] = useState(null);
  const [pulsing, setPulsing] = useState(false);
  const [claimedIds, setClaimedIds] = useState([]);
  const [bouncingId, setBouncingId] = useState(null);
  const [showEvolve, setShowEvolve] = useState(false);

  const scenario = tweaks?.checkinScenario ?? 'normal';

  // streak7: show evolution overlay first
  React.useEffect(() => {
    if (scenario === 'streak7') setShowEvolve(true);
    else setShowEvolve(false);
  }, [scenario]);

  const tabs = [
    { id: 'daily',   label: '今日' },
    { id: 'week',    label: '本週' },
    { id: 'month',   label: '本月' },
    { id: 'achieve', label: '成就' },
  ];

  const missionFood = state.food[0];
  const missionData = [
    { id: 'login',   title: '來看看 Buddy',              progress: 1, total: 1 },
    { id: 'tap',     title: '摸摸 Buddy 5 次',           progress: 5, total: 5 },
    { id: 'recycle', title: '到回收機為 Buddy 帶來禮物', progress: 2, total: 3 },
    { id: 'refill',  title: '到補充站為 Buddy 補充能量', progress: 0, total: 1 },
    { id: 'feed',    title: '餵食 Buddy 2 次',           progress: 2, total: 2 },
  ];

  const sortedMissions = [...missionData].sort((a, b) => {
    const rank = (m) => {
      if (claimedIds.includes(m.id)) return 2;
      if (m.progress >= m.total) return 0;
      return 1;
    };
    return rank(a) - rank(b);
  });

  const hasClaimable = sortedMissions.some(m => !claimedIds.includes(m.id) && m.progress >= m.total);

  React.useEffect(() => {
    if (tab !== 'daily' || !hasClaimable) return;
    setPulsing(true);
    const t = setTimeout(() => setPulsing(false), 2100);
    return () => clearTimeout(t);
  }, [tab]);

  React.useEffect(() => {
    if (tab !== 'daily') return;
    if (scenario === 'normal' || scenario === 'reset') {
      setToast('今日登入成功，一起來玩吧！');
    }
  }, [scenario, tab]);

  const handleClaim = (m) => {
    setPulsing(false);
    setBouncingId(m.id);
    setTimeout(() => setBouncingId(null), 320);
    setTimeout(() => {
      setClaimedIds(prev => [...prev, m.id]);
      const bagCount = state.food.reduce((sum, food) => sum + food.stock, 0);
      const foodFull = state.foodQuota.weeklyCount >= state.foodQuota.weeklyLimit || bagCount >= state.foodQuota.bagLimit;
      dispatch({ type: 'CLAIM_MISSION' });
      setToast(foodFull ? '一起做到！心情 +3 ✨' : `一起做到！${missionFood.name} ×1 ・ 心情 +3 ✨`);
    }, 160);
  };

  // Show evolution overlay for streak7 before revealing the screen
  if (showEvolve) {
    return <EvolveOverlay onDone={() => { dispatch({ type: 'UNLOCK_DEX_STATE', code: '34', name: '派對動物' }); setShowEvolve(false); }} />;
  }

  return (
    <div className="screen p5">
      {/* ── STICKY TOP: everything above the mission list ── */}
      <div className="p5-sticky-top">
        <StatusBar light />
        <div className="header" style={{ paddingBottom: 26 }}>
          <h2>今日陪伴</h2>
        </div>

        {/* Checkin card */}
        <div style={{ padding: '8px 8px 0', marginBottom: 8 }}>
          <CheckinCard
            scenario={scenario}
            onMakeupSuccess={() => setToast('補簽成功！連續紀錄完美維持！')}
          />
        </div>

        {/* Tab row — white, rounded top corners */}
        <div style={{ background: '#fff', borderRadius: '20px 20px 0 0' }}>
          <div style={{ display: 'flex', gap: 14, padding: '8px 14px', alignItems: 'center' }}>
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  padding: '5px 14px', borderRadius: 20, fontSize: 14, fontWeight: 500,
                  letterSpacing: '0.7px', border: 'none', whiteSpace: 'nowrap', flexShrink: 0,
                  background: tab === t.id ? '#ff5000' : 'transparent',
                  color: tab === t.id ? '#fff' : '#808080',
                }}
              >{t.label}</button>
            ))}
          </div>
        </div>

        {/* 2px separator (page bg shows through) */}
        <div style={{ height: 2, background: '#f7f9fc' }} />
      </div>

      {/* ── SCROLLABLE CONTENT ── */}
      <div className="p5-scroll">
        {tab !== 'daily' ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: '#888' }}>
            <h3 style={{ fontSize: 14, color: '#222', marginBottom: 4 }}>
              {tab === 'week' ? '本週陪伴' : tab === 'month' ? '本月陪伴' : '成就'}
            </h3>
            <p style={{ fontSize: 12 }}>
              {tab === 'week' ? 'Buddy 還在準備本週的陪伴清單～'
                : tab === 'month' ? 'Buddy 還在規劃本月的長線陪伴～'
                : 'Buddy 還在為你收集這份成就～'}
            </p>
          </div>
        ) : (
          <div style={{ padding: '16px 26px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {sortedMissions.map((m, i) => {
              const isClaimed = claimedIds.includes(m.id);
              const isLocked = m.progress < m.total;
              const barFill = `${(m.progress / m.total) * 100}%`;
              return (
                <React.Fragment key={m.id}>
                  {i > 0 && <div style={{ borderTop: '1px solid #e5e7eb' }} />}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <h4 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#222' }}>{m.title}</h4>

                    {/* Progress bar + count */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ flex: 1, position: 'relative', height: 16, background: '#f0f3f7', borderRadius: 16, overflow: 'hidden', minWidth: 0 }}>
                        <div style={{
                          position: 'absolute', top: 0, left: 0, height: '100%', borderRadius: 16,
                          background: isClaimed ? '#e5e7eb' : '#ffce00',
                          width: barFill,
                        }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#888', whiteSpace: 'nowrap', flexShrink: 0 }}>
                        {m.progress}/{m.total}
                      </span>
                    </div>

                    {/* Reward + button */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <img src={missionFood.emoji} style={{ width: 18, height: 18, objectFit: 'contain' }} alt={missionFood.name} />
                          <span style={{ fontSize: 12, fontWeight: 500, color: '#888' }}>{missionFood.name}</span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: '#888' }}>×1</span>
                        </div>
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#888' }}>+</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <img src="assets/icon-mood.svg" style={{ width: 18, height: 18 }} alt="心情" />
                          <span style={{ fontSize: 12, fontWeight: 500, color: '#888' }}>心情</span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: '#888' }}>+3</span>
                        </div>
                      </div>
                      <button
                        className={bouncingId === m.id ? 'claim-bounce' : ''}
                        onClick={!isClaimed && !isLocked ? () => handleClaim(m) : undefined}
                        style={{
                          height: 28, width: 64, borderRadius: 999, fontSize: 11, fontWeight: 700,
                          flexShrink: 0, border: 'none',
                          ...(isClaimed
                            ? { background: '#e5e7eb', border: '1px solid #e5e7eb', color: '#808080' }
                            : isLocked
                              ? { background: '#fff', border: '1px solid #e5e7eb', color: '#ccc' }
                              : { background: '#ff5000', color: '#fff' }),
                        }}
                      >
                        {isClaimed ? '已完成' : isLocked ? '進行中' : '可領取'}
                      </button>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>

      {/* Unified toast — fixed at bottom of screen like other screens */}
      {toast && <SystemToast text={toast} bottom icon={false} onClose={() => setToast(null)} duration={2200} />}
    </div>
  );
};

/* ─── P6 玩具效果常數（資料來源：CURRENT.md #39 效果值 random） ─── */
const TOOL_PRIMARY = {
  feather: { icon: '😊', val: '8~15' },
  ball:    { icon: '😊', val: '8~15' },
  brush:   { icon: '😊', val: '8~15' },
  snack:   { icon: '😊', val: '8~15' },
};
const TOOL_INFO = [
  { id: 'feather', emoji: 'assets/toy/ecobuddy-toy____逗貓棒.webp', name: '逗貓棒', effects: '心情 +8~15' },
  { id: 'ball',    emoji: 'assets/toy/ecobuddy-toy____皮球.webp', name: '小球',   effects: '心情 +8~15' },
  { id: 'brush',   emoji: 'assets/toy/ecobuddy-toy____梳子.webp', name: '梳子',   effects: '心情 +8~15' },
  { id: 'snack',   emoji: 'assets/food/ecobuddy-food___洋芋片.webp', name: '零食',   effects: '心情 +8~15' },
];

/* ═══════════════ P6 · Ads → box ═══════════════ */
const P6Ads = ({ setScreen, state, dispatch }) => {
  const [step, setStep] = useState(1); // 1 ad, 2 reward (confirm handled by sheet at each entry point)
  const [adTime, setAdTime] = useState(15);
  const [pity, setPity] = useState(state.pity || 0);
  const [reward, setReward] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (step !== 1) return;
    if (adTime <= 0) return;
    const t = setTimeout(() => setAdTime((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [step, adTime]);

  const skipAd = () => {
    // TODO [上線版] 以下機率表與保底邏輯為 hi-fi 原型模擬，正式版須改為：
    // 1. 呼叫後端開箱 API（POST /api/ads/open）
    // 2. 後端執行掉落抽取（含保底計數），回傳道具 ID
    // 3. 前端依 id 顯示動畫，不在前端持有機率數字或保底計數
    const rolls = [
    { id: 'feather', emoji: 'assets/toy/ecobuddy-toy____逗貓棒.webp', name: '逗貓棒', prob: 40 },
    { id: 'brush', emoji: 'assets/toy/ecobuddy-toy____梳子.webp', name: '梳子', prob: 30 },
    { id: 'ball', emoji: 'assets/toy/ecobuddy-toy____皮球.webp', name: '小球', prob: 20 },
    { id: 'snack', emoji: 'assets/food/ecobuddy-food___洋芋片.webp', name: '零食', prob: 10 }];

    let result;
    if (pity >= 3) {
      result = rolls.find((r) => r.id === 'snack');
      setPity(0);
    } else {
      const roll = Math.random() * 100;
      let acc = 0;
      for (const r of rolls) {acc += r.prob;if (roll < acc) {result = r;break;}}
      if (result.id === 'snack') setPity(0);else setPity((p) => p + 1);
    }
    setReward(result);
    setStep(2);
  };

  return (
    <div className="screen p6">
      <StatusBar light />
      {step === 1 && <NavBack onClick={() => setScreen('p1')} light />}

      {step === 1 &&
      <div className="ad-screen">
          <div className="ad-label">一段小廣告（讓 Buddy 開心）</div>
          <div className={`skip ${adTime <= 0 ? 'ready' : ''}`} onClick={adTime <= 0 ? skipAd : undefined}>
            {adTime > 0 ? `${adTime}s` : '領玩具 ›'}
          </div>
          <div className="ad-mock">
            <div className="play">▶</div>
            <div style={{ fontSize: 18 }}>廣告播放中</div>
            <div style={{ fontSize: 12, fontWeight: 500, opacity: .85 }}>{adTime > 0 ? `${adTime} 秒` : '廣告結束'}</div>
          </div>
          {/* DEV ONLY：略過廣告等待，正式版移除 */}
          {adTime > 0 && (
            <button className="dev-skip-ad" onClick={() => setAdTime(0)}>
              ⏩ DEV 跳過等待
            </button>
          )}
        </div>
      }
      {step === 2 && (
        <div className="p6-reward-screen">
          <div className="p6-burst-bg" />
          <div className="p6-reward-content">
            <img src="assets/p6/p6-title.svg" className="p6-title" alt="獲得玩具囉" />
            <img src={reward.emoji} className="p6-toy-img" alt={reward.name} />
            <div className="p6-reward-bottom">
              <div className="p6-effect-row">
                <div className="p6-effect-inner">
                  <span className="p6-effect-label">和buddy玩</span>
                  <span className="p6-effect-plus">+</span>
                  <img src="assets/p6/icon-mood.svg" className="p6-mood-icon" alt="" />
                  <span className="p6-effect-val">{(TOOL_PRIMARY[reward.id] || TOOL_PRIMARY.feather).val}</span>
                </div>
                <button className="p6-info-btn" onClick={() => setShowInfo(true)}>
                  <img src="assets/p6/btn-info.svg" alt="說明" />
                </button>
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginBottom: 8 }}>免費玩具 24 小時內使用喔</div>
              <button className="p6-cta-btn" onClick={() => {
                dispatch({ type: 'ADD_TOOL', tool: reward });
                setScreen('p1', { toolStored: { ids: [reward.id], source: 'ad' } });
              }}>存進玩具箱</button>
            </div>
          </div>
          {showInfo && (
            <div className="sheet-backdrop" onClick={() => setShowInfo(false)}>
              <div className="sheet-panel" onClick={e => e.stopPropagation()}>
                <div className="sheet-grip" />
                <h3 style={{ fontSize: 17, fontWeight: 900, marginBottom: 4, textAlign: 'center' }}>玩具效果說明</h3>
                <p style={{ fontSize: 12, color: '#888', textAlign: 'center', marginBottom: 16 }}>每次效果為隨機值，使用時後端即時回傳</p>
                <p style={{ fontSize: 13, color: '#444', textAlign: 'center', marginBottom: 16, lineHeight: 1.6 }}>所有玩具都能讓 Buddy 心情變好，<br />實際效果值由後台設定。</p>
                <div style={{ fontSize: 12, color: '#888', paddingTop: 12, borderTop: '1px solid #eee', lineHeight: 1.8 }}>
                  <div>・免費玩具（廣告）24 小時後過期</div>
                  <div>・購買玩具永久持有，不會過期</div>
                  <div>・快到期時玩具箱會出現提示</div>
                </div>
                <button className="btn-ghost" style={{ width: '100%', marginTop: 16 }} onClick={() => setShowInfo(false)}>關閉</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>);

};

/* 特殊狀態標籤：#36 傳說（金）、#28–#35 特殊（藍）。絕對定位不撐開卡片 */
const DexTag = ({ state }) => state.legendary
  ? <span className="rarity">傳說</span>
  : state.tag ? <span className="rarity special">{state.tag}</span> : null;

/* 鎖頭 icon（取代 🔒 emoji）：卡片角標與彈窗內文皆共用此向量圖 */
const LockGlyph = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="5" y="10.5" width="14" height="9.5" rx="2.4" fill="currentColor" />
    <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    <circle cx="12" cy="15.2" r="1.5" fill="#fff" />
  </svg>
);
const DexLockBadge = () => <LockGlyph className="lock-badge" />;

const P7DetailOverlay = ({ onClose, children }) => ReactDOM.createPortal(
  <div className="year-detail-overlay" onClick={onClose}>{children}</div>,
  document.querySelector('.iphone-screen')
);

/* ═══════════════ P7 · Dex ═══════════════ */
const P7Dex = ({ setScreen, state, dispatch, onOpenPicker, tweaks, payload }) => {
  const isPhase2 = (tweaks?.shopPhase ?? 1) >= 2;
  const lockedCode = state.lockedMonthCode;
  const [showEvolve, setShowEvolve] = useState(() => Boolean(payload?.evolveCode || state.pendingEvolveCode));
  const flashCode = state.highlightStateCode;

  // Phase 2 角色清單（Phase 1 只有小海龜）
  const characters = isPhase2 ? [
    { id: 'turtle', name: '小海龜', icon: '🐢', primary: true },
    { id: 'polar',  name: '北極熊', icon: '🐻‍❄️' },
    { id: 'seal',   name: '小海豹', icon: '🦭' },
    { id: 'gem',    name: '亮寶',   icon: '✨' },
  ] : [
    { id: 'turtle', name: '小海龜', icon: '🐢', primary: true },
  ];
  const [charId, setCharId] = useState('turtle');
  const currentChar = characters.find(c => c.id === charId) || characters[0];

  const months = [
  { m: 1, filled: true, icon: '🐢', code: '07' },
  { m: 2, filled: true, icon: '🐢', code: '13' },
  { m: 3, filled: true, icon: isPhase2 ? '🐻‍❄️' : '🐢', code: '17' },
  { m: 4, filled: true, icon: isPhase2 ? '🦭' : '🐢', code: '26' },
  { m: 5, filled: true, icon: '🐢', code: '08' },
  lockedCode
    ? { m: 6, filled: true, icon: '🐢', code: lockedCode, current: true }
    : { m: 6, filled: false, current: true },
  { m: 7, locked: true },
  { m: 8, locked: true },
  { m: 9, locked: true },
  { m: 10, locked: true },
  { m: 11, locked: true },
  { m: 12, locked: true }];


  // 夥伴日誌完整呈現官方 36 型態（27 基礎 + 9 隱藏），不受商店上線階段影響。
  // 小海龜的解鎖狀態與 tint 取自 state.dexStates；其他角色（Phase 2）為全鎖定預留。
  const dexTotal = 36;
  const baseStates = state.dexStates;
  const states = (() => {
    if (isPhase2 && charId !== 'turtle') {
      return DEX_TYPE_CATALOG.map(t => ({
        code: t.code,
        name: t.name,
        legendary: Boolean(t.legendary),
        tag: t.tag,
        unlocked: false,
        character: charId,
      }));
    }
    const known = new Map(baseStates.map(s => [s.code, s]));
    return DEX_TYPE_CATALOG.map(t => {
      const owned = known.get(t.code);
      return {
        code: t.code,
        name: t.name,
        legendary: Boolean(t.legendary),
        tag: t.tag,
        unlocked: owned ? owned.unlocked : false,
        tint: owned?.tint,
      };
    });
  })();
  const stripRef = useRef(null);
  const currentCellRef = useRef(null);
  const screenRef = useRef(null);
  const [detailMo, setDetailMo] = useState(null);
  const [detailState, setDetailState] = useState(null);

  useEffect(() => {
    if (currentCellRef.current && stripRef.current) {
      const strip = stripRef.current;
      const cell = currentCellRef.current;
      strip.scrollLeft = cell.offsetLeft - strip.offsetWidth / 2 + cell.offsetWidth / 2;
    }
  }, []);

  const overlayOpen = !!(detailMo || detailState);
  useEffect(() => {
    const el = screenRef.current;
    if (!el) return;
    if (overlayOpen) {
      el.scrollTop = el.scrollTop; // force-stop WebKit inertia scroll
      el.style.overflowY = 'hidden';
    } else {
      el.style.overflowY = '';
    }
  }, [overlayOpen]);

  useEffect(() => {
    if (!flashCode || showEvolve) return;
    const t = setTimeout(() => dispatch({ type: 'CLEAR_HIGHLIGHT_STATE' }), 5600);
    return () => clearTimeout(t);
  }, [flashCode, showEvolve]);

  const handleCellClick = (mo) => {
    if (mo.filled) setDetailMo(mo);
    else if (mo.current) onOpenPicker && onOpenPicker();
  };

  return (
    <div ref={screenRef} className={`screen p7${overlayOpen ? ' detail-open' : ''}`}>
      {showEvolve && <EvolveOverlay onDone={() => { setShowEvolve(false); dispatch({ type: 'CLEAR_PENDING_EVOLVE' }); }} />}
      <StatusBar />
      <div className="header">
        <h2>夥伴日誌</h2>
        <div className="en">2026</div>
      </div>

      <div className="section-h">
        <div className="section-h-row">
          <span>今年的 Buddy 們</span>
          {!state.lockedMonthCode ? (
            <button onClick={() => onOpenPicker && onOpenPicker()} style={{ background: 'var(--ecoco-orange)', color: '#fff', border: 'none', borderRadius: 999, padding: '5px 14px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>收錄本月最佳</button>
          ) : (
            <button onClick={() => state.swapLeft > 0 ? (onOpenPicker && onOpenPicker()) : setScreen('p4', { tab: 'package', focus: 'change-count-packs' })} style={{ background: 'var(--ecoco-orange)', color: '#fff', border: 'none', borderRadius: 999, padding: '5px 14px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>更改本月最佳</button>
          )}
        </div>
      </div>
      <div className="year-strip" ref={stripRef}>
        {months.map((mo) =>
        <div key={mo.m} ref={mo.current ? currentCellRef : null} className={`year-cell ${mo.filled ? 'filled' : ''} ${mo.current && !mo.filled ? 'current' : ''} ${mo.locked ? 'locked' : ''}`} onClick={() => handleCellClick(mo)} style={(mo.filled || mo.current) ? { cursor: 'pointer' } : undefined}>
            <span className="month">{String(mo.m).padStart(2, '0')}</span>
            {mo.filled && <><span className="icon">{mo.icon}</span><span style={{ fontSize: 13, opacity: .55 }}>#{mo.code}</span></>}
            {mo.current && !mo.filled && <span style={{ fontSize: 42, marginTop: 6 }}>?</span>}
            {mo.locked && <span style={{ fontSize: 33, marginTop: 6, opacity: .18 }}>?</span>}
          </div>
        )}
      </div>

      {detailMo && (() => {
        const charState = states.find(s => s.code === detailMo.code);
        return (
          <P7DetailOverlay onClose={() => setDetailMo(null)}>
            <div className="year-detail-sheet" onClick={e => e.stopPropagation()}>
              <button className="year-detail-close" onClick={() => setDetailMo(null)}>✕</button>
              <div className="year-detail-collected">已收藏 ✓</div>
              <div className="year-detail-emoji">{detailMo.icon}</div>
              <div className="year-detail-code">#{detailMo.code}</div>
              <div className="year-detail-name">{charState?.name || dexTypeName(detailMo.code)}</div>
              <div className="year-detail-month">{String(detailMo.m).padStart(2, '0')} 月 · 2026 年度</div>
              {charState?.legendary && <div className="year-detail-rarity">傳說</div>}
            </div>
          </P7DetailOverlay>
        );
      })()}

      {isPhase2 && (
        <div style={{ padding: '0 18px 8px', display: 'flex', gap: 6, overflowX: 'auto' }}>
          {characters.map(c => {
            const on = c.id === charId;
            return (
              <button key={c.id} onClick={() => setCharId(c.id)} style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '6px 12px', borderRadius: 999, flexShrink: 0,
                background: on ? 'var(--ecoco-orange)' : '#fff',
                color: on ? '#fff' : '#666',
                border: on ? 'none' : '1.5px solid var(--border)',
                fontSize: 12, fontWeight: 700, cursor: 'pointer',
              }}>
                <span style={{ fontSize: 14 }}>{c.icon}</span>
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>
      )}

      <div className="section-h">
        <div className="section-h-row">
          <span>本月解鎖 · 6 月{currentChar.name}</span>
          <span className="meta">{states.filter((s) => s.unlocked).length} / {dexTotal}</span>
        </div>
      </div>
      <div className="section-progress">
        <div className="fill" style={{ width: `${(states.filter(s => s.unlocked).length / dexTotal) * 100}%` }} />
      </div>
      <div className="month-grid" style={{ paddingBottom: 100 }}>
        {states.map((s) =>
        <div key={s.code} className={`state-card ${s.unlocked ? 'unlocked' : 'locked'} ${s.legendary ? 'legendary' : ''} ${flashCode === s.code ? 'flash' : ''}`} onClick={() => setDetailState({ ...s, character: currentChar })} style={{ cursor: 'pointer' }}>
            <span className="code">#{s.code}</span>
            {s.unlocked ? <>
              <img className="turtle" src="assets/sea-turtle.svg" alt="" style={{ filter: s.tint || 'none' }} />
              <span className="name">{s.name}</span>
              <DexTag state={s} />
            </> : (charId === 'turtle' ? <>
              <span className="state-thumb">
                <span className="turtle-silhouette" />
              </span>
              <span className="name">{s.name}</span>
              <DexTag state={s} />
              <DexLockBadge />
            </> : <>
              <span className="state-thumb">
                <span className="thumb-emoji locked">{currentChar.icon}</span>
              </span>
              <span className="name">{s.name}</span>
              <DexTag state={s} />
              <DexLockBadge />
            </>)}
          </div>
        )}
      </div>

      {detailState && (
        <P7DetailOverlay onClose={() => setDetailState(null)}>
          <div className="year-detail-sheet" onClick={e => e.stopPropagation()}>
            <button className="year-detail-close" onClick={() => setDetailState(null)}>✕</button>
            {detailState.unlocked
              ? <div className="year-detail-collected">已解鎖 ✓</div>
              : <div className="year-detail-collected" style={{ background: 'rgba(0,0,0,0.06)', color: '#999' }}><LockGlyph className="lock-inline" />尚未解鎖</div>
            }
            {detailState.character && detailState.character.id !== 'turtle' ? (
              <div style={{ width: 120, height: 120, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 72, opacity: detailState.unlocked ? 1 : 0.25 }}>{detailState.character.icon}</div>
            ) : (
              <img
                src="assets/sea-turtle.svg" alt=""
                className="state-detail-turtle"
                style={{ filter: detailState.unlocked ? (detailState.tint || 'none') : 'grayscale(1) opacity(0.3)' }}
              />
            )}
            <div className="year-detail-code">#{detailState.code}</div>
            <div className="year-detail-name">{detailState.name}</div>
            <div className="year-detail-month">觸發條件：{dexTypeTrigger(detailState.code)}</div>
            {detailState.legendary
              ? <div className="year-detail-rarity">傳說</div>
              : detailState.tag ? <div className="year-detail-rarity special">{detailState.tag}</div> : null}
          </div>
        </P7DetailOverlay>
      )}

    </div>);

};

/* ═══════════════ P8 · Profile (Me · 我的) ═══════════════ */
const P8Profile = ({ setScreen, state, tweaks }) => {
  const isPhase2 = (tweaks?.shopPhase ?? 1) >= 2;
  const ownedCount = (state.ownedCosmetics || []).length;
  const equippedName = state.equippedCosmetic
    ? (COSMETIC_CATALOG.find(c => c.id === state.equippedCosmetic)?.name ?? '已穿戴')
    : '尚未穿戴';
  const featureGroups = [
    {
      title: '', en: 'BUDDY',
      items: [
        { icon: '🐢', label: '夥伴狀態', sub: `體力 ${state.stats.hp} · 潔淨 ${state.stats.clean} · 心情 ${state.stats.mood}`, go: 'p1' },
        { icon: '📖', label: '夥伴日誌', sub: `認識了 ${state.dexStates.filter(s => s.unlocked).length} / 36 個樣子`, go: 'p7' },
      ],
    },
    {
      title: '我的收藏', en: 'COLLECTION',
      items: [
        isPhase2
          ? { icon: '🎀', label: '我的裝扮', sub: ownedCount > 0 ? `${ownedCount} 件 · 現在穿著：${equippedName}` : '還沒有裝扮', action: () => setScreen('wardrobe-manage') }
          : { icon: '🎀', label: '我的裝扮', sub: '即將推出，敬請期待', locked: true },
        { icon: '🎒', label: '玩具箱',   sub: `${state.tools.length} 個玩具`, go: 'p9' },
      ],
    },
    {
      title: '活動', en: 'ACTIVITY',
      items: [
        { icon: '✅', label: '今日陪伴', sub: '還有 3 件事可以做', go: 'p5' },
        { icon: '🛒', label: '商店',     sub: `點數 ${state.points.toLocaleString()}`, go: 'p4' },
        { icon: '🧾', label: '購買紀錄', sub: (state.pointsOrderHistory && state.pointsOrderHistory.length > 0) ? state.pointsOrderHistory[0].name : (state.orderHistory && state.orderHistory.length > 0 ? state.orderHistory[0].name : '尚無購買紀錄'), go: 'p4-orders' },
      ],
    },
    {
      title: '使用教學', en: 'GUIDE',
      items: [
        { icon: '🌱', label: '新手引導',   sub: '認識體力／潔淨／心情、陪 Buddy 吃飯、變身', go: 'p0a' },
        { icon: '💬', label: '常見問題',   sub: '更換次數、過期道具、課金', go: 'p8-faq' },
      ],
    },
  ];


  return (
    <div className="screen p8">
      <StatusBar light />
      <NavBack onClick={() => setScreen('p1')} light />
      <div className="screen-scroll" style={{ paddingTop: 0 }}>

        <div className="header">
          <div className="profile-row">
            <div className="avatar"><img src="assets/btn/avatar.svg" alt="" draggable="false" /></div>
            <div style={{ flex: 1 }}>
              <h2>可可粉</h2>
              <div className="id">ID · ECOCO_9999</div>
              <div style={{ fontSize: 11, marginTop: 4, opacity: .85 }}>和 Buddy 已連續陪伴 5 天</div>
            </div>
          </div>
        </div>

        <div className="stats-row">
          <div className="stat-card"><b>238</b><div className="label">次帶禮物回家</div></div>
          <div className="stat-card"><b>156</b><div className="label">次餵食 Buddy</div></div>
        </div>

        {state.hasPass && (
          <div className="pass-card" onClick={() => setScreen('p4')} style={{ cursor: 'pointer' }}>
            <div className="gem">🎫</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3>月度通行證啟用中</h3>
              <p>有效至 6/30 · 每日通行禮 ・ 廣告加碼 ・ 通行者稱號</p>
            </div>
            <div className="arrow">›</div>
          </div>
        )}

        {featureGroups.map((group) =>
        <div key={group.en} style={{ marginTop: 18 }}>
            {group.title && <div className="p8-group-h">
              <span>{group.title}</span>
              <span className="en">{group.en}</span>
            </div>}
            <div className="menu">
              {group.items.map((it, i) =>
            <div key={i}
              className={`menu-item ${!it.locked && (it.go || it.comingSoon || it.action) ? 'tap-area' : ''}`}
              style={it.locked ? { opacity: 0.45, cursor: 'default' } : {}}
              onClick={() => { if (it.locked) return; if (it.action) it.action(); else if (it.go) setScreen(it.go); }}>
                  <span className="icon">
                    {it.icon === 'pt' ?
                <img src="assets/icon-ecoco-point.svg" alt="" width="20" height="20" /> :
                it.icon}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, color: '#222', fontSize: 14 }}>{it.label}</div>
                    {it.sub && <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{it.sub}</div>}
                  </div>
                  <span className="arrow" style={{ color: (it.comingSoon || it.locked) ? '#ccc' : '' }}>›</span>
                </div>
            )}
            </div>
          </div>
        )}

        <div style={{ padding: '18px 18px 90px' }}>
          <button
            onClick={() => setScreen('p0')}
            style={{
              width: '100%',
              background: '#fff',
              border: '2px solid var(--ecoco-blue)',
              color: 'var(--ecoco-blue)',
              padding: '14px', borderRadius: 999,
              fontWeight: 800, fontSize: 15,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
            }}>
            <span style={{ fontSize: 18 }}>↩</span>
            切換到一般模式（ECOCO 主 App）
          </button>
          <div style={{ textAlign: 'center', marginTop: 14, fontSize: 11, color: '#999' }}>
            ECO BUDDY v1.0<br />© 2026 ECOCO 凡立橙股份有限公司
          </div>
        </div>

      </div>
    </div>);

};

/* ═══════════════ P9 · Bag ═══════════════ */
const P9Bag = ({ setScreen, state, dispatch }) => {
  const [tab, setTab] = useState('free');
  const [p6SheetOpen, setP6SheetOpen] = useState(false);
  const [snackText, setSnackText] = useState(null);
  const tools = state.tools;
  const filtered = tools.filter((t) => tab === 'free' ? !t.permanent : tab === 'paid' ? t.permanent : true);

  const showSnack = () => setSnackText('回夥伴首頁，拖曳到 Buddy 身上使用');

  return (
    <div className="screen p9">
      <StatusBar />
      <NavBack onClick={() => setScreen('p1')} />
      <div className="header">
        <h2>玩具箱</h2>
      </div>
      <div className="tabs">
        <button className={`tab ${tab === 'free' ? 'active' : ''}`} onClick={() => setTab('free')}>Buddy 的禮物 ({tools.filter((t) => !t.permanent).length})</button>
        <button className={`tab ${tab === 'paid' ? 'active' : ''}`} onClick={() => setTab('paid')}>收藏品 ({tools.filter((t) => t.permanent).length})</button>
      </div>
      {tab === 'free' && tools.some((t) => !t.permanent && t.hoursLeft <= 6) &&
      <div className="expire-banner">
          <span>{DIALOGUES.err.toolExpire}</span>
        </div>
      }
      {filtered.length === 0 ?
      (tab === 'paid' ?
      <div className="empty-bag">
          <h3>還沒有收藏品</h3>
          <p>到商店買玩具，就會收進這裡永久保存</p>
          <div className="empty-actions">
            <button className="btn-primary" style={{ padding: '10px 20px', fontSize: 13 }} onClick={() => setScreen('p4', { tab: 'tool' })}>去商店</button>
          </div>
        </div> :
      <div className="empty-bag">
          <h3>{DIALOGUES.err.bagEmpty}</h3>
          <p>看廣告抽道具，或到商店逛逛</p>
          <div className="empty-actions">
            <button className="btn-primary" style={{ padding: '10px 20px', fontSize: 13 }} onClick={() => setP6SheetOpen(true)}>看廣告</button>
            <button className="btn-ghost" style={{ padding: '10px 20px', fontSize: 13 }} onClick={() => setScreen('p4', { tab: 'tool' })}>去商店</button>
          </div>
        </div>) :

      <div className="bag-grid">
          {filtered.map((t) =>
        <div key={t.id} className={`bag-cell${t.isNew ? ' new' : ''}`} onClick={() => { if (t.isNew) dispatch({ type: 'CLEAR_NEW_TOOL', id: t.id }); showSnack(); }} style={{ cursor: 'pointer' }}>
              {t.permanent && <div className="perm">永久</div>}
              <div className="emoji"><Glyph value={t.emoji} alt={t.name} /></div>
              <div className="name">{t.name}</div>
              <span className="effect-tag">{toolEffectMap[t.id].label}</span>
              {t.count > 1 && <span className="badge">{t.count}</span>}
            </div>
        )}
        </div>
      }
      <div style={{ paddingBottom: 100 }}></div>
      <SystemToast bottom icon={false} text={snackText} onClose={() => setSnackText(null)} duration={2500} />
      {p6SheetOpen && (
        <div className="sheet-backdrop" onClick={() => setP6SheetOpen(false)}>
          <div className="sheet-panel" onClick={e => e.stopPropagation()}>
            <div className="sheet-grip" />
            <h3 style={{ fontSize: 18, fontWeight: 900, textAlign: 'center', marginBottom: 6 }}>免費玩具</h3>
            <div style={{ textAlign: 'center', color: 'var(--gray-text)', fontSize: 13, marginBottom: 12 }}>
              {state.adRemaining > 0
                ? `今日剩 ${state.adRemaining} 次 · 觀看 30 秒影片即可獲得`
                : DIALOGUES.err.adsDaily}
            </div>
            <div className="pity-bar" style={{ marginBottom: 6 }}>
              {[0, 1, 2, 3].map((i) =>
                <div key={i} className={`seg ${i < (state.pity || 0) ? 'fill' : ''}`}></div>
              )}
            </div>
            <div style={{ textAlign: 'center', color: 'var(--gray-text)', fontSize: 11, marginBottom: 20 }}>連 3 次未抽到零食 → 第 4 次必給</div>
            {state.adRemaining > 0 && (
              <button className="btn-primary" style={{ width: '100%' }}
                onClick={() => { setP6SheetOpen(false); setScreen('p6'); }}>
                觀看影片
              </button>
            )}
            <button className="btn-ghost" style={{ width: '100%', marginTop: 8 }}
              onClick={() => setP6SheetOpen(false)}>
              取消
            </button>
          </div>
        </div>
      )}
    </div>);

};


/* ═══════════════ 裝扮衣櫥 · Wardrobe Management ═══════════════ */
const WardrobeManage = ({ setScreen, state }) => {
  const [snackText, setSnackText] = useState(null);
  const owned = state.ownedCosmetics || [];
  const equipped = state.equippedCosmetic;
  const ownedItems = COSMETIC_CATALOG.filter(c => owned.includes(c.id));

  return (
    <div className="screen p9">
      <StatusBar />
      <NavBack onClick={() => setScreen('p1', { openWardrobe: true })} />
      <div className="header">
        <h2>我的裝扮</h2>
      </div>
      {ownedItems.length === 0 ? (
        <div className="empty-bag">
          <h3>還沒有裝扮</h3>
          <p>去商店幫 Buddy 找件喜歡的衣服</p>
          <div className="empty-actions">
            <button className="btn-primary" style={{ padding: '10px 20px', fontSize: 13 }} onClick={() => setScreen('p4', { tab: 'cosmetic' })}>去商店</button>
          </div>
        </div>
      ) : (
        <div className="bag-grid">
          {ownedItems.map(item => {
            const isEquipped = equipped === item.id;
            return (
              <div key={item.id} className="bag-cell" style={{ cursor: 'pointer' }}
                onClick={() => setSnackText('回夥伴首頁，在換衣間幫 Buddy 穿上')}>
                {isEquipped && <div className="perm" style={{ background: 'var(--ecoco-orange)' }}>穿著中</div>}
                <div className="emoji"><Glyph value={item.emoji} alt={item.name} /></div>
                <div className="name">{item.name}</div>
                <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{item.desc}</div>
              </div>
            );
          })}
        </div>
      )}
      <div style={{ paddingBottom: 100 }}></div>
      <SystemToast bottom icon={false} text={snackText} onClose={() => setSnackText(null)} duration={2500} />
    </div>
  );
};

/* ═══════════════ P10 · Month picker (overlay on P7) ═══════════════ */
const P10Picker = ({ setScreen, state, dispatch, onClose }) => {
  const [selected, setSelected] = useState(null);
  const [confirmCode, setConfirmCode] = useState(null);
  const states = state.dexStates;
  const isFirstLock = !state.lockedMonthCode;
  const capExceeded = !isFirstLock && state.swapLeft <= 0;

  const handleClose = () => {
    if (onClose) onClose();
    else setScreen('p7');
  };

  const handleConfirm = () => {
    dispatch({ type: 'LOCK_DEX', code: confirmCode });
    handleClose();
  };

  return (
    <div className="screen p10">
      <div className="sheet">
        <div className="title">
          <h3>選擇你的 6 月 Buddy</h3>
          <p>從這個月遇到的樣子裡挑一個記下來</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
            <p style={{ fontSize: 12, color: capExceeded ? '#D9382A' : 'var(--ecoco-orange)', fontWeight: 700, margin: 0 }}>
              {capExceeded ? '已達本月更換上限' : isFirstLock ? '首次鎖入免費' : `還能換 ${state.swapLeft} 次`}
            </p>
            <button onClick={() => { handleClose(); setScreen('p4', { tab: 'package', focus: 'change-count-packs' }); }} style={{ fontSize: 11, fontWeight: 800, color: 'var(--ecoco-blue)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}>多一點選擇 →</button>
          </div>
          {capExceeded && (
            <div style={{ marginTop: 10, padding: '10px 12px', background: '#FFF3F0', borderRadius: 10, fontSize: 12, color: '#D9382A', lineHeight: 1.5 }}>
              本月更換次數已用完。可點上方「多一點選擇」前往商店補充，或等下個月重置。
            </div>
          )}
        </div>
        <div className="grid">
          {states.map((s) =>
          <div key={s.code}
          className={`state-card ${s.unlocked ? 'unlocked' : 'locked'} ${s.legendary ? 'legendary' : ''} ${selected === s.code ? 'selected' : ''}`}
          onClick={() => s.unlocked && setSelected(s.code)}>
              <span className="code">#{s.code}</span>
              <img className="turtle" src="assets/sea-turtle.svg" alt="" style={{ filter: s.tint || 'none' }} />
              {s.unlocked ? <>
                <span className="name">{s.name}</span>
                <DexTag state={s} />
              </> : <>
                <span className="lock" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>🔒</span>
              </>}
            </div>
          )}
        </div>
        <div className="actions">
          <button className="later" onClick={handleClose}>等等再說</button>
          <button className="confirm" disabled={!selected || capExceeded} onClick={() => setConfirmCode(selected)}>{capExceeded ? '次數已用完' : '收進日誌'}</button>
        </div>
      </div>
      {confirmCode && ReactDOM.createPortal(
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: '28px 24px', width: 280, textAlign: 'center' }}>
            <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, lineHeight: 1.4, color: '#1A1A1A' }}>{isFirstLock ? '確定把這個 Buddy 收進日誌？' : '確定更換本月 Buddy？'}</p>
            <p style={{ fontSize: 13, color: '#666', marginBottom: 24, lineHeight: 1.6 }}>{isFirstLock ? '本月只有一次免費機會，收錄後若要更改需要更換次數。' : `將消耗 1 次更換次數（更換後剩 ${state.swapLeft - 1} 次）。`}</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setConfirmCode(null)} style={{ flex: 1, padding: '10px 0', border: '1.5px solid #E0E0E0', borderRadius: 999, background: '#fff', color: '#1A1A1A', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>再想想</button>
              <button onClick={handleConfirm} style={{ flex: 1, padding: '10px 0', border: 'none', borderRadius: 999, background: 'var(--ecoco-orange)', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>{isFirstLock ? '收進日誌' : '確認更換'}</button>
            </div>
          </div>
        </div>,
        document.querySelector('.iphone-screen')
      )}
    </div>);

};

/* ═══════════════ P11 · Swap pack purchase ═══════════════ */
const SWAP_PACKS = [
  { id: 'swap-10', name: '標準包',   qty: 10, desc: '偶爾想換一下',                  price: 99,  featured: false },
  { id: 'swap-50', name: '進階包',   qty: 50, desc: '換到滿意為止',                  price: 299, featured: true  },
];

const P11PurchaseModal = ({ item, onClose, onConfirm }) => {
  const [payFailDemo, setPayFailDemo] = useState(false);
  const [toast, setToast] = useState(null);

  const handleConfirm = () => {
    if (payFailDemo) {
      setToast(DIALOGUES.sys.p4.payFail);
      setPayFailDemo(false);
      return;
    }
    onConfirm();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="preview" style={{ fontSize: 36 }}>🎫</div>
        <h3>{item.name}</h3>
        <p>{item.qty} 次更換 · {item.desc}</p>
        <div className="pay-row active" style={{ marginBottom: 14, cursor: 'default' }}>
          <span className="lhs">
            <span style={{ fontSize: 16 }}>💳</span>
            Apple / Google Pay
            <span style={{ color: 'var(--ecoco-orange)' }}>✓</span>
          </span>
          <span className="rhs">NT$ {item.price}</span>
        </div>
        <label className="p4-demo-row">
          <input type="checkbox" checked={payFailDemo} onChange={(e) => setPayFailDemo(e.target.checked)} />
          <span>DEMO · 模擬付款失敗</span>
        </label>
        <div className="modal-actions">
          <button onClick={onClose} style={{ background: 'var(--gray-light)', color: '#666' }}>取消</button>
          <button onClick={handleConfirm} style={{ background: 'var(--ecoco-orange)', color: '#fff' }}>確認購買</button>
        </div>
      </div>
      <SystemToast text={toast} onClose={() => setToast(null)} bottom />
    </div>
  );
};

const P11SuccessModal = ({ item, onClose }) => (
  <div className="modal-backdrop" onClick={onClose}>
    <div className="modal" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 56, marginBottom: 4, lineHeight: 1 }}>🎫</div>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        background: '#E8F9EE', color: '#1A7A46', borderRadius: 999,
        padding: '4px 14px', fontSize: 12, fontWeight: 800, marginBottom: 12,
      }}>✓ 購買成功</div>
      <h3 style={{ fontSize: 17, fontWeight: 900, marginBottom: 4 }}>{item.name}</h3>
      <p style={{ fontSize: 13, color: '#888', marginBottom: 16 }}>已新增 {item.qty} 次更換次數</p>
      <div style={{
        background: '#F7F9FC', borderRadius: 12, padding: '12px 16px', fontSize: 13, marginBottom: 20,
        display: 'flex', justifyContent: 'space-between', color: '#555',
      }}>
        <span>付款方式</span>
        <span style={{ fontWeight: 700 }}>💳 Apple / Google Pay</span>
      </div>
      <button onClick={onClose} style={{
        width: '100%', background: 'var(--ecoco-orange)', color: '#fff',
        border: 'none', borderRadius: 999, padding: '13px 0', fontWeight: 800, fontSize: 14, cursor: 'pointer',
      }}>完成</button>
    </div>
  </div>
);

/* P11Pack — legacy redirect to P4 package tab (change-count packs now live in P4) */
const P11Pack = ({ setScreen }) => {
  useEffect(() => { setScreen('p4', { tab: 'package', focus: 'change-count-packs' }); }, []);
  return null;
};


/* ═══════════════ P8-FAQ · 常見問題 ═══════════════ */
const FAQ_DATA = [
  {
    cat: 'Buddy 養成', id: 'buddy',
    items: [
      { q: 'Buddy 的體力怎麼補充？', a: '兩個方式能補充體力：把 Buddy 的餐袋裡的食物拖給牠吃，每份食物都能讓 Buddy 補充體力（每次有點隨機小驚喜）；或是去補充站消費，每消費 NT$10 直接補充 +10 體力。體力越高，Buddy 越活潑！' },
      { q: 'Buddy 的潔淨怎麼提升？', a: '帶東西回家（收瓶機每個 +2 潔淨；電池機每顆投入 +5 潔淨）和去補充站消費（每 NT$10 +10 潔淨，沒有上限）都能幫 Buddy 保持潔淨。注意：帶回來的東西如果被退件，每件扣 Buddy 潔淨 -1（不會低於 0）。' },
      { q: '怎麼讓 Buddy 心情變好？', a: '每天摸摸 Buddy（每日上限 10 次，每次 +1）、給 Buddy 玩玩具（逗貓棒、小球、梳子、零食都能讓 Buddy 開心）、完成今日陪伴，都能讓 Buddy 心情變好。' },
      { q: '為什麼 Buddy 的狀態會自己下降？', a: 'Buddy 想你了。三個狀態每天會各自慢慢下降一些，記得常回來看看牠。' },
      { q: 'Buddy 什麼時候可以變身？', a: '當 Buddy 三個狀態都達到一定數值，就會觸發變身機會。每隻 Buddy 有自己的變身條件，可在夥伴日誌查看目前進度。6 月小海龜共有 9 個樣子可以遇見。' },
      { q: 'Buddy 體力歸零會怎樣？', a: 'Buddy 會進入睡眠狀態，等你帶禮物回家給牠補充體力就能喚醒。Buddy 不會消失，放心！' },
    ],
  },
  {
    cat: '食物與道具', id: 'items',
    items: [
      { q: '食物和道具有什麼差別？', a: '食物補充體力，每週能帶回家；道具讓 Buddy 心情變好，效果更強但數量有限，用完可在商店補充。' },
      { q: '為什麼食物有「這週」配額？', a: '每種食物每週上限 5 個，週三中午 12:00 重置。週日中午 12:00 起會預告下週 Buddy 想吃什麼，可以提前期待。配額用完後繼續帶東西回家，潔淨仍然正常計算，只是不會再多一個食物格了。補充站消費不會產生食物，食物只在帶東西回家時才有。' },
      { q: '食物有什麼效果？', a: '食物只補充體力，不影響潔淨和心情。每次餵食都是小驚喜，補充多少由 Buddy 當下狀態決定。想提升潔淨可以帶東西回家或去補充站消費；心情要靠玩玩具或摸摸 Buddy 喔。' },
      { q: '道具會過期嗎？', a: '看來源而定。Buddy 的小驚喜（看廣告獲得）24 小時後自動消失，快到期時玩具箱會出現提示；商店購買的玩具永久持有，不會過期；裝扮與音樂盒類道具同樣永久綁定帳號，不會消失。' },
      { q: '道具可以一次用很多個嗎？', a: '每次只能用一個道具，但效果可以累積。依序對 Buddy 使用即可。' },
      { q: '一天可以看幾次廣告領道具？', a: '每天最多 5 次。連續 3 次沒抽到零食，第 4 次會保底給你一個。' },
      { q: '道具背包有容量上限嗎？', a: '目前道具背包沒有容量上限，盡情收集！' },
    ],
  },
  {
    cat: '夥伴日誌', id: 'dex',
    items: [
      { q: '夥伴日誌是什麼？', a: '夥伴日誌記錄 Buddy 每個月的樣子，一年 12 格，代表你們一起走過的每個月份。' },
      { q: '月底要做什麼？', a: '月底前 5 天會出現提醒，從這個月遇到過的 Buddy 樣子裡挑一個收進日誌。結算後 3 天內仍可進去調整，超過時間沒選會由系統自動挑分數最高的填入。' },
      { q: '更換次數怎麼用？', a: '日誌格子鎖入後若想換掉，每次修改消耗 1 次更換次數。月底首次鎖入是免費的，不需要更換次數。次數不足時，鎖入畫面會出現「增加更換次數 →」連結，可進入「更換次數包」購買補充。' },
      { q: '更換次數會過期嗎？', a: '不會，機會永遠有效。' },
      { q: '為什麼有些格子是空的？', a: '空格代表那個月還沒有陪伴記錄。繼續每天帶禮物回家給 Buddy，就能慢慢填滿每一格！' },
    ],
  },
  {
    cat: '點數與商店', id: 'points',
    items: [
      { q: '怎麼取得 ECOCO 點數？', a: '帶禮物回家給 Buddy、在補充站消費，都能獲得 ECOCO 點數。' },
      { q: 'ECOCO 點數會過期嗎？', a: '詳細內容請至 ECOCO 官網常見問題查看。' },
      { q: '商店可以買什麼？', a: '商店分為食物、玩具、裝扮、禮包四個分類。食物只用 ECOCO 點數；玩具與禮包需要 ECOCO 點數和平台付款一起完成。當週食物由帶禮物回家、商店與今日陪伴共用每週數量。' },
      { q: '禮包可以買什麼？', a: '目前禮包頁放更換次數包與狀態盲盒。其他月度型內容等確認後再放入商店。' },
    ],
  },
];

const P8Faq = ({ setScreen }) => {
  const [activeCat, setActiveCat] = useState('buddy');
  const [openIdx, setOpenIdx] = useState(null);

  const currentItems = FAQ_DATA.find(c => c.id === activeCat)?.items ?? [];
  const handleCat = (id) => { setActiveCat(id); setOpenIdx(null); };

  return (
    <div className="screen p8">
      <StatusBar light />
      <NavBack onClick={() => setScreen('p8')} light />
      <div className="screen-scroll" style={{ paddingTop: 0 }}>
        <div className="header"><h2 style={{ marginTop: 8 }}>常見問題</h2></div>

        {/* Category chips */}
        <div style={{ display: 'flex', gap: 8, padding: '16px 18px 16px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {FAQ_DATA.map(cat => {
            const active = activeCat === cat.id;
            return (
              <button key={cat.id} onClick={() => handleCat(cat.id)} style={{
                flexShrink: 0, padding: '7px 14px', borderRadius: 999,
                fontSize: 13, fontWeight: active ? 700 : 500,
                border: active ? 'none' : '1.5px solid #FF5000',
                background: active ? '#FF5000' : '#fff',
                color: active ? '#fff' : '#FF5000',
                cursor: 'pointer', whiteSpace: 'nowrap',
              }}>
                {cat.cat}
              </button>
            );
          })}
        </div>

        {/* Accordion items */}
        <div style={{ padding: '0 18px 80px' }}>
          {currentItems.map((f, i) => {
            const open = openIdx === i;
            return (
              <div key={i} onClick={() => setOpenIdx(open ? null : i)}
                style={{ background: '#fff', borderRadius: 16, marginBottom: 10, overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px' }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#222', flex: 1, paddingRight: 8 }}>{f.q}</div>
                  <div style={{ fontSize: 16, color: '#FF5000', flexShrink: 0, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</div>
                </div>
                {open && (
                  <div style={{ padding: '10px 16px 14px', fontSize: 13, color: '#555', lineHeight: 1.7, borderTop: '1px solid #F4F4F4' }}>
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};



/* ═══════════════ P0 · 一般模式-首頁 ═══════════════ */
const PNormalHome = ({ setScreen }) => (
  <div className="screen p0">
    <img src="assets/p0-normal-home.png" alt="一般模式首頁" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} draggable="false" />
    {/* 透明 hitbox 蓋在「遊戲」按鈕上（Figma: x=187, y=58, w=66, h=26 / 393×852） */}
    <button
      onClick={() => setScreen('p1')}
      style={{
        position: 'absolute',
        top: `${(58 / 852) * 100}%`,
        left: `${(187 / 393) * 100}%`,
        width: `${(66 / 393) * 100}%`,
        height: `${(26 / 852) * 100}%`,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
      }}
      aria-label="切換遊戲模式"
    />
  </div>
);


/* ═══════════════ P4-Orders · 購買紀錄 ═══════════════ */
const STATUS_CONFIG = {
  success: { label: '已完成', cls: 'order-status-success' },
  pending: { label: '處理中', cls: 'order-status-pending' },
  failed:  { label: '失敗',   cls: 'order-status-failed' },
};

const ORDER_FILTER_OPTIONS = [
  { id: 'all',     label: '全部' },
  { id: 'success', label: '已完成' },
  { id: 'pending', label: '處理中' },
  { id: 'failed',  label: '失敗' },
];
const ORDER_FILTER_EMPTY = {
  success: '還沒有完成的購買',
  pending: '目前沒有處理中的訂單',
  failed:  '太好了，沒有失敗的訂單！',
};

const P4Orders = ({ setScreen, state, payload, tweaks }) => {
  const isPhase2 = (tweaks?.shopPhase ?? 1) >= 2;
  const [activeTab, setActiveTab] = useState(payload?.defaultTab ?? 'points');
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const allOrders = state.orderHistory ?? [];
  const orders = activeFilter === 'all' ? allOrders : allOrders.filter(o => o.status === activeFilter);
  const pointsOrders = state.pointsOrderHistory ?? [];

  const getPackageDetail = (orderName) => {
    for (const [, cfg] of Object.entries(SHOP_IAP_CONFIG)) {
      if (orderName.includes(cfg.name)) {
        if (cfg.contents) return { type: 'contents', items: cfg.contents };
        if (cfg.benefits) return { type: 'benefits', items: cfg.benefits };
      }
    }
    return null;
  };

  return (
    <div className="screen" style={{ background: 'var(--bg-cream, #FAE0B8)' }}>
      <StatusBar />
      <NavBack onClick={() => setScreen('p8')} />
      <div style={{ padding: '90px 18px 8px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 900, color: '#222', marginTop: 8 }}>購買紀錄</h2>
      </div>

      {/* 雙 Tab */}
      <div style={{ display: 'flex', borderBottom: '1.5px solid #E8DDD0', margin: '0 18px' }}>
        {[
          { id: 'points', label: <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><img src="assets/icon-ecoco-point.svg" width="14" height="14" alt="" />ECOCO 點數</span> },
            ...(isPhase2 ? [{ id: 'cash', label: '💳 平台付款' }] : []),
        ].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            flex: 1, background: 'none', border: 'none', cursor: 'pointer',
            padding: '10px 0', fontSize: 14, fontWeight: activeTab === t.id ? 800 : 500,
            color: activeTab === t.id ? 'var(--ecoco-orange, #FF5000)' : '#444',
            borderBottom: activeTab === t.id ? '2.5px solid var(--ecoco-orange, #FF5000)' : '2.5px solid transparent',
            marginBottom: -1.5, transition: 'all .15s',
          }}>{t.label}</button>
        ))}
      </div>

      {activeTab === 'points' ? (
        <div className="screen-scroll" style={{ paddingTop: 12 }}>
          {pointsOrders.length === 0 ? (
            <div className="order-empty">
              <img src="assets/icon-ecoco-point.svg" width="56" height="56" alt="" />
              <div>還沒有點數消費紀錄</div>
            </div>
          ) : (
            <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {pointsOrders.map((order) => (
                <div key={order.id} className="order-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div className="order-thumb"><Glyph value={order.thumb ?? '🛍️'} /></div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 800, fontSize: 15, color: '#222', marginBottom: 4 }}>{order.name}</div>
                      <div style={{ fontSize: 12, color: '#aaa' }}>{order.date}</div>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: 16, color: 'var(--ecoco-orange, #FF5000)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 3 }}>
                      <img src="assets/icon-ecoco-point.svg" width="15" height="15" alt="" />{order.pointsCost}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          {/* 篩選 Chip 列 */}
          <div style={{ display: 'flex', gap: 8, padding: '8px 18px 12px', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {ORDER_FILTER_OPTIONS.map(f => (
              <button key={f.id} onClick={() => setActiveFilter(f.id)} className={`order-filter-chip${activeFilter === f.id ? ' active' : ''}`}>
                {f.label}
              </button>
            ))}
          </div>

          <div className="screen-scroll" style={{ paddingTop: 0 }}>
            {orders.length === 0 ? (
              <div className="order-empty">
                <div style={{ fontSize: 56 }}>🧾</div>
                <div>{activeFilter === 'all' ? '還沒有購買紀錄' : ORDER_FILTER_EMPTY[activeFilter]}</div>
              </div>
            ) : (
              <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {orders.map((order) => {
                  const sc = STATUS_CONFIG[order.status] || STATUS_CONFIG.success;
                  const isFailed = order.status === 'failed';
                  const pkgDetail = getPackageDetail(order.name);
                  const isExpanded = expandedOrderId === order.id;
                  return (
                    <div key={order.id} className={`order-card${isFailed ? ' order-card-failed' : ''}`}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                        <div className="order-thumb"><Glyph value={order.thumb ?? '🛍️'} /></div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 800, fontSize: 15, color: '#222', marginBottom: 2 }}>{order.name}</div>
                          <span className={sc.cls}>{sc.label}</span>
                        </div>
                        {pkgDetail && (
                          <button onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#888', padding: '0 4px', lineHeight: 1 }}>
                            {isExpanded ? '˅' : '›'}
                          </button>
                        )}
                      </div>

                      <div style={{ fontSize: 12, color: '#888', display: 'flex', flexDirection: 'column', gap: 4, borderTop: '1px solid #F0EDE8', paddingTop: 10 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>訂單編號</span>
                          <span style={{ fontFamily: 'var(--font-en)', fontWeight: 600, color: '#555' }}>{order.id}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>金額</span>
                          <span style={{ fontWeight: 700, color: '#060E9F' }}>NT$ {order.price}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>付款方式</span>
                          <span style={{ fontWeight: 600, color: '#555' }}>💳 {order.payMethod ?? '—'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>購買日期</span>
                          <span style={{ color: '#555' }}>{order.date}</span>
                        </div>
                      </div>

                      {pkgDetail && isExpanded && (
                        <div className="order-detail-panel">
                          {pkgDetail.items.map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                              <Glyph value={item.emoji} alt={item.name} />
                              <div>
                                <div style={{ fontWeight: 700, color: '#333' }}>{item.name}</div>
                                {item.sub && <div style={{ color: '#888' }}>{item.sub}</div>}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {isFailed && (
                        <div className="order-fail-reason">
                          {order.failReason || '付款未成功，請確認卡片資訊或聯繫您的銀行'}
                        </div>
                      )}

                      {isFailed && (
                        <div className="order-failed-actions">
                          <button className="order-action-ghost" onClick={() => window.open('https://ecocogroup.zendesk.com/hc/zh-tw/requests/new?ticket_form_id=41244248648473', '_blank', 'noreferrer')}>聯繫客服</button>
                          <button className="order-action-primary" onClick={() => setScreen('p4')}>重新購買</button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            <div style={{ paddingBottom: 40 }} />
          </div>
        </>
      )}
    </div>
  );
};

/* ───── Export ───── */
Object.assign(window, {
  P1Home, P2Scan, P2bResult,
  P4Shop, P5Missions, P6Ads, P7Dex,
  P4Orders,
  P8Profile, P8Faq,
  P9Bag,
  P10Picker, P11Pack, P11PurchaseModal, P11SuccessModal,
  PNormalHome,
  ShopPurchaseModal, ShopSuccessModal,
});
