import { scoreQuestion, tallyQuestion } from '../lib/scoring.js';

export default function ResultsScreen({ run, selections, onReview, onRetry }) {
  let correctSel = 0;
  let wrongSel = 0;
  let omitted = 0;
  let earned = 0;
  let max = 0;

  const rows = run.map((q, i) => {
    const sel = [...selections[i]];
    const t = tallyQuestion(q, sel);
    correctSel += t.correctSel;
    wrongSel += t.wrongSel;
    omitted += t.omitted;
    const s = scoreQuestion(q, sel);
    earned += s;
    max += q.points;
    return { i, id: q.id, score: s, points: q.points };
  });

  const fmt = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

  return (
    <div className="app">
      <h1>Results</h1>
      <p style={{ fontSize: '1.6rem' }}>
        Score: <strong>{fmt(earned)}</strong> / {max}
      </p>

      <div className="stats">
        <div className="stat"><b>{correctSel}</b>correct selections</div>
        <div className="stat"><b>{wrongSel}</b>wrong selections</div>
        <div className="stat"><b>{omitted}</b>missed correct answers</div>
      </div>

      <table>
        <thead>
          <tr><th>Question</th><th>Points</th></tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.i} onClick={() => onReview(r.i)}>
              <td>Q{r.i + 1}</td>
              <td>{fmt(r.score)}/{r.points}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <button className="primary" style={{ fontSize: '1.1rem', padding: '14px 28px' }} onClick={onRetry}>
          Try again
        </button>
      </div>
    </div>
  );
}
