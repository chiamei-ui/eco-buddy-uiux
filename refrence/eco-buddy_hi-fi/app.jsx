/* ECO BUDDY · main app */
const { useState, useEffect, useRef, useReducer, useCallback, useMemo } = React;

/* ───────── Default state ───────── */
const DEFAULT_STATE = {
  stats: { hp: 78, clean: 62, mood: 45 },
  points: 1280,
  adRemaining: 3,
  pity: 1,
  food: [
    { id:'hotdog-w1', name:'熱狗堡', emoji:'🌭', stock:2, state:'has' },
    { id:'hotdog-w2', name:'熱狗堡', emoji:'🌭', stock:12, state:'has' },
    { id:'hotdog-w3', name:'熱狗堡', emoji:'🌭', stock:2, state:'low' },
    { id:'hotdog-w4', name:'???',    emoji:'🌭', stock:0, state:'locked' },
  ],
  tools: [
    { id:'feather', name:'逗貓棒', emoji:'🪶', count:2, hoursLeft:18 },
    { id:'brush',   name:'梳子',   emoji:'🪮', count:1, hoursLeft:4  },
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
      const map = { feather:{key:'mood',v:8}, brush:{key:'clean',v:10}, ball:{key:'mood',v:6}, snack:{key:'hp',v:3} };
      const m = map[action.tool] || {key:'mood',v:5};
      return {
        ...state,
        stats:{...state.stats, [m.key]: Math.min(100, state.stats[m.key]+m.v)},
        tools: state.tools.map(t => t.id===action.tool ? {...t, count:Math.max(0,t.count-1)} : t).filter(t => t.count>0 || t.permanent),
      };
    }
    case 'ADD_TOOL': {
      const existing = state.tools.find(t=>t.id===action.tool.id);
      if (existing) return {...state, tools: state.tools.map(t => t.id===action.tool.id ? {...t, count:t.count+1} : t)};
      return {...state, tools:[...state.tools, {...action.tool, count:1, hoursLeft:24}], adRemaining: Math.max(0, state.adRemaining-1)};
    }
    case 'COLLECT_BATCH':
      return {
        ...state,
        stats: { ...state.stats, hp: Math.min(100, state.stats.hp + 15) },
        ...(!action.quotaFull && {
          food: state.food.map((f,i) => i<3 ? {...f, stock:f.stock + (i===0?3:i===1?2:1)} : f),
        }),
        points: state.points + 18,
      };
    case 'BUY':
      return {
        ...state,
        points: Math.max(0, state.points - action.item.price),
        tools: action.item.id.startsWith('food') || ['hotdog-pack','salad','berry','fish'].includes(action.item.id)
          ? state.tools
          : [...state.tools.filter(t=>t.id!==action.item.id), {id:action.item.id, name:action.item.name.split(' ')[0], emoji:action.item.emoji, count:(state.tools.find(t=>t.id===action.item.id)?.count||0)+1, hoursLeft:24*7}],
      };
    case 'REFILL_RESULT':
      // 補充站掃碼只寫入現實購買的 HP / 潔淨度回饋；App 不收取任何點數或現金
      return {
        ...state,
        stats: {
          ...state.stats,
          hp: Math.min(100, state.stats.hp + (action.hpGain||0)),
          clean: Math.min(100, state.stats.clean + (action.cleanGain||0)),
        },
      };
    case 'LOCK_DEX':
      return state; // could persist
    case 'RESET_STATS': return {...state, stats:action.stats};
    case 'SET_STOCK': return {...state, food: state.food.map((f,i)=>({...f, stock:action.stocks[i] ?? f.stock, state:action.stocks[i]===0?(f.state==='locked'?'locked':'low'):f.state}))};
    case 'CLEAR_BAG': return {...state, tools:[]};
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
  { code:'P0', id:'p0',    label:'一般模式-首頁', section:'主流程' },
  { code:'P1', id:'p1',    label:'夥伴首頁 · Hub' },
  { code:'P2', id:'p2',    label:'掃描 QR Code' },
  { code:'P2b',id:'p2b',   label:'回收結果頁' },
  { code:'P3', id:'p3',    label:'餵食動畫流程' },
  { code:'P12',id:'p12',   label:'補充站消費結果', section:'補充站 Loop' },
  { code:'P4', id:'p4',    label:'商店', section:'底部 Tab' },
  { code:'P5', id:'p5',    label:'任務' },
  { code:'P7', id:'p7',    label:'圖鑑' },
  { code:'P6', id:'p6',    label:'廣告 → 開箱', section:'道具' },
  { code:'P9', id:'p9',    label:'道具背包' },
  { code:'P9b',id:'p9b',   label:'道具使用動畫' },
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
    { trigger:'HP 低', msg:'快去回收！海龜餓壞了 🥺' },
    { trigger:'潔淨低', msg:'🛁 我想洗澡澡～' },
    { trigger:'心情低', msg:'好無聊喔，快來陪我玩！' },
    { trigger:'月底倒數', msg:'5 天後結算 · 還沒選 6 月夥伴喔' },
    { trigger:'道具即將過期', msg:'⏰ 你的逗貓棒還剩 6 小時！' },
    { trigger:'三值全滿', msg:'✨ 傳說型態解鎖！快來看看' },
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
  "hp": 78,
  "clean": 62,
  "mood": 45,
  "stock": "normal",
  "bagEmpty": false,
  "pushOnP1": "none",
  "showAllUnlocked": false
}/*EDITMODE-END*/;

const App = () => {
  const [screen, _setScreen] = useState('p1');
  const [screenPayload, setScreenPayload] = useState(null);
  const setScreen = useCallback((id, payload = null) => {
    _setScreen(id);
    setScreenPayload(payload);
  }, []);
  const [state, dispatch] = useReducer(stateReducer, DEFAULT_STATE);
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [pushKey, setPushKey] = useState(0);
  const dragManager = useDragManager();

  // sync tweak values into state
  useEffect(()=>{
    dispatch({type:'RESET_STATS', stats:{hp:tweaks.hp, clean:tweaks.clean, mood:tweaks.mood}});
  }, [tweaks.hp, tweaks.clean, tweaks.mood]);
  useEffect(()=>{
    if (tweaks.stock === 'empty') dispatch({type:'SET_STOCK', stocks:[0,0,0,0]});
    else if (tweaks.stock === 'low') dispatch({type:'SET_STOCK', stocks:[1,2,1,0]});
    else dispatch({type:'SET_STOCK', stocks:[2,12,2,0]});
  }, [tweaks.stock]);
  useEffect(()=>{
    if (tweaks.bagEmpty) dispatch({type:'CLEAR_BAG'});
  }, [tweaks.bagEmpty]);

  // push toast simulation on P1
  const [snackMsg, setSnackMsg] = useState(null);
  const showSnack = useCallback((msg) => setSnackMsg(msg), []);

  const [dexPickerOpen, setDexPickerOpen] = useState(false);
  const [pushVisible, setPushVisible] = useState(false);
  const pushTextMap = {
    none: null,
    hp: { msg:'快去回收！海龜餓壞了 🥺' },
    clean: { msg:'🛁 我想洗澡澡～' },
    mood: { msg:'好無聊喔，快來陪我玩！' },
    expire: { msg:'⏰ 你的逗貓棒還剩 6 小時！' },
  };
  useEffect(()=>{
    if (screen === 'p1' && tweaks.pushOnP1 !== 'none') {
      setPushVisible(true);
    } else setPushVisible(false);
  }, [screen, tweaks.pushOnP1, pushKey]);

  // show all unlocked dex tweak
  const effectiveState = useMemo(()=>{
    if (tweaks.showAllUnlocked) {
      return {...state, dexStates: state.dexStates.map(s=>({...s, unlocked:true}))};
    }
    return state;
  }, [state, tweaks.showAllUnlocked]);

  // map screen → tabbar active id (only show on tab pages)
  const tabbarActive = {
    p1:'buddy', p4:'shop', p5:'mission', p7:'dex', p9:'buddy'
  }[screen];

  const navFromTabbar = (id) => {
    setScreen({buddy:'p1', shop:'p4', mission:'p5', dex:'p7'}[id] || 'p1');
  };

  const renderScreen = () => {
    switch(screen){
      case 'push': return <PushDemo setScreen={setScreen} />;
      case 'p0':  return <PNormalHome setScreen={setScreen} />;
      case 'p1':  return <P1Home state={effectiveState} dispatch={dispatch} setScreen={setScreen} dragManager={dragManager} payload={screenPayload} />;
      case 'p2':  return <P2Scan setScreen={setScreen} dispatch={dispatch} />;
      case 'p2b': return <P2bResult setScreen={setScreen} dispatch={dispatch} state={effectiveState} />;
      case 'p3':  return <P3Feeding setScreen={setScreen} dispatch={dispatch} />;
      case 'p4':  return <P4Shop setScreen={setScreen} state={effectiveState} dispatch={dispatch} />;
      case 'p5':  return <P5Missions setScreen={setScreen} state={effectiveState} dispatch={dispatch} />;
      case 'p6':  return <P6Ads setScreen={setScreen} state={effectiveState} dispatch={dispatch} payload={screenPayload} />;
      case 'p7':  return <P7Dex setScreen={setScreen} state={effectiveState} dispatch={dispatch} onOpenPicker={() => setDexPickerOpen(true)} />;
      case 'p8':  return <P8Profile setScreen={setScreen} state={effectiveState} />;
      case 'p9':  return <P9Bag setScreen={setScreen} state={effectiveState} dispatch={dispatch} />;
      case 'p9b': return <P9bToolAnim setScreen={setScreen} />;
      case 'p10': return <P7Dex setScreen={setScreen} state={effectiveState} dispatch={dispatch} onOpenPicker={() => setDexPickerOpen(true)} />;
      case 'p11': return <P11Pack setScreen={setScreen} />;
      case 'p12': return <P12RefillResult setScreen={setScreen} state={effectiveState} dispatch={dispatch} payload={screenPayload} />;
      default: return null;
    }
  };

  return (
    <div className="stage">
      {/* Left rail */}
      <div className="stage-pane">
        <div className="stage-title">畫面導覽</div>
        <div className="stage-sub">點選任一畫面跳轉 · 共 15 個畫面</div>
        <ScreenNav screen={screen} setScreen={setScreen} />
      </div>

      {/* Center: iPhone */}
      <div className="stage-center">
        <div className="iphone">
          <div className="iphone-screen">
            <div className="iphone-notch"></div>
            {renderScreen()}
            {(dexPickerOpen || screen === 'p10') && (
              <P10Picker
                setScreen={setScreen}
                state={effectiveState}
                dispatch={dispatch}
                onClose={() => { setDexPickerOpen(false); if (screen === 'p10') setScreen('p7'); }}
              />
            )}
            {tabbarActive && <TabBar active={tabbarActive} onNav={navFromTabbar} />}
            {pushVisible && pushTextMap[tweaks.pushOnP1] && (
              <PushToast
                title="ECO BUDDY"
                msg={pushTextMap[tweaks.pushOnP1].msg}
                onClose={()=>setPushVisible(false)}
              />
            )}
            <SnackBar msg={snackMsg} onClose={()=>setSnackMsg(null)} />
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
          <p>📱 15 個畫面涵蓋 user-flow.md v1.5 全部 P1–P12 + 推播觸發</p>
          </div>
        </div>

        <div className="stage-title" style={{padding:'0 4px'}}>Tweaks · 即時調整</div>
        <InlineTweaks tweaks={tweaks} setTweak={setTweak} state={state} dispatch={dispatch} setScreen={setScreen} showSnack={showSnack} />
      </div>

      <DragGhost drag={dragManager.drag} hover={dragManager.hover} />
    </div>
  );
};

/* Tweaks inline panel inside the right rail (always visible, not host-driven) */
const InlineTweaks = ({ tweaks, setTweak, dispatch, setScreen, showSnack }) => {
  return (
    <div style={{
      background:'rgba(255,255,255,0.04)',
      border:'1px solid rgba(255,255,255,0.08)',
      borderRadius:20,padding:16,color:'#fff',
    }}>
      <div style={tweakLabel}>HP 生命值</div>
      <SliderRow value={tweaks.hp} onChange={v=>setTweak('hp',v)} />

      <div style={tweakLabel}>潔淨度</div>
      <SliderRow value={tweaks.clean} onChange={v=>setTweak('clean',v)} />

      <div style={tweakLabel}>心情值</div>
      <SliderRow value={tweaks.mood} onChange={v=>setTweak('mood',v)} />

      <div style={tweakLabel}>食物欄存量</div>
      <Segmented value={tweaks.stock} onChange={v=>setTweak('stock',v)}
        options={[{v:'normal',l:'正常'},{v:'low',l:'低'},{v:'empty',l:'歸零'}]} />

      <div style={tweakLabel}>道具背包</div>
      <Segmented value={tweaks.bagEmpty?'empty':'full'} onChange={v=>setTweak('bagEmpty', v==='empty')}
        options={[{v:'full',l:'有道具'},{v:'empty',l:'空背包'}]} />

      <div style={tweakLabel}>P1 推播提示</div>
      <Segmented value={tweaks.pushOnP1} onChange={v=>setTweak('pushOnP1',v)}
        options={[{v:'none',l:'無'},{v:'hp',l:'HP低'},{v:'clean',l:'潔淨低'},{v:'mood',l:'心情低'},{v:'expire',l:'過期'}]} />

      <div style={tweakLabel}>圖鑑全解鎖</div>
      <Segmented value={tweaks.showAllUnlocked?'on':'off'} onChange={v=>setTweak('showAllUnlocked', v==='on')}
        options={[{v:'off',l:'Phase 1'},{v:'on',l:'全部'}]} />

      <div style={{marginTop:14,paddingTop:14,borderTop:'1px solid rgba(255,255,255,0.1)'}}>
        <div style={tweakLabel}>快速跳轉</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
          <button onClick={()=>setScreen('p2')} style={tweakBtn}>▶ 掍描條碼（統一入口）</button>
          <button onClick={()=>setScreen('p12')} style={tweakBtn}>▶ 補充站消費結果</button>
          <button onClick={()=>setScreen('p6')} style={tweakBtn}>▶ 廣告開箱</button>
          <button onClick={()=>setScreen('p10')} style={tweakBtn}>▶ 月末選擇</button>
          <button onClick={()=>setScreen('push')} style={tweakBtn}>▶ 推播範例</button>
          <button onClick={()=>setScreen('p4')} style={tweakBtn}>▶ P4 商店（唯一金流）</button>
          <button onClick={()=>showSnack('積分已更新！本週回收 3 瓶，下次回收可獲雙倍積分 🎉')} style={{...tweakBtn, gridColumn:'1/-1'}}>▶ 測試 Snack Bar</button>
        </div>
      </div>
    </div>
  );
};

const tweakLabel = { fontSize:11, color:'rgba(255,255,255,0.55)', fontWeight:600, marginBottom:6, marginTop:10, letterSpacing:'.04em' };
const tweakBtn = { background:'rgba(255,255,255,0.08)', color:'#fff', padding:'8px 6px', borderRadius:8, fontSize:11, fontWeight:600, textAlign:'left', cursor:'pointer' };

const SliderRow = ({ value, onChange }) => (
  <div style={{display:'flex',alignItems:'center',gap:8}}>
    <input type="range" min="0" max="100" value={value} onChange={e=>onChange(+e.target.value)} style={{flex:1, accentColor:'var(--ecoco-orange)'}} />
    <span style={{fontFamily:'var(--font-en)',fontSize:13,fontWeight:800,color:'#fff',minWidth:30,textAlign:'right'}}>{value}</span>
  </div>
);
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
