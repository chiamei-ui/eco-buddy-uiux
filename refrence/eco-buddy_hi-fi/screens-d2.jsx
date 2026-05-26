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
  const [hpDisplay, setHpDisplay] = useState(state.stats.hp);
  const [cleanDisplay, setCleanDisplay] = useState(state.stats.clean);
  const hpStart = useRef(state.stats.hp).current;
  const cleanStart = useRef(state.stats.clean).current;
  const hpTarget = Math.min(100, hpStart + session.hp);
  const cleanTarget = Math.min(100, cleanStart + session.clean);

  useEffect(() => {
    // 沒有金流：僅把現實購買回饋的 HP/潔淨度寫入 state
    dispatch({ type: 'REFILL_RESULT', hpGain: session.hp, cleanGain: session.clean });
    const dur = 1400;
    const start = Date.now();
    const iv = setInterval(() => {
      const t = Math.min(1, (Date.now() - start) / dur);
      const ease = 1 - Math.pow(1 - t, 3);
      setHpDisplay(Math.round(hpStart + (hpTarget - hpStart) * ease));
      setCleanDisplay(Math.round(cleanStart + (cleanTarget - cleanStart) * ease));
      if (t >= 1) {
        clearInterval(iv);
        setTimeout(() => setPhase('done'), 200);
      }
    }, 33);
    return () => clearInterval(iv);
  }, []);

  // 計數結束 → 角色開心反應（沿用既有 touched 點擊反應動畫，1s 後自動回 Idle）
  useEffect(() => {
    if (phase === 'done') {
      setHappy(true);
      const t = setTimeout(() => setHappy(false), 1000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <div className="screen p12">
      <StatusBar />

      {/* Hero — 結構對齊 P2b */}
      <div className="hero">
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
              <span className="lbl">HP</span>
              <b>+{session.hp}</b>
            </div>
            <div className="g clean">
              <span className="lbl">潔淨</span>
              <b>+{session.clean}</b>
            </div>
          </div>
        </div>

        <div className="no-charge-note">
          ⓘ 金流已於補充站完成 · App 不收取費用
        </div>
      </div>

      {/* 角色 + 雙數值動畫 */}
      <div className="result-body">
        <div className="turtle-row">
          <TurtleImg className={happy ? 'touched' : ''} style={{ width: 130 }} />
          {happy && <SpeechBubble text="香噴噴～感謝你帶我去補充站！" style={{ top: 12, right: -8 }} />}
        </div>

        <div className="bars">
          <div className="bar-card hp-card">
            <div className="bar-head">
              <span className="lbl">❤️ HP</span>
              <span className="val"><b>{hpDisplay}</b>/100</span>
            </div>
            <div className="bar">
              <div className="fill" style={{ width: `${hpDisplay}%` }}></div>
              <div className="from-mark" style={{ left: `${hpStart}%` }}></div>
            </div>
            <div className="gain">+{session.hp}</div>
          </div>
          <div className="bar-card clean-card">
            <div className="bar-head">
              <span className="lbl">✨ 潔淨</span>
              <span className="val"><b>{cleanDisplay}</b>/100</span>
            </div>
            <div className="bar">
              <div className="fill" style={{ width: `${cleanDisplay}%` }}></div>
              <div className="from-mark" style={{ left: `${cleanStart}%` }}></div>
            </div>
            <div className="gain">+{session.clean}</div>
          </div>
        </div>
      </div>

      <div className="footer">
        <button className="btn-primary" disabled={phase !== 'done'} onClick={() => setScreen('p1')}>
          {phase === 'done' ? '返回首頁' : '計算中…'}
        </button>
        <div className="meta-note">
          進化判斷將於動畫結束後執行 · 不與計數同步觸發
        </div>
      </div>
    </div>
  );
};

/* ───── Export ───── */
Object.assign(window, {
  REFILL_SESSION,
  P12RefillResult,
});
