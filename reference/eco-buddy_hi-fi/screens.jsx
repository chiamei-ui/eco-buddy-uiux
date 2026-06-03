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
    title: '帶食物回家 📦',         text: '投瓶後對準機台螢幕條碼，就有機會換到食物哦！' },
  { refKey: 'adsBtnRef',     pad: 8,  radius: 24, textRight: true,
    title: '免費道具 🎁',           text: '看廣告領道具，每天最多 5 次' },
  { refKey: 'dockTabsRef',   pad: 6,  radius: 16,
    title: '食物欄、玩具箱、換衣間', text: '切換查看食物、道具和裝扮，拖到夥伴身上使用' },
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
  const [dockTab, setDockTab] = useState('food'); // food | tools | wardrobe
  const [touched, setTouched] = useState(false);
  const [eating, setEating] = useState(false);
  const [bubble, setBubble] = useState(null); // {text, error}
  const [showEvolve, setShowEvolve] = useState(false);
  const [p6SheetOpen, setP6SheetOpen] = useState(false);
  const [dockInfoOpen, setDockInfoOpen] = useState(false);
  const [ambientVisible, setAmbientVisible] = useState(true);
  const [ambientDismissing, setAmbientDismissing] = useState(false);
  const [pulsingIds, setPulsingIds] = useState(new Set());
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
    }
  };
  const handleTutorialSkip = () => {
    setTutorialStep(-1);
    if (onTutorialDone) onTutorialDone();
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
      addRise('+1 心情', pos, '#FFB000');
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
      addRise('+5 體力', pos);
      showBubble({ text: '好好吃！謝謝你～', error: false });
      setTimeout(() => {
        setEating(false);
        if (tweaks.p1Evolve) setShowEvolve(true);
      }, 1500);
    } else if (payload.kind === 'tool') {
      const tool = payload.id;
      // tool max-stat guards
      if (tool === 'brush' && state.stats.clean >= 100) {
        showBubble({ text: DIALOGUES.err.cleanMax, error: true });
        return;
      }
      if ((tool === 'feather' || tool === 'ball') && state.stats.mood >= 100) {
        showBubble({ text: DIALOGUES.err.moodMax, error: true });
        return;
      }
      // drop tool item → use animation；雙效果道具序列浮起兩個 rise
      setEating(true);
      dispatch({ type: 'USE_TOOL', tool });
      const gainSeq = {
        feather: [{ txt: '+15 心情', color: '#FFB000' }],
        brush:   [{ txt: '+15 潔淨', color: '#1F3DBF' }, { txt: '+10 心情', color: '#FFB000' }],
        ball:    [{ txt: '+15 心情', color: '#FFB000' }],
        snack:   [{ txt: '+15 體力', color: '#FF4D63' }, { txt: '+15 心情', color: '#FFB000' }],
      }[tool] || [{ txt: '+5', color: '#FFB000' }];
      gainSeq.forEach((g, i) => setTimeout(() => addRise(g.txt, pos, g.color), i * 250));
      showBubble({ text: '好玩好玩！', error: false });
      setTimeout(() => setEating(false), 1500);
    } else if (payload.kind === 'locked') {
      showBubble({ text: DIALOGUES.err.foodLocked, error: true });
    } else if (payload.kind === 'wrong') {
      showBubble({ text: '這不是吃的喔！', error: true });
    }
  };

  const addRise = (txt, pos, color) => {
    const id = Math.random();
    setValueRises((prev) => [...prev, { id, txt, top: pos?.y || 280, left: pos?.x || 180, color }]);
    setTimeout(() => setValueRises((prev) => prev.filter((v) => v.id !== id)), 1400);
  };

  const wardrobeIsPhase2 = (tweaks?.shopPhase ?? 1) >= 2;
  const wardrobeOwnedItems = COSMETIC_CATALOG.filter(c => (state.ownedCosmetics || []).includes(c.id));
  const wardrobeHasItems = wardrobeIsPhase2 && wardrobeOwnedItems.length > 0;

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
          <div key={v.id} className="value-rise" style={{ top: v.top, left: v.left, color: v.color || '#FF4D63' }}>{v.txt}</div>
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
          <button className={`dock-tab ${dockTab === 'food' ? 'active' : ''}`} onClick={() => setDockTab('food')}>食物欄</button>
          <button className={`dock-tab ${dockTab === 'tools' ? 'active' : ''}`} onClick={() => setDockTab('tools')}>玩具箱</button>
          <button className={`dock-tab ${dockTab === 'wardrobe' ? 'active' : ''}`} onClick={() => setDockTab('wardrobe')}>換衣間</button>
        </div>
        <div className="dock" style={dockTab === 'wardrobe' && wardrobeHasItems ? { overflowY: 'auto' } : {}}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
            {dockTab !== 'wardrobe' && (
              <button onClick={() => setDockInfoOpen(true)} style={{ display:'flex', alignItems:'center', gap:4, background:'none', border:'none', padding:0, cursor:'pointer' }}>
                <img src="assets/btn/icon-_info.svg" alt="" width="17" height="17" draggable="false" style={{ display:'block' }} />
                <span style={{ fontSize:11, fontWeight:700, color:'var(--ecoco-blue)', lineHeight:1 }}>效果說明</span>
              </button>
            )}
            {dockTab === 'tools' && (
              <button onClick={() => setScreen('p9')} style={{ fontSize:11, fontWeight:700, color:'var(--ecoco-blue)', background:'none', border:'none', cursor:'pointer', padding:0 }}>管理 ›</button>
            )}
            {dockTab === 'wardrobe' && (tweaks?.shopPhase ?? 1) >= 2 && (
              <button onClick={() => setScreen('wardrobe-manage')} style={{ fontSize:11, fontWeight:700, color:'var(--ecoco-blue)', background:'none', border:'none', cursor:'pointer', padding:0 }}>管理 ›</button>
            )}
          </div>
        {dockTab === 'food' ? <>
          <div className="dock-grid">
            {state.food.map((f, i) => <FoodCell key={f.id} food={f} dragManager={dragManager} onDrop={onDrop} index={i} showBubble={showBubble} pulsing={pulsingIds.has(f.id)} />
            )}
          </div>
        </> : dockTab === 'tools' ? <>
          <div className="dock-grid">
            {state.tools.length ? state.tools.map((t, i) =>
            <ToolCell key={t.id} tool={t} dragManager={dragManager} onDrop={onDrop} showBubble={showBubble} />
            ) :
            <div style={{ gridColumn: '1/-1', padding: '18px', textAlign: 'center', color: '#888', fontSize: 13 }}>
                還沒有道具～<br />
                <button onClick={() => setP6SheetOpen(true)} style={{ marginTop: 8, background: 'var(--ecoco-orange)', color: '#fff', padding: '8px 18px', borderRadius: 999, fontWeight: 700, fontSize: 12 }}>看廣告領取</button>
              </div>
            }
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
              <button onClick={() => setScreen('p4')} style={{ background: 'var(--ecoco-orange)', color: '#fff', border: 'none', borderRadius: 999, padding: '10px 24px', fontWeight: 800, fontSize: 13, cursor: 'pointer' }}>去商店</button>
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
              <div style={{ fontSize:17, fontWeight:900, marginBottom:10 }}>食物欄說明</div>
              <div style={{ fontSize:13, color:'#444', lineHeight:1.7, marginBottom:12 }}>
                <div>• 拖曳食物到 Buddy 身上即可餵食</div>
                <div>• 每份食物讓 Buddy 體力 +5</div>
                <div>• 每週配額 5 個，每格顯示剩餘庫存</div>
                <div>• 數量 ≤ 2 時卡片變淡，提醒快用完</div>
              </div>
              <div style={{ background:'#FFF3E0', borderRadius:12, padding:'10px 14px', fontSize:12, color:'#7A4800' }}>
                💡 帶食物回家（投瓶機）每週可補充配額
              </div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize:17, fontWeight:900, marginBottom:10 }}>玩具箱說明</div>
              <div style={{ fontSize:13, color:'#444', lineHeight:1.7, marginBottom:12 }}>
                <div>• 拖曳道具到 Buddy 身上即可使用</div>
                <div>• 免費道具（看廣告領取）有效期 24h</div>
                <div>• 購買道具有效期 7 日</div>
                <div>• ⏰ 代表剩餘 ≤ 24h，記得今天用掉</div>
                <div>• 過期道具無法使用，24h 後自動移除</div>
              </div>
              <div style={{ background:'#FFF3E0', borderRadius:12, padding:'10px 14px', fontSize:12, color:'#7A4800' }}>
                💡 點擊「管理 ›」可進入完整道具背包
              </div>
            </div>
          )}
        </ItemInfoSheet>
      )}
      {p6SheetOpen && (
        <div className="sheet-backdrop" onClick={() => setP6SheetOpen(false)}>
          <div className="sheet-panel" onClick={e => e.stopPropagation()}>
            <div className="sheet-grip" />
            <h3 style={{ fontSize: 18, fontWeight: 900, textAlign: 'center', marginBottom: 6 }}>免費道具</h3>
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

const toolEffectMap = {
  feather: { label: '心情 +15' },
  brush:   { label: '潔淨 +15・心情 +10' },
  ball:    { label: '心情 +15' },
  snack:   { label: '體力 +15・心情 +15' },
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
    if (food.state === 'locked') {
      showBubble({ text: DIALOGUES.err.foodLocked, error: true });
      return;
    }
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
  const cls = food.state === 'locked' ? 'locked' : food.stock <= 2 ? 'low' : 'has-stock';
  return (
    <div className="food-slot">
      <div ref={cellRef} className={`food-cell ${cls}${pulsing ? ' pulsing' : ''}`} onPointerDown={handlePointerDown}>
        {food.state === 'locked'
          ? <span className="lock">🔒</span>
          : <>
              <span className="emoji">{food.emoji}</span>
              {food.stock > 0 && <span className="badge">{food.stock}</span>}
            </>
        }
      </div>
      {food.state !== 'locked' && (
        <div className="food-label">
          <span className="name">{food.name}</span>
        </div>
      )}
    </div>);
};

const ToolCell = ({ tool, dragManager, onDrop, showBubble }) => {
  const expired = tool.hoursLeft != null && tool.hoursLeft <= 0;
  const warn    = !expired && tool.hoursLeft != null && tool.hoursLeft <= 24;

  const handlePointerDown = (e) => {
    if (expired) {
      showBubble?.({ text: '嗚… 這個不見了 😔' });
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
      showBubble?.({ text: warn ? '這個快消失了！今天要用掉喔 ⏰' : '拖到我身上，記得今天就用掉喔！' });
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  return (
    <div className="food-slot">
      <div
        className="food-cell has-stock"
        onPointerDown={handlePointerDown}
        style={{ position:'relative', opacity: expired ? 0.4 : 1, cursor: expired ? 'default' : 'grab' }}
      >
        <span className="emoji">{tool.emoji}</span>
        {tool.count > 1 && <span className="badge">{tool.count}</span>}
        {expired && (
          <span style={{ position:'absolute', top:3, right:4, fontSize:13, lineHeight:1, color:'#666', pointerEvents:'none', fontWeight:700 }}>✕</span>
        )}
        {!expired && tool.hoursLeft != null && (
          <span style={{
            position:'absolute', bottom:4, right:4,
            background: warn ? '#FF5000' : 'rgba(0,0,0,0.32)',
            color:'#fff', fontSize:9, fontWeight:800, lineHeight:1,
            padding:'2px 5px', borderRadius:6, letterSpacing:'0.02em', pointerEvents:'none',
          }}>{tool.hoursLeft}h</span>
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

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'), 450);
    const t2 = setTimeout(() => setPhase('hold'), 950);
    const t3 = setTimeout(onDone, 3200);
    return () => [t1, t2, t3].forEach(clearTimeout);
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
          <SpeechBubble text="我有新的樣子了！✨" style={{ top: -68, right: -54 }} />
        )}
      </div>
      <div className="evolve-text" style={{ opacity: phase === 'flash' ? 0 : 1 }}>
        <div className="evolve-headline">Buddy 變身了！</div>
        <div className="evolve-form">{newFormName}</div>
      </div>
    </div>
  );
};

/* ═══════════════ P2b · 回收結果頁（滿版·對齊 P12）═══════════════ */
const P2bResult = ({ setScreen, dispatch, tweaks = {}, setTweak = () => {} }) => {
  const quotaFull = tweaks.p2bQuotaFull || false;
  const willEvolve = tweaks.p2bEvolve || false;
  const [showInfo, setShowInfo] = useState(false);
  const [showEvolve, setShowEvolve] = useState(false);
  const evolveNavRef = React.useRef(null);

  // mock 本批投瓶組成 — PET 12 個 / 電池 3 顆 / 退瓶 0
  // 體力：PET 12*2 + 電池 3*5 = 39；潔淨：投入 12*2 - 退瓶 0*1 = 24（電池機不給潔淨）
  const HP_GAIN = 39;
  const CLEAN_GAIN = 24;
  const POINTS_GAIN = 18;

  const navigate = (navFn) => {
    if (willEvolve) {
      evolveNavRef.current = navFn;
      setShowEvolve(true);
    } else {
      navFn();
    }
  };

  const handleStore = () => {
    dispatch({ type: 'COLLECT_BATCH', quotaFull: false, hpGain: HP_GAIN, cleanGain: CLEAN_GAIN, pointsGain: POINTS_GAIN });
    navigate(() => setScreen('p1', { foodStored: true }));
  };

  const handleComplete = () => {
    dispatch({ type: 'COLLECT_BATCH', quotaFull: true, hpGain: HP_GAIN, cleanGain: CLEAN_GAIN, pointsGain: POINTS_GAIN });
    navigate(() => setScreen('p1'));
  };

  return (
    <div className="screen p2b">
      {showEvolve && (
        <EvolveOverlay onDone={() => { setShowEvolve(false); evolveNavRef.current?.(); }} />
      )}
      <StatusBar />
      {showInfo && (
        <div
          onClick={() => setShowInfo(false)}
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: '#fff', borderRadius: 20, padding: '24px 22px', width: '78%', maxWidth: 300 }}
          >
            <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 12, color: '#1a1a1a' }}>換算說明</div>
            <div style={{ fontSize: 13, lineHeight: 1.85, color: '#555' }}>
              <div style={{ fontWeight: 700, color: '#1a1a1a', marginBottom: 2 }}>體力（收瓶機）</div>
              <div>PP 杯子 → 體力 +1 / 個</div>
              <div>PET 寶特瓶 / 鋁罐 / HDPE 牛奶瓶 → 體力 +2 / 個</div>
              <div style={{ marginBottom: 6 }}>退瓶不計入體力</div>
              <div style={{ fontWeight: 700, color: '#1a1a1a', marginBottom: 2 }}>體力（電池機）</div>
              <div>1 號 / 2 號 / 9V 乾電池 → 體力 +10 / 顆</div>
              <div style={{ marginBottom: 6 }}>3–6 號乾電池 → 體力 +5 / 顆</div>
              <div style={{ fontWeight: 700, color: '#1a1a1a', marginBottom: 2 }}>潔淨（收瓶機）</div>
              <div>投入 → 潔淨 +2 / 個</div>
              <div>退瓶 → 潔淨 -1 / 個</div>
              <div style={{ marginBottom: 6 }}>電池機不影響潔淨</div>
              <div style={{ fontSize: 11, color: '#888', marginTop: 4, lineHeight: 1.5 }}>
                註：體力 / 潔淨 / ECOCO 點數為三條獨立帳本，由同一次投瓶分別計算。
              </div>
            </div>
            <button
              onClick={() => setShowInfo(false)}
              style={{ marginTop: 18, width: '100%', padding: '10px 0', borderRadius: 99, background: '#FF5000', color: '#fff', border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
            >知道了</button>
          </div>
        </div>
      )}
      <div className="sheet-grip" style={{marginTop:14}} />
      <div className="hero" style={{ position: 'relative' }}>
        <button
          onClick={() => setShowInfo(true)}
          style={{ position: 'absolute', top: 10, right: 12, width: 22, height: 22, borderRadius: '50%', border: 'none', background: 'rgba(0,0,0,0.08)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, color: '#888', fontSize: 13, fontWeight: 700, fontFamily: 'serif', lineHeight: 1 }}
        >i</button>
        <div className="eyebrow">BUDDY GIFT · 給 Buddy 的禮物</div>
        <h2>Buddy 收到你的心意了</h2>
        <div className="meta">
          <span className="dot"></span>
          2026.06.15 14:32 · 家樂福 仁德店
        </div>
        <div className="recycle-stats">
          <div><b>12</b><span>投入瓶罐</span></div>
          <div><b>3</b><span>投電池數</span></div>
          <div><b>0</b><span>退瓶數</span></div>
          <div><b>+{POINTS_GAIN}</b><span>ECOCO 點數</span></div>
        </div>
      </div>

      <div className="result-body">
        <div className="section-title">你帶回了這些</div>
        <div className="gain-row">
          <div className={`gain-card gain-card--food${quotaFull ? ' gain-card--locked' : ''}`}>
            {quotaFull
              ? <><div className="gc-emoji">🔒</div><div className="gc-label">本週食物</div><div className="gc-val gc-val--muted">已領完</div></>
              : <><div className="gc-emoji">🌭</div><div className="gc-label">熱狗堡</div><div className="gc-val">×5</div></>}
          </div>
          <div className="gain-card gain-card--hp">
            <div className="gc-emoji">❤</div>
            <div className="gc-label">Buddy 體力</div>
            <div className="gc-val">+{HP_GAIN}</div>
          </div>
          <div className="gain-card gain-card--clean">
            <div className="gc-emoji">✨</div>
            <div className="gc-label">Buddy 潔淨</div>
            <div className="gc-val">+{CLEAN_GAIN}</div>
          </div>
        </div>
        <div className="next-week-preview">
          <div className="nwp-badge">下週預告</div>
          <div className="nwp-body">
            <div className="nwp-title">🥦 花椰菜</div>
            <div className="nwp-hp">每份讓 Buddy +8 體力</div>
          </div>
          <div className="nwp-time">
            <div className="nwp-time-label">開搶時間</div>
            <div className="nwp-time-val">週三 12:00</div>
          </div>
        </div>
      </div>

      <div className="footer">
        {quotaFull ? (
          <button className="btn-primary" onClick={handleComplete}>完成</button>
        ) : (
          <button className="btn-primary" onClick={handleStore}>先放食物欄</button>
        )}
      </div>
    </div>);

};

/* P3 餵食動畫頁已依 #22（2026-05-29）廢除：餵食改在 P1 原地播放。
   殘留路由與側欄入口同步移除。 */

/* ----- P4 IAP Config (模擬後台 CMS/API 設定，前端不寫死任何商品內容) ----- */
const SHOP_IAP_CONFIG = {
  sprintPack: {
    id: 'sprint-pack', emoji: '🎁', name: '月底衝刺禮包', price: 199, currency: 'cash', cashChannel: 'newebpay',
    desc: '幫 Buddy 在月底衝到最佳狀態，選出最美的夥伴日誌',
    activeWindow: '每月 22–28 日',
    contents: [
      { emoji: '🍔', name: '月份限定食物 ×10', sub: '不佔週配額，直接存入食物欄' },
      { emoji: '🪮', name: '精華梳 ×3', sub: '潔淨 +30 · 心情 +20' },
      { emoji: '🍪', name: '豪華零食 ×3', sub: '體力 +30 · 心情 +25' },
      { emoji: '🎀', name: '月份限定裝扮 ×1', sub: '永久穿戴，當月主題' },
      { emoji: '🎬', name: '廣告道具加速', sub: '本月剩餘天數：每日上限 5→8 次' },
    ],
  },
  monthlyPass: {
    id: 'monthly-pass', emoji: '🎫', name: '月度通行證', price: 149, currency: 'cash', cashChannel: 'platform-iap',
    desc: '整個月都是你和 Buddy 的專屬時光，每天都有小驚喜',
    validDays: 30,
    benefits: [
      { emoji: '📅', name: '每日通行禮', sub: '登入領月份限定食物 ×1（不佔週配額）' },
      { emoji: '🎬', name: '廣告道具加碼', sub: '每日上限 5→8 次' },
      { emoji: '🍔', name: '週配額加量', sub: '每種食物每週 5→8 個' },
      { emoji: '🏅', name: '通行者稱號', sub: 'P8 個人頁金邊框 + 通行者稱號' },
      { emoji: '📖', name: '夥伴日誌禮遇', sub: '月底可選 2 個狀態收入日誌' },
    ],
  },
};

/* ----- P4 helper: SprintHeroBanner (月底衝刺禮包) ----- */
const SprintHeroBanner = ({ purchased, daysLeft = 6, onClick }) => (
  <div className={`p4-sprint-hero${purchased ? ' purchased' : ''}`} onClick={!purchased ? onClick : undefined}>
    <div className="sprint-icon">🎁</div>
    <div className="sprint-body">
      <div className="sprint-tag">限時優惠 · 22–28 日</div>
      <h3>月底衝刺禮包</h3>
      <div className="sprint-brief">食物 ×10 ・ 稀有道具 ×6 ・ 月份限定裝扮</div>
      <div className="sprint-price">NT$ 199</div>
    </div>
    <div className="sprint-cd">
      {purchased
        ? <><b>✓</b><span>本月已領</span></>
        : <><b>{daysLeft}</b><span>天後結束</span></>
      }
    </div>
  </div>
);

/* ----- P4 helper: MonthlyPassCard (月度通行證) ----- */
const MonthlyPassCard = ({ hasPass, validUntil = '6/30', onClick }) => (
  <div className={`p4-pass-row${hasPass ? ' active' : ''}`} onClick={!hasPass ? onClick : undefined}>
    <div className="pass-icon">🎫</div>
    <div className="pass-body">
      <h4>月度通行證</h4>
      <div className="pass-desc">
        {hasPass ? `啟用中 · 有效至 ${validUntil}` : '每日通行禮 ・ 廣告加碼 ・ 通行者稱號'}
      </div>
    </div>
    {hasPass
      ? <span className="pass-active-badge">啟用中</span>
      : <div className="pass-price">NT$ 149</div>
    }
  </div>
);

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
            <div className="d-icon">{item.emoji}</div>
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
            <div className="price-tag">NT$ {item.price}</div>
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
  const isSprint = item.id === 'sprint-pack';
  const rows = isSprint ? (item.contents || []) : (item.benefits || []);
  const sectionTitle = isSprint ? '禮包內容' : '通行福利';
  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet-panel scrollable product-detail-inner" onClick={e => e.stopPropagation()}>
        <div className="sheet-grip" />
        <div className="product-detail-head">
          <div className="d-icon">{item.emoji}</div>
          <div>
            <h3>{item.name}</h3>
            <div className="d-sub">{item.desc}</div>
          </div>
        </div>
        <div className="product-detail-section">
          <div className="product-detail-section-title">{sectionTitle}</div>
          {rows.map((row, i) => (
            <div key={i} className="detail-item-row">
              <div className="di-icon">{row.emoji}</div>
              <div className="di-body">
                <div className="di-name">{row.name}</div>
                <div className="di-sub">{row.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="product-detail-footer">
          <div className="price-tag">NT$ {item.price}</div>
          <button className="buy-cta" onClick={() => onBuy(item)}>確認購買</button>
        </div>
      </div>
    </div>
  );
};

/* ───── Cosmetic catalogue (shared by P4Shop + P1Home wardrobe tab) ───── */
const COSMETIC_CATALOG = [
  { id: 'star-hat',     emoji: '⭐', name: '星辰帽',     desc: '限定裝扮 · 閃閃發光',       price: 299 },
  { id: 'crystal-bow',  emoji: '🎀', name: '水晶蝴蝶結', desc: '限定裝扮 · 精緻優雅',       price: 249 },
  { id: 'rainbow-halo', emoji: '🌈', name: '彩虹光暈',   desc: 'Phase 1 預覽款 · 閃耀登場', price: 199 },
];

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
const P4Shop = ({ setScreen, state, dispatch, tweaks }) => {
  const [tab, setTab] = useState('food');
  const [purchasing, setPurchasing] = useState(null);
  const [successItem, setSuccessItem] = useState(null);
  const [showPointSrc, setShowPointSrc] = useState(false);
  const [detailItem, setDetailItem] = useState(null);
  const [cosmeticDetail, setCosmeticDetail] = useState(null);
  const isSprintPeriod = tweaks?.shopSprint ?? false;
  const isPhase2 = (tweaks?.shopPhase ?? 1) >= 2;

  const cats = [
  { id: 'food', label: '食物' },
  { id: 'tool', label: '玩具' },
  { id: 'cosmetic', label: '裝扮' },
  { id: 'music', label: '氣氛' },
  { id: 'package', label: '禮包' }];

  const items = {
    food: [
    { id: 'hotdog-pack', emoji: '🌭', name: '熱狗堡 ×5', desc: '+5 體力/個', price: 50, ribbon: '熱賣', currency: 'heart' },
    { id: 'salad', emoji: '🥬', name: '蔬菜 ×5', desc: '+5 體力/個', price: 60, currency: 'heart' },
    { id: 'berry', emoji: '🍓', name: '莓果 ×3', desc: '+5 體力/個', price: 80, soldOut: true, currency: 'heart' },
    { id: 'fish', emoji: '🐟', name: '小魚 ×5', desc: '+5 體力/個', price: 90, currency: 'heart' },
    ],

    package: [
    { ...SHOP_IAP_CONFIG.monthlyPass, price: tweaks?.passPrice ?? SHOP_IAP_CONFIG.monthlyPass.price },
    ...((!isPhase2 || isSprintPeriod) ? [{ ...SHOP_IAP_CONFIG.sprintPack, price: tweaks?.sprintPrice ?? SHOP_IAP_CONFIG.sprintPack.price, daysLeft: tweaks?.sprintDaysLeft ?? 6 }] : []),
    ],

    tool: [
    { id: 'feather', emoji: '🪶', name: '逗貓棒', desc: '心情 +15', price: 30, currency: 'heart' },
    { id: 'brush', emoji: '🪮', name: '梳子', desc: '潔淨 +15、心情 +10', price: 35, currency: 'heart' },
    { id: 'ball', emoji: '⚾', name: '小球', desc: '心情 +15', price: 25, currency: 'heart' },
    { id: 'snack', emoji: '🍪', name: '零食', desc: '體力 +15、心情 +15', price: 20, currency: 'heart' }],

    cosmetic: COSMETIC_CATALOG.map(c => ({ ...c, currency: 'cash', cashChannel: 'platform-iap' })),

    music: []

  };
  const visibleCats = cats.filter(c => (items[c.id] || []).length > 0);

  return (
    <div className="screen p4">
      <StatusBar />
      <div className="p4-sticky-top">
        <div className="header">
          <h2>商店</h2>
          <button className="points-pill tappable" onClick={() => setShowPointSrc(true)} aria-label="ECOCO 點數來源">
            <img src="assets/icon-ecoco-point.svg" alt="" width="18" height="18" />
            <span>{state.points.toLocaleString()}</span>
          </button>
        </div>
        <div className="tabs">
          {visibleCats.map((c) =>
          <button key={c.id} className={`tab-chip ${tab === c.id ? 'active' : ''}`} onClick={() => setTab(c.id)}>
              {c.label}
              {c.id === 'package' && isSprintPeriod && isPhase2 && (
                <span className="tab-chip-badge">{tweaks?.sprintDaysLeft ?? 6}天</span>
              )}
            </button>
          )}
        </div>
      </div>

{/* Coming Soon bar — 禮包 / 裝扮 Phase 1 時顯示 */}
      {!isPhase2 && (tab === 'package' || tab === 'cosmetic') && (
        <div style={{
          margin: '0 18px 12px',
          background: '#FFF3E0',
          borderRadius: 12,
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <span style={{ fontSize: 18 }}>🔔</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#7A4800' }}>
            付費道具即將推出，敬請期待
          </span>
        </div>
      )}

{/* 禮包分頁 — 2-column grid */}
      {(() => {
        if (tab !== 'package') return null;
        const pkgItems = items['package'] || [];
        if (!pkgItems.length) return null;
        return (
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#888', letterSpacing: '.04em', padding: '10px 18px 4px' }}>現金商品</div>
            <div className="shop-grid">
              {pkgItems.map(it => {
                const hasDetail = !!(it.contents || it.benefits);
                const isBought = (it.id === 'sprint-pack' && state.sprintPurchased) ||
                                  (it.id === 'monthly-pass' && state.hasPass);
                const canBuy = isPhase2 && !isBought;
                return (
                  <div key={it.id} className={`shop-card${isBought ? ' purchased' : ''}`}
                    onClick={canBuy ? () => hasDetail ? setDetailItem(it) : setPurchasing(it) : undefined}
                    style={{ cursor: canBuy ? 'pointer' : 'default' }}>
                    <div className="thumb">{it.emoji}</div>
                    <h4>{it.name}</h4>
                    <div className="desc">{it.desc}</div>
                    <div className="price">
                      {isBought ? (
                        <span style={{ fontWeight: 800, color: '#22A55C', fontSize: 12 }}>
                          {it.id === 'monthly-pass' ? '✓ 啟用中' : '✓ 本月已領'}
                        </span>
                      ) : (
                        <>
                          <b style={{ fontFamily: 'var(--font-en)', fontWeight: 900, color: '#060E9F', fontSize: 15 }}>NT$ {it.price}</b>

                          <button className="buy-btn" disabled={!isPhase2}
                            onClick={(e) => { e.stopPropagation(); if (isPhase2) { hasDetail ? setDetailItem(it) : setPurchasing(it); } }}
                            style={!isPhase2 ? { opacity: 0.45, cursor: 'default' } : {}}>
                            {!isPhase2 ? '即將開放' : hasDetail ? '查看' : '購買'}
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

{/* 裝扮分頁 — 2-column grid，Phase 1 disabled CTA */}
      {(() => {
        if (tab !== 'cosmetic') return null;
        const cosItems = items['cosmetic'] || [];
        return (
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#888', letterSpacing: '.04em', padding: '10px 18px 4px' }}>
              {isPhase2 ? '限定裝扮' : '即將上架'}
            </div>
            <div className="shop-grid">
              {cosItems.map(it => {
                const isBought = state.ownedCosmetics?.includes(it.id);
                return (
                  <div key={it.id} className={`shop-card${isBought ? ' purchased' : ''}`}
                    onClick={() => setCosmeticDetail(it)}
                    style={{ cursor: 'pointer' }}>
                    <div className="thumb">{it.emoji}</div>
                    <h4>{it.name}</h4>
                    <div className="desc">{it.desc}</div>
                    <div className="price">
                      {isBought ? (
                        <span style={{ fontWeight: 800, color: '#22A55C', fontSize: 12 }}>✓ 已擁有</span>
                      ) : (
                        <>
                          <b style={{ fontFamily: 'var(--font-en)', fontWeight: 900, color: '#060E9F', fontSize: 15 }}>NT$ {it.price}</b>
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

{/* 現金商品 — 橫向滑動卡片 strip（禮包 / 裝扮 tab 有專屬 section，不使用） */}
      {(() => {
        const cashItems = (items[tab] || []).filter(it => it.currency === 'cash');
        if (!cashItems.length || tab === 'package' || tab === 'cosmetic') return null;
        return (
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#888', letterSpacing: '.04em', padding: '10px 18px 4px' }}>現金商品</div>
            <div className="cash-strip">
              {cashItems.map(it => {
                const hasDetail = !!(it.contents || it.benefits);
                const isBought = (it.id === 'sprint-pack' && state.sprintPurchased) ||
                                  (it.id === 'monthly-pass' && state.hasPass);
                return (
                  <div key={it.id}
                    className={`cash-card${isBought ? ' purchased' : ''}`}
                    onClick={isBought ? undefined : () => hasDetail ? setDetailItem(it) : setPurchasing(it)}
                    style={isBought ? { cursor: 'default' } : {}}>
                    <div className="cash-thumb">{it.emoji}</div>
                    <div className="cash-info">
                      <h4>{it.name}</h4>
                      <div className="desc">{it.desc}</div>
                      {isBought ? (
                        <div style={{ fontWeight: 800, color: '#22A55C', fontSize: 12, marginTop: 6 }}>
                          {it.id === 'monthly-pass' ? '✓ 啟用中' : '✓ 本月已領'}
                        </div>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
                          <span style={{ fontWeight: 800, color: '#060E9F', fontSize: 13, fontFamily: 'var(--font-en)' }}>NT$ {it.price}</span>
                          {hasDetail && <span style={{ fontSize: 10, color: '#888' }}>查看 ›</span>}
                        </div>
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
        const heartItems = (items[tab] || []).filter(it => (it.currency || 'heart') === 'heart');
        if (!heartItems.length) return null;
        return (
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#888', letterSpacing: '.04em', padding: '10px 18px 4px' }}>點數商品</div>
            <div className="shop-grid">
              {heartItems.map(it => (
                <div key={it.id} className={`shop-card ${it.soldOut ? 'sold-out' : ''}`}>
                  <div className="thumb">{it.emoji}</div>
                  <h4>{it.name}</h4>
                  <div className="desc">{it.desc}</div>
                  <div className="price">
                    <b style={{ fontWeight: 600, color: '#FF5000' }}>
                      <img src="assets/icon-ecoco-point.svg" alt="" width="14" height="14" />{it.price}
                    </b>
                    <button className="buy-btn" disabled={it.soldOut} onClick={() => !it.soldOut && setPurchasing(it)}>
                      {it.soldOut ? '售罄' : '購買'}
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
          onConfirm={(method) => {
            const item = purchasing;
            dispatch({ type: 'BUY', item });
            let orderId = null;
            if (method === 'cash') {
              orderId = `ORD-${String(Date.now()).slice(-8)}`;
              const thumbMap = { '通行證': '🎫', '禮包': '🎁', '衝刺': '🎁' };
              const thumb = Object.entries(thumbMap).find(([k]) => item.name.includes(k))?.[1] ?? '🛍️';
              const payMethod = item.cashChannel === 'platform-iap' ? 'Apple / Google Pay' : '藍新 NewebPay';
              dispatch({ type: 'PURCHASE_CASH', id: orderId, name: item.name, thumb, price: item.price, payMethod, date: new Date().toISOString().slice(0, 10) });
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
          onGoToBag={() => { setSuccessItem(null); setScreen('p9'); }}
          onGoToWardrobe={() => { setSuccessItem(null); setScreen('p1', { openWardrobe: true }); }}
          onGoToManage={() => { setSuccessItem(null); setScreen('wardrobe-manage'); }}
          setScreen={setScreen}
        />
      }

      {showPointSrc && <PointsSourceSheet state={state} onClose={() => setShowPointSrc(false)} />}
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
  const isCash = item.currency === 'cash';
  const isNewebpay = item.cashChannel === 'newebpay';
  const isIAP = item.cashChannel === 'platform-iap';
  const insufficient = !isCash && state.points < item.price;
  const [demoError, setDemoError] = useState('none');
  const [toast, setToast] = useState(null);

  const handleConfirm = () => {
    if (demoError !== 'none') {
      setToast(ERROR_MESSAGES[demoError]);
      return;
    }
    onConfirm(isCash ? 'cash' : 'points');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="preview">{item.emoji}</div>
        <h3>{item.name}</h3>
        <p>{item.desc}</p>

        {/* 付款方式 */}
        {!isCash && insufficient ? (
          <div style={{ background: '#FFF3F0', borderRadius: 12, padding: '14px 16px', marginBottom: 14 }}>
            <div style={{ fontWeight: 800, color: '#D9382A', fontSize: 15, marginBottom: 4 }}>ECOCO 點數不足，無法完成購買</div>
            <div style={{ fontSize: 13, color: '#888' }}>再去帶食物回家給 Buddy</div>
          </div>
        ) : !isCash ? (
          <div className="pay-row active" style={{ marginBottom: 14 }}>
            <span className="lhs">
              <img src="assets/icon-ecoco-point.svg" alt="" width="18" height="18" />
              ECOCO 點數
              <span style={{ color: 'var(--ecoco-orange)', marginLeft: 4 }}>✓</span>
            </span>
            <span className="rhs">- {item.price} pt</span>
          </div>
        ) : isNewebpay ? (
          <div className="pay-row active" style={{ marginBottom: 14 }}>
            <span className="lhs">💳 藍新 NewebPay <span style={{ color: 'var(--ecoco-orange)', marginLeft: 4 }}>✓</span></span>
            <span className="rhs">NT$ {item.price}</span>
          </div>
        ) : isIAP ? (
          <div className="pay-row active" style={{ marginBottom: 14 }}>
            <span className="lhs">🍎 App Store / Google Play <span style={{ color: 'var(--ecoco-orange)', marginLeft: 4 }}>✓</span></span>
            <span className="rhs">NT$ {item.price}</span>
          </div>
        ) : null}

        {/* 退款聲明 */}
        {isCash && (
          <div style={{ fontSize: 11, color: '#AAA', marginBottom: 12, lineHeight: 1.5 }}>
            購買即視為同意
            <span style={{ color: '#060E9F', textDecoration: 'underline', cursor: 'pointer' }}>退款政策</span>
            。數位商品一經購買恕不退款，{isIAP ? '裝扮類商品退款請洽 App Store / Google Play 客服' : '如有問題請聯繫 ECOCO 客服'}。
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
  const isCash = item.paidWith === 'cash';
  const isCosmetic = item.cashChannel === 'platform-iap';
  const orderId = item.orderId ?? null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center', position: 'relative' }}>
        <button onClick={onClose} style={{ position:'absolute', top:12, left:12, background:'none', border:'none', padding:'4px 8px', cursor:'pointer', fontSize:13, fontWeight:700, color:'#555', lineHeight:1, display:'flex', alignItems:'center', gap:2 }}>‹ 返回</button>
        <div style={{ fontSize: 56, marginBottom: 4, lineHeight: 1 }}>{item.emoji}</div>
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
              {!isCash
                ? <><img src="assets/icon-ecoco-point.svg" alt="" width="14" height="14" />ECOCO 點數</>
                : isCosmetic ? '🍎 App Store / Google Play' : '💳 藍新 NewebPay'}
            </span>
          </div>
          {!isCash && (
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555' }}>
              <span>剩餘 ECOCO 點數</span>
              <span style={{ fontWeight: 800, color: 'var(--ecoco-orange)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <img src="assets/icon-ecoco-point.svg" alt="" width="14" height="14" />
                {(state.points - item.price).toLocaleString()} pt
              </span>
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
              <button onClick={onGoToManage} style={{
                flex: 1, background: 'var(--gray-light)', color: '#555',
                border: 'none', borderRadius: 999, padding: '13px 0',
                fontWeight: 700, fontSize: 14, cursor: 'pointer',
              }}>管理裝扮</button>
              <button onClick={onGoToWardrobe} style={{
                flex: 1, background: 'var(--ecoco-orange)', color: '#fff',
                border: 'none', borderRadius: 999, padding: '13px 0',
                fontWeight: 800, fontSize: 14, cursor: 'pointer',
              }}>前往換裝</button>
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
        {isCash && (
          <button
            onClick={() => { onClose(); setScreen('p4-orders'); }}
            style={{ marginTop: 10, background: 'none', border: 'none', color: '#888', fontSize: 13, cursor: 'pointer', textDecoration: 'underline' }}
          >查看訂單 ›</button>
        )}
      </div>
    </div>
  );
};

/* ----- P4 helper: 點數來源 sheet ----- */
const PointsSourceSheet = ({ state, onClose }) => {
  const sources = [
    { kind: 'recycle', icon: '♻️', name: '帶食物回家累積', sub: '本月 12 次 · 累計 238 次', value: 216 },
    { kind: 'refill', icon: '💧', name: '補充站消費累積', sub: '本月 3 次 消費回饋', value: 124 },
    { kind: 'mission', icon: '✅', name: '今日陪伴累積', sub: '本月完成 18 項', value: 42 },
  ];
  const monthTotal = sources.reduce((a, b) => a + b.value, 0);
  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet-panel points-source-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-grip"></div>
        <h3>ECOCO 點數來源</h3>
        <div className="total-row">
          <span className="lbl">目前 ECOCO 點數</span>
          <b>
            <img src="assets/icon-ecoco-point.svg" alt="" width="24" height="24" />
            {state.points.toLocaleString()}
          </b>
        </div>
        <div style={{ fontSize: 11, fontWeight: 800, color: '#888', letterSpacing: '.06em', marginBottom: 8 }}>本月累計 · +{monthTotal} pt</div>
        <div className="src-list">
          {sources.map((s) => (
            <div key={s.kind} className={`src ${s.kind}`}>
              <div className="icon">{s.icon}</div>
              <div className="body">
                <div className="n">{s.name}</div>
                <div className="s">{s.sub}</div>
              </div>
              <div className="v">+{s.value}<small>pt</small></div>
            </div>
          ))}
        </div>
        <button className="close-btn" onClick={onClose}>關閉</button>
      </div>
    </div>
  );
};

/* ═══════════════ P5 · Missions ═══════════════ */
const P5Missions = ({ setScreen, state, dispatch, tweaks }) => {
  const [tab, setTab] = useState('daily');
  const [toast, setToast] = useState(null);
  const [pulsing, setPulsing] = useState(false);
  const isPhase2 = (tweaks?.shopPhase ?? 1) >= 2;
  const tabs = [
    { id: 'daily',   label: '今日' },
    ...(isPhase2 ? [
      { id: 'week',    label: '這週' },
      { id: 'month',   label: '這個月' },
      { id: 'achieve', label: '成就' },
    ] : []),
  ];

  const missionData = [
    { id: 'login',   icon: '📅', title: '來看看 Buddy',      reward: '食物 ×1 · 心情 +3', progress: 1, total: 1, claimed: false },
    { id: 'recycle', icon: '♻️', title: '帶食物回家',         reward: '食物 ×1 · 心情 +3', progress: 1, total: 1, claimed: true  },
    { id: 'feed',    icon: '🍖', title: '為 Buddy 準備一餐',  reward: '食物 ×1 · 心情 +3', progress: 2, total: 3, claimed: false },
    { id: 'tap',     icon: '👋', title: '摸摸 Buddy 5 次',    reward: '食物 ×1 · 心情 +3', progress: 5, total: 5, claimed: false },
    { id: 'ad',      icon: '🎬', title: '看 Buddy 收禮物',    reward: '食物 ×1 · 心情 +3', progress: 0, total: 1, claimed: false },
  ];

  const [claimedIds, setClaimedIds] = useState(() =>
    missionData.filter(m => m.claimed).map(m => m.id)
  );

  const sortedMissions = [...missionData].sort((a, b) => {
    const rank = (m) => {
      if (claimedIds.includes(m.id)) return 2;   // 已領 → 最下
      if (m.progress >= m.total) return 0;        // 待領取 → 最上
      return 1;                                   // 進行中 → 中間
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

  const handleClaim = (m) => {
    setPulsing(false);
    setClaimedIds(prev => [...prev, m.id]);
    dispatch({ type: 'CLAIM_MISSION' });
    setToast('一起做到！食物 ×1 ・ 心情 +3 ✨');
  };

  return (
    <div className="screen p5">
      <StatusBar light />
      <div className="header">
        <h2>今日陪伴</h2>
        <div className="streak">
          <span className="fire">🔥</span>
          <span className="days">5</span>
          <span className="label">天連續登入</span>
        </div>
        <div className="day-dots">
          {['一', '二', '三', '四', '五', '六', '日'].map((d, i) =>
            <div key={i} className={`day-dot ${i < 5 ? 'done' : i === 5 ? 'today' : ''}`}>
              <span>{d}</span>
              <div className="pill"></div>
            </div>
          )}
        </div>
      </div>
      <div className="tabs">
        {tabs.map((t) =>
          <button key={t.id} className={`tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        )}
      </div>

      {tab !== 'daily' ? (
        <div style={{ padding: '40px 20px', textAlign: 'center', color: '#888' }}>
          <div style={{ fontSize: 48, opacity: .4, marginBottom: 10 }}>🌱</div>
          <h3 style={{ fontSize: 14, color: '#222', marginBottom: 4 }}>
            {tab === 'week' ? '這週陪伴' : tab === 'month' ? '這個月陪伴' : '成就'}
          </h3>
          <p style={{ fontSize: 12 }}>
            {tab === 'week' ? 'Buddy 還在準備這週的陪伴清單～' : tab === 'month' ? 'Buddy 還在規劃這個月的長線陪伴～' : 'Buddy 還在為你收集這份成就～'}
          </p>
        </div>
      ) : (
        <div className="mission-list">
          {sortedMissions.map((m) => {
            const isClaimed = claimedIds.includes(m.id);
            const isLocked = m.progress < m.total;
            return (
              <div key={m.id} className="mission-card">
                <div className="icon">{m.icon}</div>
                <div className="body">
                  <h4>{m.title}</h4>
                  <div className="reward">獎勵：{m.reward}</div>
                  <div className="progress"><div style={{ width: `${m.progress / m.total * 100}%` }}></div></div>
                  <div className="progress-text">{m.progress}/{m.total}</div>
                </div>
                <button
                  className={`claim ${isClaimed ? 'done' : isLocked ? 'locked' : pulsing ? 'pulse' : ''}`}
                  onClick={!isClaimed && !isLocked ? () => handleClaim(m) : undefined}
                >
                  {isClaimed ? '已完成' : isLocked ? '進行中' : '可領取'}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {toast && <SystemToast text={toast} bottom icon={false} onClose={() => setToast(null)} duration={2200} />}
    </div>
  );
};

/* ═══════════════ P6 · Ads → box ═══════════════ */
const P6Ads = ({ setScreen, state, dispatch }) => {
  const [step, setStep] = useState(1); // 1 ad, 2 reward (confirm handled by sheet at each entry point)
  const [adTime, setAdTime] = useState(15);
  const [pity, setPity] = useState(state.pity || 0);
  const [reward, setReward] = useState(null);

  useEffect(() => {
    if (step !== 1) return;
    if (adTime <= 0) return;
    const t = setTimeout(() => setAdTime((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [step, adTime]);

  const skipAd = () => {
    // generate reward
    const rolls = [
    { id: 'feather', emoji: '🪶', name: '逗貓棒', prob: 40 },
    { id: 'brush', emoji: '🪮', name: '梳子', prob: 30 },
    { id: 'ball', emoji: '⚾', name: '小球', prob: 20 },
    { id: 'snack', emoji: '🍪', name: '零食', prob: 10 }];

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
      <NavBack onClick={() => setScreen('p1')} light />

      {step === 1 &&
      <div className="ad-screen">
          <div className="ad-label">一段小廣告（讓 Buddy 開心）</div>
          <div className={`skip ${adTime <= 0 ? 'ready' : ''}`} onClick={adTime <= 0 ? skipAd : undefined}>
            {adTime > 0 ? `${adTime}s` : '領道具 ›'}
          </div>
          <div className="ad-mock">
            <div className="play">▶</div>
            <div style={{ fontSize: 18 }}>廣告播放中</div>
            <div style={{ fontSize: 12, fontWeight: 500, opacity: .85 }}>{adTime > 0 ? `${adTime} 秒` : '廣告結束'}</div>
          </div>
        </div>
      }
      {step === 2 &&
      <div className="step">
          <h2>恭喜獲得！</h2>
          <div className="sub">道具已加入背包，請於 24 小時內使用</div>
          <div className="box">
            <div className="reward-card">
              <div className="emoji">{reward.emoji}</div>
              <h3>{reward.name}</h3>
              <p>{reward.id === 'snack' ? '拖到夥伴身上 體力 +15、心情 +15' : reward.id === 'brush' ? '拖到夥伴身上 潔淨 +15、心情 +10' : '拖到夥伴身上 心情 +15'}</p>
            </div>
          </div>
          <div className="reward-actions">
            <button className="btn-primary" onClick={() => {dispatch({ type: 'ADD_TOOL', tool: reward });setScreen('p9');}}>放入背包</button>
          </div>
        </div>
      }
    </div>);

};

/* ═══════════════ P7 · Dex ═══════════════ */
const P7Dex = ({ setScreen, state, dispatch, onOpenPicker, tweaks }) => {
  const isPhase2 = (tweaks?.shopPhase ?? 1) >= 2;
  const lockedCode = state.lockedMonthCode;

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


  // Phase 2：每角色 36 種狀態（小海龜用既有 9 種解鎖資料 + 27 種預留鎖定；其他角色全鎖定）
  const dexTotal = isPhase2 ? 36 : 9;
  const baseStates = state.dexStates;
  const states = (() => {
    if (!isPhase2) return baseStates;
    if (charId !== 'turtle') {
      // 其他角色：全部鎖定預留
      return Array.from({ length: 36 }, (_, i) => ({
        code: String(i + 1).padStart(2, '0'),
        name: '???',
        unlocked: false,
        character: charId,
      }));
    }
    // 小海龜 Phase 2：原 9 格 + 27 格鎖定預留
    const knownCodes = new Set(baseStates.map(s => s.code));
    const padded = [];
    for (let i = 1; i <= 36; i++) {
      const code = String(i).padStart(2, '0');
      if (knownCodes.has(code)) padded.push(baseStates.find(s => s.code === code));
      else padded.push({ code, name: '???', unlocked: false });
    }
    return padded;
  })();
  const stripRef = useRef(null);
  const currentCellRef = useRef(null);
  const [detailMo, setDetailMo] = useState(null);
  const [detailState, setDetailState] = useState(null);

  useEffect(() => {
    if (currentCellRef.current && stripRef.current) {
      const strip = stripRef.current;
      const cell = currentCellRef.current;
      strip.scrollLeft = cell.offsetLeft - strip.offsetWidth / 2 + cell.offsetWidth / 2;
    }
  }, []);

  const handleCellClick = (mo) => {
    if (mo.filled) setDetailMo(mo);
    else if (mo.current) onOpenPicker && onOpenPicker();
  };

  return (
    <div className="screen p7">
      <StatusBar />
      <div className="header">
        <h2>夥伴日誌</h2>
        <div className="en">2026</div>
      </div>

      <div className="section-h">
        <div className="section-h-row">
          <span>今年的 Buddy 們</span>
          {!state.lockedMonthCode && (
            <span className="alert-hint" onClick={() => onOpenPicker && onOpenPicker()}>6 月的 Buddy 還沒選進日誌 ›</span>
          )}
          {state.lockedMonthCode && state.swapLeft > 0 && (
            <span className="alert-hint" onClick={() => onOpenPicker && onOpenPicker()} style={{ color: '#1A7A46' }}>已鎖入本月夥伴 · 還可更換 {state.swapLeft} 次 ›</span>
          )}
          {state.lockedMonthCode && state.swapLeft <= 0 && (
            <span className="alert-hint" onClick={() => setScreen('p11')} style={{ color: '#999', cursor: 'pointer' }}>已達本月更換上限 · 購買更換次數包 ›</span>
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
          <div className="year-detail-overlay" onClick={() => setDetailMo(null)}>
            <div className="year-detail-sheet" onClick={e => e.stopPropagation()}>
              <button className="year-detail-close" onClick={() => setDetailMo(null)}>✕</button>
              <div className="year-detail-collected">已收藏 ✓</div>
              <div className="year-detail-emoji">{detailMo.icon}</div>
              <div className="year-detail-code">#{detailMo.code}</div>
              <div className="year-detail-name">{charState?.name || '???'}</div>
              <div className="year-detail-month">{String(detailMo.m).padStart(2, '0')} 月 · 2026 年度</div>
              {charState?.legendary && <div className="year-detail-rarity">✦ 傳說</div>}
            </div>
          </div>
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
        <div key={s.code} className={`state-card ${s.unlocked ? 'unlocked' : 'locked'} ${s.legendary ? 'legendary' : ''}`} onClick={() => setDetailState({ ...s, character: currentChar })} style={{ cursor: 'pointer' }}>
            <span className="code">#{s.code}</span>
            {s.unlocked ? <>
              <img className="turtle" src="assets/sea-turtle.svg" alt="" style={{ filter: s.tint || 'none' }} />
              <span className="name">{s.name}</span>
              {s.legendary && <span className="rarity">✦ 傳說</span>}
            </> : (charId === 'turtle' ? <>
              <img className="turtle" src="assets/sea-turtle.svg" alt="" />
              <span className="name">??? ???</span>
              <span className="lock" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>🔒</span>
            </> : <>
              <div style={{ width: 60, height: 60, marginBottom: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, opacity: 0.18 }}>{currentChar.icon}</div>
              <span className="name">??? ???</span>
              <span className="lock" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>🔒</span>
            </>)}
          </div>
        )}
      </div>

      {detailState && (
        <div className="year-detail-overlay" onClick={() => setDetailState(null)}>
          <div className="year-detail-sheet" onClick={e => e.stopPropagation()}>
            <button className="year-detail-close" onClick={() => setDetailState(null)}>✕</button>
            {detailState.unlocked
              ? <div className="year-detail-collected">已解鎖 ✓</div>
              : <div className="year-detail-collected" style={{ background: 'rgba(0,0,0,0.06)', color: '#999' }}>🔒 尚未解鎖</div>
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
            <div className="year-detail-name">{detailState.unlocked ? detailState.name : '??? ???'}</div>
            <div className="year-detail-month">本月 6 月 · {detailState.character?.name || '小海龜'}</div>
            {detailState.legendary && detailState.unlocked && <div className="year-detail-rarity">✦ 傳說</div>}
          </div>
        </div>
      )}

    </div>);

};

/* ═══════════════ P8 · Profile (Me · 我的) ═══════════════ */
const P8Profile = ({ setScreen, state, tweaks }) => {
  const [showPointSrc, setShowPointSrc] = useState(false);
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
        { icon: '📖', label: '夥伴日誌', sub: `認識了 ${state.dexStates.filter(s => s.unlocked).length} / 9 個樣子`, go: 'p7' },
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
        isPhase2
          ? { icon: '🧾', label: '購買紀錄', sub: state.orderHistory && state.orderHistory.length > 0 ? state.orderHistory[0].name : '尚無購買紀錄', go: 'p4-orders' }
          : { icon: '🧾', label: '購買紀錄', sub: '即將推出，敬請期待', locked: true },
        { icon: 'pt', label: '點數明細', sub: '本月 +382 · 帶食物回家 12 次', action: () => setShowPointSrc(true) },
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
              <div style={{ fontSize: 11, marginTop: 4, opacity: .85 }}>Lv.12｜和 Buddy 已經 5 天</div>
            </div>
          </div>
        </div>

        <div className="stats-row">
          <div className="stat-card"><b>238</b><div className="label">次相遇</div></div>
          <div className="stat-card"><b>156</b><div className="label">次餵食</div></div>
          <div className="stat-card"><b>4.2 <span style={{ fontSize: 11 }}>kg</span></b><div className="label">為地球做的事</div></div>
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
      {showPointSrc && <PointsSourceSheet state={state} onClose={() => setShowPointSrc(false)} />}
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
          <span>⚠️</span>
          <span>{DIALOGUES.err.toolExpire}</span>
        </div>
      }
      {filtered.length === 0 ?
      <div className="empty-bag">
          <div className="icon">🎒</div>
          <h3>{DIALOGUES.err.bagEmpty}</h3>
          <p>看廣告抽道具，或到商店逛逛</p>
          <div className="empty-actions">
            <button className="btn-primary" style={{ padding: '10px 20px', fontSize: 13 }} onClick={() => setP6SheetOpen(true)}>看廣告</button>
            <button className="btn-ghost" style={{ padding: '10px 20px', fontSize: 13 }} onClick={() => setScreen('p4')}>去商店</button>
          </div>
        </div> :

      <div className="bag-grid">
          {filtered.map((t) =>
        <div key={t.id} className="bag-cell" onClick={showSnack} style={{ cursor: 'pointer' }}>
              {t.permanent && <div className="perm">永久</div>}
              <div className="emoji">{t.emoji}</div>
              <div className="name">{t.name}</div>
              {!t.permanent &&
          <div className={`timer ${t.hoursLeft <= 6 ? 'warn' : ''}`}>
                  剩 {t.hoursLeft}h
                </div>
          }
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
            <h3 style={{ fontSize: 18, fontWeight: 900, textAlign: 'center', marginBottom: 6 }}>免費道具</h3>
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
          <div className="icon">🎀</div>
          <h3>還沒有裝扮</h3>
          <p>去商店幫 Buddy 找件喜歡的衣服</p>
          <div className="empty-actions">
            <button className="btn-primary" style={{ padding: '10px 20px', fontSize: 13 }} onClick={() => setScreen('p4')}>去商店</button>
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
                <div className="emoji">{item.emoji}</div>
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
  const states = state.dexStates;
  const isFirstLock = !state.lockedMonthCode;
  const capExceeded = !isFirstLock && state.swapLeft <= 0;

  const handleClose = () => {
    if (onClose) onClose();
    else setScreen('p7');
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
            <button onClick={() => { handleClose(); setScreen('p11'); }} style={{ fontSize: 11, fontWeight: 800, color: 'var(--ecoco-blue)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}>多一點選擇 →</button>
          </div>
          {capExceeded && (
            <div style={{ marginTop: 10, padding: '10px 12px', background: '#FFF3F0', borderRadius: 10, fontSize: 12, color: '#D9382A', lineHeight: 1.5 }}>
              本月更換次數已用完。可購買「更換次數包」繼續調整，或等下個月重置。
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
                {s.legendary && <span className="rarity">✦ 傳說</span>}
              </> : <>
                <span className="lock" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>🔒</span>
              </>}
            </div>
          )}
        </div>
        <div className="actions">
          <button className="later" onClick={handleClose}>等等再說</button>
          <button className="confirm" disabled={!selected || capExceeded} onClick={() => {dispatch({ type: 'LOCK_DEX', code: selected });handleClose();}}>{capExceeded ? '次數已用完' : '收進日誌'}</button>
        </div>
      </div>
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

const P11Pack = ({ setScreen }) => {
  const [purchasing, setPurchasing] = useState(null);
  const [successItem, setSuccessItem] = useState(null);

  return (
    <div className="screen p11">
      <StatusBar />
      <NavBack onClick={() => setScreen('p7')} light />
      <div className="header">
        <h2 style={{ marginTop: 8 }}>多一點選擇</h2>
        <p>想換掉日誌裡的 Buddy 時用</p>
      </div>
      <div className="stash">
        <span className="ticket">🎫</span>
        <div>
          <b>3</b><span style={{ fontSize: 11, color: '#666', marginLeft: 4, fontWeight: 700 }}>次</span>
          <div className="label">你還有 3 次機會</div>
        </div>
      </div>
      <div className="packs">
        {SWAP_PACKS.map((pack) => (
          <div key={pack.id} className={`pack-card ${pack.featured ? 'featured' : ''}`}>
            {pack.featured && <div className="ribbon">最划算</div>}
            <h3>{pack.name}</h3>
            <div className="qty">{pack.qty}<span> 次</span></div>
            <div className="desc">{pack.desc}</div>
            <div className="price-row">
              <b>NT$ {pack.price}</b>
              <button className="buy" onClick={() => setPurchasing(pack)}>帶回家</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '16px 18px 80px', fontSize: 11, color: '#888', lineHeight: 1.6 }}>
        ※ 機會永遠有效。<br />
        ※ 購買即扣款 · 不退費。
      </div>

      {purchasing && (
        <P11PurchaseModal
          item={purchasing}
          onClose={() => setPurchasing(null)}
          onConfirm={() => { setSuccessItem(purchasing); setPurchasing(null); }}
        />
      )}
      {successItem && (
        <P11SuccessModal
          item={successItem}
          onClose={() => setSuccessItem(null)}
        />
      )}
    </div>
  );
};


/* ═══════════════ P8-FAQ · 常見問題 ═══════════════ */
const FAQ_DATA = [
  {
    cat: 'Buddy 養成', id: 'buddy',
    items: [
      { q: 'Buddy 的體力怎麼補充？', a: '兩個方式都能補充體力：帶食物回家時 Buddy 立刻獲得體力（杯子 +1、瓶罐 +2；1號/2號乾電池/9V方形乾電池 +10，其他電池 +5）；把食物格的食物拖給 Buddy 吃，普通食物 +10，稀有食物（每月第四週）+15。體力越高，Buddy 越活潑！' },
      { q: 'Buddy 的潔淨怎麼提升？', a: '帶食物回家（每個 +2 潔淨）和去補充站消費（每 NT$10 +10 潔淨，沒有上限）都能幫 Buddy 保持潔淨。注意：帶回來的東西如果被退件，每件會扣 Buddy 潔淨 -1；電池機只計體力，不給潔淨。使用梳子道具也能直接提升 Buddy 潔淨。' },
      { q: '怎麼讓 Buddy 心情變好？', a: '每天摸摸 Buddy（每日上限 10 次，每次 +1）、給 Buddy 玩玩具（逗貓棒、小球、零食都能讓 Buddy 開心，梳子也會順帶提振心情）、完成今日陪伴，都能讓 Buddy 心情變好。' },
      { q: '為什麼 Buddy 的狀態會自己下降？', a: 'Buddy 想你了。三個狀態每天會各自慢慢下降一些，記得常回來看看牠。' },
      { q: 'Buddy 什麼時候可以變身？', a: '當 Buddy 三個狀態都達到一定數值，就會觸發變身機會。每隻 Buddy 有自己的變身條件，可在夥伴日誌查看目前進度。6 月小海龜共有 9 個樣子可以遇見。' },
      { q: 'Buddy 體力歸零會怎樣？', a: 'Buddy 會進入睡眠狀態，等你帶食物回家給牠補充體力就能喚醒。Buddy 不會消失，放心！' },
    ],
  },
  {
    cat: '食物與道具', id: 'items',
    items: [
      { q: '食物和道具有什麼差別？', a: '食物補充體力，每週能帶回家；道具有特定效果（提升潔淨、心情等），效果更強但數量有限，用完可在商店補充。' },
      { q: '為什麼食物有「這週」配額？', a: '每種食物每週上限 5 個，週三中午 12:00 重置。週日中午 12:00 起會預告下週 Buddy 想吃什麼，可以提前期待。配額用完後繼續帶食物回家，Buddy 仍能直接補充體力和潔淨，只是不會再多一個食物格。補充站消費不會產生食物，食物只在帶東西回家時才有。' },
      { q: '食物有什麼效果？', a: '食物只補充體力。普通食物（W1–W3）每個 +10 體力，稀有食物（每月第四週 W4）每個 +15 體力。潔淨和心情不受食物影響——想提升這兩個狀態，可以去補充站消費或使用道具。' },
      { q: '道具會過期嗎？', a: '看來源而定。Buddy 的小驚喜（看廣告獲得）24 小時後消失；商店購買的消耗道具有 7 天有效期，可帶到下個月；裝扮與音樂盒類道具則永久綁定帳號，不會消失。剩餘時間會顯示在道具背包的卡片上，快過期時 Buddy 也會提醒你！' },
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
      { q: '為什麼有些格子是空的？', a: '空格代表那個月還沒有陪伴記錄。繼續每天帶食物回家給 Buddy，就能慢慢填滿每一格！' },
    ],
  },
  {
    cat: '點數與商店', id: 'points',
    items: [
      { q: '怎麼取得 ECOCO 點數？', a: '帶食物回家給 Buddy、在補充站消費、完成今日陪伴，都能獲得 ECOCO 點數。' },
      { q: 'ECOCO 點數會過期嗎？', a: '詳細內容請至 ECOCO 官網常見問題查看。' },
      { q: '商店可以買什麼？', a: '商店分為食物、玩具、裝扮、禮包四個分類。食物與玩具用 ECOCO 點數購買；裝扮與禮包（月底衝刺禮包、月度通行證等）用現金購買。點數與現金不互換、不互買，每張卡片都會標示「點數」或「NT$」。' },
      { q: '月底衝刺禮包是什麼？', a: '每月 22–28 日上架，幫 Buddy 在月底前衝一波狀態與日誌收藏的限時禮包，商店頁會置頂顯示倒數天數。' },
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

const P4Orders = ({ setScreen, state }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const allOrders = state.orderHistory ?? [];
  const orders = activeFilter === 'all' ? allOrders : allOrders.filter(o => o.status === activeFilter);

  return (
    <div className="screen" style={{ background: 'var(--bg-cream, #FAE0B8)' }}>
      <StatusBar />
      <NavBack onClick={() => setScreen('p8')} />
      <div style={{ padding: '90px 18px 8px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 900, color: '#222', marginTop: 8 }}>購買紀錄</h2>
      </div>

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
              return (
                <div key={order.id} className={`order-card${isFailed ? ' order-card-failed' : ''}`}>
                  {/* 頂部：縮圖 + 商品名 + 狀態 */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div className="order-thumb">{order.thumb ?? '🛍️'}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 800, fontSize: 15, color: '#222', marginBottom: 2 }}>{order.name}</div>
                      <span className={sc.cls}>{sc.label}</span>
                    </div>
                  </div>

                  {/* 明細列 */}
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

                  {/* 失敗說明區塊 */}
                  {isFailed && (
                    <div className="order-fail-reason">
                      {order.failReason || '付款未成功，請確認卡片資訊或聯繫您的銀行'}
                    </div>
                  )}

                  {/* 失敗後續行動 */}
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

        <div style={{ padding: '24px 20px 40px', textAlign: 'center', fontSize: 11, color: '#aaa', lineHeight: 1.6 }}>
          裝扮類商品由 App Store / Google Play 管理，請至手機系統查詢訂單
        </div>
      </div>
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
  ShopPurchaseModal, ShopSuccessModal, PointsSourceSheet,
});