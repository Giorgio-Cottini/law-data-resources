export default function ScoringInfo({ onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2>How scoring works</h2>
        <hr className="modal-rule" />
        <p>
          Each question is worth its points (1 or 2). If a question has
          <em> C</em> correct answers, each answer is worth a
          <strong> share = points / C</strong>.
        </p>
        <ul>
          <li>
            Select a correct answer: <strong>+share</strong>;{" "}
          </li>
          <li>
            Select a wrong answer: <strong>−share</strong>;{" "}
          </li>
          <li>A question never scores below 0.</li>
        </ul>
        <p>
          Selecting every option does <strong>not</strong> give full marks —
          wrong selections cancel out correct ones.
        </p>
        <hr className="modal-rule" />
        <p className="modal-disclaimer">
          <strong>DISCLAIMER:</strong> this is how MY scoring works, I don't
          know how points are attributed during the exams.
        </p>
      </div>
    </div>
  );
}
