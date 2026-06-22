import { describe, it, expect } from 'vitest';
import questions from '../questions.json';

describe('questions.json', () => {
  it('has exactly 29 questions', () => {
    expect(questions).toHaveLength(29);
  });

  it('every question has 1 or 2 points and at least one correct option', () => {
    for (const q of questions) {
      expect([1, 2]).toContain(q.points);
      expect(q.options.length).toBeGreaterThanOrEqual(2);
      expect(q.options.some((o) => o.correct)).toBe(true);
    }
  });

  it('ids are unique and 1..29', () => {
    const ids = questions.map((q) => q.id).sort((a, b) => a - b);
    expect(ids).toEqual(Array.from({ length: 29 }, (_, i) => i + 1));
  });
});
