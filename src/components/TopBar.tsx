import React from 'react';
import { BookOpen, Sparkles, RotateCcw } from 'lucide-react';

export type ActiveTab = 'tutor' | 'chapters' | 'tables' | 'dictionary' | 'stats';

interface TopBarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onQuickPractice: () => void;
  streak: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  onSelectTab,
  onQuickPractice,
  streak,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 py-3.5">
        {/* Zone 1: Single text element Brand Zone */}
        <button
          onClick={() => onSelectTab('tutor')}
          className="text-left font-serif text-lg font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 hover:text-[#9E2A2B] transition-colors focus:outline-none"
        >
          <span className="text-[#9E2A2B]">Управление</span> · Russian Tutor
        </button>

        {/* Zone 2: 4-5 single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => onSelectTab('tutor')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors ${
              activeTab === 'tutor'
                ? 'border-[#9E2A2B] text-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900 hover:border-stone-300'
            }`}
          >
            Tutor Interattivo
          </button>
          <button
            onClick={() => onSelectTab('chapters')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors ${
              activeTab === 'chapters'
                ? 'border-[#9E2A2B] text-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900 hover:border-stone-300'
            }`}
          >
            Percorsi & Capitoli
          </button>
          <button
            onClick={() => onSelectTab('tables')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors ${
              activeTab === 'tables'
                ? 'border-[#9E2A2B] text-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900 hover:border-stone-300'
            }`}
          >
            Tavole Declinazioni
          </button>
          <button
            onClick={() => onSelectTab('dictionary')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors ${
              activeTab === 'dictionary'
                ? 'border-[#9E2A2B] text-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900 hover:border-stone-300'
            }`}
          >
            Dizionario Reggenze
          </button>
          <button
            onClick={() => onSelectTab('stats')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors ${
              activeTab === 'stats'
                ? 'border-[#9E2A2B] text-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900 hover:border-stone-300'
            }`}
          >
            Ripasso & Errori
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {streak > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 tabular-nums">
              <span>🔥</span>
              <span>{streak} di fila</span>
            </div>
          )}
          <button
            onClick={onQuickPractice}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#9E2A2B] rounded-lg hover:bg-[#852324] active:scale-[0.98] transition-all shadow-sm whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nuovo Esercizio</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Row */}
      <div className="md:hidden flex items-center justify-around border-t border-stone-100 px-2 py-2 overflow-x-auto text-xs font-medium text-stone-600 bg-stone-50/80">
        <button
          onClick={() => onSelectTab('tutor')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'tutor' ? 'bg-[#9E2A2B] text-white font-semibold' : ''}`}
        >
          Tutor
        </button>
        <button
          onClick={() => onSelectTab('chapters')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'chapters' ? 'bg-[#9E2A2B] text-white font-semibold' : ''}`}
        >
          Capitoli
        </button>
        <button
          onClick={() => onSelectTab('tables')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'tables' ? 'bg-[#9E2A2B] text-white font-semibold' : ''}`}
        >
          Tabelle
        </button>
        <button
          onClick={() => onSelectTab('dictionary')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'dictionary' ? 'bg-[#9E2A2B] text-white font-semibold' : ''}`}
        >
          Dizionario
        </button>
        <button
          onClick={() => onSelectTab('stats')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'stats' ? 'bg-[#9E2A2B] text-white font-semibold' : ''}`}
        >
          Progressi
        </button>
      </div>
    </header>
  );
};
