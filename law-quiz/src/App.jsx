import { useState } from 'react';
import questions from './questions.json';
import { buildRun } from './lib/shuffle.js';
import { useTheme } from './hooks/useTheme.js';
import StartScreen from './components/StartScreen.jsx';
import QuizScreen from './components/QuizScreen.jsx';
import ResultsScreen from './components/ResultsScreen.jsx';
import ReviewScreen from './components/ReviewScreen.jsx';
import OpenStartScreen from './components/OpenStartScreen.jsx';
import OpenQuestionScreen from './components/OpenQuestionScreen.jsx';
import OpenSummaryScreen from './components/OpenSummaryScreen.jsx';
import openQuestions from './open_questions.json';
import { buildOpenRun } from './lib/openRun.js';

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
  const [eggUnlocked, setEggUnlocked] = useState(false);
  const [appMode, setAppMode] = useState('closed');
  const [openPhase, setOpenPhase] = useState('open-start');
  const [openCount, setOpenCount] = useState(Infinity);
  const [openOfficialOnly, setOpenOfficialOnly] = useState(false);
  const [openRun, setOpenRun] = useState([]);
  const [openCurrent, setOpenCurrent] = useState(0);
  const [openShowSuggestion, setOpenShowSuggestion] = useState(false);

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

  function startOpen() {
    const r = buildOpenRun(openQuestions, openCount, openOfficialOnly);
    setOpenRun(r);
    setOpenCurrent(0);
    setOpenShowSuggestion(false);
    setOpenPhase('open-question');
  }

  function openNext() {
    setOpenShowSuggestion(false);
    if (openCurrent === openRun.length - 1) setOpenPhase('open-summary');
    else setOpenCurrent((c) => c + 1);
  }

  if (appMode === 'open') {
    if (openPhase === 'open-start') {
      return (
        <OpenStartScreen
          questionCount={openCount}
          setQuestionCount={setOpenCount}
          totalQuestions={openQuestions.length}
          officialOnly={openOfficialOnly}
          setOfficialOnly={setOpenOfficialOnly}
          onStart={startOpen}
          onBackToClosed={() => setAppMode('closed')}
          theme={theme}
          setTheme={setTheme}
        />
      );
    }
    if (openPhase === 'open-question') {
      return (
        <OpenQuestionScreen
          question={openRun[openCurrent]}
          index={openCurrent}
          total={openRun.length}
          showSuggestion={openShowSuggestion}
          onToggleSuggestion={() => setOpenShowSuggestion((v) => !v)}
          onNext={openNext}
        />
      );
    }
    return (
      <OpenSummaryScreen
        run={openRun}
        onRestart={() => setOpenPhase('open-start')}
      />
    );
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
        onEggUnlock={() => setEggUnlocked(true)}
        onGoToOpen={() => setAppMode('open')}
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
        eggUnlocked={eggUnlocked}
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
