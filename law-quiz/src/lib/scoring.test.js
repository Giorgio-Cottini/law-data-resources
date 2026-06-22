import { describe, it, expect } from 'vitest';
import { scoreQuestion, tallyQuestion, correctIndices } from './scoring.js';

const q2 = {
  points: 2,
  options: [
    { text: 'a', correct: true },
    { text: 'b', correct: true },
    { text: 'c', correct: false },
  ],
}; // P=2, C=2, share=1

const q1 = {
  points: 1,
  options: [
    { text: 'a', correct: true },
    { text: 'b', correct: false },
  ],
}; // P=1, C=1, share=1

describe('correctIndices', () => {
  it('returns indices of correct options', () => {
    expect(correctIndices(q2)).toEqual([0, 1]);
  });
});

describe('scoreQuestion', () => {
  it('awards full points when all correct selected, no wrong', () => {
    expect(scoreQuestion(q2, [0, 1])).toBe(2);
  });

  it('partial credit: one correct of two', () => {
    expect(scoreQuestion(q2, [0])).toBe(1);
  });

  it('wrong cancels correct via share subtraction', () => {
    expect(scoreQuestion(q2, [0, 2])).toBe(0);
  });

  it('selecting everything is not full marks', () => {
    expect(scoreQuestion(q2, [0, 1, 2])).toBe(1);
  });

  it('never goes below zero', () => {
    expect(scoreQuestion(q1, [1])).toBe(0);
  });

  it('empty selection scores zero', () => {
    expect(scoreQuestion(q2, [])).toBe(0);
  });
});

describe('tallyQuestion', () => {
  it('counts correct, wrong, and omitted selections', () => {
    expect(tallyQuestion(q2, [0, 2])).toEqual({ correctSel: 1, wrongSel: 1, omitted: 1 });
  });

  it('all omitted when nothing selected', () => {
    expect(tallyQuestion(q2, [])).toEqual({ correctSel: 0, wrongSel: 0, omitted: 2 });
  });
});
