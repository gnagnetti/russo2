import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  RefreshCw,
  BookOpen,
  Compass,
  GraduationCap,
} from 'lucide-react';
import { Exercise, CaseType, SectionId, UserStats } from '../types';
import { EXERCISES_DATABASE } from '../data/exercises';
import { recordExerciseAttempt, toggleBookmark } from '../utils/storage';

interface TutorInteractiveModeProps {
  initialFilterSection?: SectionId | 'all' | 'errors';
  initialFilterCase?: CaseType | 'all';
  stats: UserStats;
  onUpdateStats: (newStats: UserStats) => void;
  onOpenTables: () => void;
  onOpenDictionary: (searchQuery?: string) => void;
}

export const TutorInteractiveMode: React.FC<TutorInteractiveModeProps> = ({
  initialFilterSection = 'all',
  initialFilterCase = 'all',
  stats,
  onUpdateStats,
  onOpenTables,
  onOpenDictionary,
}) => {
  const [selectedSection, setSelectedSection] = useState<SectionId | 'all' | 'errors'>(initialFilterSection);
  const [selectedCase, setSelectedCase] = useState<CaseType | 'all'>(initialFilterCase);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Interaction State for the current exercise
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [sessionAnswered, setSessionAnswered] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);

  // Filter exercises whenever section or case changes
  useEffect(() => {
    let list = [...EXERCISES_DATABASE];

    if (selectedSection === 'errors') {
      const errorIds = new Set(stats.incorrectExerciseIds);
      list = list.filter((ex) => errorIds.has(ex.id));
      if (list.length === 0) {
        // Fallback to all if no errors recorded yet
        list = [...EXERCISES_DATABASE];
      }
    } else if (selectedSection !== 'all') {
      list = list.filter((ex) => ex.sectionId === selectedSection);
    }

    if (selectedCase !== 'all') {
      list = list.filter((ex) => ex.targetCase === selectedCase);
    }

    setFilteredExercises(list);
    setCurrentIndex(0);
    resetQuestionState();
  }, [selectedSection, selectedCase, stats.incorrectExerciseIds]);

  const resetQuestionState = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsHintVisible(false);
  };

  const currentExercise = filteredExercises[currentIndex] || EXERCISES_DATABASE[0];
  const isBookmarked = stats.bookmarkedExerciseIds.includes(currentExercise.id);

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentExercise.correctIndex;
    setSessionAnswered((prev) => prev + 1);
    if (isCorrect) {
      setSessionCorrect((prev) => prev + 1);
    }

    const updated = recordExerciseAttempt(stats, currentExercise.id, currentExercise.targetCase, isCorrect);
    onUpdateStats(updated);
  };

  const handleAskHint = () => {
    setIsHintVisible(true);
  };

  const handleNextExercise = () => {
    if (currentIndex < filteredExercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Loop or restart filtered batch
      setCurrentIndex(0);
    }
    resetQuestionState();
  };

  const handleToggleBookmark = () => {
    const updated = toggleBookmark(stats, currentExercise.id);
    onUpdateStats(updated);
  };

  const isCurrentCorrect = selectedOption !== null && selectedOption === currentExercise.correctIndex;

  return (
    <div className="space-y-6">
      {/* Filter and Mode Control Bar */}
      <div className="bg-white border border-stone-200/90 rounded-xl p-4 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#9E2A2B]" />
            <h2 className="text-base font-semibold text-stone-900">
              Tutrice Interattiva — Un Esercizio alla Volta
            </h2>
          </div>

          {/* Section filter controls */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100/90 rounded-lg text-xs">
            <button
              onClick={() => setSelectedSection('all')}
              className={`px-3 py-1.5 font-medium rounded-md transition-all ${
                selectedSection === 'all'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Tutti i Capitoli ({EXERCISES_DATABASE.length})
            </button>
            <button
              onClick={() => setSelectedSection('section_1')}
              className={`px-3 py-1.5 font-medium rounded-md transition-all ${
                selectedSection === 'section_1'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Sez. I: Forme e Casi
            </button>
            <button
              onClick={() => setSelectedSection('section_2')}
              className={`px-3 py-1.5 font-medium rounded-md transition-all ${
                selectedSection === 'section_2'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Sez. II: Lessico Letterario
            </button>
            <button
              onClick={() => setSelectedSection('section_3')}
              className={`px-3 py-1.5 font-medium rounded-md transition-all ${
                selectedSection === 'section_3'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Sez. III: Scientifico
            </button>
            {stats.incorrectExerciseIds.length > 0 && (
              <button
                onClick={() => setSelectedSection('errors')}
                className={`px-3 py-1.5 font-medium rounded-md transition-all ${
                  selectedSection === 'errors'
                    ? 'bg-rose-700 text-white shadow-xs font-semibold'
                    : 'text-rose-700 hover:bg-rose-50'
                }`}
              >
                Da Rivedere ({stats.incorrectExerciseIds.length})
              </button>
            )}
          </div>
        </div>

        {/* Case filter bar */}
        <div className="mt-3 pt-3 border-t border-stone-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-stone-500 font-medium">Filtra per caso:</span>
          {(
            [
              'all',
              'Genitivo',
              'Dativo',
              'Accusativo',
              'Strumentale',
              'Preposizionale',
              'Variabile',
            ] as const
          ).map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCase(c)}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedCase === c
                  ? 'bg-stone-900 text-white font-medium'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {c === 'all' ? 'Tutti i casi' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Main Single-Question Interactive Card */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-sm">
        {/* Progress & Metadata Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-100">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <span className="text-[#9E2A2B] font-semibold">
              Esercizio {currentIndex + 1} di {filteredExercises.length}
            </span>
            <span aria-hidden="true">·</span>
            <span>Punteggio sessione: {sessionCorrect}/{sessionAnswered}</span>
            {sessionAnswered > 0 && (
              <>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">
                  Accuratezza: {Math.round((sessionCorrect / sessionAnswered) * 100)}%
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleBookmark}
              title={isBookmarked ? 'Rimuovi dai preferiti' : 'Salva nei preferiti'}
              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-4 h-4 text-[#9E2A2B]" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={onOpenTables}
              className="text-xs text-stone-600 hover:text-stone-900 underline flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Consulta tabelle</span>
            </button>
          </div>
        </div>

        {/* Source citation */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-stone-500">
          <span className="font-medium text-stone-700">{currentExercise.category}</span>
          <span aria-hidden="true">·</span>
          <span>{currentExercise.bookRef}</span>
          <span aria-hidden="true">·</span>
          <span className="text-stone-600 font-mono">Caso: {currentExercise.targetCase}</span>
        </div>

        {/* The Prompt and Russian Sentence */}
        <div className="mt-5 space-y-4">
          <p className="text-sm font-medium text-stone-700">
            {currentExercise.prompt}
          </p>

          <div className="p-5 sm:p-6 bg-stone-50/90 rounded-xl border border-stone-200/80">
            <p className="font-reading text-xl sm:text-2xl text-stone-900 tracking-wide leading-relaxed">
              {currentExercise.russianSentence}
            </p>
          </div>
        </div>

        {/* Interactive Options Area */}
        <div className="mt-6 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentExercise.options.map((option, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const isSelected = selectedOption === idx;
              const isCorrectTarget = idx === currentExercise.correctIndex;

              let btnStyle =
                'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50 text-stone-800';

              if (isAnswered) {
                if (isCorrectTarget) {
                  btnStyle =
                    'border-emerald-500 bg-emerald-50/90 text-emerald-900 font-semibold ring-1 ring-emerald-400';
                } else if (isSelected && !isCorrectTarget) {
                  btnStyle =
                    'border-rose-400 bg-rose-50 text-rose-900 font-medium line-through';
                } else {
                  btnStyle = 'border-stone-200 bg-stone-50/50 text-stone-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`flex items-start gap-3.5 p-4 rounded-xl border text-left transition-all text-sm leading-snug cursor-pointer disabled:cursor-default ${btnStyle}`}
                >
                  <span
                    className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                      isAnswered && isCorrectTarget
                        ? 'bg-emerald-600 text-white'
                        : isAnswered && isSelected && !isCorrectTarget
                        ? 'bg-rose-600 text-white'
                        : 'bg-stone-200/80 text-stone-700'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="font-reading text-base font-medium pt-0.5">
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Hint button before answering */}
        {!isAnswered && (
          <div className="mt-5 flex items-center justify-between pt-2">
            <button
              onClick={handleAskHint}
              disabled={isHintVisible}
              className="text-xs font-medium text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100/80 px-3.5 py-2 rounded-lg border border-amber-200/80 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>
                {isHintVisible ? 'Indizio mostrato qui sotto' : 'Non lo so · Chiedi un indizio alla Tutrice'}
              </span>
            </button>
            <p className="text-xs text-stone-400 hidden sm:block">
              Seleziona la lettera corrispondente alla tua risposta
            </p>
          </div>
        )}

        {/* Pedagogical Hint Box */}
        {isHintVisible && !isAnswered && (
          <div className="mt-4 p-4 bg-amber-50/70 border border-amber-200/70 rounded-xl text-xs text-amber-900 space-y-1">
            <div className="font-semibold flex items-center gap-1.5 text-amber-800">
              <Compass className="w-4 h-4 text-amber-600" />
              <span>Indizio Didattico della Tutrice (Senza spoiler):</span>
            </div>
            <p className="leading-relaxed pl-5.5 text-stone-700">
              {currentExercise.hint}
            </p>
          </div>
        )}

        {/* Immediate Detailed Feedback Area */}
        {isAnswered && (
          <div className="mt-6 pt-6 border-t border-stone-200 space-y-4">
            <div
              className={`p-4 sm:p-5 rounded-xl border flex items-start gap-3.5 ${
                isCurrentCorrect
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50/80 border-rose-300 text-rose-950'
              }`}
            >
              {isCurrentCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm tracking-wide">
                    {isCurrentCorrect ? '[RISPOSTA CORRETTA]' : '[RISPOSTA ERRATA]'}
                  </span>
                  <span className="text-xs opacity-80">
                    Soluzione corretta: Opzione {String.fromCharCode(65 + currentExercise.correctIndex)} («{currentExercise.options[currentExercise.correctIndex]}»)
                  </span>
                </div>
                <div className="text-xs sm:text-sm leading-relaxed text-stone-800 pt-1">
                  <p className="font-medium text-stone-900 mb-1">
                    Spiegazione grammaticale della reggenza:
                  </p>
                  <p>{currentExercise.detailedExplanation}</p>
                </div>
                <div className="pt-2 text-xs text-stone-500">
                  <span className="font-medium">Riferimento manuale:</span> {currentExercise.bookRef}
                </div>
              </div>
            </div>

            {/* Next Action Control */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="text-xs text-stone-500">
                Esercizio completato. Clicca sul pulsante per passare al prossimo quesito.
              </div>
              <button
                onClick={handleNextExercise}
                className="w-full sm:w-auto px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Prossimo Esercizio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Helpful Quick Links below exercise */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border border-stone-200 rounded-xl p-4 flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-stone-900">Hai dubbi sulle desinenze?</h4>
            <p className="text-xs text-stone-500 mt-0.5">
              Consulta le tavole sinottiche di declinazione del testo.
            </p>
          </div>
          <button
            onClick={onOpenTables}
            className="text-xs font-semibold text-[#9E2A2B] hover:underline whitespace-nowrap pl-3"
          >
            Apri Tabelle →
          </button>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-4 flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-stone-900">Vuoi cercare un verbo specifico?</h4>
            <p className="text-xs text-stone-500 mt-0.5">
              Sfoglia il dizionario offline con oltre 150 reggenze.
            </p>
          </div>
          <button
            onClick={() => onOpenDictionary()}
            className="text-xs font-semibold text-[#9E2A2B] hover:underline whitespace-nowrap pl-3"
          >
            Cerca nel Glossario →
          </button>
        </div>
      </div>
    </div>
  );
};
