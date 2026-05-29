/* ECO BUDDY · D2 補充站消費結果 Loop
   v1.5 — 收瓶機與補充站共用 P2 掃描入口；P12 消費結果頁取消點點背景，動畫尾段加角色開心反應 */

/* ─── 補充站消費場次（mock）— 用戶已於實體補充站完成購買，掃碼帶入這筆消費資料 ─── */
const REFILL_SESSION = {
  name: '抗病毒洗衣精',
  emoji: '🧺',
  capacity: '500 ml',
  hp: 20,
  clean: 25,
  location: '台南 仁德補充站',
  time: '2026.06.15 14:32',
};

/* ═══════════════ P12 · 洗劑消費結果頁（結構對齊 P2b · 滿版） ═══════════════ */
const P12RefillResult = ({ setScreen, state, dispatch, payload }) => {
  const session = payload?.session || REFILL_SESSION;
  const [phase, setPhase] = useState('counting'); // counting | done
  const [happy, setHappy] = useState(false);
  const [valueRises, setValueRises] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  const addRise = (txt, pos, color) => {
    const id = Math.random();
    setValueRises((prev) => [...prev, { id, txt, top: pos.y, left: pos.x, color }]);
    setTimeout(() => setValueRises((prev) => prev.filter((v) => v.id !== id)), 1400);
  };

  useEffect(() => {
    // 沒有金流：僅把現實購買回饋的 HP/潔淨度寫入 state
    dispatch({ type: 'REFILL_RESULT', hpGain: session.hp, cleanGain: session.clean });
    const t = setTimeout(() => setPhase('done'), 1600);
    return () => clearTimeout(t);
  }, []);

  // 計數結束 → 角色開心反應 + 數值浮起動畫
  useEffect(() => {
    if (phase === 'done') {
      setHappy(true);
      addRise(`+${session.hp} 精神`, { x: 40, y: 50 }, '#FF4D63');
      setTimeout(() => addRise(`+${session.clean} 清爽`, { x: 140, y: 70 }, '#1F3DBF'), 250);
      const t = setTimeout(() => setHappy(false), 2500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <div className="screen p12">
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
            <div style={{ fontSize: 13, lineHeight: 2, color: '#555' }}>
              <div>NT$10 = 精神 +10 + 清爽 +10</div>
            </div>
            <button
              onClick={() => setShowInfo(false)}
              style={{ marginTop: 18, width: '100%', padding: '10px 0', borderRadius: 99, background: '#FF5000', color: '#fff', border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
            >知道了</button>
          </div>
        </div>
      )}

      {/* Hero — 白底 */}
      <div className="hero" style={{ position: 'relative' }}>
        <button
          onClick={() => setShowInfo(true)}
          style={{ position: 'absolute', top: 10, right: 12, width: 22, height: 22, borderRadius: '50%', border: 'none', background: 'rgba(0,0,0,0.08)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, color: '#888', fontSize: 13, fontWeight: 700, fontFamily: 'serif', lineHeight: 1 }}
        >i</button>
        <div className="eyebrow">REFILL COMPLETE · 補充站消費</div>
        <h2>本次補充站消費完成！</h2>
        <div className="meta">
          <span className="dot"></span>
          {session.time} · {session.location}
        </div>

        <div className="purchased">
          <div className="thumb">{session.emoji}</div>
          <div className="info">
            <div className="n">{session.name}</div>
            <span className="cap-chip">{session.capacity}</span>
          </div>
          <div className="gain-preview">
            <div className="g hp">
              <span className="lbl">精神</span>
              <b>+{session.hp}</b>
            </div>
            <div className="g clean">
              <span className="lbl">清爽</span>
              <b>+{session.clean}</b>
            </div>
          </div>
        </div>

      </div>

      {/* 角色 IP 放大 + P1 風格數值浮起 + 對話框 */}
      <div className="result-body">
        <div className="turtle-row">
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <TurtleImg className={happy ? 'touched' : ''} style={{ width: 180 }} />
            {happy && <SpeechBubble text="香噴噴～感謝你帶我去補充站！" style={{ top: -72, right: -40 }} />}
            {valueRises.map((v) =>
              <div key={v.id} className="value-rise" style={{ top: v.top, left: v.left, color: v.color }}>{v.txt}</div>
            )}
          </div>
        </div>
      </div>

      <div className="footer">
        <button className="btn-primary" disabled={phase !== 'done'} onClick={() => setScreen('p1')}>
          {phase === 'done' ? '返回首頁' : '計算中…'}
        </button>
      </div>
    </div>
  );
};

/* ───── Export ───── */
Object.assign(window, {
  REFILL_SESSION,
  P12RefillResult,
});
