import { useState } from 'react';
import OfficialBadge from './OfficialBadge.jsx';
import SuggestionList from './SuggestionList.jsx';
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

      <button className="link-btn" onClick={onToggleSuggestion}>
        {showSuggestion ? 'Hide suggestion' : 'Show suggestion'}
      </button>

      {showSuggestion && <SuggestionList suggestions={question.suggestions} />}

      <div className="bottom-bar">
        <span />
        <span />
        <button className="primary" onClick={onNext}>
          {isLast ? 'See summary' : 'Next'}
        </button>
      </div>

      {showInfo && <OpenInfo onClose={() => setShowInfo(false)} />}
    </div>
  );
}
