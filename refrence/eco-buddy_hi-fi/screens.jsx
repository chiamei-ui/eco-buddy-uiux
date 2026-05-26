/* ECO BUDDY · All game-mode screens */

/* ═══════════════ P1 · Buddy Home ═══════════════ */
const P1Home = ({ state, dispatch, setScreen, dragManager, payload }) => {
  const [dockTab, setDockTab] = useState('food'); // food | tools
  const [touched, setTouched] = useState(false);
  const [eating, setEating] = useState(false);
  const [bubble, setBubble] = useState(null); // {text, error}
  const [p6SheetOpen, setP6SheetOpen] = useState(false);
  const [ambientVisible, setAmbientVisible] = useState(true);
  const [ambientDismissing, setAmbientDismissing] = useState(false);
  const turtleRef = useRef(null);
  const valueRiseRef = useRef([]);
  const [valueRises, setValueRises] = useState([]);

  useEffect(() => {
    if (payload?.autoFeed) {
      setEating(true);
      showBubble({ text: '好好吃！謝謝你～', error: false });
      setTimeout(() => setEating(false), 1500);
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

  // tap stat pip → show stat dialogue
  const handleStatTap = (kind) => {
    const value = state.stats[kind];
    showBubble({ text: statDialogue(kind, value), error: statLevel(value)==='low' });
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
      addRise('+5 HP', pos);
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
      const gainMap = { feather: '+8 心情', brush: '+10 潔淨', ball: '+6 心情', snack: '+3 HP' };
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
          <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }} onClick={() => setScreen('p0')}>
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
        <StatPip kind="hp" value={state.stats.hp} onClick={()=>handleStatTap('hp')} />
        <StatPip kind="clean" value={state.stats.clean} onClick={()=>handleStatTap('clean')} />
        <StatPip kind="mood" value={state.stats.mood} onClick={()=>handleStatTap('mood')} />
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

        <div className={`turtle-wrap`} style={{ position: 'relative' }}>
          <TurtleImg
            className={`${touched ? 'touched' : ''} ${eating ? 'eating' : ''} ${dragManager.hover === 'turtle' ? 'dragover' : ''}`}
            onClick={handleTurtleTap}
            data-turtle="true" />
          
          {valueRises.map((v) =>
          <div key={v.id} className="value-rise" style={{ top: v.top, left: v.left, color: v.color || '#FF4D63' }}>{v.txt}</div>
          )}
        </div>

        <div className="side-actions">
          <button className="side-action tap-area" onClick={() => setScreen('p2')}>
            <ScanBtnIcon />
          </button>
          <div style={{ position: 'relative' }}>
            <button className="side-action tap-area" onClick={() => setP6SheetOpen(true)}>
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

      <div className="dock">
        <div className="dock-tabs">
          <button className={`dock-tab ${dockTab === 'food' ? 'active' : ''}`} onClick={() => setDockTab('food')}>食物欄</button>
          <button className={`dock-tab ${dockTab === 'tools' ? 'active' : ''}`} onClick={() => setDockTab('tools')}>道具包</button>
        </div>
        {dockTab === 'food' ? <>
          <div className="dock-title">本週食物</div>
          <div className="dock-hint">每週限量配額，拖曳至角色即可餵食</div>
          <div className="dock-grid">
            {state.food.map((f, i) => <FoodCell key={f.id} food={f} dragManager={dragManager} onDrop={onDrop} index={i} showBubble={showBubble} />
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

/* food cell with drag */
const FoodCell = ({ food, dragManager, onDrop, showBubble }) => {
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
    <div ref={cellRef} className={`food-cell ${cls}`} onPointerDown={handlePointerDown}>
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
const P2Scan = ({ setScreen, dispatch }) => {
  const [demoType, setDemoType] = useState('recycle'); // recycle → P2b；refill → P12
  const [errKind, setErrKind] = useState(null); // null = 正常掃描成功；其他 → 顯示系統 toast 不路由
  const [toast, setToast] = useState(null);

  // 錯誤情境（P2 畫面無角色，採系統 toast 中性語氣）
  const errOptions = [
    { id:'qrBlur',    label:'無法辨識' },
    { id:'qrExpired', label:'已過期' },
    { id:'qrUsed',    label:'已使用' },
    { id:'camDenied', label:'相機權限' },
    { id:'netFail',   label:'網路失敗' },
  ];

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

      <SystemToast text={toast} onClose={() => setToast(null)} />

      <NavBack onClick={() => setScreen('p1')} light />
      <div className="p2-label">
        <span className="dot"></span>
        <span>掃描條碼</span>
      </div>
      <div className="camera">
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
      </div>
      <div className="hint">將機台螢幕 QR Code 對準框內</div>
      <div className="hint-sub">同一入口：收瓶機 / 補充站 QR 自動識別後路由</div>

      <div className="demo-pick with-err">
        <div className="demo-label">DEMO · 模擬掃碼來源</div>
        <div className="demo-toggle">
          <button className={!errKind && demoType === 'recycle' ? 'active' : ''} onClick={() => { setErrKind(null); setDemoType('recycle'); }}>♻️ 收瓶機 → P2b</button>
          <button className={!errKind && demoType === 'refill' ? 'active' : ''} onClick={() => { setErrKind(null); setDemoType('refill'); }}>💧 補充站 → P12</button>
        </div>
        <div className="demo-divider"></div>
        <div className="demo-label">DEMO · 錯誤情境（系統 toast）</div>
        <div className="err-row">
          {errOptions.map(o => (
            <button key={o.id} className={errKind === o.id ? 'active' : ''}
              onClick={() => { setToast(null); setErrKind(errKind === o.id ? null : o.id); }}>
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <button className="scanning-btn">{errKind ? '請重新對準' : '辨識中…'}</button>
    </div>);

};

/* ═══════════════ P2b · 回收結果頁（滿版·對齊 P12）═══════════════ */
const P2bResult = ({ setScreen, dispatch }) => {
  const [quotaFull, setQuotaFull] = useState(false);

  const handleFeed = () => {
    dispatch({ type: 'COLLECT_BATCH', quotaFull: false });
    setScreen('p3');
  };

  const handleStore = () => {
    dispatch({ type: 'COLLECT_BATCH', quotaFull: false });
    setScreen('p1');
  };

  const handleComplete = () => {
    dispatch({ type: 'COLLECT_BATCH', quotaFull: true });
    setScreen('p1');
  };

  return (
    <div className="screen p2b">
      <StatusBar />
      <div className="sheet-grip" style={{marginTop:14}} />
      <div className="hero">
        <div className="eyebrow">RECYCLE COMPLETE · 回收掃碼</div>
        <h2>本次回收成功！</h2>
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
              本週食物配額已達上限，投瓶仍可獲得 HP
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
          <span className="label">❤️ 小海龜 HP 預計補充</span>
          <span className="gain">+15</span>
        </div>
        <div className="next-week-preview">
          <div className="nwp-badge">下週預告</div>
          <div className="nwp-body">
            <div className="nwp-title">🥦 花椰菜</div>
            <div className="nwp-hp">餵食 +8 HP / 份</div>
          </div>
          <div className="nwp-time">
            <div className="nwp-time-label">開搶時間</div>
            <div className="nwp-time-val">週一 00:00</div>
          </div>
        </div>
      </div>

      <div className="demo-pick">
        <div className="demo-label">DEMO · 週配額情境</div>
        <div className="demo-toggle">
          <button className={!quotaFull ? 'active' : ''} onClick={() => setQuotaFull(false)}>配額未滿（有食物）</button>
          <button className={quotaFull ? 'active' : ''} onClick={() => setQuotaFull(true)}>本週已領完</button>
        </div>
      </div>

      <div className="footer">
        {quotaFull ? (
          <button className="btn-primary" onClick={handleComplete}>完成</button>
        ) : (
          <>
            <button className="btn-primary" onClick={handleFeed}>立即餵食</button>
            <button className="btn-ghost" onClick={handleStore}>存入食物欄</button>
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
              <div className="value-rise" style={{ top: -20, left: 110, color: '#FF4D63' }}>+15 HP</div>
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
  { id: 'decor', label: '裝飾', phase2: true },
  { id: 'music', label: '音樂盒', phase2: true }];

  const items = {
    food: [
    { id: 'hotdog-pack', emoji: '🌭', name: '熱狗堡 ×5', desc: '人氣月底補給', price: 50, ribbon: '熱賣' },
    { id: 'salad', emoji: '🥬', name: '蔬菜 ×5', desc: '潔淨度緩升', price: 60 },
    { id: 'berry', emoji: '🍓', name: '莓果 ×3', desc: '限定食物', price: 80, soldOut: true },
    { id: 'fish', emoji: '🐟', name: '小魚 ×5', desc: '高 HP 補給', price: 90 }],

    tool: [
    { id: 'feather', emoji: '🪶', name: '逗貓棒', desc: '心情值 +8', price: 30 },
    { id: 'brush', emoji: '🪮', name: '梳子', desc: '潔淨度 +10', price: 35 },
    { id: 'ball', emoji: '⚾', name: '小球', desc: '心情值 +6', price: 25 },
    { id: 'snack', emoji: '🍪', name: '零食', desc: 'HP +3', price: 20 }],

    decor: [
    { id: 'hat', emoji: '🎩', name: '紳士帽', desc: '永久裝飾', price: 299, locked: true }],

    music: [
    { id: 'box', emoji: '🎵', name: '音樂盒', desc: '永久裝飾', price: 399, locked: true }]

  };

  return (
    <div className="screen p4">
      <StatusBar />
      <div className="header">
        <h2>商店</h2>
        <button className="points-pill tappable" onClick={() => setShowPointSrc(true)} aria-label="點數來源">
          <img src="assets/icon-ecoco-point.svg" alt="" width="18" height="18" />
          <span>{state.points.toLocaleString()}</span>
        </button>
      </div>
      <div className="tabs">
        {cats.map((c) =>
        <button key={c.id} className={`tab-chip ${tab === c.id ? 'active' : ''}`} onClick={() => setTab(c.id)}>
            {c.label}
            {c.phase2 && <span style={{ fontSize: 9, marginLeft: 4, opacity: .7 }}>Phase2</span>}
          </button>
        )}
      </div>

      {tab === 'food' &&
      <div className="sprint-banner">
          <div className="icon">🎁</div>
          <div>
            <div className="label">MONTH-END SPRINT</div>
            <h3>月底衝刺禮包</h3>
          </div>
          <div className="countdown">
            <b>06</b>
            <span>剩餘天數</span>
          </div>
        </div>
      }

      <div className="shop-grid">
        {(items[tab] || []).map((it) =>
        <div key={it.id} className={`shop-card ${it.soldOut ? 'sold-out' : ''}`}>
            {it.ribbon && !it.soldOut && <div className="ribbon">{it.ribbon}</div>}
            {it.soldOut && <div className="oos-overlay">暫時缺貨</div>}
            <div className="thumb">{it.emoji}</div>
            <h4>{it.name}</h4>
            <div className="desc">{it.desc}</div>
            <div className="price">
              <b style={{ fontWeight: "600", fontFamily: "\"Noto Sans TC\"" }}><img src="assets/icon-ecoco-point.svg" alt="" width="14" height="14" />{it.price}</b>
              <button
              className="buy-btn"
              disabled={it.locked || it.soldOut}
              onClick={() => !it.locked && !it.soldOut && setPurchasing(it)}>
                {it.locked ? '即將推出' : it.soldOut ? '售罄' : '購買'}
              </button>
            </div>
          </div>
        )}
      </div>

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

/* ----- P4 helper: 購買確認 Modal（點數不足 / 付款失敗 採系統 alert · 中性語氣）----- */
const ShopPurchaseModal = ({ item, state, onClose, onConfirm }) => {
  const insufficient = state.points < item.price;
  const [method, setMethod] = useState(insufficient ? 'cash' : 'points');
  const [toast, setToast] = useState(null);
  const [payFailDemo, setPayFailDemo] = useState(false);
  const cashPrice = (item.price * 0.5).toFixed(0);

  useEffect(() => {
    if (insufficient) {
      setToast(DIALOGUES.sys.p4.pointsLow);
    }
    // eslint-disable-next-line
  }, []);

  const handleConfirm = () => {
    if (method === 'points' && insufficient) {
      setToast(DIALOGUES.sys.p4.pointsLow);
      return;
    }
    if (payFailDemo) {
      setToast(DIALOGUES.sys.p4.payFail);
      setPayFailDemo(false);
      return;
    }
    onConfirm(method);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="preview">{item.emoji}</div>
        <h3>{item.name}</h3>
        <p>{item.desc}</p>
        <div
          className={`pay-row ${method === 'points' ? 'active' : ''} ${insufficient ? 'disabled' : ''}`}
          onClick={() => !insufficient && setMethod('points')}
        >
          <span className="lhs">
            <img src="assets/icon-ecoco-point.svg" alt="" width="18" height="18" />
            ECOCO 點數
            {method === 'points' && <span style={{ color: 'var(--ecoco-orange)' }}>✓</span>}
          </span>
          <span className="rhs">- {item.price} pt</span>
        </div>
        <div
          className={`pay-row ${method === 'cash' ? 'active' : ''}`}
          onClick={() => setMethod('cash')}
          style={{ marginBottom: 14 }}
        >
          <span className="lhs">
            <span style={{ fontSize: 16 }}>💳</span>
            Apple / Google Pay
            {method === 'cash' && <span style={{ color: 'var(--ecoco-orange)' }}>✓</span>}
          </span>
          <span className="rhs">NT$ {cashPrice}</span>
        </div>

        {/* DEMO toggle — 模擬付款失敗（採系統 alert） */}
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
              <span>剩餘點數</span>
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
    { kind: 'recycle', icon: '♻️', name: '回收掃碼', sub: '本月 12 次 · 累計 238 次', value: 216 },
    { kind: 'refill', icon: '💧', name: '補充站消費', sub: '本月 3 次 消費回饋', value: 124 },
    { kind: 'mission', icon: '✅', name: '任務獎勵', sub: '本月完成 18 項', value: 42 },
  ];
  const monthTotal = sources.reduce((a, b) => a + b.value, 0);
  return (
    <div className="points-source-sheet" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="grip"></div>
        <h3>點數來源明細</h3>
        <div className="total-row">
          <span className="lbl">目前點數餘額</span>
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
  const tabs = [
  { id: 'daily', label: '每日' },
  { id: 'week', label: '本週', phase2: true },
  { id: 'month', label: '月度', phase2: true }];

  const missions = {
    daily: [
    { id: 'login', icon: '📅', title: '每日簽到', reward: '+5 點 · 🌭 ×1', progress: 1, total: 1, claimed: false },
    { id: 'recycle', icon: '♻️', title: '完成 1 次回收掃碼', reward: '+10 點 · 🥬 ×1', progress: 1, total: 1, claimed: true },
    { id: 'feed', icon: '🍖', title: '餵食 3 次', reward: '+8 點', progress: 2, total: 3, claimed: false },
    { id: 'tap', icon: '👋', title: '撫摸夥伴 5 次', reward: '+3 心情', progress: 5, total: 5, claimed: false },
    { id: 'ad', icon: '🎬', title: '看 1 次廣告領道具', reward: '🎁 道具', progress: 0, total: 1, claimed: false }],

    week: [],
    month: []
  };

  return (
    <div className="screen p5">
      <StatusBar light />
      <div className="header">
        <h2>任務</h2>
        <div className="streak">
          <span className="fire">🔥</span>
          <span className="days">5</span>
          <span className="label">天連續登入 · 明天 +6</span>
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
        <button key={t.id} className={`tab ${tab === t.id ? 'active' : ''} ${t.phase2 ? 'locked' : ''}`} onClick={() => !t.phase2 && setTab(t.id)}>
            {t.label}
            {t.phase2 && <span className="coming-soon-pill" style={{ marginLeft: 4, fontSize: 9, padding: '1px 6px' }}>Phase 2</span>}
          </button>
        )}
      </div>

      {tab !== 'daily' ?
      <div style={{ padding: '40px 20px', textAlign: 'center', color: '#888' }}>
          <div style={{ fontSize: 48, opacity: .4, marginBottom: 10 }}>🔒</div>
          <h3 style={{ fontSize: 14, color: '#222', marginBottom: 4 }}>{tab === 'week' ? '週任務' : '月任務'}</h3>
          <p style={{ fontSize: 12 }}>Phase 2 即將開放</p>
        </div> :

      <div className="mission-list">
          {missions.daily.map((m) =>
        <div key={m.id} className="mission-card">
              <div className="icon">{m.icon}</div>
              <div className="body">
                <h4>{m.title}</h4>
                <div className="reward">獎勵：{m.reward}</div>
                <div className="progress"><div style={{ width: `${m.progress / m.total * 100}%` }}></div></div>
                <div className="progress-text">{m.progress}/{m.total}</div>
              </div>
              <button className={`claim ${m.claimed ? 'done' : m.progress < m.total ? 'locked' : ''}`}>
                {m.claimed ? '已領' : m.progress < m.total ? '進行中' : '領取'}
              </button>
            </div>
        )}
        </div>
      }
    </div>);

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
            <div style={{ fontSize: 12, fontWeight: 500, opacity: .85 }}>SDK 接管 · 15 秒後可跳過</div>
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
              <p>{reward.id === 'snack' ? '拖到夥伴身上 HP +3' : reward.id === 'brush' ? '拖到夥伴身上 潔淨 +10' : '拖到夥伴身上 心情 +' + (reward.id === 'feather' ? '8' : '6')}</p>
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

  return (
    <div className="screen p7">
      <StatusBar />
      <div className="header">
        <h2>圖鑑</h2>
        <div className="en">DEX · 2026</div>
      </div>

      <div className="year-banner">
        <div className="countdown-row">
          <span className="dot"></span>
          <span className="text">月底前 <b>5 天</b> · 6 月份角色尚未選入年度</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
          <button className="btn-primary" style={{ padding: '8px 18px', fontSize: 13, boxShadow: 'none' }} onClick={() => onOpenPicker && onOpenPicker()}>選擇 6 月角色</button>
          <div className="swap-pill" onClick={() => setScreen('p11')} style={{ cursor: 'pointer' }}>🎫 剩餘更換 3 次</div>
        </div>
      </div>

      <div className="section-h">
        <span>年度收藏 · 12 / 月</span>
        <span className="meta">每月限選 1 個</span>
      </div>
      <div className="year-grid">
        {months.map((mo) =>
        <div key={mo.m} className={`year-cell ${mo.filled ? 'filled' : ''} ${mo.current ? 'current' : ''} ${mo.locked ? 'locked' : ''}`}>
            <span className="month">{String(mo.m).padStart(2, '0')}</span>
            {mo.filled && <><span className="icon">{mo.icon}</span><span style={{ fontSize: 9, opacity: .6 }}>#{mo.code}</span></>}
            {mo.current && <span style={{ fontSize: 20, marginTop: 4 }}>?</span>}
            {mo.locked && <span style={{ fontSize: 14, marginTop: 4, opacity: .3 }}>🔒</span>}
          </div>
        )}
      </div>

      <div className="section-h">
        <span>本月解鎖 · 6 月小海龜</span>
        <span className="meta">{states.filter((s) => s.unlocked).length}/9</span>
      </div>
      <div className="month-grid" style={{ paddingBottom: 100 }}>
        {states.map((s) =>
        <div key={s.code} className={`state-card ${s.unlocked ? 'unlocked' : 'locked'} ${s.legendary ? 'legendary' : ''}`} onClick={() => setScreen('p11')}>
            <span className="code">#{s.code}</span>
            {s.unlocked ? <>
              <img className="turtle" src="assets/sea-turtle.svg" alt="" style={{ filter: s.tint || 'none' }} />
              <span className="name">{s.name}</span>
              {s.legendary && <span className="rarity">✦ 傳說</span>}
            </> : <>
              <img className="turtle" src="assets/sea-turtle.svg" alt="" />
              <span className="name" style={{ opacity: .4 }}>??? ???</span>
              <span className="lock" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>🔒</span>
            </>}
          </div>
        )}
      </div>

    </div>);

};

/* ═══════════════ P8 · Profile (Me · 我的) ═══════════════ */
const P8Profile = ({ setScreen, state }) => {
  const featureGroups = [
  {
    title: '遊戲功能',
    en: 'GAME',
    items: [
    { icon: '🐢', label: '角色狀態', sub: `HP ${state.stats.hp} · 潔淨 ${state.stats.clean} · 心情 ${state.stats.mood}`, go: 'p1' },
    { icon: '📖', label: '圖鑑進度', sub: `已解鎖 ${state.dexStates.filter((s) => s.unlocked).length} / 9 種型態`, go: 'p7' },
    { icon: '🎒', label: '道具背包', sub: `${state.tools.length} 個道具`, go: 'p9' },
    { icon: '✅', label: '任務中心', sub: '每日任務 3 個進行中', go: 'p5' },
    { icon: '🛒', label: '商店', sub: `點數 ${state.points.toLocaleString()}`, go: 'p4' },
    { icon: 'pt', label: '點數明細', sub: '本月 +382 · 累積 8,720', go: null, comingSoon: true },
    { icon: '♻️', label: '回收紀錄', sub: '本月 12 次 · 累計 238 次', go: null, comingSoon: true }]

  },
  {
    title: '使用教學',
    en: 'GUIDE',
    items: [
    { icon: '🌱', label: '新手引導', sub: '認識三維屬性、餵食、進化', go: null, comingSoon: true },
    { icon: '📘', label: '玩法說明', sub: '每月選夥伴、圖鑑收藏', go: null, comingSoon: true },
    { icon: '💬', label: '常見問題', sub: '更換次數、過期道具、課金' }]

  },
  {
    title: '個人資訊 · 設定',
    en: 'ACCOUNT',
    items: [
    { icon: '👤', label: '會員資料', sub: '可可粉 · ECOCO_9999' },
    { icon: '🔔', label: '通知偏好', sub: '7 種推播類型可調整' },
    { icon: '🔒', label: '帳號管理', sub: '密碼 · 綁定 · 登出' },
    { icon: '📋', label: '服務條款 · 隱私權' }]

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

        <div className="pass-card">
          <span className="gem">💎</span>
          <div style={{ flex: 1 }}>
            <h3>月度通行證</h3>
            <p>解鎖進階互動 · NT$99/月</p>
          </div>
          <span className="coming-soon-pill" style={{ background: 'rgba(0,0,0,0.15)', color: '#1a1a1a' }}>Phase 2</span>
        </div>

        {featureGroups.map((group) =>
        <div key={group.title} style={{ marginTop: 18 }}>
            <div className="p8-group-h">
              <span>{group.title}</span>
              <span className="en">{group.en}</span>
            </div>
            <div className="menu">
              {group.items.map((it, i) =>
            <div key={i} className={`menu-item ${it.go || it.comingSoon ? 'tap-area' : ''}`}
            onClick={() => it.go && setScreen(it.go)}>
                  <span className="icon">
                    {it.icon === 'pt' ?
                <img src="assets/icon-ecoco-point.svg" alt="" width="20" height="20" /> :
                it.icon}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, color: '#222', fontSize: 14 }}>{it.label}</div>
                    {it.sub && <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{it.sub}</div>}
                  </div>
                  {it.comingSoon ?
              <span className="coming-soon-pill" style={{ background: '#F0F3F7', color: '#888' }}>即將推出</span> :
              <span className="arrow">›</span>}
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
          <div className="value-rise" style={{ top: -10, left: 90, color: '#FFB000' }}>+8 心情</div>
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
        <div className="pack-card" style={{ opacity: .6 }}>
          <div className="ribbon" style={{ background: '#888' }}>Phase 2</div>
          <h3>年度通行證</h3>
          <div className="qty" style={{ color: '#666' }}>無限<span> 次</span></div>
          <div className="desc">整年無限更換 + 每月免費解鎖 1 個未觸發狀態</div>
          <div className="price-row">
            <b style={{ color: '#999' }}>NT$ 999</b>
            <button className="buy" style={{ background: '#999' }}>即將推出</button>
          </div>
        </div>
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
  P8Profile, P9Bag, P9bToolAnim,
  P10Picker, P11Pack, P11PurchaseModal, P11SuccessModal,
  PNormalHome,
  ShopPurchaseModal, ShopSuccessModal, PointsSourceSheet,
});