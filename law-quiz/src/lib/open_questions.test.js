import { describe, it, expect } from 'vitest';
import open from '../open_questions.json';

describe('open_questions.json', () => {
  it('has exactly 34 questions', () => {
    expect(open).toHaveLength(34);
  });

  it('ids are unique and 1..34', () => {
    const ids = open.map((q) => q.id).sort((a, b) => a - b);
    expect(ids).toEqual(Array.from({ length: 34 }, (_, i) => i + 1));
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

  it('official questions are exactly ids 1..18, unofficial are 19..34', () => {
    const official = open.filter((q) => q.official).map((q) => q.id).sort((a, b) => a - b);
    const unofficial = open.filter((q) => !q.official).map((q) => q.id).sort((a, b) => a - b);
    expect(official).toEqual(Array.from({ length: 18 }, (_, i) => i + 1));
    expect(unofficial).toEqual(Array.from({ length: 16 }, (_, i) => i + 19));
  });

  it('every unofficial question carries only unofficial suggestions', () => {
    for (const q of open.filter((q) => !q.official)) {
      for (const s of q.suggestions) expect(s.official).toBe(false);
    }
  });
});
