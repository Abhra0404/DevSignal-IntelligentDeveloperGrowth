import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle, 
  ExternalLink, 
  Clock, 
  Trophy, 
  Play, 
  Book, 
  Code2, 
  Layout,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LEARNING_PATHS } from '../data/learningPaths';
import { cn } from '@/lib/utils';
import { SEO } from '@/components/layout/SEO';

const getIcon = (type: string) => {
  switch (type) {
    case 'video': return <Play size={20} strokeWidth={3} />;
    case 'docs': return <Book size={20} strokeWidth={3} />;
    case 'course': return <Layout size={20} strokeWidth={3} />;
    case 'project': return <Code2 size={20} strokeWidth={3} />;
    default: return <ExternalLink size={20} strokeWidth={3} />;
  }
};

export function LearningPathPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const path = LEARNING_PATHS.find(p => p.id === courseId);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);

  useEffect(() => {
    if (path) {
      const saved = localStorage.getItem(`progress_${path.id}`);
      if (saved) {
        try {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setCompletedLevels(JSON.parse(saved));
        } catch {
          setCompletedLevels([]);
        }
      }
    }
  }, [path]);

  if (!path) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-12 bg-white industrial-grid">
        <div className="w-24 h-24 border-4 border-black flex items-center justify-center">
           <Zap size={48} strokeWidth={3} />
        </div>
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-black tracking-tighter text-black uppercase">Archive_Lost</h2>
          <p className="text-zinc-500 font-bold text-[10px] tracking-[0.5em] uppercase italic">Error 404: Knowledge Sector Null</p>
        </div>
        <button onClick={() => navigate('/resources')} className="px-12 py-6 border-4 border-black font-black uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
           Return_to_Archive
        </button>
      </div>
    );
  }

  const toggleLevel = (level: number) => {
    const newCompleted = completedLevels.includes(level)
      ? completedLevels.filter(l => l !== level)
      : [...completedLevels, level];
    
    setCompletedLevels(newCompleted);
    localStorage.setItem(`progress_${path.id}`, JSON.stringify(newCompleted));
    window.dispatchEvent(new Event('storage'));
  };

  const progress = (completedLevels.length / path.levels.length) * 100;
  const PathIcon = path.icon;

  return (
    <div className="min-h-screen bg-white text-black pb-32">
      <SEO title={`${path.title} | Technical Archive`} description={path.tagline} />

      {/* Header Overlay */}
      <div className="relative mb-12">
        <div className="surgical-card p-8 md:p-12 bg-white relative overflow-hidden group">
          <button 
            onClick={() => navigate('/resources')}
            className="group mb-8 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-black transition-colors"
          >
            <div className="w-8 h-8 border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
               <ArrowLeft size={14} strokeWidth={3} />
            </div>
            BACK_TO_ARCHIVE
          </button>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 relative z-10">
            <div className="space-y-5 max-w-3xl">
              <div className="flex items-center gap-5">
                 <div className="w-12 h-12 border-2 border-black flex items-center justify-center text-black shrink-0">
                    <PathIcon size={22} strokeWidth={3} />
                 </div>
                 <div className="space-y-1">
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-accent-indigo">Sector: {path.category}</span>
                    <h1 className="text-2xl md:text-4xl font-black tracking-tighter text-black uppercase leading-[0.95]">{path.title}</h1>
                 </div>
              </div>
              <p className="text-sm md:text-base font-bold italic border-l-4 border-black pl-4 max-w-2xl leading-relaxed text-zinc-500">
                "{path.tagline}"
              </p>
            </div>

            <div className="surgical-card p-6 min-w-[260px] space-y-5 bg-zinc-50">
               <div className="flex justify-between items-end">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">Sync_Progress</span>
                  <span className="text-2xl font-black tracking-tighter italic">{Math.round(progress)}%</span>
               </div>
               <div className="h-3 w-full border-2 border-black p-[2px] bg-white">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-black"
                    transition={{ duration: 1, ease: "circOut" }}
                  />
               </div>
               <div className="flex items-center justify-between pt-2 border-t border-black/20">
                  <div className="flex items-center gap-2">
                     <Clock size={12} strokeWidth={3} className="text-zinc-500" />
                     <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">{path.totalHours}H_EST</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Trophy size={12} strokeWidth={3} className="text-zinc-500" />
                     <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">{completedLevels.length}/{path.levels.length}_VERIFIED</span>
                  </div>
               </div>
            </div>
          </div>
          <div className="industrial-grid absolute inset-0 opacity-10 pointer-events-none" />
        </div>
      </div>

      {/* Mastery Roadmap */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="space-y-10 relative pt-6">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-black/10 hidden md:block" />
          
          {path.levels.map((level, index) => {
            const isCompleted = completedLevels.includes(level.level);

            return (
              <motion.div
                key={level.level}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={cn(
                  "relative flex flex-col md:flex-row items-center gap-8 md:gap-16",
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Node Center */}
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 hidden md:block">
                   <div className={cn(
                      "w-10 h-10 border-2 border-black flex items-center justify-center transition-all duration-500",
                      isCompleted ? "bg-black text-white" : "bg-white text-black"
                   )}>
                      <span className="text-xs font-black">{level.level.toString().padStart(2, '0')}</span>
                   </div>
                </div>

                <div className="w-full md:w-1/2">
                   <div className={cn(
                     "surgical-card p-6 md:p-7 transition-all duration-500 group relative overflow-hidden",
                     isCompleted ? "bg-zinc-50 border-zinc-200 shadow-none" : "bg-white"
                   )}>
                      <div className="flex items-center justify-between mb-5">
                         <div className={cn("w-10 h-10 border-2 border-black flex items-center justify-center", isCompleted ? "bg-black text-white border-white" : "bg-white text-black")}>
                            {getIcon(level.type)}
                         </div>
                         <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 italic">Stage_{level.level.toString().padStart(2, '0')}</span>
                      </div>

                      <div className="space-y-3 mb-6">
                         <h3 className={cn(
                           "text-lg font-black tracking-tighter leading-tight uppercase",
                           isCompleted ? "text-zinc-500 line-through" : "text-black"
                         )}>
                           {level.title}
                         </h3>
                         <p className="text-xs font-bold text-zinc-600 italic leading-relaxed border-l-2 border-black/20 pl-3">
                           "{level.description}"
                         </p>
                      </div>

                      <div className="flex items-center gap-3">
                         <a 
                           href={level.url} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="flex-1 py-3 border-2 border-black bg-white flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                         >
                           ACCESS_MODULE <ExternalLink size={12} strokeWidth={3} />
                         </a>
                         <button 
                           onClick={() => toggleLevel(level.level)}
                           className={cn(
                             "w-11 h-11 border-2 border-black flex items-center justify-center transition-all duration-500 shrink-0",
                             isCompleted ? "bg-black text-white" : "bg-white text-zinc-400 hover:text-black"
                           )}
                           aria-label={isCompleted ? 'Mark incomplete' : 'Mark complete'}
                         >
                            <CheckCircle size={18} strokeWidth={3} />
                         </button>
                      </div>
                   </div>
                </div>

                <div className="w-1/2 hidden md:block" />
              </motion.div>
            );
          })}
        </div>

        {/* Completion Milestone */}
        <AnimatePresence>
          {completedLevels.length === path.levels.length && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="mt-24 relative"
            >
              {/* Outer hard shadow card */}
              <div className="border-2 border-black bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                <div className="industrial-grid absolute inset-0 opacity-[0.07] pointer-events-none" />

                {/* Top status bar */}
                <div className="flex items-center justify-between px-6 py-3 border-b-2 border-black bg-black text-white">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-400 animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-[0.4em]">Status: Verified</span>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400">
                    Log_ID: {path.id.slice(0, 8).toUpperCase()}
                  </span>
                </div>

                {/* Body */}
                <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 md:gap-14 items-center relative z-10">
                  {/* Trophy seal */}
                  <motion.div 
                    initial={{ rotate: -10, scale: 0.8 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="relative mx-auto md:mx-0"
                  >
                    <div className="w-24 h-24 md:w-28 md:h-28 bg-black text-white flex items-center justify-center border-4 border-black relative">
                      <Trophy size={40} strokeWidth={3} />
                      {/* Corner ticks */}
                      <span className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-black bg-white" />
                      <span className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-black bg-white" />
                      <span className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-black bg-white" />
                      <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-black bg-white" />
                    </div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-accent-indigo text-white text-[8px] font-black uppercase tracking-[0.3em] whitespace-nowrap">
                      100%
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="text-center md:text-left space-y-5">
                    <div className="space-y-2">
                      <span className="inline-block px-2 py-0.5 bg-black text-white text-[8px] font-black uppercase tracking-[0.4em]">
                        Achievement Unlocked
                      </span>
                      <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black uppercase leading-[0.95]">
                        Sector <span className="text-accent-indigo italic">Mastered.</span>
                      </h2>
                      <p className="text-[10px] font-black uppercase tracking-[0.35em] text-zinc-400">
                        All_Intelligence_Nodes_Synchronized
                      </p>
                    </div>

                    {/* Stat row */}
                    <div className="grid grid-cols-3 gap-3 pt-4 border-t-2 border-black/10">
                      <div className="space-y-0.5">
                        <div className="text-xl md:text-2xl font-black tracking-tighter leading-none">{path.levels.length}</div>
                        <div className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-500">Stages</div>
                      </div>
                      <div className="space-y-0.5 border-x border-black/10 px-3">
                        <div className="text-xl md:text-2xl font-black tracking-tighter leading-none">{path.totalHours}h</div>
                        <div className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-500">Logged</div>
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-xl md:text-2xl font-black tracking-tighter leading-none text-accent-indigo">A+</div>
                        <div className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-500">Grade</div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button 
                        onClick={() => navigate('/resources')} 
                        className="flex-1 px-6 py-3.5 bg-black text-white font-black uppercase text-[11px] tracking-[0.2em] shadow-[4px_4px_0px_0px_rgba(67,56,202,0.6)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
                      >
                        Next_Archive <ExternalLink size={12} strokeWidth={3} />
                      </button>
                      <button 
                        onClick={() => { setCompletedLevels([]); localStorage.removeItem(`progress_${path.id}`); window.dispatchEvent(new Event('storage')); }}
                        className="px-6 py-3.5 border-2 border-black bg-white font-black uppercase text-[11px] tracking-[0.2em] hover:bg-zinc-50 transition-all flex items-center justify-center gap-2"
                      >
                        Reset_Progress
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
