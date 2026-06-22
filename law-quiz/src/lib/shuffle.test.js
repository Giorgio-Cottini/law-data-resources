import { describe, it, expect } from 'vitest';
import { shuffle, buildRun } from './shuffle.js';

// Deterministic rng: returns a fixed sequence cycling through provided values.
function seededRng(values) {
  let i = 0;
  return () => values[i++ % values.length];
}

describe('shuffle', () => {
  it('does not mutate the input array', () => {
    const input = [1, 2, 3];
    shuffle(input, seededRng([0]));
    expect(input).toEqual([1, 2, 3]);
  });

  it('keeps the same elements', () => {
    const out = shuffle([1, 2, 3, 4], seededRng([0.1, 0.5, 0.9]));
    expect([...out].sort()).toEqual([1, 2, 3, 4]);
  });

  it('reorders deterministically given a fixed rng', () => {
    const a = shuffle([1, 2, 3, 4], seededRng([0, 0, 0]));
    const b = shuffle([1, 2, 3, 4], seededRng([0, 0, 0]));
    expect(a).toEqual(b);
  });
});

describe('buildRun', () => {
  const questions = [
    { id: 1, text: 'q1', points: 1, options: [{ text: 'a', correct: true }, { text: 'b', correct: false }] },
    { id: 2, text: 'q2', points: 2, options: [{ text: 'c', correct: false }, { text: 'd', correct: true }] },
  ];

  it('returns the same number of questions, preserving correct flags', () => {
    const run = buildRun(questions, seededRng([0]));
    expect(run).toHaveLength(2);
    const ids = run.map((q) => q.id).sort();
    expect(ids).toEqual([1, 2]);
    for (const q of run) {
      expect(q.options.some((o) => o.correct)).toBe(true);
    }
  });

  it('does not mutate the source questions', () => {
    const snapshot = JSON.stringify(questions);
    buildRun(questions, seededRng([0.3, 0.7]));
    expect(JSON.stringify(questions)).toBe(snapshot);
  });
});
