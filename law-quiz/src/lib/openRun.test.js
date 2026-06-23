import { describe, it, expect } from 'vitest';
import { buildOpenRun } from './openRun.js';

const seqRng = () => 0; // deterministic: Fisher-Yates with rng()=0 keeps order

const sample = [
  { id: 1, text: 'a', official: true, suggestions: [] },
  { id: 2, text: 'b', official: false, suggestions: [] },
  { id: 3, text: 'c', official: true, suggestions: [] },
];

describe('buildOpenRun', () => {
  it('returns all questions when no limit and officialOnly false', () => {
    const run = buildOpenRun(sample, Infinity, false, seqRng);
    expect(run).toHaveLength(3);
  });

  it('filters to official-only when requested', () => {
    const run = buildOpenRun(sample, Infinity, true, seqRng);
    expect(run.every((q) => q.official)).toBe(true);
    expect(run).toHaveLength(2);
  });

  it('respects the limit', () => {
    const run = buildOpenRun(sample, 1, false, seqRng);
    expect(run).toHaveLength(1);
  });

  it('returns copies, not the original objects', () => {
    const run = buildOpenRun(sample, Infinity, false, seqRng);
    expect(run[0]).not.toBe(sample[0]);
  });
});
