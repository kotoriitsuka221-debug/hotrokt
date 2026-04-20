import { useState } from 'react';
import { exercises } from '../data';
import { RefreshCw, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ExerciseList() {
  const [userAnswers, setUserAnswers] = useState<{[key: string]: string}>({});
  const [results, setResults] = useState<{[key: string]: 'correct' | 'wrong' | null}>({});
  const [showExplanation, setShowExplanation] = useState<{[key: string]: boolean}>({});

  const checkAnswer = (id: string, correct: number) => {
    const userVal = parseFloat(userAnswers[id]);
    if (isNaN(userVal)) return;

    if (Math.abs(userVal - correct) < 0.01) {
      setResults(prev => ({ ...prev, [id]: 'correct' }));
    } else {
      setResults(prev => ({ ...prev, [id]: 'wrong' }));
    }
  };

  const reset = (id: string) => {
    setUserAnswers(prev => ({ ...prev, [id]: '' }));
    setResults(prev => ({ ...prev, [id]: null }));
    setShowExplanation(prev => ({ ...prev, [id]: false }));
  };

  return (
    <div className="space-y-12">
      <div className="pb-6 border-b border-ink">
        <h2 className="editorial-serif italic text-4xl font-bold">Phòng Thực hành #42</h2>
        <p className="text-[10px] uppercase font-black tracking-widest opacity-60 mt-2">Môi trường giả lập tình huống kế toán thực tế</p>
      </div>

      <div className="space-y-12">
        {exercises.map((ex, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={ex.id}
            className="bg-white border border-ink shadow-[6px_6px_0px_#1a1a1a] overflow-hidden"
          >
            <div className="bg-[#f2f0ed] p-4 border-b border-ink flex justify-between items-center">
              <span className="text-[10px] font-black text-ink uppercase tracking-widest">
                Tình huống số {idx + 1} — {ex.category}
              </span>
              <span className="text-[9px] bg-ink text-white px-2 py-0.5 font-bold">KHÓ</span>
            </div>
            
            <div className="p-8 space-y-8">
              <h3 className="editorial-serif text-2xl leading-relaxed underline decoration-1 underline-offset-8 decoration-ink/20 italic">
                {ex.question}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-ink uppercase tracking-widest">Đáp án của bạn (Đơn vị: {ex.unit})</label>
                  <input
                    type="number"
                    value={userAnswers[ex.id] || ''}
                    onChange={(e) => setUserAnswers(prev => ({ ...prev, [ex.id]: e.target.value }))}
                    disabled={results[ex.id] === 'correct'}
                    className={`w-full p-4 border focus:outline-none transition-all font-mono text-lg ${
                      results[ex.id] === 'correct' ? 'border-emerald-500 bg-emerald-50 text-emerald-900 line-through' : 
                      results[ex.id] === 'wrong' ? 'border-rose-500 bg-rose-50 text-rose-900' :
                      'border-ink bg-white focus:ring-1 focus:ring-ink'
                    }`}
                    placeholder="0.00"
                  />
                </div>
                
                <div className="flex gap-3 h-[52px]">
                  {results[ex.id] !== 'correct' && (
                    <button
                      onClick={() => checkAnswer(ex.id, ex.correctValue)}
                      className="flex-1 bg-ink text-white text-[11px] font-black uppercase tracking-widest hover:opacity-90 active:translate-y-1 transition-all"
                    >
                      Nộp lời giải
                    </button>
                  )}
                  {results[ex.id] && (
                    <button
                      onClick={() => reset(ex.id)}
                      className="w-14 border border-ink flex items-center justify-center hover:bg-page-bg transition-colors"
                    >
                      <RefreshCw className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {(results[ex.id] === 'wrong' || showExplanation[ex.id]) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-[#f2f0ed] border border-ink/20 flex gap-4">
                      <HelpCircle className="w-6 h-6 text-ink shrink-0 mt-0.5 opacity-40" />
                      <div className="space-y-2">
                        <p className="text-[10px] font-black text-ink uppercase tracking-widest">Phân tích nghiệp vụ:</p>
                        <p className="text-sm text-ink/80 italic leading-relaxed">{ex.explanation}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {results[ex.id] === 'wrong' && !showExplanation[ex.id] && (
                <button
                  onClick={() => setShowExplanation(prev => ({ ...prev, [ex.id]: true }))}
                  className="text-[10px] text-ink font-black uppercase tracking-widest hover:underline pt-2"
                >
                  [+] Xem diễn giải chi tiết
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="py-12 border-y-4 border-double border-ink text-center">
        <p className="editorial-serif italic text-2xl opacity-80">
          "Kế toán là nghệ thuật của sự chính xác."
        </p>
      </div>
    </div>
  );
}
