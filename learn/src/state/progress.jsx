import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { LESSONS } from '../data/curriculum.js';

const STORAGE_KEY = 'drivearuba_progress_v1';

const DEFAULT_STATE = {
  name: '',
  onboarded: false,
  xp: 0,
  streak: 0,
  lastActive: null, // 'YYYY-MM-DD'
  completed: {}, // lessonId -> { stars, correct, total, at }
  examBest: null, // best exam percentage (0-100)
};

// ── date helpers (local time) ──────────────────────────────
function todayStr(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`;
}

function yesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return todayStr(d);
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

// Given the previous activity date, return the streak after activity today.
function nextStreak(prevStreak, lastActive) {
  const today = todayStr();
  if (lastActive === today) return prevStreak || 1; // already counted today
  if (lastActive === yesterdayStr()) return (prevStreak || 0) + 1; // continued
  return 1; // first day, or streak broken
}

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [state, setState] = useState(load);

  // Persist on every change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable — non-fatal */
    }
  }, [state]);

  const setProfile = useCallback((name) => {
    setState((s) => ({ ...s, name: name.trim(), onboarded: true }));
  }, []);

  // Record a finished lesson. `correct`/`total` are the question tallies and
  // `lostHearts` how many wrong answers were made.
  const completeLesson = useCallback((lessonId, { correct, total, lostHearts }) => {
    const stars = lostHearts === 0 ? 3 : lostHearts === 1 ? 2 : 1;
    const xpGain = correct * 10 + (stars === 3 ? 15 : 5);

    setState((s) => {
      const prev = s.completed[lessonId];
      const best = prev ? Math.max(prev.stars, stars) : stars;
      return {
        ...s,
        xp: s.xp + xpGain,
        streak: nextStreak(s.streak, s.lastActive),
        lastActive: todayStr(),
        completed: {
          ...s.completed,
          [lessonId]: { stars: best, correct, total, at: Date.now() },
        },
      };
    });

    return { xpGain, stars };
  }, []);

  const recordExam = useCallback((percent) => {
    const passed = percent >= 80;
    const xpGain = Math.round(percent / 5) + (passed ? 25 : 0);
    setState((s) => ({
      ...s,
      xp: s.xp + xpGain,
      streak: nextStreak(s.streak, s.lastActive),
      lastActive: todayStr(),
      examBest: s.examBest == null ? percent : Math.max(s.examBest, percent),
    }));
    return { xpGain, passed };
  }, []);

  const reset = useCallback(() => {
    setState({ ...DEFAULT_STATE });
  }, []);

  // ── derived values ──
  const completedCount = Object.keys(state.completed).length;

  // The streak is only "live" if the last activity was today or yesterday;
  // otherwise it has lapsed and should display as 0.
  const liveStreak =
    state.lastActive === todayStr() || state.lastActive === yesterdayStr()
      ? state.streak
      : 0;

  // A lesson is unlocked if it's the first, or the previous lesson is done.
  const isUnlocked = useCallback(
    (lessonId) => {
      const idx = LESSONS.findIndex((l) => l.id === lessonId);
      if (idx <= 0) return true;
      return Boolean(state.completed[LESSONS[idx - 1].id]);
    },
    [state.completed]
  );

  const value = useMemo(
    () => ({
      ...state,
      liveStreak,
      completedCount,
      totalLessons: LESSONS.length,
      isUnlocked,
      setProfile,
      completeLesson,
      recordExam,
      reset,
    }),
    [state, liveStreak, completedCount, isUnlocked, setProfile, completeLesson, recordExam, reset]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within <ProgressProvider>');
  return ctx;
}
