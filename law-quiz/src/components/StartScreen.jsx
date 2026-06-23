import { useState } from "react";
import ScalesLogo from "./ScalesLogo.jsx";
import ScoringInfo from "./ScoringInfo.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import GithubBounce from "./GithubBounce.jsx";

function GithubIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function NetlifyIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="#32E6E2"
      aria-hidden="true"
    >
      <path d="M12 1.5 22.5 12 12 22.5 1.5 12 12 1.5z" />
    </svg>
  );
}

const COUNT_STEPS = [10, 15, 20, 25, Infinity];

export default function StartScreen({
  correctEach,
  setCorrectEach,
  questionCount,
  setQuestionCount,
  totalQuestions,
  onStart,
  theme,
  setTheme,
  onEggUnlock,
  onGoToOpen,
}) {
  const [showInfo, setShowInfo] = useState(false);
  const stepIndex = Math.max(0, COUNT_STEPS.indexOf(questionCount));
  const countLabel =
    questionCount === Infinity ? `All (${totalQuestions})` : questionCount;
  const fillPct = (stepIndex / (COUNT_STEPS.length - 1)) * 100;
  const sliderFill = `linear-gradient(to right, #fff 0%, #fff ${fillPct}%, #888 ${fillPct}%, #888 100%)`;
  return (
    <div className="start-screen">
      <GithubBounce onUnlock={onEggUnlock} />
      <button className="link-btn open-toggle" onClick={onGoToOpen}>
        Go to open questions →
      </button>
      <div className="start-topbar">
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <button
          className="icon-btn"
          onClick={() => setShowInfo(true)}
          aria-label="How scoring works"
          title="How scoring works"
        >
          i
        </button>
      </div>

      <div className="start-card">
        <div style={{ color: "var(--accent)" }}>
          <ScalesLogo size={56} />
        </div>
        <h1>Law &amp; Data</h1>
        <p className="subtitle">multiple choice quiz</p>

        <button className="primary" onClick={onStart}>
          Start test
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
              <span key={s}>{s === Infinity ? "All" : s}</span>
            ))}
          </div>
        </div>

        <label className="check">
          <input
            type="checkbox"
            checked={correctEach}
            onChange={(e) => setCorrectEach(e.target.checked)}
          />
          Correct each question
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
            <GithubIcon /> GitHub
          </a>
          <span className="sep">·</span>
          <a
            className="netlify"
            href="https://www.netlify.com"
            target="_blank"
            rel="noreferrer"
          >
            <NetlifyIcon /> Deploys on Netlify
          </a>
        </div>
      </div>

      {showInfo && <ScoringInfo onClose={() => setShowInfo(false)} />}
    </div>
  );
}
