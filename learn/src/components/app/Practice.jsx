import { useState } from 'react';
import { buildExam } from '../../data/curriculum.js';
import { useProgress } from '../../state/progress.jsx';
import QuestionCard from './QuestionCard.jsx';

const EXAM_SIZE = 10;
const PASS_MARK = 80;

export default function Practice() {
  const { recordExam, examBest } = useProgress();
  const [phase, setPhase] = useState('intro'); // intro | run | result
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [outcome, setOutcome] = useState(null);

  function start() {
    setQuestions(buildExam(EXAM_SIZE));
    setAnswers([]);
    setIndex(0);
    setOutcome(null);
    setPhase('run');
  }

  function choose(i) {
    setAnswers((a) => {
      const copy = [...a];
      copy[index] = i;
      return copy;
    });
  }

  function advance() {
    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
      return;
    }
    const correct = questions.reduce(
      (sum, q, i) => sum + (answers[i] === q.answer ? 1 : 0),
      0
    );
    const pct = Math.round((correct / questions.length) * 100);
    const res = recordExam(pct);
    setOutcome({ correct, pct, ...res });
    setPhase('result');
  }

  // ── Intro ──
  if (phase === 'intro') {
    return (
      <div className="screen practice">
        <div className="exam-card">
          <div className="exam-card__emoji">📝</div>
          <h1 className="screen__title">Mock theory exam</h1>
          <p className="screen__sub">
            {EXAM_SIZE} mixed questions, just like the real Aruba theory test.
            Score {PASS_MARK}% or higher to pass. No hints this time — you've got this!
          </p>
          {examBest != null && (
            <p className="exam-card__best">
              Your best score: <strong>{examBest}%</strong>{' '}
              {examBest >= PASS_MARK ? '✅' : ''}
            </p>
          )}
          <button className="btn btn--primary btn--block" onClick={start}>
            Start exam
          </button>
        </div>
      </div>
    );
  }

  // ── Result ──
  if (phase === 'result') {
    const passed = outcome.pct >= PASS_MARK;
    return (
      <div className="screen practice">
        <div className="exam-card">
          <div className="exam-card__emoji">{passed ? '🎓' : '📚'}</div>
          <h1 className="screen__title">{passed ? 'You passed!' : 'Keep studying'}</h1>
          <div className={`exam-score ${passed ? 'pass' : 'fail'}`}>{outcome.pct}%</div>
          <p className="screen__sub">
            {outcome.correct} of {questions.length} correct · +{outcome.xpGain} XP
          </p>
          <p className="screen__sub">
            {passed
              ? 'Great work — keep practising to stay sharp before the real exam.'
              : `You need ${PASS_MARK}% to pass. Review the lessons and try again.`}
          </p>
          <button className="btn btn--primary btn--block" onClick={start}>
            Try another exam
          </button>
        </div>
      </div>
    );
  }

  // ── Running ──
  const q = questions[index];
  const selected = answers[index] ?? null;
  const isLast = index === questions.length - 1;

  return (
    <div className="screen practice practice--run">
      <div className="exam-progress">
        <div className="exam-progress__bar">
          <span style={{ width: `${((index + 1) / questions.length) * 100}%` }} />
        </div>
        <span className="exam-progress__count">
          {index + 1} / {questions.length}
        </span>
      </div>

      <QuestionCard question={q} selected={selected} revealed={false} onSelect={choose} />

      <button
        className="btn btn--primary btn--block"
        disabled={selected == null}
        onClick={advance}
      >
        {isLast ? 'Submit exam' : 'Next question'}
      </button>
    </div>
  );
}
