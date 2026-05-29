/* ECO BUDDY · All game-mode screens */

/* ═══════════════ Onboarding Spotlight Overlay ═══════════════ */
const OB_STEPS = [
  { refKey: 'turtleWrapRef', pad: 24, radius: 99,
    title: '本月夥伴✨',            text: '點一下，看牠會怎麼反應' },
  { refKey: 'statRowRef',    pad: 6, padRight: 22, padBottom: 16, radius: 14,
    title: '精神・清爽・心情',      text: '點圖示看夥伴目前的狀態' },
  { refKey: 'modeBtnRef',    pad: 8,  radius: 20, textRight: true,
    title: '切換一般模式',          text: '點這裡可以回到 ECOCO 的一般功能' },
  { refKey: 'scanBtnRef',    pad: 8,  radius: 24, textRight: true,
    title: '帶食物回家 📦',         text: '回收後，掃描機台螢幕條碼，有機會換到食物哦！' },
  { refKey: 'adsBtnRef',     pad: 8,  radius: 24, textRight: true,
    title: '免費道具 🎁',           text: '看廣告領道具，每天最多三次' },
  { refKey: 'dockTabsRef',   pad: 6,  radius: 16,
    title: '食物欄 & 道具包',       text: '切換查看食物和道具，拖到夥伴身上使用' },
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
const P1Home = ({ state, dispatch, setScreen, dragManager, payload, showTutorial, onTutorialDone }) => {
  const [dockTab, setDockTab] = useState('food'); // food | tools
  const [touched, setTouched] = useState(false);
  const [eating, setEating] = useState(false);
  const [bubble, setBubble] = useState(null); // {text, error}
  const [p6SheetOpen, setP6SheetOpen] = useState(false);
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

  // tap turtle = touch reaction (and check special states)
  const handleTurtleTap = () => {
    setTouched(true);
    const special = specialState(state.stats);
    const text = special === 'legendary' ? DIALOGUES.special.legendary
               : special === 'dying'     ? DIALOGUES.special.dying
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
  const STAT_LABELS = { hp: '精神', clean: '清爽', mood: '心情' };
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
      addRise('+5 精神', pos);
      showBubble({ text: '好好吃！謝謝你～', error: false });
      setTimeout(() => setEating(false), 1500);
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
      // drop tool item → use animation
      setEating(true);
      dispatch({ type: 'USE_TOOL', tool });
      const gainMap = { feather: '+15 心情', brush: '+15 清爽', ball: '+15 心情', snack: '+15 精神' };
      addRise(gainMap[tool] || '+5', pos, tool === 'brush' ? '#1F3DBF' : tool === 'snack' ? '#FF4D63' : '#FFB000');
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

  return (
    <div className="screen p1">
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

      <div className="welcome" style={{ color: "rgb(128, 128, 128)" }}>可可粉，歡迎回來！</div>
      <div className="charinfo">
        <span className="name" style={{ fontWeight: "700" }}>海龜</span>
        <div className="charinfo-divider"></div>
        <div className="meta" style={{ color: "rgb(51, 51, 51)" }}>
          <b>6月角色</b>
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
          <button className={`dock-tab ${dockTab === 'tools' ? 'active' : ''}`} onClick={() => setDockTab('tools')}>道具包</button>
        </div>
        <div className="dock">
        {dockTab === 'food' ? <>
          <div className="dock-title">本週食物</div>
          <div className="dock-hint">每週限量配額，拖曳至角色即可餵食</div>
          <div className="dock-grid">
            {state.food.map((f, i) => <FoodCell key={f.id} food={f} dragManager={dragManager} onDrop={onDrop} index={i} showBubble={showBubble} pulsing={pulsingIds.has(f.id)} />
            )}
          </div>
        </> : <>
          <div className="dock-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>道具背包</span>
            <button onClick={() => setScreen('p9')} style={{
              fontSize: 12, fontWeight: 700, color: 'var(--ecoco-blue)',
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            }}>管理 ›</button>
          </div>
          <div className="dock-hint">拖到角色身上即可使用 · 24 小時內有效</div>
          <div className="dock-grid">
            {state.tools.length ? state.tools.map((t, i) =>
            <ToolCell key={t.id} tool={t} dragManager={dragManager} onDrop={onDrop} />
            ) :
            <div style={{ gridColumn: '1/-1', padding: '18px', textAlign: 'center', color: '#888', fontSize: 13 }}>
                還沒有道具～<br />
                <button onClick={() => setP6SheetOpen(true)} style={{ marginTop: 8, background: 'var(--ecoco-orange)', color: '#fff', padding: '8px 18px', borderRadius: 999, fontWeight: 700, fontSize: 12 }}>看廣告領取</button>
              </div>
            }
          </div>
        </>}
        </div>
      </div>
      {p6SheetOpen && (
        <div className="p6-confirm-backdrop" onClick={() => setP6SheetOpen(false)}>
          <div className="p6-confirm-sheet" onClick={e => e.stopPropagation()}>
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
    <div ref={cellRef} className={`food-cell ${cls}${pulsing ? ' pulsing' : ''}`} onPointerDown={handlePointerDown}>
      {food.state === 'locked' ? <span className="lock">🔒</span> : <>
        <span className="emoji">{food.emoji}</span>
        <span className="name">{food.name}</span>
        {food.stock > 0 && <span className="badge">{food.stock}</span>}
      </>}
    </div>);

};
const ToolCell = ({ tool, dragManager, onDrop }) => {
  const handlePointerDown = (e) => {
    dragManager.startDrag(e, { kind: 'tool', id: tool.id, emoji: tool.emoji }, onDrop);
  };
  return (
    <div className="food-cell has-stock" onPointerDown={handlePointerDown}>
      <span className="emoji">{tool.emoji}</span>
      <span className="name">{tool.name}</span>
      {tool.count > 1 && <span className="badge">{tool.count}</span>}
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

/* ═══════════════ P2b · 回收結果頁（滿版·對齊 P12）═══════════════ */
const P2bResult = ({ setScreen, dispatch, tweaks = {}, setTweak = () => {} }) => {
  const quotaFull = tweaks.p2bQuotaFull || false;
  const [showInfo, setShowInfo] = useState(false);

  const handleFeed = () => {
    dispatch({ type: 'COLLECT_BATCH', quotaFull: false });
    setScreen('p3');
  };

  const handleStore = () => {
    dispatch({ type: 'COLLECT_BATCH', quotaFull: false });
    setScreen('p1', { foodStored: true });
  };

  const handleComplete = () => {
    dispatch({ type: 'COLLECT_BATCH', quotaFull: true });
    setScreen('p1');
  };

  return (
    <div className="screen p2b">
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
            <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 12, color: '#1a1a1a' }}>精神換算說明</div>
            <div style={{ fontSize: 13, lineHeight: 2, color: '#555' }}>
              <div>杯子 → 精神 +1</div>
              <div>寶特瓶 / 鋁罐 / 牛奶瓶 → 精神 +2</div>
              <div>電池（1號/2號）→ 精神 +10</div>
              <div>其餘電池 → 精神 +5</div>
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
        <div className="eyebrow">RECYCLE COMPLETE · 帶食物回家</div>
        <h2>Buddy 收到禮物了！</h2>
        <div className="meta">
          <span className="dot"></span>
          2026.06.15 14:32 · 家樂福 仁德店
        </div>
        <div className="recycle-stats">
          <div><b>12</b><span>投入瓶罐</span></div>
          <div><b>3</b><span>退瓶數</span></div>
          <div><b>+18</b><span>ECOCO 點數</span></div>
        </div>
      </div>

      <div className="result-body">
        {quotaFull ? (
          <div style={{ marginBottom: 12 }}>
            <div className="section-title" style={{ color: '#888' }}>本週食物已領完</div>
            <div style={{ fontSize: 13, color: '#aaa', lineHeight: 1.5, marginTop: 4 }}>
              本週食物已領滿，Buddy 的精神 +18！
            </div>
          </div>
        ) : (
          <>
            <div className="section-title">本次獲得食物</div>
            <div className="gain-list gain-list--single">
              <div className="gain"><div className="emoji">🌭</div><div className="qty">×6</div><div className="label">熱狗堡</div></div>
            </div>
          </>
        )}
        <div className="hp-preview">
          <span className="label">❤ Buddy 精神預計補充</span>
          <span className="gain">+15</span>
        </div>
        <div className="next-week-preview">
          <div className="nwp-badge">下週預告</div>
          <div className="nwp-body">
            <div className="nwp-title">🥦 花椰菜</div>
            <div className="nwp-hp">每份讓 Buddy +8 精神</div>
          </div>
          <div className="nwp-time">
            <div className="nwp-time-label">開搶時間</div>
            <div className="nwp-time-val">週一 00:00</div>
          </div>
        </div>
      </div>

      <div className="footer">
        {quotaFull ? (
          <button className="btn-primary" onClick={handleComplete}>完成</button>
        ) : (
          <>
            <button className="btn-primary" onClick={handleFeed}>馬上餵 Buddy</button>
            <button className="btn-ghost" onClick={handleStore}>先放食物欄</button>
          </>
        )}
      </div>
    </div>);

};

/* ═══════════════ P3 · Feeding sequence ═══════════════ */
const P3Feeding = ({ setScreen, dispatch }) => {
  const stages = [
  { name: 'Idle', t: 300 },
  { name: '轉身 0.3s', t: 300 },
  { name: '伸手 0.5s', t: 500 },
  { name: '拿取 0.4s', t: 400 },
  { name: '吃入 0.5s', t: 500 },
  { name: '滿足 0.8s', t: 800 }];

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (idx >= stages.length) {
      dispatch({ type: 'FEED', hpGain: 15 });
      setTimeout(() => setScreen('p1'), 600);
      return;
    }
    const t = setTimeout(() => setIdx((i) => i + 1), stages[idx].t);
    return () => clearTimeout(t);
  }, [idx]);

  const turtleClass = idx === 1 ? 'touched' :
  idx >= 2 && idx <= 4 ? 'eating' : '';

  return (
    <div className="screen p1" style={{ background: "url('assets/bg.svg') center / cover no-repeat, #FFE9B7" }}>
      <StatusBar />
      <NavBack onClick={() => setScreen('p1')} />
      <div className="p3-stage-name">餵食中 · {stages[Math.min(idx, stages.length - 1)].name}</div>
      <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 160 }}>
        <div style={{ position: 'relative' }}>
          {idx === 2 && <div style={{ position: 'absolute', top: -20, left: 90, fontSize: 46, animation: 'rise .8s ease-out' }}>🌭</div>}
          {idx === 3 && <div style={{ position: 'absolute', top: 80, left: 50, fontSize: 36 }}>🌭</div>}
          <TurtleImg className={turtleClass} />
          {idx === 5 &&
          <>
              <div className="value-rise" style={{ top: -20, left: 110, color: '#FF4D63' }}>+15 精神</div>
              <SpeechBubble text="超滿足～謝謝！" style={{ top: 0, right: -20 }} />
            </>
          }
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 30, left: 18, right: 18 }}>
        <button className="btn-primary" style={{ width: '100%' }} onClick={() => {setIdx(0);}}>再餵一份</button>
      </div>
    </div>);

};

/* ═══════════════ P4 · Shop ═══════════════ */
const P4Shop = ({ setScreen, state, dispatch }) => {
  const [tab, setTab] = useState('food');
  const [purchasing, setPurchasing] = useState(null);
  const [successItem, setSuccessItem] = useState(null);
  const [showPointSrc, setShowPointSrc] = useState(false);
  const cats = [
  { id: 'food', label: '食物' },
  { id: 'tool', label: '道具' },
  { id: 'decor', label: '裝飾' },
  { id: 'music', label: '音樂盒' }];

  const items = {
    food: [
    { id: 'hotdog-pack', emoji: '🌭', name: '熱狗堡 ×5', desc: '人氣月底補給', price: 50, ribbon: '熱賣', currency: 'heart' },
    { id: 'salad', emoji: '🥬', name: '蔬菜 ×5', desc: '清爽緩升', price: 60, currency: 'heart' },
    { id: 'berry', emoji: '🍓', name: '莓果 ×3', desc: '限定食物', price: 80, soldOut: true, currency: 'heart' },
    { id: 'fish', emoji: '🐟', name: '小魚 ×5', desc: '高精神補給', price: 90, currency: 'heart' },
    { id: 'sprint-pack', emoji: '🎁', name: '月底衝刺禮包', desc: '限時限量豪華組', price: 199, currency: 'cash' },
    { id: 'monthly-pass', emoji: '🎫', name: '月度通行證', desc: '30 天進階陪伴', price: 149, currency: 'cash' }],

    tool: [
    { id: 'feather', emoji: '🪶', name: '逗貓棒', desc: '心情 +15', price: 30, currency: 'heart' },
    { id: 'brush', emoji: '🪮', name: '梳子', desc: '清爽 +15、心情 +10', price: 35, currency: 'heart' },
    { id: 'ball', emoji: '⚾', name: '小球', desc: '心情 +15', price: 25, currency: 'heart' },
    { id: 'snack', emoji: '🍪', name: '零食', desc: '精神 +15、心情 +15', price: 20, currency: 'heart' }],

    decor: [
    { id: 'star-hat', emoji: '⭐', name: '星辰帽', desc: '限定裝飾 · 閃閃發光', price: 299, currency: 'cash' },
    { id: 'crystal-bow', emoji: '🎀', name: '水晶蝴蝶結', desc: '限定裝飾 · 精緻優雅', price: 249, currency: 'cash' }],

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
            </button>
          )}
        </div>
      </div>


{/* 現金商品 — 橫向 strip，固定在點數商品上方 */}
      {(() => {
        const cashItems = (items[tab] || []).filter(it => it.currency === 'cash');
        if (!cashItems.length) return null;
        return (
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#888', letterSpacing: '.04em', padding: '10px 18px 4px' }}>現金商品</div>
            <div className="cash-strip">
              {cashItems.map(it => (
                <div key={it.id} className="cash-card" onClick={() => setPurchasing(it)}>
                  <div className="cash-thumb">{it.emoji}</div>
                  <div className="cash-info">
                    <h4>{it.name}</h4>
                    <div className="desc">{it.desc}</div>
                    <div style={{ fontWeight: 800, color: '#060E9F', fontSize: 13, marginTop: 6, fontFamily: 'var(--font-en)' }}>NT$ {it.price}</div>
                  </div>
                </div>
              ))}
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

      {purchasing &&
        <ShopPurchaseModal
          item={purchasing}
          state={state}
          onClose={() => setPurchasing(null)}
          onConfirm={(method) => {
            const item = purchasing;
            dispatch({ type: 'BUY', item });
            setPurchasing(null);
            setSuccessItem({ ...item, paidWith: method });
          }}
        />
      }

      {successItem &&
        <ShopSuccessModal
          item={successItem}
          state={state}
          onClose={() => setSuccessItem(null)}
          onGoToBag={() => { setSuccessItem(null); setScreen('p9'); }}
        />
      }

      {showPointSrc && <PointsSourceSheet state={state} onClose={() => setShowPointSrc(false)} />}
    </div>);

};

/* ----- P4 helper: 購買確認 Modal ----- */
const ShopPurchaseModal = ({ item, state, onClose, onConfirm }) => {
  const isCash = item.currency === 'cash';
  const insufficient = !isCash && state.points < item.price;
  const [payMethod, setPayMethod] = useState('apple');
  const [toast, setToast] = useState(null);
  const [payFailDemo, setPayFailDemo] = useState(false);

  const handleConfirm = () => {
    if (payFailDemo) {
      setToast(DIALOGUES.sys.p4.payFail);
      setPayFailDemo(false);
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
        ) : (
          <div style={{ marginBottom: 14 }}>
            <div
              className={`pay-row ${payMethod === 'apple' ? 'active' : ''}`}
              onClick={() => setPayMethod('apple')}
            >
              <span className="lhs">
                🍎 Apple Pay
                {payMethod === 'apple' && <span style={{ color: 'var(--ecoco-orange)', marginLeft: 4 }}>✓</span>}
              </span>
              <span className="rhs">NT$ {item.price}</span>
            </div>
            <div
              className={`pay-row ${payMethod === 'google' ? 'active' : ''}`}
              onClick={() => setPayMethod('google')}
              style={{ marginTop: 8 }}
            >
              <span className="lhs">
                🌐 Google Pay
                {payMethod === 'google' && <span style={{ color: 'var(--ecoco-orange)', marginLeft: 4 }}>✓</span>}
              </span>
              <span className="rhs">NT$ {item.price}</span>
            </div>
          </div>
        )}

        {/* DEMO toggle — 模擬付款失敗（採系統 alert） */}
        <label className="p4-demo-row">
          <input type="checkbox" checked={payFailDemo} onChange={(e) => setPayFailDemo(e.target.checked)} />
          <span>DEMO · 模擬付款失敗</span>
        </label>

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
const ShopSuccessModal = ({ item, state, onClose, onGoToBag }) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center' }}>
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
              {item.paidWith === 'points'
                ? <><img src="assets/icon-ecoco-point.svg" alt="" width="14" height="14" />ECOCO 點數</>
                : '💳 Apple / Google Pay'}
            </span>
          </div>
          {item.paidWith === 'points' && (
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555' }}>
              <span>剩餘 ECOCO 點數</span>
              <span style={{ fontWeight: 800, color: 'var(--ecoco-orange)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <img src="assets/icon-ecoco-point.svg" alt="" width="14" height="14" />
                {(state.points - item.price).toLocaleString()} pt
              </span>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
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
        </div>
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
    <div className="points-source-sheet" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="grip"></div>
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
const P5Missions = ({ setScreen, state, dispatch }) => {
  const [tab, setTab] = useState('daily');
  const [toast, setToast] = useState(null);
  const tabs = [
    { id: 'daily',   label: '每日' },
    { id: 'week',    label: '本週' },
    { id: 'month',   label: '月度' },
    { id: 'achieve', label: '成就' },
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

  const handleClaim = (m) => {
    setClaimedIds(prev => [...prev, m.id]);
    dispatch({ type: 'CLAIM_MISSION' });
    setToast('一起做到！心情 +3 ✨');
  };

  const sortedMissions = [...missionData].sort((a, b) => {
    const rank = (m) => {
      if (claimedIds.includes(m.id)) return 2;   // 已領 → 最下
      if (m.progress >= m.total) return 0;        // 待領取 → 最上
      return 1;                                   // 進行中 → 中間
    };
    return rank(a) - rank(b);
  });

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
            {tab === 'week' ? '本週陪伴任務' : tab === 'month' ? '月度陪伴任務' : '成就'}
          </h3>
          <p style={{ fontSize: 12 }}>
            {tab === 'week' ? '本週陪伴任務，敬請期待！' : tab === 'month' ? '月度陪伴任務，敬請期待！' : '成就系統，敬請期待！'}
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
                  className={`claim ${isClaimed ? 'done' : isLocked ? 'locked' : ''}`}
                  onClick={!isClaimed && !isLocked ? () => handleClaim(m) : undefined}
                >
                  {isClaimed ? '已完成' : isLocked ? '進行中' : '領取'}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {toast && <SystemToast text={toast} bottom onClose={() => setToast(null)} duration={2200} />}
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
          <div className="ad-label">AD · 廣告</div>
          <div className={`skip ${adTime <= 0 ? 'ready' : ''}`} onClick={adTime <= 0 ? skipAd : undefined}>
            {adTime > 0 ? `${adTime}s` : '跳過 ›'}
          </div>
          <div className="ad-mock">
            <div className="play">▶</div>
            <div style={{ fontSize: 18 }}>合作品牌廣告</div>
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
              <p>{reward.id === 'snack' ? '拖到夥伴身上 精神 +15、心情 +15' : reward.id === 'brush' ? '拖到夥伴身上 清爽 +15、心情 +10' : '拖到夥伴身上 心情 +15'}</p>
            </div>
          </div>
          <div className="reward-actions">
            <button className="btn-primary" onClick={() => {dispatch({ type: 'ADD_TOOL', tool: reward });setScreen('p1');}}>立即使用</button>
            <button className="btn-ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }} onClick={() => {dispatch({ type: 'ADD_TOOL', tool: reward });setScreen('p9');}}>放入背包</button>
          </div>
        </div>
      }
    </div>);

};

/* ═══════════════ P7 · Dex ═══════════════ */
const P7Dex = ({ setScreen, state, dispatch, onOpenPicker }) => {
  const months = [
  { m: 1, filled: true, icon: '🐢', code: '07' },
  { m: 2, filled: true, icon: '🐢', code: '13' },
  { m: 3, filled: true, icon: '🐢', code: '17' },
  { m: 4, filled: true, icon: '🐢', code: '26' },
  { m: 5, filled: true, icon: '🐢', code: '08' },
  { m: 6, filled: false, current: true },
  { m: 7, locked: true },
  { m: 8, locked: true },
  { m: 9, locked: true },
  { m: 10, locked: true },
  { m: 11, locked: true },
  { m: 12, locked: true }];


  const states = state.dexStates;
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
        <div className="en">DEX · 2026</div>
      </div>

      <div className="section-h">
        <div className="section-h-row">
          <span>年度收藏</span>
          <span className="alert-hint" onClick={() => onOpenPicker && onOpenPicker()}>本月角色尚未選入收藏夾 ›</span>
        </div>
      </div>
      <div className="year-strip" ref={stripRef}>
        {months.map((mo) =>
        <div key={mo.m} ref={mo.current ? currentCellRef : null} className={`year-cell ${mo.filled ? 'filled' : ''} ${mo.current ? 'current' : ''} ${mo.locked ? 'locked' : ''}`} onClick={() => handleCellClick(mo)} style={(mo.filled || mo.current) ? { cursor: 'pointer' } : undefined}>
            <span className="month">{String(mo.m).padStart(2, '0')}</span>
            {mo.filled && <><span className="icon">{mo.icon}</span><span style={{ fontSize: 13, opacity: .55 }}>#{mo.code}</span></>}
            {mo.current && <span style={{ fontSize: 42, marginTop: 6 }}>?</span>}
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

      <div className="section-h">
        <div className="section-h-row">
          <span>本月解鎖 · 6 月小海龜</span>
          <span className="meta">{states.filter((s) => s.unlocked).length} / 9</span>
        </div>
      </div>
      <div className="section-progress">
        <div className="fill" style={{ width: `${(states.filter(s => s.unlocked).length / 9) * 100}%` }} />
      </div>
      <div className="month-grid" style={{ paddingBottom: 100 }}>
        {states.map((s) =>
        <div key={s.code} className={`state-card ${s.unlocked ? 'unlocked' : 'locked'} ${s.legendary ? 'legendary' : ''}`} onClick={() => setDetailState(s)} style={{ cursor: 'pointer' }}>
            <span className="code">#{s.code}</span>
            {s.unlocked ? <>
              <img className="turtle" src="assets/sea-turtle.svg" alt="" style={{ filter: s.tint || 'none' }} />
              <span className="name">{s.name}</span>
              {s.legendary && <span className="rarity">✦ 傳說</span>}
            </> : <>
              <img className="turtle" src="assets/sea-turtle.svg" alt="" />
              <span className="name">??? ???</span>
              <span className="lock" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>🔒</span>
            </>}
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
            <img
              src="assets/sea-turtle.svg" alt=""
              className="state-detail-turtle"
              style={{ filter: detailState.unlocked ? (detailState.tint || 'none') : 'grayscale(1) opacity(0.3)' }}
            />
            <div className="year-detail-code">#{detailState.code}</div>
            <div className="year-detail-name">{detailState.unlocked ? detailState.name : '??? ???'}</div>
            <div className="year-detail-month">本月 6 月 · 小海龜</div>
            {detailState.legendary && detailState.unlocked && <div className="year-detail-rarity">✦ 傳說</div>}
          </div>
        </div>
      )}

    </div>);

};

/* ═══════════════ P8 · Profile (Me · 我的) ═══════════════ */
const P8Profile = ({ setScreen, state }) => {
  const [showPointSrc, setShowPointSrc] = useState(false);
  const featureGroups = [
  {
    title: '遊戲功能',
    en: 'GAME',
    items: [
    { icon: '🐢', label: '角色狀態', sub: `精神 ${state.stats.hp} · 清爽 ${state.stats.clean} · 心情 ${state.stats.mood}`, go: 'p1' },
    { icon: '📖', label: '圖鑑進度', sub: `已解鎖 ${state.dexStates.filter((s) => s.unlocked).length} / 9 種型態`, go: 'p7' },
    { icon: '🎒', label: '道具背包', sub: `${state.tools.length} 個道具`, go: 'p9' },
    { icon: '✅', label: '今日陪伴', sub: '每日任務 3 個進行中', go: 'p5' },
    { icon: '🛒', label: '商店', sub: `點數 ${state.points.toLocaleString()}`, go: 'p4' },
    { icon: 'pt', label: '點數明細', sub: '本月 +382 · 回收 12 次', action: () => setShowPointSrc(true) }]

  },
  {
    title: '使用教學',
    en: 'GUIDE',
    items: [
    { icon: '🌱', label: '新手引導', sub: '認識三維屬性、餵食、進化', go: 'p0a' },
    { icon: '💬', label: '常見問題', sub: '更換次數、過期道具、課金', go: 'p8-faq' }]

  }];


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
              <div className="id">ID · ECOCO_9999 · 已驗證</div>
              <div style={{ fontSize: 11, marginTop: 4, opacity: .85 }}>Lv.12 · 環保大使 · 5 天連登</div>
            </div>
          </div>
        </div>

        <div className="stats-row">
          <div className="stat-card"><b>238</b><div className="label">總回收次數</div></div>
          <div className="stat-card"><b>156</b><div className="label">餵食次數</div></div>
          <div className="stat-card"><b>4.2 <span style={{ fontSize: 11 }}>kg</span></b><div className="label">減碳量</div></div>
        </div>

        {featureGroups.map((group) =>
        <div key={group.title} style={{ marginTop: 18 }}>
            <div className="p8-group-h">
              <span>{group.title}</span>
              <span className="en">{group.en}</span>
            </div>
            <div className="menu">
              {group.items.map((it, i) =>
            <div key={i} className={`menu-item ${it.go || it.comingSoon || it.action ? 'tap-area' : ''}`}
            onClick={() => { if (it.action) it.action(); else if (it.go) setScreen(it.go); }}>
                  <span className="icon">
                    {it.icon === 'pt' ?
                <img src="assets/icon-ecoco-point.svg" alt="" width="20" height="20" /> :
                it.icon}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, color: '#222', fontSize: 14 }}>{it.label}</div>
                    {it.sub && <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{it.sub}</div>}
                  </div>
                  <span className="arrow" style={it.comingSoon ? { color: '#ccc' } : {}}>›</span>
                </div>
            )}
            </div>
          </div>
        )}

        <div style={{ padding: '18px 18px 90px' }}>
          <button
            onClick={() => setScreen('p1')}
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
            ECO BUDDY v1.0 · Phase 1<br />© 2026 ECOCO 凡立橙股份有限公司
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
  const tools = state.tools;
  const filtered = tools.filter((t) => tab === 'free' ? !t.permanent : tab === 'paid' ? t.permanent : true);

  const handleUse = (toolId) => {
    dispatch({ type: 'USE_TOOL', tool: toolId });
    setScreen('p9b');
  };

  return (
    <div className="screen p9">
      <StatusBar />
      <NavBack onClick={() => setScreen('p1')} />
      <div className="header">
        <h2>道具背包</h2>
      </div>
      <div className="tabs">
        <button className={`tab ${tab === 'free' ? 'active' : ''}`} onClick={() => setTab('free')}>免費道具 ({tools.filter((t) => !t.permanent).length})</button>
        <button className={`tab ${tab === 'paid' ? 'active' : ''}`} onClick={() => setTab('paid')}>付費道具 ({tools.filter((t) => t.permanent).length})</button>
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
        <div key={t.id} className="bag-cell">
              {t.permanent && <div className="perm">永久</div>}
              <div className="emoji">{t.emoji}</div>
              <div className="name">{t.name}</div>
              {!t.permanent &&
          <div className={`timer ${t.hoursLeft <= 6 ? 'warn' : ''}`}>
                  剩 {t.hoursLeft}h
                </div>
          }
              {t.count > 1 && <span className="badge">{t.count}</span>}
              <button className="use-btn" onClick={() => handleUse(t.id)}>使用</button>
            </div>
        )}
        </div>
      }
      <div style={{ paddingBottom: 40 }}></div>
      {p6SheetOpen && (
        <div className="p6-confirm-backdrop" onClick={() => setP6SheetOpen(false)}>
          <div className="p6-confirm-sheet" onClick={e => e.stopPropagation()}>
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

/* ═══════════════ P9b · Tool use animation ═══════════════ */
const P9bToolAnim = ({ setScreen }) => {
  useEffect(() => {
    const t = setTimeout(() => setScreen('p1'), 2000);
    return () => clearTimeout(t);
  }, [setScreen]);
  return (
    <div className="screen p1" style={{ background: "url('assets/bg.svg') center / cover no-repeat, #FFE9B7" }}>
      <StatusBar />
      <NavBack onClick={() => setScreen('p9')} />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ position: 'relative' }}>
          <TurtleImg className="touched" />
          <div className="value-rise" style={{ top: -10, left: 90, color: '#FFB000' }}>+15 心情</div>
          <SpeechBubble text="哇～新玩具！" style={{ top: 30, right: -10 }} />
        </div>
      </div>
    </div>);

};

/* ═══════════════ P10 · Month picker (overlay on P7) ═══════════════ */
const P10Picker = ({ setScreen, state, dispatch, onClose }) => {
  const [selected, setSelected] = useState(null);
  const states = state.dexStates;

  const handleClose = () => {
    if (onClose) onClose();
    else setScreen('p7');
  };

  return (
    <div className="screen p10">
      <div className="sheet">
        <div className="title">
          <h3>選擇你的 6 月夥伴</h3>
          <p>從本月觸發過的狀態中挑一個鎖入年度圖鑑</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
            <p style={{ fontSize: 12, color: 'var(--ecoco-orange)', fontWeight: 700, margin: 0 }}>尚可更換 {state.swapLeft} 次</p>
            <button onClick={() => { handleClose(); setScreen('p11'); }} style={{ fontSize: 11, fontWeight: 800, color: 'var(--ecoco-blue)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}>增加更換次數 →</button>
          </div>
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
          <button className="later" onClick={handleClose}>稍後再選</button>
          <button className="confirm" disabled={!selected} onClick={() => {dispatch({ type: 'LOCK_DEX', code: selected });handleClose();}}>確認鎖入</button>
        </div>
      </div>
    </div>);

};

/* ═══════════════ P11 · Swap pack purchase ═══════════════ */
const SWAP_PACKS = [
  { id: 'swap-10', name: '標準包',   qty: 10, desc: '適合偶爾調整年度收藏',          price: 99,  featured: false },
  { id: 'swap-50', name: '進階包',   qty: 50, desc: '換到滿意為止 · 平均 NT$6/次',   price: 299, featured: true  },
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
        <h2 style={{ marginTop: 8 }}>更換次數包</h2>
        <p>用於修改年度圖鑑已鎖入的格子</p>
      </div>
      <div className="stash">
        <span className="ticket">🎫</span>
        <div>
          <b>3</b><span style={{ fontSize: 11, color: '#666', marginLeft: 4, fontWeight: 700 }}>次</span>
          <div className="label">目前可用更換次數</div>
        </div>
      </div>
      <div className="packs">
        {SWAP_PACKS.map((pack) => (
          <div key={pack.id} className={`pack-card ${pack.featured ? 'featured' : ''}`}>
            {pack.featured && <div className="ribbon">划算 5 折</div>}
            <h3>{pack.name}</h3>
            <div className="qty">{pack.qty}<span> 次</span></div>
            <div className="desc">{pack.desc}</div>
            <div className="price-row">
              <b>NT$ {pack.price}</b>
              <button className="buy" onClick={() => setPurchasing(pack)}>購買</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '16px 18px 80px', fontSize: 11, color: '#888', lineHeight: 1.6 }}>
        ※ 更換次數永久有效，不會過期。<br />
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
const P8Faq = ({ setScreen }) => {
  const faqs = [
    { q: '更換次數怎麼用？', a: '每月底可修改年度圖鑑已鎖入的格子，每次修改消耗 1 次更換次數。可在商店或更換次數包頁面補充。' },
    { q: '道具過期了怎麼辦？', a: '道具不會過期，隨時可從道具背包拖拽至 Buddy 使用。' },
    { q: '課金問題？', a: '目前可在商店以 ECOCO 點數購買食物與道具。真實金流商品（禮包、通行證）尚未開放。' },
  ];
  return (
    <div className="screen p8">
      <StatusBar light />
      <NavBack onClick={() => setScreen('p8')} light />
      <div className="screen-scroll" style={{ paddingTop: 0 }}>
        <div className="header"><h2 style={{ marginTop: 8 }}>常見問題</h2></div>
        <div style={{ padding: '0 18px 80px' }}>
          {faqs.map((f, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 16, padding: '14px 16px', marginBottom: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#222', marginBottom: 6 }}>{f.q}</div>
              <div style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


/* ═══════════════ P8-Member · 會員資料 ═══════════════ */
const P8Member = ({ setScreen }) => (
  <div className="screen p8">
    <StatusBar light />
    <NavBack onClick={() => setScreen('p8')} light />
    <div className="screen-scroll" style={{ paddingTop: 0 }}>
      <div className="header">
        <div className="profile-row">
          <div className="avatar"><img src="assets/btn/avatar.svg" alt="" draggable="false" /></div>
          <div style={{ flex: 1 }}>
            <h2>可可粉</h2>
            <div className="id">ID · ECOCO_9999 · 已驗證</div>
          </div>
        </div>
      </div>
      <div style={{ padding: '0 18px 80px' }}>
        {[
          { label: '暱稱', value: '可可粉' },
          { label: '帳號 ID', value: 'ECOCO_9999' },
          { label: '等級', value: 'Lv.12 · 環保大使' },
          { label: '連續登入', value: '5 天' },
          { label: '累積回收', value: '238 次' },
          { label: '加入時間', value: '2024 年 3 月' },
        ].map((row, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', borderRadius: 14, padding: '13px 16px', marginBottom: 10 }}>
            <span style={{ fontSize: 13, color: '#888' }}>{row.label}</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#222' }}>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);


/* ═══════════════ P8-Notify · 通知偏好 ═══════════════ */
const P8Notify = ({ setScreen }) => {
  const types = ['餵食提醒', '進化提醒', '任務完成', '點數異動', '商店新品', '系統公告', 'Buddy 呼喚'];
  const [on, setOn] = React.useState(() => Object.fromEntries(types.map(t => [t, true])));
  return (
    <div className="screen p8">
      <StatusBar light />
      <NavBack onClick={() => setScreen('p8')} light />
      <div className="screen-scroll" style={{ paddingTop: 0 }}>
        <div className="header"><h2 style={{ marginTop: 8 }}>通知偏好</h2><p>選擇想要接收的推播類型</p></div>
        <div style={{ padding: '0 18px 80px' }}>
          {types.map((t) => (
            <div key={t} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', borderRadius: 14, padding: '14px 16px', marginBottom: 10 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#222' }}>{t}</span>
              <div
                onClick={() => setOn(prev => ({ ...prev, [t]: !prev[t] }))}
                style={{
                  width: 44, height: 26, borderRadius: 13, cursor: 'pointer', transition: 'background .2s',
                  background: on[t] ? 'var(--ecoco-orange)' : '#ccc',
                  display: 'flex', alignItems: 'center', padding: '0 3px',
                  justifyContent: on[t] ? 'flex-end' : 'flex-start',
                }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


/* ═══════════════ P8-Account · 帳號管理 ═══════════════ */
const P8Account = ({ setScreen }) => (
  <div className="screen p8">
    <StatusBar light />
    <NavBack onClick={() => setScreen('p8')} light />
    <div className="screen-scroll" style={{ paddingTop: 0 }}>
      <div className="header"><h2 style={{ marginTop: 8 }}>帳號管理</h2></div>
      <div style={{ padding: '0 18px 80px' }}>
        <div className="menu">
          {[
            { label: '修改密碼', sub: '定期更換以保護帳號安全' },
            { label: '綁定手機', sub: '已綁定 · 09xx-xxx-xxx' },
          ].map((it, i) => (
            <div key={i} className="menu-item tap-area">
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: '#222', fontSize: 14 }}>{it.label}</div>
                <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{it.sub}</div>
              </div>
              <span className="arrow">›</span>
            </div>
          ))}
          <div className="menu-item tap-area" style={{ marginTop: 16 }}>
            <div style={{ flex: 1, fontWeight: 700, fontSize: 14, color: '#E53935' }}>登出</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);


/* ═══════════════ P8-Terms · 服務條款 ═══════════════ */
const P8Terms = ({ setScreen }) => (
  <div className="screen p8">
    <StatusBar light />
    <NavBack onClick={() => setScreen('p8')} light />
    <div className="screen-scroll" style={{ paddingTop: 0 }}>
      <div className="header"><h2 style={{ marginTop: 8 }}>服務條款 · 隱私權</h2></div>
      <div style={{ padding: '0 18px 80px', fontSize: 13, color: '#444', lineHeight: 1.8 }}>
        <p>本服務由 ECOCO 提供，使用本服務即表示您同意遵守相關條款與隱私政策。我們致力於保護您的個人資料，不會在未經授權的情況下分享給第三方。</p>
        <p style={{ marginTop: 16 }}>您在使用 ECO BUDDY 遊戲功能時所產生的回收紀錄、點數及角色資料，均屬您的個人資產。ECOCO 保留依法律規定或業務需要調整服務內容的權利，並將提前通知用戶。</p>
        <p style={{ marginTop: 16 }}>如有任何疑問，請透過官方客服管道聯繫我們。</p>
        <p style={{ marginTop: 24, fontSize: 11, color: '#999' }}>最後更新：2026 年 1 月 1 日</p>
      </div>
    </div>
  </div>
);


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


/* ───── Export ───── */
Object.assign(window, {
  P1Home, P2Scan, P2bResult, P3Feeding,
  P4Shop, P5Missions, P6Ads, P7Dex,
  P8Profile, P8Faq, P8Member, P8Notify, P8Account, P8Terms,
  P9Bag, P9bToolAnim,
  P10Picker, P11Pack, P11PurchaseModal, P11SuccessModal,
  PNormalHome,
  ShopPurchaseModal, ShopSuccessModal, PointsSourceSheet,
});