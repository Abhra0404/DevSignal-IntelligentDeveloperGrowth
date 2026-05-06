import { motion } from 'framer-motion';
import { GitCommit, GitPullRequest, GitMerge, AlertCircle, Terminal } from 'lucide-react';
import { useActivity } from '@/hooks/queries';
import { cn } from '@/lib/utils';

const iconMap: Record<string, any> = {
  commit: { Icon: GitCommit, color: 'text-accent-indigo' },
  pr: { Icon: GitPullRequest, color: 'text-purple-500' },
  merge: { Icon: GitMerge, color: 'text-green-500' },
  issue: { Icon: AlertCircle, color: 'text-orange-500' },
  other: { Icon: Terminal, color: 'text-zinc-400' },
};

export function ActivityFeed() {
  const { data: activities, isLoading } = useActivity();

  return (
    <div className="surgical-card p-6 bg-white relative overflow-hidden group">
      <div className="flex justify-between items-center mb-5 border-b-2 border-black pb-3">
        <div>
          <h3 className="text-lg font-black tracking-tighter text-black uppercase leading-none">Recent <span className="text-accent-indigo italic">Activity</span></h3>
          <p className="text-[9px] text-zinc-500 uppercase tracking-[0.3em] font-black mt-1.5">Verified_Telemetry_Pulse</p>
        </div>
        <span className="px-2 py-0.5 border border-black bg-zinc-50 text-[8px] font-black uppercase tracking-widest text-zinc-500">
          Live
        </span>
      </div>

      <div className="relative space-y-5 before:absolute before:inset-0 before:left-[15px] before:w-[2px] before:bg-black/10">
        {isLoading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="relative pl-12 animate-pulse">
               <div className="absolute left-0 w-8 h-8 border-2 border-black/5 bg-zinc-50" />
               <div className="space-y-2 mt-1">
                 <div className="h-2 w-20 bg-black/5" />
                 <div className="h-3 w-full bg-black/5" />
                 <div className="h-2 w-3/4 bg-black/5" />
               </div>
            </div>
          ))
        ) : activities && activities.length > 0 ? (
          activities.slice(0, 5).map((item, index) => {
            const config = iconMap[item.type] || iconMap.other;
            const { Icon, color } = config;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                className="relative pl-12 group/item"
              >
                {/* Timeline Indicator */}
                <div className="absolute left-0 w-8 h-8 border-2 border-black bg-white flex items-center justify-center transition-all duration-300 group-hover/item:bg-black group-hover/item:text-white z-10">
                  <Icon size={14} className={cn("transition-colors", color)} strokeWidth={3} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-1.5 py-0.5 border border-black/10 bg-zinc-50 text-[8px] font-black text-zinc-400 uppercase tracking-widest">
                      {item.time}
                    </span>
                    <span className="px-1.5 py-0.5 border border-black/10 bg-zinc-50 text-[8px] font-black text-black uppercase tracking-widest truncate max-w-[160px]">
                      {item.repo}
                    </span>
                    <span className={cn("px-1.5 py-0.5 border border-black/10 bg-zinc-50 text-[8px] font-black uppercase tracking-widest", color)}>
                      {item.type}
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-black group-hover/item:text-accent-indigo transition-colors leading-tight tracking-tight uppercase">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-zinc-500 font-bold italic leading-relaxed border-l-2 border-black/10 pl-2.5">
                    "{item.description}"
                  </p>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="py-12 text-center">
            <div className="w-12 h-12 border-2 border-dashed border-black/20 flex items-center justify-center mx-auto mb-4">
              <Terminal size={20} className="text-black/10" />
            </div>
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">
              LOGS_NULL: No recent pulse detected.
            </p>
          </div>
        )}
      </div>
      <div className="industrial-grid absolute inset-0 opacity-5 pointer-events-none" />
    </div>
  );
}
