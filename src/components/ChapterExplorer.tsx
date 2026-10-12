import React from 'react';
import { BookMarked, Play, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { SECTIONS_DATA } from '../data/chapters';
import { SectionId, UserStats } from '../types';
import { EXERCISES_DATABASE } from '../data/exercises';

interface ChapterExplorerProps {
  stats: UserStats;
  onSelectSectionForPractice: (sectionId: SectionId) => void;
}

export const ChapterExplorer: React.FC<ChapterExplorerProps> = ({
  stats,
  onSelectSectionForPractice,
}) => {
  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#9E2A2B] uppercase tracking-wider">
              <BookMarked className="w-4 h-4" />
              <span>Programma Didattico Ufficiale</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 mt-1">
              Struttura dei Contenuti e Percorsi Tematici
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
              Basato fedelmente sui tre grandi reparti del manuale di A.V. Velichko e O.N. Bashlakova{' '}
              <em>«Какой падеж? Какой предлог? Глагольное и именное управление»</em> (Mosca, 2008).
            </p>
          </div>
          <div className="shrink-0 bg-stone-50 border border-stone-200/80 p-3 rounded-lg text-xs text-stone-600">
            <span className="font-semibold text-stone-900 block">Progresso Globale</span>
            <span className="text-stone-500 tabular-nums">
              {stats.completedExerciseIds.length} di {EXERCISES_DATABASE.length} esercizi completati
            </span>
          </div>
        </div>
      </div>

      {/* 3 Main Sections */}
      <div className="space-y-6">
        {SECTIONS_DATA.map((section) => {
          const sectionExercises = EXERCISES_DATABASE.filter(
            (ex) => ex.sectionId === section.id
          );
          const completedInSection = sectionExercises.filter((ex) =>
            (stats?.completedExerciseIds || []).includes(ex.id)
          ).length;
          const sectionPct =
            sectionExercises.length > 0
              ? Math.round((completedInSection / sectionExercises.length) * 100)
              : 0;

          return (
            <div
              key={section.id}
              className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs"
            >
              {/* Section Header Banner */}
              <div className="p-6 border-b border-stone-100 bg-stone-50/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-stone-500">
                    <span className="text-[#9E2A2B]">SEZIONE {section.number}</span>
                    <span aria-hidden="true">·</span>
                    <span>{section.author}</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-stone-900 font-serif">
                    {section.titleItalian}
                  </h2>
                  <p className="font-reading text-sm text-[#9E2A2B] font-medium">
                    {section.titleRussian}
                  </p>
                  <p className="text-xs sm:text-sm text-stone-600 pt-1 leading-relaxed max-w-3xl">
                    {section.descriptionItalian}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                  <div className="text-right hidden sm:block">
                    <span className="text-xs text-stone-500 block">Avanzamento</span>
                    <span className="text-xs font-bold text-stone-900 tabular-nums">
                      {completedInSection}/{sectionExercises.length} ({sectionPct}%)
                    </span>
                  </div>
                  <button
                    onClick={() => onSelectSectionForPractice(section.id)}
                    className="px-4 py-2 bg-[#9E2A2B] hover:bg-[#852324] text-white text-xs font-semibold rounded-lg flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Esercitati su Sezione {section.number}</span>
                  </button>
                </div>
              </div>

              {/* Subtopics List */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.subtopics.map((sub, idx) => (
                  <div
                    key={sub.id}
                    className="p-4 rounded-xl border border-stone-100 bg-white hover:border-stone-300 transition-colors flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-stone-800">
                          {idx + 1}. {sub.titleItalian}
                        </span>
                      </div>
                      <p className="text-xs font-reading text-stone-600 italic">
                        {sub.titleRussian}
                      </p>
                      <p className="text-xs text-stone-600 leading-relaxed pt-1">
                        {sub.summary}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-50 flex items-center justify-between text-xs">
                      <span className="text-stone-400">
                        {sub.exerciseCount} esercizi nel manuale
                      </span>
                      <button
                        onClick={() => onSelectSectionForPractice(section.id)}
                        className="text-[#9E2A2B] font-semibold hover:underline flex items-center gap-1"
                      >
                        <span>Pratica</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
