export default function ModeSwitch({ mode, onSelect }) {
  return (
    <div className="mode-switch" role="tablist" aria-label="Question mode">
      <button
        className={`mode-switch-opt ${mode === "closed" ? "is-active" : ""}`}
        role="tab"
        aria-selected={mode === "closed"}
        onClick={() => mode !== "closed" && onSelect("closed")}
      >
        Closed
      </button>
      <button
        className={`mode-switch-opt ${mode === "open" ? "is-active" : ""}`}
        role="tab"
        aria-selected={mode === "open"}
        onClick={() => mode !== "open" && onSelect("open")}
      >
        Open
      </button>
    </div>
  );
}
