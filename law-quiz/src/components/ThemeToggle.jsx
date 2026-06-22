const ORDER = ['system', 'light', 'dark'];
const LABEL = { system: 'System', light: 'Light', dark: 'Dark' };

export default function ThemeToggle({ theme, setTheme }) {
  const next = () => setTheme(ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length]);
  return (
    <button className="icon-btn" onClick={next} title={`Theme: ${LABEL[theme]}`} aria-label={`Theme: ${LABEL[theme]}`}>
      {theme === 'dark' ? '🌙' : theme === 'light' ? '☀️' : '🖥'}
    </button>
  );
}
