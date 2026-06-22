import { useState } from 'react';
import questions from './questions.json';
import { buildRun } from './lib/shuffle.js';
import { useTheme } from './hooks/useTheme.js';
import StartScreen from './components/StartScreen.jsx';
import QuizScreen from './components/QuizScreen.jsx';
import ResultsScreen from './components/ResultsScreen.jsx';
import ReviewScreen from './components/ReviewScreen.jsx';

export default function App() {
  const { theme, setTheme } = useTheme();
  const [phase, setPhase] = useState('start');
  const [correctEach, setCorrectEach] = useState(true);
  const [questionCount, setQuestionCount] = useState(Infinity);
  const [run, setRun] = useState([]);
  const [selections, setSelections] = useState([]);
  const [current, setCurrent] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);

  function start() {
    const r = buildRun(questions, questionCount);
    setRun(r);
    setSelections(r.map(() => new Set()));
    setCurrent(0);
    setRevealed(false);
    setPhase('quiz');
  }

  function toggle(i) {
    setSelections((prev) => {
      const copy = prev.slice();
      const set = new Set(copy[current]);
      if (set.has(i)) set.delete(i); else set.add(i);
      copy[current] = set;
      return copy;
    });
  }

  function confirm() {
    if (correctEach) setRevealed(true);
    else advance();
  }

  function advance() {
    setRevealed(false);
    if (current === run.length - 1) setPhase('results');
    else setCurrent((c) => c + 1);
  }

  if (phase === 'start') {
    return (
      <StartScreen
        correctEach={correctEach}
        setCorrectEach={setCorrectEach}
        questionCount={questionCount}
        setQuestionCount={setQuestionCount}
        totalQuestions={questions.length}
        onStart={start}
        theme={theme}
        setTheme={setTheme}
      />
    );
  }

  if (phase === 'quiz') {
    return (
      <QuizScreen
        question={run[current]}
        index={current}
        total={run.length}
        correctEach={correctEach}
        selected={selections[current]}
        revealed={revealed}
        onToggle={toggle}
        onConfirm={confirm}
        onNext={advance}
      />
    );
  }

  if (phase === 'results') {
    return (
      <ResultsScreen
        run={run}
        selections={selections}
        onReview={(i) => { setReviewIndex(i); setPhase('review'); }}
        onRetry={() => setPhase('start')}
      />
    );
  }

  return (
    <ReviewScreen
      run={run}
      selections={selections}
      index={reviewIndex}
      onPrev={() => setReviewIndex((i) => Math.max(0, i - 1))}
      onNext={() => setReviewIndex((i) => Math.min(run.length - 1, i + 1))}
      onBackToScores={() => setPhase('results')}
    />
  );
}
