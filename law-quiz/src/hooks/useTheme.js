import { useEffect, useState } from 'react';

export function resolveTheme(theme, prefersDark) {
  if (theme === 'system') return prefersDark ? 'dark' : 'light';
  return theme;
}

export function useTheme() {
  const [theme, setTheme] = useState('system');
  const [prefersDark, setPrefersDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => setPrefersDark(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const resolved = resolveTheme(theme, prefersDark);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolved);
  }, [resolved]);

  return { theme, resolved, setTheme };
}
