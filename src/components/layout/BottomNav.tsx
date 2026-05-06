import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, User, Code2, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Feed', path: '/dashboard' },
  { icon: BarChart3, label: 'Signal', path: '/analytics' },
  { icon: BookOpen, label: 'Archive', path: '/resources' },
  { icon: Code2, label: 'Logic', path: '/editor' },
  { icon: User, label: 'User', path: '/profile' },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-6">
      <div className="bg-app-surface border-4 border-app p-2 flex items-center justify-between gap-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex-1 flex flex-col items-center justify-center py-4 transition-all relative group",
                isActive 
                  ? "bg-black text-white" 
                  : "text-app-muted hover:opacity-80"
              )}
            >
              <item.icon size={20} strokeWidth={3} className={cn("transition-transform", !isActive && "group-hover:scale-110")} />
              <span className="text-[8px] font-black uppercase tracking-[0.2em] mt-2">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
