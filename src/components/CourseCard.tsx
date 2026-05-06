import { motion } from 'framer-motion';
import { Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  id: string;
  title: string;
  tagline: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessonsCount: number;
  progress: number;
}

export function CourseCard({ id, title, tagline, category, difficulty, duration, lessonsCount, progress }: CourseCardProps) {
  const completionPercentage = Math.round((progress / lessonsCount) * 100);

  return (
    <motion.div 
      className="surgical-card p-6 flex flex-col justify-between h-full bg-white relative group"
    >
      <div className="space-y-5">
        <div className="flex items-center justify-between border-b-2 border-black pb-3">
          <span className="px-2 py-0.5 bg-zinc-100 border border-black font-black text-[8px] uppercase tracking-widest">
            {difficulty}
          </span>
          <div className="flex items-center gap-1.5 text-zinc-500 font-black text-[9px] uppercase tracking-widest">
            <Clock size={11} strokeWidth={3} />
            {duration}
          </div>
        </div>

        <div className="space-y-2.5">
          <h4 className="text-base font-black tracking-tighter uppercase group-hover:text-accent-indigo transition-colors leading-tight">
            {title}
          </h4>
          <p className="text-xs text-zinc-500 font-bold italic line-clamp-3 leading-relaxed border-l-2 border-black/5 pl-3">
            "{tagline}"
          </p>
        </div>

        <div className="inline-block px-2 py-0.5 bg-black text-white text-[8px] font-black uppercase tracking-[0.2em]">
          {category}
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
            <span className="text-zinc-500">Integrity</span>
            <span className="text-black">{completionPercentage}%</span>
          </div>
          <div className="h-2.5 bg-zinc-100 border-2 border-black overflow-hidden p-[1px]">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="h-full bg-black"
            />
          </div>
        </div>

        <Link 
          to={`/learning-path/${id}`}
          className="w-full py-3 bg-white border-2 border-black font-black text-[10px] uppercase tracking-widest text-black flex items-center justify-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
        >
          {progress > 0 ? 'Resume_Module' : 'Init_Module'}
          <ChevronRight size={12} strokeWidth={3} />
        </Link>
      </div>
    </motion.div>
  );
}
