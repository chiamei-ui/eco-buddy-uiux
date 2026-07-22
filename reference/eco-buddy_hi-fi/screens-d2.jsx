/* ECO BUDDY · D2 補充站消費結果 Loop
   v1.5 — 收瓶機與補充站共用 P2 掃描入口；P12 消費結果頁取消點點背景，動畫尾段加角色開心反應 */

/* ─── 補充站消費場次（mock）— 用戶已於實體補充站完成購買，掃碼帶入這筆消費資料 ─── */
const REFILL_SESSION = {
  name: '抗病毒洗衣精',
  emoji: '🧺',
  capacity: '500 ml',
  amount: 9999,
  hp: 99,
  clean: 99,
  location: '台南 仁德補充站',
  time: '2026.06.15 14:32',
};

/* ═══════════════ P12 · 補充站消費結果頁（滿版）═══════════════ */
const P12RefillResult = ({ setScreen, state, dispatch, payload, tweaks = {} }) => {
  const session = payload?.session || REFILL_SESSION;
  const [phase, setPhase] = useState('counting');
  const [showInfo, setShowInfo] = useState(false);
  const [showEvolve, setShowEvolve] = useState(false);

  useEffect(() => {
    dispatch({ type: 'REFILL_RESULT', hpGain: session.hp, cleanGain: session.clean });
    const t = setTimeout(() => setPhase('done'), 1600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase === 'done' && tweaks.p12Evolve) {
      const t = setTimeout(() => setShowEvolve(true), 800);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <div className="screen p12">
      {showEvolve && <EvolveOverlay onDone={() => setShowEvolve(false)} />}
      <StatusBar />
      {showInfo && (
        <div onClick={() => setShowInfo(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 20, padding: '24px 22px', width: '78%', maxWidth: 300 }}>
            <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 12, color: '#1a1a1a' }}>換算說明</div>
            <div style={{ fontSize: 13, lineHeight: 1.9, color: '#555' }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>補充站消費</div>
              <div>每消費 NT$10 = 體力 +10 ・ 潔淨 +10</div>
              <div style={{ fontSize: 11, color: '#888', marginTop: 8, lineHeight: 1.5 }}>
                註：體力與潔淨為兩條獨立帳本，數值相同也分開記錄。
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
        <img src="assets/p12-title.svg" className="rs-title" alt="" />
        <div className="rs-turtle">
          <TurtleImg style={{ width: 160, position: 'relative', zIndex: 1 }} />
          <div className="rs-spotlight" />
        </div>
      </div>
      <div className="result-panel">
        <div className="rp-info-row" onClick={() => setShowInfo(true)}>
          <span>謝謝你帶來</span>
          <span className="rp-count">{session.amount}</span>
          <span>元的能量</span>
          <span className="rp-info-btn">i</span>
        </div>
        <div className="rp-cards">
          <div className="rpc rpc--hp">
            <div className="rpc-icon-bg">
              <img src="assets/icon-hp.svg" alt="" />
            </div>
            <div className="rpc-right">
              <div className="rpc-label">體力</div>
              <div className="rpc-val">+{session.hp}</div>
            </div>
          </div>
          <div className="rpc rpc--clean">
            <div className="rpc-icon-bg">
              <img src="assets/icon-clean.svg" alt="" />
            </div>
            <div className="rpc-right">
              <div className="rpc-label">潔淨</div>
              <div className="rpc-val">+{session.clean}</div>
            </div>
          </div>
        </div>
        <div className="footer">
          <button className="btn-primary" disabled={phase !== 'done'} onClick={() => setScreen('p1', { cleanGain: session.clean })}>
            {phase === 'done' ? '完成' : '計算中…'}
          </button>
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
