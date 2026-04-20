/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BookOpen, Calculator, MessageSquare, GraduationCap, Github, TrendingUp, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import FormulaList from './components/FormulaList';
import ExerciseList from './components/ExerciseList';
import AIChat from './components/AIChat';
import { formulas, exercises } from './data';

type Tab = 'formulas' | 'exercises' | 'ai-chat';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('formulas');

  return (
    <div className="min-h-screen bg-page-bg text-ink flex flex-col custom-scroll">
      {/* Editorial Header */}
      <header className="h-24 border-b border-ink flex items-center justify-between px-8 bg-page-bg">
        <div>
          <h1 className="editorial-serif text-4xl italic font-bold tracking-tight">Học Viện Kế Toán.</h1>
          <p className="text-[10px] uppercase tracking-widest opacity-60">The Accountant's Professional Manual</p>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <div className="text-right">
            <span className="block text-[10px] uppercase opacity-50 font-bold">Hồ sơ sinh viên</span>
            <span className="font-medium editorial-serif italic">Kế Toán Pro • K65</span>
          </div>
          <div className="w-12 h-12 bg-ink rounded-full flex items-center justify-center text-white font-bold editorial-serif italic text-lg shadow-[3px_3px_0px_rgba(0,0,0,0.1)]">
            KT
          </div>
        </div>
      </header>

      {/* Sub-header Navigation */}
      <div className="h-14 border-b border-ink flex items-center px-8 gap-12 bg-white sticky top-0 z-40">
        <button 
          onClick={() => setActiveTab('formulas')}
          className={`flex items-center gap-3 transition-all relative ${activeTab === 'formulas' ? 'opacity-100 scale-105' : 'opacity-40 hover:opacity-100'}`}
        >
          <span className="editorial-serif italic text-2xl">{formulas.length}</span>
          <span className="text-[11px] uppercase font-black tracking-wider">Công thức</span>
          {activeTab === 'formulas' && <div className="h-1 w-full bg-ink absolute bottom-0 left-0"></div>}
        </button>
        <button 
          onClick={() => setActiveTab('exercises')}
          className={`flex items-center gap-3 transition-all relative ${activeTab === 'exercises' ? 'opacity-100 scale-105' : 'opacity-40 hover:opacity-100'}`}
        >
          <span className="editorial-serif italic text-2xl">{exercises.length}</span>
          <span className="text-[11px] uppercase font-black tracking-wider">Bài tập</span>
          {activeTab === 'exercises' && <div className="h-1 w-full bg-ink absolute bottom-0 left-0"></div>}
        </button>
        <button 
          onClick={() => setActiveTab('ai-chat')}
          className={`flex items-center gap-3 transition-all relative ${activeTab === 'ai-chat' ? 'opacity-100 scale-105' : 'opacity-40 hover:opacity-100'}`}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[11px] uppercase font-black tracking-wider">Trợ lý AI</span>
          {activeTab === 'ai-chat' && <div className="h-1 w-full bg-ink absolute bottom-0 left-0"></div>}
        </button>

        <div className="ml-auto hidden sm:flex gap-6 text-[11px] uppercase font-black">
          <span className="text-emerald-600 flex items-center gap-1.5 font-bold">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Đang trực tuyến
          </span>
          <span>{new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
        {/* Dynamic Section Wrapper */}
        <div className="flex-1 overflow-y-auto custom-scroll line-grid relative">
          <div className="max-w-6xl mx-auto p-8 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'formulas' && <FormulaList />}
                {activeTab === 'exercises' && <ExerciseList />}
                {activeTab === 'ai-chat' && <AIChat />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Static Sidebar (Stats) */}
        <aside className="w-full md:w-80 border-l border-ink bg-white p-8 flex flex-col gap-10">
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b-2 border-ink">
              <TrendingUp className="w-5 h-5" />
              <h4 className="editorial-serif italic text-xl">Tiến trình</h4>
            </div>
            <div className="space-y-6 pt-2">
              <div>
                <div className="flex justify-between text-[10px] font-black uppercase mb-2 tracking-widest">
                  <span>Học phần công thức ({formulas.length})</span>
                  <span className="font-bold">100%</span>
                </div>
                <div className="h-2 w-full border border-ink p-[1px]">
                  <div className="h-full bg-ink w-[100%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-black uppercase mb-2 tracking-widest">
                  <span>Bài tập hoàn thiện ({exercises.length})</span>
                  <span className="font-bold">100%</span>
                </div>
                <div className="h-2 w-full border border-ink p-[1px]">
                  <div className="h-full bg-ink w-[100%]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#f2f0ed] p-6 border border-ink shadow-[6px_6px_0px_#1a1a1a] mt-auto">
            <h4 className="editorial-serif text-2xl italic mb-3">Chứng nhận chuyên gia</h4>
            <p className="text-[11px] leading-relaxed mb-6 font-medium opacity-80 uppercase tracking-tight">Tất cả tài liệu đã sẵn sàng. Hãy bắt đầu nghiên cứu ngay bây giờ.</p>
            <button className="w-full py-3 bg-ink text-white text-[11px] font-black uppercase tracking-widest hover:opacity-90 active:translate-y-1 transition-all">
              Bắt đầu nghiên cứu
            </button>
          </div>
        </aside>
      </main>

      <footer className="py-6 border-t border-ink bg-page-bg text-center">
         <p className="editorial-serif italic text-sm opacity-60">© 2026 Học Viện Kế Toán • Một ấn phẩm số của Kế Toán Pro.</p>
      </footer>
    </div>
  );
}
