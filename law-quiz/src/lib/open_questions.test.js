import { describe, it, expect } from 'vitest';
import open from '../open_questions.json';

describe('open_questions.json', () => {
  it('has exactly 18 questions', () => {
    expect(open).toHaveLength(18);
  });

  it('ids are unique and 1..18', () => {
    const ids = open.map((q) => q.id).sort((a, b) => a - b);
    expect(ids).toEqual(Array.from({ length: 18 }, (_, i) => i + 1));
  });

  it('every question has the required shape', () => {
    for (const q of open) {
      expect(typeof q.text).toBe('string');
      expect(q.text.length).toBeGreaterThan(0);
      expect(q.limit === null || typeof q.limit === 'number').toBe(true);
      expect([null, 'words', 'lines']).toContain(q.limitUnit);
      expect(typeof q.official).toBe('boolean');
      expect(Array.isArray(q.suggestions)).toBe(true);
      for (const s of q.suggestions) {
        expect(typeof s.text).toBe('string');
        expect(typeof s.official).toBe('boolean');
      }
    }
  });

  it('every current question and suggestion is official', () => {
    for (const q of open) {
      expect(q.official).toBe(true);
      for (const s of q.suggestions) expect(s.official).toBe(true);
    }
  });
});
