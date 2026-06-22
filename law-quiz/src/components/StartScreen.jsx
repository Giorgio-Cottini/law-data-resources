import { useState } from 'react';
import ScalesLogo from './ScalesLogo.jsx';
import ScoringInfo from './ScoringInfo.jsx';
import ThemeToggle from './ThemeToggle.jsx';

export default function StartScreen({ correctEach, setCorrectEach, onStart, theme, setTheme }) {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className="app">
      <div className="topbar">
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <button className="icon-btn" onClick={() => setShowInfo(true)} aria-label="How scoring works" title="How scoring works">
          i
        </button>
      </div>

      <div style={{ textAlign: 'center', marginTop: '15vh' }}>
        <div style={{ color: 'var(--accent)' }}>
          <ScalesLogo size={72} />
        </div>
        <h1>Law &amp; Data closed questions quiz</h1>

        <label style={{ display: 'inline-flex', gap: 8, alignItems: 'center', margin: '16px 0' }}>
          <input
            type="checkbox"
            checked={correctEach}
            onChange={(e) => setCorrectEach(e.target.checked)}
          />
          Correct each question
        </label>

        <div>
          <button className="primary" onClick={onStart}>Start test</button>
        </div>
      </div>

      {showInfo && <ScoringInfo onClose={() => setShowInfo(false)} />}
    </div>
  );
}
