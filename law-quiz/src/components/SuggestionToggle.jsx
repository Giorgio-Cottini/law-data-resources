function flavour(suggestions) {
  if (!suggestions || suggestions.length === 0) return null;
  return suggestions[0].official ? "official" : "unofficial";
}

export default function SuggestionToggle({ open, suggestions, onClick }) {
  const kind = flavour(suggestions);
  const noun =
    kind === "official"
      ? "official suggestions"
      : kind === "unofficial"
        ? "unofficial suggestions"
        : "suggestion";
  const cls =
    kind === "official"
      ? "sugg-toggle is-official"
      : kind === "unofficial"
        ? "sugg-toggle is-unofficial"
        : "sugg-toggle";
  return (
    <button className={cls} onClick={onClick}>
      {open ? `Hide ${noun}` : `Show ${noun}`}
    </button>
  );
}
