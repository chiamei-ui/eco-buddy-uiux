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

/* ───────── Stat ring (HP / clean / mood) — uses asset SVGs ───────── */
const StatPip = ({ kind, value, onClick }) => (
  <button className="stat-pip-img tap-area" onClick={onClick} aria-label={kind}
    style={{background:'transparent',border:0,padding:0,cursor:onClick?'pointer':'default'}}>
    <img src={`assets/btn/${kind}.svg`} width="40" height="40" alt={kind} draggable="false" />
  </button>
);

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
const SystemToast = ({ text, onClose, duration=2800, bottom=false }) => {
  useEffect(()=>{
    if(!text) return;
    const t = setTimeout(onClose, duration);
    return ()=>clearTimeout(t);
  }, [text, duration]);
  if(!text) return null;
  return (
    <div className={`sys-toast${bottom ? ' bottom' : ''}`} role="status" aria-live="polite">
      <div className="sys-toast-inner">
        <svg className="sys-toast-icon" viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
          <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" strokeWidth="1.6"/>
          <rect x="9.1" y="5" width="1.8" height="6.6" rx="0.9" fill="currentColor"/>
          <circle cx="10" cy="14.2" r="1.05" fill="currentColor"/>
        </svg>
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

/* ───────── Side action icons — 掍描條碼（收瓶機 / 補充站共用）+ 免費道具 ───────── */
const ScanBtnIcon = () => (
  <img src="assets/btn/scan.svg" alt="掃描條碼" width="64" draggable="false" style={{filter:'drop-shadow(0 6px 12px rgba(0,0,0,0.15))'}} />
);
const AdsBtnIcon = () => (
  <img src="assets/btn/ads.svg" alt="免費道具" width="64" draggable="false" style={{filter:'drop-shadow(0 6px 12px rgba(0,0,0,0.15))'}} />
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
  <button onClick={onClick} title="我的"
    style={{
      width:40,height:40,padding:0,
      background:'transparent',border:0,cursor:'pointer',
      borderRadius:'50%',
      boxShadow:'0 4px 12px rgba(6,14,159,0.3)',
    }}>
    <img src="assets/btn/avatar.svg" alt="我的" width="40" height="40" draggable="false" />
  </button>
);

/* ───────── Floating value-rise indicator (HP+5 etc) ───────── */
const ValueRise = ({ value, color, top, left }) => (
  <div className="value-rise" style={{top, left, color: color || '#FF4D63'}}>{value}</div>
);

/* ───────── Snack Bar (底部系統提示，導覽列上方 10px，10 秒自動消失) ───────── */
const SnackBar = ({ msg, onClose }) => {
  useEffect(()=>{
    if(!msg) return;
    const t = setTimeout(onClose, 10000);
    return ()=>clearTimeout(t);
  }, [msg, onClose]);
  if(!msg) return null;
  return (
    <div className="snackbar" role="status" aria-live="polite">
      <span className="snackbar-msg">{msg}</span>
      <button className="snackbar-close" onClick={onClose} aria-label="關閉">✕</button>
    </div>
  );
};

/* ───────── Export to window ───────── */
Object.assign(window, {
  StatusBar, StatPip, TurtleImg, TabBar,
  SpeechBubble, PushToast, ScanBtnIcon, AdsBtnIcon,
  SystemToast, SystemAlert,
  ModeToggle, ModeChip, AvatarButton, ValueRise,
  SnackBar,
});
