import React, { useState, useMemo } from 'react';
import { Search, Book, Sparkles, Filter, ExternalLink } from 'lucide-react';
import { GOVERNANCE_DICTIONARY } from '../data/governanceDictionary';
import { CaseType } from '../types';

interface DictionaryViewProps {
  onPracticeCase: (caseType: CaseType) => void;
  defaultSearchQuery?: string;
}

export const DictionaryView: React.FC<DictionaryViewProps> = ({
  onPracticeCase,
  defaultSearchQuery = '',
}) => {
  const [searchTerm, setSearchTerm] = useState(defaultSearchQuery);
  const [selectedCase, setSelectedCase] = useState<CaseType | 'all'>('all');
  const [selectedSection, setSelectedSection] = useState<string>('all');

  const filteredEntries = useMemo(() => {
    return GOVERNANCE_DICTIONARY.filter((entry) => {
      const matchSearch =
        searchTerm.trim() === '' ||
        entry.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.italianMeaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.governmentFormula.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCase =
        selectedCase === 'all' || entry.cases.includes(selectedCase);

      const matchSection =
        selectedSection === 'all' || entry.section === selectedSection;

      return matchSearch && matchCase && matchSection;
    });
  }, [searchTerm, selectedCase, selectedSection]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#9E2A2B] uppercase tracking-wider">
          <Book className="w-4 h-4" />
          <span>Словарь управлений (Dizionario delle Reggenze)</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 mt-1">
          Repertorio Ufficiale dei Verbi e della Reggenza
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
          Tratto dallo «Список слов, управление которых отрабатывается во втором и третьем разделах»
          (pagg. 100–113 e 170–175). Cerca qualsiasi verbo o aggettivo in russo o in italiano per
          scoprire la reggenza esatta, le formule di caso e gli esempi d\'autore.
        </p>

        {/* Search Input & Filters */}
        <div className="mt-5 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cerca verbo russo (es. верить, гордиться) o significato italiano (es. sperare, guidare)..."
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-[#9E2A2B] focus:border-[#9E2A2B] transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
              >
                Cancella
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
            {/* Case Filter */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-stone-500 font-medium">Caso:</span>
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
                      ? 'bg-stone-900 text-white font-semibold'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {c === 'all' ? 'Tutti' : c}
                </button>
              ))}
            </div>

            {/* Section Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500 font-medium">Registro:</span>
              {['all', 'Base', 'Letterario', 'Scientifico', 'Variabile'].map((sec) => (
                <button
                  key={sec}
                  onClick={() => setSelectedSection(sec)}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    selectedSection === sec
                      ? 'bg-[#9E2A2B] text-white font-semibold'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {sec === 'all' ? 'Tutti' : sec}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-stone-500 px-1">
        <span>Trovati {filteredEntries.length} lemmi</span>
        <span>Manuale Velichko & Bashlakova</span>
      </div>

      {/* Dictionary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEntries.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-stone-300 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-reading text-lg font-bold text-stone-900">
                    {item.word}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                    {item.aspect && <span>{item.aspect}</span>}
                    <span aria-hidden="true">·</span>
                    <span className="capitalize">{item.partOfSpeech}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#9E2A2B] font-medium">{item.section}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 justify-end">
                  {item.cases.map((c) => (
                    <span
                      key={c}
                      className="px-2 py-0.5 text-[11px] font-mono bg-stone-100 text-stone-700 rounded"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Formula */}
              <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200/80">
                <span className="text-[11px] font-semibold text-stone-500 uppercase block">
                  Reggenza sintattica (Управление):
                </span>
                <span className="text-sm font-mono font-bold text-[#9E2A2B]">
                  {item.governmentFormula}
                </span>
              </div>

              {/* Meaning in Italian */}
              <div>
                <span className="text-xs text-stone-500 block">Significato italiano:</span>
                <p className="text-xs sm:text-sm font-semibold text-stone-800">
                  {item.italianMeaning}
                </p>
              </div>

              {/* Book Example */}
              <div className="pt-2 border-t border-stone-100 space-y-1">
                <p className="font-reading text-sm text-stone-900 leading-snug">
                  «{item.exampleRussian}»
                </p>
                <p className="text-xs text-stone-500 italic">
                  {item.exampleItalian}
                </p>
              </div>

              {/* Special notes if any */}
              {item.notes && (
                <div className="p-2.5 bg-amber-50/70 border border-amber-200/60 rounded-lg text-xs text-amber-900">
                  <span className="font-bold">Nota della tutrice:</span> {item.notes}
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-400">Pratica il caso associato</span>
              <button
                onClick={() => onPracticeCase(item.cases[0])}
                className="text-[#9E2A2B] font-semibold hover:underline flex items-center gap-1"
              >
                <span>Esercitati su {item.cases[0]}</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
