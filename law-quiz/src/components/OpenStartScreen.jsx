import { useState } from 'react';
import ScalesLogo from './ScalesLogo.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import OpenInfo from './OpenInfo.jsx';
import ModeSwitch from './ModeSwitch.jsx';

const COUNT_STEPS = [5, 10, 20, 30, Infinity];

export default function OpenStartScreen({
  questionCount,
  setQuestionCount,
  totalQuestions,
  officialOnly,
  setOfficialOnly,
  onStart,
  onBackToClosed,
  theme,
  setTheme,
}) {
  const [showInfo, setShowInfo] = useState(false);
  const stepIndex = Math.max(0, COUNT_STEPS.indexOf(questionCount));
  const countLabel =
    questionCount === Infinity ? `All (${totalQuestions})` : questionCount;
  const fillPct = (stepIndex / (COUNT_STEPS.length - 1)) * 100;
  const sliderFill = `linear-gradient(to right, #fff 0%, #fff ${fillPct}%, #888 ${fillPct}%, #888 100%)`;

  return (
    <div className="start-screen">
      <ModeSwitch mode="open" onSelect={onBackToClosed} />
      <div className="start-topbar">
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <button
          className="icon-btn"
          onClick={() => setShowInfo(true)}
          aria-label="About open questions"
          title="About open questions"
        >
          i
        </button>
      </div>

      <div className="start-card">
        <div style={{ color: 'var(--accent)' }}>
          <ScalesLogo size={56} />
        </div>
        <h1>Law &amp; Data</h1>
        <p className="subtitle">open questions</p>

        <button className="primary" onClick={onStart}>
          Start practice
        </button>

        <div className="count-slider">
          <div className="count-slider-head">
            <span>Questions</span>
            <strong>{countLabel}</strong>
          </div>
          <input
            type="range"
            min="0"
            max={COUNT_STEPS.length - 1}
            step="1"
            value={stepIndex}
            style={{ background: sliderFill }}
            onChange={(e) =>
              setQuestionCount(COUNT_STEPS[Number(e.target.value)])
            }
          />
          <div className="count-slider-ticks">
            {COUNT_STEPS.map((s) => (
              <span key={s}>{s === Infinity ? 'All' : s}</span>
            ))}
          </div>
        </div>

        <label className="check">
          <input
            type="checkbox"
            checked={officialOnly}
            onChange={(e) => setOfficialOnly(e.target.checked)}
          />
          Official questions only
        </label>

        <a
          className="study-more"
          href="https://github.com/Giorgio-Cottini/law-data-resources/tree/main/ResourceHub"
          target="_blank"
          rel="noreferrer"
        >
          Exam Prep Resources <span className="arrow">→</span>
        </a>

        <div className="start-footer">
          <a
            className="glow"
            href="https://github.com/Giorgio-Cottini"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <span className="sep">·</span>
          <a
            className="netlify"
            href="https://www.netlify.com"
            target="_blank"
            rel="noreferrer"
          >
            Deploys on Netlify
          </a>
        </div>
      </div>

      {showInfo && (
        <OpenInfo showDisclaimer onClose={() => setShowInfo(false)} />
      )}
    </div>
  );
}
