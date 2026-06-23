function meta(suggestions) {
  if (!suggestions || suggestions.length === 0) return { kind: null, word: null };
  return suggestions[0].official
    ? { kind: "official", word: "Official" }
    : { kind: "unofficial", word: "Unofficial" };
}

export default function SuggestionToggle({ open, suggestions, onClick }) {
  const { kind, word } = meta(suggestions);
  const label = `${open ? "Hide" : "Show"} suggestions${word ? ` (${word})` : ""}`;
  const cls = `sugg-toggle${kind ? ` is-${kind}` : ""}`;
  return (
    <button className={cls} onClick={onClick} aria-expanded={open}>
      <span>{label}</span>
      <span className={`sugg-toggle-caret${open ? " is-open" : ""}`} aria-hidden="true">
        ▾
      </span>
    </button>
  );
}
