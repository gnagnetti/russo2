import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  RotateCcw,
  BookOpen,
  Compass,
  GraduationCap,
  Sparkles,
  Shuffle,
  ChevronRight,
} from 'lucide-react';
import { Exercise, CaseType, SectionId, UserStats } from '../types';
import { EXERCISES_DATABASE } from '../data/exercises';
import { recordExerciseAttempt, toggleBookmark } from '../utils/storage';

interface TutorInteractiveModeProps {
  initialFilterSection?: SectionId | 'all' | 'errors';
  initialFilterCase?: CaseType | 'all';
  quickPracticeTrigger?: number;
  stats: UserStats;
  onUpdateStats: (newStats: UserStats) => void;
  onOpenTables: () => void;
  onOpenDictionary: (searchQuery?: string) => void;
}

export const TutorInteractiveMode: React.FC<TutorInteractiveModeProps> = ({
  initialFilterSection = 'all',
  initialFilterCase = 'all',
  quickPracticeTrigger = 0,
  stats,
  onUpdateStats,
  onOpenTables,
  onOpenDictionary,
}) => {
  const [selectedSection, setSelectedSection] = useState<SectionId | 'all' | 'errors'>(initialFilterSection);
  const [selectedCase, setSelectedCase] = useState<CaseType | 'all'>(initialFilterCase);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Interaction State for the current exercise
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [sessionAnswered, setSessionAnswered] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);

  // Stable snapshot of error IDs during an error-review session to prevent the exercise from disappearing under the user
  const [errorSessionIds, setErrorSessionIds] = useState<string[]>([]);

  const feedbackRef = useRef<HTMLDivElement>(null);

  // Sync external filters when coming from another tab/view
  useEffect(() => {
    setSelectedSection(initialFilterSection);
    setSelectedCase(initialFilterCase);
    if (initialFilterSection === 'errors') {
      setErrorSessionIds([...(stats.incorrectExerciseIds || [])]);
    }
    setCurrentIndex(0);
    resetQuestionState();
  }, [initialFilterSection, initialFilterCase]);

  // Handle Quick Practice click from TopBar
  const prevTriggerRef = useRef(quickPracticeTrigger);
  useEffect(() => {
    if (quickPracticeTrigger > 0 && quickPracticeTrigger !== prevTriggerRef.current) {
      prevTriggerRef.current = quickPracticeTrigger;
      setSelectedSection('all');
      setSelectedCase('all');
      handleRandomExercise();
    }
  }, [quickPracticeTrigger]);

  // Derive filtered list without destabilizing re-renders
  const filteredExercises = useMemo(() => {
    let list = [...EXERCISES_DATABASE];

    if (selectedSection === 'errors') {
      const targetIds = new Set(
        errorSessionIds.length > 0 ? errorSessionIds : (stats.incorrectExerciseIds || [])
      );
      const errorList = list.filter((ex) => targetIds.has(ex.id));
      if (errorList.length > 0) {
        list = errorList;
      }
    } else if (selectedSection !== 'all') {
      list = list.filter((ex) => ex.sectionId === selectedSection);
    }

    if (selectedCase !== 'all') {
      list = list.filter((ex) => ex.targetCase === selectedCase);
    }

    return list.length > 0 ? list : EXERCISES_DATABASE;
  }, [selectedSection, selectedCase, errorSessionIds]);

  // Safe exercise accessor
  const safeIndex = currentIndex >= 0 && currentIndex < filteredExercises.length ? currentIndex : 0;
  const currentExercise = filteredExercises[safeIndex] || EXERCISES_DATABASE[0];
  const isBookmarked = (stats?.bookmarkedExerciseIds || []).includes(currentExercise?.id);

  const resetQuestionState = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsHintVisible(false);
  };

  const handleSectionFilterChange = (sec: SectionId | 'all' | 'errors') => {
    setSelectedSection(sec);
    if (sec === 'errors') {
      setErrorSessionIds([...(stats.incorrectExerciseIds || [])]);
    }
    setCurrentIndex(0);
    resetQuestionState();
  };

  const handleCaseFilterChange = (c: CaseType | 'all') => {
    setSelectedCase(c);
    setCurrentIndex(0);
    resetQuestionState();
  };

  const handleSelectOption = (index: number) => {
    // If already answered and user taps another option, allow changing / retrying immediately!
    if (isAnswered) {
      setSelectedOption(index);
      const isCorrect = index === currentExercise.correctIndex;
      const updated = recordExerciseAttempt(
        stats,
        currentExercise.id,
        currentExercise.targetCase,
        isCorrect
      );
      onUpdateStats(updated);
      return;
    }

    // Normal first selection
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentExercise.correctIndex;
    setSessionAnswered((prev) => prev + 1);
    if (isCorrect) {
      setSessionCorrect((prev) => prev + 1);
    }

    // Record progress in storage
    const updated = recordExerciseAttempt(
      stats,
      currentExercise.id,
      currentExercise.targetCase,
      isCorrect
    );
    onUpdateStats(updated);

    // Auto-scroll on mobile to make feedback visible
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setTimeout(() => {
        feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  };

  const handleAskHint = () => {
    setIsHintVisible(true);
  };

  const handleNextExercise = () => {
    if (currentIndex < filteredExercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
    resetQuestionState();
  };

  const handlePrevExercise = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(filteredExercises.length - 1);
    }
    resetQuestionState();
  };

  const handleRandomExercise = () => {
    if (filteredExercises.length <= 1) {
      resetQuestionState();
      return;
    }
    let rand = Math.floor(Math.random() * filteredExercises.length);
    if (rand === safeIndex) {
      rand = (rand + 1) % filteredExercises.length;
    }
    setCurrentIndex(rand);
    resetQuestionState();
  };

  const handleRetryCurrent = () => {
    resetQuestionState();
  };

  const handleToggleBookmark = () => {
    const updated = toggleBookmark(stats, currentExercise.id);
    onUpdateStats(updated);
  };

  const isCurrentCorrect = selectedOption !== null && selectedOption === currentExercise.correctIndex;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Filter and Mode Control Bar - Mobile Friendly */}
      <div className="bg-white border border-stone-200/90 rounded-xl p-3 sm:p-4 shadow-xs">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#9E2A2B] shrink-0" />
              <h2 className="text-sm sm:text-base font-semibold text-stone-900">
                Tutrice Interattiva — Un Esercizio alla Volta
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRandomExercise}
                title="Esercizio Casuale"
                className="text-xs text-stone-600 hover:text-[#9E2A2B] bg-stone-100 hover:bg-stone-200/70 px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Casuale</span>
              </button>
              <span className="text-[11px] sm:text-xs text-stone-500 font-mono">
                {filteredExercises.length} quesiti
              </span>
            </div>
          </div>

          {/* Section filter buttons - Horizontal Scroll on Mobile */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            <button
              onClick={() => handleSectionFilterChange('all')}
              className={`px-3 py-1.5 font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                selectedSection === 'all'
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200/70'
              }`}
            >
              Tutti i Capitoli ({EXERCISES_DATABASE.length})
            </button>
            <button
              onClick={() => handleSectionFilterChange('section_1')}
              className={`px-3 py-1.5 font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                selectedSection === 'section_1'
                  ? 'bg-[#9E2A2B] text-white font-semibold'
                  : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200/70'
              }`}
            >
              Sez. I: Forme e Casi (70)
            </button>
            <button
              onClick={() => handleSectionFilterChange('section_2')}
              className={`px-3 py-1.5 font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                selectedSection === 'section_2'
                  ? 'bg-[#9E2A2B] text-white font-semibold'
                  : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200/70'
              }`}
            >
              Sez. II: Lessico Letterario (115)
            </button>
            <button
              onClick={() => handleSectionFilterChange('section_3')}
              className={`px-3 py-1.5 font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                selectedSection === 'section_3'
                  ? 'bg-[#9E2A2B] text-white font-semibold'
                  : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200/70'
              }`}
            >
              Sez. III: Scientifico (70)
            </button>
            {(stats.incorrectExerciseIds || []).length > 0 && (
              <button
                onClick={() => handleSectionFilterChange('errors')}
                className={`px-3 py-1.5 font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  selectedSection === 'errors'
                    ? 'bg-rose-700 text-white font-semibold'
                    : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                }`}
              >
                Da Rivedere ({(stats.incorrectExerciseIds || []).length})
              </button>
            )}
          </div>

          {/* Case filter buttons - Horizontal Scroll on Mobile */}
          <div className="pt-2 border-t border-stone-100 flex items-center gap-1.5 overflow-x-auto text-[11px] sm:text-xs no-scrollbar">
            <span className="text-stone-400 font-medium whitespace-nowrap mr-1">Caso:</span>
            {(
              [
                'all',
                'Genitivo',
                'Dativo',
                'Accusativo',
                'Strumentale',
                'Preposizionale',
                'Variabile',
                'Concordanza Numerali',
              ] as const
            ).map((c) => (
              <button
                key={c}
                onClick={() => handleCaseFilterChange(c)}
                className={`px-2.5 py-1 rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCase === c
                    ? 'bg-stone-800 text-white font-medium shadow-2xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {c === 'all' ? 'Tutti i casi' : c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Single-Question Interactive Card */}
      <div className="bg-white border border-stone-200 rounded-xl p-4 sm:p-7 shadow-xs">
        {/* Progress & Quick Navigation Header */}
        <div className="flex items-center justify-between gap-2 pb-4 border-b border-stone-100">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-stone-500 font-medium">
            <span className="text-[#9E2A2B] font-bold">
              Quesito {safeIndex + 1} di {filteredExercises.length}
            </span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">
              Sessione: {sessionCorrect}/{sessionAnswered}
            </span>
            {sessionAnswered > 0 && (
              <>
                <span aria-hidden="true" className="hidden sm:inline">·</span>
                <span className="hidden sm:inline tabular-nums">
                  {Math.round((sessionCorrect / sessionAnswered) * 100)}% esatte
                </span>
              </>
            )}
          </div>

          {/* Top Quick Action Buttons: Navigate without scrolling! */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handlePrevExercise}
              title="Quesito precedente"
              className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg text-stone-600 hover:text-stone-900 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-xs transition-colors cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Precedente</span>
            </button>
            <button
              onClick={handleNextExercise}
              title="Passa al prossimo quesito"
              className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg text-stone-600 hover:text-stone-900 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-xs transition-colors cursor-pointer flex items-center gap-1"
            >
              <span className="hidden sm:inline">Salta / Prossimo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleToggleBookmark}
              title={isBookmarked ? 'Rimuovi dai preferiti' : 'Salva nei preferiti'}
              className="p-1.5 sm:p-2 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer flex items-center justify-center"
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-4 h-4 text-[#9E2A2B]" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={onOpenTables}
              className="text-xs text-stone-600 hover:text-[#9E2A2B] underline hidden md:flex items-center gap-1 cursor-pointer pl-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Tabelle</span>
            </button>
          </div>
        </div>

        {/* Source citation */}
        <div className="mt-3.5 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-stone-500">
          <span className="font-semibold text-stone-700">{currentExercise.category}</span>
          <span aria-hidden="true">·</span>
          <span className="text-stone-500">{currentExercise.bookRef}</span>
          <span aria-hidden="true">·</span>
          <span className="text-stone-700 font-mono bg-stone-100 px-1.5 py-0.5 rounded">
            {currentExercise.targetCase}
          </span>
        </div>

        {/* Prompt and Russian Sentence */}
        <div className="mt-4 sm:mt-5 space-y-3">
          <p className="text-xs sm:text-sm font-medium text-stone-700 leading-relaxed">
            {currentExercise.prompt}
          </p>

          <div className="p-4 sm:p-6 bg-stone-50/90 rounded-xl border border-stone-200/80 shadow-2xs">
            <p className="font-reading text-lg sm:text-2xl text-stone-900 tracking-wide leading-relaxed break-words">
              {currentExercise.russianSentence}
            </p>
          </div>
        </div>

        {/* Interactive Options Area - Touch & Click Responsive */}
        <div className="mt-5 sm:mt-6 space-y-2.5">
          <div className="flex items-center justify-between text-xs text-stone-500 pb-1">
            <span className="font-medium text-stone-600">
              {isAnswered
                ? 'Tocca un\'altra opzione per cambiare risposta o tocca «Prossimo Esercizio»'
                : 'Scegli la risposta corretta (tocca una delle 4 opzioni):'}
            </span>
            {isAnswered && (
              <button
                type="button"
                onClick={handleRetryCurrent}
                className="text-xs text-[#9E2A2B] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Riprova</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {currentExercise.options.map((option, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const isSelected = selectedOption === idx;
              const isCorrectTarget = idx === currentExercise.correctIndex;

              let btnStyle =
                'border-stone-200 bg-white hover:border-[#9E2A2B]/60 hover:bg-stone-50/90 text-stone-800 shadow-2xs active:scale-[0.99] cursor-pointer';

              if (isAnswered) {
                if (isCorrectTarget) {
                  btnStyle =
                    'border-emerald-500 bg-emerald-50/95 text-emerald-950 font-semibold ring-2 ring-emerald-400 shadow-xs cursor-pointer';
                } else if (isSelected && !isCorrectTarget) {
                  btnStyle =
                    'border-rose-400 bg-rose-50 text-rose-900 font-medium line-through cursor-pointer';
                } else {
                  btnStyle =
                    'border-stone-200 bg-stone-50/60 text-stone-500 hover:bg-stone-100 hover:text-stone-800 cursor-pointer';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  className={`min-h-[54px] sm:min-h-[60px] w-full flex items-center gap-3 p-3.5 sm:p-4 rounded-xl border text-left transition-all text-sm leading-snug touch-manipulation focus:outline-none focus:ring-2 focus:ring-[#9E2A2B]/40 ${btnStyle}`}
                >
                  <span
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                      isAnswered && isCorrectTarget
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : isAnswered && isSelected && !isCorrectTarget
                        ? 'bg-rose-600 text-white shadow-2xs'
                        : 'bg-stone-100 text-stone-700 border border-stone-200/60'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="font-reading text-base font-medium flex-1 break-words">
                    {option}
                  </span>
                  {isAnswered && isCorrectTarget && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswered && isSelected && !isCorrectTarget && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hint toggle before answering */}
        {!isAnswered && (
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2">
            <button
              type="button"
              onClick={handleAskHint}
              disabled={isHintVisible}
              className="text-xs font-medium text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg py-2.5 px-3.5 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 min-h-[42px]"
            >
              <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                {isHintVisible
                  ? 'Indizio attivo (vedi sotto)'
                  : 'Non lo so · Chiedi un indizio alla Tutrice'}
              </span>
            </button>
            <p className="text-[11px] sm:text-xs text-stone-400 text-center sm:text-right">
              Tocca una risposta per verificare la reggenza
            </p>
          </div>
        )}

        {/* Pedagogical Hint Card */}
        {isHintVisible && !isAnswered && (
          <div className="mt-3.5 p-3.5 sm:p-4 bg-amber-50/80 border border-amber-200/90 rounded-xl text-xs text-amber-950 space-y-1">
            <div className="font-semibold flex items-center gap-1.5 text-amber-900">
              <Compass className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Indizio Didattico della Tutrice (Senza spoiler):</span>
            </div>
            <p className="leading-relaxed pl-5 text-stone-700">
              {currentExercise.hint}
            </p>
          </div>
        )}

        {/* Immediate Detailed Feedback Area */}
        {isAnswered && (
          <div ref={feedbackRef} className="mt-5 pt-5 border-t border-stone-200 space-y-4">
            <div
              className={`p-4 sm:p-5 rounded-xl border flex flex-col sm:flex-row items-start gap-3.5 ${
                isCurrentCorrect
                  ? 'bg-emerald-50/95 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50/95 border-rose-300 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2 sm:block shrink-0">
                {isCurrentCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                ) : (
                  <XCircle className="w-6 h-6 text-rose-600" />
                )}
                <span className="sm:hidden font-bold text-sm">
                  {isCurrentCorrect ? '[RISPOSTA CORRETTA]' : '[RISPOSTA ERRATA]'}
                </span>
              </div>

              <div className="space-y-2 flex-1">
                <div className="hidden sm:flex items-center gap-2">
                  <span className="font-bold text-sm tracking-wide">
                    {isCurrentCorrect ? '[RISPOSTA CORRETTA]' : '[RISPOSTA ERRATA]'}
                  </span>
                  <span className="text-xs opacity-80">
                    Soluzione corretta: Opzione {String.fromCharCode(65 + currentExercise.correctIndex)} («{currentExercise.options[currentExercise.correctIndex]}»)
                  </span>
                </div>

                <div className="sm:hidden text-xs opacity-90 font-medium">
                  Soluzione: Opzione {String.fromCharCode(65 + currentExercise.correctIndex)} («{currentExercise.options[currentExercise.correctIndex]}»)
                </div>

                <div className="text-xs sm:text-sm leading-relaxed text-stone-800 pt-1 space-y-1">
                  <p className="font-semibold text-stone-900">
                    Spiegazione grammaticale della reggenza:
                  </p>
                  <p>{currentExercise.detailedExplanation}</p>
                </div>

                <div className="pt-2 text-[11px] sm:text-xs text-stone-500">
                  <span className="font-medium text-stone-600">Riferimento manuale:</span> {currentExercise.bookRef}
                </div>
              </div>
            </div>

            {/* Next Action Control Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <button
                  type="button"
                  onClick={handleRetryCurrent}
                  className="px-3.5 py-2 text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200/80 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer min-h-[44px]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Riprova questo quesito</span>
                </button>
                <span className="text-xs text-stone-400 hidden sm:inline">
                  {safeIndex + 1 < filteredExercises.length ? 'Quesito successivo disponibile' : 'Ricomincia da inizio blocco'}
                </span>
              </div>

              <button
                type="button"
                onClick={handleNextExercise}
                className="w-full sm:w-auto px-6 py-3 bg-[#9E2A2B] hover:bg-[#852324] text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.98] min-h-[48px]"
              >
                <span>Prossimo Esercizio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Helpful Quick Links below exercise */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <button
          onClick={onOpenTables}
          className="bg-white border border-stone-200 rounded-xl p-3.5 sm:p-4 flex items-center justify-between text-left hover:border-stone-300 transition-colors cursor-pointer"
        >
          <div>
            <h4 className="text-xs font-bold text-stone-900">Hai dubbi sulle desinenze?</h4>
            <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5">
              Consulta le tavole sinottiche di declinazione del testo.
            </p>
          </div>
          <span className="text-xs font-semibold text-[#9E2A2B] shrink-0 pl-2">
            Tabelle →
          </span>
        </button>

        <button
          onClick={() => onOpenDictionary()}
          className="bg-white border border-stone-200 rounded-xl p-3.5 sm:p-4 flex items-center justify-between text-left hover:border-stone-300 transition-colors cursor-pointer"
        >
          <div>
            <h4 className="text-xs font-bold text-stone-900">Vuoi cercare un verbo specifico?</h4>
            <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5">
              Sfoglia il dizionario offline con oltre 150 reggenze.
            </p>
          </div>
          <span className="text-xs font-semibold text-[#9E2A2B] shrink-0 pl-2">
            Glossario →
          </span>
        </button>
      </div>
    </div>
  );
};
