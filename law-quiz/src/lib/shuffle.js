export function shuffle(array, rng = Math.random) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function buildRun(questions, rng = Math.random) {
  return shuffle(questions, rng).map((q) => ({
    ...q,
    options: shuffle(q.options, rng).map((o) => ({ ...o })),
  }));
}
