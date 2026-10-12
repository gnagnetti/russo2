import React from 'react';
import {
  GraduationCap,
  BookMarked,
  Table,
  BookOpen,
  TrendingUp,
  Sparkles,
  Flame,
} from 'lucide-react';

export type ActiveTab = 'tutor' | 'chapters' | 'tables' | 'dictionary' | 'stats';

interface TopBarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onQuickPractice: () => void;
  streak: number;
  errorCount?: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  onSelectTab,
  onQuickPractice,
  streak,
  errorCount = 0,
}) => {
  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5">
          {/* Zone 1: Brand Zone */}
          <button
            onClick={() => onSelectTab('tutor')}
            className="text-left font-serif text-base sm:text-lg font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 hover:text-[#9E2A2B] transition-colors focus:outline-none cursor-pointer"
          >
            <span className="text-[#9E2A2B]">Управление</span>
            <span className="text-stone-400 font-sans font-normal mx-1">·</span>
            <span className="hidden xs:inline">Russian Tutor</span>
          </button>

          {/* Zone 2: Desktop Navigation Links (hidden on mobile) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-stone-600">
            <button
              onClick={() => onSelectTab('tutor')}
              className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'tutor'
                  ? 'border-[#9E2A2B] text-stone-900 font-semibold'
                  : 'border-transparent hover:text-stone-900 hover:border-stone-300'
              }`}
            >
              Tutor Interattivo
            </button>
            <button
              onClick={() => onSelectTab('chapters')}
              className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'chapters'
                  ? 'border-[#9E2A2B] text-stone-900 font-semibold'
                  : 'border-transparent hover:text-stone-900 hover:border-stone-300'
              }`}
            >
              Percorsi & Capitoli
            </button>
            <button
              onClick={() => onSelectTab('tables')}
              className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'tables'
                  ? 'border-[#9E2A2B] text-stone-900 font-semibold'
                  : 'border-transparent hover:text-stone-900 hover:border-stone-300'
              }`}
            >
              Tavole Declinazioni
            </button>
            <button
              onClick={() => onSelectTab('dictionary')}
              className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'dictionary'
                  ? 'border-[#9E2A2B] text-stone-900 font-semibold'
                  : 'border-transparent hover:text-stone-900 hover:border-stone-300'
              }`}
            >
              Dizionario Reggenze
            </button>
            <button
              onClick={() => onSelectTab('stats')}
              className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors relative cursor-pointer ${
                activeTab === 'stats'
                  ? 'border-[#9E2A2B] text-stone-900 font-semibold'
                  : 'border-transparent hover:text-stone-900 hover:border-stone-300'
              }`}
            >
              <span>Ripasso & Errori</span>
              {errorCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 bg-rose-100 text-rose-700 text-[10px] font-bold rounded-full">
                  {errorCount}
                </span>
              )}
            </button>
          </nav>

          {/* Zone 3: Actions & Streak */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {streak > 0 && (
              <div
                title={`${streak} risposte esatte consecutive`}
                className="flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200/90 tabular-nums shrink-0"
              >
                <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                <span>{streak}</span>
                <span className="hidden sm:inline">di fila</span>
              </div>
            )}
            <button
              onClick={onQuickPractice}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold text-white bg-[#9E2A2B] rounded-lg hover:bg-[#852324] active:scale-[0.98] transition-all shadow-xs whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer touch-manipulation min-h-[38px]"
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden xs:inline">Nuovo Esercizio</span>
              <span className="xs:hidden">Nuovo</span>
            </button>
          </div>
        </div>
      </header>

      {/* Fixed Native-Style Mobile Bottom Navigation Bar */}
      <nav
        aria-label="Navigazione mobile"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] px-1 py-1 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
      >
        <div className="grid grid-cols-5 gap-0.5 max-w-md mx-auto">
          <button
            type="button"
            onClick={() => onSelectTab('tutor')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-colors cursor-pointer min-h-[50px] touch-manipulation ${
              activeTab === 'tutor'
                ? 'text-[#9E2A2B] font-bold bg-[#9E2A2B]/5'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <GraduationCap
              className={`w-5 h-5 mb-0.5 ${
                activeTab === 'tutor' ? 'text-[#9E2A2B] stroke-[2.4]' : 'text-stone-500'
              }`}
            />
            <span className="text-[10px] leading-tight tracking-tight">Tutor</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('chapters')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-colors cursor-pointer min-h-[50px] touch-manipulation ${
              activeTab === 'chapters'
                ? 'text-[#9E2A2B] font-bold bg-[#9E2A2B]/5'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <BookMarked
              className={`w-5 h-5 mb-0.5 ${
                activeTab === 'chapters' ? 'text-[#9E2A2B] stroke-[2.4]' : 'text-stone-500'
              }`}
            />
            <span className="text-[10px] leading-tight tracking-tight">Capitoli</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('tables')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-colors cursor-pointer min-h-[50px] touch-manipulation ${
              activeTab === 'tables'
                ? 'text-[#9E2A2B] font-bold bg-[#9E2A2B]/5'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Table
              className={`w-5 h-5 mb-0.5 ${
                activeTab === 'tables' ? 'text-[#9E2A2B] stroke-[2.4]' : 'text-stone-500'
              }`}
            />
            <span className="text-[10px] leading-tight tracking-tight">Tabelle</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('dictionary')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-colors cursor-pointer min-h-[50px] touch-manipulation ${
              activeTab === 'dictionary'
                ? 'text-[#9E2A2B] font-bold bg-[#9E2A2B]/5'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <BookOpen
              className={`w-5 h-5 mb-0.5 ${
                activeTab === 'dictionary' ? 'text-[#9E2A2B] stroke-[2.4]' : 'text-stone-500'
              }`}
            />
            <span className="text-[10px] leading-tight tracking-tight">Dizionario</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('stats')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-colors cursor-pointer min-h-[50px] relative touch-manipulation ${
              activeTab === 'stats'
                ? 'text-[#9E2A2B] font-bold bg-[#9E2A2B]/5'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <div className="relative mb-0.5">
              <TrendingUp
                className={`w-5 h-5 ${
                  activeTab === 'stats' ? 'text-[#9E2A2B] stroke-[2.4]' : 'text-stone-500'
                }`}
              />
              {errorCount > 0 && (
                <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-rose-600 ring-2 ring-white" />
              )}
            </div>
            <span className="text-[10px] leading-tight tracking-tight">Ripasso</span>
          </button>
        </div>
      </nav>
    </>
  );
};
