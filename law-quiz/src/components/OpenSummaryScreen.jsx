import { useState } from 'react';
import OfficialBadge from './OfficialBadge.jsx';
import SuggestionList from './SuggestionList.jsx';
import OpenInfo from './OpenInfo.jsx';

function SummaryRow({ question }) {
  const [open, setOpen] = useState(false);
  return (
    <li className={question.official ? 'card-official' : 'card-unofficial'}>
      <div className="summary-row-head">
        <span>{question.text}</span>
        <OfficialBadge official={question.official} />
      </div>
      <button className="link-btn" onClick={() => setOpen((v) => !v)}>
        {open ? 'Hide suggestion' : 'Show suggestion'}
      </button>
      {open && <SuggestionList suggestions={question.suggestions} />}
    </li>
  );
}

export default function OpenSummaryScreen({ run, onRestart }) {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className="app">
      <div className="open-topbar">
        <h2>Questions asked</h2>
        <button
          className="icon-btn"
          onClick={() => setShowInfo(true)}
          aria-label="About open questions"
          title="About open questions"
        >
          i
        </button>
      </div>

      <ul className="summary-list">
        {run.map((q) => (
          <SummaryRow key={q.id} question={q} />
        ))}
      </ul>

      <div className="bottom-bar">
        <span />
        <span />
        <button className="primary" onClick={onRestart}>
          New set
        </button>
      </div>

      {showInfo && <OpenInfo onClose={() => setShowInfo(false)} />}
    </div>
  );
}
