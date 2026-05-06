import { Search, LogOut, Terminal, Sun, Moon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useSearch } from '@/contexts/SearchContext';
import { NotificationsPanel } from '@/components/layout/NotificationsPanel';
import { useTheme } from '@/contexts/ThemeContext';

export function Header() {
  const { user, logout } = useAuth();
  const { searchQuery, setSearchQuery } = useSearch();
  const avatarUrl = user?.user_metadata?.avatar_url;
  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.user_name || 'User';

  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-24 bg-app-surface border-b-4 border-app px-10 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-12 flex-1">
        <div className="flex items-center gap-4 md:hidden">
          <div className="w-10 h-10 bg-black flex items-center justify-center text-white">
            <Terminal size={20} strokeWidth={3} />
          </div>
        </div>
        
        <div className="relative w-full max-w-md hidden sm:block group">
          <div className="border-2 border-app flex items-center px-6 py-3 bg-app-surface group-focus-within:shadow-none group-focus-within:translate-x-[2px] group-focus-within:translate-y-[2px] transition-all">
            <Search className="text-app-muted mr-4" size={20} strokeWidth={3} />
            <input 
              type="text" 
              placeholder="SEARCH_REPOS..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-xs font-black focus:outline-none w-full text-app text-app placeholder:text-app/30 uppercase tracking-widest"
            />
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-8">
        <NotificationsPanel />
        
        <div className="h-10 w-1 bg-black mx-2 hidden md:block" />
        
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-black">{displayName}</p>
            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-500">_AUTH_VERIFIED</p>
          </div>
          {avatarUrl ? (
            <div className="w-12 h-12 border-2 border-app p-1 bg-app-surface">
              <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-12 h-12 bg-black text-white flex items-center justify-center text-sm font-black">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 border-2 border-app flex items-center justify-center transition-all"
            title="Toggle color theme"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button 
            onClick={logout}
            className="w-12 h-12 border-2 border-app flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
            title="TERMINATE_SESSION"
            aria-label="Terminate session"
          >
            <LogOut size={20} strokeWidth={3} />
          </button>
        </div>
      </div>
    </header>
  );
}
