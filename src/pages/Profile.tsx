import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { 
  ShieldCheck, 
  Clock, 
  Star, 
  GitFork, 
  Share2,
  ExternalLink,
  Cpu,
  User,
  Terminal,
  Activity
} from 'lucide-react';
import { SEO } from '@/components/layout/SEO';

interface ProfileData {
  stats: {
    totalStars: number;
    totalForks: number;
    totalProjects: number;
    languages: Record<string, number>;
  };
  persona: {
    title: string;
    level: number;
  };
  rhythm: {
    type: string;
    description: string;
  };
}

export function Profile() {
  const { user, logout } = useAuth();
  const [data, setData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const res = await fetch(`${apiUrl}/api/profile/summary`, {
          headers: { 'Authorization': `Bearer ${session.access_token}` }
        });
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-12 industrial-grid">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 border-8 border-black border-t-transparent flex items-center justify-center"
        >
          <Cpu size={32} strokeWidth={3} />
        </motion.div>
        <p className="text-xl font-black uppercase tracking-tighter">Parsing_Identity_Blocks...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen space-y-10 pb-32 px-6 md:px-0">
      <SEO title="User Profile" description="Verified technical identity and contribution metrics." />
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-black pb-6">
        <div className="space-y-3">
          <div className="inline-block px-2.5 py-1 bg-black text-white text-[9px] font-black uppercase tracking-[0.3em]">
            Identity_Archive
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-black text-white flex items-center justify-center">
              <User size={20} strokeWidth={3} />
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">
              User <span className="text-accent-indigo">Profile.</span>
            </h2>
          </div>
        </div>
        
        <button 
          onClick={logout}
          className="px-5 py-2.5 border-2 border-black font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
        >
          Terminate_Session
        </button>
      </div>

      {/* Main Hero Card */}
      <div className="surgical-card p-8 md:p-12 bg-white relative overflow-hidden group">
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 md:gap-14">
          
          {/* Avatar Section */}
          <div className="relative shrink-0">
             <div className="w-40 h-40 md:w-52 md:h-52 border-2 border-black p-2 bg-zinc-50 group-hover:bg-zinc-100 transition-colors">
                <div className="w-full h-full border-2 border-black overflow-hidden relative">
                  <img 
                    src={user?.user_metadata.avatar_url} 
                    alt="Profile" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 border-4 border-black/10 pointer-events-none" />
                </div>
             </div>
             <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-1.5 font-black text-[9px] uppercase tracking-[0.3em] border-2 border-black shadow-md">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={12} strokeWidth={3} className="text-green-400" />
                  ID_VERIFIED
                </div>
             </div>
          </div>

          {/* Identity Details */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="space-y-3">
              <p className="text-accent-indigo font-black text-[10px] tracking-[0.4em] uppercase">// AUTH_TOKEN_READY</p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-[0.95] uppercase">
                {user?.user_metadata.full_name || user?.user_metadata.user_name}
              </h2>
              <div className="h-1 w-20 bg-black mx-auto lg:ml-0" />
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <div className="px-5 py-3 border-2 border-black bg-zinc-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                 <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-1">Persona_Class</p>
                 <p className="text-base font-black text-black uppercase tracking-tight">{data?.persona.title}</p>
              </div>
              <div className="px-5 py-3 border-2 border-black bg-zinc-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                 <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-1">Integrity_Level</p>
                 <p className="text-base font-black text-black uppercase tracking-tight">{data?.persona.level ? data.persona.level * 10 : 0}%</p>
              </div>
            </div>
            
            <p className="text-sm md:text-base font-bold leading-relaxed italic border-l-4 border-black pl-4 max-w-2xl text-zinc-600">
              "Systemized identity operating as <span className="text-accent-indigo not-italic uppercase font-black">{data?.persona.title}</span> with {data?.stats.totalProjects} validated project blocks."
            </p>
          </div>
        </div>

        <div className="industrial-grid absolute inset-0 opacity-10 pointer-events-none" />
      </div>

      {/* Bento Grid Nodes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Vertical Stack */}
        <div className="flex flex-col gap-6">
          <div className="surgical-card p-6 flex flex-col justify-between h-[180px] bg-white group overflow-hidden">
            <div className="flex justify-between items-center border-b-2 border-black pb-3">
              <div className="w-10 h-10 border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                <Star size={18} strokeWidth={3} />
              </div>
              <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest italic">Impact_Array</span>
            </div>
            <div>
              <div className="text-4xl font-black tracking-tighter text-black leading-none mb-2">{data?.stats.totalStars}</div>
              <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">Global Stars Received</p>
            </div>
          </div>

          <div className="surgical-card p-6 flex flex-col justify-between h-[180px] bg-white group overflow-hidden">
            <div className="flex justify-between items-center border-b-2 border-black pb-3">
              <div className="w-10 h-10 border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                <GitFork size={18} strokeWidth={3} />
              </div>
              <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest italic">Iteration_Depth</span>
            </div>
            <div>
              <div className="text-4xl font-black tracking-tighter text-black leading-none mb-2">{data?.stats.totalForks}</div>
              <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">Total Forks Parsed</p>
            </div>
          </div>
        </div>

        {/* Center: Language Stack */}
        <div className="lg:col-span-1 surgical-card p-6 bg-white relative">
          <h3 className="text-base font-black uppercase tracking-tighter mb-5 border-b-2 border-black pb-3 flex items-center justify-between">
            Stack_Galaxy
            <Terminal size={16} strokeWidth={3} />
          </h3>
          <div className="space-y-2.5">
            {Object.entries(data?.stats.languages || {}).slice(0, 8).map(([lang, count], i) => (
              <div key={lang} className="flex items-center justify-between p-2.5 border-2 border-black bg-zinc-50 hover:bg-black hover:text-white transition-all group/lang">
                <div className="flex items-center gap-2.5">
                   <div className="w-6 h-6 border border-black flex items-center justify-center font-black text-[10px] bg-white text-black group-hover/lang:border-white">
                     {i + 1}
                   </div>
                   <span className="font-black uppercase text-xs tracking-widest">{lang}</span>
                </div>
                <span className="text-[9px] font-bold opacity-50 uppercase tracking-widest">{count} blocks</span>
              </div>
            ))}
          </div>
          <div className="industrial-grid absolute inset-0 opacity-5 pointer-events-none" />
        </div>

        {/* Right: Rhythm Node */}
        <div className="surgical-card p-6 flex flex-col justify-between h-full bg-white group overflow-hidden">
          <div className="flex justify-between items-center border-b-2 border-black pb-4">
            <div className="w-10 h-10 border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
              <Clock size={18} strokeWidth={3} />
            </div>
            <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Temporal_Sync</span>
          </div>

          <div className="text-center space-y-5 py-6">
            <div className="w-20 h-20 mx-auto border-2 border-black flex items-center justify-center text-3xl group-hover:bg-yellow-400 transition-colors">
              {data?.rhythm.type === "Night Owl" ? "🌙" : "☀️"}
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black tracking-tighter uppercase italic leading-none">{data?.rhythm.type}</h3>
              <p className="text-xs text-zinc-600 font-bold leading-relaxed border-y-2 border-black py-2.5 mx-3">
                "{data?.rhythm.description}"
              </p>
            </div>
          </div>

          <div className="flex gap-1 h-6 border-2 border-black p-0.5 bg-zinc-100">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="flex-1 bg-black/10 group-hover:bg-black/80 transition-all" />
            ))}
          </div>
        </div>
      </div>

      {/* Action Row */}
      <div className="surgical-card p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 bg-white overflow-hidden relative">
        <div className="space-y-4 text-center lg:text-left relative z-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 border-2 border-black bg-yellow-400 font-black text-[10px] uppercase tracking-widest">
            <Share2 size={12} strokeWidth={3} />
            BROADCAST_ENABLED
          </div>
          <h3 className="text-2xl md:text-4xl font-black tracking-tighter uppercase leading-tight">
            Identity_Compilation <br />
            <span className="text-accent-indigo">Complete.</span>
          </h3>
          <p className="text-sm font-bold text-zinc-500 italic max-w-xl leading-relaxed border-l-4 border-black pl-4">
            "Your professional footprint has been successfully parsed and verified across the global developer grid."
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto relative z-10">
          <button className="px-6 py-4 bg-black text-white font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3 justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
            <Activity size={16} strokeWidth={3} />
            SYNC_PROFILE
          </button>
          <button className="px-6 py-4 bg-white border-2 border-black font-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all flex items-center gap-3 justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
            <ExternalLink size={16} strokeWidth={3} />
            PUBLIC_LINK
          </button>
        </div>
        <div className="industrial-grid absolute inset-0 opacity-10 pointer-events-none" />
      </div>

    </div>
  );
}
