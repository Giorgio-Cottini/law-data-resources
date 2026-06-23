import OfficialBadge from './OfficialBadge.jsx';

export default function SuggestionList({ suggestions }) {
  if (!suggestions || suggestions.length === 0) {
    return <p className="muted">No suggestions yet.</p>;
  }
  return (
    <ul className="suggestion-list">
      {suggestions.map((s, i) => (
        <li
          key={i}
          className={s.official ? 'card-official' : 'card-unofficial'}
        >
          <span>{s.text}</span>
          <OfficialBadge official={s.official} />
        </li>
      ))}
    </ul>
  );
}
