import OptionList from './OptionList.jsx';

export default function QuizScreen({
  question, index, total, correctEach,
  selected, revealed, onToggle, onConfirm, onNext,
}) {
  const isLast = index === total - 1;
  return (
    <div className="app">
      <p className="counter">Q{index + 1} · {question.points} pt{question.points > 1 ? 's' : ''}</p>
      <h2>{question.text}</h2>
      <OptionList question={question} selected={selected} revealed={revealed} onToggle={onToggle} />

      <div className="bottom-bar">
        <span className="counter">{index + 1}/{total}</span>
        <span />
        {revealed
          ? <button className="primary" onClick={onNext}>{isLast ? 'See results' : 'Next'}</button>
          : <button className="primary" onClick={onConfirm}>Confirm</button>}
      </div>
    </div>
  );
}
