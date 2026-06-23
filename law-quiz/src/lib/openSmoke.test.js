import { describe, it, expect } from 'vitest';
import open from '../open_questions.json';
import { buildOpenRun } from './openRun.js';

describe('open flow data integration', () => {
  it('builds a full run from the real data', () => {
    const run = buildOpenRun(open, Infinity, false, () => 0);
    expect(run).toHaveLength(18);
    expect(run.every((q) => typeof q.text === 'string')).toBe(true);
  });

  it('official-only run keeps all 18 (all current questions official)', () => {
    const run = buildOpenRun(open, Infinity, true, () => 0);
    expect(run).toHaveLength(18);
  });

  it('limited run is capped', () => {
    const run = buildOpenRun(open, 5, false, () => 0);
    expect(run).toHaveLength(5);
  });
});
