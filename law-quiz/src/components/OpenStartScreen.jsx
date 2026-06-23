import { useState } from "react";
import ScalesLogo from "./ScalesLogo.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import OpenInfo from "./OpenInfo.jsx";
import ModeSwitch from "./ModeSwitch.jsx";
import SiteFooter from "./SiteFooter.jsx";

const COUNT_MIN = 10;
const COUNT_MAX = 34;
const COUNT_STEP = 2;
const OFFICIAL_MAX = 18;

export default function OpenStartScreen({
  questionCount,
  setQuestionCount,
  officialOnly,
  setOfficialOnly,
  onStart,
  onBackToClosed,
  theme,
  setTheme,
}) {
  const [showInfo, setShowInfo] = useState(false);
  const fillPct = ((questionCount - COUNT_MIN) / (COUNT_MAX - COUNT_MIN)) * 100;
  const sliderFill = `linear-gradient(to right, #fff 0%, #fff ${fillPct}%, #888 ${fillPct}%, #888 100%)`;

  function handleSlide(value) {
    setQuestionCount(value);
    // Dragging past the official ceiling drops the official-only restriction.
    if (value > OFFICIAL_MAX && officialOnly) setOfficialOnly(false);
  }

  function handleOfficialToggle(checked) {
    setOfficialOnly(checked);
    // Restricting to official questions caps the count at the official total.
    if (checked && questionCount > OFFICIAL_MAX) setQuestionCount(OFFICIAL_MAX);
  }

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
        <div style={{ color: "var(--accent)" }}>
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
            <strong>{questionCount}</strong>
          </div>
          <input
            type="range"
            min={COUNT_MIN}
            max={COUNT_MAX}
            step={COUNT_STEP}
            value={questionCount}
            style={{ background: sliderFill }}
            onChange={(e) => handleSlide(Number(e.target.value))}
          />
          <div className="count-slider-ticks">
            <span>{COUNT_MIN}</span>
            <span>{COUNT_MAX}</span>
          </div>
        </div>

        <label className="check">
          <input
            type="checkbox"
            checked={officialOnly}
            onChange={(e) => handleOfficialToggle(e.target.checked)}
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

        <SiteFooter />
      </div>

      {showInfo && (
        <OpenInfo showDisclaimer onClose={() => setShowInfo(false)} />
      )}
    </div>
  );
}
