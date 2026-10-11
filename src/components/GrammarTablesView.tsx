import React, { useState } from 'react';
import { Table, Sparkles, AlertCircle, Info, BookOpen } from 'lucide-react';
import { GRAMMAR_TABLES, SYNTACTIC_RULES_SUMMARY } from '../data/grammarReference';

export const GrammarTablesView: React.FC = () => {
  const [selectedTableId, setSelectedTableId] = useState<string>('table_1');

  const currentTable =
    GRAMMAR_TABLES.find((t) => t.id === selectedTableId) || GRAMMAR_TABLES[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#9E2A2B] uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Справочные таблицы (Tavole di Riferimento 1–8)</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 mt-1">
          Tavole Sinottiche di Declinazione e Regole Sintattiche
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
          Tabelle complete di declinazione dei sostantivi e degli aggettivi russe estratte direttamente dalle
          pagine 26–36 del manuale di A.V. Velichko.
        </p>

        {/* Table Selector Tabs */}
        <div className="mt-5 flex flex-wrap gap-2">
          {GRAMMAR_TABLES.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTableId(tab.id)}
              className={`px-3 py-2 text-xs rounded-lg transition-all border cursor-pointer ${
                selectedTableId === tab.id
                  ? 'bg-stone-900 border-stone-900 text-white font-semibold shadow-xs'
                  : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              <span className="opacity-70 mr-1.5">{tab.tableNumber}:</span>
              <span>{tab.title.split('(')[0].trim()}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Table Card */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold text-[#9E2A2B] uppercase tracking-wide">
            {currentTable.tableNumber}
          </span>
          <h2 className="text-lg sm:text-xl font-bold font-serif text-stone-900 mt-0.5">
            {currentTable.title}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            {currentTable.subtitle}
          </p>
        </div>

        {/* The Matrix Table */}
        <div className="overflow-x-auto border border-stone-200 rounded-xl">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-stone-100/90 text-stone-900 font-semibold border-b border-stone-200">
                {currentTable.columns.map((col, idx) => (
                  <th key={idx} className="p-3 sm:p-3.5 whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {currentTable.rows.map((row, rIdx) => (
                <tr
                  key={rIdx}
                  className={rIdx % 2 === 0 ? 'bg-white' : 'bg-stone-50/50 hover:bg-stone-50'}
                >
                  <td className="p-3 sm:p-3.5 font-medium text-stone-800 whitespace-nowrap">
                    <span className="block font-semibold text-stone-900">{row.caseName}</span>
                    <span className="text-[11px] text-stone-500 font-mono">{row.caseAbbr}</span>
                  </td>
                  {row.cells.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className="p-3 sm:p-3.5 font-reading text-stone-800 whitespace-nowrap"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Notes */}
        {currentTable.notes.length > 0 && (
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 space-y-2">
            <h4 className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#9E2A2B]" />
              <span>Note Grammaticali & Particolarità:</span>
            </h4>
            <ul className="text-xs text-stone-600 space-y-1.5 list-disc list-inside leading-relaxed">
              {currentTable.notes.map((note, nIdx) => (
                <li key={nIdx}>{note}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Golden Syntactic Rules Accordion / Cards */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Regole Sintattiche Fondamentali del Manuale</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SYNTACTIC_RULES_SUMMARY.map((rule, idx) => (
            <div
              key={idx}
              className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-stone-900 font-serif">
                  {rule.title}
                </h3>
                <div className="p-2.5 bg-amber-50/70 border border-amber-200/60 rounded-lg text-xs font-mono text-amber-900 leading-snug">
                  {rule.ruleRussian}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed whitespace-pre-line pt-1">
                  {rule.ruleItalian}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100">
                <span className="text-[11px] font-bold text-stone-500 uppercase block mb-1">
                  Esempi dal libro:
                </span>
                <ul className="text-xs font-reading text-stone-800 space-y-1">
                  {rule.examples.map((ex, eIdx) => (
                    <li key={eIdx}>• {ex}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
