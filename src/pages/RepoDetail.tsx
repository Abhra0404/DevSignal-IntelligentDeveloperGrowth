import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Activity, ExternalLink,
  GitPullRequest, AlertCircle,
  Users, Code2, Terminal, Star, BarChart3
} from 'lucide-react';
import { useRepo } from '@/hooks/queries';
import { ActivityChart } from '@/components/dashboard/ActivityChart';
import { cn } from '@/lib/utils';
import { SEO } from '@/components/layout/SEO';
import { ContributorGrid } from '@/components/dashboard/ContributorGrid';
import { LanguageStats } from '@/components/dashboard/LanguageStats';

const COLOR_MAP: Record<string, string> = {
  blue: 'text-blue-500 border-blue-500',
  amber: 'text-amber-500 border-amber-500',
  violet: 'text-violet-500 border-violet-500',
  orange: 'text-orange-500 border-orange-500',
  rose: 'text-rose-500 border-rose-500',
  emerald: 'text-emerald-500 border-emerald-500',
  indigo: 'text-indigo-500 border-indigo-500',
  purple: 'text-purple-500 border-purple-500'
};

function IndustrialMetric({ label, value, icon: Icon, color }: { label: string, value: string | number, icon: React.ElementType, color: string }) {
  const iconColor = color && COLOR_MAP[color] ? COLOR_MAP[color] : 'text-black border-black';
  return (
    <div className="surgical-card p-6 flex flex-col justify-between h-full bg-white group">
      <div className="flex items-center justify-between border-b-2 border-black pb-3">
        <div className={cn(
          "w-10 h-10 border-2 flex items-center justify-center transition-all group-hover:bg-black group-hover:text-white group-hover:border-black",
          iconColor
        )}>
          <Icon size={16} strokeWidth={3} />
        </div>
        <div className="w-8 h-1 bg-black/10" />
      </div>
      <div className="mt-5 space-y-1">
        <p className="text-3xl md:text-4xl font-black tracking-tighter text-black leading-none">{value}</p>
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400">{label}_VALUE</p>
      </div>
    </div>
  );
}

export function RepoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: repo, isLoading, error } = useRepo(id || '');

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-12 industrial-grid">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 border-8 border-black border-t-transparent"
        />
        <p className="text-xl font-black uppercase tracking-tighter">Parsing_Repository_Structure...</p>
      </div>
    );
  }

  if (error || !repo) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-10 text-black industrial-grid">
        <div className="w-24 h-24 border-4 border-black flex items-center justify-center">
          <AlertCircle size={48} strokeWidth={3} className="text-red-500" />
        </div>
        <div className="text-center space-y-4">
          <p className="font-black uppercase tracking-[0.5em] text-sm">CONNECTION_TERMINATED</p>
          <p className="text-zinc-400 font-bold italic">Error_Code: 0xRECON_LOST</p>
        </div>
        <Link to="/dashboard" className="px-12 py-6 border-4 border-black font-black uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          REBOOT_DASHBOARD
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen space-y-10 pb-24">
      <SEO title={`${repo.name} | Repository Intelligence`} description={repo.description || undefined} />
      
      {/* Navigation */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b-2 border-black pb-6">
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-black transition-colors"
        >
          <div className="w-9 h-9 border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
             <ArrowLeft size={14} strokeWidth={3} />
          </div>
          Return_To_Array
        </button>

        <a 
          href={repo.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-5 py-3 border-2 border-black font-black text-[10px] uppercase tracking-widest bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-2.5"
        >
          SOURCE_GITHUB <ExternalLink size={12} strokeWidth={3} />
        </a>
      </div>

      {/* Hero Header */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-8 space-y-5">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 border-2 border-black bg-zinc-50 font-black text-[9px] uppercase tracking-widest">
            <Terminal size={12} strokeWidth={3} className="text-accent-indigo" />
            STACK: {repo.language || 'MULTI_ARRAY'}
          </div>
          <h1 className="text-3xl md:text-6xl font-black tracking-tighter text-black leading-[0.9] uppercase break-words">
            {repo.name.includes('/') ? repo.name.split('/')[1] : repo.name}
          </h1>
          <p className="text-sm md:text-base font-bold leading-relaxed italic border-l-4 border-black pl-4 max-w-3xl text-zinc-500">
            "{repo.description || 'Systemized repository synchronized for deep architectural analysis and contribution tracking.'}"
          </p>
        </div>

        {/* Global Impact Card */}
        <div className="lg:col-span-4 surgical-card p-6 bg-white text-black relative overflow-hidden group">
          <div className="relative z-10 flex flex-col items-center text-center space-y-4">
             <div className="w-12 h-12 border-2 border-black flex items-center justify-center">
                <Star size={20} strokeWidth={3} className="text-yellow-400 fill-yellow-400" />
             </div>
             <div className="space-y-1">
                <h4 className="text-4xl md:text-5xl font-black tracking-tighter leading-none text-black">{repo.stars.toLocaleString()}</h4>
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">Global_Star_Array</p>
             </div>
             <div className="w-full h-1.5 bg-black/10 relative">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((repo.stars / 100) * 100, 100)}%` }}
                  className="absolute inset-0 bg-accent-indigo"
                  transition={{ duration: 1.5 }}
                />
             </div>
          </div>
          <div className="industrial-grid absolute inset-0 opacity-10" />
        </div>
      </section>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Activity Graph */}
        <div className="lg:col-span-8 space-y-6">
          <div className="surgical-card p-6 bg-white relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5 border-b-2 border-black pb-3">
              <h3 className="text-base font-black flex items-center gap-3 text-black uppercase tracking-tighter italic">
                <div className="w-9 h-9 border-2 border-black flex items-center justify-center text-accent-indigo">
                  <Activity size={16} strokeWidth={3} />
                </div> 
                RECENT_SIGNAL_PULSE
              </h3>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">12_MONTH_LOGS</span>
            </div>
            <div className="relative z-10">
              <ActivityChart data={repo.activity} />
            </div>
            <div className="industrial-grid absolute inset-0 opacity-5 pointer-events-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <IndustrialMetric label="STARS" value={repo.stars} icon={Star} color="blue" />
            <IndustrialMetric label="FORKS" value={repo.forks} icon={GitPullRequest} color="purple" />
            <IndustrialMetric label="ISSUES" value={repo.open_issues} icon={AlertCircle} color="orange" />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Languages */}
          <div className="surgical-card p-6 bg-white">
            <h3 className="text-base font-black mb-5 border-b-2 border-black pb-3 flex items-center gap-3 uppercase tracking-tighter italic">
              <div className="w-9 h-9 border-2 border-black flex items-center justify-center text-orange-500">
                <Code2 size={16} strokeWidth={3} />
              </div> 
              STACK_DENSITY
            </h3>
            <LanguageStats languages={repo.languages} />
          </div>

          {/* Metadata */}
          <div className="surgical-card p-6 bg-white group">
            <h3 className="text-base font-black mb-5 border-b-2 border-black pb-3 flex items-center gap-3 uppercase tracking-tighter italic">
              <div className="w-9 h-9 border-2 border-black flex items-center justify-center text-violet-500 group-hover:bg-black group-hover:text-white transition-all">
                <BarChart3 size={16} strokeWidth={3} />
              </div> 
              METADATA
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center group/item">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Branch</span>
                <span className="px-2.5 py-1 border border-black font-mono text-[10px] font-black uppercase bg-zinc-50 group-hover/item:bg-black group-hover/item:text-white transition-all">
                  {repo.default_branch}
                </span>
              </div>
              <div className="flex justify-between items-center group/item">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Synced</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-black">
                  {repo.last_sync ? new Date(repo.last_sync).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center group/item">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Updated</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-black">
                  {repo.updated_at ? new Date(repo.updated_at).toLocaleDateString() : 'UNKNOWN'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contributors */}
      <div className="surgical-card p-8 md:p-10 bg-white relative overflow-hidden">
        <h3 className="text-base font-black mb-6 border-b-2 border-black pb-4 flex items-center gap-3 uppercase tracking-tighter italic">
          <div className="w-9 h-9 border-2 border-black flex items-center justify-center text-green-500">
            <Users size={16} strokeWidth={3} />
          </div> 
          TOP_CONTRIBUTORS_ARRAY
        </h3>
        <ContributorGrid contributors={repo.contributors} />
        <div className="industrial-grid absolute inset-0 opacity-10 pointer-events-none" />
      </div>
    </div>
  );
}
