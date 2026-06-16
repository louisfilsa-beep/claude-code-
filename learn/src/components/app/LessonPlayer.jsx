import { useState } from 'react';
import { getLesson } from '../../data/curriculum.js';
import { useProgress } from '../../state/progress.jsx';
import { navigate } from '../../lib/router.js';
import QuestionCard from './QuestionCard.jsx';

const START_HEARTS = 5;

export default function LessonPlayer({ lessonId }) {
  const lesson = getLesson(lessonId);
  const { completeLesson } = useProgress();

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [hearts, setHearts] = useState(START_HEARTS);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [phase, setPhase] = useState('play'); // play | done | failed
  const [reward, setReward] = useState(null);

  if (!lesson) {
    return (
      <div className="player">
        <div className="player__body center">
          <p>Lesson not found.</p>
          <button className="btn btn--primary" onClick={() => navigate('/learn')}>
            Back to path
          </button>
        </div>
      </div>
    );
  }

  const questions = lesson.questions;
  const question = questions[index];
  const isLast = index === questions.length - 1;
  const isCorrect = selected === question?.answer;

  function check() {
    if (selected == null) return;
    setRevealed(true);
    if (isCorrect) {
      setCorrect((c) => c + 1);
    } else {
      setWrong((w) => w + 1);
      const left = hearts - 1;
      setHearts(left);
    }
  }

  function next() {
    // Out of hearts after a wrong answer ends the lesson.
    if (!isCorrect && hearts <= 0) {
      setPhase('failed');
      return;
    }
    if (isLast) {
      const result = completeLesson(lesson.id, {
        correct, // already tallied in check()
        total: questions.length,
        lostHearts: wrong,
      });
      setReward(result);
      setPhase('done');
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setRevealed(false);
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setRevealed(false);
    setHearts(START_HEARTS);
    setCorrect(0);
    setWrong(0);
    setPhase('play');
  }

  // ── Completed ──
  if (phase === 'done') {
    const pct = Math.round((correct / questions.length) * 100);
    return (
      <div className="player">
        <div className="player__body center result">
          <div className="result__emoji">{reward?.stars === 3 ? '🏆' : '🎉'}</div>
          <h1 className="result__title">Lesson complete!</h1>
          <div className="result__stars" aria-label={`${reward?.stars} of 3 stars`}>
            {[1, 2, 3].map((s) => (
              <span key={s} className={s <= (reward?.stars || 0) ? 'star on' : 'star'}>
                ★
              </span>
            ))}
          </div>
          <div className="result__stats">
            <div>
              <strong>{pct}%</strong>
              <span>Accuracy</span>
            </div>
            <div>
              <strong>+{reward?.xpGain ?? 0}</strong>
              <span>XP earned</span>
            </div>
          </div>
          <button className="btn btn--primary btn--block" onClick={() => navigate('/learn')}>
            Continue
          </button>
        </div>
      </div>
    );
  }

  // ── Out of hearts ──
  if (phase === 'failed') {
    return (
      <div className="player">
        <div className="player__body center result">
          <div className="result__emoji">💔</div>
          <h1 className="result__title">Out of hearts</h1>
          <p className="result__sub">
            You ran out of hearts on this lesson. Review and try again — you've got this!
          </p>
          <button className="btn btn--primary btn--block" onClick={restart}>
            Try again
          </button>
          <button className="btn btn--ghost btn--block" onClick={() => navigate('/learn')}>
            Back to path
          </button>
        </div>
      </div>
    );
  }

  // ── Playing ──
  const progress = Math.round((index / questions.length) * 100);

  return (
    <div className="player">
      <header className="player__top">
        <button className="player__close" aria-label="Exit lesson" onClick={() => navigate('/learn')}>
          ✕
        </button>
        <div className="player__bar">
          <span style={{ width: `${progress}%` }} />
        </div>
        <div className="player__hearts" aria-label={`${hearts} hearts left`}>
          ❤️ {hearts}
        </div>
      </header>

      <div className="player__body">
        <p className="player__unit" style={{ color: lesson.color }}>
          {lesson.icon} {lesson.unitTitle} · {lesson.title}
        </p>
        <QuestionCard
          question={question}
          selected={selected}
          revealed={revealed}
          onSelect={setSelected}
        />
      </div>

      <footer className={`player__foot ${revealed ? (isCorrect ? 'is-correct' : 'is-wrong') : ''}`}>
        {revealed && (
          <div className="feedback">
            <strong>{isCorrect ? 'Correct! ✓' : 'Not quite'}</strong>
            <p>{question.explain}</p>
          </div>
        )}
        {!revealed ? (
          <button
            className="btn btn--primary btn--block"
            disabled={selected == null}
            onClick={check}
          >
            Check
          </button>
        ) : (
          <button className="btn btn--primary btn--block" onClick={next}>
            {isLast ? 'Finish' : 'Continue'}
          </button>
        )}
      </footer>
    </div>
  );
}
