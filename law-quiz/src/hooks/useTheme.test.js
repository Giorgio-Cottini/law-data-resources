import { describe, it, expect, beforeEach, vi } from 'vitest';
import { resolveTheme } from './useTheme.js';

describe('resolveTheme', () => {
  it('passes through explicit light/dark', () => {
    expect(resolveTheme('light', true)).toBe('light');
    expect(resolveTheme('dark', false)).toBe('dark');
  });

  it('system follows the prefers-dark flag', () => {
    expect(resolveTheme('system', true)).toBe('dark');
    expect(resolveTheme('system', false)).toBe('light');
  });
});
