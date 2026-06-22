import OptionList from './OptionList.jsx';

export default function ReviewScreen({ run, selections, index, onPrev, onNext, onBackToScores }) {
  const q = run[index];
  const selected = selections[index];
  const total = run.length;
  return (
    <div className="app">
      <p className="counter">Review · Q{index + 1} · {q.points} pt{q.points > 1 ? 's' : ''}</p>
      <h2>{q.text}</h2>
      <OptionList question={q} selected={selected} revealed onToggle={() => {}} />

      <div className="bottom-bar">
        <button onClick={onPrev} disabled={index === 0}>Prev</button>
        <button onClick={onBackToScores}>Go to Scores</button>
        <button onClick={onNext} disabled={index === total - 1}>Next</button>
      </div>
    </div>
  );
}
