import { useState, useEffect, useMemo } from 'react';
import { Search, BookOpen, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CourseCard } from '../components/CourseCard';
import { LEARNING_PATHS } from '../data/learningPaths';
import { SEO } from '@/components/layout/SEO';
import { cn } from '@/lib/utils';

export function Resources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Derive categories directly from data so filters always match what's available.
  const CATEGORIES = useMemo(() => {
    const unique = Array.from(new Set(LEARNING_PATHS.map((p) => p.category))).sort();
    return ['All', ...unique];
  }, []);
  const [progressData, setProgressData] = useState<Record<string, number>>(() => {
    const data: Record<string, number> = {};
    LEARNING_PATHS.forEach(path => {
      const saved = localStorage.getItem(`progress_${path.id}`);
      if (saved) {
        try {
          data[path.id] = JSON.parse(saved).length;
        } catch {
          data[path.id] = 0;
        }
      } else {
        data[path.id] = 0;
      }
    });
    return data;
  });

  useEffect(() => {
    const updateProgress = () => {
      const data: Record<string, number> = {};
      LEARNING_PATHS.forEach(path => {
        const saved = localStorage.getItem(`progress_${path.id}`);
        if (saved) {
          try {
            data[path.id] = JSON.parse(saved).length;
          } catch {
            data[path.id] = 0;
          }
        } else {
          data[path.id] = 0;
        }
      });
      setProgressData(data);
    };

    window.addEventListener('storage', updateProgress);
    window.addEventListener('focus', updateProgress);
    return () => {
      window.removeEventListener('storage', updateProgress);
      window.removeEventListener('focus', updateProgress);
    };
  }, []);

  const filteredPaths = LEARNING_PATHS.filter(path => {
    const matchesSearch = path.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         path.tagline.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || path.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white text-black pb-32 overflow-x-hidden industrial-grid">
      <SEO title="Archive" description="Surgical access to hand-curated learning paths." />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="pt-16 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-2 border-black mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-black text-white flex items-center justify-center">
                <BookOpen size={20} strokeWidth={3} />
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none italic">
                The <span className="text-accent-indigo not-italic">Archive.</span>
              </h1>
            </div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400">
              Technical Repository • Accessing 20 Sectors of Excellence
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-[320px] group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-black transition-colors" size={16} />
            <input
              type="text"
              placeholder="Query Module ID..."
              className="w-full bg-white border-2 border-black h-12 pl-11 pr-4 text-sm font-black uppercase tracking-tighter placeholder:text-zinc-300 focus:outline-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-[2px] focus:translate-y-[2px] transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-3 overflow-x-auto pb-12 no-scrollbar scroll-smooth">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-5 py-2.5 border-2 border-black font-black text-[10px] uppercase tracking-[0.2em] whitespace-nowrap transition-all",
                selectedCategory === category
                ? 'bg-black text-white'
                : 'bg-white text-zinc-500 hover:bg-zinc-100'
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid Section */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredPaths.map((path, index) => (
              <motion.div
                key={path.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
              >
                <CourseCard
                  {...path}
                  duration={`${path.totalHours}h`}
                  lessonsCount={path.levels.length}
                  progress={progressData[path.id] || 0}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredPaths.length === 0 && (
          <div className="text-center py-24 border-2 border-dashed border-zinc-200">
            <div className="w-14 h-14 bg-zinc-50 flex items-center justify-center mx-auto mb-5 text-zinc-300 border-2 border-zinc-100">
              <Terminal size={24} />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Module_Not_Found</h3>
            <p className="text-zinc-400 font-bold uppercase text-[9px] tracking-[0.3em]">Redefine Search Parameters</p>
          </div>
        )}

        {/* Big Industrial Stat */}
        <div className="mt-24 relative">
          <div className="border-2 border-black bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
            {/* Top status bar */}
            <div className="flex items-center justify-between px-5 py-2.5 border-b-2 border-black bg-black text-white">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 bg-accent-indigo animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-[0.4em]">Archive_Telemetry</span>
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400 hidden sm:block">
                Sector: Global • Live
              </span>
            </div>

            <div className="industrial-grid absolute inset-0 opacity-[0.07] pointer-events-none" />

            {/* Body */}
            <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_auto] gap-8 md:gap-10 items-center relative z-10">
              {/* Stat 1 */}
              <div className="space-y-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-400">01</span>
                  <span className="h-px flex-1 bg-black/10 hidden md:block" />
                </div>
                <div className="text-5xl md:text-6xl font-black tracking-tighter leading-none">
                  {LEARNING_PATHS.length}
                  <span className="text-accent-indigo">+</span>
                </div>
                <p className="text-[9px] font-black uppercase tracking-[0.35em] text-zinc-500">
                  Curated_Paths
                </p>
              </div>

              {/* Divider */}
              <div className="w-full md:w-px h-px md:h-20 bg-black/15" />

              {/* Stat 2 */}
              <div className="space-y-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-400">02</span>
                  <span className="h-px flex-1 bg-black/10 hidden md:block" />
                </div>
                <div className="text-5xl md:text-6xl font-black tracking-tighter leading-none text-accent-indigo">
                  100<span className="text-black">%</span>
                </div>
                <p className="text-[9px] font-black uppercase tracking-[0.35em] text-zinc-500">
                  Open_Source_Logic
                </p>
              </div>

              {/* Divider */}
              <div className="w-full md:w-px h-px md:h-20 bg-black/15" />

              {/* CTA Block */}
              <div className="flex flex-col items-stretch gap-2.5">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="px-6 py-3.5 bg-black text-white font-black uppercase text-[11px] tracking-[0.2em] shadow-[4px_4px_0px_0px_rgba(67,56,202,0.6)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  Initialize Training
                  <Terminal size={12} strokeWidth={3} />
                </button>
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-400 text-center">
                  Boot_Sequence_Ready
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
