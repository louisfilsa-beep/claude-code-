import Sign from './Sign.jsx';

// Presents a single question and its options. Parent owns the state and decides
// when answers are revealed (immediate in lessons, only at the end in the exam).
export default function QuestionCard({ question, selected, revealed, onSelect }) {
  return (
    <div className="qcard">
      {question.sign && (
        <div className="qcard__sign">
          <Sign sign={question.sign} value={question.signValue} />
        </div>
      )}

      <h2 className="qcard__prompt">{question.prompt}</h2>

      <div className="qcard__options" role="listbox" aria-label="Answer options">
        {question.options.map((opt, i) => {
          let cls = 'opt2';
          if (revealed) {
            if (i === question.answer) cls += ' opt2--correct';
            else if (i === selected) cls += ' opt2--wrong';
          } else if (i === selected) {
            cls += ' opt2--selected';
          }
          return (
            <button
              key={i}
              type="button"
              className={cls}
              disabled={revealed}
              aria-pressed={i === selected}
              onClick={() => onSelect(i)}
            >
              <span className="opt2__bullet">{String.fromCharCode(65 + i)}</span>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
