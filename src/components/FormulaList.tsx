import { useState } from 'react';
import { formulas, FORMULA_CATEGORIES } from '../data';
import { Search, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FormulaList() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFormulas = formulas.filter(f => {
    const matchesCategory = activeCategory === 'All' || f.category === activeCategory;
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         f.equation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between pb-6 border-b border-ink">
        <h2 className="editorial-serif italic text-4xl font-bold flex items-center gap-3">
          Thư viện Công thức
        </h2>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink opacity-40" />
          <input
            type="text"
            placeholder="Tìm kiếm tài liệu..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-ink focus:outline-none focus:ring-1 focus:ring-ink transition-all text-xs uppercase tracking-widest font-bold"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 custom-scroll">
        <button
          onClick={() => setActiveCategory('All')}
          className={`px-4 py-1.5 border transition-all text-[10px] uppercase font-black tracking-widest ${
            activeCategory === 'All'
              ? 'bg-ink text-white border-ink'
              : 'bg-white text-ink border-ink/20 hover:border-ink'
          }`}
        >
          Tất cả
        </button>
        {FORMULA_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 border transition-all text-[10px] uppercase font-black tracking-widest whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-ink text-white border-ink'
                : 'bg-white text-ink border-ink/20 hover:border-ink'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink border border-ink">
        <AnimatePresence mode="popLayout">
          {filteredFormulas.map((formula, idx) => (
            <motion.div
              layout
              key={formula.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white p-6 hover:bg-page-bg transition-colors group relative"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-[9px] uppercase tracking-[0.2em] font-black text-ink/40">
                  {formula.category}
                </span>
                <Info className="w-4 h-4 text-ink opacity-10 group-hover:opacity-40 transition-opacity cursor-help" />
              </div>
              <h3 className="editorial-serif text-2xl font-bold mb-4 italic group-hover:underline underline-offset-4 decoration-1">{formula.name}</h3>
              <div className="bg-[#f2f0ed] p-4 border border-dashed border-ink/40 mb-4 font-mono text-ink text-sm overflow-x-auto leading-relaxed">
                {formula.equation}
              </div>
              <p className="text-xs text-ink/70 italic leading-relaxed mb-6">
                — {formula.description}
              </p>
              {formula.example && (
                <div className="border-t border-ink/10 pt-4 mt-auto">
                  <div className="text-[9px] uppercase font-black text-emerald-700 mb-1 tracking-widest">Ví dụ điển hình</div>
                  <p className="text-[11px] text-ink/80 leading-relaxed italic">{formula.example}</p>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredFormulas.length === 0 && (
        <div className="text-center py-20 bg-white border border-ink">
          <p className="editorial-serif italic text-xl opacity-40">Không tìm thấy tài liệu phù hợp.</p>
        </div>
      )}
    </div>
  );
}
