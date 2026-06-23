export default function OpenInfo({ showDisclaimer = false, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2>Official vs unofficial</h2>
        <hr className="modal-rule" />
        <table className="info-table">
          <thead>
            <tr>
              <th></th>
              <th>Official</th>
              <th>Not official</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Question</strong></td>
              <td>From past exams</td>
              <td>Personal addition</td>
            </tr>
            <tr>
              <td><strong>Suggestion</strong></td>
              <td>Professor's "should include"</td>
              <td>Personal addition</td>
            </tr>
          </tbody>
        </table>
        <p className="info-explain">
          <em>
            Official items come from past exams and professors' grading notes.
            Unofficial items are personal study additions.
          </em>
        </p>
        {showDisclaimer && (
          <>
            <hr className="modal-rule" />
            <p className="modal-disclaimer">
              <strong>DISCLAIMER:</strong> open practice has no scoring and no
              correction. You read a question, optionally reveal suggested points
              to touch, and review a summary of the questions at the end.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
