import React from 'react';
import {
  Award,
  Flame,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Play,
  BookmarkCheck,
  TrendingUp,
} from 'lucide-react';
import { UserStats, CaseType } from '../types';
import { EXERCISES_DATABASE } from '../data/exercises';
import { resetAllProgress } from '../utils/storage';

interface StatsViewProps {
  stats: UserStats;
  onUpdateStats: (newStats: UserStats) => void;
  onStartErrorReview: () => void;
  onStartPractice: () => void;
}

export const StatsView: React.FC<StatsViewProps> = ({
  stats,
  onUpdateStats,
  onStartErrorReview,
  onStartPractice,
}) => {
  const accuracyPct =
    stats.totalAnswered > 0
      ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100)
      : 0;

  const totalPossible = EXERCISES_DATABASE.length;
  const completedPct = Math.round(
    (stats.completedExerciseIds.length / totalPossible) * 100
  );

  const handleReset = () => {
    if (
      window.confirm(
        'Sei sicuro di voler azzerare tutti i progressi e le statistiche di apprendimento?'
      )
    ) {
      const reset = resetAllProgress();
      onUpdateStats(reset);
    }
  };

  const caseKeys: CaseType[] = [
    'Genitivo',
    'Dativo',
    'Accusativo',
    'Strumentale',
    'Preposizionale',
    'Variabile',
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#9E2A2B] uppercase tracking-wider">
            <TrendingUp className="w-4 h-4" />
            <span>Centro Ripasso & Rendimento</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 mt-1">
            Statistiche di Padronanza della Reggenza Russa
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
            Monitora il tuo tasso di successo per ciascun caso grammaticale e concentrati sugli
            errori commessi durante le sessioni interattive.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="px-3.5 py-2 text-xs font-medium text-stone-600 hover:text-rose-700 hover:bg-rose-50 border border-stone-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Azzera Progressi</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-500">Accuratezza Globale</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
              {accuracyPct}%
            </span>
            <span className="text-xs text-stone-500 tabular-nums">
              ({stats.totalCorrect}/{stats.totalAnswered})
            </span>
          </div>
          <div className="mt-3 w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all"
              style={{ width: `${accuracyPct}%` }}
            />
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-500">Sequenza Corretta (Streak)</span>
            <Flame className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
              {stats.streak}
            </span>
            <span className="text-xs text-stone-500 tabular-nums">
              (Record: {stats.maxStreak})
            </span>
          </div>
          <p className="mt-3 text-[11px] text-stone-400">
            Risposte esatte consecutive correnti
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-500">Esercizi Esplorati</span>
            <Award className="w-4 h-4 text-[#9E2A2B]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
              {stats.completedExerciseIds.length}
            </span>
            <span className="text-xs text-stone-500 tabular-nums">
              / {totalPossible}
            </span>
          </div>
          <div className="mt-3 w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#9E2A2B] h-full rounded-full transition-all"
              style={{ width: `${completedPct}%` }}
            />
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-500">Errori da Ripassare</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-rose-700 tabular-nums">
              {stats.incorrectExerciseIds.length}
            </span>
            <span className="text-xs text-stone-500">quesiti</span>
          </div>
          <div className="mt-3">
            {stats.incorrectExerciseIds.length > 0 ? (
              <button
                onClick={onStartErrorReview}
                className="text-xs font-bold text-rose-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Avvia ripasso errori →</span>
              </button>
            ) : (
              <span className="text-[11px] text-emerald-700 font-medium">
                Nessun errore in sospeso!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Breakdown by Case */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-5">
        <div>
          <h2 className="text-base font-bold font-serif text-stone-900">
            Precisione Suddivisa per Caso Grammaticale
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Indica in quali casi hai dimostrato maggiore sicurezza e dove è opportuno ripassare le desinenze.
          </p>
        </div>

        <div className="space-y-3.5">
          {caseKeys.map((caseName) => {
            const data = stats.byCase[caseName] || { total: 0, correct: 0 };
            const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;

            return (
              <div key={caseName} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-800">{caseName}</span>
                  <span className="text-stone-500 tabular-nums">
                    {data.total > 0
                      ? `${pct}% (${data.correct}/${data.total} corretti)`
                      : 'Ancora non affrontato'}
                  </span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      pct >= 80
                        ? 'bg-emerald-600'
                        : pct >= 50
                        ? 'bg-amber-500'
                        : 'bg-[#9E2A2B]'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to action banners */}
      <div className="p-6 bg-gradient-to-r from-stone-900 to-stone-800 rounded-xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1">
          <h3 className="text-base font-bold font-serif">
            {stats.incorrectExerciseIds.length > 0
              ? 'Hai quesiti da consolidare!'
              : 'Pronto per una nuova sessione di pratica?'}
          </h3>
          <p className="text-xs text-stone-300 max-w-xl leading-relaxed">
            {stats.incorrectExerciseIds.length > 0
              ? `Hai ${stats.incorrectExerciseIds.length} esercizi nel manuale contrassegnati da un errore precedente. Ripeterli subito rafforzerà la memoria a lungo termine.`
              : 'Affronta nuovi esercizi estratti casualmente dal testo di Velichko e Bashlakova per perfezionare le tue competenze di reggenza.'}
          </p>
        </div>

        {stats.incorrectExerciseIds.length > 0 ? (
          <button
            onClick={onStartErrorReview}
            className="px-5 py-2.5 bg-[#9E2A2B] hover:bg-[#852324] text-white rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Ripassa Solo gli Errori</span>
          </button>
        ) : (
          <button
            onClick={onStartPractice}
            className="px-5 py-2.5 bg-[#9E2A2B] hover:bg-[#852324] text-white rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Nuova Pratica</span>
          </button>
        )}
      </div>
    </div>
  );
};
