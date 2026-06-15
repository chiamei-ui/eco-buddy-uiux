/* ECO BUDDY · main app */
const { useState, useEffect, useRef, useReducer, useCallback, useMemo } = React;

/* ───────── Default state ───────── */
const DEFAULT_STATE = {
  stats: { hp: 78, clean: 62, mood: 45 },
  points: 1280,
  adRemaining: 5,
  swapLeft: 3,
  lockedMonthCode: null, // 本月鎖入的角色 code（#10 月末選擇）
  pity: 1,
  hasPass: false,
  sprintPurchased: false,
  ownedCosmetics: [],
  equippedCosmetic: null,
  food: [
    { id:'hotdog-w1', name:'熱狗堡', emoji:'🌭', stock:2, state:'has' },
    { id:'hotdog-w2', name:'熱狗堡', emoji:'🌭', stock:12, state:'has' },
    { id:'hotdog-w3', name:'熱狗堡', emoji:'🌭', stock:2, state:'low' },
    { id:'hotdog-w4', name:'???',    emoji:'🌭', stock:0, state:'locked' },
  ],
  tools: [
    { id:'ball',    name:'小球',   emoji:'⚾', count:1, hoursLeft:72 },
    { id:'feather', name:'逗貓棒', emoji:'🪶', count:2, hoursLeft:18 },
    { id:'brush',   name:'梳子',   emoji:'🪮', count:1, hoursLeft:0  },
  ],
  orderHistory: [
    { id: 'ORD-20260501', name: '月度通行證',   thumb: '🎫', price: 149, payMethod: 'Apple Pay',        date: '2026-05-01', status: 'success' },
    { id: 'ORD-20260515', name: '五月衝刺禮包', thumb: '🎁', price: 199, payMethod: '藍新 NewebPay',    date: '2026-05-15', status: 'pending' },
    { id: 'ORD-20260520', name: '五月衝刺禮包', thumb: '🎁', price: 199, payMethod: '信用卡',           date: '2026-05-20', status: 'failed', failReason: '信用卡授權失敗，請確認卡片額度是否充足' },
  ],
  pointsOrderHistory: [
    { id: 'PTS-20260601', name: '基礎食物補給包', thumb: '🌭', pointsCost: 80,  date: '2026-06-01 10:23' },
    { id: 'PTS-20260605', name: '逗貓棒',         thumb: '🪶', pointsCost: 120, date: '2026-06-05 15:47' },
  ],
  dexStates: [
    { code:'01', name:'瀕死邊緣', unlocked:true,  tint:'grayscale(0.5) brightness(0.7)' },
    { code:'07', name:'潔癖徹底', unlocked:true,  tint:'brightness(1.05) saturate(0.7)' },
    { code:'08', name:'高冷貴婦', unlocked:true,  tint:'hue-rotate(-10deg)' },
    { code:'13', name:'生活壓力', unlocked:true,  tint:'saturate(0.85)' },
    { code:'17', name:'都市精英', unlocked:true,  tint:'sepia(0.2)' },
    { code:'26', name:'雍容華貴', unlocked:false, tint:'hue-rotate(30deg) saturate(1.2)' },
    { code:'30', name:'芝芭大舞', unlocked:false },
    { code:'32', name:'彩虹之神', unlocked:false, legendary:true, tint:'hue-rotate(180deg) saturate(1.5)' },
    { code:'34', name:'科技武裝', unlocked:false, tint:'contrast(1.2) saturate(0.6)' },
  ],
};

function stateReducer(state, action){
  switch(action.type){
    case 'FEED':
      return {
        ...state,
        stats:{...state.stats, hp: Math.min(100, state.stats.hp + (action.hpGain||5))},
        food: action.food ? state.food.map(f => f.id===action.food ? {...f, stock:Math.max(0,f.stock-1)} : f) : state.food,
      };
    case 'USE_TOOL': {
      const effects = {
        feather: [{key:'mood',v:15}],
        brush:   [{key:'clean',v:15},{key:'mood',v:10}],
        ball:    [{key:'mood',v:15}],
        snack:   [{key:'hp',v:15},{key:'mood',v:15}],
      };
      const eff = effects[action.tool] || [{key:'mood',v:5}];
      let stats = {...state.stats};
      eff.forEach(({key,v}) => { stats[key] = Math.min(100, stats[key]+v); });
      return {
        ...state,
        stats,
        tools: state.tools.map(t => t.id===action.tool ? {...t, count:Math.max(0,t.count-1)} : t).filter(t => t.count>0 || t.permanent),
      };
    }
    case 'ADD_TOOL': {
      const existing = state.tools.find(t=>t.id===action.tool.id);
      if (existing) return {...state, tools: state.tools.map(t => t.id===action.tool.id ? {...t, count:t.count+1, isNew:true} : t)};
      return {...state, tools:[...state.tools, {...action.tool, count:1, hoursLeft:24, isNew:true}], adRemaining: Math.max(0, state.adRemaining-1)};
    }
    case 'CLEAR_NEW_TOOL':
      return {...state, tools: state.tools.map(t => t.id===action.id ? {...t, isNew:false} : t)};
    case 'COLLECT_BATCH':
      // 三帳本：體力 / 潔淨 / ECOCO 點數 各自獨立由 P2b 帶入
      return {
        ...state,
        stats: {
          ...state.stats,
          hp: Math.min(100, state.stats.hp + (action.hpGain || 0)),
          clean: Math.min(100, state.stats.clean + (action.cleanGain || 0)),
        },
        ...(!action.quotaFull && {
          food: state.food.map((f,i) => i<3 ? {...f, stock:f.stock + (i===0?3:i===1?2:1)} : f),
        }),
        points: state.points + (action.pointsGain || 0),
      };
    case 'BUY':
      if (action.item.id === 'monthly-pass') return { ...state, hasPass: true };
      if (action.item.id === 'sprint-pack') return { ...state, sprintPurchased: true };
      if (action.item.cashChannel === 'platform-iap') return { ...state, ownedCosmetics: [...(state.ownedCosmetics || []), action.item.id] };
      return {
        ...state,
        points: Math.max(0, state.points - action.item.price),
        tools: action.item.id.startsWith('food') || ['hotdog-pack','salad','berry','fish'].includes(action.item.id)
          ? state.tools
          : [...state.tools.filter(t=>t.id!==action.item.id), {id:action.item.id, name:action.item.name.split(' ')[0], emoji:action.item.emoji, count:(state.tools.find(t=>t.id===action.item.id)?.count||0)+1, hoursLeft:24*7}],
      };
    case 'REFILL_RESULT':
      // 補充站掃碼只寫入現實購買的 體力 / 潔淨 回饋；App 不收取任何點數或現金
      return {
        ...state,
        stats: {
          ...state.stats,
          hp: Math.min(100, state.stats.hp + (action.hpGain||0)),
          clean: Math.min(100, state.stats.clean + (action.cleanGain||0)),
        },
      };
    case 'LOCK_DEX':
      // #10 月末鎖入本月角色 → 寫入 lockedMonthCode，扣 1 次更換次數（首次鎖入免費）
      return {
        ...state,
        lockedMonthCode: action.code,
        swapLeft: state.lockedMonthCode ? Math.max(0, state.swapLeft - 1) : state.swapLeft,
      };
    case 'EQUIP_COSMETIC':
      return { ...state, equippedCosmetic: action.id };
    case 'RESET_STATS': return {...state, stats:action.stats};
    case 'SET_STAT': return {...state, stats:{...state.stats, [action.kind]: Math.min(100, Math.max(0, action.value))}};
    case 'SET_STOCK': return {...state, food: state.food.map((f,i)=>({...f, stock:action.stocks[i] ?? f.stock, state:action.stocks[i]===0?(f.state==='locked'?'locked':'low'):f.state}))};
    case 'CLEAR_BAG': return {...state, tools:[]};
    case 'FILL_TOOLS': return {...state, tools:[
      { id:'toy-d1', name:'小球',   emoji:'⚾', count:1, hoursLeft:72 },
      { id:'toy-d2', name:'逗貓棒', emoji:'🪶', count:2, hoursLeft:18 },
      { id:'toy-d3', name:'魚玩具', emoji:'🐟', count:1, hoursLeft:48 },
      { id:'toy-d4', name:'毛線球', emoji:'🧶', count:1, hoursLeft:36 },
      { id:'toy-d5', name:'雷射筆', emoji:'🔦', count:1, hoursLeft:24 },
      { id:'toy-d6', name:'貓薄荷', emoji:'🌿', count:1, hoursLeft:12 },
    ]};
    case 'TOUCH':
      // #2 觸碰角色：心情 +1，每日上限由 caller (P1Home) 自行追蹤
      return { ...state, stats: { ...state.stats, mood: Math.min(100, state.stats.mood + 1) } };
    case 'DECAY': {
      // #4 衰減：每日 -5%（三維同步），預設 1 天，可由 action.days 指定
      const days = action.days || 1;
      const drop = 5 * days;
      return {
        ...state,
        stats: {
          hp:    Math.max(0, state.stats.hp    - drop),
          clean: Math.max(0, state.stats.clean - drop),
          mood:  Math.max(0, state.stats.mood  - drop),
        },
      };
    }
    case 'PURCHASE_CASH':
      return {
        ...state,
        orderHistory: [{ id: action.id, name: action.name, thumb: action.thumb, price: action.price, payMethod: action.payMethod, date: action.date, status: 'success' }, ...state.orderHistory],
      };
    case 'PURCHASE_POINTS':
      return {
        ...state,
        pointsOrderHistory: [{ id: action.id, name: action.name, thumb: action.thumb, pointsCost: action.pointsCost, date: action.date }, ...state.pointsOrderHistory],
      };
    case 'CLAIM_MISSION':
      // #21 日常任務獎勵：食物 ×1 + 心情 +3（食物加在第一個未鎖食物格）
      return {
        ...state,
        stats: { ...state.stats, mood: Math.min(100, state.stats.mood + 3) },
        food: (() => {
          const idx = state.food.findIndex(f => f.state !== 'locked');
          if (idx < 0) return state.food;
          return state.food.map((f, i) => i === idx ? { ...f, stock: f.stock + 1 } : f);
        })(),
      };
    default: return state;
  }
}

/* ───────── Drag manager hook ───────── */
function useDragManager(){
  const [drag, setDrag] = useState(null); // {payload, x, y, target}
  const [hover, setHover] = useState(null);
  const dropHandlerRef = useRef(null);

  const startDrag = useCallback((e, payload, dropHandler) => {
    e.preventDefault?.();
    setDrag({ payload, x: e.clientX, y: e.clientY });
    dropHandlerRef.current = dropHandler;
  }, []);

  useEffect(()=>{
    if (!drag) return;
    const move = (e) => {
      const target = document.elementFromPoint(e.clientX, e.clientY);
      const dropTarget = target?.closest('[data-drop-target]');
      setHover(dropTarget?.dataset.dropTarget || null);
      setDrag(d => d ? {...d, x:e.clientX, y:e.clientY} : null);
    };
    const up = (e) => {
      const target = document.elementFromPoint(e.clientX, e.clientY);
      const dropTarget = target?.closest('[data-drop-target]');
      const turtleEl = target?.closest('[data-turtle]') || dropTarget;
      if (turtleEl && dropHandlerRef.current) {
        const rect = turtleEl.getBoundingClientRect();
        const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        dropHandlerRef.current(drag.payload, pos);
      }
      setDrag(null);
      setHover(null);
      dropHandlerRef.current = null;
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return ()=>{ window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
  }, [drag]);

  return { startDrag, drag, hover, setHover };
}

/* ───────── Drag ghost (cursor follower) ───────── */
const DragGhost = ({ drag, hover }) => {
  if (!drag) return null;
  return (
    <div className={`drag-ghost ${hover?'over-target':''}`} style={{left:drag.x, top:drag.y}}>
      {drag.payload.emoji || '?'}
    </div>
  );
};

/* ───────── Screen nav (left rail) ───────── */
const SCREENS = [
  { code:'A',  id:'push',  label:'推播觸發', section:'入口' },
  { code:'OB', id:'p0a',   label:'新手引導 Overlay', section:'新手引導' },
  { code:'P0', id:'p0',    label:'一般模式-首頁', section:'主流程' },
  { code:'P1', id:'p1',    label:'夥伴首頁 · Hub' },
  { code:'P2', id:'p2',    label:'機台條碼' },
  { code:'P2b',id:'p2b',   label:'帶禮物回家結果' },
  { code:'P12',id:'p12',   label:'補充站消費結果', section:'補充站 Loop' },
  { code:'P4', id:'p4',    label:'商店', section:'底部 Tab' },
  { code:'P5', id:'p5',    label:'今日陪伴' },
  { code:'P7', id:'p7',    label:'夥伴日誌' },
  { code:'P6', id:'p6',    label:'廣告 → 開箱', section:'道具' },
  { code:'P9', id:'p9',    label:'道具背包' },
  { code:'P10',id:'p10',   label:'月末選擇彈窗', section:'收藏' },
  { code:'P11',id:'p11',   label:'更換次數包', phase:'partial' },
  { code:'P8', id:'p8',    label:'我的', section:'帳號' },
];

const ScreenNav = ({ screen, setScreen }) => (
  <div className="screen-nav">
    {SCREENS.map((s,i)=>(
      <React.Fragment key={s.id}>
        {s.section && <div className="screen-nav-section">{s.section}</div>}
        <div className={`screen-nav-item ${screen===s.id?'active':''}`} onClick={()=>setScreen(s.id)}>
          <span className="code">{s.code}</span>
          <span className="label">{s.label}</span>
        </div>
      </React.Fragment>
    ))}
  </div>
);

/* ───────── Push notification entry mock ───────── */
const PushDemo = ({ setScreen }) => {
  const samples = [
    { trigger:'體力低', msg:'Buddy 在等你～肚子咕嚕咕嚕' },
    { trigger:'潔淨低', msg:'Buddy 偷偷說：我有點臭臭的' },
    { trigger:'心情低', msg:'Buddy 在發呆，需要你' },
    { trigger:'月底倒數', msg:'6 月快結束了，要把這個 Buddy 收進日誌嗎？' },
    { trigger:'道具即將過期', msg:'逗貓棒還能讓 Buddy 玩 6 小時' },
    { trigger:'三值全滿', msg:'你的 Buddy 變得不一樣了…' },
  ];
  return (
    <div className="screen" style={{background:'#0B0E27',color:'#fff'}}>
      <StatusBar light />
      <div style={{padding:'70px 22px 24px'}}>
        <div style={{fontFamily:'var(--font-en)',fontSize:11,letterSpacing:'.14em',color:'rgba(255,255,255,0.5)',fontWeight:700}}>PUSH NOTIFICATIONS</div>
        <h2 style={{fontSize:24,fontWeight:900,marginTop:4,color:'#fff'}}>系統推播範例</h2>
        <p style={{fontSize:13,color:'rgba(255,255,255,0.6)',marginTop:6}}>點任一則 → 進入夥伴首頁</p>
      </div>
      <div style={{padding:'0 14px',display:'flex',flexDirection:'column',gap:12}}>
        {samples.map((s,i)=>(
          <div key={i} className="push-toast" style={{position:'static',animation:'none'}} onClick={()=>setScreen('p1')}>
            <div className="app-icon">e</div>
            <div className="body">
              <div className="title-row"><span>ECO BUDDY</span><span className="time">{s.trigger}</span></div>
              <div className="msg">{s.msg}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{padding:'20px',textAlign:'center',color:'rgba(255,255,255,0.4)',fontSize:11,marginTop:'auto'}}>
        實際上線會由角色狀態自動觸發 · 文案可後台動態調整
      </div>
    </div>
  );
};

/* ───────── Top-level App ───────── */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "viewportSize": "md",
  "shopPhase": 1,
  "p2DemoType": "recycle",
  "p2ErrKind": null,
  "p2bQuotaFull": false,
  "p2bEvolve": false,
  "p1Evolve": false,
  "p12Evolve": false,
  "shopSprint": false,
  "sprintPrice": null,
  "passPrice": null,
  "sprintDaysLeft": null
}/*EDITMODE-END*/;

const P8_SUBS = new Set(['p8-faq', 'p4-orders']);
const TAB_ORDER = ['p1','p4','p5','p7'];
const VIEWPORT_SIZE_OPTIONS = [
  { v:'sm', l:'小 360×780' },
  { v:'md', l:'中 390×844' },
  { v:'lg', l:'大 430×932' },
];

const App = () => {
  const [screen, _setScreen] = useState('p1');
  const screenRef = useRef('p1');
  const [screenPayload, setScreenPayload] = useState(null);
  const [slideDir, setSlideDir] = useState(null);
  const setScreen = useCallback((id, payload = null, opts = {}) => {
    const from = screenRef.current;
    let dir = opts.dir;
    if (dir === undefined) {
      if (P8_SUBS.has(id) || from === 'p8') dir = 'forward';
      else if (id === 'p8' && P8_SUBS.has(from)) dir = 'back';
      else dir = null;
    }
    setSlideDir(dir);
    screenRef.current = id;
    _setScreen(id);
    setScreenPayload(payload);
  }, []);
  const [state, dispatch] = useReducer(stateReducer, DEFAULT_STATE);
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const dragManager = useDragManager();

  const [dexPickerOpen, setDexPickerOpen] = useState(false);

  // map screen → tabbar active id (only show on tab pages)
  const tabbarActive = {
    p1:'buddy', p4:'shop', p5:'mission', p7:'dex', p9:'buddy', p0a:'buddy', 'wardrobe-manage':'buddy'
  }[screen];

  const navFromTabbar = (id) => {
    const target = {buddy:'p1', shop:'p4', mission:'p5', dex:'p7'}[id] || 'p1';
    const fromIdx = TAB_ORDER.indexOf(screenRef.current);
    const toIdx = TAB_ORDER.indexOf(target);
    let dir = null;
    if (fromIdx >= 0 && toIdx >= 0 && fromIdx !== toIdx) {
      dir = toIdx > fromIdx ? 'forward' : 'back';
    }
    setScreen(target, null, { dir });
  };

  const renderScreen = () => {
    switch(screen){
      case 'push': return <PushDemo setScreen={setScreen} />;
      case 'p0a': return <P1Home state={state} dispatch={dispatch} setScreen={setScreen} dragManager={dragManager} payload={null} showTutorial={true} onTutorialDone={() => setScreen('p1')} />;
      case 'p0':  return <PNormalHome setScreen={setScreen} />;
      case 'p1':  return <P1Home state={state} dispatch={dispatch} setScreen={setScreen} dragManager={dragManager} payload={screenPayload} tweaks={tweaks} />;
      case 'p2':  return <P2Scan setScreen={setScreen} dispatch={dispatch} tweaks={tweaks} setTweak={setTweak} />;
      case 'p2b': return <P2bResult setScreen={setScreen} dispatch={dispatch} state={state} tweaks={tweaks} setTweak={setTweak} />;
      case 'p4':  return <P4Shop setScreen={setScreen} state={state} dispatch={dispatch} tweaks={tweaks} payload={screenPayload} />;
      case 'p5':  return <P5Missions setScreen={setScreen} state={state} dispatch={dispatch} tweaks={tweaks} />;
      case 'p6':  return <P6Ads setScreen={setScreen} state={state} dispatch={dispatch} payload={screenPayload} />;
      case 'p7':  return <P7Dex setScreen={setScreen} state={state} dispatch={dispatch} onOpenPicker={() => setDexPickerOpen(true)} tweaks={tweaks} />;
      case 'p8':         return <P8Profile setScreen={setScreen} state={state} tweaks={tweaks} />;
      case 'p9':  return <P9Bag setScreen={setScreen} state={state} dispatch={dispatch} />;
      case 'wardrobe-manage': return <WardrobeManage setScreen={setScreen} state={state} dispatch={dispatch} />;
      case 'p10': return <P7Dex setScreen={setScreen} state={state} dispatch={dispatch} onOpenPicker={() => setDexPickerOpen(true)} tweaks={tweaks} />;
      case 'p11': return <P11Pack setScreen={setScreen} />;
      case 'p12': return <P12RefillResult setScreen={setScreen} state={state} dispatch={dispatch} payload={screenPayload} tweaks={tweaks} />;
      case 'p4-orders': return <P4Orders setScreen={setScreen} state={state} payload={screenPayload} tweaks={tweaks} />;
      case 'p8-faq':     return <P8Faq setScreen={setScreen} />;
      default: return null;
    }
  };

  return (
    <div className="stage">
      {/* Left rail */}
      <div className="stage-pane">
        <div className="stage-title">畫面導覽</div>
        <div className="stage-sub">點選任一畫面跳轉 · 共 16 個畫面</div>
        <ScreenNav screen={screen} setScreen={setScreen} />
      </div>

      {/* Center: iPhone */}
      <div className="stage-center">
        <div className={`iphone iphone-${tweaks.viewportSize || 'md'}`}>
          <div className="iphone-screen">
            <div className="iphone-notch"></div>
            <div key={screen} className={slideDir ? `screen-slide-${slideDir}` : undefined} onAnimationEnd={() => setSlideDir(null)} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
              {renderScreen()}
            </div>
            {(dexPickerOpen || screen === 'p10') && (
              <P10Picker
                setScreen={setScreen}
                state={state}
                dispatch={dispatch}
                onClose={() => { setDexPickerOpen(false); if (screen === 'p10') setScreen('p7'); }}
              />
            )}
            {tabbarActive && <TabBar active={tabbarActive} onNav={navFromTabbar} />}
          </div>
        </div>
      </div>

      {/* Right rail: Tweaks */}
      <div className="stage-pane" style={{padding:0,background:'none',border:0}}>
        <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:20,padding:16,marginBottom:12}}>
          <div className="stage-title">原型說明</div>
          <div style={{fontSize:12,color:'rgba(255,255,255,0.7)',lineHeight:1.55}}>
            <p style={{marginBottom:6}}>🤏 <b>拖曳食物/道具</b>到海龜身上即可餵食/使用</p>
            <p style={{marginBottom:6}}>👆 <b>點擊海龜</b>觸發「觸摸」反應動畫</p>
            <p style={{marginBottom:6}}>🚫 錯誤操作會出現對話框提示</p>
            <p style={{marginBottom:6}}>📷 <b>掍描條碼</b>為統一入口：收瓶機 / 補充站可同一按鈕辨識</p>
          <p style={{marginBottom:6}}>💳 活動社群內唯一金流入口為 P4 商店 · 補充站不涉及付款</p>
          <p>📱 15 個畫面涵蓋 user-flow.md v1.7 全部 P1–P12 + 推播觸發</p>
          </div>
        </div>

        <div className="stage-title" style={{padding:'0 4px'}}>Tweaks · 即時調整</div>
        <InlineTweaks tweaks={tweaks} setTweak={setTweak} setScreen={setScreen} state={state} dispatch={dispatch} screen={screen} />
      </div>

      <DragGhost drag={dragManager.drag} hover={dragManager.hover} />
    </div>
  );
};

/* Tweaks inline panel inside the right rail (always visible, not host-driven) */
const P2_ERR_OPTIONS = [
  { id:'qrBlur',    label:'無法辨識' },
  { id:'qrExpired', label:'已過期' },
  { id:'qrUsed',    label:'已使用' },
  { id:'camDenied', label:'相機權限' },
  { id:'netFail',   label:'網路失敗' },
];

const TweakDivider = () => (
  <div style={{marginTop:10,paddingTop:10,borderTop:'1px solid rgba(255,255,255,0.08)'}} />
);

const StatSliders = ({ state, dispatch }) => (
  <>
    <div style={tweakLabel}>三維數值</div>
    {[
      { kind:'hp',    label:'體力', color:'#D4251C' },
      { kind:'clean', label:'潔淨', color:'#060E9F' },
      { kind:'mood',  label:'心情', color:'#FFCE00' },
    ].map(({ kind, label, color }) => (
      <div key={kind} style={{marginBottom:8}}>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:'rgba(255,255,255,0.7)',marginBottom:3}}>
          <span style={{fontWeight:600}}>{label}</span>
          <span style={{fontVariantNumeric:'tabular-nums'}}>{state.stats[kind]}%</span>
        </div>
        <input type="range" min={0} max={100} step={1}
          value={state.stats[kind]}
          onChange={e => dispatch({ type:'SET_STAT', kind, value:Number(e.target.value) })}
          style={{width:'100%',accentColor:color,cursor:'pointer'}}
        />
      </div>
    ))}
  </>
);

const InlineTweaks = ({ tweaks, setTweak, setScreen, state, dispatch, screen }) => {
  const isP1  = screen === 'p1' || screen === 'p0a';
  const isP2  = screen === 'p2';
  const isP2b = screen === 'p2b';
  const isP4  = screen === 'p4';
  const isP5  = screen === 'p5';
  const isP12 = screen === 'p12';
  const isP7  = screen === 'p7' || screen === 'p10';
  const isP8       = screen === 'p8';
  const isP4Orders = screen === 'p4-orders';
  const showStats = isP1 || isP2b || isP12 || isP7;
  const hasContent = isP1 || isP2 || isP2b || isP4 || isP5 || isP12 || isP7 || isP8 || isP4Orders;

  return (
    <div style={{
      background:'rgba(255,255,255,0.04)',
      border:'1px solid rgba(255,255,255,0.08)',
      borderRadius:20,padding:16,color:'#fff',
    }}>

      <div style={tweakLabel}>手機尺寸檢查</div>
      <Segmented
        value={tweaks.viewportSize || 'md'}
        onChange={v => setTweak('viewportSize', v)}
        options={VIEWPORT_SIZE_OPTIONS}
      />
      <div style={{fontSize:10,color:'rgba(255,255,255,0.35)',marginTop:4,lineHeight:1.4}}>
        只調整 hi-fi 手機框，方便檢查小 / 中 / 大螢幕差異。
      </div>
      <TweakDivider />

      {/* 開發範圍：僅在影響 Phase 的畫面顯示 */}
      {(isP4 || isP5) && (
        <>
          <div style={tweakLabel}>商店上線階段 (shopPhase)</div>
          <Segmented
            value={tweaks.shopPhase === 2 ? '2' : '1'}
            onChange={v => setTweak('shopPhase', Number(v))}
            options={[{v:'1',l:'Phase 1 封測'},{v:'2',l:'Phase 2 正式'}]}
          />
          <div style={{fontSize:10,color:'rgba(255,255,255,0.3)',marginTop:4,lineHeight:1.4}}>
            Phase 1：禮包/裝扮 Coming Soon，僅點數可購。Phase 2：開放金流。
          </div>
        </>
      )}

      {/* 三維數值 slider */}
      {showStats && (
        <>
          {(isP4 || isP5) && <TweakDivider />}
          <StatSliders state={state} dispatch={dispatch} />
        </>
      )}

      {/* P7 專屬 */}
      {isP7 && (
        <div style={{marginTop:10,paddingTop:10,borderTop:'1px solid rgba(255,255,255,0.08)'}}>
          <div style={tweakLabel}>上線階段 (shopPhase)</div>
          <Segmented
            value={tweaks.shopPhase === 2 ? '2' : '1'}
            onChange={v => setTweak('shopPhase', Number(v))}
            options={[{v:'1',l:'Phase 1 封測'},{v:'2',l:'Phase 2 正式'}]}
          />
          <div style={{fontSize:10,color:'rgba(255,255,255,0.3)',marginTop:4,lineHeight:1.4}}>
            Phase 1：夥伴日誌只顯示小海龜。Phase 2：開放北極熊、海豹、亮寶多角色。
          </div>
        </div>
      )}

      {/* P1 專屬 */}
      {isP1 && (
        <>
          <div style={tweakLabel}>商店上線階段 (shopPhase)</div>
          <Segmented
            value={tweaks.shopPhase === 2 ? '2' : '1'}
            onChange={v => setTweak('shopPhase', Number(v))}
            options={[{v:'1',l:'Phase 1 封測'},{v:'2',l:'Phase 2 正式'}]}
          />
          <div style={{fontSize:10,color:'rgba(255,255,255,0.3)',marginTop:4,lineHeight:1.4}}>
            Phase 1：換衣間顯示「即將推出」。Phase 2：顯示已購裝扮列表。
          </div>
          <div style={{marginTop:10,paddingTop:10,borderTop:'1px solid rgba(255,255,255,0.08)'}}>
            <div style={tweakLabel}>模擬裝扮持有</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
              <button onClick={()=>dispatch({ type:'BUY', item:{ id:'star-hat', cashChannel:'platform-iap' } })} style={tweakBtn}>＋⭐ 星辰帽</button>
              <button onClick={()=>dispatch({ type:'BUY', item:{ id:'crystal-bow', cashChannel:'platform-iap' } })} style={tweakBtn}>＋🎀 蝴蝶結</button>
              <button onClick={()=>dispatch({ type:'BUY', item:{ id:'rainbow-halo', cashChannel:'platform-iap' } })} style={tweakBtn}>＋🌈 彩虹光暈</button>
              <button onClick={()=>dispatch({ type:'EQUIP_COSMETIC', id:null })} style={{...tweakBtn, background:'rgba(255,255,255,0.06)'}}>脫下裝扮</button>
            </div>
          </div>
          <div style={{marginTop:10,paddingTop:10,borderTop:'1px solid rgba(255,255,255,0.08)'}}>
            <div style={tweakLabel}>模擬玩具箱</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
              <button onClick={()=>dispatch({ type:'FILL_TOOLS' })} style={tweakBtn}>填入 6 個道具</button>
              <button onClick={()=>dispatch({ type:'CLEAR_BAG' })} style={{...tweakBtn, background:'rgba(255,255,255,0.06)'}}>清空</button>
            </div>
          </div>
          <div style={{marginTop:10,paddingTop:10,borderTop:'1px solid rgba(255,255,255,0.08)'}}>
            <div style={tweakLabel}>衰減模擬 · 每日 -5%</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:6}}>
              <button onClick={()=>dispatch({ type:'DECAY', days:1 })} style={tweakBtn}>-1 天</button>
              <button onClick={()=>dispatch({ type:'DECAY', days:3 })} style={tweakBtn}>-3 天</button>
              <button onClick={()=>dispatch({ type:'DECAY', days:7 })} style={tweakBtn}>-7 天</button>
            </div>
            <div style={{fontSize:10,color:'rgba(255,255,255,0.3)',marginTop:4,lineHeight:1.4}}>
              7 天 ≈ 35% 下降，三維低於 30% 會觸發召回推播
            </div>
          </div>
          <div style={{marginTop:10,paddingTop:10,borderTop:'1px solid rgba(255,255,255,0.08)'}}>
            <div style={tweakLabel}>變身觸發（餵食後）</div>
            <Segmented
              value={tweaks.p1Evolve ? 'yes' : 'no'}
              onChange={v => setTweak('p1Evolve', v === 'yes')}
              options={[{v:'no',l:'不觸發'},{v:'yes',l:'觸發變身'}]}
            />
          </div>
        </>
      )}

      {/* P2 專屬 */}
      {isP2 && (
        <>
          <div style={tweakLabel}>模擬掃碼來源</div>
          <Segmented
            value={tweaks.p2DemoType || 'recycle'}
            onChange={v => setTweak({ p2DemoType: v, p2ErrKind: null })}
            options={[{v:'recycle',l:'♻️ 收瓶機'},{v:'refill',l:'💧 補充站'}]}
          />
          <div style={{fontSize:10,color:'rgba(255,255,255,0.3)',marginTop:4,lineHeight:1.4}}>
            同一入口：收瓶機 / 補充站 QR 自動識別後路由
          </div>
          <div style={{marginTop:10,paddingTop:10,borderTop:'1px solid rgba(255,255,255,0.08)'}}>
            <div style={tweakLabel}>錯誤情境（系統 toast）</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
              {P2_ERR_OPTIONS.map(o => (
                <button key={o.id}
                  onClick={() => setTweak('p2ErrKind', tweaks.p2ErrKind === o.id ? null : o.id)}
                  style={{
                    background: tweaks.p2ErrKind === o.id ? 'var(--ecoco-orange)' : 'rgba(255,255,255,0.08)',
                    color:'#fff', padding:'6px 10px', borderRadius:6, fontSize:11, fontWeight:600, cursor:'pointer',
                  }}>
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* P2b 專屬 */}
      {isP2b && (
        <div style={{marginTop:10,paddingTop:10,borderTop:'1px solid rgba(255,255,255,0.08)'}}>
          <div style={tweakLabel}>週配額情境</div>
          <Segmented
            value={tweaks.p2bQuotaFull ? 'full' : 'normal'}
            onChange={v => setTweak('p2bQuotaFull', v === 'full')}
            options={[{v:'normal',l:'配額未滿'},{v:'full',l:'本週已領完'}]}
          />
          <div style={{...tweakLabel, marginTop:8}}>變身觸發</div>
          <Segmented
            value={tweaks.p2bEvolve ? 'yes' : 'no'}
            onChange={v => setTweak('p2bEvolve', v === 'yes')}
            options={[{v:'no',l:'不觸發'},{v:'yes',l:'觸發變身'}]}
          />
        </div>
      )}

      {/* P12 專屬 */}
      {isP12 && (
        <div style={{marginTop:10,paddingTop:10,borderTop:'1px solid rgba(255,255,255,0.08)'}}>
          <div style={tweakLabel}>變身觸發（計數後）</div>
          <Segmented
            value={tweaks.p12Evolve ? 'yes' : 'no'}
            onChange={v => setTweak('p12Evolve', v === 'yes')}
            options={[{v:'no',l:'不觸發'},{v:'yes',l:'觸發變身'}]}
          />
        </div>
      )}

      {/* P4 專屬 */}
      {isP4 && (
        <>
          <div style={{marginTop:10,paddingTop:10,borderTop:'1px solid rgba(255,255,255,0.08)'}}>
            <div style={tweakLabel}>月底模式（22–28 日）</div>
            <Segmented
              value={tweaks.shopSprint ? 'sprint' : 'normal'}
              onChange={v => setTweak('shopSprint', v === 'sprint')}
              options={[{v:'normal',l:'一般'},{v:'sprint',l:'月底 22–28 日'}]}
            />
          </div>
          <div style={{marginTop:10,paddingTop:10,borderTop:'1px solid rgba(255,255,255,0.08)'}}>
            <div style={tweakLabel}>IAP 後台設定（模擬 CMS）</div>
            <div style={{fontSize:10,color:'rgba(255,255,255,0.35)',marginBottom:8,lineHeight:1.5}}>
              以下值模擬後台可動態設定，前端不寫死
            </div>
            {[
              { label:'衝刺禮包 NT$', key:'sprintPrice', def:199 },
              { label:'通行證 NT$',   key:'passPrice',   def:149 },
              { label:'衝刺倒數天數', key:'sprintDaysLeft', def:6, min:1, max:7 },
            ].map(({ label, key, def, min=1, max=9999 }) => (
              <div key={key} style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
                <span style={{fontSize:11,color:'rgba(255,255,255,0.7)'}}>{label}</span>
                <input type="number" min={min} max={max}
                  value={tweaks[key] ?? def}
                  onChange={e => setTweak(key, Number(e.target.value))}
                  style={{width:64,background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.15)',
                    borderRadius:6,color:'#fff',fontSize:12,padding:'4px 6px',textAlign:'right'}} />
              </div>
            ))}
          </div>
        </>
      )}

      {/* P4 購買紀錄專屬 */}
      {isP4Orders && (
        <>
          <div style={tweakLabel}>上線階段 (shopPhase)</div>
          <Segmented
            value={tweaks.shopPhase === 2 ? '2' : '1'}
            onChange={v => setTweak('shopPhase', Number(v))}
            options={[{v:'1',l:'Phase 1 封測'},{v:'2',l:'Phase 2 正式'}]}
          />
          <div style={{fontSize:10,color:'rgba(255,255,255,0.3)',marginTop:4,lineHeight:1.4}}>
            Phase 1：只有點數 Tab。Phase 2：加開現金 Tab。
          </div>
        </>
      )}

      {/* P8 / P8-Wardrobe 專屬 */}
      {isP8 && (
        <>
          <div style={tweakLabel}>商店上線階段 (shopPhase)</div>
          <Segmented
            value={tweaks.shopPhase === 2 ? '2' : '1'}
            onChange={v => setTweak('shopPhase', Number(v))}
            options={[{v:'1',l:'Phase 1 封測'},{v:'2',l:'Phase 2 正式'}]}
          />
          <div style={{fontSize:10,color:'rgba(255,255,255,0.3)',marginTop:4,lineHeight:1.4}}>
            Phase 1：裝扮功能尚未開放，入口停用。Phase 2：我的裝扮全功能。
          </div>
          <div style={{marginTop:10,paddingTop:10,borderTop:'1px solid rgba(255,255,255,0.08)'}}>
            <div style={tweakLabel}>模擬裝扮持有</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
              <button
                onClick={() => dispatch({ type: 'BUY', item: { id:'star-hat', cashChannel:'platform-iap' } })}
                style={tweakBtn}>＋⭐ 星辰帽</button>
              <button
                onClick={() => dispatch({ type: 'BUY', item: { id:'crystal-bow', cashChannel:'platform-iap' } })}
                style={tweakBtn}>＋🎀 蝴蝶結</button>
              <button
                onClick={() => dispatch({ type: 'BUY', item: { id:'rainbow-halo', cashChannel:'platform-iap' } })}
                style={tweakBtn}>＋🌈 彩虹光暈</button>
              <button
                onClick={() => dispatch({ type: 'EQUIP_COSMETIC', id: null })}
                style={{...tweakBtn, background:'rgba(255,255,255,0.06)'}}>脫下裝扮</button>
            </div>
          </div>
        </>
      )}

      {/* 無相關 tweaks 的畫面 */}
      {!hasContent && (
        <div style={{fontSize:11,color:'rgba(255,255,255,0.3)',lineHeight:1.6}}>
          此畫面沒有可調整的參數。
        </div>
      )}

      {/* 快速跳轉：永遠顯示 */}
      <div style={{marginTop:10,paddingTop:10,borderTop:'1px solid rgba(255,255,255,0.08)'}}>
        <div style={tweakLabel}>快速跳轉</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
          <button onClick={()=>setScreen('p2')} style={tweakBtn}>▶ 掃描條碼</button>
          <button onClick={()=>setScreen('p12')} style={tweakBtn}>▶ 補充站結果</button>
          <button onClick={()=>setScreen('p6')} style={tweakBtn}>▶ 廣告開箱</button>
          <button onClick={()=>setScreen('p10')} style={tweakBtn}>▶ 月末選擇</button>
          <button onClick={()=>setScreen('push')} style={tweakBtn}>▶ 推播範例</button>
          <button onClick={()=>setScreen('p4')} style={tweakBtn}>▶ P4 商店</button>
        </div>
      </div>
    </div>
  );
};

const tweakLabel = { fontSize:11, color:'rgba(255,255,255,0.55)', fontWeight:600, marginBottom:6, marginTop:10, letterSpacing:'.04em' };
const tweakBtn = { background:'rgba(255,255,255,0.08)', color:'#fff', padding:'8px 6px', borderRadius:8, fontSize:11, fontWeight:600, textAlign:'left', cursor:'pointer' };

const Segmented = ({ value, onChange, options }) => (
  <div style={{display:'flex',background:'rgba(0,0,0,0.3)',borderRadius:8,padding:2,gap:2}}>
    {options.map(o=>(
      <button key={o.v} onClick={()=>onChange(o.v)} style={{
        flex:1, padding:'6px 4px', fontSize:11, fontWeight:700,
        borderRadius:6, background:value===o.v?'var(--ecoco-orange)':'transparent',
        color:value===o.v?'#fff':'rgba(255,255,255,0.6)', cursor:'pointer',
      }}>{o.l}</button>
    ))}
  </div>
);

/* mount */
ReactDOM.createRoot(document.getElementById('app')).render(<App/>);
