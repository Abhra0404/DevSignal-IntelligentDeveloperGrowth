import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Brain, Shield, Rocket, BarChart2 } from 'lucide-react';
import { useAnalytics } from '@/hooks/queries';
import { SEO } from '@/components/layout/SEO';
import { cn } from '@/lib/utils';

// Memoize random data outside the component
const HEATMAP_DATA = Array.from({ length: 168 }).map(() => ({
  opacity: Math.random() * 0.8 + 0.1,
  level: Math.floor(Math.random() * 10)
}));

export function Analytics() {
  const { data: analytics } = useAnalytics();
  const languages = analytics?.languages || [];

  return (
    <div className="relative min-h-screen space-y-10 pb-32 px-6 md:px-0">
      <SEO title="Signal Mapping" description="Global mapping of technical evolution and performance arrays." />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-black pb-6">
        <div className="space-y-3">
          <div className="inline-block px-2.5 py-1 bg-black text-white text-[9px] font-black uppercase tracking-[0.3em]">
            Module: Analytics_Beta
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none whitespace-nowrap">
            Technical <span className="text-accent-indigo">Evolution.</span>
          </h2>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border-2 border-black flex items-center justify-center bg-zinc-50 shrink-0">
            <BarChart2 size={20} strokeWidth={3} />
          </div>
          <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 max-w-[200px] leading-relaxed">
            Real-time parsing of global activity blocks and contribution velocity patterns.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skill Architecture */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 surgical-card p-6 bg-white relative overflow-hidden group"
        >
          <div className="absolute -top-8 -right-8 opacity-5 text-black">
            <Brain size={140} strokeWidth={4} />
          </div>
          <h3 className="text-lg font-black uppercase tracking-tighter mb-6 border-b-2 border-black pb-3 italic">
            Skill_Array
          </h3>
          <div className="space-y-5 relative z-10">
            {(languages.length > 0 ? languages : [
              { name: 'Frontend', percentage: 80 },
              { name: 'Backend', percentage: 65 },
              { name: 'Security', percentage: 57 },
              { name: 'DevOps', percentage: 73 },
              { name: 'AI/ML', percentage: 50 },
            ]).map((skill, index) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.25em] text-zinc-500">
                  <span>{skill.name}</span>
                  <span className="text-black bg-yellow-400 px-1.5 border border-black">{skill.percentage}%</span>
                </div>
                <div className="h-3 bg-zinc-50 border-2 border-black p-[2px] overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.percentage}%` }}
                    transition={{ duration: 1.5, delay: index * 0.1, ease: "circOut" }}
                    className="h-full bg-black"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="industrial-grid absolute inset-0 opacity-5 pointer-events-none" />
        </motion.div>

        {/* Contribution Heatmap */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 surgical-card p-6 bg-white relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b-2 border-black pb-4">
            <h3 className="text-lg font-black uppercase tracking-tighter italic">Deep_Work_Heatmap</h3>
            <div className="flex items-center gap-2.5 px-3 py-1.5 border-2 border-black bg-zinc-50">
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Scale:</span>
              <div className="flex gap-1">
                {[0.1, 0.4, 0.7, 1].map(op => (
                  <div key={op} className="w-2.5 h-2.5 border border-black bg-black" style={{ opacity: String(op) }} />
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-12 sm:grid-cols-[repeat(24,minmax(0,1fr))] gap-1 relative z-10">
            {HEATMAP_DATA.map((data, i) => (
              <motion.div 
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: data.opacity }}
                transition={{ delay: i * 0.001 }}
                className="aspect-square border border-black/5 bg-black hover:bg-accent-indigo hover:opacity-100 transition-all cursor-crosshair hover:scale-125 hover:z-20"
                title={`Level: ${data.level}`}
              />
            ))}
          </div>
          <div className="mt-6 p-4 border-2 border-black bg-zinc-50 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 italic text-center relative z-10">
            "System pulse: Optimized for high-velocity contribution arrays."
          </div>
          <div className="industrial-grid absolute inset-0 opacity-5 pointer-events-none" />
        </motion.div>
      </div>

      {/* Performance Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricBox title="Total_Repos" value={String(analytics?.total_repos ?? 0)} suffix="SYNCED" icon={TrendingUp} color="indigo" />
        <MetricBox title="Stars_Earned" value={String(analytics?.total_stars ?? 0)} suffix="VERIFIED" icon={Shield} color="black" />
        <MetricBox title="Active_Issues" value={String(analytics?.total_issues ?? 0)} suffix="PENDING" icon={Rocket} color="indigo" />
      </div>
    </div>
  );
}

interface MetricBoxProps {
  title: string;
  value: string;
  suffix: string;
  icon: React.ElementType;
  color: 'indigo' | 'black';
}

function MetricBox({ title, value, suffix, icon: Icon, color }: MetricBoxProps) {
  return (
    <div className={cn(
      "surgical-card p-6 flex flex-col items-center text-center space-y-4 group transition-all",
      color === 'indigo' ? 'hover:bg-zinc-50' : 'hover:bg-zinc-100'
    )}>
      <div className="w-12 h-12 border-2 border-black flex items-center justify-center bg-white group-hover:bg-black group-hover:text-white transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px]">
        <Icon size={22} strokeWidth={3} />
      </div>
      <div className="space-y-3">
        <h4 className="text-4xl font-black tracking-tighter leading-none">{value}</h4>
        <div className="space-y-1.5">
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-black border-y-2 border-black py-1.5">{title}</p>
          <p className="text-[9px] font-bold text-zinc-500 mt-2 italic tracking-[0.25em] uppercase">{suffix}_STATUS</p>
        </div>
      </div>
    </div>
  );
}
