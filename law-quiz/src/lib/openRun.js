import { shuffle } from './shuffle.js';

export function buildOpenRun(
  questions,
  limit = Infinity,
  officialOnly = false,
  rng = Math.random,
) {
  const pool = officialOnly ? questions.filter((q) => q.official) : questions;
  return shuffle(pool, rng)
    .slice(0, limit)
    .map((q) => ({ ...q }));
}
