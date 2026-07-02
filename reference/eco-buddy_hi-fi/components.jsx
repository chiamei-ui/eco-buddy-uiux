/* ECO BUDDY · Shared UI components */
const { useState, useEffect, useRef, useMemo, useCallback } = React;

/* ───────── Unified back button — fixed top-left ───────── */
const NavBack = ({ onClick, light = false }) => (
  <button className={`nav-back-btn${light ? ' light' : ''}`} onClick={onClick}>
    ‹ 返回
  </button>
);

/* ───────── Status bar (iOS time + battery) ───────── */
const StatusBar = ({ light=false }) => (
  <div className={`statusbar ${light?'light':''}`}>
    <span>9:41</span>
    <span className="icons">
      <svg width="18" height="10" viewBox="0 0 18 10" fill="currentColor"><rect x="0" y="6" width="3" height="4" rx="0.5"/><rect x="5" y="4" width="3" height="6" rx="0.5"/><rect x="10" y="2" width="3" height="8" rx="0.5"/><rect x="15" y="0" width="3" height="10" rx="0.5"/></svg>
      <svg width="16" height="11" viewBox="0 0 16 11" fill="none"><path d="M8 10.5C5.5 8 1 4 8 1c7 3 2.5 7 0 9.5z" stroke="currentColor" strokeWidth="1.2" fill="currentColor"/></svg>
      <svg width="26" height="11" viewBox="0 0 26 11" fill="none"><rect x="0.5" y="0.5" width="22" height="10" rx="2" stroke="currentColor"/><rect x="2" y="2" width="19" height="7" rx="1" fill="currentColor"/><rect x="23.5" y="3.5" width="2" height="4" rx="0.5" fill="currentColor"/></svg>
    </span>
  </div>
);

/* ───────── Stat ring (HP / clean / mood) — inline dynamic SVG ───────── */
const STAT_RING = {
  hp: {
    color: '#D4251C', bg: '#FFD0CE',
    icon: <path d="M24.8451 37.6392C25.1537 37.9464 25.6297 37.9464 25.9383 37.6392L36.0493 27.5578C37.6028 25.9883 38.5967 23.8659 38.7588 21.5871C39.1354 16.2476 34.9666 13.3991 32.006 13.0361C28.3026 12.5836 25.3891 16.538 25.3891 16.538C25.3891 16.538 22.4755 12.5836 18.7722 13.0361C15.8116 13.3991 11.6427 16.2476 12.0245 21.5927C12.1867 23.8715 13.1805 25.9939 14.7341 27.5633L24.8451 37.6392Z" fill="#D4251C"/>,
  },
  clean: {
    color: '#060E9F', bg: '#E2E3F0',
    icon: <path d="M31.4459 20.2052L23.5217 11L15.5976 20.2052C12.9233 23.3105 12.2587 27.6031 13.8614 31.409C15.4217 35.1137 18.7173 37.4852 22.6757 37.7537C22.9547 37.773 23.2373 37.7826 23.5217 37.7826C23.8062 37.7826 24.0888 37.773 24.3668 37.7537C28.3261 37.4852 31.6217 35.1137 33.1821 31.409C34.7848 27.6031 34.1201 23.3105 31.4459 20.2052ZM21.3934 32.8278C21.2176 33.1271 20.9018 33.2939 20.5778 33.2939C20.4167 33.2939 20.2528 33.2526 20.1037 33.166C18.4762 32.2211 17.6725 30.75 17.3393 29.9572C16.8606 28.8212 16.6801 27.5188 16.833 26.2906C16.8974 25.7769 17.3816 25.4144 17.8833 25.474C18.4007 25.5377 18.768 26.006 18.7035 26.5207C18.5912 27.4294 18.7238 28.3918 19.0773 29.2313C19.3203 29.8078 19.9003 30.8751 21.0537 31.5447C21.503 31.8054 21.6548 32.3801 21.3934 32.8278Z" fill="#060E9F"/>,
  },
  mood: {
    color: '#FFCE00', bg: '#FFFBEC',
    icon: <path fillRule="evenodd" clipRule="evenodd" d="M24.4348 12C17.5783 12 12 17.5782 12 24.4348C12 31.2914 17.5782 36.8696 24.4348 36.8696C31.2914 36.8696 36.8696 31.2914 36.8696 24.4348C36.8696 17.5782 31.2914 12 24.4348 12ZM31.1161 27.8936C30.3052 28.8814 29.2854 29.677 28.1301 30.2233C26.9748 30.7696 25.7127 31.0529 24.4347 31.0529C23.1568 31.0528 21.8947 30.7694 20.7394 30.2231C19.5842 29.6767 18.5644 28.881 17.7536 27.8932C17.6277 27.7335 17.5694 27.5308 17.5913 27.3286C17.6132 27.1264 17.7135 26.9408 17.8706 26.8117C18.0278 26.6826 18.2292 26.6202 18.4318 26.638C18.6344 26.6557 18.822 26.7522 18.9543 26.9067C19.6194 27.717 20.4559 28.3697 21.4036 28.8179C22.3513 29.2661 23.3865 29.4986 24.4348 29.4986C25.4831 29.4986 26.5184 29.2661 27.4661 28.8179C28.4138 28.3697 29.2503 27.717 29.9154 26.9067C30.0465 26.7482 30.2351 26.6481 30.4398 26.6285C30.6446 26.6088 30.8488 26.6711 31.0077 26.8017C31.1666 26.9323 31.2672 27.1206 31.2875 27.3252C31.3079 27.5299 31.2462 27.7343 31.1161 27.8936H31.1161ZM26.2388 22.2856V21.739C26.2388 20.5943 27.3064 19.663 28.6189 19.663C29.9313 19.663 30.999 20.5943 30.999 21.739V22.2858C30.999 22.492 30.9171 22.6896 30.7714 22.8354C30.6256 22.9811 30.4279 23.063 30.2218 23.063C30.0157 23.063 29.818 22.9811 29.6723 22.8354C29.5265 22.6896 29.4446 22.492 29.4446 22.2858V21.739C29.4446 21.4927 29.0915 21.2174 28.6189 21.2174C28.1463 21.2174 27.7931 21.4927 27.7931 21.739V22.2858C27.7931 22.492 27.7113 22.6896 27.5655 22.8354C27.4198 22.9811 27.2221 23.063 27.016 23.063C26.8098 23.063 26.6122 22.9811 26.4664 22.8354C26.3207 22.6896 26.2388 22.492 26.2388 22.2858V22.2856ZM17.8706 22.2856V21.739C17.8706 20.5943 18.9382 19.663 20.2507 19.663C21.5631 19.663 22.6308 20.5943 22.6308 21.739V22.2858C22.6308 22.492 22.5489 22.6896 22.4031 22.8354C22.2574 22.9811 22.0597 23.063 21.8536 23.063C21.6475 23.063 21.4498 22.9811 21.304 22.8354C21.1583 22.6896 21.0764 22.492 21.0764 22.2858V21.7389C21.0764 21.4927 20.7232 21.2173 20.2507 21.2173C19.7781 21.2173 19.4249 21.4927 19.4249 21.7389V22.2858C19.4249 22.4919 19.343 22.6896 19.1973 22.8353C19.0515 22.9811 18.8539 23.063 18.6477 23.063C18.4416 23.063 18.244 22.9811 18.0982 22.8353C17.9525 22.6896 17.8706 22.4919 17.8706 22.2858V22.2856Z" fill="#FFCE00"/>,
  },
};
const STAT_CIRC = 2 * Math.PI * 23;

const StatPip = ({ kind, value, onClick }) => {
  const { color, bg, icon } = STAT_RING[kind];
  const offset = STAT_CIRC * (1 - (value ?? 0) / 100);
  return (
    <button className="stat-pip-img tap-area" onClick={onClick} aria-label={kind}
      style={{background:'transparent',border:0,padding:0,cursor:onClick?'pointer':'default'}}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="23" stroke="#E6E6E6" strokeWidth="2"/>
        <circle cx="24" cy="24" r="23"
          stroke={color} strokeWidth="2" strokeLinecap="round"
          strokeDasharray={STAT_CIRC} strokeDashoffset={offset}
          transform="rotate(-90 24 24)" fill="none"/>
        <circle cx="24" cy="24" r="20" fill={bg}/>
        {icon}
      </svg>
    </button>
  );
};

/* ───────── Sea turtle SVG (inline so we can manipulate) ───────── */
const TurtleImg = ({ className='', style, onClick, ...rest }) => (
  <img src="assets/sea-turtle.svg" alt="海龜" className={`turtle-img ${className}`} style={style} onClick={onClick} draggable="false" {...rest} />
);

/* ───────── Bottom tab bar — uses nav asset SVG with overlaid hit zones ───────── */
const TabBar = ({ active, onNav }) => {
  const svgKey = active && ['buddy','shop','dex','mission'].includes(active) ? active : 'buddy';
  return (
    <div className="tabbar-img">
      <img src={`assets/nav/${svgKey}.svg`} alt="" draggable="false" />
      {/* Order in nav SVG: 夥伴 商店 任務 圖鑑 */}
      <button className="tab-hit" style={{left:'0%',width:'25%'}}  onClick={()=>onNav('buddy')}  aria-label="夥伴"></button>
      <button className="tab-hit" style={{left:'25%',width:'25%'}} onClick={()=>onNav('shop')}   aria-label="商店"></button>
      <button className="tab-hit" style={{left:'50%',width:'25%'}} onClick={()=>onNav('mission')}aria-label="今日陪伴"></button>
      <button className="tab-hit" style={{left:'75%',width:'25%'}} onClick={()=>onNav('dex')}    aria-label="夥伴日誌"></button>
    </div>
  );
};

/* ───────── Speech bubble (renders relative to parent) ───────── */
const SpeechBubble = ({ text, error=false, style, onClose }) => (
  <div className={`bubble ${error?'error':''} ${onClose?'closable':''}`} style={style}>
    {text}
    {onClose && <button className="bubble-close" onClick={onClose} aria-label="關閉">✕</button>}
  </div>
);

/* ───────── System Toast (iOS/Android-style 中性 toast, 用於 P2 等無角色場景) ───────── */
const SystemToast = ({ text, onClose, duration=2800, bottom=false, icon=true }) => {
  useEffect(()=>{
    if(!text) return;
    const t = setTimeout(onClose, duration);
    return ()=>clearTimeout(t);
  }, [text, duration]);
  if(!text) return null;
  return (
    <div className={`sys-toast${bottom ? ' bottom' : ''}`} role="status" aria-live="polite">
      <div className="sys-toast-inner">
        {icon && (
          <svg className="sys-toast-icon" viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
            <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" strokeWidth="1.6"/>
            <rect x="9.1" y="5" width="1.8" height="6.6" rx="0.9" fill="currentColor"/>
            <circle cx="10" cy="14.2" r="1.05" fill="currentColor"/>
          </svg>
        )}
        <span>{text}</span>
      </div>
    </div>
  );
};

/* ───────── System Alert (iOS-style alert dialog, 中性, 用於 P4 等無角色場景) ───────── */
const SystemAlert = ({ title, message, actions=[], onDismiss }) => (
  <div className="sys-alert-backdrop" onClick={onDismiss}>
    <div className="sys-alert" onClick={(e)=>e.stopPropagation()} role="alertdialog" aria-modal="true">
      <div className="sys-alert-head">
        {title && <h4>{title}</h4>}
        {message && <p>{message}</p>}
      </div>
      <div className="sys-alert-actions">
        {actions.map((a,i)=>(
          <button key={i} className={`sys-alert-btn ${a.primary?'primary':''} ${a.destructive?'destructive':''}`} onClick={a.onClick}>
            {a.label}
          </button>
        ))}
      </div>
    </div>
  </div>
);

/* ───────── Push toast ───────── */
const PushToast = ({ title, msg, onClose }) => {
  useEffect(()=>{
    const t = setTimeout(onClose, 5500);
    return ()=>clearTimeout(t);
  }, [onClose]);
  return (
    <div className="push-toast" onClick={onClose}>
      <div className="app-icon">e</div>
      <div className="body">
        <div className="title-row"><span>ECO BUDDY</span><span className="time">現在</span></div>
        <div className="msg">{msg}</div>
      </div>
    </div>
  );
};

/* ───────── Side action icons — 掃描條碼（收瓶機 / 補充站共用）+ 免費玩具 ───────── */
const ScanBtnIcon = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
    <img src="assets/btn/scan.svg" alt="掃描條碼" width="64" draggable="false" style={{filter:'drop-shadow(0 6px 12px rgba(0,0,0,0.15))'}} />
    <span style={{ fontSize: 11, fontWeight: 700, color: '#1a1a1a', letterSpacing: 0.5 }}>掃描條碼</span>
  </div>
);
const AdsBtnIcon = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
    <img src="assets/btn/ads.svg" alt="免費玩具" width="64" draggable="false" style={{filter:'drop-shadow(0 6px 12px rgba(0,0,0,0.15))'}} />
    <span style={{ fontSize: 11, fontWeight: 700, color: '#1a1a1a', letterSpacing: 0.5 }}>免費玩具</span>
  </div>
);

/* ───────── Mode chip — uses default-mode / game-mode asset ───────── */
const ModeChip = ({ mode='default' }) => (
  <img src={`assets/btn/${mode}-mode.svg`} alt={mode==='default'?'一般模式':'遊戲模式'} height="26" draggable="false" />
);

/* ───────── Mode toggle (e icon) ───────── */
const ModeToggle = ({ onClick }) => (
  <div className="mode-toggle" onClick={onClick} title="切換一般模式">
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
      <circle cx="16" cy="16" r="14" fill="#fff"/>
      <text x="16" y="22" fontFamily="'Noto Sans TC',sans-serif" fontWeight="900" fontSize="20" fill="#060E9F" textAnchor="middle">e</text>
    </svg>
  </div>
);

/* ───────── Avatar button — top-right entry to P8 ───────── */
const AvatarButton = ({ onClick }) => (
  <div style={{ position:'relative', display:'inline-block' }}>
    <button onClick={onClick} title="我的"
      style={{
        width:52, height:52, padding:0,
        background:'transparent', border:0, cursor:'pointer',
        borderRadius:'50%',
        boxShadow:'0 4px 12px rgba(6,14,159,0.3)',
      }}>
      <img src="assets/btn/avatar.svg" alt="我的" width="52" height="52" draggable="false" style={{ borderRadius:'50%' }} />
    </button>
    <div style={{ position:'absolute', bottom:-2, right:-2, width:17, height:17, pointerEvents:'none' }}>
      <img src="assets/btn/icon-_setting.svg" alt="" width="17" height="17" />
    </div>
  </div>
);

/* ───────── Floating value-rise indicator (HP+5 etc) ───────── */
const ValueRise = ({ value, icon, color, top, left }) => (
  <div className="value-rise" style={{top, left, color: color || '#FF4D63', display:'flex', alignItems:'center', gap:4}}>
    {icon && <img src={icon} style={{width:30,height:30,filter:'drop-shadow(0 1px 3px rgba(255,255,255,0.9))'}} alt="" />}
    <span>{value}</span>
  </div>
);

/* ───────── Export to window ───────── */
Object.assign(window, {
  StatusBar, StatPip, TurtleImg, TabBar,
  SpeechBubble, PushToast, ScanBtnIcon, AdsBtnIcon,
  SystemToast, SystemAlert,
  ModeToggle, ModeChip, AvatarButton, ValueRise,
});
