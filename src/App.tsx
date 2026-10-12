import React, { useState, useEffect } from 'react';
import { TopBar, ActiveTab } from './components/TopBar';
import { HeroBanner } from './components/HeroBanner';
import { TutorInteractiveMode } from './components/TutorInteractiveMode';
import { ChapterExplorer } from './components/ChapterExplorer';
import { GrammarTablesView } from './components/GrammarTablesView';
import { DictionaryView } from './components/DictionaryView';
import { StatsView } from './components/StatsView';
import { CaseType, SectionId, UserStats } from './types';
import { loadUserStats } from './utils/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('tutor');
  const [showHero, setShowHero] = useState<boolean>(true);
  const [stats, setStats] = useState<UserStats>(loadUserStats);
  const [quickPracticeTrigger, setQuickPracticeTrigger] = useState<number>(0);

  // Filters passed down to Tutor when navigated from other views
  const [tutorSectionFilter, setTutorSectionFilter] = useState<SectionId | 'all' | 'errors'>('all');
  const [tutorCaseFilter, setTutorCaseFilter] = useState<CaseType | 'all'>('all');
  const [dictionarySearchQuery, setDictionarySearchQuery] = useState<string>('');

  const handleQuickPractice = () => {
    setTutorSectionFilter('all');
    setTutorCaseFilter('all');
    setActiveTab('tutor');
    setShowHero(false);
    setQuickPracticeTrigger((prev) => prev + 1);
  };

  const handleStartSectionPractice = (sectionId: SectionId) => {
    setTutorSectionFilter(sectionId);
    setTutorCaseFilter('all');
    setActiveTab('tutor');
    setShowHero(false);
  };

  const handleStartCasePractice = (caseType: CaseType) => {
    setTutorSectionFilter('all');
    setTutorCaseFilter(caseType);
    setActiveTab('tutor');
    setShowHero(false);
  };

  const handleStartErrorReview = () => {
    setTutorSectionFilter('errors');
    setTutorCaseFilter('all');
    setActiveTab('tutor');
    setShowHero(false);
  };

  const handleOpenDictionaryWithQuery = (query?: string) => {
    if (query) {
      setDictionarySearchQuery(query);
    }
    setActiveTab('dictionary');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-[#1E252B]">
      {/* 3-Zone Top Bar Contract */}
      <TopBar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'tutor') {
            setShowHero(false);
          }
        }}
        onQuickPractice={handleQuickPractice}
        streak={stats.streak}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Hero banner shown on main entrance or toggled */}
        {showHero && activeTab === 'tutor' && (
          <HeroBanner
            onStartTutor={() => setShowHero(false)}
            onExploreChapters={() => setActiveTab('chapters')}
            onOpenDictionary={() => setActiveTab('dictionary')}
            onDismiss={() => setShowHero(false)}
          />
        )}

        {/* View Switcher */}
        {activeTab === 'tutor' && (
          <TutorInteractiveMode
            initialFilterSection={tutorSectionFilter}
            initialFilterCase={tutorCaseFilter}
            quickPracticeTrigger={quickPracticeTrigger}
            stats={stats}
            onUpdateStats={setStats}
            onOpenTables={() => setActiveTab('tables')}
            onOpenDictionary={handleOpenDictionaryWithQuery}
          />
        )}

        {activeTab === 'chapters' && (
          <ChapterExplorer
            stats={stats}
            onSelectSectionForPractice={handleStartSectionPractice}
          />
        )}

        {activeTab === 'tables' && <GrammarTablesView />}

        {activeTab === 'dictionary' && (
          <DictionaryView
            defaultSearchQuery={dictionarySearchQuery}
            onPracticeCase={handleStartCasePractice}
          />
        )}

        {activeTab === 'stats' && (
          <StatsView
            stats={stats}
            onUpdateStats={setStats}
            onStartErrorReview={handleStartErrorReview}
            onStartPractice={handleQuickPractice}
          />
        )}
      </main>

      {/* Quiet, Dignified Academic Footer */}
      <footer className="mt-auto border-t border-stone-200 bg-white text-stone-500 text-xs py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5 text-center sm:text-left">
            <p className="font-semibold text-stone-800">
              «Какой падеж? Какой предлог? Глагольное и именное управление»
            </p>
            <p>
              А.В. Величко, О.Н. Башлакова · Издательство «Русский язык». Курсы, Москва (3-е издание).
            </p>
          </div>
          <div className="flex items-center gap-4 text-stone-500">
            <span>Architettura 100% Offline</span>
            <span aria-hidden="true">·</span>
            <span>Supporto & Spiegazioni in Italiano</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
