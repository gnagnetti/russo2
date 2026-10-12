import React, { useMemo } from 'react';
import {
  Award,
  Flame,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Play,
  BookmarkCheck,
  TrendingUp,
  Calendar,
  Check,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { UserStats, CaseType } from '../types';
import { EXERCISES_DATABASE } from '../data/exercises';
import { resetAllProgress, getLast7DaysHistory } from '../utils/storage';

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
  const [showConfirmReset, setShowConfirmReset] = React.useState(false);

  const chartData = useMemo(() => getLast7DaysHistory(stats), [stats]);
  const last7DaysCorrectTotal = useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.corrette, 0),
    [chartData]
  );
  const last7DaysAnsweredTotal = useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.risposte, 0),
    [chartData]
  );

  const accuracyPct =
    stats.totalAnswered > 0
      ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100)
      : 0;

  const totalPossible = EXERCISES_DATABASE.length;
  const completedPct = Math.round(
    (stats.completedExerciseIds.length / totalPossible) * 100
  );

  const handleExecuteReset = () => {
    const reset = resetAllProgress();
    onUpdateStats(reset);
    setShowConfirmReset(false);
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

        <div className="flex items-center gap-2">
          {showConfirmReset ? (
            <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 p-1.5 rounded-lg text-xs">
              <span className="text-rose-800 font-medium px-1">Confermi azzeramento?</span>
              <button
                onClick={handleExecuteReset}
                className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded font-medium cursor-pointer"
              >
                Sì, azzera
              </button>
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-2.5 py-1 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded font-medium cursor-pointer"
              >
                Annulla
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowConfirmReset(true)}
              className="px-3.5 py-2 text-xs font-medium text-stone-600 hover:text-rose-700 hover:bg-rose-50 border border-stone-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Azzera Progressi</span>
            </button>
          )}
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

      {/* 7-Day Performance Line Chart with Recharts */}
      <div className="bg-white border border-stone-200 rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#9E2A2B] uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>Attività Recente · Ultimi 7 Giorni</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold font-serif text-stone-900 mt-0.5">
              Andamento delle Risposte Esatte
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Evoluzione temporale del rendimento giornaliero nelle sessioni di esercizio del manuale.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-lg text-xs">
              <span className="text-stone-500 block text-[10px]">Esatte (7 gg)</span>
              <span className="font-bold text-emerald-800 text-sm tabular-nums">
                {last7DaysCorrectTotal} risposte
              </span>
            </div>
            <div className="bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-lg text-xs">
              <span className="text-stone-500 block text-[10px]">Totale (7 gg)</span>
              <span className="font-bold text-stone-800 text-sm tabular-nums">
                {last7DaysAnsweredTotal} svolti
              </span>
            </div>
          </div>
        </div>

        {/* Recharts LineChart */}
        <div className="w-full h-64 sm:h-72 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 15, left: -15, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="dayLabel"
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis
                allowDecimals={false}
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const dataPoint = payload[0].payload;
                    return (
                      <div className="bg-stone-900 text-white text-xs p-2.5 rounded-lg shadow-lg border border-stone-800 space-y-1">
                        <p className="font-bold text-stone-200 border-b border-stone-800 pb-1">
                          {label}
                        </p>
                        <p className="text-emerald-400 flex items-center justify-between gap-3">
                          <span>Risposte Esatte:</span>
                          <span className="font-bold tabular-nums">{dataPoint.corrette}</span>
                        </p>
                        <p className="text-stone-300 flex items-center justify-between gap-3">
                          <span>Totale Quesiti:</span>
                          <span className="font-bold tabular-nums">{dataPoint.risposte}</span>
                        </p>
                        {dataPoint.risposte > 0 && (
                          <p className="text-amber-400 flex items-center justify-between gap-3 pt-0.5 border-t border-stone-800 text-[11px]">
                            <span>Precisione:</span>
                            <span className="font-bold tabular-nums">{dataPoint.accuratezza}%</span>
                          </p>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                height={30}
                iconType="circle"
                wrapperStyle={{ fontSize: '11px', paddingBottom: '8px' }}
              />
              <Line
                type="monotone"
                dataKey="corrette"
                name="Risposte Corrette"
                stroke="#059669"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#059669', strokeWidth: 1, stroke: '#ffffff' }}
                activeDot={{ r: 6, fill: '#059669', stroke: '#ffffff', strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="risposte"
                name="Totale Quesiti"
                stroke="#9E2A2B"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                dot={{ r: 3, fill: '#9E2A2B' }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
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
