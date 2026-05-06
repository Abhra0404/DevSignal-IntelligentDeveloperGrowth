import { motion } from 'framer-motion';
import { Star, GitFork, ExternalLink, Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RepoCardProps {
  id: string;
  name: string;
  description: string | null;
  stars: number;
  forks: number;
  language: string | null;
  lastUpdated?: string;
  url?: string;
}

export function RepoCard({ id, name, description, stars, forks, language, url }: RepoCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div 
      onClick={() => navigate(`/repo/${id}`)}
      className="surgical-card p-6 cursor-pointer flex flex-col justify-between group h-full relative"
    >
      <div className="space-y-5">
        <div className="flex items-center justify-between border-b-2 border-app pb-3">
          <div className="w-9 h-9 bg-black flex items-center justify-center text-white">
            <Code size={16} strokeWidth={3} />
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); window.open(url, '_blank'); }}
            className="w-8 h-8 border-2 border-app flex items-center justify-center hover:bg-black hover:text-white transition-all"
            aria-label={`Open ${name} on GitHub`}
          >
            <ExternalLink size={14} />
          </button>
        </div>

        <div className="space-y-2.5">
          <h4 className="text-base font-black tracking-tighter uppercase group-hover:text-accent-indigo transition-colors leading-tight">{name}</h4>
          <p className="text-xs text-app-muted font-bold italic line-clamp-3 leading-relaxed border-l-2 border-app/5 pl-3">
            {description || 'System description unavailable for this repository.'}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-black text-[10px] uppercase tracking-widest">
            <Star size={12} strokeWidth={3} className="text-yellow-600 fill-yellow-600" />
            {stars}
          </div>
          <div className="flex items-center gap-1.5 font-black text-[10px] uppercase tracking-widest text-zinc-600">
            <GitFork size={12} strokeWidth={3} />
            {forks}
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-2 py-0.5 bg-app-surface border border-app font-black text-[8px] uppercase tracking-widest text-app">
          {language}
        </div>
      </div>
    </motion.div>
  );
}
