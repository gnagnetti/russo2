import React, { useState } from 'react';
import { Play, BookOpen, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

interface HeroBannerProps {
  onStartTutor: () => void;
  onExploreChapters: () => void;
  onOpenDictionary: () => void;
  onDismiss?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onStartTutor,
  onExploreChapters,
  onOpenDictionary,
  onDismiss,
}) => {
  const [imageLoaded, setImageLoaded] = useState(true);

  return (
    <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs relative">
      {onDismiss && (
        <button
          onClick={onDismiss}
          title="Nascondi presentazione e vai agli esercizi"
          className="absolute top-3 right-3 z-10 text-xs text-stone-500 hover:text-stone-900 bg-white/90 hover:bg-stone-100 border border-stone-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
        >
          <span>✕</span>
          <span className="hidden sm:inline">Nascondi</span>
        </button>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Column: Pedagogical Introduction */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-stone-500">
              <span className="text-[#9E2A2B] uppercase tracking-wider">
                100% Offline · Metodo Filologico
              </span>
              <span aria-hidden="true">·</span>
              <span>A.V. Velichko & O.N. Bashlakova (Mosca, 2008)</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-stone-900 tracking-tight leading-tight">
              Какой падеж? Какой предлог?
              <span className="block text-lg sm:text-xl font-normal text-stone-600 font-sans mt-1">
                Tutrice Interattiva per la Reggenza Verbale e Nominale Russa
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xl">
              Padroneggia l\'uso dei casi e delle reggenze preposizionali (управление)
              attraverso un percorso guidato rigoroso: <strong>un esercizio alla volta</strong>,
              spiegazioni chiare in lingua italiana, indizi didattici immediati e il repertorio
              completo di lessico letterario e scientifico del manuale di riferimento.
            </p>
          </div>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
              <span className="font-semibold text-stone-900 block">Un Esercizio alla Volta</span>
              <span className="text-stone-500 mt-0.5 block leading-normal">
                Quesito singolo a scelta multipla con indizi guidati ("Non lo so").
              </span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
              <span className="font-semibold text-stone-900 block">Feedback Dettagliato</span>
              <span className="text-stone-500 mt-0.5 block leading-normal">
                Spiegazione grammaticale in italiano con richiamo esatto al capitolo.
              </span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
              <span className="font-semibold text-stone-900 block">Tabelle & Glossario</span>
              <span className="text-stone-500 mt-0.5 block leading-normal">
                Tavole 1–8 di declinazione e oltre 150 verbi con reggenze d\'autore.
              </span>
            </div>
          </div>

          {/* Primary Action Group */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onStartTutor}
              className="px-5 py-2.5 bg-[#9E2A2B] hover:bg-[#852324] active:scale-[0.98] text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Avvia Pratica Interattiva</span>
            </button>
            <button
              onClick={onExploreChapters}
              className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200/80 text-stone-800 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-stone-600" />
              <span>Sfoglia i 3 Reparti</span>
            </button>
            <button
              onClick={onOpenDictionary}
              className="px-3.5 py-2.5 text-xs text-stone-600 hover:text-stone-900 underline"
            >
              Cerca nel Glossario
            </button>
          </div>
        </div>

        {/* Right Column: Visual illustration of the Russian grammar manual */}
        <div className="lg:col-span-5 relative bg-stone-100 flex items-center justify-center overflow-hidden min-h-[260px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-stone-200">
          {imageLoaded ? (
            <img
              src="/src/assets/images/russian_tutor_cover_1791736954312.jpg"
              alt="Manuale di grammatica russa e reggenza verbale di A.V. Velichko e O.N. Bashlakova"
              className="w-full h-full object-cover"
              onError={() => setImageLoaded(false)}
            />
          ) : (
            <div className="p-8 text-center space-y-3 bg-gradient-to-br from-stone-900 to-[#9E2A2B] text-white w-full h-full flex flex-col items-center justify-center">
              <span className="font-serif text-3xl font-bold">Какой падеж?</span>
              <span className="font-serif text-2xl font-semibold opacity-90">Какой предлог?</span>
              <p className="text-xs text-stone-200 max-w-xs mt-2">
                Глагольное и именное управление · Учебное пособие
              </p>
            </div>
          )}
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2.5 py-1 rounded-md font-mono">
            A.V. Velichko · O.N. Bashlakova
          </div>
        </div>
      </div>
    </div>
  );
};
