import { CaseType, UserStats } from '../types';

const STORAGE_KEY = 'russian_gov_tutor_stats_v1';

const INITIAL_STATS: UserStats = {
  totalAnswered: 0,
  totalCorrect: 0,
  streak: 0,
  maxStreak: 0,
  completedExerciseIds: [],
  incorrectExerciseIds: [],
  bookmarkedExerciseIds: [],
  byCase: {
    Genitivo: { total: 0, correct: 0 },
    Dativo: { total: 0, correct: 0 },
    Accusativo: { total: 0, correct: 0 },
    Strumentale: { total: 0, correct: 0 },
    Preposizionale: { total: 0, correct: 0 },
    Variabile: { total: 0, correct: 0 },
    'Concordanza Numerali': { total: 0, correct: 0 },
  },
  history: {},
};

export function loadUserStats(): UserStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_STATS;
    const parsed = JSON.parse(raw);
    return {
      ...INITIAL_STATS,
      ...parsed,
      completedExerciseIds: Array.isArray(parsed.completedExerciseIds) ? parsed.completedExerciseIds : [],
      incorrectExerciseIds: Array.isArray(parsed.incorrectExerciseIds) ? parsed.incorrectExerciseIds : [],
      bookmarkedExerciseIds: Array.isArray(parsed.bookmarkedExerciseIds) ? parsed.bookmarkedExerciseIds : [],
      byCase: {
        ...INITIAL_STATS.byCase,
        ...(parsed.byCase && typeof parsed.byCase === 'object' ? parsed.byCase : {}),
      },
      history: parsed.history && typeof parsed.history === 'object' ? parsed.history : {},
    };
  } catch {
    return INITIAL_STATS;
  }
}

export function saveUserStats(stats: UserStats): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save stats to localStorage', e);
  }
}

export function recordExerciseAttempt(
  stats: UserStats,
  exerciseId: string,
  targetCase: CaseType,
  isCorrect: boolean
): UserStats {
  const safeStats: UserStats = {
    ...INITIAL_STATS,
    ...(stats || {}),
    completedExerciseIds: Array.isArray(stats?.completedExerciseIds) ? stats.completedExerciseIds : [],
    incorrectExerciseIds: Array.isArray(stats?.incorrectExerciseIds) ? stats.incorrectExerciseIds : [],
    bookmarkedExerciseIds: Array.isArray(stats?.bookmarkedExerciseIds) ? stats.bookmarkedExerciseIds : [],
    byCase: {
      ...INITIAL_STATS.byCase,
      ...(stats?.byCase || {}),
    },
    history: stats?.history && typeof stats.history === 'object' ? stats.history : {},
  };

  const newStreak = isCorrect ? (safeStats.streak || 0) + 1 : 0;
  const newMaxStreak = Math.max(safeStats.maxStreak || 0, newStreak);

  const completedSet = new Set(safeStats.completedExerciseIds);
  completedSet.add(exerciseId);

  const incorrectSet = new Set(safeStats.incorrectExerciseIds);
  if (!isCorrect) {
    incorrectSet.add(exerciseId);
  } else {
    // If they got it right, remove it from the error queue
    incorrectSet.delete(exerciseId);
  }

  const currentCase = safeStats.byCase[targetCase] || { total: 0, correct: 0 };
  const updatedByCase = {
    ...safeStats.byCase,
    [targetCase]: {
      total: (currentCase.total || 0) + 1,
      correct: (currentCase.correct || 0) + (isCorrect ? 1 : 0),
    },
  };

  // Record daily history (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];
  const todayRecord = safeStats.history?.[today] || { answered: 0, correct: 0 };
  const updatedHistory = {
    ...(safeStats.history || {}),
    [today]: {
      answered: todayRecord.answered + 1,
      correct: todayRecord.correct + (isCorrect ? 1 : 0),
    },
  };

  const updated: UserStats = {
    ...safeStats,
    totalAnswered: (safeStats.totalAnswered || 0) + 1,
    totalCorrect: (safeStats.totalCorrect || 0) + (isCorrect ? 1 : 0),
    streak: newStreak,
    maxStreak: newMaxStreak,
    completedExerciseIds: Array.from(completedSet),
    incorrectExerciseIds: Array.from(incorrectSet),
    byCase: updatedByCase,
    history: updatedHistory,
  };

  saveUserStats(updated);
  return updated;
}

export function toggleBookmark(stats: UserStats, exerciseId: string): UserStats {
  const safeBookmarks = Array.isArray(stats?.bookmarkedExerciseIds) ? stats.bookmarkedExerciseIds : [];
  const bookmarks = new Set(safeBookmarks);
  if (bookmarks.has(exerciseId)) {
    bookmarks.delete(exerciseId);
  } else {
    bookmarks.add(exerciseId);
  }
  const updated = {
    ...stats,
    bookmarkedExerciseIds: Array.from(bookmarks),
  };
  saveUserStats(updated);
  return updated;
}

export function resetAllProgress(): UserStats {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error(e);
  }
  return INITIAL_STATS;
}

export interface DayChartPoint {
  date: string;
  dayLabel: string;
  corrette: number;
  risposte: number;
  accuratezza: number;
}

export function getLast7DaysHistory(stats: UserStats): DayChartPoint[] {
  const result: DayChartPoint[] = [];
  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = daysOfWeek[d.getDay()];
    const dayNum = String(d.getDate()).padStart(2, '0');
    const monthNum = String(d.getMonth() + 1).padStart(2, '0');
    const dayLabel = `${dayName} ${dayNum}/${monthNum}`;

    const record = stats?.history?.[dateStr];
    // If there is recorded data for that day, use it.
    // If today has no separate record yet but stats.totalAnswered > 0, reflect current session.
    let corrette = record?.correct ?? 0;
    let risposte = record?.answered ?? 0;

    if (i === 0 && !record && stats.totalAnswered > 0) {
      corrette = stats.totalCorrect;
      risposte = stats.totalAnswered;
    }

    const accuratezza = risposte > 0 ? Math.round((corrette / risposte) * 100) : 0;

    result.push({
      date: dateStr,
      dayLabel,
      corrette,
      risposte,
      accuratezza,
    });
  }

  return result;
}
