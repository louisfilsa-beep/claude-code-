import { UNITS } from '../../data/curriculum.js';
import { useProgress } from '../../state/progress.jsx';
import { navigate } from '../../lib/router.js';

function LessonNode({ lesson, color, state, offset }) {
  const locked = state === 'locked';
  const done = state === 'done';

  return (
    <div className="node" style={{ '--node-x': `${offset}px` }}>
      <button
        className={`node__btn node__btn--${state}`}
        style={done || state === 'open' ? { background: color, borderColor: color } : undefined}
        disabled={locked}
        aria-label={`${lesson.title}${locked ? ' (locked)' : ''}`}
        onClick={() => !locked && navigate(`/lesson/${lesson.id}`)}
      >
        {locked ? '🔒' : done ? '★' : '▶'}
      </button>
      <span className="node__label">{lesson.title}</span>
      {done && (
        <span className="node__stars" aria-hidden="true">
          {'★'.repeat(lesson.stars)}
          <span className="dim">{'★'.repeat(3 - lesson.stars)}</span>
        </span>
      )}
    </div>
  );
}

export default function LearnPath() {
  const { completed, isUnlocked, completedCount, totalLessons } = useProgress();

  // Build the zig-zag node list with per-lesson state.
  let n = 0;
  const offsets = [0, 54, 32, -32, -54, -32, 32, 54];

  return (
    <div className="screen learn">
      <div className="learn__hero">
        <h1 className="learn__title">Your road to a licence</h1>
        <p className="learn__sub">
          {completedCount} of {totalLessons} lessons complete — keep the streak alive!
        </p>
        <div className="learn__track">
          <span style={{ width: `${(completedCount / totalLessons) * 100}%` }} />
        </div>
      </div>

      {UNITS.map((unit) => (
        <section className="unit" key={unit.id}>
          <div className="unit__head" style={{ background: unit.color }}>
            <span className="unit__icon" aria-hidden="true">{unit.icon}</span>
            <div>
              <h2 className="unit__title">{unit.title}</h2>
              <p className="unit__blurb">{unit.blurb}</p>
            </div>
          </div>

          <div className="unit__path">
            {unit.lessons.map((lesson) => {
              const doneEntry = completed[lesson.id];
              const state = doneEntry ? 'done' : isUnlocked(lesson.id) ? 'open' : 'locked';
              const offset = offsets[n % offsets.length];
              n += 1;
              return (
                <LessonNode
                  key={lesson.id}
                  lesson={{ ...lesson, stars: doneEntry?.stars || 0 }}
                  color={unit.color}
                  state={state}
                  offset={offset}
                />
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
