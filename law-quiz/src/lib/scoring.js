export function correctIndices(question) {
  return question.options.reduce((acc, o, i) => {
    if (o.correct) acc.push(i);
    return acc;
  }, []);
}

export function scoreQuestion(question, selectedIndices) {
  const c = correctIndices(question).length;
  if (c === 0) return 0;
  const share = question.points / c;
  let raw = 0;
  for (const i of selectedIndices) {
    raw += question.options[i].correct ? share : -share;
  }
  return Math.max(0, Math.min(question.points, raw));
}

export function tallyQuestion(question, selectedIndices) {
  const selected = new Set(selectedIndices);
  let correctSel = 0;
  let wrongSel = 0;
  let omitted = 0;
  question.options.forEach((o, i) => {
    if (o.correct && selected.has(i)) correctSel += 1;
    else if (!o.correct && selected.has(i)) wrongSel += 1;
    else if (o.correct && !selected.has(i)) omitted += 1;
  });
  return { correctSel, wrongSel, omitted };
}
