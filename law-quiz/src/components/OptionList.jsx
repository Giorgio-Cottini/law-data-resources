export default function OptionList({ question, selected, revealed, onToggle }) {
  return (
    <div>
      {question.options.map((opt, i) => {
        const isSel = selected.has(i);
        let mark = null;
        let cls = 'option';
        if (isSel) cls += ' selected';
        if (revealed) {
          if (isSel && opt.correct) mark = <span className="mark ok">✓</span>;
          else if (isSel && !opt.correct) mark = <span className="mark bad">✗</span>;
          else if (!isSel && opt.correct) {
            mark = <span className="mark ok">✓</span>;
            cls += ' correct-answer';
          } else {
            mark = <span className="mark" />;
          }
        } else {
          mark = <span className="mark">{isSel ? '◉' : '○'}</span>;
        }
        return (
          <button
            key={i}
            className={cls}
            onClick={() => !revealed && onToggle(i)}
            disabled={revealed}
          >
            {mark}
            <span>{opt.text}</span>
          </button>
        );
      })}
    </div>
  );
}
