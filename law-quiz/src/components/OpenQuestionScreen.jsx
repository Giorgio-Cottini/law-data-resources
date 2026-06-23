import { useState } from 'react';
import OfficialBadge from './OfficialBadge.jsx';
import SuggestionList from './SuggestionList.jsx';
import SuggestionToggle from './SuggestionToggle.jsx';
import OpenInfo from './OpenInfo.jsx';

function limitLabel(question) {
  if (!question.limit) return null;
  return `Max ${question.limit} ${question.limitUnit}`;
}

export default function OpenQuestionScreen({
  question,
  index,
  total,
  showSuggestion,
  onToggleSuggestion,
  onPrev,
  onNext,
}) {
  const [showInfo, setShowInfo] = useState(false);
  const isLast = index === total - 1;
  const label = limitLabel(question);

  return (
    <div className="app">
      <div className="open-topbar">
        <span className="counter">{index + 1}/{total}</span>
        <button
          className="icon-btn"
          onClick={() => setShowInfo(true)}
          aria-label="About open questions"
          title="About open questions"
        >
          i
        </button>
      </div>

      <div className={`open-question ${question.official ? 'card-official' : 'card-unofficial'}`}>
        <OfficialBadge official={question.official} />
        <h2>{question.text}</h2>
        {label && <p className="limit-label">{label}</p>}
      </div>

      <SuggestionToggle
        open={showSuggestion}
        suggestions={question.suggestions}
        onClick={onToggleSuggestion}
      />

      {showSuggestion && <SuggestionList suggestions={question.suggestions} />}

      <div className="bottom-bar">
        <button className="secondary" onClick={onPrev} disabled={index === 0}>
          Previous
        </button>
        <span />
        <button className="primary" onClick={onNext}>
          {isLast ? 'See summary' : 'Next'}
        </button>
      </div>

      {showInfo && <OpenInfo onClose={() => setShowInfo(false)} />}
    </div>
  );
}
