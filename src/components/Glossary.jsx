import React, { useState } from 'react';
import { Search, Info, HelpCircle } from 'lucide-react';

function Glossary({ glossaryList }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGlossary = glossaryList.filter(item =>
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Header Info */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
          <Info className="w-8 h-8 text-indigo-500" /> Trading Glossary & Terms Dictionary
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          A dictionary of essential financial terms. Master trading jargon with quick filters (similar to GeeksforGeeks terminology archives).
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search glossary terms (e.g. Bear, Short, Dividend, P/E)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl pl-12 pr-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-950 transition"
        />
      </div>

      {/* Grid Results */}
      {filteredGlossary.length === 0 ? (
        <div className="p-8 text-center text-slate-500 italic border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
          No glossary terms match your search query. Try another keyword!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGlossary.map((item, idx) => (
            <div
              key={idx}
              className="p-5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2 hover:border-indigo-400 transition group"
            >
              <div className="flex items-center gap-1.5 justify-between">
                <span className="font-extrabold text-base text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500 transition">
                  {item.term}
                </span>
                <HelpCircle className="w-4 h-4 text-slate-400 opacity-40" />
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.definition}
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Glossary;
