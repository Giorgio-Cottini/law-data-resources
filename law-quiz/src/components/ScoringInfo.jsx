export default function ScoringInfo({ onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>How scoring works</h2>
        <p>
          Each question is worth its points (1 or 2). If a question has
          <em> C</em> correct answers, each correct answer is worth
          <em> points / C</em>.
        </p>
        <ul>
          <li>Select a correct answer: <strong>+share</strong>.</li>
          <li>Select a wrong answer: <strong>−share</strong>.</li>
          <li>A question never scores below 0.</li>
        </ul>
        <p>
          Selecting every option does <strong>not</strong> give full marks —
          wrong selections cancel out correct ones.
        </p>
        <button className="primary" onClick={onClose}>Got it</button>
      </div>
    </div>
  );
}
